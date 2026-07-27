"use client";

import { LocaleLink as Link } from "@/components/LocaleLink";
import { useTranslation } from "react-i18next";

export default function NewsNotFound() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-2xl px-5 py-40 text-center">
      <h1 className="font-display text-4xl font-black">{t("news.detail.notFoundTitle")}</h1>
      <Link href="/tin-tuc" className="mono-label mt-6 inline-flex text-primary">
        ← {t("news.detail.backToList")}
      </Link>
    </div>
  );
}
