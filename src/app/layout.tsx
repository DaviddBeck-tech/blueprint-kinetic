import type { Metadata, Viewport } from "next";

import "../styles.css";

import { FloatingActions } from "@/components/FloatingActions";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SmoothScroll } from "@/components/SmoothScroll";
import { getLang } from "@/lib/i18n-server";

import { Providers } from "./providers";

// Gốc để Next.js dựng URL tuyệt đối cho og:image / twitter:image.
// Đặt NEXT_PUBLIC_SITE_URL khi deploy, nếu không sẽ dùng domain chính thức.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hbhvietnam.vn";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "HBH Vietnam — Giải pháp M&E · HVAC · BMS toàn diện",
  description:
    "HBH Vietnam Investment JSC — nhà thầu M&E, HVAC, BMS hàng đầu tại Việt Nam. 35+ dự án bệnh viện, quốc phòng, khách sạn – resort với các thương hiệu chính hãng Trane, Carrier, Mitsubishi, LG.",
  authors: [{ name: "HBH Vietnam" }],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "HBH Vietnam — Building Comfort, Delivering Trust",
    description:
      "Giải pháp M&E toàn diện cho công trình bệnh viện, quốc phòng, khách sạn – resort tại Việt Nam.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Đọc cookie ở server → HTML render đúng ngôn ngữ ngay lần đầu.
  // Lưu ý: cookies() khiến mọi route render động (không prerender tĩnh) — đúng như bản TanStack Start cũ.
  const lang = await getLang();

  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers lang={lang}>
          <SmoothScroll />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingActions />
        </Providers>
      </body>
    </html>
  );
}
