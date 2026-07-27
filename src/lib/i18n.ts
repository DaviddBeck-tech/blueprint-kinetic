"use client";

import { createInstance, type i18n as I18nInstance } from "i18next";
import { initReactI18next } from "react-i18next";

import { COOKIE_NAME, DEFAULT_LANG, resources, type Lang } from "./i18n-resources";

export { COOKIE_NAME, parseLang, normalizeLang, type Lang } from "./i18n-resources";

/**
 * Tạo instance i18next riêng cho mỗi lần render.
 *
 * Không dùng singleton toàn cục như bản Vite cũ: trên server Next.js nhiều request
 * chạy song song trong cùng process, singleton + changeLanguage sẽ rò ngôn ngữ
 * từ request này sang request khác. Mỗi <Providers> giữ một instance của chính nó.
 */
export function createI18nInstance(lng: Lang = DEFAULT_LANG): I18nInstance {
  const instance = createInstance();
  instance.use(initReactI18next).init({
    resources,
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
