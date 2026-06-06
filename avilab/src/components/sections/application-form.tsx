"use client"

import { motion } from "framer-motion"
import { Loader2, Upload } from "lucide-react"
import { useTranslations } from "next-intl"
import { useMemo, useState } from "react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { applicationBudgets, serviceItems } from "@/lib/site-config"
import { cn } from "@/lib/utils"

export function ApplicationForm() {
  const t = useTranslations("forms.application")
  const tv = useTranslations("forms.validation")
  const tp = useTranslations("forms.placeholders")
  const tb = useTranslations("forms.budgetLabels")
  const ts = useTranslations("services.items")
  const tc = useTranslations("common")

  const schema = useMemo(
    () =>
      z.object({
        fullName: z.string().min(2, tv("fullName")),
        companyName: z.string().min(1, tv("companyName")),
        telegramUsername: z.string().min(1, tv("telegramUsername")),
        email: z.string().email(tv("email")),
        serviceType: z.string().min(1, tv("serviceType")),
        budget: z.string().min(1, tv("budget")),
        deadline: z.string().min(1, tv("deadline")),
        projectDescription: z.string().min(10, tv("projectDescription")),
      }),
    [tv]
  )

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFieldErrors({})
    const form = e.currentTarget
    const fd = new FormData(form)
    const raw = {
      fullName: String(fd.get("fullName") ?? ""),
      companyName: String(fd.get("companyName") ?? ""),
      telegramUsername: String(fd.get("telegramUsername") ?? ""),
      email: String(fd.get("email") ?? ""),
      serviceType: String(fd.get("serviceType") ?? ""),
      budget: String(fd.get("budget") ?? ""),
      deadline: String(fd.get("deadline") ?? ""),
      projectDescription: String(fd.get("projectDescription") ?? ""),
    }
    const parsed = schema.safeParse(raw)
    if (!parsed.success) {
      const err: Record<string, string> = {}
      for (const issue of parsed.error.issues) {
        const k = String(issue.path[0] ?? "")
        if (k && !err[k]) err[k] = issue.message
      }
      setFieldErrors(err)
      return
    }

    setStatus("loading")
    setMessage("")
    try {
      const res = await fetch("/api/applications", { method: "POST", body: fd })
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(data.error ?? "err")
      setStatus("success")
      setMessage(t("success"))
      form.reset()
    } catch {
      setStatus("error")
      setMessage(t("errorGeneric"))
    }
  }

  const inputClass =
    "rounded-xl border-white/12 bg-black/35 text-white placeholder:text-slate-500 focus-visible:border-avilab-glow/50 focus-visible:ring-avilab-glow/25"

  return (
    <section id="apply" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
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
          <motion.p
            className="mt-4 text-slate-400"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t("lead")}
          </motion.p>
        </div>
        <motion.form
          onSubmit={onSubmit}
          className="relative mt-12 space-y-5 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 shadow-[0_0_0_1px_rgb(255_255_255/0.05)_inset,0_40px_100px_-48px_rgb(37_99_235/0.35)] backdrop-blur-2xl md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-slate-300">
                {t("fullName")}
              </Label>
              <Input
                id="fullName"
                name="fullName"
                className={cn(inputClass, "h-11")}
                placeholder={tp("fullName")}
                aria-invalid={!!fieldErrors.fullName}
              />
              {fieldErrors.fullName ? (
                <p className="text-xs text-red-400">{fieldErrors.fullName}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-slate-300">
                {t("companyName")}
              </Label>
              <Input
                id="companyName"
                name="companyName"
                className={cn(inputClass, "h-11")}
                placeholder={tp("company")}
                aria-invalid={!!fieldErrors.companyName}
              />
              {fieldErrors.companyName ? (
                <p className="text-xs text-red-400">{fieldErrors.companyName}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="telegramUsername" className="text-slate-300">
                {t("telegram")}
              </Label>
              <Input
                id="telegramUsername"
                name="telegramUsername"
                className={cn(inputClass, "h-11")}
                placeholder={tp("telegram")}
                aria-invalid={!!fieldErrors.telegramUsername}
              />
              {fieldErrors.telegramUsername ? (
                <p className="text-xs text-red-400">{fieldErrors.telegramUsername}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                {t("email")}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                className={cn(inputClass, "h-11")}
                placeholder={tp("email")}
                aria-invalid={!!fieldErrors.email}
              />
              {fieldErrors.email ? (
                <p className="text-xs text-red-400">{fieldErrors.email}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceType" className="text-slate-300">
                {t("serviceType")}
              </Label>
              <select
                id="serviceType"
                name="serviceType"
                className={cn(
                  inputClass,
                  "h-11 w-full px-3 outline-none focus-visible:ring-2"
                )}
                defaultValue=""
                aria-invalid={!!fieldErrors.serviceType}
              >
                <option value="" disabled className="bg-avilab-surface text-slate-800">
                  {t("selectService")}
                </option>
                {serviceItems.map((s) => (
                  <option key={s.id} value={ts(`${s.id}.title`)} className="bg-avilab-surface">
                    {ts(`${s.id}.title`)}
                  </option>
                ))}
              </select>
              {fieldErrors.serviceType ? (
                <p className="text-xs text-red-400">{fieldErrors.serviceType}</p>
              ) : null}
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="budget" className="text-slate-300">
                {t("budget")}
              </Label>
              <select
                id="budget"
                name="budget"
                className={cn(
                  inputClass,
                  "h-11 w-full px-3 outline-none focus-visible:ring-2"
                )}
                defaultValue=""
                aria-invalid={!!fieldErrors.budget}
              >
                <option value="" disabled className="bg-avilab-surface">
                  {t("selectBudget")}
                </option>
                {applicationBudgets.map((key) => (
                  <option key={key} value={tb(key)} className="bg-avilab-surface">
                    {tb(key)}
                  </option>
                ))}
              </select>
              {fieldErrors.budget ? (
                <p className="text-xs text-red-400">{fieldErrors.budget}</p>
              ) : null}
            </div> */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="deadline" className="text-slate-300">
              {t("deadline")}
            </Label>
            <Input
              id="deadline"
              name="deadline"
              type="date"
              className={cn(inputClass, "h-11")}
              aria-invalid={!!fieldErrors.deadline}
            />
            {fieldErrors.deadline ? (
              <p className="text-xs text-red-400">{fieldErrors.deadline}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="projectDescription" className="text-slate-300">
              {t("description")}
            </Label>
            <Textarea
              id="projectDescription"
              name="projectDescription"
              rows={5}
              className={cn(inputClass, "min-h-[140px] resize-y")}
              placeholder={tp("description")}
              aria-invalid={!!fieldErrors.projectDescription}
            />
            {fieldErrors.projectDescription ? (
              <p className="text-xs text-red-400">{fieldErrors.projectDescription}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="file" className="text-slate-300">
              {t("attachment")}
            </Label>
            <label
              htmlFor="file"
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-black/25 px-4 py-8 transition-colors hover:border-avilab-glow/40 hover:bg-black/35"
            >
              <Upload className="mb-2 size-6 text-avilab-glow" aria-hidden />
              <span className="text-sm text-slate-300">{t("dropzone")}</span>
              <span className="mt-1 text-xs text-slate-500">{t("dropzoneHint")}</span>
              <input id="file" name="file" type="file" className="sr-only" />
            </label>
          </div>
          {message ? (
            <p
              className={cn(
                "text-sm",
                status === "success" ? "text-emerald-400" : "text-red-400"
              )}
            >
              {message}
            </p>
          ) : null}
          <Button
            type="submit"
            disabled={status === "loading"}
            className="h-12 w-full rounded-2xl bg-gradient-to-r from-avilab-accent to-avilab-glow text-base text-white shadow-[0_0_32px_rgb(56_189_248/0.35)] disabled:opacity-60"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
                {tc("submitting")}
              </>
            ) : (
              t("submit")
            )}
          </Button>
        </motion.form>
      </div>
    </section>
  )
}
