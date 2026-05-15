"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { technologies } from "@/lib/site-config"

export function Technologies() {
  const t = useTranslations("technologies")
  const doubled = [...technologies, ...technologies]

  return (
    <section id="technologies" className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-avilab-accent/[0.06] to-transparent" />
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
      </div>
      <div className="mt-12 space-y-5">
        <div className="relative mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex w-max gap-4 pr-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
          >
            {doubled.map((name, i) => (
              <span
                key={`${name}-a-${i}`}
                className="shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-200 shadow-[0_0_0_1px_rgb(255_255_255/0.04)_inset] backdrop-blur-md transition-all hover:border-avilab-glow/40 hover:text-white hover:shadow-[0_0_28px_-8px_rgb(56_189_248/0.45)]"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </div>
        <div className="relative mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex w-max gap-4 pr-4"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
          >
            {[...doubled].reverse().map((name, i) => (
              <span
                key={`${name}-b-${i}`}
                className="shrink-0 rounded-2xl border border-white/10 bg-avilab-surface/50 px-5 py-3 text-sm font-medium text-slate-200 backdrop-blur-md transition-all hover:border-avilab-violet/40 hover:text-white hover:shadow-[0_0_28px_-8px_rgb(124_58_237/0.45)]"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
