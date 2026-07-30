import "server-only";

import { CMS_REVALIDATE_SECONDS, WP_AUTH, WP_GRAPHQL_URL } from "../env";
import type {
  ContentAdapter,
  CopyOverrides,
  Field,
  Lang,
  Media,
  Partner,
  PartnerKind,
  Post,
  Project,
  ProjectType,
  SiteSettings,
} from "../types";

/**
 * Adapter WordPress (headless, qua WPGraphQL).
 *
 * ⚠️ WordPress chưa được dựng — các truy vấn bên dưới viết theo đúng content model đã
 * chốt trong plan (CPT `project` / `field` / `partner` / `hbh_settings`, taxonomy
 * `system`, ACF field song ngữ). Khi dựng WP **phải đặt đúng tên field như ở đây**,
 * hoặc sửa lại mapper cho khớp. Chừng nào `WP_GRAPHQL_URL` chưa được set thì file này
 * không chạy — site dùng defaults trong repo.
 *
 * ─── Song ngữ ────────────────────────────────────────────────────────────────
 * Đang theo **phương án A**: MỘT bài chứa cả hai ngôn ngữ. VI nằm ở field gốc của WP
 * (`title`, `excerpt`, `content`), EN nằm ở ACF (`titleEn`, `excerptEn`, `contentEn`).
 * Ưu điểm quyết định: chỉ có một post nên slug VI và EN **không thể lệch nhau** —
 * đúng yêu cầu URL `/du-an/x` ↔ `/en/du-an/x`.
 *
 * Nếu sau này đổi sang Polylang (mỗi ngôn ngữ một post), chỗ duy nhất phải sửa là
 * `pickLang()` và tham số `language` trong truy vấn — mapper giữ nguyên.
 */

type GqlResponse<T> = { data?: T; errors?: { message: string }[] };

/** Chọn chuỗi theo ngôn ngữ, thiếu bản EN thì rơi về VI. */
function pickLang(locale: Lang, vi: string, en?: string | null): string {
  return locale === "en" && en ? en : vi;
}

/**
 * Gọi WPGraphQL.
 *
 * `tags` được gắn vào cache của Next để mu-plugin bên WP có thể gọi
 * `/api/revalidate` làm mới đúng phần nội dung vừa sửa, thay vì rebuild cả site.
 */
export async function wpQuery<T>(
  query: string,
  variables: Record<string, unknown> = {},
  tags: string[] = [],
): Promise<T> {
  if (!WP_GRAPHQL_URL) throw new Error("WP_GRAPHQL_URL chưa được cấu hình");

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  // Chỉ cần khi đọc bản nháp cho chế độ preview; nội dung đã publish là public.
  if (WP_AUTH) headers.Authorization = `Basic ${Buffer.from(WP_AUTH).toString("base64")}`;

  const res = await fetch(WP_GRAPHQL_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    next: { revalidate: CMS_REVALIDATE_SECONDS, tags },
  });

  if (!res.ok) throw new Error(`WPGraphQL HTTP ${res.status} ${res.statusText}`);

  const json = (await res.json()) as GqlResponse<T>;
  if (json.errors?.length)
    throw new Error(`WPGraphQL: ${json.errors.map((e) => e.message).join("; ")}`);
  if (!json.data) throw new Error("WPGraphQL trả về rỗng");

  return json.data;
}

// ─── Fragment dùng lại ────────────────────────────────────────────────────────

const IMAGE_FRAGMENT = `
  node { sourceUrl altText mediaDetails { width height } }
`;

type WpImage = {
  node?: {
    sourceUrl?: string | null;
    altText?: string | null;
    mediaDetails?: { width?: number | null; height?: number | null } | null;
  } | null;
} | null;

/** Ảnh CMS thiếu → trả `null` để caller quyết định rơi về ảnh default. */
function toMedia(img: WpImage, fallbackAlt: string): Media | null {
  const node = img?.node;
  if (!node?.sourceUrl) return null;
  return {
    url: node.sourceUrl,
    alt: node.altText || fallbackAlt,
    width: node.mediaDetails?.width ?? undefined,
    height: node.mediaDetails?.height ?? undefined,
  };
}

