"use client"

import { AnimatePresence, motion } from "framer-motion"
import { MessageCircle, Send, Sparkles, X } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function AIChatWidget() {
  const locale = useLocale()
  const t = useTranslations("chatbot")
  const replies = useMemo(() => [t("reply1"), t("reply2"), t("reply3")], [t])
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>(
    []
  )
  const [input, setInput] = useState("")

  const welcome = t("welcome")

  function setPanel(next: boolean) {
    if (next) setMessages([{ role: "assistant", text: welcome }])
    setOpen(next)
  }

  // Reset concierge copy when locale changes while the panel stays open.
  useEffect(() => {
    if (!open) return
    const id = window.requestAnimationFrame(() => {
      setMessages([{ role: "assistant", text: welcome }])
    })
    return () => window.cancelAnimationFrame(id)
  }, [locale, open, welcome])

  function send() {
    const trimmed = input.trim()
    if (!trimmed) return
    setMessages((m) => [...m, { role: "user", text: trimmed }])
    setInput("")
    window.setTimeout(() => {
      const next = replies[Math.floor(Math.random() * replies.length)] ?? replies[0]
      setMessages((m) => [...m, { role: "assistant", text: next }])
    }, 600)
  }

  return (
    <div className="fixed right-5 bottom-5 z-[90] md:right-8 md:bottom-8">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 12, scale: 0.96, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 w-[min(100vw-2.5rem,380px)] overflow-hidden rounded-2xl border border-white/10 bg-avilab-surface/85 shadow-[0_0_0_1px_rgb(255_255_255/0.06)_inset,0_24px_80px_-24px_rgb(0_0_0/0.75)] backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-avilab-accent to-avilab-violet shadow-[0_0_24px_rgb(37_99_235/0.45)]">
                  <Sparkles className="size-4 text-white" aria-hidden />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t("title")}</p>
                  <p className="text-[11px] text-muted-foreground">{t("subtitle")}</p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground hover:text-white"
                onClick={() => setPanel(false)}
                aria-label={t("close")}
              >
                <X className="size-4" />
              </Button>
            </div>
            <div className="max-h-72 space-y-3 overflow-y-auto px-4 py-3">
              {messages.map((msg, i) => (
                <div
                  key={`${msg.role}-${i}`}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-avilab-accent text-white"
                        : "glass-panel text-slate-100"
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 border-t border-white/10 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder={t("placeholder")}
                className="focus:glow-border flex-1 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-avilab-glow/40"
                aria-label={t("placeholder")}
              />
              <Button
                type="button"
                size="icon"
                className="shrink-0 rounded-xl bg-gradient-to-r from-avilab-accent to-avilab-glow text-white shadow-[0_0_24px_rgb(56_189_248/0.35)]"
                onClick={send}
                aria-label={t("send")}
              >
                <Send className="size-4" />
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <motion.button
        type="button"
        onClick={() => setPanel(!open)}
        className="relative flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-avilab-accent via-avilab-glow to-avilab-violet text-white shadow-[0_0_0_1px_rgb(255_255_255/0.12)_inset,0_16px_50px_-12px_rgb(37_99_235/0.65)]"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        aria-expanded={open}
        aria-label={t("open")}
      >
        <span className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255/0.35),transparent_55%)]" />
        {open ? <X className="relative size-6" /> : <MessageCircle className="relative size-6" />}
      </motion.button>
    </div>
  )
}
