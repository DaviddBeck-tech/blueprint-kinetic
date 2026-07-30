import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProject, getProjects, getProjectSlugs } from "@/lib/content";
import { buildAlternates, isLang } from "@/lib/i18n-routing";
import { getServerT } from "@/lib/i18n-server";

import { ProjectDetailView } from "./view";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

/**
 * Chỉ cần trả về `slug`. Next.js tự nhân với `locale` do generateStaticParams của
 * layout cha sinh ra → prerender (số dự án) × 2 ngôn ngữ trang tĩnh.
 *
 * Khi cắm CMS, danh sách này lấy từ WordPress lúc build nên dự án mới tạo trong CMS
 * sẽ tự có trang tĩnh ở lần build/revalidate kế tiếp.
 */
export async function generateStaticParams() {
  return getProjectSlugs();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLang(locale)) notFound();
  const project = await getProject(locale, slug);

  if (!project) {
    const t = await getServerT(locale);
    return { title: t("projects.meta.detailFallbackTitle"), robots: { index: false } };
  }

  return {
    title: `${project.name} — HBH Vietnam`,
    description: project.scope,
    alternates: buildAlternates(locale, `/du-an/${project.slug}`),
    openGraph: {
      title: project.name,
      description: project.scope,
      images: [project.image.url],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isLang(locale)) notFound();

  const project = await getProject(locale, slug);
  if (!project) notFound();

  const related = (await getProjects(locale)).filter((o) => o.slug !== slug).slice(0, 3);
  return <ProjectDetailView project={project} related={related} />;
}
