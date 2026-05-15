"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { trustedLogos } from "@/lib/site-config"

export function TrustedCompanies() {
  const t = useTranslations("trusted")
  const row = [...trustedLogos, ...trustedLogos]

  return (
    <section
      id="trusted"
      className="relative border-y border-white/5 bg-black/20 py-14 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.p
          className="mb-8 text-center text-xs font-medium tracking-[0.25em] text-slate-500 uppercase"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          {t("eyebrow")}
        </motion.p>
        <div className="relative overflow-hidden mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <motion.div
            className="flex w-max gap-16 md:gap-24"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {row.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="font-heading text-xl font-semibold whitespace-nowrap text-slate-600 transition-colors hover:text-slate-300 md:text-2xl"
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
