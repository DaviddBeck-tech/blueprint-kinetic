import { DEFAULT_LANG, LANGS, type Lang } from "./i18n-resources";

export { DEFAULT_LANG, LANGS, type Lang };

/**
 * Chiến lược URL: **VI không có tiền tố, EN có tiền tố `/en`**.
 *
 *   VI  →  /            /du-an        /du-an/benh-vien-103
 *   EN  →  /en          /en/du-an     /en/du-an/benh-vien-103
 *
 * Giữ nguyên URL tiếng Việt đang được index nên không mất SEO.
 * Bên trong, mọi route đều nằm dưới `app/[locale]/`; `middleware.ts` rewrite
 * `/du-an` → `/vi/du-an` mà không đổi URL hiển thị trên thanh địa chỉ.
 */

/** Đường dẫn "trần" (không tiền tố) → URL thật của locale đó. */
export function localePath(locale: Lang, path: string): string {
  const clean = path === "/" ? "" : path;
  return locale === DEFAULT_LANG ? clean || "/" : `/en${clean}`;
}

/**
 * Bỏ tiền tố locale khỏi pathname → đường dẫn trần, dùng để so khớp nav/breadcrumb.
 *
 * Phải xử lý CẢ `/vi` lẫn `/en`, không chỉ `/en`: trang VI được prerender dưới đường dẫn
 * nội bộ `/vi/du-an` nhưng trình duyệt hiển thị `/du-an`. Nếu chỉ cắt `/en` thì server
 * tính ra "/vi/du-an" còn client tính ra "/du-an" → lệch hydration.
 */
export function stripLocale(pathname: string): string {
  for (const locale of LANGS) {
    const prefix = `/${locale}`;
    if (pathname === prefix) return "/";
    if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length);
  }
  return pathname;
}

/**
 * Đọc locale từ pathname.
 *
 * CHỈ dùng ngoài luồng render (middleware, event handler). Trong component hãy lấy
 * ngôn ngữ từ `useTranslation().i18n.language` — pathname lúc prerender (`/vi/...`)
 * khác pathname trên client (`/...`) nên dùng ở đây sẽ lệch hydration.
 */
export function localeFromPathname(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : DEFAULT_LANG;
}

/**
 * Thẻ canonical + hreflang cho một trang.
 * `path` là đường dẫn trần, ví dụ "/du-an" hoặc "/du-an/benh-vien-103".
 */
export function buildAlternates(locale: Lang, path: string) {
  return {
    canonical: localePath(locale, path),
    languages: {
      vi: localePath("vi", path),
      en: localePath("en", path),
      "x-default": localePath(DEFAULT_LANG, path),
    },
  };
}

/** Kiểm tra một chuỗi có phải locale hợp lệ không (dùng để chặn param rác). */
export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}
