import { listPublicPortfolio } from "@/backend/portfolio"
import { isSupabaseConfigured } from "@/backend/supabase"
import type { PortfolioItem, PortfolioLocale } from "@/backend/types"

const locales: PortfolioLocale[] = ["uz", "ru", "en"]

export async function getPublicPortfolioForLocale(locale: string): Promise<PortfolioItem[]> {
  if (!isSupabaseConfigured()) return []

  const resolved = locales.includes(locale as PortfolioLocale) ? (locale as PortfolioLocale) : "en"
  try {
    return await listPublicPortfolio(resolved)
  } catch (err) {
    console.error("Failed to load portfolio items:", err)
    return []
  }
}
