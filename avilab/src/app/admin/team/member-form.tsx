"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { TeamMemberRow } from "@/backend/types"

type Props = { initial?: TeamMemberRow }

export function MemberForm({ initial }: Props) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = new FormData(e.currentTarget)
    if (!form.get("image") || (form.get("image") as File).size === 0) form.delete("image")

    const publishedInput = e.currentTarget.elements.namedItem("published") as HTMLInputElement | null
    form.set("published", String(publishedInput?.checked ?? true))

    const url = initial ? `/api/admin/team/members/${initial.id}` : "/api/admin/team/members"
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Ism</Label>
          <Input id="name" name="name" defaultValue={initial?.name ?? ""} required className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="role">Lavozim</Label>
          <Input id="role" name="role" defaultValue={initial?.role ?? ""} required className="mt-1.5" />
        </div>
      </div>

      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" name="bio" defaultValue={initial?.bio ?? ""} className="mt-1.5" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="experience">Tajriba</Label>
          <Input
            id="experience"
            name="experience"
            defaultValue={initial?.experience ?? ""}
            placeholder="5+ years"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="stack">Ko&apos;nikmalar (vergul bilan)</Label>
          <Input
            id="stack"
            name="stack"
            defaultValue={initial?.stack?.join(", ") ?? ""}
            placeholder="React, Python, AI"
            className="mt-1.5"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="linkedin_url">LinkedIn</Label>
          <Input
            id="linkedin_url"
            name="linkedin_url"
            defaultValue={initial?.linkedin_url ?? ""}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="github_url">GitHub</Label>
          <Input
            id="github_url"
            name="github_url"
            defaultValue={initial?.github_url ?? ""}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="twitter_url">Twitter / X</Label>
          <Input
            id="twitter_url"
            name="twitter_url"
            defaultValue={initial?.twitter_url ?? ""}
            className="mt-1.5"
          />
        </div>
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
