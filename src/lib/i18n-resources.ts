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

export const LANGS: readonly Lang[] = ["vi", "en"];
export const DEFAULT_LANG: Lang = "vi";
export const COOKIE_NAME = "hbh-lang";

/** Resources dùng chung cho cả client (react-i18next) và server (generateMetadata). */
export const resources = {
  vi: { translation: vi },
  en: { translation: en },
} as const;

/** Chuẩn hoá một giá trị bất kỳ về Lang hợp lệ. */
export function normalizeLang(value?: string | null): Lang {
  return value === "en" ? "en" : DEFAULT_LANG;
}

/** Đọc ngôn ngữ từ chuỗi cookie thô (client: `document.cookie`). */
export function parseLang(cookieHeader?: string | null): Lang {
  const m = cookieHeader?.match(/(?:^|;\s*)hbh-lang=(vi|en)\b/);
  return normalizeLang(m?.[1]);
}
