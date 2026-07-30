"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Phone, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getLenis } from "@/components/SmoothScroll";
import type { SiteSettings } from "@/lib/content/types";

export function FloatingActions({ settings }: { settings: SiteSettings }) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2">
      <a
        href={`tel:${settings.phone}`}
        aria-label={t("floating.call")}
        className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-110"
      >
        <Phone className="h-5 w-5" />
      </a>
      <a
        href={settings.zaloUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={t("floating.zalo")}
        className="grid h-12 w-12 place-items-center rounded-full bg-[hsl(210_100%_50%)] text-white shadow-lg transition-transform hover:scale-110"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
      {show && (
        <button
          onClick={() => {
            const lenis = getLenis();
            if (lenis) lenis.scrollTo(0);
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label={t("floating.toTop")}
          className="grid h-12 w-12 place-items-center rounded-full border border-border bg-background text-foreground shadow-lg hover:bg-accent"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
