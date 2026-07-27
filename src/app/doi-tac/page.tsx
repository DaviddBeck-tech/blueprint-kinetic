import type { Metadata } from "next";

import { PartnersView } from "./view";

const title = "Đối tác — HBH Vietnam";
const description =
  "Hệ sinh thái đối tác của HBH — hãng thiết bị, nhà đầu tư và tổng thầu xây dựng hàng đầu Việt Nam.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

export default function Page() {
  return <PartnersView />;
}
