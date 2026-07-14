import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/PageHero";
import { brands, clients, contractors, type BrandLogo as BrandLogoType } from "@/lib/data";
import { BrandLogo } from "@/components/BrandLogo";
import { Check } from "lucide-react";
import "@/lib/i18n";

export const Route = createFileRoute("/doi-tac")({
  head: () => ({
    meta: [
      { title: "Đối tác — HBH Vietnam" },
      {
        name: "description",
        content:
          "Hệ sinh thái đối tác của HBH — hãng thiết bị, nhà đầu tư và tổng thầu xây dựng hàng đầu Việt Nam.",
      },
      { property: "og:title", content: "Đối tác — HBH Vietnam" },
      {
        property: "og:description",
        content:
          "Hệ sinh thái đối tác của HBH — hãng thiết bị, nhà đầu tư và tổng thầu xây dựng hàng đầu Việt Nam.",
      },
    ],
  }),
  component: Partners,
});

function Partners() {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        eyebrow={t("partners.hero.eyebrow")}
        index="NETWORK"
        title={
          <>
            {t("partners.hero.titleLead")}{" "}
            <span className="text-primary italic">{t("partners.hero.titleAccent")}</span>
          </>
        }
        subtitle={t("partners.hero.subtitle")}
      />

      <PartnerBlock
        title={t("partners.equipmentPartners.title")}
        mono="EQUIPMENT · BRANDS"
        items={brands}
        note={t("partners.equipmentPartners.note")}
        accent
      />
      <PartnerBlock
        title={t("partners.clients.title")}
        mono="INVESTORS · CLIENTS"
        items={clients}
        note={t("partners.clients.note")}
        gridClass="grid-cols-2 lg:grid-cols-5"
      />
      <PartnerBlock
        title={t("partners.contractors.title")}
        mono="GENERAL · CONTRACTORS"
        items={contractors}
        note={t("partners.contractors.note")}
        gridClass="grid-cols-2 lg:grid-cols-4"
        accent
      />

      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
          <div className="mono-label text-primary">— {t("partners.benefits.mono")}</div>
          <h2 className="mt-4 font-display text-4xl font-extrabold md:text-6xl">
            {t("partners.benefits.heading")}
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              [
                t("partners.benefits.items.pricing.title"),
                t("partners.benefits.items.pricing.desc"),
              ],
              [
                t("partners.benefits.items.schedule.title"),
                t("partners.benefits.items.schedule.desc"),
              ],
              [
                t("partners.benefits.items.engineering.title"),
                t("partners.benefits.items.engineering.desc"),
              ],
              [
                t("partners.benefits.items.aftersales.title"),
                t("partners.benefits.items.aftersales.desc"),
              ],
            ].map(([t, d], i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-border bg-background p-6"
              >
                <Check className="h-5 w-5 text-primary" />
                <div className="mt-3 font-display text-xl font-bold">{t}</div>
                <div className="mt-2 text-sm text-muted-foreground">{d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PartnerBlock({
  title,
  mono,
  items,
  note,
  gridClass = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
}: {
  title: string;
  mono: string;
  items: BrandLogoType[];
  note: string;
  accent?: boolean;
  gridClass?: string;
}) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mono-label text-primary">— {mono}</div>
            <h2 className="mt-4 font-display text-3xl font-extrabold md:text-5xl">{title}</h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">{note}</p>
        </div>
        <div
          className={`mt-10 grid divide-x divide-y divide-border border border-border ${gridClass}`}
        >
          {items.map((item) => (
            <div
              key={item.name}
              className="group grid aspect-3/2 place-items-center p-6 transition-colors hover:bg-accent"
            >
              <BrandLogo
                name={item.name}
                src={item.logo}
                className="h-16 w-full max-w-40 md:h-20"
                imgClassName="max-h-11 md:max-h-12"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
