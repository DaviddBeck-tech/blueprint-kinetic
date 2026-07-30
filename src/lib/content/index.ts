import "server-only";

import {
  loadCopyOverrides,
  loadFields,
  loadPartners,
  loadPosts,
  loadProjects,
  loadSettings,
} from "./source";
import type { Lang, Partner, PartnerKind, Post, Project } from "./types";

export type * from "./types";
export { activeSourceName } from "./source";

/**
 * API công khai của tầng content — **chỉ gọi được từ Server Component**.
 *
 * Mọi `page.tsx` lấy dữ liệu qua đây rồi truyền xuống `view.tsx` bằng props. Client
 * Component không được import file này (đã chặn bằng `server-only`): nếu component
 * phía client tự gọi CMS thì mất SSG, lộ token, và vỡ i18n.
 */

export async function getProjects(locale: Lang): Promise<Project[]> {
  return loadProjects(locale);
}

export async function getProject(locale: Lang, slug: string): Promise<Project | null> {
  const all = await loadProjects(locale);
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getPosts(locale: Lang): Promise<Post[]> {
  return loadPosts(locale);
}

export async function getPost(locale: Lang, slug: string): Promise<Post | null> {
  const all = await loadPosts(locale);
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getFields(locale: Lang) {
  return loadFields(locale);
}

export async function getSettings(locale: Lang) {
  return loadSettings(locale);
}

export async function getCopyOverrides(locale: Lang) {
  return loadCopyOverrides(locale);
}

/** Đối tác đã gom theo loại — đúng 3 lưới logo mà trang "Đối tác" đang dựng. */
export async function getPartnersByKind(locale: Lang): Promise<Record<PartnerKind, Partner[]>> {
  const all = await loadPartners(locale);
  return {
    brand: all.filter((p) => p.kind === "brand"),
    client: all.filter((p) => p.kind === "client"),
    contractor: all.filter((p) => p.kind === "contractor"),
  };
}

/**
 * Slug cho `generateStaticParams`.
 *
 * Chỉ cần một ngôn ngữ: slug giống nhau ở cả VI và EN (xem ghi chú song ngữ trong
 * `adapters/wordpress.ts`), và Next tự nhân danh sách này với `locale` do layout sinh ra.
 */
export async function getProjectSlugs(): Promise<{ slug: string }[]> {
  const all = await loadProjects("vi");
  return all.map((p) => ({ slug: p.slug }));
}

export async function getPostSlugs(): Promise<{ slug: string }[]> {
  const all = await loadPosts("vi");
  return all.map((p) => ({ slug: p.slug }));
}

/** Danh mục tin tức có thật trong dữ liệu, dùng để dựng thanh lọc mà không hardcode. */
export async function getPostCategories(locale: Lang) {
  const posts = await loadPosts(locale);
  const seen = new Map<string, { slug: string; name: string }>();
  for (const post of posts) {
    if (!seen.has(post.category.slug)) seen.set(post.category.slug, post.category);
  }
  return [...seen.values()];
}
