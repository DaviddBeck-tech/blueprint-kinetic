"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function ProjectNotFound() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-2xl px-5 py-40 text-center">
      <div className="mono-label text-primary">— PROJECT · NOT_FOUND</div>
      <h1 className="mt-4 font-display text-5xl font-black">
        {t("projects.detail.notFoundTitle")}
      </h1>
      <Link href="/du-an" className="mono-label mt-6 inline-flex text-primary">
        {t("projects.detail.notFoundBack")}
      </Link>
    </div>
  );
}
