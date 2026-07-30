import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getFields } from "@/lib/content";
import { buildAlternates, isLang } from "@/lib/i18n-routing";
import { getServerT } from "@/lib/i18n-server";

import { FieldsView } from "./view";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLang(locale)) notFound();
  const t = await getServerT(locale);
  const title = t("fields.meta.title");
  const description = t("fields.meta.description");

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/linh-vuc-kinh-doanh"),
    openGraph: { title, description },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  if (!isLang(locale)) notFound();

  const fields = await getFields(locale);
  return <FieldsView fields={fields} />;
}
