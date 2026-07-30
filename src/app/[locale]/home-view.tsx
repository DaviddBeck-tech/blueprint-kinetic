"use client";

import { LocaleLink as Link } from "@/components/LocaleLink";
import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { IMG } from "@/lib/data";
import type { Field, Partner, Project } from "@/lib/content/types";
import { BrandLogo } from "@/components/BrandLogo";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const heroImg = IMG.chiller;

export function HomeView({
  fields,
  projects,
  brands,
  clients,
}: {
  fields: Field[];
  projects: Project[];
  brands: Partner[];
  clients: Partner[];
}) {
  return (
    <>
      <Hero />
      <StatTicker />
      <Intro />
      <FieldsSection fields={fields} />
      <ProjectsScroll projects={projects} />
      <WhyHBH />
      <BrandMarquee brands={brands} />
      <ClientsGrid clients={clients} />
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
              href="/du-an"
              className="group inline-flex cursor-pointer items-center gap-2 bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t("common.viewProjects")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/lien-he"
              className="inline-flex cursor-pointer items-center gap-2 border border-foreground/20 px-6 py-4 text-sm font-semibold transition-colors hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t("common.freeConsult")}
            </Link>
          </motion.div>
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
        </motion.div>
      </div>
    </section>
  );
}

function CountUp({ end, duration = 1600 }: { end: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  // margin phải inset theo trục dọc thôi. "-80px" co cả trái/phải, trên mobile
  // span hẹp ở cột trái rơi ra ngoài vùng quan sát → inView không bao giờ true → số kẹt ở 0.
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const reduceMotion = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setN(end);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setN(Math.floor(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration, reduceMotion]);
  return (
    <span
      ref={ref}
      className="tabular inline-block"
      // giữ sẵn bề rộng của giá trị cuối để hậu tố (+ / TỶ) không nhảy khi đang đếm
      style={{ minWidth: `${end.toLocaleString("vi-VN").length}ch` }}
    >
      {n.toLocaleString("vi-VN")}
    </span>
  );
}

/** `plus` = ký hiệu "+" (cùng cỡ với số); `word` = đơn vị bằng chữ (TỶ / BN), luôn nhỏ hơn số. */
type Stat = { n: number; plus?: boolean; word?: string; unit: string };

function StatTicker() {
  const { t } = useTranslation();
  const stats: Stat[] = [
    { n: 10, plus: true, unit: t("home.statTicker.expYears") },
    { n: 35, plus: true, unit: t("home.statTicker.largeProjects") },
    {
      n: 655,
      word: t("home.statTicker.billionSuffix"),
      unit: t("home.statTicker.contractValue"),
    },
    { n: 4, unit: t("home.statTicker.clientGroups") },
  ];
  return (
    <section className="border-y border-border bg-background">
      {/* gap-px + nền border: kẻ đúng 1px giữa các ô ở mọi số cột, không dư
          đường thừa ở mép trái hàng 2 như khi dùng divide-x */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px bg-border md:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.unit}
            className="flex h-full flex-col bg-background px-5 py-8 sm:px-6 md:px-6 md:py-14 lg:px-8 xl:px-10"
          >
            {/* Cỡ số giảm dần theo bề rộng cột: md là chỗ chật nhất (4 cột trên 768px) */}
            <div className="whitespace-nowrap font-display text-4xl font-black leading-none tracking-tight sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
              <CountUp end={s.n} />
              {s.plus && <span className="text-primary">+</span>}
              {s.word && (
                <span className="ml-[0.14em] text-[0.55em] text-primary">
                  {s.word.trim()}
                </span>
              )}
            </div>
            {/* mt-auto: nhãn ghim đáy ô nên nhãn 1 dòng và 2 dòng vẫn thẳng hàng nhau */}
            <div className="mono-label mt-auto pt-3 text-balance text-muted-foreground md:pt-4">
              {s.unit}
            </div>
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

function FieldsSection({ fields }: { fields: Field[] }) {
  const { t } = useTranslation();
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
            href="/linh-vuc-kinh-doanh"
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
                      {f.name}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">{f.desc}</span>
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
                    src={fields[active].image.url}
                    alt={fields[active].image.alt}
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
                  <div className="font-display text-3xl font-bold">{fields[active].name}</div>
                  <p className="mt-3 text-muted-foreground">{fields[active].desc}</p>
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

function ProjectsScroll({ projects }: { projects: Project[] }) {
  const { t } = useTranslation();
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
            <span className="text-primary">100+</span>
            {t("home.projects.headingAfter")}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/du-an"
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
                <Link href={`/du-an/${p.slug}`} className="group block">
                  <div className="relative h-[26rem] overflow-hidden rounded-xl md:h-[30rem]">
                    <img
                      src={p.image.url}
                      alt={p.image.alt}
                      loading="lazy"
                      width={1200}
                      height={900}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/40 to-transparent" />
                    <div className="absolute left-3 top-3 border border-white/30 bg-black/50 px-2.5 py-1.5 backdrop-blur-sm">
                      <span className="mono-label text-primary/90">{p.system[0]}</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-white md:p-8">
                      <div className="mono-label text-white/70">
                        {p.location.toUpperCase()} · {p.year}
                      </div>
                      <div className="mt-2 font-display text-2xl font-bold leading-tight">
                        {p.name}
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm text-white/75">{p.scope}</p>
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
              >
                <div className="group relative -mx-4 rounded-lg px-4 py-8 transition duration-300 ease-out hover:-translate-y-1 hover:bg-secondary-foreground/5 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1/2 h-0 w-0.75 -translate-y-1/2 rounded-full bg-primary transition-all duration-300 ease-out group-hover:h-1/2"
                  />
                  <div className="flex items-baseline gap-6">
                    <span className="mono-label text-primary transition-transform duration-300 group-hover:scale-110">
                      {r.id}
                    </span>
                    <div>
                      <div className="font-display text-3xl font-bold">{r.t}</div>
                      <p className="mt-2 max-w-xl text-secondary-foreground/70 transition-colors duration-300 group-hover:text-secondary-foreground/90">
                        {r.d}
                      </p>
                    </div>
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

function BrandMarquee({ brands }: { brands: Partner[] }) {
  const { t } = useTranslation();
  // Nhân đôi danh sách để marquee cuộn liền mạch không thấy điểm nối.
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
              className={`flex gap-6 whitespace-nowrap ${rev ? "marquee-track-reverse" : "marquee-track"}`}
            >
              {row.map((b, j) => (
                <div key={j} className="group flex shrink-0 items-center">
                  <BrandLogo
                    name={b.name}
                    src={b.logo.url}
                    className="h-24 min-w-45 md:h-28"
                    imgClassName="max-h-14 md:max-h-16"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ClientsGrid({ clients }: { clients: Partner[] }) {
  const { t } = useTranslation();
  return (
    <section className="border-y border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mono-label text-primary">{t("home.clients.eyebrow")}</div>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight md:text-5xl">
          {t("home.clients.heading")}
        </h2>
        {/* Kẻ ô: khung chỉ lấy border-t/border-l, mỗi ô tự vẽ border-r/border-b
            ⇒ mọi đường đúng 1px và thẳng hàng ở mọi số cột. Dùng
            divide-x/divide-y + border cả khung thì ô cột cuối / hàng cuối đè
            thêm border của khung → line 2px, lệch với các line bên trong. */}
        <div className="mt-12 grid grid-cols-2 border-l border-t border-border sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group grid aspect-3/2 place-items-center border-b border-r border-border p-6 text-center"
            >
              <BrandLogo
                name={c.name}
                src={c.logo.url}
                className="h-16 w-full max-w-40 md:h-20"
                imgClassName="max-h-10 md:max-h-12"
              />
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
              href="/lien-he"
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
