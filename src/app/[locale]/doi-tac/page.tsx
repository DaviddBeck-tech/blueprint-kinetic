import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPartnersByKind } from "@/lib/content";
import { buildAlternates, isLang } from "@/lib/i18n-routing";
import { getServerT } from "@/lib/i18n-server";

import { PartnersView } from "./view";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLang(locale)) notFound();
  const t = await getServerT(locale);
  const title = t("partners.meta.title");
  const description = t("partners.meta.description");

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/doi-tac"),
    openGraph: { title, description },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  if (!isLang(locale)) notFound();

  const partners = await getPartnersByKind(locale);
  return (
    <PartnersView
      brands={partners.brand}
      clients={partners.client}
      contractors={partners.contractor}
    />
  );
}
