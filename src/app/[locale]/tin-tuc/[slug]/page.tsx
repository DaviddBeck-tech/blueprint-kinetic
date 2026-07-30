import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPost, getPosts, getPostSlugs } from "@/lib/content";
import { buildAlternates, isLang } from "@/lib/i18n-routing";
import { getServerT } from "@/lib/i18n-server";

import { NewsDetailView } from "./view";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

/**
 * Chỉ cần trả về `slug`. Next.js tự nhân với `locale` do generateStaticParams của
 * layout cha sinh ra → prerender (số bài) × 2 ngôn ngữ trang tĩnh.
 *
 * Khi cắm CMS, danh sách này lấy từ WordPress lúc build nên bài mới đăng sẽ tự có
 * trang tĩnh ở lần build/revalidate kế tiếp.
 */
export async function generateStaticParams() {
  return getPostSlugs();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLang(locale)) notFound();
  const post = await getPost(locale, slug);

  if (!post) {
    const t = await getServerT(locale);
    return { title: t("news.meta.detailFallbackTitle"), robots: { index: false } };
  }

  return {
    title: `${post.title} — HBH Vietnam`,
    description: post.excerpt,
    alternates: buildAlternates(locale, `/tin-tuc/${post.slug}`),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image.url],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isLang(locale)) notFound();

  const post = await getPost(locale, slug);
  if (!post) notFound();

  const related = (await getPosts(locale)).filter((n) => n.slug !== slug).slice(0, 3);
  return <NewsDetailView post={post} related={related} />;
}
