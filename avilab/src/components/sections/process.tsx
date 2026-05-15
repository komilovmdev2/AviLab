"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { processStepIds } from "@/lib/site-config"

export function Process() {
  const t = useTranslations("process")

  return (
    <section id="process" className="relative py-24 md:py-32">
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
        <div className="relative mt-16 md:mt-20">
          <div className="absolute top-0 bottom-4 left-[15px] w-px bg-gradient-to-b from-avilab-glow via-avilab-accent to-avilab-violet md:left-1/2 md:-translate-x-1/2" />
          <div className="space-y-10 md:space-y-14">
            {processStepIds.map((stepId, i) => (
              <motion.div
                key={stepId}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.05 }}
                className={`relative grid gap-6 md:grid-cols-2 md:gap-12 ${
                  i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="relative flex gap-4 md:justify-end md:text-right">
                  <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-avilab-glow/50 bg-[#050816] shadow-[0_0_24px_rgb(56_189_248/0.45)] md:absolute md:left-1/2 md:-translate-x-1/2">
                    <span className="text-xs font-semibold text-avilab-glow">{i + 1}</span>
                  </div>
                  <div className="md:max-w-sm md:pr-10">
                    <h3 className="font-heading text-xl font-semibold text-white">
                      {t(`steps.${stepId}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {t(`steps.${stepId}.detail`)}
                    </p>
                  </div>
                </div>
                <div className="hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
