import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Moon, Sun, ChevronDown, Layers, Wrench } from "lucide-react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";

const NAV = [
  { to: "/gioi-thieu", key: "about" as const, hasMenu: true },
  { to: "/du-an", key: "projects" as const },
  { to: "/doi-tac", key: "partners" as const },
  { to: "/tin-tuc", key: "news" as const },
  { to: "/lien-he", key: "contact" as const },
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("hbh-theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefers;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("hbh-theme", next ? "dark" : "light");
  };

  const toggleLang = () => {
    const next = i18n.language === "vi" ? "en" : "vi";
    i18n.changeLanguage(next);
    localStorage.setItem("hbh-lang", next);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-[0_1px_0_hsl(var(--foreground)/0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-20 md:px-10">
        <Link to="/" className="group flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center bg-primary text-primary-foreground font-display text-lg font-black">
            H
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight">HBH</span>
          <span className="mono-label hidden text-muted-foreground sm:inline">Vietnam</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <div key={item.to} className="relative" onMouseEnter={() => item.hasMenu && setMenuOpen(true)} onMouseLeave={() => item.hasMenu && setMenuOpen(false)}>
              <Link
                to={item.to}
                className="group relative flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {t(`nav.${item.key}`)}
                {item.hasMenu && <ChevronDown className="h-3 w-3" />}
                <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
              {item.hasMenu && menuOpen && (
                <div className="absolute left-0 top-full w-[420px] pt-2">
                  <div className="grid gap-1 border border-border bg-popover p-2 shadow-xl">
                    <MegaItem to="/linh-vuc-kinh-doanh" icon={<Layers className="h-4 w-4" />} label={t("nav.fields")} desc="6 nhóm giải pháp M&E · HVAC · BMS" />
                    <MegaItem to="/dich-vu" icon={<Wrench className="h-4 w-4" />} label={t("nav.services")} desc="Thi công, bảo trì, tư vấn, phân phối chính hãng" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={toggleLang} className="mono-label hidden rounded border border-border px-2 py-1 text-foreground/70 hover:text-foreground md:block">
            {i18n.language === "vi" ? "VI · EN" : "EN · VI"}
          </button>
          <button onClick={toggleDark} aria-label="Toggle theme" className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground/70 hover:text-foreground">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            to="/lien-he"
            className="hidden bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 md:inline-block"
          >
            {t("nav.cta")}
          </Link>
          <button onClick={() => setOpen(!open)} className="grid h-9 w-9 place-items-center lg:hidden" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-[1400px] flex-col px-5 py-4">
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="py-3 font-medium">
                {t(`nav.${item.key}`)}
              </Link>
            ))}
            <Link to="/linh-vuc-kinh-doanh" onClick={() => setOpen(false)} className="py-3 pl-4 text-sm text-muted-foreground">— {t("nav.fields")}</Link>
            <Link to="/dich-vu" onClick={() => setOpen(false)} className="py-3 pl-4 text-sm text-muted-foreground">— {t("nav.services")}</Link>
          </div>
        </div>
      )}
    </header>
  );
}

function MegaItem({ to, icon, label, desc }: { to: string; icon: React.ReactNode; label: string; desc: string }) {
  return (
    <Link to={to} className="flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-accent">
      <span className="grid h-9 w-9 shrink-0 place-items-center border border-border bg-background text-primary">{icon}</span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold">{label}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{desc}</span>
      </span>
    </Link>
  );
}
