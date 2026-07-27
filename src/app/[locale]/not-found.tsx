"use client";

import { useTranslation } from "react-i18next";

import { LocaleLink as Link } from "@/components/LocaleLink";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-24">
      <div className="max-w-lg text-center">
        <div className="mono-label text-primary">ERROR · 404 · NOT_FOUND</div>
        <h1 className="mt-4 font-display text-8xl font-black tracking-tight">404</h1>
        <p className="mt-4 text-muted-foreground">{t("notFound.body")}</p>
        <Link
          href="/"
          className="mt-8 inline-block bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          {t("notFound.backHome")}
        </Link>
      </div>
    </div>
  );
}
