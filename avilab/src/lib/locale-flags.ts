import type { StaticImageData } from "next/image"
import type { AppLocale } from "@/i18n/routing"
import unitedKingdom from "../../public/flags/united-kingdom.png"
import uzbekistan from "../../public/flags/uzbekistan.png"
import russia from "../../public/flags/russia.png"

export const localeFlags: Record<AppLocale, StaticImageData> = {
  en: unitedKingdom,
  uz: uzbekistan,
  ru: russia,
}
