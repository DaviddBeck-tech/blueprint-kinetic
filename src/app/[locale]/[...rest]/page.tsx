import { notFound } from "next/navigation";

/**
 * Catch-all cho mọi URL không khớp route nào (vd `/khong-ton-tai`).
 *
 * Cần thiết vì root layout của app nằm ở `app/[locale]/layout.tsx`: nếu không có route
 * này, Next.js rơi về trang 404 mặc định NGOÀI layout → mất navbar/footer/style.
 * Có nó thì request vẫn khớp `[locale]`, `notFound()` được ném ra bên trong layout và
 * `app/[locale]/not-found.tsx` hiển thị đúng giao diện thương hiệu.
 */
export default function CatchAllNotFound(): never {
  notFound();
}
