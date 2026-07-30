import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import "../../styles.css";

import { FloatingActions } from "@/components/FloatingActions";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import { SmoothScroll } from "@/components/SmoothScroll";
import { getCopyOverrides, getFields, getSettings } from "@/lib/content";
import { buildAlternates, isLang, LANGS } from "@/lib/i18n-routing";
import { getServerT } from "@/lib/i18n-server";

// Gốc để Next.js dựng URL tuyệt đối cho canonical / hreflang / og:image.
// Đặt NEXT_PUBLIC_SITE_URL khi deploy, nếu không sẽ dùng domain chính thức.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hbhvietnam.vn";

type LocaleParams = { params: Promise<{ locale: string }> };

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/** Prerender cả hai bản ngôn ngữ — đây là thứ khiến toàn bộ site thành tĩnh. */
export function generateStaticParams() {
  return LANGS.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLang(locale)) notFound();
  const t = await getServerT(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: t("meta.siteTitle"),
    description: t("meta.siteDescription"),
    authors: [{ name: "HBH Vietnam" }],
    alternates: buildAlternates(locale, "/"),
    icons: { icon: "/favicon.png", apple: "/favicon.png" },
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      type: "website",
      locale: locale === "en" ? "en_US" : "vi_VN",
    },
    twitter: { card: "summary_large_image" },
  };
}

/**
 * Root layout của app. Nằm trong segment `[locale]` (không có `app/layout.tsx`) để
 * `<html lang>` render đúng ngôn ngữ ngay từ server cho cả bản VI lẫn EN.
 */
export default async function LocaleLayout({
  children,
  params,
}: LocaleParams & { children: React.ReactNode }) {
  const { locale } = await params;
  // Chặn param rác (vd /xx/du-an). Proxy chỉ rewrite sang vi|en nên đây là lớp phòng thủ.
  if (!isLang(locale)) notFound();

  // Dữ liệu dùng chung cho mọi trang. Lấy song song vì ba truy vấn này độc lập nhau.
  const [copyOverrides, fields, settings] = await Promise.all([
    getCopyOverrides(locale),
    getFields(locale),
    getSettings(locale),
  ]);

  // `data-scroll-behavior` báo cho Next biết html đang bật smooth scroll, để router tạm
  // tắt nó lúc chuyển route (cuộn về đầu trang phải nhảy dứt khoát, không trôi).
  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers lang={locale} copyOverrides={copyOverrides}>
          <SmoothScroll />
          <Navbar />
          <main>{children}</main>
          <Footer fields={fields} settings={settings} />
          <FloatingActions settings={settings} />
        </Providers>
      </body>
    </html>
  );
}
