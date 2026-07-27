"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useTranslation } from "react-i18next";

import { localePath, type Lang } from "@/lib/i18n-routing";

type LocaleLinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & {
  /** Đường dẫn TRẦN, không kèm tiền tố ngôn ngữ. Ví dụ "/du-an", "/du-an/benh-vien-103". */
  href: string;
};

/**
 * `<Link>` tự gắn tiền tố ngôn ngữ hiện tại: VI giữ nguyên, EN thành `/en/...`.
 *
 * Locale lấy từ i18next (do layout truyền xuống theo route param) chứ không lấy từ
 * `usePathname()`: trang VI prerender ở `/vi/...` nhưng URL trình duyệt là `/...`,
 * dùng pathname sẽ sinh href khác nhau giữa server và client → lệch hydration.
 */
export function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const { i18n } = useTranslation();
  const locale: Lang = i18n.language?.startsWith("en") ? "en" : "vi";
  return <NextLink href={localePath(locale, href)} {...props} />;
}
