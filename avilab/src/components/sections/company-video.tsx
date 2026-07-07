"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { VideoLightbox } from "@/components/effects/video-lightbox"

export function CompanyVideo({ videoUrl }: { videoUrl: string | null }) {
  const t = useTranslations("companyVideo")
  const [open, setOpen] = useState(false)

  if (!videoUrl) return null

  return (
    <section id="company-video" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
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

        <motion.div
          className="group relative mt-14 aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-avilab-surface/40 shadow-[0_0_0_1px_rgb(255_255_255/0.05)_inset,0_24px_80px_-24px_rgb(0_0_0/0.6)]"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <video
            src={videoUrl}
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/60 via-transparent to-transparent" />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t("play")}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="flex size-20 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-transform group-hover:scale-110">
              <Play className="ml-1 size-8 fill-white text-white" aria-hidden />
            </span>
          </button>
        </motion.div>
      </div>

      <VideoLightbox
        videoUrl={open ? videoUrl : null}
        onClose={() => setOpen(false)}
        closeLabel={t("close")}
      />
    </section>
  )
}
