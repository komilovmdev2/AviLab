import { NextResponse } from "next/server"
import { requireAdminSession } from "@/backend/auth"
import { getCompanyVideoRow, setCompanyVideo } from "@/backend/company-video"

export async function GET() {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const row = await getCompanyVideoRow()
  return NextResponse.json({ item: row })
}

export async function POST(req: Request) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await req.formData()
  const video = formData.get("video")
  if (!(video instanceof File) || video.size === 0) {
    return NextResponse.json({ error: "Video fayl talab qilinadi" }, { status: 400 })
  }

  try {
    const item = await setCompanyVideo(video)
    return NextResponse.json({ item })
  } catch (err) {
    console.error(err)
    const message = err instanceof Error ? err.message : "Failed to save company video"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
