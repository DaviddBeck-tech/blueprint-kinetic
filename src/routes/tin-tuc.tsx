import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { news } from "@/lib/data";
import { ArrowRight, Search } from "lucide-react";

const CATS = ["Tất cả", "Tin công ty", "Dự án", "Kiến thức kỹ thuật"];

export const Route = createFileRoute("/tin-tuc")({
  head: () => ({
    meta: [
      { title: "Tin tức — HBH Vietnam" },
      { name: "description", content: "Tin công ty, cập nhật dự án và kiến thức kỹ thuật M&E · HVAC · BMS từ đội ngũ HBH." },
      { property: "og:title", content: "Tin tức — HBH Vietnam" },
      { property: "og:description", content: "Tin công ty, cập nhật dự án và kiến thức kỹ thuật M&E · HVAC · BMS từ đội ngũ HBH." },
    ],
  }),
  component: News,
});

function News() {
  const [cat, setCat] = useState("Tất cả");
  const filtered = cat === "Tất cả" ? news : news.filter(n => n.category === cat);
  const [featured, ...rest] = filtered;

  return (
    <>
      <PageHero eyebrow="TIN TỨC · EDITORIAL" index="ARCHIVE" title={<>Ghi chép<br /><span className="italic text-primary">kỹ thuật</span> & dự án.</>} subtitle="Cập nhật dự án, tin công ty và những bài viết kỹ thuật từ đội ngũ HBH." />

      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
        <div className="flex flex-wrap gap-2 border-b border-border pb-6">
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)} className={`mono-label border px-3 py-1.5 ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}>{c}</button>
          ))}
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {featured && (
              <Link to="/tin-tuc/$slug" params={{ slug: featured.slug }} className="group block border-b border-border pb-12">
                <div className="mono-label text-primary">— NỔI BẬT · {featured.category.toUpperCase()}</div>
                <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight transition-colors group-hover:text-primary md:text-6xl">{featured.title}</h2>
                <p className="mt-4 max-w-2xl text-muted-foreground">{featured.excerpt}</p>
                <div className="mono-label mt-6 text-muted-foreground">{featured.date}</div>
              </Link>
            )}

            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              {rest.map(n => (
                <Link key={n.slug} to="/tin-tuc/$slug" params={{ slug: n.slug }} className="group block">
                  <div className="mono-label text-primary">{n.category.toUpperCase()}</div>
                  <div className="mt-3 font-display text-2xl font-bold leading-tight transition-colors group-hover:text-primary">{n.title}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
                  <div className="mono-label mt-4 text-muted-foreground">{n.date}</div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="space-y-8 lg:col-span-4">
            <div>
              <label className="mono-label text-muted-foreground">TÌM KIẾM</label>
              <div className="mt-2 flex items-center gap-2 border border-border bg-background px-3 py-2.5">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input placeholder="Nhập từ khoá..." className="w-full bg-transparent text-sm outline-none" />
              </div>
            </div>
            <div>
              <div className="mono-label text-muted-foreground">DANH MỤC</div>
              <ul className="mt-3 space-y-2 text-sm">
                {CATS.slice(1).map(c => (
                  <li key={c}><button onClick={() => setCat(c)} className="text-foreground/80 hover:text-primary">{c}</button></li>
                ))}
              </ul>
            </div>
            <div className="border border-border bg-secondary p-6 text-secondary-foreground">
              <div className="mono-label text-primary">— NHẬN BẢN TIN</div>
              <div className="mt-3 font-display text-2xl font-bold">Kiến thức M&E hàng tháng.</div>
              <Link to="/lien-he" className="mt-4 inline-flex items-center gap-2 bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                Đăng ký <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
