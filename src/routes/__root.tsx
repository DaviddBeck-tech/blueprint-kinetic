import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";

function NotFoundComponent() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-24">
        <div className="max-w-lg text-center">
          <div className="mono-label text-primary">ERROR · 404 · NOT_FOUND</div>
          <h1 className="mt-4 font-display text-8xl font-black tracking-tight">404</h1>
          <p className="mt-4 text-muted-foreground">Trang bạn tìm không tồn tại hoặc đã được di chuyển.</p>
          <a href="/" className="mt-8 inline-block bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Về trang chủ
          </a>
        </div>
      </div>
    </>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="mono-label text-primary">SYSTEM · ERROR</div>
        <h1 className="mt-4 font-display text-3xl font-bold">Trang không tải được</h1>
        <p className="mt-3 text-sm text-muted-foreground">Đã có sự cố. Vui lòng thử lại hoặc quay về trang chủ.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Thử lại</button>
          <a href="/" className="border border-border px-4 py-2.5 text-sm font-semibold hover:bg-accent">Trang chủ</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "HBH Vietnam — Giải pháp M&E · HVAC · BMS toàn diện" },
      { name: "description", content: "HBH Vietnam Investment JSC — nhà thầu M&E, HVAC, BMS hàng đầu tại Việt Nam. 35+ dự án bệnh viện, quốc phòng, khách sạn – resort với các thương hiệu chính hãng Trane, Carrier, Mitsubishi, LG." },
      { name: "author", content: "HBH Vietnam" },
      { property: "og:title", content: "HBH Vietnam — Building Comfort, Delivering Trust" },
      { property: "og:description", content: "Giải pháp M&E toàn diện cho công trình bệnh viện, quốc phòng, khách sạn – resort tại Việt Nam." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}
