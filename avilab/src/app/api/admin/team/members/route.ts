import { NextResponse } from "next/server"
import { z } from "zod"
import { requireAdminSession } from "@/backend/auth"
import { createTeamMember, listTeamMemberRows } from "@/backend/team"

const memberInputSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().optional(),
  experience: z.string().optional(),
  stack: z.string().optional(),
  linkedin_url: z.string().optional(),
  github_url: z.string().optional(),
  twitter_url: z.string().optional(),
  sort_order: z.coerce.number().optional(),
  published: z.coerce.boolean().optional(),
})

export async function GET() {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const rows = await listTeamMemberRows()
  return NextResponse.json({ items: rows })
}

export async function POST(req: Request) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await req.formData()
  const raw = {
    name: String(formData.get("name") ?? ""),
    role: String(formData.get("role") ?? ""),
    bio: String(formData.get("bio") ?? "") || undefined,
    experience: String(formData.get("experience") ?? "") || undefined,
    stack: String(formData.get("stack") ?? ""),
    linkedin_url: String(formData.get("linkedin_url") ?? "") || undefined,
    github_url: String(formData.get("github_url") ?? "") || undefined,
    twitter_url: String(formData.get("twitter_url") ?? "") || undefined,
    sort_order: String(formData.get("sort_order") ?? "0"),
    published: String(formData.get("published") ?? "true"),
  }

  const parsed = memberInputSchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.issues }, { status: 400 })
  }

  const image = formData.get("image")

  try {
    const item = await createTeamMember(
      {
        name: parsed.data.name,
        role: parsed.data.role,
        bio: parsed.data.bio ?? null,
        experience: parsed.data.experience ?? null,
        stack: (parsed.data.stack ?? "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        linkedin_url: parsed.data.linkedin_url ?? null,
        github_url: parsed.data.github_url ?? null,
        twitter_url: parsed.data.twitter_url ?? null,
        sort_order: parsed.data.sort_order,
        published: parsed.data.published,
      },
      image instanceof File ? image : null
    )
    return NextResponse.json({ item })
  } catch (err) {
    console.error(err)
    const message = err instanceof Error ? err.message : "Failed to create team member"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
