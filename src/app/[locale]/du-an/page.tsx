import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProjects } from "@/lib/content";
import { buildAlternates, isLang } from "@/lib/i18n-routing";
import { getServerT } from "@/lib/i18n-server";

import { ProjectsListView } from "./view";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLang(locale)) notFound();
  const t = await getServerT(locale);
  const title = t("projects.meta.title");
  const description = t("projects.meta.description");

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/du-an"),
    openGraph: { title, description },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  if (!isLang(locale)) notFound();

  const projects = await getProjects(locale);
  return <ProjectsListView projects={projects} />;
}
