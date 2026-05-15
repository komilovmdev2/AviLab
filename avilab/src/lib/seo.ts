import { routing } from "@/i18n/routing"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://avilab.example.com"

/** hreflang map for a path segment after locale (e.g. `""`, `"services"`). */
export function languageAlternates(pathAfterLocale: string) {
  const seg = pathAfterLocale.replace(/^\//, "")
  return Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      seg ? `${siteUrl}/${locale}/${seg}` : `${siteUrl}/${locale}`,
    ])
  ) as Record<string, string>
}

export function siteOrigin() {
  return siteUrl
}
