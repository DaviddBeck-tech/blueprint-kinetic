import { NextResponse, type NextRequest } from "next/server";

import { COOKIE_NAME } from "@/lib/i18n-resources";

/**
 * Định tuyến ngôn ngữ: **VI không tiền tố, EN dùng `/en`**.
 *
 * Mọi route thật nằm dưới `app/[locale]/`, nên request VI phải được rewrite
 * (đổi route bên trong, KHÔNG đổi URL trên thanh địa chỉ):
 *
 *   /du-an      --rewrite-->  /vi/du-an     (thanh địa chỉ vẫn là /du-an)
 *   /en/du-an   --giữ nguyên-->  khớp [locale]=en
 *   /vi/du-an   --redirect 308-->  /du-an   (tránh trùng nội dung 2 URL)
 *
 * Middleware chạy ở edge và không làm mất tính tĩnh của page: Next.js vẫn phục vụ
 * HTML đã prerender sẵn cho `/vi/...` và `/en/...`.
 */
const EN = "/en";
const VI_PREFIX = "/vi";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. /vi/... là dạng nội bộ — không cho lộ ra ngoài, chuyển về URL trần.
  if (pathname === VI_PREFIX || pathname.startsWith(`${VI_PREFIX}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(VI_PREFIX.length) || "/";
    return NextResponse.redirect(url, 308);
  }

  // 2. /en/... đã khớp thẳng segment [locale] — đi tiếp.
  if (pathname === EN || pathname.startsWith(`${EN}/`)) {
    return NextResponse.next();
  }

  // 3. Chỉ ở TRANG CHỦ mới tôn trọng ngôn ngữ đã lưu. Không áp dụng cho trang trong:
  //    người dùng mở thẳng link VI thì phải thấy đúng trang VI, không bị đá sang /en.
  if (pathname === "/" && request.cookies.get(COOKIE_NAME)?.value === "en") {
    const url = request.nextUrl.clone();
    url.pathname = EN;
    return NextResponse.redirect(url);
  }

  // 4. Còn lại là VI → rewrite sang route nội bộ /vi/...
  const url = request.nextUrl.clone();
  url.pathname = `${VI_PREFIX}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

export const config = {
  // Bỏ qua asset nội bộ của Next, API và mọi file có phần mở rộng (ảnh, favicon, robots.txt…).
  matcher: ["/((?!_next/|api/|.*\\.).*)"],
};
