"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { TeamMomentRow } from "@/backend/types"

type Props = { initial?: TeamMomentRow }

export function MomentForm({ initial }: Props) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = new FormData(e.currentTarget)
    if (!form.get("image") || (form.get("image") as File).size === 0) form.delete("image")
    if (!form.get("video") || (form.get("video") as File).size === 0) form.delete("video")

    const publishedInput = e.currentTarget.elements.namedItem("published") as HTMLInputElement | null
    form.set("published", String(publishedInput?.checked ?? true))

    const url = initial ? `/api/admin/team/moments/${initial.id}` : "/api/admin/team/moments"
    const method = initial ? "PATCH" : "POST"

    const res = await fetch(url, { method, body: form })
    setLoading(false)

    if (!res.ok) {
      const data = await res.json().catch(() => null)
      setError(data?.error ?? "Saqlashda xatolik yuz berdi")
      return
    }

    router.push("/admin/team")
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error ? (
        <p className="rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <div>
        <Label htmlFor="caption">Izoh</Label>
        <Input
          id="caption"
          name="caption"
          defaultValue={initial?.caption ?? ""}
          placeholder="Ai national hackathon 2026, Samarqand"
          className="mt-1.5"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="image">Rasm {initial ? "(almashtirish uchun tanlang)" : ""}</Label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="mt-1.5 block w-full text-sm text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-white"
          />
          {initial?.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={initial.image_url} alt="" className="mt-2 h-20 rounded-lg object-cover" />
          ) : null}
        </div>
        <div>
          <Label htmlFor="video">Video {initial ? "(almashtirish uchun tanlang)" : ""}</Label>
          <input
            id="video"
            name="video"
            type="file"
            accept="video/*"
            className="mt-1.5 block w-full text-sm text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-white"
          />
          {initial?.video_url ? (
            <video src={initial.video_url} controls className="mt-2 h-20 rounded-lg" />
          ) : null}
        </div>
      </div>
      <p className="text-xs text-slate-500">
        Rasm yoki video&apos;dan birini (yoki ikkalasini ham) yuklashingiz mumkin. Video mavjud bo&apos;lsa,
        saytda u ustuvor ko&apos;rsatiladi.
      </p>

      <div>
        <Label htmlFor="sort_order">Tartib raqami</Label>
        <Input
          id="sort_order"
          name="sort_order"
          type="number"
          defaultValue={initial?.sort_order ?? 0}
          className="mt-1.5 max-w-[160px]"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-300">
        <input
          type="checkbox"
          name="published"
          value="true"
          defaultChecked={initial?.published ?? true}
          className="size-4 rounded border-white/20 bg-transparent"
        />
        Saytda chop etilsin
      </label>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saqlanmoqda..." : "Saqlash"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/team")}>
          Bekor qilish
        </Button>
      </div>
    </form>
  )
}
