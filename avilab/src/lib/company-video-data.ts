import { getCompanyVideoRow } from "@/backend/company-video"
import { isSupabaseConfigured } from "@/backend/supabase"

export async function getPublicCompanyVideoUrl(): Promise<string | null> {
  if (!isSupabaseConfigured()) return null

  try {
    const row = await getCompanyVideoRow()
    return row?.video_url ?? null
  } catch (err) {
    console.error("Failed to load company video:", err)
    return null
  }
}
