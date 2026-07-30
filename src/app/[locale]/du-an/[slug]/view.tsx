"use client";

import { LocaleLink as Link } from "@/components/LocaleLink";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import type { Project } from "@/lib/content/types";
import { RichText } from "@/components/RichText";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function ProjectDetailView({
  project: p,
  related: others,
}: {
  project: Project;
  related: Project[];
}) {
  const { t } = useTranslation();

  return (
    <>
      <section className="relative pt-24 md:pt-32">
        <div className="absolute inset-0 blueprint-grid opacity-50" />
        <div className="relative mx-auto max-w-[1400px] px-5 pb-12 md:px-10 md:pb-16">
          <Link
            href="/du-an"
            className="mono-label inline-flex items-center gap-2 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {t("projects.detail.back")}
          </Link>
          <div className="mt-8 flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="mono-label text-primary">{p.system.join(" · ")}</span>
            <span className="mono-label ml-auto text-muted-foreground">YEAR · {p.year}</span>
          </div>
          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.1] md:text-7xl lg:text-8xl">
            {p.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{p.scope}</p>
        </div>

        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <img
            src={p.image.url}
            alt={p.image.alt}
            className="h-full w-full object-cover"
            width={1600}
            height={900}
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            <div className="mono-label text-primary">{t("projects.detail.techNote")}</div>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              {t("projects.detail.scopeHeading")}
            </h2>
            {/* Thân bài do client soạn trong CMS. Chưa có thì dùng đoạn mô tả mặc định. */}
            {p.body ? (
              <RichText html={p.body} className="mt-6" />
            ) : (
              <>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  {p.scope}. {t("projects.detail.scopeBody")}
                </p>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {t("projects.detail.warrantyBody")}
                </p>
              </>
            )}

            {p.gallery.length > 0 && (
              <div className="mt-12 grid gap-3 md:grid-cols-2">
                {p.gallery.map((g, i) => (
                  <img
                    key={i}
                    src={g.url}
                    alt={g.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                ))}
              </div>
            )}
          </motion.div>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 border border-border bg-muted/40 p-6">
              <div className="mono-label text-primary">— SPEC SHEET</div>
              <dl className="mt-4 space-y-4 text-sm">
                {[
                  [t("projects.detail.spec.client"), p.client],
                  [t("projects.detail.spec.location"), p.location],
                  [t("projects.detail.spec.year"), String(p.year)],
                  [t("projects.detail.spec.system"), p.system.join(", ")],
                  [t("projects.detail.spec.type"), p.type.toUpperCase()],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="grid grid-cols-[110px_1fr] gap-3 border-b border-border pb-3 last:border-0"
                  >
                    <dt className="mono-label text-muted-foreground">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/lien-he"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                {t("projects.detail.similarCta")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 py-20 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="mono-label text-primary">{t("projects.detail.related")}</div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid gap-6 md:grid-cols-3"
          >
            {others.map((o) => (
              <Link key={o.slug} href={`/du-an/${o.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={o.image.url}
                    alt={o.image.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={1200}
                    height={900}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 text-white">
                    <div className="mono-label text-white/70">
                      {o.location.toUpperCase()} · {o.year}
                    </div>
                    <div className="mt-2 font-display text-xl font-bold">{o.name}</div>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
