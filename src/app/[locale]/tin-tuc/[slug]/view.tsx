"use client";

import { LocaleLink as Link } from "@/components/LocaleLink";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import type { Post } from "@/lib/content/types";
import { RichText } from "@/components/RichText";
import { ArrowLeft } from "lucide-react";

export function NewsDetailView({ post, related }: { post: Post; related: Post[] }) {
  const { t } = useTranslation();

  return (
    <>
      <section className="relative pt-24 md:pt-32">
        <div className="absolute inset-0 blueprint-grid opacity-40" />
        <div className="relative mx-auto max-w-3xl px-5 pb-16 md:px-10 md:pb-24">
          <Link
            href="/tin-tuc"
            className="mono-label inline-flex items-center gap-2 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {t("nav.news")}
          </Link>
          <div className="mono-label mt-8 text-primary">
            {post.category.name.toUpperCase()} · {post.date}
          </div>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">{post.excerpt}</p>
        </div>
      </section>

      <div className="relative mx-auto max-w-5xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-video w-full overflow-hidden rounded-xl"
        >
          <img
            src={post.image.url}
            alt={post.image.alt}
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 top-0 h-0.75 bg-primary" />
        </motion.div>
      </div>

      <article className="mx-auto max-w-3xl px-5 pb-24 pt-16 md:px-10 md:pb-32 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/*
            Thân bài thật đến từ CMS. Chưa có CMS thì rơi về đoạn mô tả mặc định trong
            `locales/news.ts` — lưu ý đoạn mặc định này DÙNG CHUNG cho mọi bài, nên nội
            dung riêng của từng bài phải do client nhập trong WordPress.
          */}
          {post.body ? (
            <RichText html={post.body} />
          ) : (
            <div className="space-y-6 text-lg leading-relaxed text-foreground/85">
              <p>{t("news.detail.body.p1")}</p>
              <p>{t("news.detail.body.p2")}</p>
              <h2 className="font-display text-3xl font-bold">{t("news.detail.body.h2")}</h2>
              <p>{t("news.detail.body.p3")}</p>
            </div>
          )}
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
              <Link key={r.slug} href={`/tin-tuc/${r.slug}`} className="group block">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                  <img
                    src={r.image.url}
                    alt={r.image.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
                  />
                </div>
                <div className="mono-label mt-4 text-primary">{r.category.name.toUpperCase()}</div>
                <div className="mt-3 font-display text-xl font-bold leading-tight group-hover:text-primary">
                  {r.title}
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
