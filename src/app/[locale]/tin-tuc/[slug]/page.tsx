import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { news } from "@/lib/data";
import { buildAlternates, isLang } from "@/lib/i18n-routing";
import { getServerT } from "@/lib/i18n-server";

import { NewsDetailView } from "./view";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

/**
 * Chỉ cần trả về `slug`. Next.js tự nhân với `locale` do generateStaticParams của
 * layout cha sinh ra → prerender 4 bài × 2 ngôn ngữ = 8 trang tĩnh.
 */
export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLang(locale)) notFound();
  const t = await getServerT(locale);
  const post = news.find((n) => n.slug === slug);

  if (!post) {
    return { title: t("news.meta.detailFallbackTitle"), robots: { index: false } };
  }

  const isEn = locale === "en";
  const title = isEn ? post.titleEn : post.title;
  const description = isEn ? post.excerptEn : post.excerpt;

  return {
    title: `${title} — HBH Vietnam`,
    description,
    alternates: buildAlternates(locale, `/tin-tuc/${post.slug}`),
    openGraph: { title, description, images: [post.image] },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = news.find((n) => n.slug === slug);
  if (!post) notFound();

  return <NewsDetailView post={post} />;
}
