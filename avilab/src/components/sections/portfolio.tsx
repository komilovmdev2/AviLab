"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ExternalLink, Play } from "lucide-react"
import { useTranslations } from "next-intl"
import { useMemo, useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import { VideoLightbox } from "@/components/effects/video-lightbox"
import type { PortfolioCategoryId, PortfolioItem } from "@/backend/types"
import { cn } from "@/lib/utils"

const categoryOrder: PortfolioCategoryId[] = [
  "ai",
  "web",
  "mobile",
  "design",
  "enterprise",
]

type Filter = "all" | PortfolioCategoryId

export function Portfolio({ items, compact }: { items: PortfolioItem[]; compact?: boolean }) {
  const t = useTranslations("portfolio")
  const tc = useTranslations("common")
  const [filter, setFilter] = useState<Filter>("all")
  const [activeVideo, setActiveVideo] = useState<PortfolioItem | null>(null)

  const filtered = useMemo(() => {
    if (filter === "all") return items
    return items.filter((p) => p.category === filter)
  }, [filter, items])

  return (
    <section id="portfolio" className={cn("relative", compact ? "pb-24 md:pb-32" : "py-24 md:py-32")}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {!compact ? (
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
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
                className="mt-3 max-w-xl font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {t("title")}
              </motion.h2>
            </div>
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-medium transition-all",
                  filter === "all"
                    ? "border-avilab-glow/50 bg-avilab-glow/15 text-white shadow-[0_0_24px_-8px_rgb(56_189_248/0.5)]"
                    : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-white"
                )}
              >
                {t("filterAll")}
              </button>
              {categoryOrder.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-xs font-medium transition-all",
                    filter === c
                      ? "border-avilab-glow/50 bg-avilab-glow/15 text-white shadow-[0_0_24px_-8px_rgb(56_189_248/0.5)]"
                      : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-white"
                  )}
                >
                  {t(`categories.${c}`)}
                </button>
              ))}
            </motion.div>
          </div>
        ) : (
          <motion.div
            className="flex flex-wrap gap-2 pb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-medium transition-all",
                filter === "all"
                  ? "border-avilab-glow/50 bg-avilab-glow/15 text-white shadow-[0_0_24px_-8px_rgb(56_189_248/0.5)]"
                  : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-white"
              )}
            >
              {t("filterAll")}
            </button>
            {categoryOrder.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-medium transition-all",
                  filter === c
                    ? "border-avilab-glow/50 bg-avilab-glow/15 text-white shadow-[0_0_24px_-8px_rgb(56_189_248/0.5)]"
                    : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-white"
                )}
              >
                {t(`categories.${c}`)}
              </button>
            ))}
          </motion.div>
        )}

        {filtered.length === 0 ? (
          <p className={cn("text-center text-sm text-slate-500", !compact && "mt-14")}>
            {t("empty")}
          </p>
        ) : (
          <motion.div layout className={cn("columns-1 gap-4 sm:columns-2 lg:columns-3", !compact && "mt-14")}>
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.article
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group mb-4 break-inside-avoid"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-avilab-surface/40 shadow-[0_0_0_1px_rgb(255_255_255/0.04)_inset]">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {project.thumbnailUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={project.thumbnailUrl}
                          alt={project.title}
                          className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : project.videoUrl ? (
                        <video
                          src={project.videoUrl}
                          muted
                          loop
                          playsInline
                          autoPlay
                          className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-avilab-accent/20 to-avilab-violet/20" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />
                      <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="absolute inset-0 bg-gradient-to-tr from-avilab-accent/25 via-transparent to-avilab-violet/20" />
                      </div>
                      {project.videoUrl ? (
                        <button
                          type="button"
                          onClick={() => setActiveVideo(project)}
                          aria-label={project.title}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <span className="flex size-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-transform group-hover:scale-110">
                            <Play className="ml-0.5 size-6 fill-white text-white" aria-hidden />
                          </span>
                        </button>
                      ) : null}
                      <div className="absolute right-4 bottom-4 left-4 flex flex-col gap-3">
                        <span className="w-fit rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium tracking-wider text-avilab-glow uppercase backdrop-blur-md">
                          {t(`categories.${project.category}`)}
                        </span>
                        <h3 className="font-heading text-xl font-semibold text-white">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {project.stack.map((stack) => (
                            <span
                              key={stack}
                              className="rounded-md border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] text-slate-300"
                            >
                              {stack}
                            </span>
                          ))}
                        </div>
                        {project.projectUrl ? (
                          <div className="flex flex-wrap gap-2 pt-1">
                            <a
                              href={project.projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(
                                buttonVariants(),
                                "h-9 rounded-xl border-0 bg-white text-black hover:bg-white/90"
                              )}
                            >
                              <ExternalLink className="mr-1.5 size-3.5" />
                              {tc("livePreview")}
                            </a>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <VideoLightbox
        videoUrl={activeVideo?.videoUrl ?? null}
        onClose={() => setActiveVideo(null)}
        closeLabel={tc("close")}
      />
    </section>
  )
}
