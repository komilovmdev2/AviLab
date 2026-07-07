import { listPublicTeamMembers, listPublicTeamMoments } from "@/backend/team"
import { isSupabaseConfigured } from "@/backend/supabase"
import type { TeamMemberRow, TeamMomentRow } from "@/backend/types"

export async function getPublicTeamData(): Promise<{
  members: TeamMemberRow[]
  moments: TeamMomentRow[]
}> {
  if (!isSupabaseConfigured()) return { members: [], moments: [] }

  try {
    const [members, moments] = await Promise.all([
      listPublicTeamMembers(),
      listPublicTeamMoments(),
    ])
    return { members, moments }
  } catch (err) {
    console.error("Failed to load team data:", err)
    return { members: [], moments: [] }
  }
}
