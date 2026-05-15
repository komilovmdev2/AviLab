"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

const socialKeys = [
  { key: "socialTwitter" as const, href: "https://twitter.com" },
  { key: "socialLinkedin" as const, href: "https://linkedin.com" },
  { key: "socialGithub" as const, href: "https://github.com" },
]

export function Contact({ compact }: { compact?: boolean }) {
  const t = useTranslations("contact")

  return (
    <section id="contact" className={cn("relative", compact ? "pb-24 md:pb-32" : "py-24 md:py-32")}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            {!compact ? (
              <>
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
                <motion.p
                  className="mt-4 text-slate-400"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  {t("lead")}
                </motion.p>
              </>
            ) : null}
            <div className={cn("space-y-4", !compact ? "mt-8" : "mt-0")}>
              <motion.a
                href="https://maps.google.com/?q=1+Infinite+Loop+Cupertino"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel flex gap-4 rounded-2xl p-4 transition-all hover:border-avilab-glow/30 hover:shadow-[0_0_32px_-12px_rgb(56_189_248/0.35)]"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <MapPin className="mt-0.5 size-5 shrink-0 text-avilab-glow" aria-hidden />
                <div>
                  <p className="text-sm font-medium text-white">{t("hqTitle")}</p>
                  <p className="text-sm text-slate-400">{t("hqLine")}</p>
                </div>
              </motion.a>
              <motion.div
                className="glass-panel flex gap-4 rounded-2xl p-4"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
              >
                <Send className="mt-0.5 size-5 shrink-0 text-avilab-glow" aria-hidden />
                <div>
                  <p className="text-sm font-medium text-white">{t("telegramTitle")}</p>
                  <a
                    href="https://t.me/avilab"
                    className="text-sm text-avilab-glow hover:underline"
                  >
                    t.me/avilab
                  </a>
                </div>
              </motion.div>
              <motion.div
                className="glass-panel flex gap-4 rounded-2xl p-4"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Mail className="mt-0.5 size-5 shrink-0 text-avilab-glow" aria-hidden />
                <div>
                  <p className="text-sm font-medium text-white">{t("emailTitle")}</p>
                  <a href="mailto:hello@avilab.io" className="text-sm text-avilab-glow hover:underline">
                    hello@avilab.io
                  </a>
                </div>
              </motion.div>
              <motion.div
                className="glass-panel flex gap-4 rounded-2xl p-4"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
              >
                <Phone className="mt-0.5 size-5 shrink-0 text-avilab-glow" aria-hidden />
                <div>
                  <p className="text-sm font-medium text-white">{t("phoneTitle")}</p>
                  <a href="tel:+14085550199" className="text-sm text-avilab-glow hover:underline">
                    +1 (408) 555-0199
                  </a>
                </div>
              </motion.div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {socialKeys.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-avilab-glow/40 hover:text-white"
                >
                  {t(s.key)}
                </a>
              ))}
            </div>
          </div>
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-avilab-surface/50 shadow-[0_0_0_1px_rgb(255_255_255/0.05)_inset] backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="aspect-[4/3] w-full md:aspect-auto md:h-full md:min-h-[420px]">
              <iframe
                title={t("mapTitle")}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.456!2d-122.0322!3d37.3318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5b7c0b0b0b0%3A0x0!2sApple%20Park!5e0!3m2!1sen!2sus!4v1"
                className="h-full min-h-[320px] w-full border-0 grayscale contrast-125 filter md:min-h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
