import { HomeView } from "./home-view";

// Trang chủ dùng metadata mặc định khai báo ở app/[locale]/layout.tsx (đã kèm canonical + hreflang).
export default function Page() {
  return <HomeView />;
}
