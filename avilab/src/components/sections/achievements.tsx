"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { achievementItems } from "@/lib/site-config"

export function Achievements() {
  const t = useTranslations("achievements")

  return (
    <section id="achievements" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            className="text-xs font-medium tracking-[0.25em] text-avilab-glow uppercase"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t("eyebrow")}
          </motion.span>
          <motion.h2
            className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t("title")}
          </motion.h2>
        </div>
        <div className="relative mt-16">
          <div className="absolute top-2 bottom-2 left-3 w-px bg-gradient-to-b from-avilab-glow via-avilab-accent to-avilab-violet md:left-4" />
          <ul className="space-y-10">
            {achievementItems.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05 }}
                className="relative flex gap-6 md:gap-10"
              >
                <div className="relative z-10 mt-1.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-avilab-glow/50 bg-[#050816] shadow-[0_0_20px_rgb(56_189_248/0.4)]">
                  <span className="text-[10px] font-bold text-avilab-glow">
                    {item.year.slice(2)}
                  </span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-avilab-surface/50 p-5 shadow-[0_0_0_1px_rgb(255_255_255/0.04)_inset] backdrop-blur-xl md:p-6">
                  <p className="text-xs font-medium tracking-wider text-avilab-glow uppercase">
                    {item.year}
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-semibold text-white md:text-xl">
                    {t(`items.${item.id}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {t(`items.${item.id}.detail`)}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
