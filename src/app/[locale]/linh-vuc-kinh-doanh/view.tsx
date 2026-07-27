"use client";

import { LocaleLink as Link } from "@/components/LocaleLink";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/PageHero";
import { fields, IMG } from "@/lib/data";
import { useLocalize } from "@/lib/localize";
import { ArrowRight } from "lucide-react";

const IMGS = [IMG.chiller, IMG.hotel, IMG.factory, IMG.hospital, IMG.resort, IMG.defense];

const PROCESS = [
  { id: "01", tKey: "fields.process.steps.s1.t", dKey: "fields.process.steps.s1.d" },
  { id: "02", tKey: "fields.process.steps.s2.t", dKey: "fields.process.steps.s2.d" },
  { id: "03", tKey: "fields.process.steps.s3.t", dKey: "fields.process.steps.s3.d" },
  { id: "04", tKey: "fields.process.steps.s4.t", dKey: "fields.process.steps.s4.d" },
  { id: "05", tKey: "fields.process.steps.s5.t", dKey: "fields.process.steps.s5.d" },
];

export function FieldsView() {
  const { t } = useTranslation();
  const L = useLocalize();
  return (
    <>
      <PageHero
        eyebrow={t("fields.hero.eyebrow")}
        index="M&E · HVAC · BMS"
        title={
          <>
            {t("fields.hero.titlePre")}{" "}
            <span className="text-primary italic">{t("fields.hero.titleEm")}</span>
            <br />
            {t("fields.hero.titleAfter")}
          </>
        }
        subtitle={t("fields.hero.subtitle")}
      />

      {/* Alternating field blocks */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <ul className="space-y-24 md:space-y-32">
          {fields.map((f, i) => (
            <motion.li
              key={f.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={IMGS[i]}
                  alt={L(f.name, f.nameEn)}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  width={1200}
                  height={900}
                />
                <div className="absolute left-3 top-3 border border-white/30 bg-black/60 px-3 py-2 text-white backdrop-blur-sm">
                  <div className="mono-label text-primary/90">FIELD · {f.id}</div>
                  <div className="mt-1 font-mono text-xs">{f.brands.join(" · ").toUpperCase()}</div>
                </div>
              </div>
              <div>
                <div className="mono-label text-primary">— {f.id} / 06</div>
                <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-6xl">
                  {L(f.name, f.nameEn)}
                </h2>
                <p className="mt-6 text-lg text-muted-foreground">{L(f.desc, f.descEn)}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {f.brands.map((b) => (
                    <span key={b} className="mono-label border border-border px-3 py-1.5">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Extended groups */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto grid max-w-[1400px] gap-6 px-5 py-24 md:grid-cols-2 md:px-10 md:py-32">
          {[
            { t: "fields.extended.meInstall.title", d: "fields.extended.meInstall.desc" },
            { t: "fields.extended.bms.title", d: "fields.extended.bms.desc" },
          ].map((g) => (
            <div key={g.t} className="border border-border bg-background p-10">
              <div className="mono-label text-primary">{t("fields.extended.label")}</div>
              <div className="mt-4 font-display text-3xl font-bold">{t(g.t)}</div>
              <p className="mt-3 text-muted-foreground">{t(g.d)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5-step process */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="mono-label text-primary">{t("fields.process.label")}</div>
        <h2 className="mt-4 font-display text-4xl font-extrabold md:text-6xl">
          {t("fields.process.heading")}
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-5 md:gap-0">
          {PROCESS.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative p-6 md:border-l md:border-border ${i === 0 ? "md:border-l-primary" : ""}`}
            >
              <div className="mono-label text-primary">{s.id}</div>
              <div className="mt-3 font-display text-xl font-bold">{t(s.tKey)}</div>
              <p className="mt-2 text-sm text-muted-foreground">{t(s.dKey)}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/lien-he"
            className="inline-flex items-center gap-2 bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {t("fields.process.cta")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
