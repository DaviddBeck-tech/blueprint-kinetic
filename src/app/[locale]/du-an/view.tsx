"use client";

import { LocaleLink as Link } from "@/components/LocaleLink";
import { motion, AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Project, ProjectType } from "@/lib/content/types";
import { PageHero } from "@/components/PageHero";

const TYPES: { id: ProjectType | "all" }[] = [
  { id: "all" },
  { id: "hospital" },
  { id: "airport" },
  { id: "office" },
  { id: "hotel" },
  { id: "factory" },
];

/**
 * Bộ lọc hệ thống khớp theo **slug**, không theo nhãn tiếng Việt như trước.
 * Nhãn đổi theo ngôn ngữ (và sau này do client sửa trong CMS) nhưng slug thì không,
 * nên bộ lọc không còn hỏng khi chuyển sang EN.
 *
 * Mỗi chip gom nhiều slug vì bộ lọc nay theo **nhóm hệ thống**, không theo từng công
 * nghệ: "HVAC" phủ VRF / Chiller / AHU / Ducting, "ELV & BMS" phủ BMS / ACS / EMS…
 */
const SYSTEM_FILTERS: { id: string; labelKey: string; slugs: string[] }[] = [
  { id: "all", labelKey: "projects.filters.all", slugs: [] },
  {
    id: "hvac",
    labelKey: "projects.systems.hvac",
    slugs: ["hvac", "vrf", "chiller", "ahu", "ducting"],
  },
  { id: "electrical", labelKey: "projects.systems.electrical", slugs: ["electrical", "lighting"] },
  { id: "elv-bms", labelKey: "projects.systems.elvBms", slugs: ["bms", "elv", "acs", "ems"] },
  { id: "hot-water", labelKey: "projects.systems.hotWater", slugs: ["hot-water"] },
  { id: "medical-gas", labelKey: "projects.systems.medicalGas", slugs: ["medical-gas", "pts"] },
];

export function ProjectsListView({ projects }: { projects: Project[] }) {
  const { t } = useTranslation();
  const [type, setType] = useState<ProjectType | "all">("all");
  const [sys, setSys] = useState("all");

  const filtered = useMemo(() => {
    const slugs = SYSTEM_FILTERS.find((s) => s.id === sys)?.slugs ?? [];
    return projects.filter(
      (p) =>
        (type === "all" || p.type === type) &&
        (sys === "all" || p.systemSlugs.some((s) => slugs.includes(s))),
    );
  }, [projects, type, sys]);

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
            {SYSTEM_FILTERS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSys(s.id)}
                className={`mono-label border px-3 py-1.5 transition-colors ${sys === s.id ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}
              >
                {t(s.labelKey)}
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
                    <Link href={`/du-an/${p.slug}`} className="block h-full">
                      <div className="relative h-full overflow-hidden rounded-xl">
                        <img
                          src={p.image.url}
                          alt={p.image.alt}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          width={1200}
                          height={900}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
                        <div className="absolute left-3 top-3 flex gap-2">
                          {p.system.slice(0, 2).map((s) => (
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
                            {p.location.toUpperCase()} · {p.year}
                          </div>
                          <div className="mt-2 font-display text-2xl font-bold leading-tight">
                            {p.name}
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
