import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { projects } from "@/lib/data";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/du-an/$slug")({
  loader: ({ params }) => {
    const project = projects.find(p => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.name} — HBH Vietnam` },
          { name: "description", content: loaderData.project.scope },
          { property: "og:title", content: `${loaderData.project.name} — HBH Vietnam` },
          { property: "og:description", content: loaderData.project.scope },
          { property: "og:image", content: loaderData.project.image },
        ]
      : [{ title: "Dự án — HBH Vietnam" }, { name: "robots", content: "noindex" }],
  }),
  component: ProjectDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-5 py-40 text-center">
      <div className="mono-label text-primary">— PROJECT · NOT_FOUND</div>
      <h1 className="mt-4 font-display text-5xl font-black">Không tìm thấy dự án</h1>
      <Link to="/du-an" className="mono-label mt-6 inline-flex text-primary">← Về danh sách</Link>
    </div>
  ),
});

function ProjectDetail() {
  const { project: p } = Route.useLoaderData();
  const others = projects.filter(o => o.slug !== p.slug).slice(0, 3);

  return (
    <>
      <section className="relative pt-24 md:pt-32">
        <div className="absolute inset-0 blueprint-grid opacity-50" />
        <div className="relative mx-auto max-w-[1400px] px-5 pb-12 md:px-10 md:pb-16">
          <Link to="/du-an" className="mono-label inline-flex items-center gap-2 text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-3.5 w-3.5" /> Về danh sách dự án
          </Link>
          <div className="mt-8 flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="mono-label text-primary">{p.system.join(" · ")}</span>
            <span className="mono-label ml-auto text-muted-foreground">YEAR · {p.year}</span>
          </div>
          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] md:text-7xl lg:text-8xl">{p.name}</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{p.scope}</p>
        </div>

        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <img src={p.image} alt={p.name} className="h-full w-full object-cover" width={1600} height={900} />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <div className="mono-label text-primary">— GHI CHÚ KỸ THUẬT</div>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">Phạm vi công việc</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {p.scope}. HBH đảm nhận vai trò tổng thầu M&E cho toàn bộ hệ thống, bao gồm khảo sát hiện trường, thiết kế shopdrawing, cung cấp thiết bị chính hãng, thi công lắp đặt và bàn giao vận hành đúng tiến độ tổng thầu.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Hệ thống được bảo hành 24 tháng theo tiêu chuẩn nhà sản xuất và ký kết hợp đồng bảo trì định kỳ với đội ngũ kỹ sư chuyên trách của HBH.
            </p>

            {p.gallery && (
              <div className="mt-12 grid gap-3 md:grid-cols-2">
                {p.gallery.map((g: string, i: number) => (
                  <img key={i} src={g} alt={`${p.name} — ${i + 1}`} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                ))}
              </div>
            )}
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 border border-border bg-muted/40 p-6">
              <div className="mono-label text-primary">— SPEC SHEET</div>
              <dl className="mt-4 space-y-4 text-sm">
                {[
                  ["CHỦ ĐẦU TƯ", p.client],
                  ["ĐỊA ĐIỂM", p.location],
                  ["NĂM BÀN GIAO", String(p.year)],
                  ["HỆ THỐNG", p.system.join(", ")],
                  ["LOẠI CÔNG TRÌNH", p.type.toUpperCase()],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[110px_1fr] gap-3 border-b border-border pb-3 last:border-0">
                    <dt className="mono-label text-muted-foreground">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <Link to="/lien-he" className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                Dự án tương tự? <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 py-20 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="mono-label text-primary">— DỰ ÁN LIÊN QUAN</div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {others.map(o => (
              <Link key={o.slug} to="/du-an/$slug" params={{ slug: o.slug }} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={o.image} alt={o.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" width={1200} height={900} />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 text-white">
                    <div className="mono-label text-white/70">{o.location.toUpperCase()} · {o.year}</div>
                    <div className="mt-2 font-display text-xl font-bold">{o.name}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
