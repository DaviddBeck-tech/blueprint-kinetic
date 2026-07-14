import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { news } from "@/lib/data";
import { useLocalize } from "@/lib/localize";
import { ArrowLeft } from "lucide-react";
import "@/lib/i18n";

export const Route = createFileRoute("/tin-tuc/$slug")({
  loader: ({ params }) => {
    const post = news.find((n) => n.slug === params.slug);
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
  notFoundComponent: () => {
    const { t } = useTranslation();
    return (
      <div className="mx-auto max-w-2xl px-5 py-40 text-center">
        <h1 className="font-display text-4xl font-black">{t("news.detail.notFoundTitle")}</h1>
        <Link to="/tin-tuc" className="mono-label mt-6 inline-flex text-primary">
          ← {t("news.detail.backToList")}
        </Link>
      </div>
    );
  },
});

function NewsDetail() {
  const { t } = useTranslation();
  const L = useLocalize();
  const { post } = Route.useLoaderData();
  const related = news.filter((n) => n.slug !== post.slug).slice(0, 3);

  return (
    <>
      <section className="relative pt-24 md:pt-32">
        <div className="absolute inset-0 blueprint-grid opacity-40" />
        <div className="relative mx-auto max-w-3xl px-5 pb-16 md:px-10 md:pb-24">
          <Link
            to="/tin-tuc"
            className="mono-label inline-flex items-center gap-2 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {t("nav.news")}
          </Link>
          <div className="mono-label mt-8 text-primary">
            {L(post.category, post.categoryEn).toUpperCase()} · {post.date}
          </div>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] md:text-6xl">
            {L(post.title, post.titleEn)}
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">{L(post.excerpt, post.excerptEn)}</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-5 pb-24 md:px-10 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="prose prose-lg max-w-none space-y-6 text-lg leading-relaxed text-foreground/85"
        >
          <p>{t("news.detail.body.p1")}</p>
          <p>{t("news.detail.body.p2")}</p>
          <h2 className="font-display text-3xl font-bold">{t("news.detail.body.h2")}</h2>
          <p>{t("news.detail.body.p3")}</p>
        </motion.div>
      </article>

      <section className="border-t border-border bg-muted/40 py-16">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="mono-label text-primary">— {t("news.detail.relatedBadge")}</div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 grid gap-8 md:grid-cols-3"
          >
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/tin-tuc/$slug"
                params={{ slug: r.slug }}
                className="group block"
              >
                <div className="mono-label text-primary">
                  {L(r.category, r.categoryEn).toUpperCase()}
                </div>
                <div className="mt-3 font-display text-xl font-bold leading-tight group-hover:text-primary">
                  {L(r.title, r.titleEn)}
                </div>
                <div className="mono-label mt-3 text-muted-foreground">{r.date}</div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
