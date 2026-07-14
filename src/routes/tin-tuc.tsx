import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/PageHero";
import { news } from "@/lib/data";
import { useLocalize } from "@/lib/localize";
import { ArrowRight, Search } from "lucide-react";
import "@/lib/i18n";

const CATS = ["Tất cả", "Tin công ty", "Dự án", "Kiến thức kỹ thuật"];

export const Route = createFileRoute("/tin-tuc")({
  head: () => ({
    meta: [
      { title: "Tin tức — HBH Vietnam" },
      {
        name: "description",
        content:
          "Tin công ty, cập nhật dự án và kiến thức kỹ thuật M&E · HVAC · BMS từ đội ngũ HBH.",
      },
      { property: "og:title", content: "Tin tức — HBH Vietnam" },
      {
        property: "og:description",
        content:
          "Tin công ty, cập nhật dự án và kiến thức kỹ thuật M&E · HVAC · BMS từ đội ngũ HBH.",
      },
    ],
  }),
  component: News,
});

function News() {
  const { t } = useTranslation();
  const L = useLocalize();
  const [cat, setCat] = useState("Tất cả");
  const filtered = cat === "Tất cả" ? news : news.filter((n) => n.category === cat);
  const [featured, ...rest] = filtered;

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

      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
        <div className="flex flex-wrap gap-2 border-b border-border pb-6">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
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
                to="/tin-tuc/$slug"
                params={{ slug: featured.slug }}
                className="group block border-b border-border pb-12"
              >
                <div className="mono-label text-primary">
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
              {rest.map((n) => (
                <Link
                  key={n.slug}
                  to="/tin-tuc/$slug"
                  params={{ slug: n.slug }}
                  className="group block"
                >
                  <div className="mono-label text-primary">
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
                      onClick={() => setCat(c)}
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
                to="/lien-he"
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
