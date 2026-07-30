import { cn } from "@/lib/utils";

/**
 * Render thân bài HTML đến từ CMS.
 *
 * ⚠️ **Vì sao không dùng utility class của Tailwind ở đây:** `src/styles.css` khai báo
 * `@import "tailwindcss" source(none)` + `@source "../src"`, tức Tailwind chỉ quét thư
 * mục `src/` lúc build. HTML từ WordPress chỉ tồn tại lúc runtime nên mọi class Tailwind
 * nằm trong đó sẽ KHÔNG được sinh CSS. Toàn bộ style của khối này vì thế nằm ở
 * `.rich-text` trong `styles.css`, viết theo **element** (`h2`, `ul`, `blockquote`…).
 *
 * ⚠️ **Sanitize:** WordPress cho phép nhúng HTML tuỳ ý; tài khoản editor bị chiếm là đủ
 * để chèn script. Trước khi bật CMS thật phải thêm bước làm sạch phía server
 * (`isomorphic-dompurify`) — xem ghi chú trong hàm.
 */
export function RichText({ html, className }: { html: string; className?: string }) {
  if (!html?.trim()) return null;

  return (
    <div
      className={cn("rich-text", className)}
      // TODO(cms): bọc qua DOMPurify.sanitize() ngay khi WP_GRAPHQL_URL được bật.
      // Hiện `html` luôn là chuỗi rỗng (defaults trong repo chưa có thân bài) nên
      // nhánh này chưa chạy với dữ liệu ngoài.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
