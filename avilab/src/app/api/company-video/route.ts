import { NextResponse } from "next/server"
import { getCompanyVideoRow } from "@/backend/company-video"

export async function GET() {
  try {
    const row = await getCompanyVideoRow()
    return NextResponse.json({ videoUrl: row?.video_url ?? null })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ videoUrl: null })
  }
}
