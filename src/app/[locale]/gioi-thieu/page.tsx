import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { buildAlternates, isLang } from "@/lib/i18n-routing";
import { getServerT } from "@/lib/i18n-server";

import { AboutView } from "./view";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLang(locale)) notFound();
  const t = await getServerT(locale);
  const title = t("about.meta.title");
  const description = t("about.meta.description");

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/gioi-thieu"),
    openGraph: { title, description },
  };
}

export default function Page() {
  return <AboutView />;
}
