import { NextResponse } from "next/server"
import { z } from "zod"
import { requireAdminSession } from "@/backend/auth"
import { deleteTeamMember, updateTeamMember } from "@/backend/team"

const memberPatchSchema = z.object({
  name: z.string().min(1).optional(),
  role: z.string().min(1).optional(),
  bio: z.string().optional(),
  experience: z.string().optional(),
  stack: z.string().optional(),
  linkedin_url: z.string().optional(),
  github_url: z.string().optional(),
  twitter_url: z.string().optional(),
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
    "name",
    "role",
    "bio",
    "experience",
    "stack",
    "linkedin_url",
    "github_url",
    "twitter_url",
    "sort_order",
    "published",
  ]) {
    const value = formData.get(key)
    if (value !== null) raw[key] = String(value)
  }

  const parsed = memberPatchSchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.issues }, { status: 400 })
  }

  const image = formData.get("image")
  const { stack, ...rest } = parsed.data

  try {
    const item = await updateTeamMember(
      id,
      {
        ...rest,
        stack: stack
          ? stack
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : undefined,
      },
      image instanceof File ? image : null
    )
    return NextResponse.json({ item })
  } catch (err) {
    console.error(err)
    const message = err instanceof Error ? err.message : "Failed to update team member"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const { id } = await params
  try {
    await deleteTeamMember(id)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    const message = err instanceof Error ? err.message : "Failed to delete team member"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
