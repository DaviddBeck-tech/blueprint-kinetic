"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { Toaster } from "sonner";

import { createI18nInstance } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n-resources";

/**
 * Provider gốc phía client.
 *
 * `lang` do Server Component (app/layout.tsx) đọc từ cookie truyền xuống, nên
 * i18next khởi tạo đúng ngôn ngữ mà server vừa render → không lệch hydration.
 */
export function Providers({ lang, children }: { lang: Lang; children: ReactNode }) {
  const [i18n] = useState(() => createI18nInstance(lang));
  const [queryClient] = useState(() => new QueryClient());

  // Đồng bộ <html lang> khi user đổi ngôn ngữ tại client (server đã set đúng ở lần render đầu).
  useEffect(() => {
    const sync = () => {
      document.documentElement.lang = i18n.language?.startsWith("en") ? "en" : "vi";
    };
    sync();
    i18n.on("languageChanged", sync);
    return () => {
      i18n.off("languageChanged", sync);
    };
  }, [i18n]);

  return (
    <I18nextProvider i18n={i18n}>
      <MotionConfig reducedMotion="user">
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster position="top-right" richColors />
        </QueryClientProvider>
      </MotionConfig>
    </I18nextProvider>
  );
}
