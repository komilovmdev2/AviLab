import { NextResponse } from "next/server"
import { z } from "zod"
import { requireAdminSession } from "@/backend/auth"
import { createPortfolioItem, listPortfolioRows } from "@/backend/portfolio"
import { portfolioCategories } from "@/backend/types"

const portfolioInputSchema = z.object({
  category: z.enum(portfolioCategories as [string, ...string[]]),
  title_uz: z.string().min(1),
  title_ru: z.string().min(1),
  title_en: z.string().min(1),
  description_uz: z.string().optional(),
  description_ru: z.string().optional(),
  description_en: z.string().optional(),
  stack: z.string().optional(),
  project_url: z.string().optional(),
  sort_order: z.coerce.number().optional(),
  published: z.coerce.boolean().optional(),
})

export async function GET() {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const rows = await listPortfolioRows()
  return NextResponse.json({ items: rows })
}

export async function POST(req: Request) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await req.formData()
  const raw = {
    category: String(formData.get("category") ?? ""),
    title_uz: String(formData.get("title_uz") ?? ""),
    title_ru: String(formData.get("title_ru") ?? ""),
    title_en: String(formData.get("title_en") ?? ""),
    description_uz: String(formData.get("description_uz") ?? "") || undefined,
    description_ru: String(formData.get("description_ru") ?? "") || undefined,
    description_en: String(formData.get("description_en") ?? "") || undefined,
    stack: String(formData.get("stack") ?? ""),
    project_url: String(formData.get("project_url") ?? "") || undefined,
    sort_order: String(formData.get("sort_order") ?? "0"),
    published: String(formData.get("published") ?? "true"),
  }

  const parsed = portfolioInputSchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.issues }, { status: 400 })
  }

  const video = formData.get("video")
  const thumbnail = formData.get("thumbnail")

  try {
    const item = await createPortfolioItem(
      {
        category: parsed.data.category as (typeof portfolioCategories)[number],
        title_uz: parsed.data.title_uz,
        title_ru: parsed.data.title_ru,
        title_en: parsed.data.title_en,
        description_uz: parsed.data.description_uz ?? null,
        description_ru: parsed.data.description_ru ?? null,
        description_en: parsed.data.description_en ?? null,
        stack: (parsed.data.stack ?? "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        project_url: parsed.data.project_url ?? null,
        sort_order: parsed.data.sort_order,
        published: parsed.data.published,
      },
      {
        video: video instanceof File ? video : null,
        thumbnail: thumbnail instanceof File ? thumbnail : null,
      }
    )
    return NextResponse.json({ item })
  } catch (err) {
    console.error(err)
    const message = err instanceof Error ? err.message : "Failed to create portfolio item"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
