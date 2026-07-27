"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";

/** Instance dùng chung để nút back-to-top (FloatingActions) cuộn qua Lenis. */
let lenisInstance: Lenis | null = null;
export function getLenis() {
  return lenisInstance;
}

/** Smooth scroll momentum bằng Lenis. Client-only, tự tắt khi user chọn giảm chuyển động. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: Lenis | null = null;
    let rafId = 0;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        lerp: 0.09, // độ "nặng" của quán tính — nhỏ hơn = mượt/trôi lâu hơn
        wheelMultiplier: 1,
        smoothWheel: true,
        autoRaf: false,
      });
      lenisInstance = lenis;

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      lenisInstance = null;
    };
  }, []);

  // Về đầu trang ngay khi chuyển route (đồng bộ với scroll restoration của router).
  useEffect(() => {
    lenisInstance?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
