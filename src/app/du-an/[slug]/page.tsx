import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { projects } from "@/lib/data";
import { getServerT } from "@/lib/i18n-server";

import { ProjectDetailView } from "./view";

type PageProps = { params: Promise<{ slug: string }> };

/**
 * Khai báo danh sách slug đã biết từ data.ts.
 * Hiện chưa prerender tĩnh được vì root layout đọc cookies() để lấy ngôn ngữ → mọi route render động.
 * Giữ lại để sẵn sàng khi chuyển sang định tuyến /vi | /en (bỏ phụ thuộc cookie).
 */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { lang, t } = await getServerT();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: t("projects.meta.detailFallbackTitle"), robots: { index: false } };
  }

  const isEn = lang === "en";
  const title = `${isEn ? project.nameEn : project.name} — HBH Vietnam`;
  const description = isEn ? project.scopeEn : project.scope;

  return {
    title,
    description,
    openGraph: { title, description, images: [project.image] },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return <ProjectDetailView project={project} />;
}
