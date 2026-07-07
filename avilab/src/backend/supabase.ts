const PORTFOLIO_BUCKET = "portfolio-media"
const SITE_MEDIA_BUCKET = "site-media"

function requireSupabaseEnv() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY is not configured. Set them in .env before using the admin backend."
    )
  }
  return { url: url.replace(/\/$/, ""), key }
}

async function restRequest(path: string, init: RequestInit = {}) {
  const { url, key } = requireSupabaseEnv()
  const res = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    // Admin-managed content must always be fresh — never let Next.js's fetch
    // Data Cache serve a stale response from before the latest edit.
    cache: "no-store",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Supabase REST ${init.method ?? "GET"} ${path} failed: ${res.status} ${body}`)
  }
  return res
}

export async function restSelect<T>(query: string): Promise<T[]> {
  const res = await restRequest(query)
  return (await res.json()) as T[]
}

export async function restInsert<T>(table: string, row: Record<string, unknown>): Promise<T> {
  const res = await restRequest(table, {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(row),
  })
  const rows = (await res.json()) as T[]
  return rows[0]
}

export async function restUpdate<T>(
  table: string,
  id: string,
  patch: Record<string, unknown>
): Promise<T> {
  const res = await restRequest(`${table}?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(patch),
  })
  const rows = (await res.json()) as T[]
  return rows[0]
}

export async function restDelete(table: string, id: string): Promise<void> {
  await restRequest(`${table}?id=eq.${encodeURIComponent(id)}`, { method: "DELETE" })
}

export type UploadedMedia = { url: string; path: string }

export async function uploadMedia(
  bucket: string,
  itemId: string,
  field: string,
  file: File
): Promise<UploadedMedia> {
  const { url, key } = requireSupabaseEnv()
  const safeName = file.name.replace(/[^a-zA-Z0-9_.-]/g, "_")
  const path = `${itemId}/${field}-${Date.now()}-${safeName}`

  const res = await fetch(`${url}/storage/v1/object/${bucket}/${path}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "true",
    },
    body: await file.arrayBuffer(),
  })
  if (!res.ok) {
    const body = await res.text()
    if (res.status === 400 && body.includes("exceeded the maximum allowed size")) {
      throw new Error(
        "Fayl hajmi Supabase loyihangizdagi limitdan katta. Supabase dashboard → Storage → Settings " +
          "bo'limida \"Global file size limit\"ni oshiring yoki faylni kichraytirib qayta yuklang."
      )
    }
    throw new Error(`Supabase storage upload failed: ${res.status} ${body}`)
  }

  return { url: `${url}/storage/v1/object/public/${bucket}/${path}`, path }
}

export async function deleteMedia(bucket: string, path: string): Promise<void> {
  const { url, key } = requireSupabaseEnv()
  const res = await fetch(`${url}/storage/v1/object/${bucket}/${path}`, {
    method: "DELETE",
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  })
  if (!res.ok) {
    console.error("Supabase storage delete failed:", await res.text())
  }
}

export function uploadPortfolioMedia(itemId: string, field: "video" | "thumbnail", file: File) {
  return uploadMedia(PORTFOLIO_BUCKET, itemId, field, file)
}

export function deletePortfolioMedia(path: string) {
  return deleteMedia(PORTFOLIO_BUCKET, path)
}

export function uploadSiteMedia(itemId: string, field: string, file: File) {
  return uploadMedia(SITE_MEDIA_BUCKET, itemId, field, file)
}

export function deleteSiteMedia(path: string) {
  return deleteMedia(SITE_MEDIA_BUCKET, path)
}

export function isSupabaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}
