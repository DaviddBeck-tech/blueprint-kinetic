import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { projects, type Project } from "@/lib/data";
import { PageHero } from "@/components/PageHero";
import { useLocalize } from "@/lib/localize";
import i18n from "@/lib/i18n";

const TYPES: { id: Project["type"] | "all" }[] = [
  { id: "all" },
  { id: "hospital" },
  { id: "defense" },
  { id: "hotel" },
  { id: "factory" },
  { id: "infra" },
];
const SYSTEMS = ["Tất cả", "VRF", "Chiller", "BMS", "Nước nóng"];

export const Route = createFileRoute("/du-an")({
  head: () => ({
    meta: [
      { title: i18n.t("projects.meta.title") },
      { name: "description", content: i18n.t("projects.meta.description") },
      { property: "og:title", content: i18n.t("projects.meta.title") },
      { property: "og:description", content: i18n.t("projects.meta.description") },
    ],
  }),
  component: ProjectsList,
});

function ProjectsList() {
  const { t } = useTranslation();
  const L = useLocalize();
  const [type, setType] = useState<Project["type"] | "all">("all");
  const [sys, setSys] = useState("Tất cả");

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (type === "all" || p.type === type) &&
          (sys === "Tất cả" || p.system.some((s) => s.includes(sys))),
      ),
    [type, sys],
  );

  return (
    <>
      <PageHero
        eyebrow={t("projects.hero.eyebrow")}
        index="TOTAL · 35+"
        title={
          <>
            <span className="font-mono tabular text-primary">35+</span>
            <br />
            {t("projects.hero.title")}
          </>
        }
        subtitle={t("projects.hero.subtitle")}
      />

      <div className="sticky top-16 z-30 border-b border-border bg-background/85 backdrop-blur-xl md:top-20">
        <div className="mx-auto max-w-[1400px] space-y-3 px-5 py-4 md:px-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mono-label mr-2 text-muted-foreground">
              {t("projects.filters.type")}
            </span>
            {TYPES.map((ty) => (
              <button
                key={ty.id}
                onClick={() => setType(ty.id)}
                className={`mono-label border px-3 py-1.5 transition-colors ${type === ty.id ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}
              >
                {t(`projects.types.${ty.id}`)}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mono-label mr-2 text-muted-foreground">
              {t("projects.filters.system")}
            </span>
            {SYSTEMS.map((s) => (
              <button
                key={s}
                onClick={() => setSys(s)}
                className={`mono-label border px-3 py-1.5 transition-colors ${sys === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}
              >
                {s === "Tất cả"
                  ? t("projects.filters.all")
                  : s === "Nước nóng"
                    ? t("projects.systems.hotWater")
                    : s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        {filtered.length === 0 ? (
          <div className="border border-dashed border-border py-24 text-center">
            <div className="mono-label text-muted-foreground">{t("projects.grid.noResults")}</div>
            <p className="mt-4 text-muted-foreground">{t("projects.grid.noResultsHint")}</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid auto-rows-[14rem] grid-cols-1 gap-6 sm:auto-rows-[16rem] sm:grid-cols-2 lg:auto-rows-[18rem] lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => {
                // Bento rhythm: [wide, square, square, wide] — every pair tiles to 3 cols.
                const wide = i % 4 === 0 || i % 4 === 3;
                return (
                  <motion.article
                    key={p.slug}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className={`group relative ${wide ? "lg:col-span-2" : ""}`}
                  >
                    <Link to="/du-an/$slug" params={{ slug: p.slug }} className="block h-full">
                      <div className="relative h-full overflow-hidden rounded-xl">
                        <img
                          src={p.image}
                          alt={L(p.name, p.nameEn)}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          width={1200}
                          height={900}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
                        <div className="absolute left-3 top-3 flex gap-2">
                          {L(p.system, p.systemEn)
                            .slice(0, 2)
                            .map((s) => (
                              <span
                                key={s}
                                className="mono-label border border-white/30 bg-black/60 px-2 py-1 text-white backdrop-blur-sm"
                              >
                                {s}
                              </span>
                            ))}
                        </div>
                        <div className="absolute inset-x-4 bottom-4 text-white">
                          <div className="mono-label text-white/70">
                            {L(p.location, p.locationEn).toUpperCase()} · {p.year}
                          </div>
                          <div className="mt-2 font-display text-2xl font-bold leading-tight">
                            {L(p.name, p.nameEn)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </>
  );
}
