import { NextResponse } from "next/server"
import { listPublicTeamMembers, listPublicTeamMoments } from "@/backend/team"

export async function GET() {
  try {
    const [members, moments] = await Promise.all([
      listPublicTeamMembers(),
      listPublicTeamMoments(),
    ])
    return NextResponse.json({ members, moments })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ members: [], moments: [] })
  }
}
