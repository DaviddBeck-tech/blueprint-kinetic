import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageHero } from "@/components/PageHero";
import { fields } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import factory from "@/assets/project-factory.jpg";
import hospital from "@/assets/project-hospital.jpg";
import resort from "@/assets/project-resort.jpg";
import hotel from "@/assets/project-hotel.jpg";
import defense from "@/assets/project-defense.jpg";
import chiller from "@/assets/hero-chiller.jpg";

const IMGS = [chiller, hotel, factory, hospital, resort, defense];

const PROCESS = [
  { id: "01", t: "Khảo sát", d: "Đo đạc tại hiện trường, phân tích tải lạnh, điện, thông gió." },
  { id: "02", t: "Thiết kế", d: "Bản vẽ shopdrawing, tính toán tối ưu chi phí đầu tư và vận hành." },
  { id: "03", t: "Cung cấp", d: "Thiết bị chính hãng, CO/CQ đầy đủ, logistics tại công trường." },
  { id: "04", t: "Lắp đặt", d: "Đội thi công chuyên trách, tiến độ cam kết, an toàn tuyệt đối." },
  { id: "05", t: "Bàn giao & bảo trì", d: "Vận hành thử, đào tạo, bảo hành 24 tháng, bảo trì dài hạn." },
];

export const Route = createFileRoute("/linh-vuc-kinh-doanh")({
  head: () => ({
    meta: [
      { title: "Lĩnh vực kinh doanh — HBH Vietnam" },
      { name: "description", content: "6 nhóm giải pháp M&E, HVAC, BMS của HBH — từ điều hoà cục bộ đến chiller trung tâm và hệ điều khiển toà nhà." },
      { property: "og:title", content: "Lĩnh vực kinh doanh — HBH Vietnam" },
      { property: "og:description", content: "6 nhóm giải pháp M&E, HVAC, BMS của HBH — từ điều hoà cục bộ đến chiller trung tâm và hệ điều khiển toà nhà." },
    ],
  }),
  component: FieldsPage,
});

function FieldsPage() {
  return (
    <>
      <PageHero eyebrow="LĨNH VỰC · 06 NHÓM" index="M&E · HVAC · BMS" title={<>Sáu <span className="text-primary italic">kỹ thuật lõi.</span><br />Một đối tác duy nhất.</>} subtitle="Từ điều hoà cục bộ cho căn hộ đến chiller trung tâm và BMS cho toà nhà thông minh." />

      {/* Alternating field blocks */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <ul className="space-y-24 md:space-y-32">
          {fields.map((f, i) => (
            <motion.li
              key={f.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={IMGS[i]} alt={f.name} className="h-full w-full object-cover" loading="lazy" width={1200} height={900} />
                <div className="absolute left-3 top-3 border border-white/30 bg-black/60 px-3 py-2 text-white backdrop-blur-sm">
                  <div className="mono-label text-primary/90">FIELD · {f.id}</div>
                  <div className="mt-1 font-mono text-xs">{f.brands.join(" · ").toUpperCase()}</div>
                </div>
              </div>
              <div>
                <div className="mono-label text-primary">— {f.id} / 06</div>
                <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-6xl">{f.name}</h2>
                <p className="mt-6 text-lg text-muted-foreground">{f.desc}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {f.brands.map((b) => <span key={b} className="mono-label border border-border px-3 py-1.5">{b}</span>)}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Extended groups */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto grid max-w-[1400px] gap-6 px-5 py-24 md:grid-cols-2 md:px-10 md:py-32">
          {[
            { t: "M&E Installation", d: "Thi công cơ điện toàn diện: điện, nước, HVAC, PCCC — đảm bảo tiến độ tổng thầu." },
            { t: "BMS / ACS / EMS", d: "Hệ điều khiển toà nhà, kiểm soát truy cập, giám sát năng lượng — nền tảng cho công trình thông minh." },
          ].map((g) => (
            <div key={g.t} className="border border-border bg-background p-10">
              <div className="mono-label text-primary">— NHÓM MỞ RỘNG</div>
              <div className="mt-4 font-display text-3xl font-bold">{g.t}</div>
              <p className="mt-3 text-muted-foreground">{g.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5-step process */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="mono-label text-primary">— QUY TRÌNH · 05 BƯỚC</div>
        <h2 className="mt-4 font-display text-4xl font-extrabold md:text-6xl">Từ khảo sát đến bàn giao.</h2>

        <div className="mt-16 grid gap-6 md:grid-cols-5 md:gap-0">
          {PROCESS.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative p-6 md:border-l md:border-border ${i === 0 ? "md:border-l-primary" : ""}`}
            >
              <div className="mono-label text-primary">{s.id}</div>
              <div className="mt-3 font-display text-xl font-bold">{s.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <Link to="/lien-he" className="inline-flex items-center gap-2 bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Đặt lịch tư vấn <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
