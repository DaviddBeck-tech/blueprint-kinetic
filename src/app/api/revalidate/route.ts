import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { REVALIDATE_SECRET } from "@/lib/content/env";

/**
 * Webhook làm mới nội dung, gọi từ mu-plugin `hbh-revalidate.php` bên WordPress.
 *
 * Có route này thì client sửa bài trong WP là site cập nhật trong vài giây, không
 * phải chờ hết hạn cache cũng không phải deploy lại.
 *
 * Route nằm dưới `/api/` nên proxy bỏ qua (xem matcher trong `src/proxy.ts`) —
 * không bị rewrite thành `/vi/api/...`.
 */

/** Các tag hợp lệ — khớp với `tags` truyền vào `wpQuery()` trong adapter. */
const KNOWN_TAGS = new Set(["content", "project", "post", "field", "partner", "settings", "copy"]);

/** So sánh chuỗi theo thời gian hằng định, tránh rò rỉ secret qua thời gian phản hồi. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function POST(request: NextRequest) {
  // Chưa cấu hình secret thì đóng hẳn route — hở ra là ai cũng ép rebuild được.
  if (!REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Revalidation chưa được cấu hình" }, { status: 503 });
  }

  const provided = request.headers.get("x-hbh-secret") ?? "";
  if (!safeEqual(provided, REVALIDATE_SECRET)) {
    return NextResponse.json({ error: "Sai secret" }, { status: 401 });
  }

  let tags: string[];
  try {
    const body = (await request.json()) as { tags?: unknown };
    tags = Array.isArray(body.tags)
      ? body.tags.filter((t): t is string => typeof t === "string")
      : [];
  } catch {
    return NextResponse.json({ error: "Body không phải JSON hợp lệ" }, { status: 400 });
  }

  // Bỏ tag lạ thay vì tin lời gọi bên ngoài — chặn việc dò tên cache tag.
  const valid = tags.filter((t) => KNOWN_TAGS.has(t));
  if (valid.length === 0) {
    return NextResponse.json(
      { error: "Không có tag hợp lệ", known: [...KNOWN_TAGS] },
      { status: 400 },
    );
  }

  // Next 16 bắt buộc tham số thứ hai. Route handler không dùng được `updateTag`
  // (hàm đó chỉ chạy trong Server Action), nên "max" là lựa chọn đúng ở đây.
  for (const tag of valid) revalidateTag(tag, "max");

  return NextResponse.json({ revalidated: valid, at: Date.now() });
}
