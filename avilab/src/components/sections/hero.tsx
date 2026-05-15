"use client"

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect } from "react"
import { buttonVariants } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

const particles = Array.from({ length: 42 }, (_, i) => ({
  id: i,
  x: `${(i * 17) % 100}%`,
  y: `${(i * 23) % 100}%`,
  delay: (i % 8) * 0.08,
  size: 2 + (i % 4),
}))

const mockRowKeys = ["mockInference", "mockVector", "mockEdge"] as const

export function Hero() {
  const t = useTranslations("hero")
  const tc = useTranslations("common")
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 40, damping: 20 })
  const smy = useSpring(my, { stiffness: 40, damping: 20 })
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${smx}px ${smy}px, rgb(56 189 248 / 0.22), transparent 55%)`

  useEffect(() => {
    const el = document.getElementById("hero")
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      mx.set(e.clientX - r.left)
      my.set(e.clientY - r.top)
    }
    el.addEventListener("mousemove", onMove)
    return () => el.removeEventListener("mousemove", onMove)
  }, [mx, my])

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-20 md:pt-32"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{ backgroundImage: spotlight }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(148_163_184/0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_163_184/0.08)_1px,transparent_1px)] bg-[length:64px_64px] mask-[radial-gradient(ellipse_at_center,black,transparent_72%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[min(90vw,880px)] -translate-x-1/2 rounded-full bg-gradient-to-r from-avilab-accent/25 via-avilab-violet/20 to-avilab-glow/25 blur-3xl" />
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="pointer-events-none absolute rounded-full bg-avilab-glow/50 shadow-[0_0_12px_rgb(56_189_248/0.6)]"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
          }}
          animate={{ y: [0, -14, 0], opacity: [0.25, 0.85, 0.25] }}
          transition={{
            duration: 5 + (p.id % 5),
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-4 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-16 md:px-6">
        <div>
          <motion.p
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium tracking-wide text-avilab-glow uppercase backdrop-blur-md"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="size-1.5 rounded-full bg-avilab-glow shadow-[0_0_12px_#38bdf8]" />
            {t("badge")}
          </motion.p>
          <motion.h1
            className="font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4rem]"
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {t("headlineBefore")}{" "}
            <span className="bg-gradient-to-r from-white via-avilab-glow to-avilab-accent bg-clip-text text-transparent text-glow">
              {t("headlineHighlight")}
            </span>{" "}
            {t("headlineAfter")}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            {t("subtitle")}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            <Link
              href={{ pathname: "/", hash: "apply" }}
              className={cn(
                buttonVariants(),
                "group h-12 justify-center rounded-2xl border-0 bg-gradient-to-r from-avilab-accent to-avilab-glow px-8 text-base text-white shadow-[0_0_32px_rgb(56_189_248/0.4)]"
              )}
            >
              {t("ctaPrimary")}
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/portfolio"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 justify-center rounded-2xl border-white/15 bg-white/[0.04] px-8 text-base text-white backdrop-blur-md hover:bg-white/10"
              )}
            >
              <Play className="mr-2 size-4 opacity-80" />
              {t("ctaSecondary")}
            </Link>
          </motion.div>
          <motion.div
            className="mt-10 flex flex-wrap gap-6 text-sm text-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <div>
              <p className="font-heading text-2xl font-semibold text-white">{t("statProjects")}</p>
              <p>{t("statProjectsLabel")}</p>
            </div>
            <div className="hidden h-10 w-px bg-white/10 sm:block" />
            <div>
              <p className="font-heading text-2xl font-semibold text-white">{t("statClients")}</p>
              <p>{t("statClientsLabel")}</p>
            </div>
            <div className="hidden h-10 w-px bg-white/10 sm:block" />
            <div>
              <p className="font-heading text-2xl font-semibold text-white">{t("statYears")}</p>
              <p>{t("statYearsLabel")}</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-md md:mx-0 md:max-w-none"
          initial={{ opacity: 0, scale: 0.94, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="relative aspect-[4/5] w-full md:aspect-square"
            style={{ perspective: 1400 }}
          >
            <motion.div
              className="absolute inset-[8%] rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent shadow-[0_0_0_1px_rgb(255_255_255/0.06)_inset,0_40px_120px_-40px_rgb(37_99_235/0.45)] backdrop-blur-2xl"
              style={{ rotateX: 8, rotateY: -10, transformStyle: "preserve-3d" }}
              whileHover={{ rotateX: 4, rotateY: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            >
              <div className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium tracking-wider text-slate-400 uppercase">
                    {t("mockLiveStack")}
                  </span>
                  <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                    {tc("healthy")}
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  {mockRowKeys.map((key, i) => (
                    <div
                      key={key}
                      className="flex items-center justify-between rounded-xl border border-white/5 bg-black/30 px-3 py-2.5"
                    >
                      <span className="text-sm text-slate-200">{t(key)}</span>
                      <span className="text-xs text-avilab-glow tabular-nums">
                        {98 - i * 4}ms
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto rounded-2xl border border-avilab-glow/25 bg-gradient-to-br from-avilab-accent/20 via-transparent to-avilab-violet/15 p-4">
                  <p className="text-xs font-medium text-avilab-glow">{t("mockNeuralTitle")}</p>
                  <p className="mt-1 font-heading text-lg text-white">{t("mockNeuralSubtitle")}</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-avilab-accent to-avilab-glow"
                      initial={{ width: "32%" }}
                      animate={{ width: ["32%", "88%", "54%", "76%"] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="absolute -right-4 top-10 w-[52%] rounded-2xl border border-white/10 bg-avilab-surface/80 p-4 shadow-[0_24px_80px_-24px_rgb(0_0_0/0.8)] backdrop-blur-xl md:-right-8"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-[10px] font-medium tracking-wider text-slate-500 uppercase">
                {t("holoTitle")}
              </p>
              <p className="mt-1 font-medium text-white">{t("holoSubtitle")}</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[40, 72, 58].map((v, i) => (
                  <div key={i} className="rounded-lg bg-white/5 p-2 text-center">
                    <p className="text-lg font-semibold text-avilab-glow">{v}%</p>
                    <p className="text-[9px] text-slate-500">{t("holoSignal")}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="absolute -left-2 bottom-16 w-[46%] rounded-2xl border border-white/10 bg-black/50 p-3 backdrop-blur-xl md:-left-6"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-gradient-to-br from-avilab-accent to-avilab-violet shadow-[0_0_20px_rgb(37_99_235/0.5)]" />
                <div>
                  <p className="text-xs font-medium text-white">{t("orbitalTitle")}</p>
                  <p className="text-[10px] text-slate-500">{t("orbitalSubtitle")}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
