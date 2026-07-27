"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const CRUMB_KEYS: Record<string, string> = {
  "/gioi-thieu": "nav.about",
  "/linh-vuc-kinh-doanh": "nav.fields",
  "/dich-vu": "nav.services",
  "/du-an": "nav.projects",
  "/doi-tac": "nav.partners",
  "/tin-tuc": "nav.news",
  "/lien-he": "nav.contact",
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  index,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  index?: string;
}) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const crumbKey = CRUMB_KEYS[pathname];

  return (
    <section className="relative overflow-hidden border-b border-border pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="absolute inset-0 blueprint-grid opacity-60" />
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        {crumbKey && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 mono-label">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {t("common.home")}
                </Link>
              </li>
              <li aria-hidden className="text-border">
                /
              </li>
              <li>
                <span aria-current="page" className="text-foreground">
                  {t(crumbKey)}
                </span>
              </li>
            </ol>
          </nav>
        )}
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-primary" />
          <span className="mono-label text-primary">{eyebrow}</span>
          {index && <span className="mono-label ml-auto text-muted-foreground">{index}</span>}
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-5xl font-extrabold leading-[1.1] tracking-tight md:text-7xl lg:text-8xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
