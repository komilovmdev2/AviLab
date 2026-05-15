"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqIds } from "@/lib/site-config"

export function FAQ() {
  const t = useTranslations("faq")

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="text-center">
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
          className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-2 shadow-[0_0_0_1px_rgb(255_255_255/0.04)_inset] backdrop-blur-xl md:p-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion defaultValue={[]} multiple={false} className="w-full">
            {faqIds.map((id, i) => (
              <AccordionItem
                key={id}
                value={`item-${i}`}
                className="border-white/10 px-3 data-open:bg-white/[0.02]"
              >
                <AccordionTrigger className="py-4 text-left text-base text-white hover:no-underline">
                  {t(`items.${id}.q`)}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-slate-400">
                  {t(`items.${id}.a`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
