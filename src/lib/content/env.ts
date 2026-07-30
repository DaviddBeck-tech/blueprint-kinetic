import "server-only";

/**
 * Cấu hình nguồn nội dung.
 *
 * Nguyên tắc: **thiếu cấu hình thì im lặng rơi về defaults trong repo**, không throw.
 * Nhờ vậy `pnpm dev` và `pnpm build` chạy được ngay khi chưa có WordPress — đúng
 * yêu cầu "FE có sẵn text mặc định, cắm CMS sau".
 */

/** Endpoint GraphQL của WordPress, ví dụ `https://cms.hbhvietnam.vn/graphql`. */
export const WP_GRAPHQL_URL = process.env.WP_GRAPHQL_URL?.trim() ?? "";

/** Application Password (`user:xxxx xxxx ...`) — chỉ cần khi đọc bản nháp để preview. */
export const WP_AUTH = process.env.WP_APP_PASSWORD?.trim() ?? "";

/** Secret dùng chung giữa mu-plugin của WP và `/api/revalidate`. */
export const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET?.trim() ?? "";

/**
 * Số giây cache cho mỗi truy vấn CMS. On-demand revalidation (webhook từ WP) mới là
 * cơ chế chính; con số này chỉ là lưới an toàn phòng khi webhook không tới.
 */
export const CMS_REVALIDATE_SECONDS = Number(process.env.CMS_REVALIDATE_SECONDS ?? 3600);

/** CMS được coi là "đã cắm" khi và chỉ khi có endpoint GraphQL. */
export function isCmsEnabled(): boolean {
  return WP_GRAPHQL_URL.length > 0;
}

/**
 * Khi build production mà CMS lỗi thì nên fail to biết ngay, thay vì âm thầm deploy
 * một site toàn nội dung mẫu. Ở dev thì ngược lại — cứ chạy tiếp với defaults.
 */
export function shouldFailOnCmsError(): boolean {
  return isCmsEnabled() && process.env.NODE_ENV === "production";
}
