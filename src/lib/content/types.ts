/**
 * Domain types của tầng content — **một ngôn ngữ duy nhất**.
 *
 * Khác với `src/lib/data.ts` (song ngữ bằng suffix `name`/`nameEn`), mọi type ở đây
 * chỉ có một bản chuỗi. Việc chọn ngôn ngữ do adapter làm, ở phía server, trước khi
 * dữ liệu tới component. Nhờ vậy:
 *
 *   1. Client không còn phải ship cả VI lẫn EN → payload giảm ~50%.
 *   2. Component không cần biết ngôn ngữ hiện tại → bỏ được `useLocalize()`.
 *   3. Khi cắm CMS, adapter trả đúng type này → không component nào phải sửa.
 */

export type Lang = "vi" | "en";

/** Ảnh — dù đến từ `public/` hay media library của WordPress đều quy về shape này. */
export type Media = {
  url: string;
  /** Alt text; rỗng nếu là ảnh trang trí. CMS nên luôn điền để đạt a11y. */
  alt: string;
  width?: number;
  height?: number;
};

export type ProjectType =
  | "hospital"
  | "airport"
  | "office"
  | "hotel"
  | "factory"
  | "defense"
  | "infra";

export type Project = {
  slug: string;
  name: string;
  client: string;
  type: ProjectType;
  /** Nhãn hiển thị của các hệ thống, đã dịch. Dùng `systemSlugs` khi cần so khớp. */
  system: string[];
  /** Khoá ổn định để lọc — KHÔNG đổi theo ngôn ngữ. */
  systemSlugs: string[];
  location: string;
  year: number;
  scope: string;
  image: Media;
  gallery: Media[];
  /** HTML thân bài từ CMS. Rỗng khi dùng defaults — view phải chịu được giá trị rỗng. */
  body: string;
  featured: boolean;
};

export type PostCategory = {
  slug: string;
  name: string;
};

export type Post = {
  slug: string;
  title: string;
  category: PostCategory;
  /** ISO date `YYYY-MM-DD`. */
  date: string;
  excerpt: string;
  image: Media;
  /** HTML thân bài từ CMS. Rỗng khi dùng defaults. */
  body: string;
  featured: boolean;
};

export type Field = {
  /** Số thứ tự hiển thị ("01".."06") — giữ nguyên format 2 chữ số của thiết kế. */
  id: string;
  slug: string;
  name: string;
  desc: string;
  brands: string[];
  image: Media;
  body: string;
};

export type PartnerKind = "brand" | "client" | "contractor";

export type Partner = {
  name: string;
  logo: Media;
  kind: PartnerKind;
  url?: string;
};

/**
 * Thông tin doanh nghiệp dùng chung — hiện đang hardcode rải rác ở Footer,
 * FloatingActions và trang liên hệ. Gom về một chỗ để CMS sửa được.
 */
export type SiteSettings = {
  companyName: string;
  taxId: string;
  address: string;
  /** Dạng E.164 để dùng cho `tel:` và link Zalo. */
  phone: string;
  /** Số đã format để hiển thị. */
  phoneDisplay: string;
  email: string;
  zaloUrl: string;
  hours: string;
};

/** Toàn bộ nội dung mà một adapter phải cung cấp. */
export type ContentBundle = {
  projects: Project[];
  posts: Post[];
  fields: Field[];
  partners: Partner[];
  settings: SiteSettings;
};

/**
 * Bản ghi đè copy từ CMS, merge chồng lên `src/lib/locales/*`.
 *
 * Có cấu trúc lồng nhau tuỳ ý và **partial ở mọi cấp**: CMS chỉ cần trả về đúng
 * những field client đã sửa, phần còn lại rơi về default trong repo.
 */
export type CopyOverrides = {
  [key: string]: string | string[] | CopyOverrides;
};

/**
 * Hợp đồng mà mọi nguồn nội dung phải thoả — hiện có `static` (defaults trong repo)
 * và `wordpress`. Thêm nguồn mới = thêm một file trong `adapters/`, không đụng view.
 */
export interface ContentAdapter {
  readonly name: string;
  getProjects(locale: Lang): Promise<Project[]>;
  getPosts(locale: Lang): Promise<Post[]>;
  getFields(locale: Lang): Promise<Field[]>;
  getPartners(locale: Lang): Promise<Partner[]>;
  getSettings(locale: Lang): Promise<SiteSettings>;
  /** Trả `{}` nếu nguồn không quản lý copy (ví dụ adapter static). */
  getCopyOverrides(locale: Lang): Promise<CopyOverrides>;
}
