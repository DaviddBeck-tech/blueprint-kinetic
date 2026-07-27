"use client";

import { LocaleLink as Link } from "@/components/LocaleLink";
import { motion } from "motion/react";
import { PageHero } from "@/components/PageHero";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { IMG } from "@/lib/data";

const { hospital, factory, resort, chiller } = IMG;

export function ServicesView() {
  const { t } = useTranslation();

  const SERVICES = [
    { id: "01", t: t("services.install.t"), d: t("services.install.d"), img: hospital },
    { id: "02", t: t("services.maintenance.t"), d: t("services.maintenance.d"), img: chiller },
    { id: "03", t: t("services.consulting.t"), d: t("services.consulting.d"), img: factory },
    { id: "04", t: t("services.distribution.t"), d: t("services.distribution.d"), img: resort },
  ];

  const PROCESS = [
    { id: "01", t: t("services.process.s1.t"), d: t("services.process.s1.d") },
    { id: "02", t: t("services.process.s2.t"), d: t("services.process.s2.d") },
    { id: "03", t: t("services.process.s3.t"), d: t("services.process.s3.d") },
    { id: "04", t: t("services.process.s4.t"), d: t("services.process.s4.d") },
    { id: "05", t: t("services.process.s5.t"), d: t("services.process.s5.d") },
    { id: "06", t: t("services.process.s6.t"), d: t("services.process.s6.d") },
    { id: "07", t: t("services.process.s7.t"), d: t("services.process.s7.d") },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("services.hero.eyebrow")}
        index="M&E · HVAC · BMS"
        title={
          <>
            {t("services.hero.titleA")}
            <br />
            <span className="italic text-primary">{t("services.hero.titleB")}</span>
          </>
        }
        subtitle={t("services.hero.subtitle")}
      />

      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <ul className="space-y-24 md:space-y-32">
          {SERVICES.map((s, i) => (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className={`grid items-center gap-10 md:grid-cols-12 md:gap-16 ${i % 2 === 1 ? "" : ""}`}
            >
              <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.t}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    width={1200}
                    height={750}
                  />
                  <div className="absolute left-4 top-4 border border-white/30 bg-black/60 px-3 py-2 text-white backdrop-blur-sm">
                    <div className="mono-label text-primary/90">SERVICE · {s.id}</div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-5">
                <div className="mono-label text-primary">— {s.id} / 04</div>
                <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">
                  {s.t}
                </h2>
                <p className="mt-6 text-lg text-muted-foreground">{s.d}</p>
                <Link
                  href="/lien-he"
                  className="mono-label mt-8 inline-flex items-center gap-2 text-foreground hover:text-primary"
                >
                  {t("services.requestConsult")} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* 7-step service process */}
      <section className="border-y border-border">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
          <div className="mono-label text-primary">{t("services.process.eyebrow")}</div>
          <h2 className="mt-4 font-display text-4xl font-extrabold md:text-6xl">
            {t("services.process.heading")}
          </h2>

          <ol className="relative mt-16 border-l border-border pl-8 md:pl-12">
            {PROCESS.map((s, i) => (
              <motion.li
                key={s.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="relative pb-12 last:pb-0"
              >
                <span
                  aria-hidden
                  className="absolute -left-8 top-1.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-primary ring-4 ring-background md:-left-12"
                />
                <div className="mono-label text-primary">
                  {t("services.process.step")} {s.id}
                </div>
                <div className="mt-2 font-display text-2xl font-bold md:text-3xl">{s.t}</div>
                <p className="mt-2 max-w-xl text-muted-foreground">{s.d}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-border bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-24">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <h2 className="font-display text-4xl font-extrabold md:text-6xl lg:col-span-8">
              {t("services.cta.heading")}
            </h2>
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 justify-self-start bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 lg:col-span-4 lg:justify-self-end"
            >
              {t("common.quote")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
