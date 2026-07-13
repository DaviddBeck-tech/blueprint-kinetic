import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageHero } from "@/components/PageHero";
import chairman from "@/assets/chairman.jpg";

export const Route = createFileRoute("/gioi-thieu")({
  head: () => ({
    meta: [
      { title: "Giới thiệu — HBH Vietnam" },
      { name: "description", content: "Câu chuyện HBH Vietnam — hơn 10 năm kiến tạo giải pháp M&E cho các công trình trọng điểm." },
      { property: "og:title", content: "Giới thiệu — HBH Vietnam" },
      { property: "og:description", content: "Câu chuyện HBH Vietnam — hơn 10 năm kiến tạo giải pháp M&E cho các công trình trọng điểm." },
    ],
  }),
  component: About,
});

const TIMELINE = [
  { year: 2012, t: "Thành lập", d: "HBH Vietnam Investment JSC ra đời tại Hà Nội." },
  { year: 2015, t: "Đại lý ủy quyền", d: "Trở thành đại lý chính thức của Trane và Carrier." },
  { year: 2018, t: "Bước vào Quốc phòng", d: "Trúng thầu dự án Tổng cục Hậu cần." },
  { year: 2020, t: "Y tế trọng điểm", d: "Bàn giao hệ Chiller 2.400 RT tại Bệnh viện 103." },
  { year: 2022, t: "Mở rộng miền Trung", d: "Loạt dự án khách sạn – resort tại Đà Nẵng, Quảng Ninh." },
  { year: 2026, t: "35+ dự án", d: "Cột mốc 35+ công trình đã bàn giao, giá trị 655 tỷ VNĐ." },
];

function About() {
  return (
    <>
      <PageHero eyebrow="GIỚI THIỆU · 001" index="EST · 2012" title={<>Kỹ thuật <span className="text-primary italic">chính xác.</span><br />Cam kết <span className="italic">dài hạn.</span></>} subtitle="Hơn một thập kỷ HBH Vietnam đồng hành cùng các công trình khắt khe nhất — bệnh viện quốc phòng, khách sạn 5 sao, nhà máy công nghiệp." />

      {/* Chairman */}
      <section className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="relative aspect-[3/4] overflow-hidden">
            <img src={chairman} alt="Chủ tịch HBH Vietnam" className="h-full w-full object-cover" loading="lazy" width={900} height={1200} />
            <div className="absolute -bottom-3 -right-3 h-24 w-24 border border-primary" />
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="mono-label text-primary">— THÔNG ĐIỆP · CHỦ TỊCH</div>
          <blockquote className="mt-6 font-display text-3xl font-bold leading-tight md:text-5xl">
            &ldquo;Với HBH, mỗi hệ thống bàn giao là một <span className="text-primary">lời cam kết vận hành 20 năm</span>. Chúng tôi không đi tắt trên kỹ thuật, và không thoả hiệp về chất lượng.&rdquo;
          </blockquote>
          <div className="mt-8">
            <div className="font-display text-xl font-bold">Ông Nguyễn Văn Hải</div>
            <div className="mono-label mt-1 text-muted-foreground">CHỦ TỊCH HĐQT · HBH VIETNAM</div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
          <div className="mono-label text-primary">— TẦM NHÌN · SỨ MỆNH · GIÁ TRỊ</div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { i: "V", t: "Tầm nhìn", d: "Trở thành nhà thầu M&E đáng tin cậy nhất miền Bắc — được chọn cho những công trình khó nhất." },
              { i: "M", t: "Sứ mệnh", d: "Mang lại sự thoải mái và an toàn vận hành cho người sử dụng cuối cùng, thông qua kỹ thuật chính xác." },
              { i: "C", t: "Giá trị cốt lõi", d: "Minh bạch. Kỹ thuật lõi. Cam kết dài hạn. Không thoả hiệp." },
            ].map((p, i) => (
              <motion.div key={p.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className={`border border-border bg-background p-8 ${i === 1 ? "md:mt-10" : i === 2 ? "md:mt-20" : ""}`}>
                <div className="font-display text-6xl font-black text-primary">{p.i}</div>
                <div className="mt-4 font-display text-2xl font-bold">{p.t}</div>
                <p className="mt-3 text-muted-foreground">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="mono-label text-primary">— LỊCH SỬ · 2012 → NAY</div>
        <h2 className="mt-4 font-display text-4xl font-extrabold md:text-6xl">Hành trình 14 năm.</h2>

        <div className="relative mt-16">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2" />
          <ul className="space-y-12">
            {TIMELINE.map((e, i) => (
              <motion.li
                key={e.year}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className={`relative grid md:grid-cols-2 md:gap-16 ${i % 2 === 0 ? "" : "md:[&>*:first-child]:col-start-2"}`}
              >
                <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-8" : "md:pl-8"}`}>
                  <div className="mono-label text-primary">MILESTONE · {String(i + 1).padStart(2, "0")}</div>
                  <div className="mt-2 font-display text-5xl font-black tabular text-foreground md:text-7xl">{e.year}</div>
                  <div className="mt-2 font-display text-xl font-bold">{e.t}</div>
                  <p className="mt-2 text-muted-foreground">{e.d}</p>
                </div>
                <span className="absolute left-4 top-4 h-3 w-3 -translate-x-1/2 rounded-full bg-primary ring-4 ring-background md:left-1/2" />
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Explore children */}
      <section className="border-t border-border bg-secondary text-secondary-foreground">
        <div className="mx-auto grid max-w-[1400px] gap-px bg-secondary-foreground/10 md:grid-cols-2">
          {[
            ["/linh-vuc-kinh-doanh", "Lĩnh vực kinh doanh", "6 nhóm giải pháp M&E · HVAC · BMS"],
            ["/dich-vu", "Dịch vụ", "Thi công · Bảo trì · Tư vấn · Phân phối"],
          ].map(([to, t, d]) => (
            <Link key={to} to={to} className="group relative overflow-hidden bg-secondary p-10 md:p-16">
              <div className="mono-label text-primary">→ KHÁM PHÁ</div>
              <div className="mt-4 font-display text-4xl font-bold md:text-6xl">{t}</div>
              <div className="mt-3 text-secondary-foreground/70">{d}</div>
              <div className="mt-8 mono-label text-secondary-foreground group-hover:text-primary">TIẾP TỤC →</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
