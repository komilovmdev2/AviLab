import { NextResponse } from "next/server"
import { z } from "zod"
import { requireAdminSession } from "@/backend/auth"
import { deletePortfolioItem, updatePortfolioItem } from "@/backend/portfolio"
import { portfolioCategories } from "@/backend/types"

const portfolioPatchSchema = z.object({
  category: z.enum(portfolioCategories as [string, ...string[]]).optional(),
  title_uz: z.string().min(1).optional(),
  title_ru: z.string().min(1).optional(),
  title_en: z.string().min(1).optional(),
  description_uz: z.string().optional(),
  description_ru: z.string().optional(),
  description_en: z.string().optional(),
  stack: z.string().optional(),
  project_url: z.string().optional(),
  sort_order: z.coerce.number().optional(),
  published: z.coerce.boolean().optional(),
})

type Params = { params: Promise<{ id: string }> }

export async function PATCH(req: Request, { params }: Params) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const { id } = await params

  const formData = await req.formData()
  const raw: Record<string, string | undefined> = {}
  for (const key of [
    "category",
    "title_uz",
    "title_ru",
    "title_en",
    "description_uz",
    "description_ru",
    "description_en",
    "stack",
    "project_url",
    "sort_order",
    "published",
  ]) {
    const value = formData.get(key)
    if (value !== null) raw[key] = String(value)
  }

  const parsed = portfolioPatchSchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.issues }, { status: 400 })
  }

  const video = formData.get("video")
  const thumbnail = formData.get("thumbnail")

  const { stack, ...rest } = parsed.data
  try {
    const item = await updatePortfolioItem(
      id,
      {
        ...rest,
        category: rest.category as (typeof portfolioCategories)[number] | undefined,
        stack: stack
          ? stack
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : undefined,
      },
      {
        video: video instanceof File ? video : null,
        thumbnail: thumbnail instanceof File ? thumbnail : null,
      }
    )
    return NextResponse.json({ item })
  } catch (err) {
    console.error(err)
    const message = err instanceof Error ? err.message : "Failed to update portfolio item"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const { id } = await params
  try {
    await deletePortfolioItem(id)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    const message = err instanceof Error ? err.message : "Failed to delete portfolio item"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
