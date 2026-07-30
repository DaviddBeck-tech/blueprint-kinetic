"use client";

import { createInstance, type i18n as I18nInstance } from "i18next";
import { initReactI18next } from "react-i18next";

import type { CopyOverrides } from "./content/types";
import { buildResources, COOKIE_NAME, DEFAULT_LANG, type Lang } from "./i18n-resources";

export { COOKIE_NAME, parseLang, normalizeLang, type Lang } from "./i18n-resources";

/**
 * Tạo instance i18next riêng cho mỗi lần render.
 *
 * Không dùng singleton toàn cục như bản Vite cũ: trên server Next.js nhiều request
 * chạy song song trong cùng process, singleton + changeLanguage sẽ rò ngôn ngữ
 * từ request này sang request khác. Mỗi <Providers> giữ một instance của chính nó.
 *
 * `overrides` là chữ do client sửa trong CMS, được layout lấy ở phía server rồi truyền
 * xuống. Truyền cùng giá trị mà server đã dùng để render thì HTML hai bên khớp nhau.
 */
export function createI18nInstance(
  lng: Lang = DEFAULT_LANG,
  overrides?: CopyOverrides,
): I18nInstance {
  const instance = createInstance();
  instance.use(initReactI18next).init({
    resources: buildResources(lng, overrides),
    lng,
    fallbackLng: DEFAULT_LANG,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
  return instance;
}

/** Ghi cookie ngôn ngữ để lần tải sau server SSR đúng ngôn ngữ (khớp với client → không lệch hydration). */
export function persistLanguage(lng: Lang) {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=${lng};path=/;max-age=31536000;samesite=lax`;
  try {
    localStorage.setItem(COOKIE_NAME, lng);
  } catch {
    /* ignore */
  }
}
