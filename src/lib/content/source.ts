import "server-only";

import { IMG } from "@/lib/data";

import { staticAdapter } from "./adapters/static";
import { wordpressAdapter } from "./adapters/wordpress";
import { isCmsEnabled, shouldFailOnCmsError } from "./env";
import { deepMerge } from "./merge";
import type { ContentAdapter, Lang, Media } from "./types";

/**
 * Chọn nguồn nội dung và xử lý fallback.
 *
 * Đây là nơi hiện thực đúng câu "FE giữ bản mặc định, CMS ghi đè":
 *
 *   CMS chưa cấu hình      → dùng defaults trong repo, site chạy bình thường.
 *   CMS có nhưng lỗi/rỗng  → dev: cảnh báo rồi dùng defaults.
 *                            production: ném lỗi để build fail — thà biết ngay còn hơn
 *                            deploy im lặng một site toàn nội dung mẫu.
 *   CMS có dữ liệu         → dùng dữ liệu CMS, những field client bỏ trống vẫn rơi
 *                            về default (xem `fillMedia` và `getSettings`).
 */

const cms: ContentAdapter = wordpressAdapter;

/** Ảnh cuối cùng khi cả CMS lẫn defaults đều không có gì — tránh vỡ layout. */
const PLACEHOLDER: Media = { url: IMG.chiller, alt: "HBH Vietnam" };

/** Nguồn đang thực sự được dùng — hiện lên log build để không phải đoán. */
export function activeSourceName(): string {
  return isCmsEnabled() ? cms.name : staticAdapter.name;
}

/**
 * Chạy truy vấn CMS, thất bại thì rơi về defaults.
 *
 * `label` chỉ dùng cho thông báo lỗi, giúp biết ngay truy vấn nào hỏng khi build đỏ.
 */
async function withFallback<T>(
  label: string,
  fromCms: () => Promise<T>,
  fromDefaults: () => Promise<T>,
  isEmpty: (value: T) => boolean,
): Promise<T> {
  if (!isCmsEnabled()) return fromDefaults();

  try {
    const result = await fromCms();
    if (isEmpty(result)) {
      if (shouldFailOnCmsError()) {
        throw new Error(`CMS trả về rỗng cho "${label}"`);
      }
      console.warn(`[content] CMS rỗng ở "${label}" — dùng defaults trong repo.`);
      return fromDefaults();
    }
    return result;
  } catch (error) {
    if (shouldFailOnCmsError()) throw error;
    console.warn(`[content] Lỗi khi đọc "${label}" từ CMS — dùng defaults.`, error);
    return fromDefaults();
  }
}

const isEmptyList = (list: unknown[]) => list.length === 0;

/**
 * Ảnh trống từ CMS → lấy ảnh của bản default cùng `slug`.
 *
 * Tình huống thật: client tạo bài trong WP nhưng quên gắn featured image. Không nên vì
 * thế mà site hiện ô ảnh vỡ.
 */
function fillMedia<T extends { slug: string; image: Media }>(items: T[], defaults: T[]): T[] {
  if (items === defaults) return items;
  const bySlug = new Map(defaults.map((d) => [d.slug, d]));
  return items.map((item) =>
    item.image.url ? item : { ...item, image: bySlug.get(item.slug)?.image ?? PLACEHOLDER },
  );
}

export async function loadProjects(locale: Lang) {
  const defaults = await staticAdapter.getProjects(locale);
  const items = await withFallback(
    "projects",
    () => cms.getProjects(locale),
    async () => defaults,
    isEmptyList,
  );
  return fillMedia(items, defaults);
}

export async function loadPosts(locale: Lang) {
  const defaults = await staticAdapter.getPosts(locale);
  const items = await withFallback(
    "posts",
    () => cms.getPosts(locale),
    async () => defaults,
    isEmptyList,
  );
  return fillMedia(items, defaults);
}

export async function loadFields(locale: Lang) {
  const defaults = await staticAdapter.getFields(locale);
  const items = await withFallback(
    "fields",
    () => cms.getFields(locale),
    async () => defaults,
    isEmptyList,
  );
  return fillMedia(items, defaults);
}

export async function loadPartners(locale: Lang) {
  const defaults = await staticAdapter.getPartners(locale);
  return withFallback(
    "partners",
    () => cms.getPartners(locale),
    async () => defaults,
    isEmptyList,
  );
}

/**
 * Settings merge ở mức **từng field**: client chỉ sửa số điện thoại thì địa chỉ, MST,
 * giờ làm việc vẫn giữ giá trị trong repo. Đây là hành vi quan trọng nhất của tầng này.
 */
export async function loadSettings(locale: Lang) {
  const defaults = await staticAdapter.getSettings(locale);
  const fromCms = await withFallback(
    "settings",
    () => cms.getSettings(locale),
    async () => defaults,
    () => false,
  );
  return deepMerge(defaults, fromCms);
}

/**
 * Bản ghi đè copy để merge vào i18next. Không có CMS thì trả `{}` — toàn bộ chữ trên
 * site đến từ `src/lib/locales/*` như hiện tại.
 */
export async function loadCopyOverrides(locale: Lang) {
  return withFallback(
    "copy",
    () => cms.getCopyOverrides(locale),
    async () => ({}),
    () => false,
  );
}
