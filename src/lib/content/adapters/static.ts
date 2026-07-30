import {
  brands,
  clients,
  contractors,
  fields as rawFields,
  news as rawNews,
  projects as rawProjects,
  type BrandLogo,
} from "@/lib/data";
import { contact } from "@/lib/locales/contact";

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
  SiteSettings,
} from "../types";

/**
 * Adapter mặc định — đọc nội dung mẫu đang nằm sẵn trong repo (`src/lib/data.ts`,
 * `src/lib/locales/*`).
 *
 * Đây là **bản default** theo đúng nghĩa: site chạy đầy đủ, đúng thiết kế, không cần
 * bất kỳ dịch vụ ngoài nào. Khi WordPress được cắm vào, adapter kia sẽ thay thế
 * những phần client đã nhập, phần chưa nhập vẫn rơi về đây.
 *
 * Toàn bộ việc chọn ngôn ngữ diễn ra tại file này — đó là lý do component phía dưới
 * không cần biết gì về VI/EN nữa.
 */

const isEn = (locale: Lang) => locale === "en";

/** Chọn bản EN nếu có, thiếu thì rơi về VI — giữ đúng hành vi của `useLocalize()` cũ. */
function pick<T>(locale: Lang, vi: T, en?: T): T {
  return isEn(locale) && en != null ? en : vi;
}

function media(url: string, alt: string): Media {
  return { url, alt };
}

/**
 * Khoá ổn định cho hệ thống M&E, dùng để lọc dự án.
 *
 * Trước đây bộ lọc so khớp bằng `String.includes()` trên nhãn tiếng Việt — hỏng ngay
 * khi đổi ngôn ngữ hoặc khi editor sửa chính tả trong CMS. Slug tách khoá ra khỏi nhãn.
 */
const SYSTEM_SLUGS: Record<string, string> = {
  VRF: "vrf",
  Chiller: "chiller",
  BMS: "bms",
  AHU: "ahu",
  Ducting: "ducting",
  "Nước nóng trung tâm": "hot-water",
  "Chiếu sáng": "lighting",
};

function systemSlug(viLabel: string): string {
  return SYSTEM_SLUGS[viLabel] ?? viLabel.toLowerCase().replace(/\s+/g, "-");
}

/** Khoá ổn định cho danh mục tin tức — thay cho việc so khớp chuỗi "Tin công ty". */
const CATEGORY_SLUGS: Record<string, string> = {
  "Tin công ty": "company",
  "Dự án": "projects",
  "Kiến thức kỹ thuật": "technical",
};

function categorySlug(viLabel: string): string {
  return CATEGORY_SLUGS[viLabel] ?? viLabel.toLowerCase().replace(/\s+/g, "-");
}

function toProject(locale: Lang, p: (typeof rawProjects)[number], index: number): Project {
  const name = pick(locale, p.name, p.nameEn);
  return {
    slug: p.slug,
    name,
    client: pick(locale, p.client, p.clientEn),
    type: p.type,
    system: pick(locale, p.system, p.systemEn),
    systemSlugs: p.system.map(systemSlug),
    location: pick(locale, p.location, p.locationEn),
    year: p.year,
    scope: pick(locale, p.scope, p.scopeEn),
    image: media(p.image, name),
    gallery: (p.gallery ?? []).map((url, i) => media(url, `${name} — ${i + 1}`)),
    // Defaults chưa có thân bài riêng cho từng dự án; view dùng copy chung từ i18n.
    body: "",
    featured: index < 3,
  };
}

function toPost(locale: Lang, n: (typeof rawNews)[number], index: number): Post {
  const title = pick(locale, n.title, n.titleEn);
  return {
    slug: n.slug,
    title,
    category: {
      slug: categorySlug(n.category),
      name: pick(locale, n.category, n.categoryEn),
    },
    date: n.date,
    excerpt: pick(locale, n.excerpt, n.excerptEn),
    image: media(n.image, title),
    // Defaults chưa có thân bài riêng cho từng tin; view dùng copy chung từ i18n.
    body: "",
    featured: index === 0,
  };
}

function toField(locale: Lang, f: (typeof rawFields)[number]): Field {
  const name = pick(locale, f.name, f.nameEn);
  return {
    id: f.id,
    slug: `linh-vuc-${f.id}`,
    name,
    desc: pick(locale, f.desc, f.descEn),
    brands: f.brands,
    image: media(f.image, name),
    body: "",
  };
}

function toPartners(list: readonly BrandLogo[], kind: PartnerKind): Partner[] {
  return list.map((b) => ({ name: b.name, logo: media(b.logo, b.name), kind }));
}

export const staticAdapter: ContentAdapter = {
  name: "static",

  async getProjects(locale) {
    return rawProjects.map((p, i) => toProject(locale, p, i));
  },

  async getPosts(locale) {
    // Mới nhất lên đầu — CMS sau này sắp theo `publishedAt`, ở đây sắp theo `date`.
    return [...rawNews]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((n, i) => toPost(locale, n, i));
  },

  async getFields(locale) {
    return rawFields.map((f) => toField(locale, f));
  },

  async getPartners() {
    return [
      ...toPartners(brands, "brand"),
      ...toPartners(clients, "client"),
      ...toPartners(contractors, "contractor"),
    ];
  },

  async getSettings(locale): Promise<SiteSettings> {
    // Địa chỉ & giờ làm việc là chuỗi song ngữ nên lấy từ locale module;
    // số điện thoại / email / MST không dịch nên đặt thẳng ở đây.
    const ct = isEn(locale) ? contact.en : contact.vi;
    return {
      companyName: "HBH Vietnam Investment JSC",
      taxId: "0106842512",
      address: ct.info.address,
      phone: "+84931190001",
      phoneDisplay: "0931 190 001",
      email: "info@hbhvietnam.vn",
      zaloUrl: "https://zalo.me/84931190001",
      hours: ct.info.hours,
    };
  },

  /** Nguồn static không quản lý copy — copy chính là `locales/*`, không có gì để đè. */
  async getCopyOverrides(): Promise<CopyOverrides> {
    return {};
  },
};
