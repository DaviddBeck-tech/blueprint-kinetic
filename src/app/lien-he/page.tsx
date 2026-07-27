import type { Metadata } from "next";

import { getServerT } from "@/lib/i18n-server";

import { ContactView } from "./view";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getServerT();
  const title = t("contact.meta.title");
  return {
    title,
    description: t("contact.meta.description"),
    openGraph: { title, description: t("contact.meta.ogDescription") },
  };
}

export default function Page() {
  return <ContactView />;
}
