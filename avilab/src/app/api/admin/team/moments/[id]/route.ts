import { NextResponse } from "next/server"
import { z } from "zod"
import { requireAdminSession } from "@/backend/auth"
import { deleteTeamMoment, updateTeamMoment } from "@/backend/team"

const momentPatchSchema = z.object({
  caption: z.string().optional(),
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
  for (const key of ["caption", "sort_order", "published"]) {
    const value = formData.get(key)
    if (value !== null) raw[key] = String(value)
  }

  const parsed = momentPatchSchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.issues }, { status: 400 })
  }

  const image = formData.get("image")
  const video = formData.get("video")

  try {
    const item = await updateTeamMoment(id, parsed.data, {
      image: image instanceof File ? image : null,
      video: video instanceof File ? video : null,
    })
    return NextResponse.json({ item })
  } catch (err) {
    console.error(err)
    const message = err instanceof Error ? err.message : "Failed to update team moment"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const { id } = await params
  try {
    await deleteTeamMoment(id)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    const message = err instanceof Error ? err.message : "Failed to delete team moment"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
