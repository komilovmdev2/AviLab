"use client"

import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { Star } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { testimonialItems } from "@/lib/site-config"
import { cn } from "@/lib/utils"

export function Testimonials() {
  const t = useTranslations("testimonials")
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonialItems.length)
    }, 6500)
    return () => window.clearInterval(id)
  }, [])

  const item = testimonialItems[index]

  return (
    <section id="testimonials" className="relative py-24 md:py-32">
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
        <div className="relative mx-auto mt-14 max-w-3xl">
          <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-avilab-accent/20 via-transparent to-avilab-violet/15 blur-2xl" />
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_0_0_1px_rgb(255_255_255/0.05)_inset,0_32px_80px_-32px_rgb(0_0_0/0.65)] backdrop-blur-2xl md:p-10"
            >
              <div className="flex flex-wrap items-center gap-4">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={56}
                  height={56}
                  className="size-14 rounded-2xl object-cover ring-2 ring-avilab-glow/30"
                />
                <div>
                  <p className="font-heading text-lg font-semibold text-white">{item.name}</p>
                  <p className="text-sm text-slate-400">
                    {t(`items.${item.id}.role`)} · {item.company}
                  </p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-avilab-glow text-avilab-glow drop-shadow-[0_0_8px_rgb(56_189_248/0.5)]"
                    />
                  ))}
                </div>
              </div>
              <p className="mt-6 text-lg leading-relaxed text-slate-200 md:text-xl">
                &ldquo;{t(`items.${item.id}.quote`)}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex justify-center gap-2">
            {testimonialItems.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={t("goToSlide", { n: i + 1 })}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === index
                    ? "w-8 bg-avilab-glow shadow-[0_0_12px_#38bdf8]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
