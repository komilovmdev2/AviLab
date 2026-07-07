"use client"

import { useRouter } from "next/navigation"

export function LogoutButton() {
  const router = useRouter()

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={onLogout}
      className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 hover:text-white"
    >
      Chiqish
    </button>
  )
}
