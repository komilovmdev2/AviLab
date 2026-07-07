"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function CompanyVideoForm({ initialVideoUrl }: { initialVideoUrl: string | null }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(initialVideoUrl)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = new FormData(e.currentTarget)
    const video = form.get("video")
    if (!(video instanceof File) || video.size === 0) {
      setLoading(false)
      setError("Video faylni tanlang")
      return
    }

    const res = await fetch("/api/admin/company-video", { method: "POST", body: form })
    setLoading(false)

    if (!res.ok) {
      const data = await res.json().catch(() => null)
      setError(data?.error ?? "Saqlashda xatolik yuz berdi")
      return
    }

    const data = await res.json()
    setPreviewUrl(data.item?.video_url ?? null)
    e.currentTarget.reset()
    router.refresh()
  }

  return (
    <div className="space-y-6">
      {previewUrl ? (
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10">
          <video src={previewUrl} controls className="size-full object-cover" />
        </div>
      ) : (
        <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-dashed border-white/15 text-sm text-slate-500">
          Hali video yuklanmagan
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        {error ? (
          <p className="rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-300">
            {error}
          </p>
        ) : null}

        <input
          name="video"
          type="file"
          accept="video/*"
          required
          className="block w-full text-sm text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-white"
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Yuklanmoqda..." : previewUrl ? "Videoni almashtirish" : "Videoni yuklash"}
        </Button>
      </form>
    </div>
  )
}
