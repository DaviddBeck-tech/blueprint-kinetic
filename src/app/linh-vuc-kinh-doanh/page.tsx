import type { Metadata } from "next";

import { FieldsView } from "./view";

const title = "Lĩnh vực kinh doanh — HBH Vietnam";
const description =
  "6 nhóm giải pháp M&E, HVAC, BMS của HBH — từ điều hoà cục bộ đến chiller trung tâm và hệ điều khiển toà nhà.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

export default function Page() {
  return <FieldsView />;
}
