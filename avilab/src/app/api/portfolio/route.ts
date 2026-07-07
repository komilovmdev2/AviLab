import { NextResponse } from "next/server"
import { listPublicPortfolio } from "@/backend/portfolio"
import type { PortfolioLocale } from "@/backend/types"

const locales: PortfolioLocale[] = ["uz", "ru", "en"]

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const requested = searchParams.get("locale")
  const locale = locales.includes(requested as PortfolioLocale) ? (requested as PortfolioLocale) : "en"

  try {
    const items = await listPublicPortfolio(locale)
    return NextResponse.json({ items })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ items: [] })
  }
}
