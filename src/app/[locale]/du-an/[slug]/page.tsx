import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { projects } from "@/lib/data";
import { buildAlternates, isLang } from "@/lib/i18n-routing";
import { getServerT } from "@/lib/i18n-server";

import { ProjectDetailView } from "./view";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

/**
 * Chỉ cần trả về `slug`. Next.js tự nhân với `locale` do generateStaticParams của
 * layout cha sinh ra → prerender 6 dự án × 2 ngôn ngữ = 12 trang tĩnh.
 */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLang(locale)) notFound();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    const t = await getServerT(locale);
    return { title: t("projects.meta.detailFallbackTitle"), robots: { index: false } };
  }

  const isEn = locale === "en";
  const title = `${isEn ? project.nameEn : project.name} — HBH Vietnam`;
  const description = isEn ? project.scopeEn : project.scope;

  return {
    title,
    description,
    alternates: buildAlternates(locale, `/du-an/${project.slug}`),
    openGraph: { title, description, images: [project.image] },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return <ProjectDetailView project={project} />;
}
