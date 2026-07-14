import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import heroImg from "@/assets/hero-chiller.jpg";
import { fields, projects, brands, clients } from "@/lib/data";
import { useLocalize } from "@/lib/localize";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import "@/lib/i18n";

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
  const { t, i18n } = useTranslation();
  // Chữ EN ("Comprehensive"…) dài hơn VI nên giảm cỡ hero ở EN để không tràn/che sau ảnh.
  const isEn = i18n.language?.startsWith("en");
  return (
    <section className="relative min-h-[92vh] overflow-hidden pt-24 md:pt-32">
      <div className="absolute inset-0 blueprint-grid opacity-70" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-5 pb-16 md:px-10 lg:grid-cols-12 lg:gap-16 lg:pb-24">
        <div className="lg:col-span-7 lg:pt-8">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-primary" />
            <span className="mono-label text-primary">M&E · HVAC · BMS</span>
            <span className="mono-label text-muted-foreground">EST · 2012</span>
          </motion.div>

          <h1
            className={`mt-6 font-display font-extrabold leading-[1.05] tracking-tight ${
              isEn
                ? "text-4xl md:text-6xl lg:text-[5.5rem]"
                : "text-6xl md:text-7xl lg:text-[7.5rem]"
            }`}
          >
            {[t("home.hero.titleWord1"), "M&E", t("home.hero.titleWord2")].map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {i === 1 ? <span className="text-primary">{w}</span> : w}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl"
          >
            <span className="italic">Building Comfort, Delivering Trust.</span>{" "}
            {t("home.hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/du-an"
              className="group inline-flex cursor-pointer items-center gap-2 bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t("common.viewProjects")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/lien-he"
              className="inline-flex cursor-pointer items-center gap-2 border border-foreground/20 px-6 py-4 text-sm font-semibold transition-colors hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t("common.freeConsult")}
            </Link>
          </motion.div>

          <div className="mt-14 flex gap-6 border-t border-border pt-6">
            {[
              ["10+", t("home.stats.years")],
              ["35+", t("home.stats.projects")],
              ["655", t("home.stats.billion")],
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
            <img
              src={heroImg}
              alt="HBH Vietnam chiller plant"
              className="h-full w-full object-cover"
              width={1280}
              height={1600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent" />
            <div className="absolute left-4 top-4 border border-white/30 bg-black/60 px-3 py-2 text-white backdrop-blur-sm">
              <div className="mono-label text-primary/90">PROJECT · 07</div>
              <div className="mt-1 font-mono text-xs">{t("home.hero.imageCaption")}</div>
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
  return (
    <span ref={ref} className="tabular">
      {n.toLocaleString("vi-VN")}
    </span>
  );
}

function StatTicker() {
  const { t } = useTranslation();
  const stats = [
    { n: 10, suffix: "+", unit: t("home.statTicker.expYears") },
    { n: 35, suffix: "+", unit: t("home.statTicker.largeProjects") },
    {
      n: 655,
      suffix: t("home.statTicker.billionSuffix"),
      unit: t("home.statTicker.contractValue"),
    },
    { n: 4, suffix: "", unit: t("home.statTicker.clientGroups") },
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
  const { t } = useTranslation();
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <div className="mono-label text-primary">{t("home.intro.eyebrow")}</div>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">
            {t("home.intro.headingBefore")}
            <span className="text-primary">{t("home.intro.headingHighlight")}</span>
            {t("home.intro.headingAfter")}
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="lg:col-span-7"
        >
          <p className="text-lg text-muted-foreground md:text-xl">{t("home.intro.paragraph")}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              [t("home.intro.card1Title"), t("home.intro.card1Desc")],
              [t("home.intro.card2Title"), t("home.intro.card2Desc")],
              [t("home.intro.card3Title"), t("home.intro.card3Desc")],
            ].map(([title, d]) => (
              <div
                key={title}
                className="border border-border p-5 transition-colors hover:border-primary"
              >
                <Check className="h-5 w-5 text-primary" />
                <div className="mt-3 font-semibold">{title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{d}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FieldsSection() {
  const { t } = useTranslation();
  const L = useLocalize();
  const [active, setActive] = useState(0);
  return (
    <section className="relative border-y border-border bg-muted/40">
      <div className="absolute inset-0 blueprint-grid-dense opacity-30" />
      <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mono-label text-primary">{t("home.fields.eyebrow")}</div>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-6xl">
              {t("home.fields.headingBefore")}
              <span className="italic text-primary">{t("home.fields.headingHighlight")}</span>
              {t("home.fields.headingAfter")}
            </h2>
          </div>
          <Link
            to="/linh-vuc-kinh-doanh"
            className="mono-label inline-flex items-center gap-2 text-foreground hover:text-primary"
          >
            {t("home.fields.allLink")} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <ul className="divide-y divide-border border-y border-border lg:col-span-7">
            {fields.map((f, i) => (
              <li key={f.id} onMouseEnter={() => setActive(i)}>
                <button
                  onFocus={() => setActive(i)}
                  className={`group flex w-full cursor-pointer items-center gap-6 py-6 text-left transition-colors focus-visible:outline-none ${active === i ? "text-foreground" : "text-foreground/60 hover:text-foreground/80"}`}
                >
                  <span
                    className={`mono-label w-10 shrink-0 transition-colors ${active === i ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {f.id}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-2xl font-bold tracking-tight md:text-3xl">
                      {L(f.name, f.nameEn)}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {L(f.desc, f.descEn)}
                    </span>
                  </span>
                  <ArrowRight
                    className={`h-5 w-5 shrink-0 transition-transform ${active === i ? "translate-x-1 text-primary" : ""}`}
                  />
                </button>
              </li>
            ))}
          </ul>
          <div className="lg:col-span-5">
            <div className="sticky top-28 overflow-hidden border border-border bg-background">
              {/* thin red top accent — motif cho card nổi bật */}
              <div className="h-1 w-full bg-primary" />

              {/* Ảnh minh hoạ — crossfade mượt khi đổi lĩnh vực */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <AnimatePresence>
                  <motion.img
                    key={fields[active].id}
                    src={fields[active].image}
                    alt={L(fields[active].name, fields[active].nameEn)}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    width={800}
                    height={600}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-secondary/10 to-transparent" />
                <div className="absolute left-4 top-4 border border-white/25 bg-black/50 px-3 py-1.5 backdrop-blur-sm">
                  <span className="mono-label text-white/90">
                    {t("home.fields.groupLabel")} · {fields[active].id}
                  </span>
                </div>
              </div>

              {/* Nội dung — fade-up mượt theo lĩnh vực đang hover */}
              <div className="p-6">
                <motion.div
                  key={fields[active].id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="font-display text-3xl font-bold">
                    {L(fields[active].name, fields[active].nameEn)}
                  </div>
                  <p className="mt-3 text-muted-foreground">
                    {L(fields[active].desc, fields[active].descEn)}
                  </p>
                  <div className="mt-6">
                    <div className="mono-label text-muted-foreground">
                      {t("home.fields.partnerBrands")}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {fields[active].brands.map((b) => (
                        <span
                          key={b}
                          className="mono-label border border-border bg-muted px-3 py-1.5"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsScroll() {
  const { t } = useTranslation();
  const L = useLocalize();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    const update = () => {
      setCanPrev(carouselApi.canScrollPrev());
      setCanNext(carouselApi.canScrollNext());
      setCurrent(carouselApi.selectedScrollSnap());
    };
    update();
    carouselApi.on("select", update);
    carouselApi.on("reInit", update);
    return () => {
      carouselApi.off("select", update);
      carouselApi.off("reInit", update);
    };
  }, [carouselApi]);

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-6 px-5 md:px-10">
        <div>
          <div className="mono-label text-primary">{t("home.projects.eyebrow")}</div>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-6xl">
            {t("home.projects.headingBefore")}
            <span className="text-primary">35+</span>
            {t("home.projects.headingAfter")}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/du-an"
            className="mono-label inline-flex items-center gap-2 hover:text-primary"
          >
            {t("home.projects.viewAllLink")} <ArrowUpRight className="h-4 w-4" />
          </Link>
          <div className="hidden shrink-0 gap-2 md:flex">
            <button
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canPrev}
              aria-label={t("home.projects.prevAria")}
              className="grid h-11 w-11 place-items-center border border-border transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canNext}
              aria-label={t("home.projects.nextAria")}
              className="grid h-11 w-11 place-items-center border border-border transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12 w-full"
      >
        <Carousel
          setApi={setCarouselApi}
          opts={{ breakpoints: { "(max-width: 768px)": { dragFree: true } } }}
        >
          <CarouselContent className="ml-0 2xl:ml-[max(2.5rem,calc(50vw-700px))] 2xl:mr-[max(0rem,calc(50vw-700px))]">
            {projects.map((p) => (
              <CarouselItem key={p.slug} className="max-w-[85vw] pl-5 sm:max-w-[26rem]">
                <Link to="/du-an/$slug" params={{ slug: p.slug }} className="group block">
                  <div className="relative h-[26rem] overflow-hidden rounded-xl md:h-[30rem]">
                    <img
                      src={p.image}
                      alt={L(p.name, p.nameEn)}
                      loading="lazy"
                      width={1200}
                      height={900}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/40 to-transparent" />
                    <div className="absolute left-3 top-3 border border-white/30 bg-black/50 px-2.5 py-1.5 backdrop-blur-sm">
                      <span className="mono-label text-primary/90">
                        {L(p.system, p.systemEn)[0]}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-white md:p-8">
                      <div className="mono-label text-white/70">
                        {L(p.location, p.locationEn).toUpperCase()} · {p.year}
                      </div>
                      <div className="mt-2 font-display text-2xl font-bold leading-tight">
                        {L(p.name, p.nameEn)}
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm text-white/75">
                        {L(p.scope, p.scopeEn)}
                      </p>
                      <div className="mt-4 flex items-center text-sm font-medium">
                        {t("home.projects.viewDetail")}{" "}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-8 flex justify-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => carouselApi?.scrollTo(i)}
              aria-label={t("home.projects.dotAria", { n: i + 1 })}
              className={`h-2 w-2 rounded-full transition-colors ${current === i ? "bg-primary" : "bg-primary/25 hover:bg-primary/50"}`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function WhyHBH() {
  const { t } = useTranslation();
  const reasons = [
    { id: "01", t: t("home.why.reason1Title"), d: t("home.why.reason1Desc") },
    { id: "02", t: t("home.why.reason2Title"), d: t("home.why.reason2Desc") },
    { id: "03", t: t("home.why.reason3Title"), d: t("home.why.reason3Desc") },
    { id: "04", t: t("home.why.reason4Title"), d: t("home.why.reason4Desc") },
  ];
  return (
    <section className="relative border-y border-border bg-secondary text-secondary-foreground">
      <div className="absolute inset-0 blueprint-grid-inverse opacity-30" />
      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="sticky top-28">
            <div className="mono-label text-primary">{t("home.why.eyebrow")}</div>
            <h2 className="mt-4 font-display text-5xl font-extrabold leading-[1.1] md:text-7xl">
              {t("home.why.headingPart1")}
              <span className="italic">{t("home.why.headingItalic")}</span>
              {t("home.why.headingPart2")}
              <br />
              {t("home.why.headingPart3")}
              <span className="text-primary">{t("home.why.headingPrimary")}</span>
              {t("home.why.headingPart4")}
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
  const { t } = useTranslation();
  const row = [...brands, ...brands];
  return (
    <section className="overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mono-label text-muted-foreground">{t("home.brands.eyebrow")}</div>
      </div>
      <div className="mt-8 space-y-6">
        {[false, true].map((rev, i) => (
          <div key={i} className="overflow-hidden">
            <div
              className={`flex gap-16 whitespace-nowrap ${rev ? "marquee-track-reverse" : "marquee-track"}`}
            >
              {row.map((b, j) => (
                <span
                  key={j}
                  className="font-display text-4xl font-black tracking-tight text-muted-foreground/40 transition-colors hover:text-primary md:text-6xl"
                >
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
  const { t } = useTranslation();
  return (
    <section className="border-y border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mono-label text-primary">{t("home.clients.eyebrow")}</div>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight md:text-5xl">
          {t("home.clients.heading")}
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
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
      <div className="absolute inset-0 blueprint-grid-inverse-strong" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-5xl font-extrabold leading-[1.1] md:text-7xl lg:col-span-8 lg:text-8xl">
            {t("home.cta.headingBefore")}
            <span className="text-primary">M&E</span>
            {t("home.cta.headingAfter")}
          </h2>
          <div className="lg:col-span-4">
            <p className="text-secondary-foreground/70">{t("home.cta.subtitle")}</p>
            <Link
              to="/lien-he"
              className="group mt-6 inline-flex cursor-pointer items-center gap-2 bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t("common.freeConsult")}{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
