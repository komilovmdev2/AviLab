"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { portfolioCategories, type PortfolioItemRow } from "@/backend/types"

type Props = { initial?: PortfolioItemRow }

const titleField = { uz: "title_uz", ru: "title_ru", en: "title_en" } as const
const descriptionField = {
  uz: "description_uz",
  ru: "description_ru",
  en: "description_en",
} as const

export function PortfolioForm({ initial }: Props) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = new FormData(e.currentTarget)
    if (!form.get("video")?.valueOf() || (form.get("video") as File).size === 0) form.delete("video")
    if (!form.get("thumbnail") || (form.get("thumbnail") as File).size === 0) form.delete("thumbnail")

    const publishedInput = e.currentTarget.elements.namedItem("published") as HTMLInputElement | null
    form.set("published", String(publishedInput?.checked ?? true))

    const url = initial ? `/api/admin/portfolio/${initial.id}` : "/api/admin/portfolio"
    const method = initial ? "PATCH" : "POST"

    const res = await fetch(url, { method, body: form })
    setLoading(false)

    if (!res.ok) {
      const data = await res.json().catch(() => null)
      setError(data?.error ?? "Saqlashda xatolik yuz berdi")
      return
    }

    router.push("/admin/portfolio")
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error ? (
        <p className="rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="category">Kategoriya</Label>
          <select
            id="category"
            name="category"
            defaultValue={initial?.category ?? portfolioCategories[0]}
            className="mt-1.5 h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring"
          >
            {portfolioCategories.map((c) => (
              <option key={c} value={c} className="bg-[#0b1020]">
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="project_url">Loyiha havolasi</Label>
          <Input
            id="project_url"
            name="project_url"
            defaultValue={initial?.project_url ?? ""}
            placeholder="https://example.uz"
            className="mt-1.5"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {(["uz", "ru", "en"] as const).map((locale) => (
          <div key={locale}>
            <Label htmlFor={`title_${locale}`}>Sarlavha ({locale.toUpperCase()})</Label>
            <Input
              id={`title_${locale}`}
              name={`title_${locale}`}
              defaultValue={initial?.[titleField[locale]] ?? ""}
              required
              className="mt-1.5"
            />
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {(["uz", "ru", "en"] as const).map((locale) => (
          <div key={locale}>
            <Label htmlFor={`description_${locale}`}>Tavsif ({locale.toUpperCase()})</Label>
            <Textarea
              id={`description_${locale}`}
              name={`description_${locale}`}
              defaultValue={initial?.[descriptionField[locale]] ?? ""}
              className="mt-1.5"
            />
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="stack">Texnologiyalar (vergul bilan)</Label>
          <Input
            id="stack"
            name="stack"
            defaultValue={initial?.stack?.join(", ") ?? ""}
            placeholder="Next.js, Python, PostgreSQL"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="sort_order">Tartib raqami</Label>
          <Input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={initial?.sort_order ?? 0}
            className="mt-1.5"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="thumbnail">Muqova rasmi {initial ? "(almashtirish uchun tanlang)" : ""}</Label>
          <input
            id="thumbnail"
            name="thumbnail"
            type="file"
            accept="image/*"
            className="mt-1.5 block w-full text-sm text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-white"
          />
          {initial?.thumbnail_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={initial.thumbnail_url} alt="" className="mt-2 h-20 rounded-lg object-cover" />
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
        <Button type="button" variant="outline" onClick={() => router.push("/admin/portfolio")}>
          Bekor qilish
        </Button>
      </div>
    </form>
  )
}
