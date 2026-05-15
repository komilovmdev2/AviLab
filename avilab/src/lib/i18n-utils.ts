import type { AppLocale } from "@/i18n/routing"

/** LTR today; extend with `ar`, `he`, etc. for RTL. */
const rtlLocales = new Set<string>([])

export function getTextDirection(locale: string): "ltr" | "rtl" {
  return rtlLocales.has(locale) ? "rtl" : "ltr"
}

export function isRtlLocale(locale: string): boolean {
  return rtlLocales.has(locale)
}

const ogLocaleMap: Record<AppLocale, string> = {
  en: "en_US",
  uz: "uz_UZ",
  ru: "ru_RU",
}

export function openGraphLocale(locale: AppLocale): string {
  return ogLocaleMap[locale] ?? "en_US"
}
