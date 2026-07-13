import { motion } from "motion/react";
import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, subtitle, index }: { eyebrow: string; title: ReactNode; subtitle?: string; index?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="absolute inset-0 blueprint-grid opacity-60" />
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-primary" />
          <span className="mono-label text-primary">{eyebrow}</span>
          {index && <span className="mono-label ml-auto text-muted-foreground">{index}</span>}
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
