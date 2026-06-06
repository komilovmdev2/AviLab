"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "@/i18n/navigation"
import { mainNav } from "@/lib/nav-config"
import { SiteLogo } from "@/components/site/site-logo"
import { serviceItems } from "@/lib/site-config"

const socialLinks = [
  { key: "twitterLabel" as const, href: "https://twitter.com" },
  { key: "linkedinLabel" as const, href: "https://linkedin.com" },
  { key: "githubLabel" as const, href: "https://github.com" },
  { key: "dribbbleLabel" as const, href: "https://dribbble.com" },
]

export function Footer() {
  const t = useTranslations("footer")
  const tc = useTranslations("common")
  const tn = useTranslations("nav")
  const ts = useTranslations("services.items")
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  function onNewsletter(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSent(true)
    setEmail("")
    window.setTimeout(() => setSent(false), 4000)
  }

  const year = new Date().getFullYear()

  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t border-white/10 pt-20 pb-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_400px_at_20%_0%,rgb(37_99_235/0.2),transparent),radial-gradient(600px_360px_at_90%_20%,rgb(124_58_237/0.18),transparent)]" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <SiteLogo alt={tc("brand")} className="h-12 sm:h-14" />
            </motion.div>
            <p className="mt-4 text-slate-400">{t("tagline")}</p>
            <form onSubmit={onNewsletter} className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("newsletterPlaceholder")}
                className="h-11 rounded-xl border-white/12 bg-black/35 text-white placeholder:text-slate-500"
                aria-label={t("newsletterPlaceholder")}
              />
              <Button
                type="submit"
                className="h-11 rounded-xl bg-gradient-to-r from-avilab-accent to-avilab-glow text-white shadow-[0_0_24px_rgb(56_189_248/0.3)]"
              >
                {tc("subscribe")}
              </Button>
            </form>
            {sent ? (
              <p className="mt-2 text-xs text-emerald-400">{tc("thanksNewsletter")}</p>
            ) : null}
          </div>
          <div className="grid flex-1 grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                {t("navLabel")}
              </p>
              <ul className="mt-4 space-y-2">
                {mainNav.map((l) => (
                  <li key={l.key}>
                    <Link
                      href={l.href}
                      className="text-sm text-slate-300 transition-colors hover:text-white"
                    >
                      {tn(l.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                {t("servicesLabel")}
              </p>
              <ul className="mt-4 space-y-2">
                {serviceItems.slice(0, 6).map((s) => (
                  <li key={s.id}>
                    <Link
                      href="/services"
                      className="text-sm text-slate-300 transition-colors hover:text-white"
                    >
                      {ts(`${s.id}.title`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                {t("socialLabel")}
              </p>
              <ul className="mt-4 space-y-2">
                {socialLinks.map((s) => (
                  <li key={s.key}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-300 transition-colors hover:text-white"
                    >
                      {t(s.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {tc("brand")}. {tc("copyright")}
          </p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-slate-300">
              {tc("privacy")}
            </Link>
            <Link href="/" className="hover:text-slate-300">
              {tc("terms")}
            </Link>
            <Link href={{ pathname: "/", hash: "apply" }} className="hover:text-slate-300">
              {t("startProject")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
