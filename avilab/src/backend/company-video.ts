import { deleteSiteMedia, restInsert, restSelect, restUpdate, uploadSiteMedia } from "@/backend/supabase"
import type { CompanyVideoRow } from "@/backend/types"

const TABLE = "company_video"

export async function getCompanyVideoRow(): Promise<CompanyVideoRow | null> {
  const rows = await restSelect<CompanyVideoRow>(
    `${TABLE}?select=*&order=updated_at.desc&limit=1`
  )
  return rows[0] ?? null
}

export async function setCompanyVideo(file: File): Promise<CompanyVideoRow> {
  const existing = await getCompanyVideoRow()
  const row = existing ?? (await restInsert<CompanyVideoRow>(TABLE, {}))

  if (existing?.video_path) await deleteSiteMedia(existing.video_path)
  const uploaded = await uploadSiteMedia(row.id, "company-video", file)

  return restUpdate<CompanyVideoRow>(TABLE, row.id, {
    video_url: uploaded.url,
    video_path: uploaded.path,
    updated_at: new Date().toISOString(),
  })
}
