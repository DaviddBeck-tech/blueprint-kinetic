"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, Layers, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/Logo";
import { LocaleLink as Link } from "@/components/LocaleLink";
import { persistLanguage } from "@/lib/i18n";
import { localePath, stripLocale, type Lang } from "@/lib/i18n-routing";

const NAV = [
  { to: "/gioi-thieu", key: "about" as const, hasMenu: true },
  { to: "/du-an", key: "projects" as const },
  { to: "/doi-tac", key: "partners" as const },
  { to: "/tin-tuc", key: "news" as const },
  { to: "/lien-he", key: "contact" as const },
];

/** Mobile nav: mega-menu items (Lĩnh vực · Dịch vụ) trở thành mục ngang hàng, đặt ngay sau Dự án. */
const MOBILE_NAV = [
  { to: "/gioi-thieu", key: "about" as const },
  { to: "/du-an", key: "projects" as const },
  { to: "/linh-vuc-kinh-doanh", key: "fields" as const },
  { to: "/dich-vu", key: "services" as const },
  { to: "/doi-tac", key: "partners" as const },
  { to: "/tin-tuc", key: "news" as const },
  { to: "/lien-he", key: "contact" as const },
];

export function Navbar() {
  const { t } = useTranslation();
  // Bỏ tiền tố locale trước khi so khớp: trang VI prerender ở "/vi/du-an" nhưng
  // URL trình duyệt là "/du-an" — không strip sẽ lệch hydration ở trạng thái active.
  const pathname = stripLocale(usePathname());
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Overlay mờ nền khi mở menu mobile — bấm ra ngoài để đóng (nằm dưới header z-50) */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen(false)}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-[0_1px_0_hsl(var(--foreground)/0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-20 md:px-10">
          <Link href="/" aria-label="HBH Vietnam — Trang chủ" className="flex items-center">
            <Logo className="h-11 w-auto md:h-14" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <div
                  key={item.to}
                  className="relative"
                  onMouseEnter={() => item.hasMenu && setMenuOpen(true)}
                  onMouseLeave={() => item.hasMenu && setMenuOpen(false)}
                >
                  <Link
                    href={item.to}
                    className={`group relative flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors hover:text-foreground ${
                      active ? "text-foreground" : "text-foreground/80"
                    }`}
                  >
                    {t(`nav.${item.key}`)}
                    {item.hasMenu && <ChevronDown className="h-3 w-3" />}
                    <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                  {item.hasMenu && menuOpen && (
                    <div className="absolute left-0 top-full w-[420px] pt-2">
                      <div className="grid gap-1 border border-border bg-popover p-2 shadow-xl">
                        <MegaItem
                          to="/linh-vuc-kinh-doanh"
                          icon={<Layers className="h-4 w-4" />}
                          label={t("nav.fields")}
                          desc="6 nhóm giải pháp M&E · HVAC · BMS"
                        />
                        <MegaItem
                          to="/dich-vu"
                          icon={<Wrench className="h-4 w-4" />}
                          label={t("nav.services")}
                          desc="Thi công, bảo trì, tư vấn, phân phối chính hãng"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LangToggle className="hidden md:inline-flex" layoutId="lang-pill-desktop" />
            <Link
              href="/lien-he"
              className="hidden bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 md:inline-block"
            >
              {t("nav.cta")}
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="grid h-9 w-9 place-items-center lg:hidden"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="relative z-50 border-t border-border bg-background lg:hidden">
            <div className="mx-auto flex max-w-[1400px] flex-col px-5 py-4">
              {MOBILE_NAV.map((item) => (
                <Link
                  key={item.to}
                  href={item.to}
                  onClick={() => setOpen(false)}
                  className="py-3 font-medium"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
              <div className="mt-3 flex items-center gap-3 border-t border-border pt-4">
                <span className="mono-label text-muted-foreground">NGÔN NGỮ</span>
                <LangToggle layoutId="lang-pill-mobile" />
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

/** Segmented language toggle (VI · EN) — thumb mực trượt mượt, giữ đỏ cho CTA (rule 60-30-10). */
function LangToggle({
  className = "",
  layoutId = "lang-pill",
}: {
  className?: string;
  layoutId?: string;
}) {
  const { i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const current: Lang = i18n.language?.startsWith("en") ? "en" : "vi";

  // Đổi ngôn ngữ = điều hướng sang URL tương ứng của ĐÚNG trang đang xem:
  //   /du-an/benh-vien-103  →  /en/du-an/benh-vien-103
  // Cookie vẫn được ghi để lần sau vào thẳng "/" thì middleware đưa đúng ngôn ngữ.
  const setLang = (lng: Lang) => {
    if (lng === current) return;
    persistLanguage(lng);
    router.push(localePath(lng, stripLocale(pathname)));
  };
  return (
    <div
      role="group"
      aria-label="Chọn ngôn ngữ"
      className={`relative inline-flex items-center border border-border bg-muted/40 p-0.5 ${className}`}
    >
      {(["vi", "en"] as const).map((lng) => {
        const active = current === lng;
        return (
          <button
            key={lng}
            type="button"
            onClick={() => setLang(lng)}
            aria-pressed={active}
            aria-label={lng === "vi" ? "Tiếng Việt" : "English"}
            className={`relative z-0 cursor-pointer px-3 py-1 mono-label transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background ${
              active ? "text-background" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-foreground shadow-sm"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{lng.toUpperCase()}</span>
          </button>
        );
      })}
    </div>
  );
}

function MegaItem({
  to,
  icon,
  label,
  desc,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  desc: string;
}) {
  return (
    <Link
      href={to}
      className="flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-accent"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center border border-border bg-background text-primary">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold">{label}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{desc}</span>
      </span>
    </Link>
  );
}
