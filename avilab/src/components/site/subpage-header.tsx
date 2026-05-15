"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Namespace = "services" | "portfolio" | "contact"

export function SubpageHeader({ namespace }: { namespace: Namespace }) {
  const t = useTranslations(namespace)
  const tSub = useTranslations("subnav")

  return (
    <header className="mx-auto max-w-6xl px-4 pt-28 pb-10 md:px-6 md:pt-32">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "mb-6 h-8 px-0 text-xs text-avilab-glow hover:bg-transparent hover:text-avilab-glow/80 hover:underline"
          )}
        >
          ← {tSub("backHome")}
        </Link>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          {t("pageTitle")}
        </h1>
        <p className="mt-4 max-w-2xl text-slate-400">{t("pageLead")}</p>
      </motion.div>
    </header>
  )
}
