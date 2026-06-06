import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["en", "uz", "ru"],
  defaultLocale: "en",
  localePrefix: "always",
  localeCookie: true,
  alternateLinks: true,
})

export type AppLocale = (typeof routing.locales)[number]

export const localeLabels: Record<
  AppLocale,
  { short: string; native: string }
> = {
  en: { short: "EN", native: "English" },
  uz: { short: "UZ", native: "Oʻzbekcha" },
  ru: { short: "RU", native: "Русский" },
}
