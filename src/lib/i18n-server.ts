import "server-only";

import { createInstance, type TFunction } from "i18next";

import { getCopyOverrides } from "./content";
import { buildResources, DEFAULT_LANG, type Lang } from "./i18n-resources";

/**
 * Hàm dịch phía server, dùng trong `generateMetadata`.
 *
 * Locale lấy từ route param `[locale]` chứ không đọc cookie — nhờ vậy các trang
 * vẫn prerender tĩnh được. Tạo instance i18next riêng mỗi lần gọi để tránh
 * rò ngôn ngữ giữa các request chạy song song trên cùng một process.
 *
 * Tự nạp bản ghi đè từ CMS nên `<title>` / `<meta description>` cũng do client sửa
 * được, không chỉ chữ trong thân trang.
 */
export async function getServerT(locale: Lang): Promise<TFunction> {
  const overrides = await getCopyOverrides(locale);
  const instance = createInstance();
  await instance.init({
    resources: buildResources(locale, overrides),
    lng: locale,
    fallbackLng: DEFAULT_LANG,
    interpolation: { escapeValue: false },
  });
  return instance.t.bind(instance);
}
