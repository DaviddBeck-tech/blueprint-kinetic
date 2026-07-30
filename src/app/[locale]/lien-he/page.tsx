import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getSettings } from "@/lib/content";
import { buildAlternates, isLang } from "@/lib/i18n-routing";
import { getServerT } from "@/lib/i18n-server";

import { ContactView } from "./view";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLang(locale)) notFound();
  const t = await getServerT(locale);
  const title = t("contact.meta.title");

  return {
    title,
    description: t("contact.meta.description"),
    alternates: buildAlternates(locale, "/lien-he"),
    openGraph: { title, description: t("contact.meta.ogDescription") },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  if (!isLang(locale)) notFound();

  const settings = await getSettings(locale);
  return <ContactView settings={settings} />;
}
