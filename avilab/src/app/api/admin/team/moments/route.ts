import { NextResponse } from "next/server"
import { z } from "zod"
import { requireAdminSession } from "@/backend/auth"
import { createTeamMoment, listTeamMomentRows } from "@/backend/team"

const momentInputSchema = z.object({
  caption: z.string().optional(),
  sort_order: z.coerce.number().optional(),
  published: z.coerce.boolean().optional(),
})

export async function GET() {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const rows = await listTeamMomentRows()
  return NextResponse.json({ items: rows })
}

export async function POST(req: Request) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await req.formData()
  const raw = {
    caption: String(formData.get("caption") ?? "") || undefined,
    sort_order: String(formData.get("sort_order") ?? "0"),
    published: String(formData.get("published") ?? "true"),
  }

  const parsed = momentInputSchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.issues }, { status: 400 })
  }

  const image = formData.get("image")
  const video = formData.get("video")

  try {
    const item = await createTeamMoment(
      {
        caption: parsed.data.caption ?? null,
        sort_order: parsed.data.sort_order,
        published: parsed.data.published,
      },
      {
        image: image instanceof File ? image : null,
        video: video instanceof File ? video : null,
      }
    )
    return NextResponse.json({ item })
  } catch (err) {
    console.error(err)
    const message = err instanceof Error ? err.message : "Failed to create team moment"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
