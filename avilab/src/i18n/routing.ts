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
  { short: string; native: string; flag: string }
> = {
  en: { short: "EN", native: "English", flag: "🇬🇧" },
  uz: { short: "UZ", native: "Oʻzbekcha", flag: "🇺🇿" },
  ru: { short: "RU", native: "Русский", flag: "🇷🇺" },
}
