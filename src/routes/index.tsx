import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import heroImg from "@/assets/hero-chiller.jpg";
import { fields, projects, brands, clients } from "@/lib/data";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <StatTicker />
      <Intro />
      <FieldsSection />
      <ProjectsScroll />
      <WhyHBH />
      <BrandMarquee />
      <ClientsGrid />
      <CTABand />
    </>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden pt-24 md:pt-32">
      <div className="absolute inset-0 blueprint-grid opacity-70" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-5 pb-16 md:px-10 lg:grid-cols-12 lg:gap-16 lg:pb-24">
        <div className="lg:col-span-7 lg:pt-8">
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="mono-label text-primary">M&E · HVAC · BMS</span>
            <span className="mono-label text-muted-foreground">EST · 2012</span>
          </motion.div>

          <h1 className="mt-6 font-display text-6xl font-extrabold leading-[0.92] tracking-tight md:text-7xl lg:text-[7.5rem]">
            {["Giải Pháp", "M&E", "Toàn Diện"].map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {i === 1 ? <span className="text-primary">{w}</span> : w}
              </motion.span>
            ))}
          </h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }} className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
            <span className="italic">Building Comfort, Delivering Trust.</span> Nhà thầu cơ điện lạnh hàng đầu cho công trình bệnh viện, quốc phòng, khách sạn – resort tại Việt Nam.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.5 }} className="mt-10 flex flex-wrap items-center gap-3">
            <Link to="/du-an" className="group inline-flex items-center gap-2 bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30">
              Xem Dự Án Tiêu Biểu
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/lien-he" className="inline-flex items-center gap-2 border border-foreground/20 px-6 py-4 text-sm font-semibold hover:border-foreground hover:bg-foreground hover:text-background">
              Nhận Tư Vấn Miễn Phí
            </Link>
          </motion.div>

          <div className="mt-14 flex gap-6 border-t border-border pt-6">
            {[
              ["10+", "NĂM"],
              ["35+", "DỰ ÁN"],
              ["655", "TỶ VNĐ"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-mono text-2xl font-semibold tabular md:text-3xl">{n}</div>
                <div className="mono-label mt-1 text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-5"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <img src={heroImg} alt="HBH Vietnam chiller plant" className="h-full w-full object-cover" width={1280} height={1600} />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent" />
            <div className="absolute left-4 top-4 border border-white/30 bg-black/60 px-3 py-2 text-white backdrop-blur-sm">
              <div className="mono-label text-primary/90">PROJECT · 07</div>
              <div className="mt-1 font-mono text-xs">BỆNH VIỆN 103 · CHILLER · 2020</div>
            </div>
            <div className="absolute bottom-4 right-4 border border-white/30 bg-black/60 px-3 py-2 text-white backdrop-blur-sm">
              <div className="mono-label text-primary/90">CAPACITY</div>
              <div className="mt-1 font-mono text-lg font-semibold tabular">2,400 RT</div>
            </div>
          </div>
          <div className="absolute -bottom-3 -right-3 h-24 w-24 border border-primary" />
        </motion.div>
      </div>
    </section>
  );
}

function CountUp({ end, duration = 1600 }: { end: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setN(Math.floor(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);
  return <span ref={ref} className="tabular">{n.toLocaleString("vi-VN")}</span>;
}

function StatTicker() {
  const stats = [
    { n: 10, suffix: "+", unit: "NĂM KINH NGHIỆM" },
    { n: 35, suffix: "+", unit: "DỰ ÁN LỚN" },
    { n: 655, suffix: " TỶ", unit: "GIÁ TRỊ HỢP ĐỒNG" },
    { n: 4, suffix: "", unit: "NHÓM KHÁCH HÀNG" },
  ];
  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-border md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.unit} className="px-6 py-10 md:px-10 md:py-14">
            <div className="font-display text-5xl font-black tracking-tight md:text-7xl">
              <CountUp end={s.n} />
              <span className="text-primary">{s.suffix}</span>
            </div>
            <div className="mono-label mt-3 text-muted-foreground">{s.unit}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="mono-label text-primary">— GIỚI THIỆU · 001</div>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">
            Nhà thầu cơ điện lạnh <span className="text-primary">tin cậy</span> cho những công trình khó nhất.
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="text-lg text-muted-foreground md:text-xl">
            Thành lập năm 2012, HBH Vietnam Investment JSC chuyên cung cấp giải pháp M&E trọn gói — từ khảo sát, thiết kế, cung cấp thiết bị chính hãng đến thi công lắp đặt và vận hành. Chúng tôi đã hoàn thành hơn 35 công trình trọng điểm cho khối y tế, quốc phòng, khách sạn – resort và nhà máy công nghiệp.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["Chính hãng", "Đại lý ủy quyền Trane, Carrier, Mitsubishi, LG."],
              ["Trọn gói", "Một đầu mối từ tư vấn đến bảo trì dài hạn."],
              ["35+ dự án", "Bệnh viện, quốc phòng, khách sạn – resort."],
            ].map(([t, d]) => (
              <div key={t} className="border border-border p-5 transition-colors hover:border-primary">
                <Check className="h-5 w-5 text-primary" />
                <div className="mt-3 font-semibold">{t}</div>
                <div className="mt-1 text-sm text-muted-foreground">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldsSection() {
  const [active, setActive] = useState(0);
  return (
    <section className="relative border-y border-border bg-muted/40">
      <div className="absolute inset-0 blueprint-grid-dense opacity-30" />
      <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mono-label text-primary">— LĨNH VỰC · 06 NHÓM</div>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-6xl">
              Sáu lĩnh vực <span className="italic text-primary">kỹ thuật lõi</span>.
            </h2>
          </div>
          <Link to="/linh-vuc-kinh-doanh" className="mono-label inline-flex items-center gap-2 text-foreground hover:text-primary">
            Tất cả lĩnh vực <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <ul className="divide-y divide-border border-y border-border lg:col-span-7">
            {fields.map((f, i) => (
              <li key={f.id} onMouseEnter={() => setActive(i)}>
                <button className={`group flex w-full items-center gap-6 py-6 text-left transition-colors ${active === i ? "text-foreground" : "text-foreground/60"}`}>
                  <span className="mono-label w-10 shrink-0 text-primary">{f.id}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-2xl font-bold tracking-tight md:text-3xl">{f.name}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{f.desc}</span>
                  </span>
                  <ArrowRight className={`h-5 w-5 shrink-0 transition-transform ${active === i ? "translate-x-1 text-primary" : ""}`} />
                </button>
              </li>
            ))}
          </ul>
          <div className="lg:col-span-5">
            <div className="sticky top-28 border border-border bg-background p-6">
              <div className="mono-label text-muted-foreground">NHÓM SẢN PHẨM {fields[active].id}</div>
              <div className="mt-3 font-display text-3xl font-bold">{fields[active].name}</div>
              <p className="mt-3 text-muted-foreground">{fields[active].desc}</p>
              <div className="mt-6">
                <div className="mono-label text-muted-foreground">THƯƠNG HIỆU ĐỐI TÁC</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {fields[active].brands.map((b) => (
                    <span key={b} className="mono-label border border-border bg-muted px-3 py-1.5">{b}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsScroll() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-6 px-5 md:px-10">
        <div>
          <div className="mono-label text-primary">— DỰ ÁN TIÊU BIỂU</div>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-6xl">
            Đã triển khai <span className="text-primary">35+</span> công trình.
          </h2>
        </div>
        <Link to="/du-an" className="mono-label inline-flex items-center gap-2 hover:text-primary">
          Xem tất cả dự án <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-12 overflow-x-auto pb-4 [scrollbar-width:thin]">
        <div className="flex gap-6 px-5 md:px-10" style={{ width: "max-content" }}>
          {projects.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group w-[85vw] max-w-[520px] shrink-0"
            >
              <Link to="/du-an/$slug" params={{ slug: p.slug }} className="block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" width={1200} height={900} />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent" />
                  <div className="absolute left-3 top-3 border border-white/30 bg-black/60 px-2.5 py-1.5 text-white">
                    <div className="mono-label text-primary/90">{p.system[0]}</div>
                  </div>
                  <div className="absolute inset-x-4 bottom-4 text-white">
                    <div className="mono-label text-white/70">{p.location.toUpperCase()} · {p.year}</div>
                    <div className="mt-2 font-display text-2xl font-bold leading-tight">{p.name}</div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyHBH() {
  const reasons = [
    { id: "01", t: "Trọn gói một đầu mối", d: "Khảo sát, thiết kế, cung cấp thiết bị, thi công, bảo trì — không đứt gãy trách nhiệm giữa các nhà thầu phụ." },
    { id: "02", t: "Thiết bị chính hãng", d: "Đại lý ủy quyền của Trane, Carrier, Mitsubishi Electric, LG, Munters, Solimpeks — chứng chỉ CO/CQ đầy đủ." },
    { id: "03", t: "35+ dự án đã bàn giao", d: "Kinh nghiệm thực chiến trong các công trình y tế, quốc phòng, khách sạn cao cấp có yêu cầu khắt khe nhất." },
    { id: "04", t: "Kỹ sư chuyên sâu", d: "Đội ngũ kỹ sư nhiệt lạnh và điều khiển BMS được đào tạo trực tiếp bởi hãng, đạt các chứng chỉ quốc tế." },
  ];
  return (
    <section className="border-y border-border bg-secondary text-secondary-foreground">
      <div className="absolute inset-0 blueprint-grid-inverse opacity-30" />
      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="sticky top-28">
            <div className="mono-label text-primary">— TẠI SAO HBH</div>
            <h2 className="mt-4 font-display text-5xl font-extrabold leading-[0.95] md:text-7xl">
              Chúng tôi <span className="italic">không bán</span> thiết bị.<br />
              Chúng tôi giao <span className="text-primary">giải pháp</span>.
            </h2>
          </div>
        </div>
        <div className="lg:col-span-7">
          <ul className="divide-y divide-secondary-foreground/10 border-y border-secondary-foreground/10">
            {reasons.map((r, i) => (
              <motion.li
                key={r.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="py-8"
              >
                <div className="flex items-baseline gap-6">
                  <span className="mono-label text-primary">{r.id}</span>
                  <div>
                    <div className="font-display text-3xl font-bold">{r.t}</div>
                    <p className="mt-2 max-w-xl text-secondary-foreground/70">{r.d}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function BrandMarquee() {
  const row = [...brands, ...brands];
  return (
    <section className="overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mono-label text-muted-foreground">— THƯƠNG HIỆU ĐỐI TÁC</div>
      </div>
      <div className="mt-8 space-y-6">
        {[false, true].map((rev, i) => (
          <div key={i} className="overflow-hidden">
            <div className={`flex gap-16 whitespace-nowrap ${rev ? "marquee-track-reverse" : "marquee-track"}`}>
              {row.map((b, j) => (
                <span key={j} className="font-display text-4xl font-black tracking-tight text-muted-foreground/40 transition-colors hover:text-primary md:text-6xl">
                  {b}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ClientsGrid() {
  return (
    <section className="border-y border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mono-label text-primary">— KHÁCH HÀNG</div>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight md:text-5xl">
          Đồng hành cùng những tập đoàn lớn nhất Việt Nam.
        </h2>
        <div className="mt-12 grid grid-cols-2 divide-x divide-y divide-border border border-border sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="grid aspect-[3/2] place-items-center px-6 text-center"
            >
              <span className="font-display text-lg font-bold tracking-tight md:text-xl">{c}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABand() {
  return (
    <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
      <div className="absolute inset-0 blueprint-grid-inverse opacity-40" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-5xl font-extrabold leading-[0.95] md:text-7xl lg:col-span-8 lg:text-8xl">
            Sẵn sàng cho dự án <span className="text-primary">M&E</span> tiếp theo?
          </h2>
          <div className="lg:col-span-4">
            <p className="text-secondary-foreground/70">Đội kỹ sư HBH sẽ khảo sát và gửi phương án miễn phí trong vòng 48 giờ.</p>
            <Link to="/lien-he" className="mt-6 inline-flex items-center gap-2 bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Nhận Tư Vấn Miễn Phí <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
