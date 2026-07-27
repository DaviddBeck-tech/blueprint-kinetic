"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/PageHero";
import { IMG } from "@/lib/data";

const chairman = IMG.chairman;

const TIMELINE = [
  { year: 2012, t: "about.timeline.items.2012.t", d: "about.timeline.items.2012.d" },
  { year: 2015, t: "about.timeline.items.2015.t", d: "about.timeline.items.2015.d" },
  { year: 2018, t: "about.timeline.items.2018.t", d: "about.timeline.items.2018.d" },
  { year: 2020, t: "about.timeline.items.2020.t", d: "about.timeline.items.2020.d" },
  { year: 2022, t: "about.timeline.items.2022.t", d: "about.timeline.items.2022.d" },
  { year: 2026, t: "about.timeline.items.2026.t", d: "about.timeline.items.2026.d" },
];

export function AboutView() {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        eyebrow={t("about.hero.eyebrow")}
        index="EST · 2012"
        title={
          <>
            {t("about.hero.title1")}{" "}
            <span className="text-primary italic">{t("about.hero.title2")}</span>
            <br />
            {t("about.hero.title3")} <span className="italic">{t("about.hero.title4")}</span>
          </>
        }
        subtitle={t("about.hero.subtitle")}
      />

      {/* Chairman */}
      <section className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={chairman}
              alt={t("about.chairman.imgAlt")}
              className="h-full w-full object-cover"
              loading="lazy"
              width={900}
              height={1200}
            />
            <div className="absolute -bottom-3 -right-3 h-24 w-24 border border-primary" />
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="mono-label text-primary">{t("about.chairman.label")}</div>
          <blockquote className="mt-6 font-display text-3xl font-bold leading-tight md:text-5xl">
            &ldquo;{t("about.chairman.quote1")}{" "}
            <span className="text-primary">{t("about.chairman.quoteHighlight")}</span>
            {t("about.chairman.quote2")}&rdquo;
          </blockquote>
          <div className="mt-8">
            <div className="font-display text-xl font-bold">{t("about.chairman.name")}</div>
            <div className="mono-label mt-1 text-muted-foreground">{t("about.chairman.role")}</div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
          <div className="mono-label text-primary">{t("about.philosophy.label")}</div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { i: "V", t: t("about.philosophy.vision.t"), d: t("about.philosophy.vision.d") },
              { i: "M", t: t("about.philosophy.mission.t"), d: t("about.philosophy.mission.d") },
              { i: "C", t: t("about.philosophy.values.t"), d: t("about.philosophy.values.d") },
            ].map((p, i) => (
              <motion.div
                key={p.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`border border-border bg-background p-8 ${i === 1 ? "md:mt-10" : i === 2 ? "md:mt-20" : ""}`}
              >
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
        <div className="mono-label text-primary">{t("about.timeline.label")}</div>
        <h2 className="mt-4 font-display text-4xl font-extrabold md:text-6xl">
          {t("about.timeline.heading")}
        </h2>

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
                <div
                  className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-8" : "md:pl-8"}`}
                >
                  <div className="mono-label text-primary">
                    MILESTONE · {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-2 font-display text-5xl font-black tabular text-foreground md:text-7xl">
                    {e.year}
                  </div>
                  <div className="mt-2 font-display text-xl font-bold">{t(e.t)}</div>
                  <p className="mt-2 text-muted-foreground">{t(e.d)}</p>
                </div>
                <span className="absolute left-4 top-4 h-3 w-3 -translate-x-1/2 rounded-full bg-primary ring-4 ring-background md:left-1/2" />
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Org chart */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
          <div className="mono-label text-primary">{t("about.org.label")}</div>
          <h2 className="mt-4 font-display text-4xl font-extrabold md:text-6xl">
            {t("about.org.heading")}
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">{t("about.org.desc")}</p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mt-16 overflow-x-auto pb-4"
          >
            <div className="mx-auto flex w-fit flex-col items-center px-2">
              {/* L1 — Hội đồng Quản trị */}
              <OrgBox title={t("about.org.boxes.board")} />
              <Drop />
              {/* L2 — Giám đốc */}
              <OrgBox title={t("about.org.boxes.director")} />
              {/* L3 — 2 Phó Giám đốc (trục nối xuyên xuống cấp Phòng) */}
              <Fan
                spineThrough
                boxes={[
                  { title: t("about.org.boxes.deputyTech") },
                  { title: t("about.org.boxes.deputyProject") },
                ]}
              />
              {/* L4 — 3 Phòng */}
              <Fan
                boxes={[
                  { title: t("about.org.boxes.deptProject") },
                  { title: t("about.org.boxes.deptTech") },
                  { title: t("about.org.boxes.deptAccounting") },
                ]}
              />
              {/* L5 — 3 Đội */}
              <Fan
                boxes={[
                  { title: t("about.org.boxes.teamBMS") },
                  { title: t("about.org.boxes.teamRefrigeration") },
                  { title: t("about.org.boxes.teamHotWater") },
                ]}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Explore children */}
      <section className="border-t border-border bg-secondary text-secondary-foreground">
        <div className="mx-auto grid max-w-[1400px] gap-px bg-secondary-foreground/10 md:grid-cols-2">
          {[
            ["/linh-vuc-kinh-doanh", t("nav.fields"), t("about.explore.fields.d")],
            ["/dich-vu", t("nav.services"), t("about.explore.services.d")],
          ].map(([to, title, d]) => (
            <Link
              key={to}
              href={to}
              className="group relative overflow-hidden bg-secondary p-10 md:p-16"
            >
              <div className="mono-label text-primary">{t("about.explore.label")}</div>
              <div className="mt-4 font-display text-4xl font-bold md:text-6xl">{title}</div>
              <div className="mt-3 text-secondary-foreground/70">{d}</div>
              <div className="mt-8 mono-label text-secondary-foreground group-hover:text-primary">
                {t("about.explore.continue")}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

/* ── Sơ đồ tổ chức: ô + đường nối (đường đậm, có mũi tên — khớp ảnh mẫu) ── */
const ORG_LINE = "bg-foreground/70"; // màu đường nối — đậm, rõ như bản in

/** Mũi tên ▼ chỉ xuống, cắm vào đỉnh mỗi ô. */
function ArrowDown() {
  return (
    <span
      aria-hidden
      className="block"
      style={{
        width: 0,
        height: 0,
        borderLeft: "5px solid transparent",
        borderRight: "5px solid transparent",
        borderTop: "7px solid hsl(var(--foreground) / 0.7)",
      }}
    />
  );
}

/** Ô trong sơ đồ — viền đỏ, chữ đỏ in hoa, nền trắng, bóng nhẹ. */
function OrgBox({ title, className = "" }: { title: string; className?: string }) {
  return (
    <div
      className={`flex w-48 shrink-0 items-center justify-center border-2 border-primary bg-background px-3 py-4 text-center shadow-[0_6px_16px_hsl(var(--foreground)/0.08)] ${className}`}
    >
      <div className="text-balance font-display text-xs font-bold uppercase leading-snug tracking-tight text-primary md:text-sm">
        {title}
      </div>
    </div>
  );
}

/** Nối 1 → 1 giữa 2 ô: đường dọc + mũi tên cắm xuống ô dưới. */
function Drop() {
  return (
    <div className="flex flex-col items-center">
      <div className={`h-8 w-px ${ORG_LINE}`} />
      <ArrowDown />
    </div>
  );
}

/**
 * Nhánh 1 cha → N con: trục dọc từ cha xuống thanh bus ngang, rồi rẽ dọc xuống từng ô (kèm mũi tên).
 * `spineThrough` = kéo tiếp trục dọc xuyên qua giữa hàng để nối xuống cấp bên dưới (dùng cho cấp trung gian).
 */
function Fan({
  boxes,
  spineThrough = false,
}: {
  boxes: { title: string }[];
  spineThrough?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      {/* trục dọc từ ô cha xuống thanh bus */}
      <div className={`h-8 w-px ${ORG_LINE}`} />
      <div className="relative flex items-stretch gap-8 pt-8">
        {/* thanh bus ngang — inset-x-[6rem] = tâm ô (w-48 ÷ 2) → nối đúng tâm ô đầu & cuối, không lệ thuộc gap */}
        <div className={`absolute inset-x-[6rem] top-0 h-px ${ORG_LINE}`} />
        {/* trục xuyên giữa hàng để nối tiếp xuống cấp dưới */}
        {spineThrough && (
          <div className={`absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 ${ORG_LINE}`} />
        )}
        {boxes.map((b) => (
          <div key={b.title} className="relative flex flex-col items-center">
            {/* nhánh dọc từ bus xuống đỉnh ô */}
            <div className={`absolute -top-8 left-1/2 h-8 w-px -translate-x-1/2 ${ORG_LINE}`} />
            {/* mũi tên cắm vào đỉnh ô */}
            <span className="absolute left-1/2 -translate-x-1/2" style={{ top: "-7px" }}>
              <ArrowDown />
            </span>
            <OrgBox title={b.title} />
          </div>
        ))}
      </div>
    </div>
  );
}