// ─── Truy vấn ─────────────────────────────────────────────────────────────────

const PROJECTS_QUERY = `
  query Projects {
    projects(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        slug
        title
        featuredImage { ${IMAGE_FRAGMENT} }
        systems { nodes { slug name } }
        # ACF free KHÔNG có Gallery field (Pro-only). Thay bằng ảnh đính kèm native của
        # WP — mu-plugin đăng ký field này, xem wordpress/mu-plugins/hbh-content-model.php
        galleryImages { sourceUrl altText mediaDetails { width height } }
        projectFields {
          titleEn client clientEn projectType location locationEn
          year scope scopeEn body bodyEn featured
        }
      }
    }
  }
`;

const POSTS_QUERY = `
  query Posts {
    posts(first: 100, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      nodes {
        slug title date excerpt content
        featuredImage { ${IMAGE_FRAGMENT} }
        categories { nodes { slug name } }
        postFields { titleEn excerptEn contentEn categoryNameEn featured }
      }
    }
  }
`;

const FIELDS_QUERY = `
  query BusinessFields {
    businessFields(first: 20, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        slug title
        featuredImage { ${IMAGE_FRAGMENT} }
        fieldFields { number titleEn description descriptionEn brands body bodyEn }
      }
    }
  }
`;

const PARTNERS_QUERY = `
  query Partners {
    partners(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        title
        featuredImage { ${IMAGE_FRAGMENT} }
        partnerFields { kind url }
      }
    }
  }
`;

const SETTINGS_QUERY = `
  query SiteSettings {
    hbhSettings(first: 1) {
      nodes {
        settingsFields {
          companyName taxId address addressEn phone phoneDisplay
          email zaloUrl hours hoursEn copyOverridesVi copyOverridesEn
        }
      }
    }
  }
`;

// ─── Mapper ───────────────────────────────────────────────────────────────────

/* eslint-disable @typescript-eslint/no-explicit-any */

function mapProject(locale: Lang, node: any): Project {
  const f = node.projectFields ?? {};
  const name = pickLang(locale, node.title ?? "", f.titleEn);
  const systemNodes: any[] = node.systems?.nodes ?? [];
  const image = toMedia(node.featuredImage, name);

  return {
    slug: node.slug,
    name,
    client: pickLang(locale, f.client ?? "", f.clientEn),
    type: (f.projectType ?? "infra") as ProjectType,
    system: systemNodes.map((s) => s.name),
    systemSlugs: systemNodes.map((s) => s.slug),
    location: pickLang(locale, f.location ?? "", f.locationEn),
    year: Number(f.year) || 0,
    scope: pickLang(locale, f.scope ?? "", f.scopeEn),
    // Ảnh là bắt buộc phía dưới; thiếu trong CMS thì để rỗng và caller sẽ merge default.
    image: image ?? { url: "", alt: name },
    gallery: ((node.galleryImages ?? []) as any[])
      .map((n, i) => toMedia({ node: n }, `${name} — ${i + 1}`))
      .filter(Boolean) as Media[],
    body: pickLang(locale, f.body ?? "", f.bodyEn),
    featured: Boolean(f.featured),
  };
}

function mapPost(locale: Lang, node: any): Post {
  const f = node.postFields ?? {};
  const title = pickLang(locale, node.title ?? "", f.titleEn);
  const cat = node.categories?.nodes?.[0];
  const image = toMedia(node.featuredImage, title);

  return {
    slug: node.slug,
    title,
    category: {
      slug: cat?.slug ?? "uncategorized",
      name: pickLang(locale, cat?.name ?? "", f.categoryNameEn),
    },
    // WP trả ISO datetime đầy đủ; site chỉ hiển thị YYYY-MM-DD.
    date: (node.date ?? "").slice(0, 10),
    excerpt: stripHtml(pickLang(locale, node.excerpt ?? "", f.excerptEn)),
    image: image ?? { url: "", alt: title },
    body: pickLang(locale, node.content ?? "", f.contentEn),
    featured: Boolean(f.featured),
  };
}

