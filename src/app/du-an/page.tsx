import type { Metadata } from "next";

import { getServerT } from "@/lib/i18n-server";

import { ProjectsListView } from "./view";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getServerT();
  const title = t("projects.meta.title");
  const description = t("projects.meta.description");
  return { title, description, openGraph: { title, description } };
}

export default function Page() {
  return <ProjectsListView />;
}
