import "server-only";

import { createInstance, type TFunction } from "i18next";
import { cookies } from "next/headers";

import { COOKIE_NAME, DEFAULT_LANG, normalizeLang, resources, type Lang } from "./i18n-resources";

/**
 * Ngôn ngữ của request hiện tại, đọc từ cookie `hbh-lang`.
 * Dùng trong layout và generateMetadata (Server Component) để HTML/thẻ meta
 * render đúng ngôn ngữ ngay từ server.
 */
export async function getLang(): Promise<Lang> {
  const store = await cookies();
  return normalizeLang(store.get(COOKIE_NAME)?.value);
}

/**
 * Hàm dịch phía server. Tạo instance i18next riêng cho mỗi lần gọi để tránh
 * rò ngôn ngữ giữa các request chạy song song.
 */
export async function getServerT(): Promise<{ lang: Lang; t: TFunction }> {
  const lang = await getLang();
  const instance = createInstance();
  await instance.init({
    resources,
    lng: lang,
    fallbackLng: DEFAULT_LANG,
    interpolation: { escapeValue: false },
  });
  return { lang, t: instance.t.bind(instance) };
}
