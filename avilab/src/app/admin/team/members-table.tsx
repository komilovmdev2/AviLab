"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import type { TeamMemberRow } from "@/backend/types"

export function MembersTable({ items }: { items: TeamMemberRow[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [pendingId, setPendingId] = useState<string | null>(null)

  async function togglePublished(item: TeamMemberRow) {
    setPendingId(item.id)
    const form = new FormData()
    form.set("published", String(!item.published))
    await fetch(`/api/admin/team/members/${item.id}`, { method: "PATCH", body: form })
    setPendingId(null)
    startTransition(() => router.refresh())
  }

  async function handleDelete(item: TeamMemberRow) {
    if (!window.confirm(`"${item.name}" o'chirilsinmi?`)) return
    setPendingId(item.id)
    await fetch(`/api/admin/team/members/${item.id}`, { method: "DELETE" })
    setPendingId(null)
    startTransition(() => router.refresh())
  }

  if (items.length === 0) {
    return (
      <p className="rounded-xl border border-white/10 bg-white/[0.02] p-8 text-center text-sm text-slate-400">
        Hali jamoa a&apos;zolari qo&apos;shilmagan.
      </p>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-white/[0.03] text-xs tracking-wide text-slate-400 uppercase">
          <tr>
            <th className="px-4 py-3">Rasm</th>
            <th className="px-4 py-3">Ism</th>
            <th className="px-4 py-3">Lavozim</th>
            <th className="px-4 py-3">Tartib</th>
            <th className="px-4 py-3">Holat</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {items.map((item) => (
            <tr key={item.id} className="text-slate-200">
              <td className="px-4 py-3">
                {item.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image_url} alt="" className="size-12 rounded-lg object-cover" />
                ) : (
                  <div className="flex size-12 items-center justify-center rounded-lg bg-white/5 text-[10px] text-slate-500">
                    —
                  </div>
                )}
              </td>
              <td className="px-4 py-3 font-medium text-white">{item.name}</td>
              <td className="px-4 py-3 text-slate-400">{item.role}</td>
              <td className="px-4 py-3 text-slate-400">{item.sort_order}</td>
              <td className="px-4 py-3">
                <button
                  type="button"
                  disabled={isPending && pendingId === item.id}
                  onClick={() => togglePublished(item)}
                  className={
                    item.published
                      ? "rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs text-emerald-300"
                      : "rounded-full bg-white/10 px-2.5 py-1 text-xs text-slate-400"
                  }
                >
                  {item.published ? "Chop etilgan" : "Yashirin"}
                </button>
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-3">
                  <Link
                    href={`/admin/team/members/${item.id}`}
                    className="text-avilab-glow hover:underline"
                  >
                    Tahrirlash
                  </Link>
                  <button
                    type="button"
                    disabled={isPending && pendingId === item.id}
                    onClick={() => handleDelete(item)}
                    className="text-red-400 hover:underline disabled:opacity-50"
                  >
                    O&apos;chirish
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
