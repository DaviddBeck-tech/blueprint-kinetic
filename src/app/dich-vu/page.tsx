import type { Metadata } from "next";

import { getServerT } from "@/lib/i18n-server";

import { ServicesView } from "./view";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getServerT();
  const title = t("services.meta.title");
  const description = t("services.meta.description");
  return { title, description, openGraph: { title, description } };
}

export default function Page() {
  return <ServicesView />;
}
