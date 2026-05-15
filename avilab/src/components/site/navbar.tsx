"use client"

import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { mainNav } from "@/lib/nav-config"
import { cn } from "@/lib/utils"
import { LanguageSwitcher } from "@/components/site/language-switcher"

export function Navbar() {
  const t = useTranslations("nav")
  const tc = useTranslations("common")
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24)
  })

  return (
    <motion.header
      className={cn(
        "fixed top-4 right-4 left-4 z-50 mx-auto max-w-6xl rounded-2xl border px-4 transition-colors md:top-6 md:right-6 md:left-6",
        scrolled
          ? "border-white/12 bg-avilab-surface/75 shadow-[0_8px_40px_-16px_rgb(0_0_0/0.65)] backdrop-blur-2xl"
          : "border-white/8 bg-black/20 backdrop-blur-md"
      )}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex h-14 items-center justify-between gap-2 md:h-16">
        <Link
          href="/"
          className="font-heading text-lg font-semibold tracking-tight text-white"
        >
          {tc("brand")}
          <span className="ml-1 text-avilab-glow">.</span>
        </Link>
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label={t("home")}>
          {mainNav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="group relative rounded-lg px-2.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white xl:px-3"
            >
              <span className="relative z-10">{t(item.key)}</span>
              <span className="absolute inset-x-2 -bottom-px h-px scale-x-0 bg-gradient-to-r from-transparent via-avilab-glow to-transparent opacity-0 transition-all group-hover:scale-x-100 group-hover:opacity-100" />
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <Link
            href="/portfolio"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-10 rounded-xl border-white/15 bg-white/5 px-4 text-white hover:bg-white/10"
            )}
          >
            {tc("ctaExplore")}
          </Link>
          <Link
            href={{ pathname: "/", hash: "apply" }}
            className={cn(
              buttonVariants(),
              "h-10 rounded-xl border-0 bg-gradient-to-r from-avilab-accent to-avilab-glow px-5 text-white shadow-[0_0_24px_rgb(56_189_248/0.35)] hover:opacity-95"
            )}
          >
            {t("startProject")}
          </Link>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label={t("openMenu")}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="border-t border-white/10 lg:hidden"
        >
          <div className="flex flex-col gap-1 py-3">
            {mainNav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href={{ pathname: "/", hash: "apply" }}
              className="mt-2 rounded-xl bg-gradient-to-r from-avilab-accent to-avilab-glow px-3 py-2.5 text-center text-sm font-medium text-white"
              onClick={() => setOpen(false)}
            >
              {t("startProject")}
            </Link>
          </div>
        </motion.div>
      ) : null}
    </motion.header>
  )
}
