import { notFound } from "next/navigation";

import { getFields, getPartnersByKind, getProjects } from "@/lib/content";
import { isLang } from "@/lib/i18n-routing";

import { HomeView } from "./home-view";

type PageProps = { params: Promise<{ locale: string }> };

// Trang chủ dùng metadata mặc định khai báo ở app/[locale]/layout.tsx (đã kèm canonical + hreflang).
export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  if (!isLang(locale)) notFound();

  const [fields, projects, partners] = await Promise.all([
    getFields(locale),
    getProjects(locale),
    getPartnersByKind(locale),
  ]);

  return (
    <HomeView
      fields={fields}
      projects={projects}
      brands={partners.brand}
      clients={partners.client}
    />
  );
}
