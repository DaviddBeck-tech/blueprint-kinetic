import type { Metadata } from "next";

import { NewsView } from "./view";

const title = "Tin tức — HBH Vietnam";
const description =
  "Tin công ty, cập nhật dự án và kiến thức kỹ thuật M&E · HVAC · BMS từ đội ngũ HBH.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

export default function Page() {
  return <NewsView />;
}
