"use client"

import { motion } from "framer-motion"
import {
  Brain,
  Building2,
  Cloud,
  Globe,
  Layers,
  Palette,
  Send,
  Shield,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { serviceItems } from "@/lib/site-config"
import { cn } from "@/lib/utils"

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Globe,
  Smartphone,
  Palette,
  Building2,
  Send,
  Layers,
  Cloud,
  Sparkles,
  Shield,
}

export function Services({ compact }: { compact?: boolean }) {
  const t = useTranslations("services")

  return (
    <section id="services" className={cn("relative", compact ? "pb-24 md:pb-32" : "py-24 md:py-32")}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {!compact ? (
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
              className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              {t("title")}
            </motion.h2>
            <motion.p
              className="mt-4 text-slate-400"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t("subtitle")}
            </motion.p>
          </div>
        ) : null}
        <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", !compact && "mt-14")}>
          {serviceItems.map((s, i) => {
            const Icon = iconMap[s.icon] ?? Sparkles
            return (
              <motion.article
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4 }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgb(255_255_255/0.04)_inset] transition-shadow",
                  "hover:border-avilab-glow/35 hover:shadow-[0_0_40px_-12px_rgb(56_189_248/0.35)]"
                )}
              >
                <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-gradient-to-br from-avilab-accent/25 to-transparent opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
                <div className="relative flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-avilab-accent/30 to-avilab-violet/20 text-avilab-glow shadow-[0_0_24px_rgb(37_99_235/0.25)]">
                  <Icon className="size-5" />
                </div>
                <h3 className="relative mt-4 font-heading text-lg font-semibold text-white">
                  {t(`items.${s.id}.title`)}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-slate-400">
                  {t(`items.${s.id}.description`)}
                </p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
