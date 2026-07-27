"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/PageHero";
import { news } from "@/lib/data";
import { useLocalize } from "@/lib/localize";
import { ArrowRight, ChevronLeft, ChevronRight, Search } from "lucide-react";

const CATS = ["Tất cả", "Tin công ty", "Dự án", "Kiến thức kỹ thuật"];
const PAGE1_SIZE = 4; // Trang 1: 1 bài nổi bật + 3 bài lưới
const PAGE_SIZE = 6; // Từ trang 2 trở đi: 6 bài/trang

export function NewsView() {
  const { t } = useTranslation();
  const L = useLocalize();
  const [cat, setCat] = useState("Tất cả");
  const [page, setPage] = useState(1);
  const listRef = useRef<HTMLElement>(null);

  const filtered = cat === "Tất cả" ? news : news.filter((n) => n.category === cat);
  const totalPages =
    filtered.length <= PAGE1_SIZE ? 1 : 1 + Math.ceil((filtered.length - PAGE1_SIZE) / PAGE_SIZE);
  const currentPage = Math.min(page, totalPages);

  const start = currentPage === 1 ? 0 : PAGE1_SIZE + (currentPage - 2) * PAGE_SIZE;
  const pageItems = filtered.slice(start, currentPage === 1 ? PAGE1_SIZE : start + PAGE_SIZE);

  // Trang 1: bài đầu là "nổi bật", còn lại vào lưới. Trang 2+: tất cả vào lưới.
  const featured = currentPage === 1 ? pageItems[0] : undefined;
  const gridItems = currentPage === 1 ? pageItems.slice(1) : pageItems;

  const selectCat = (c: string) => {
    setCat(c);
    setPage(1);
  };
  const goTo = (p: number) => {
    setPage(Math.max(1, Math.min(p, totalPages)));
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <PageHero
        eyebrow={t("news.hero.eyebrow")}
        index={t("news.hero.index")}
        title={
          <>
            {t("news.hero.titleLine1")}
            <br />
            <span className="italic text-primary">{t("news.hero.titleEmphasis")}</span>
            {t("news.hero.titleLine2")}
          </>
        }
        subtitle={t("news.hero.subtitle")}
      />

      <section ref={listRef} className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
        <div className="flex flex-wrap gap-2 border-b border-border pb-6">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => selectCat(c)}
              className={`mono-label border px-3 py-1.5 ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}
            >
              {t(`news.categories.${c}`)}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            {featured && (
              <Link
                href={`/tin-tuc/${featured.slug}`}
                className="group block border-b border-border pb-12"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                  <img
                    src={featured.image}
                    alt={L(featured.title, featured.titleEn)}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
                  />
                  <div className="absolute inset-x-0 top-0 h-0.75 bg-primary" />
                </div>
                <div className="mono-label mt-6 text-primary">
                  — {t("news.featured.badge")} ·{" "}
                  {L(featured.category, featured.categoryEn).toUpperCase()}
                </div>
                <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight transition-colors group-hover:text-primary md:text-6xl">
                  {L(featured.title, featured.titleEn)}
                </h2>
                <p className="mt-4 max-w-2xl text-muted-foreground">
                  {L(featured.excerpt, featured.excerptEn)}
                </p>
                <div className="mono-label mt-6 text-muted-foreground">{featured.date}</div>
              </Link>
            )}

            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              {gridItems.map((n) => (
                <Link key={n.slug} href={`/tin-tuc/${n.slug}`} className="group block">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    <img
                      src={n.image}
                      alt={L(n.title, n.titleEn)}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
                    />
                  </div>
                  <div className="mono-label mt-4 text-primary">
                    {L(n.category, n.categoryEn).toUpperCase()}
                  </div>
                  <div className="mt-3 font-display text-2xl font-bold leading-tight transition-colors group-hover:text-primary">
                    {L(n.title, n.titleEn)}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{L(n.excerpt, n.excerptEn)}</p>
                  <div className="mono-label mt-4 text-muted-foreground">{n.date}</div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <nav
                aria-label="Pagination"
                className="mt-14 flex flex-wrap items-center justify-center gap-2 border-t border-border pt-10"
              >
                <button
                  type="button"
                  onClick={() => goTo(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="mono-label flex items-center gap-1 border border-border px-3 py-1.5 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border"
                >
                  <ChevronLeft className="h-3.5 w-3.5" /> {t("news.pagination.prev")}
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => goTo(p)}
                    aria-current={p === currentPage ? "page" : undefined}
                    className={`mono-label border px-3.5 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      p === currentPage
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => goTo(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="mono-label flex items-center gap-1 border border-border px-3 py-1.5 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border"
                >
                  {t("news.pagination.next")} <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </nav>
            )}
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="space-y-8 lg:col-span-4"
          >
            <div>
              <label className="mono-label text-muted-foreground">
                {t("news.sidebar.searchLabel")}
              </label>
              <div className="mt-2 flex items-center gap-2 border border-border bg-background px-3 py-2.5">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  placeholder={t("news.sidebar.searchPlaceholder")}
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            </div>
            <div>
              <div className="mono-label text-muted-foreground">
                {t("news.sidebar.categoriesHeading")}
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                {CATS.slice(1).map((c) => (
                  <li key={c}>
                    <button
                      onClick={() => selectCat(c)}
                      className="text-foreground/80 hover:text-primary"
                    >
                      {t(`news.categories.${c}`)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-border bg-secondary p-6 text-secondary-foreground">
              <div className="mono-label text-primary">— {t("news.sidebar.newsletterBadge")}</div>
              <div className="mt-3 font-display text-2xl font-bold">
                {t("news.sidebar.newsletterTitle")}
              </div>
              <Link
                href="/lien-he"
                className="mt-4 inline-flex items-center gap-2 bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                {t("news.sidebar.subscribe")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.aside>
        </div>
      </section>
    </>
  );
}
