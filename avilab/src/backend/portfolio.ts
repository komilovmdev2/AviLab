import {
  deletePortfolioMedia,
  restDelete,
  restInsert,
  restSelect,
  restUpdate,
  uploadPortfolioMedia,
} from "@/backend/supabase"
import {
  toPublicPortfolioItem,
  type PortfolioItem,
  type PortfolioItemRow,
  type PortfolioLocale,
} from "@/backend/types"

const TABLE = "portfolio_items"

export type PortfolioItemInput = {
  category: PortfolioItemRow["category"]
  title_uz: string
  title_ru: string
  title_en: string
  description_uz?: string | null
  description_ru?: string | null
  description_en?: string | null
  stack: string[]
  project_url?: string | null
  sort_order?: number
  published?: boolean
}

export type PortfolioMediaFiles = {
  video?: File | null
  thumbnail?: File | null
}

export async function listPortfolioRows(): Promise<PortfolioItemRow[]> {
  return restSelect<PortfolioItemRow>(`${TABLE}?select=*&order=sort_order.asc`)
}

export async function listPublicPortfolio(locale: PortfolioLocale): Promise<PortfolioItem[]> {
  const rows = await restSelect<PortfolioItemRow>(
    `${TABLE}?select=*&published=eq.true&order=sort_order.asc`
  )
  return rows.map((row) => toPublicPortfolioItem(row, locale))
}

export async function getPortfolioRow(id: string): Promise<PortfolioItemRow | null> {
  const rows = await restSelect<PortfolioItemRow>(
    `${TABLE}?select=*&id=eq.${encodeURIComponent(id)}`
  )
  return rows[0] ?? null
}

export async function createPortfolioItem(
  input: PortfolioItemInput,
  files: PortfolioMediaFiles
): Promise<PortfolioItemRow> {
  const row = await restInsert<PortfolioItemRow>(TABLE, {
    ...input,
    project_url: input.project_url || null,
    sort_order: input.sort_order ?? 0,
    published: input.published ?? true,
  })

  const mediaPatch: Record<string, unknown> = {}
  if (files.video && files.video.size > 0) {
    const uploaded = await uploadPortfolioMedia(row.id, "video", files.video)
    mediaPatch.video_url = uploaded.url
    mediaPatch.video_path = uploaded.path
  }
  if (files.thumbnail && files.thumbnail.size > 0) {
    const uploaded = await uploadPortfolioMedia(row.id, "thumbnail", files.thumbnail)
    mediaPatch.thumbnail_url = uploaded.url
    mediaPatch.thumbnail_path = uploaded.path
  }

  if (Object.keys(mediaPatch).length === 0) return row
  return restUpdate<PortfolioItemRow>(TABLE, row.id, mediaPatch)
}

export async function updatePortfolioItem(
  id: string,
  input: Partial<PortfolioItemInput>,
  files: PortfolioMediaFiles
): Promise<PortfolioItemRow> {
  const existing = await getPortfolioRow(id)
  if (!existing) throw new Error("Portfolio item not found")

  const patch: Record<string, unknown> = { ...input }

  if (files.video && files.video.size > 0) {
    if (existing.video_path) await deletePortfolioMedia(existing.video_path)
    const uploaded = await uploadPortfolioMedia(id, "video", files.video)
    patch.video_url = uploaded.url
    patch.video_path = uploaded.path
  }
  if (files.thumbnail && files.thumbnail.size > 0) {
    if (existing.thumbnail_path) await deletePortfolioMedia(existing.thumbnail_path)
    const uploaded = await uploadPortfolioMedia(id, "thumbnail", files.thumbnail)
    patch.thumbnail_url = uploaded.url
    patch.thumbnail_path = uploaded.path
  }

  return restUpdate<PortfolioItemRow>(TABLE, id, patch)
}

export async function deletePortfolioItem(id: string): Promise<void> {
  const existing = await getPortfolioRow(id)
  if (existing?.video_path) await deletePortfolioMedia(existing.video_path)
  if (existing?.thumbnail_path) await deletePortfolioMedia(existing.thumbnail_path)
  await restDelete(TABLE, id)
}
