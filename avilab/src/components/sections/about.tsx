"use client"

import { motion, useInView } from "framer-motion"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"

const statKeys = ["projects", "clients", "years", "countries"] as const
const statValues = [120, 50, 5, 18]
const statSuffix = ["+", "+", "+", "+"] as const

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const duration = 1600
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - t) ** 3
      setDisplay(Math.round(value * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export function About() {
  const t = useTranslations("about")

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 md:grid-cols-2 md:items-start md:gap-20 md:px-6">
        <div>
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
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t("title")}
          </motion.h2>
          <motion.div
            className="mt-6 space-y-4 text-slate-400"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p>
              <strong className="text-white">{t("missionLabel")}</strong> {t("mission")}
            </p>
            <p>
              <strong className="text-white">{t("visionLabel")}</strong> {t("vision")}
            </p>
          </motion.div>
          <motion.ul
            className="mt-8 grid gap-3 sm:grid-cols-2"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {(["v1", "v2", "v3"] as const).map((k) => (
              <li
                key={k}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-200"
              >
                <span className="size-1.5 rounded-full bg-avilab-glow shadow-[0_0_10px_#38bdf8]" />
                {t(`values.${k}`)}
              </li>
            ))}
          </motion.ul>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-avilab-accent/15 via-transparent to-avilab-violet/15 blur-2xl" />
          <div className="relative grid gap-4 sm:grid-cols-2">
            {statKeys.map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-white/10 bg-avilab-surface/60 p-6 shadow-[0_0_0_1px_rgb(255_255_255/0.04)_inset] backdrop-blur-xl"
              >
                <p className="font-heading text-4xl font-semibold text-white tabular-nums">
                  <Counter value={statValues[i] ?? 0} suffix={statSuffix[i] ?? ""} />
                </p>
                <p className="mt-2 text-sm text-slate-400">{t(`stats.${key}`)}</p>
              </motion.div>
            ))}
          </div>
          <motion.p
            className="mt-6 text-center text-sm text-slate-500 md:text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t("footnote")}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
