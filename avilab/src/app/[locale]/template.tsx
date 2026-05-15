"use client"

import { motion } from "framer-motion"
import { useLocale } from "next-intl"

export default function LocaleTemplate({ children }: { children: React.ReactNode }) {
  const locale = useLocale()

  return (
    <motion.div
      key={locale}
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
