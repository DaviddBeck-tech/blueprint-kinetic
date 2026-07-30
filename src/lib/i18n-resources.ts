import { deepMerge } from "./content/merge";
import type { CopyOverrides } from "./content/types";
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

/**
 * Resources **mặc định** — nguồn chữ nằm ngay trong repo, dùng chung cho client
 * (react-i18next) và server (generateMetadata).
 *
 * Đây là "bản default" của site: chưa cắm CMS thì toàn bộ chữ đến từ đây, site vẫn
 * đầy đủ và đúng thiết kế.
 */
export const resources = {
  vi: { translation: vi },
  en: { translation: en },
};

export type Translation = typeof vi;

/**
 * Trộn bản ghi đè từ CMS lên trên defaults.
 *
 * Chỉ ngôn ngữ đang hiển thị được đè; bundle còn lại giữ nguyên để `fallbackLng`
 * vẫn hoạt động. Object rỗng (trường hợp phổ biến nhất — CMS chưa cắm, hoặc client
 * chưa sửa chữ nào) trả về đúng object defaults, không tạo bản sao thừa.
 *
 * ⚠️ Server và client **phải gọi hàm này với cùng một `overrides`**, nếu không HTML
 * prerender sẽ khác HTML client dựng lại → lệch hydration.
 */
export function buildResources(locale: Lang, overrides?: CopyOverrides) {
  if (!overrides || Object.keys(overrides).length === 0) return resources;

  return {
    ...resources,
    [locale]: { translation: deepMerge(locale === "en" ? en : vi, overrides) },
  };
}

/** Chuẩn hoá một giá trị bất kỳ về Lang hợp lệ. */
export function normalizeLang(value?: string | null): Lang {
  return value === "en" ? "en" : DEFAULT_LANG;
}

/** Đọc ngôn ngữ từ chuỗi cookie thô (client: `document.cookie`). */
export function parseLang(cookieHeader?: string | null): Lang {
  const m = cookieHeader?.match(/(?:^|;\s*)hbh-lang=(vi|en)\b/);
  return normalizeLang(m?.[1]);
}
