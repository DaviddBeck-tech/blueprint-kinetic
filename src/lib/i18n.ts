import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { common } from "./locales/common";
import { home } from "./locales/home";
import { about } from "./locales/about";
import { fields } from "./locales/fields";
import { projects } from "./locales/projects";
import { services } from "./locales/services";
import { partners } from "./locales/partners";
import { news } from "./locales/news";
import { contact } from "./locales/contact";

/** Gộp các module locale theo trang: common ở top-level, mỗi trang nằm dưới key riêng. */
const vi = {
  ...common.vi,
  home: home.vi,
  about: about.vi,
  fields: fields.vi,
  projects: projects.vi,
  services: services.vi,
  partners: partners.vi,
  news: news.vi,
  contact: contact.vi,
};

const en = {
  ...common.en,
  home: home.en,
  about: about.en,
  fields: fields.en,
  projects: projects.en,
  services: services.en,
  partners: partners.en,
  news: news.en,
  contact: contact.en,
};

export type Lang = "vi" | "en";
export const COOKIE_NAME = "hbh-lang";

/** Đọc ngôn ngữ từ chuỗi cookie (dùng chung cho client `document.cookie` và server request header). */
export function parseLang(cookieHeader?: string | null): Lang {
  const m = cookieHeader?.match(/(?:^|;\s*)hbh-lang=(vi|en)\b/);
  return m ? (m[1] as Lang) : "vi";
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: { vi: { translation: vi }, en: { translation: en } },
    // Client: đọc cookie ngay khi init → khớp với ngôn ngữ server render theo cùng cookie (không lệch hydration).
    // Server: init mặc định "vi"; middleware trong start.ts set đúng ngôn ngữ theo cookie của từng request.
    lng: typeof document !== "undefined" ? parseLang(document.cookie) : "vi",
    fallbackLng: "vi",
    interpolation: { escapeValue: false },
  });
}

/** Đổi ngôn ngữ + lưu cookie (server đọc được để SSR đúng ngôn ngữ ở lần tải sau). */
export function setLanguage(lng: Lang) {
  i18n.changeLanguage(lng);
  if (typeof document !== "undefined") {
    document.cookie = `${COOKIE_NAME}=${lng};path=/;max-age=31536000;samesite=lax`;
    try {
      localStorage.setItem(COOKIE_NAME, lng);
    } catch {
      /* ignore */
    }
  }
}

export default i18n;
