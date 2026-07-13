import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { news } from "@/lib/data";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/tin-tuc/$slug")({
  loader: ({ params }) => {
    const post = news.find(n => n.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — HBH Vietnam` },
          { name: "description", content: loaderData.post.excerpt },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.excerpt },
        ]
      : [{ title: "Tin tức — HBH Vietnam" }, { name: "robots", content: "noindex" }],
  }),
  component: NewsDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-5 py-40 text-center">
      <h1 className="font-display text-4xl font-black">Không tìm thấy bài viết</h1>
      <Link to="/tin-tuc" className="mono-label mt-6 inline-flex text-primary">← Về danh sách</Link>
    </div>
  ),
});

function NewsDetail() {
  const { post } = Route.useLoaderData();
  const related = news.filter(n => n.slug !== post.slug).slice(0, 3);

  return (
    <>
      <section className="relative pt-24 md:pt-32">
        <div className="absolute inset-0 blueprint-grid opacity-40" />
        <div className="relative mx-auto max-w-3xl px-5 pb-16 md:px-10 md:pb-24">
          <Link to="/tin-tuc" className="mono-label inline-flex items-center gap-2 text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-3.5 w-3.5" /> Tin tức
          </Link>
          <div className="mono-label mt-8 text-primary">{post.category.toUpperCase()} · {post.date}</div>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1] md:text-6xl">{post.title}</h1>
          <p className="mt-6 text-xl text-muted-foreground">{post.excerpt}</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-5 pb-24 md:px-10 md:pb-32">
        <div className="prose prose-lg max-w-none dark:prose-invert space-y-6 text-lg leading-relaxed text-foreground/85">
          <p>
            HBH Vietnam tiếp tục củng cố vị thế của mình trong lĩnh vực M&E, HVAC và BMS với những cột mốc quan trọng trong quý vừa qua. Đội ngũ kỹ sư của chúng tôi đã hoàn thành khảo sát và triển khai giai đoạn đầu của gói thầu trị giá hàng trăm tỷ đồng.
          </p>
          <p>
            Với hơn 10 năm kinh nghiệm và 35+ dự án đã bàn giao, HBH cam kết mang lại giải pháp trọn gói — từ tư vấn thiết kế, cung cấp thiết bị chính hãng đến thi công lắp đặt và bảo trì dài hạn. Đây là những giá trị mà khách hàng như Sun Group, FLC, TNR và Bộ Quốc phòng đã tin tưởng lựa chọn.
          </p>
          <h2 className="font-display text-3xl font-bold">Định hướng phát triển</h2>
          <p>
            Trong năm 2026, HBH sẽ tiếp tục mở rộng danh mục thiết bị chính hãng, tăng cường đội ngũ kỹ sư chuyên sâu và triển khai các dự án BMS/EMS quy mô lớn cho khối bệnh viện và khách sạn 5 sao.
          </p>
        </div>
      </article>

      <section className="border-t border-border bg-muted/40 py-16">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="mono-label text-primary">— BÀI VIẾT LIÊN QUAN</div>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            {related.map(r => (
              <Link key={r.slug} to="/tin-tuc/$slug" params={{ slug: r.slug }} className="group block">
                <div className="mono-label text-primary">{r.category.toUpperCase()}</div>
                <div className="mt-3 font-display text-xl font-bold leading-tight group-hover:text-primary">{r.title}</div>
                <div className="mono-label mt-3 text-muted-foreground">{r.date}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
