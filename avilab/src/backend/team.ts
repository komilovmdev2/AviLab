import {
  deleteSiteMedia,
  restDelete,
  restInsert,
  restSelect,
  restUpdate,
  uploadSiteMedia,
} from "@/backend/supabase"
import type { TeamMemberRow, TeamMomentRow } from "@/backend/types"

const MEMBERS_TABLE = "team_members"
const MOMENTS_TABLE = "team_moments"

export type TeamMemberInput = {
  name: string
  role: string
  bio?: string | null
  experience?: string | null
  stack: string[]
  linkedin_url?: string | null
  github_url?: string | null
  twitter_url?: string | null
  sort_order?: number
  published?: boolean
}

export async function listTeamMemberRows(): Promise<TeamMemberRow[]> {
  return restSelect<TeamMemberRow>(`${MEMBERS_TABLE}?select=*&order=sort_order.asc`)
}

export async function listPublicTeamMembers(): Promise<TeamMemberRow[]> {
  return restSelect<TeamMemberRow>(
    `${MEMBERS_TABLE}?select=*&published=eq.true&order=sort_order.asc`
  )
}

export async function getTeamMemberRow(id: string): Promise<TeamMemberRow | null> {
  const rows = await restSelect<TeamMemberRow>(
    `${MEMBERS_TABLE}?select=*&id=eq.${encodeURIComponent(id)}`
  )
  return rows[0] ?? null
}

export async function createTeamMember(
  input: TeamMemberInput,
  image: File | null
): Promise<TeamMemberRow> {
  const row = await restInsert<TeamMemberRow>(MEMBERS_TABLE, {
    ...input,
    sort_order: input.sort_order ?? 0,
    published: input.published ?? true,
  })

  if (image && image.size > 0) {
    const uploaded = await uploadSiteMedia(row.id, "member-photo", image)
    return restUpdate<TeamMemberRow>(MEMBERS_TABLE, row.id, {
      image_url: uploaded.url,
      image_path: uploaded.path,
    })
  }
  return row
}

export async function updateTeamMember(
  id: string,
  input: Partial<TeamMemberInput>,
  image: File | null
): Promise<TeamMemberRow> {
  const existing = await getTeamMemberRow(id)
  if (!existing) throw new Error("Team member not found")

  const patch: Record<string, unknown> = { ...input }
  if (image && image.size > 0) {
    if (existing.image_path) await deleteSiteMedia(existing.image_path)
    const uploaded = await uploadSiteMedia(id, "member-photo", image)
    patch.image_url = uploaded.url
    patch.image_path = uploaded.path
  }

  return restUpdate<TeamMemberRow>(MEMBERS_TABLE, id, patch)
}

export async function deleteTeamMember(id: string): Promise<void> {
  const existing = await getTeamMemberRow(id)
  if (existing?.image_path) await deleteSiteMedia(existing.image_path)
  await restDelete(MEMBERS_TABLE, id)
}

export type TeamMomentInput = {
  caption?: string | null
  sort_order?: number
  published?: boolean
}

export type TeamMomentMediaFiles = {
  image?: File | null
  video?: File | null
}

export async function listTeamMomentRows(): Promise<TeamMomentRow[]> {
  return restSelect<TeamMomentRow>(`${MOMENTS_TABLE}?select=*&order=sort_order.asc`)
}

export async function listPublicTeamMoments(): Promise<TeamMomentRow[]> {
  return restSelect<TeamMomentRow>(
    `${MOMENTS_TABLE}?select=*&published=eq.true&order=sort_order.asc`
  )
}

export async function getTeamMomentRow(id: string): Promise<TeamMomentRow | null> {
  const rows = await restSelect<TeamMomentRow>(
    `${MOMENTS_TABLE}?select=*&id=eq.${encodeURIComponent(id)}`
  )
  return rows[0] ?? null
}

export async function createTeamMoment(
  input: TeamMomentInput,
  files: TeamMomentMediaFiles
): Promise<TeamMomentRow> {
  const row = await restInsert<TeamMomentRow>(MOMENTS_TABLE, {
    ...input,
    sort_order: input.sort_order ?? 0,
    published: input.published ?? true,
  })

  const mediaPatch: Record<string, unknown> = {}
  if (files.image && files.image.size > 0) {
    const uploaded = await uploadSiteMedia(row.id, "moment-image", files.image)
    mediaPatch.image_url = uploaded.url
    mediaPatch.image_path = uploaded.path
  }
  if (files.video && files.video.size > 0) {
    const uploaded = await uploadSiteMedia(row.id, "moment-video", files.video)
    mediaPatch.video_url = uploaded.url
    mediaPatch.video_path = uploaded.path
  }

  if (Object.keys(mediaPatch).length === 0) return row
  return restUpdate<TeamMomentRow>(MOMENTS_TABLE, row.id, mediaPatch)
}

export async function updateTeamMoment(
  id: string,
  input: Partial<TeamMomentInput>,
  files: TeamMomentMediaFiles
): Promise<TeamMomentRow> {
  const existing = await getTeamMomentRow(id)
  if (!existing) throw new Error("Team moment not found")

  const patch: Record<string, unknown> = { ...input }
  if (files.image && files.image.size > 0) {
    if (existing.image_path) await deleteSiteMedia(existing.image_path)
    const uploaded = await uploadSiteMedia(id, "moment-image", files.image)
    patch.image_url = uploaded.url
    patch.image_path = uploaded.path
  }
  if (files.video && files.video.size > 0) {
    if (existing.video_path) await deleteSiteMedia(existing.video_path)
    const uploaded = await uploadSiteMedia(id, "moment-video", files.video)
    patch.video_url = uploaded.url
    patch.video_path = uploaded.path
  }

  return restUpdate<TeamMomentRow>(MOMENTS_TABLE, id, patch)
}

export async function deleteTeamMoment(id: string): Promise<void> {
  const existing = await getTeamMomentRow(id)
  if (existing?.image_path) await deleteSiteMedia(existing.image_path)
  if (existing?.video_path) await deleteSiteMedia(existing.video_path)
  await restDelete(MOMENTS_TABLE, id)
}
