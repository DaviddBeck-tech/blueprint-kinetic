import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageHero } from "@/components/PageHero";
import { ArrowRight } from "lucide-react";
import hospital from "@/assets/project-hospital.jpg";
import factory from "@/assets/project-factory.jpg";
import resort from "@/assets/project-resort.jpg";
import chiller from "@/assets/hero-chiller.jpg";

const SERVICES = [
  { id: "01", t: "Thi công lắp đặt M&E", d: "Đội ngũ thi công chuyên trách cho từng hệ thống — điều hoà, nước nóng, chiếu sáng, thông gió — đảm bảo tiến độ tổng thầu và tiêu chuẩn kỹ thuật quốc tế.", img: hospital },
  { id: "02", t: "Bảo trì & Vận hành", d: "Hợp đồng bảo trì định kỳ 6–12 tháng, hotline kỹ thuật 24/7, đội ngũ ứng cứu trong 4 giờ tại khu vực Hà Nội và các tỉnh lân cận.", img: chiller },
  { id: "03", t: "Tư vấn giải pháp", d: "Khảo sát, phân tích tải, mô phỏng năng lượng, đề xuất phương án tối ưu chi phí đầu tư ban đầu (CAPEX) và chi phí vận hành dài hạn (OPEX).", img: factory },
  { id: "04", t: "Phân phối thiết bị chính hãng", d: "Đại lý ủy quyền của Trane, Carrier, Mitsubishi Electric, LG, Munters, Solimpeks — CO/CQ đầy đủ, bảo hành theo hãng.", img: resort },
];

export const Route = createFileRoute("/dich-vu")({
  head: () => ({
    meta: [
      { title: "Dịch vụ — HBH Vietnam" },
      { name: "description", content: "Bốn nhóm dịch vụ HBH: thi công M&E, bảo trì vận hành, tư vấn giải pháp và phân phối thiết bị chính hãng." },
      { property: "og:title", content: "Dịch vụ — HBH Vietnam" },
      { property: "og:description", content: "Bốn nhóm dịch vụ HBH: thi công M&E, bảo trì vận hành, tư vấn giải pháp và phân phối thiết bị chính hãng." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero eyebrow="DỊCH VỤ · 04 NHÓM" index="M&E · HVAC · BMS" title={<>Bốn dịch vụ.<br /><span className="italic text-primary">Một cam kết.</span></>} subtitle="Từ tư vấn giai đoạn thiết kế đến bảo trì trong suốt vòng đời công trình." />

      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <ul className="space-y-24 md:space-y-32">
          {SERVICES.map((s, i) => (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className={`grid items-center gap-10 md:grid-cols-12 md:gap-16 ${i % 2 === 1 ? "" : ""}`}
            >
              <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={s.img} alt={s.t} className="h-full w-full object-cover" loading="lazy" width={1200} height={750} />
                  <div className="absolute left-4 top-4 border border-white/30 bg-black/60 px-3 py-2 text-white backdrop-blur-sm">
                    <div className="mono-label text-primary/90">SERVICE · {s.id}</div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-5">
                <div className="mono-label text-primary">— {s.id} / 04</div>
                <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">{s.t}</h2>
                <p className="mt-6 text-lg text-muted-foreground">{s.d}</p>
                <Link to="/lien-he" className="mono-label mt-8 inline-flex items-center gap-2 text-foreground hover:text-primary">
                  Yêu cầu tư vấn <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.li>
          ))}
        </ul>
      </section>

      <section className="border-y border-border bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-24">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <h2 className="font-display text-4xl font-extrabold md:text-6xl lg:col-span-8">Cần báo giá cho dự án của bạn?</h2>
            <Link to="/lien-he" className="inline-flex items-center gap-2 justify-self-start bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 lg:col-span-4 lg:justify-self-end">
              Yêu cầu báo giá <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
