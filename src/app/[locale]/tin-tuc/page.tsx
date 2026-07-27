import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { buildAlternates, isLang } from "@/lib/i18n-routing";
import { getServerT } from "@/lib/i18n-server";

import { NewsView } from "./view";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLang(locale)) notFound();
  const t = await getServerT(locale);
  const title = t("news.meta.title");
  const description = t("news.meta.description");

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/tin-tuc"),
    openGraph: { title, description },
  };
}

export default function Page() {
  return <NewsView />;
}