function mapField(locale: Lang, node: any): Field {
  const f = node.fieldFields ?? {};
  const name = pickLang(locale, node.title ?? "", f.titleEn);
  const image = toMedia(node.featuredImage, name);

  return {
    id: String(f.number ?? "").padStart(2, "0"),
    slug: node.slug,
    name,
    desc: pickLang(locale, f.description ?? "", f.descriptionEn),
    // ACF free không có Repeater → brands nhập dạng chuỗi ngăn cách bởi dấu phẩy.
    brands: String(f.brands ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    image: image ?? { url: "", alt: name },
    body: pickLang(locale, f.body ?? "", f.bodyEn),
  };
}

function mapPartner(node: any): Partner {
  const f = node.partnerFields ?? {};
  const name = node.title ?? "";
  return {
    name,
    logo: toMedia(node.featuredImage, name) ?? { url: "", alt: name },
    kind: (f.kind ?? "brand") as PartnerKind,
    url: f.url || undefined,
  };
}

/* eslint-enable @typescript-eslint/no-explicit-any */

/** WP trả excerpt bọc trong `<p>` — bóc ra vì chỗ hiển thị là plain text. */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&hellip;/g, "…")
    .replace(/&nbsp;/g, " ")
    .trim();
}

/** Copy override lưu trong CMS dưới dạng chuỗi JSON — hỏng thì bỏ qua, không làm sập trang. */
function parseCopy(raw: unknown): CopyOverrides {
  if (typeof raw !== "string" || !raw.trim()) return {};
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? (parsed as CopyOverrides) : {};
  } catch {
    console.warn("[content] copyOverrides trong WP không phải JSON hợp lệ — bỏ qua.");
    return {};
  }
}

// ─── Adapter ──────────────────────────────────────────────────────────────────

export const wordpressAdapter: ContentAdapter = {
  name: "wordpress",

  async getProjects(locale) {
    const data = await wpQuery<{ projects: { nodes: unknown[] } }>(PROJECTS_QUERY, {}, [
      "content",
      "project",
    ]);
    return data.projects.nodes.map((n) => mapProject(locale, n));
  },

  async getPosts(locale) {
    const data = await wpQuery<{ posts: { nodes: unknown[] } }>(POSTS_QUERY, {}, [
      "content",
      "post",
    ]);
    return data.posts.nodes.map((n) => mapPost(locale, n));
  },

  async getFields(locale) {
    const data = await wpQuery<{ businessFields: { nodes: unknown[] } }>(FIELDS_QUERY, {}, [
      "content",
      "field",
    ]);
    return data.businessFields.nodes.map((n) => mapField(locale, n));
  },

  async getPartners() {
    const data = await wpQuery<{ partners: { nodes: unknown[] } }>(PARTNERS_QUERY, {}, [
      "content",
      "partner",
    ]);
    return data.partners.nodes.map(mapPartner);
  },

  async getSettings(locale): Promise<SiteSettings> {
    const data = await wpQuery<{
      hbhSettings: { nodes: { settingsFields?: Record<string, string> }[] };
    }>(SETTINGS_QUERY, {}, ["content", "settings"]);
    const s = data.hbhSettings.nodes[0]?.settingsFields ?? {};
    return {
      companyName: s.companyName ?? "",
      taxId: s.taxId ?? "",
      address: pickLang(locale, s.address ?? "", s.addressEn),
      phone: s.phone ?? "",
      phoneDisplay: s.phoneDisplay ?? "",
      email: s.email ?? "",
      zaloUrl: s.zaloUrl ?? "",
      hours: pickLang(locale, s.hours ?? "", s.hoursEn),
    };
  },

  async getCopyOverrides(locale) {
    const data = await wpQuery<{
      hbhSettings: { nodes: { settingsFields?: Record<string, string> }[] };
    }>(SETTINGS_QUERY, {}, ["content", "settings", "copy"]);
    const s = data.hbhSettings.nodes[0]?.settingsFields ?? {};
    return parseCopy(locale === "en" ? s.copyOverridesEn : s.copyOverridesVi);
  },
};
