import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { news } from "@/lib/data";

import { NewsDetailView } from "./view";

type PageProps = { params: Promise<{ slug: string }> };

/**
 * Khai báo danh sách slug đã biết từ data.ts.
 * Hiện chưa prerender tĩnh được vì root layout đọc cookies() để lấy ngôn ngữ → mọi route render động.
 */
export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = news.find((n) => n.slug === slug);

  if (!post) {
    return { title: "Tin tức — HBH Vietnam", robots: { index: false } };
  }

  return {
    title: `${post.title} — HBH Vietnam`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = news.find((n) => n.slug === slug);
  if (!post) notFound();

  return <NewsDetailView post={post} />;
}
