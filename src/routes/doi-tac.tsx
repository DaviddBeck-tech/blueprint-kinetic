import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageHero } from "@/components/PageHero";
import { brands, clients } from "@/lib/data";
import { Check } from "lucide-react";

export const Route = createFileRoute("/doi-tac")({
  head: () => ({
    meta: [
      { title: "Đối tác — HBH Vietnam" },
      { name: "description", content: "Hệ sinh thái đối tác của HBH — hãng thiết bị, nhà đầu tư và tổng thầu xây dựng hàng đầu Việt Nam." },
      { property: "og:title", content: "Đối tác — HBH Vietnam" },
      { property: "og:description", content: "Hệ sinh thái đối tác của HBH — hãng thiết bị, nhà đầu tư và tổng thầu xây dựng hàng đầu Việt Nam." },
    ],
  }),
  component: Partners,
});

const CONTRACTORS = ["Coteccons", "Hoà Bình", "Delta", "CC1", "Vinaconex", "Ricons"];

function Partners() {
  return (
    <>
      <PageHero eyebrow="ĐỐI TÁC · HỆ SINH THÁI" index="NETWORK" title={<>Hệ sinh thái <span className="text-primary italic">tin cậy.</span></>} subtitle="Chúng tôi làm việc với những hãng thiết bị tốt nhất thế giới và những tổng thầu lớn nhất Việt Nam." />

      <PartnerBlock title="Hãng thiết bị" mono="EQUIPMENT · BRANDS" items={brands} note="Đại lý ủy quyền chính thức — CO/CQ đầy đủ, bảo hành theo hãng." accent />
      <PartnerBlock title="Nhà đầu tư" mono="INVESTORS · CLIENTS" items={clients} note="Các tập đoàn bất động sản, y tế và du lịch hàng đầu Việt Nam." />
      <PartnerBlock title="Tổng thầu xây dựng" mono="GENERAL · CONTRACTORS" items={CONTRACTORS} note="Phối hợp thi công đồng bộ với các tổng thầu lớn nhất cả nước." accent />

      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
          <div className="mono-label text-primary">— LỢI ÍCH HỢP TÁC</div>
          <h2 className="mt-4 font-display text-4xl font-extrabold md:text-6xl">Cùng nhau, bền vững.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Giá ưu đãi", "Chiết khấu đại lý cấp cao nhất từ các hãng."],
              ["Tiến độ đảm bảo", "Đội thi công chuyên trách theo dự án, cam kết mốc."],
              ["Kỹ thuật lõi", "Kỹ sư được đào tạo trực tiếp bởi hãng."],
              ["Hậu mãi dài hạn", "Bảo hành 24 tháng, hợp đồng bảo trì 5–10 năm."],
            ].map(([t, d], i) => (
              <motion.div key={t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="border border-border bg-background p-6">
                <Check className="h-5 w-5 text-primary" />
                <div className="mt-3 font-display text-xl font-bold">{t}</div>
                <div className="mt-2 text-sm text-muted-foreground">{d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PartnerBlock({ title, mono, items, note, accent }: { title: string; mono: string; items: string[]; note: string; accent?: boolean }) {
  return (
    <section className={accent ? "border-b border-border" : "border-b border-border"}>
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mono-label text-primary">— {mono}</div>
            <h2 className="mt-4 font-display text-3xl font-extrabold md:text-5xl">{title}</h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">{note}</p>
        </div>
        <div className="mt-10 grid grid-cols-2 divide-x divide-y divide-border border border-border sm:grid-cols-3 lg:grid-cols-4">
          {items.map((n) => (
            <div key={n} className="grid aspect-[3/2] place-items-center px-6 transition-colors hover:bg-accent">
              <span className="font-display text-xl font-bold tracking-tight md:text-2xl">{n}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
