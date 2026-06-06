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
  en: { short: "EN", native: "English", flag: "/flags/united-kingdom.png" },
  uz: { short: "UZ", native: "Oʻzbekcha", flag: "/flags/uzbekistan.png" },
  ru: { short: "RU", native: "Русский", flag: "/flags/russia.png" },
}
