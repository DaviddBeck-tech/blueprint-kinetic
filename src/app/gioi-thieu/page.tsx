import type { Metadata } from "next";

import { getServerT } from "@/lib/i18n-server";

import { AboutView } from "./view";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getServerT();
  const title = t("about.meta.title");
  const description = t("about.meta.description");
  return { title, description, openGraph: { title, description } };
}

export default function Page() {
  return <AboutView />;
}
