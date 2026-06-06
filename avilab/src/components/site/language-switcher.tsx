"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"
import { localeLabels, routing, type AppLocale } from "@/i18n/routing"
import { localeFlags } from "@/lib/locale-flags"
import { usePathname, useRouter } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

function LocaleFlag({
  locale,
  className,
}: {
  locale: AppLocale
  className?: string
}) {
  const flag = localeFlags[locale]

  return (
    <Image
      key={locale}
      src={flag}
      alt=""
      width={flag.width}
      height={flag.height}
      unoptimized
      className={cn(
        "size-4 shrink-0 rounded-full object-cover ring-1 ring-white/15",
        className
      )}
      aria-hidden
    />
  )
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("nav")
  const locale = useLocale() as AppLocale
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onDoc)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDoc)
      document.removeEventListener("keydown", onKey)
    }
  }, [])

  function select(next: AppLocale) {
    if (next === locale) {
      setOpen(false)
      return
    }
    router.replace(pathname, { locale: next, scroll: false })
    setOpen(false)
  }

  const current = localeLabels[locale]

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("language")}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-9 items-center gap-2 rounded-xl border border-white/12 bg-white/[0.06] px-3 text-xs font-medium text-white shadow-[0_0_0_1px_rgb(255_255_255/0.04)_inset] backdrop-blur-xl transition-all",
          "hover:border-avilab-glow/35 hover:bg-white/[0.09] focus-visible:ring-2 focus-visible:ring-avilab-glow/40 focus-visible:outline-none",
          open && "border-avilab-glow/40 bg-white/[0.09]"
        )}
      >
        <LocaleFlag locale={locale} />
        <span>{current.short}</span>
        <ChevronDown
          className={cn("size-3.5 text-slate-400 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 4, scale: 0.98, filter: "blur(4px)" }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 z-[80] mt-2 min-w-[200px] overflow-hidden rounded-2xl border border-white/12 bg-avilab-surface/85 py-1 shadow-[0_0_0_1px_rgb(255_255_255/0.06)_inset,0_24px_80px_-24px_rgb(0_0_0/0.75)] backdrop-blur-2xl"
            role="listbox"
            aria-label={t("language")}
          >
            {routing.locales.map((code) => {
              const L = localeLabels[code as AppLocale]
              const active = code === locale
              return (
                <button
                  key={code}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => select(code as AppLocale)}
                  className={cn(
                    "flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors",
                    active
                      ? "bg-avilab-glow/10 text-white"
                      : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
                  )}
                >
                  <LocaleFlag locale={code as AppLocale} className="size-5" />
                  <span className="flex flex-1 flex-col gap-0.5">
                    <span className="font-medium">{L.native}</span>
                    <span className="text-[10px] tracking-wider text-slate-500 uppercase">
                      {L.short}
                    </span>
                  </span>
                  {active ? (
                    <span className="size-1.5 rounded-full bg-avilab-glow shadow-[0_0_10px_#38bdf8]" />
                  ) : (
                    <span className="size-1.5 rounded-full bg-transparent" />
                  )}
                </button>
              )
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
