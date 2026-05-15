"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { useTranslations } from "next-intl"
import { buttonVariants } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { pricingPlanIds } from "@/lib/site-config"
import { cn } from "@/lib/utils"

export function Pricing() {
  const t = useTranslations("pricing")

  return (
    <section id="pricing" className="relative py-24 md:py-32">
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
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {pricingPlanIds.map((planId, i) => {
            const popular = planId === "business"
            const features = t.raw(`plans.${planId}.features`) as string[]
            return (
              <motion.div
                key={planId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className={cn(
                  "relative overflow-hidden rounded-2xl border p-6 md:p-8",
                  popular
                    ? "border-avilab-glow/45 bg-gradient-to-b from-avilab-accent/15 via-avilab-surface/80 to-avilab-surface/40 shadow-[0_0_0_1px_rgb(56_189_248/0.25)_inset,0_0_48px_-12px_rgb(56_189_248/0.35)]"
                    : "border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgb(255_255_255/0.04)_inset]"
                )}
              >
                {popular ? (
                  <span className="absolute top-4 right-4 rounded-full bg-avilab-glow/20 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-avilab-glow uppercase">
                    {t("popular")}
                  </span>
                ) : null}
                <h3 className="font-heading text-xl font-semibold text-white">
                  {t(`plans.${planId}.name`)}
                </h3>
                <p className="mt-2 text-2xl font-semibold text-white">{t(`plans.${planId}.price`)}</p>
                <p className="mt-3 text-sm text-slate-400">{t(`plans.${planId}.blurb`)}</p>
                <ul className="mt-6 space-y-3">
                  {features.map((line) => (
                    <li key={line} className="flex gap-2 text-sm text-slate-200">
                      <Check className="mt-0.5 size-4 shrink-0 text-avilab-glow" />
                      {line}
                    </li>
                  ))}
                </ul>
                <Link
                  href={{ pathname: "/", hash: "apply" }}
                  className={cn(
                    buttonVariants(),
                    "mt-8 w-full rounded-xl",
                    popular
                      ? "border-0 bg-gradient-to-r from-avilab-accent to-avilab-glow text-white shadow-[0_0_24px_rgb(56_189_248/0.35)]"
                      : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                  )}
                >
                  {t(`plans.${planId}.cta`)}
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
