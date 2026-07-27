import "server-only";

import { createInstance, type TFunction } from "i18next";

import { DEFAULT_LANG, resources, type Lang } from "./i18n-resources";

/**
 * Hàm dịch phía server, dùng trong `generateMetadata`.
 *
 * Locale lấy từ route param `[locale]` chứ không đọc cookie — nhờ vậy các trang
 * vẫn prerender tĩnh được. Tạo instance i18next riêng mỗi lần gọi để tránh
 * rò ngôn ngữ giữa các request chạy song song trên cùng một process.
 */
export async function getServerT(locale: Lang): Promise<TFunction> {
  const instance = createInstance();
  await instance.init({
    resources,
    lng: locale,
    fallbackLng: DEFAULT_LANG,
    interpolation: { escapeValue: false },
  });
  return instance.t.bind(instance);
}
