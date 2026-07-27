"use client";

import { LocaleLink as Link } from "@/components/LocaleLink";
import { Phone, Mail, MapPin, Facebook, Linkedin, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";
import { fields } from "@/lib/data";
import { useLocalize } from "@/lib/localize";
import { Logo } from "@/components/Logo";

export function Footer() {
  const { t } = useTranslation();
  const L = useLocalize();
  return (
    <footer className="relative bg-secondary text-secondary-foreground">
      <div className="h-px w-full bg-primary" />
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="inline-flex rounded-lg bg-background p-3">
              <Logo className="h-12 w-auto" />
            </div>
            <p className="mt-4 text-sm text-secondary-foreground/70 text-balance">
              {t("footer.tagline")}
            </p>
            <p className="mt-4 text-sm text-secondary-foreground/70 text-balance">
              {t("footer.tax")}
            </p>
            <div className="mt-6 flex gap-2">
              {[Facebook, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center border border-secondary-foreground/20 hover:bg-primary hover:border-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="mono-label text-secondary-foreground/50">{t("footer.navHeading")}</div>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["/gioi-thieu", t("nav.about")],
                ["/linh-vuc-kinh-doanh", t("nav.fields")],
                ["/dich-vu", t("nav.services")],
                ["/du-an", t("nav.projects")],
                ["/doi-tac", t("nav.partners")],
                ["/tin-tuc", t("nav.news")],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link href={to} className="text-secondary-foreground/70 hover:text-primary">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mono-label text-secondary-foreground/50">
              {t("footer.fieldsHeading")}
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {fields.map((f) => (
                <li key={f.id} className="flex gap-2 text-secondary-foreground/70">
                  <span className="mono-label text-primary">{f.id}</span>
                  <span>{L(f.name, f.nameEn)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mono-label text-secondary-foreground/50">
              {t("footer.contactHeading")}
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-secondary-foreground/80">{t("footer.address")}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+84931190001" className="hover:text-primary">
                  +84 931 190 001
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:info@hbhvietnam.vn" className="hover:text-primary">
                  info@hbhvietnam.vn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-secondary-foreground/10 pt-6 text-xs text-secondary-foreground/50 md:flex-row md:items-center">
          <div className="mono-label">{t("footer.rights")}</div>
          <div className="mono-label">{t("footer.poweredBy")}</div>
        </div>
      </div>
    </footer>
  );
}
