import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import { projects, type Project } from "@/lib/data";
import { PageHero } from "@/components/PageHero";

const TYPES: { id: Project["type"] | "all"; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "hospital", label: "Bệnh viện" },
  { id: "defense", label: "Quốc phòng" },
  { id: "hotel", label: "Khách sạn – Resort" },
  { id: "factory", label: "Nhà máy" },
  { id: "infra", label: "Hạ tầng" },
];
const SYSTEMS = ["Tất cả", "VRF", "Chiller", "BMS", "Nước nóng"];

export const Route = createFileRoute("/du-an")({
  head: () => ({
    meta: [
      { title: "Dự án — 35+ công trình HBH Vietnam" },
      { name: "description", content: "35+ công trình M&E, HVAC, BMS đã bàn giao — bệnh viện, quốc phòng, khách sạn – resort, nhà máy." },
      { property: "og:title", content: "Dự án — 35+ công trình HBH Vietnam" },
      { property: "og:description", content: "35+ công trình M&E, HVAC, BMS đã bàn giao — bệnh viện, quốc phòng, khách sạn – resort, nhà máy." },
    ],
  }),
  component: ProjectsList,
});

function ProjectsList() {
  const [type, setType] = useState<Project["type"] | "all">("all");
  const [sys, setSys] = useState("Tất cả");

  const filtered = useMemo(() => projects.filter(p =>
    (type === "all" || p.type === type) && (sys === "Tất cả" || p.system.some(s => s.includes(sys)))
  ), [type, sys]);

  return (
    <>
      <PageHero eyebrow="DỰ ÁN · PORTFOLIO" index="TOTAL · 35+" title={<><span className="font-mono tabular text-primary">35+</span><br />DỰ ÁN TIÊU BIỂU</>} subtitle="Từ bệnh viện quốc phòng đến khách sạn 5 sao — mỗi công trình là một cam kết kỹ thuật dài hạn." />

      <div className="sticky top-16 z-30 border-b border-border bg-background/85 backdrop-blur-xl md:top-20">
        <div className="mx-auto max-w-[1400px] space-y-3 px-5 py-4 md:px-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mono-label mr-2 text-muted-foreground">LOẠI</span>
            {TYPES.map(t => (
              <button key={t.id} onClick={() => setType(t.id)} className={`mono-label border px-3 py-1.5 transition-colors ${type === t.id ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}>{t.label}</button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mono-label mr-2 text-muted-foreground">HỆ</span>
            {SYSTEMS.map(s => (
              <button key={s} onClick={() => setSys(s)} className={`mono-label border px-3 py-1.5 transition-colors ${sys === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        {filtered.length === 0 ? (
          <div className="border border-dashed border-border py-24 text-center">
            <div className="mono-label text-muted-foreground">— KHÔNG CÓ KẾT QUẢ</div>
            <p className="mt-4 text-muted-foreground">Thử điều chỉnh bộ lọc để xem thêm dự án.</p>
          </div>
        ) : (
          <motion.div layout className="grid gap-6 md:grid-cols-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.article
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className={`group relative overflow-hidden ${i % 5 === 0 ? "md:col-span-4" : i % 3 === 0 ? "md:col-span-3" : "md:col-span-2"}`}
                >
                  <Link to="/du-an/$slug" params={{ slug: p.slug }} className="block">
                    <div className={`relative overflow-hidden ${i % 5 === 0 ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
                      <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" width={1200} height={900} />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
                      <div className="absolute left-3 top-3 flex gap-2">
                        {p.system.slice(0, 2).map(s => (
                          <span key={s} className="mono-label border border-white/30 bg-black/60 px-2 py-1 text-white backdrop-blur-sm">{s}</span>
                        ))}
                      </div>
                      <div className="absolute inset-x-4 bottom-4 text-white">
                        <div className="mono-label text-white/70">{p.location.toUpperCase()} · {p.year}</div>
                        <div className="mt-2 font-display text-2xl font-bold leading-tight">{p.name}</div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </>
  );
}
