import Link from "next/link"
import { redirect } from "next/navigation"
import { requireAdminSession } from "@/backend/auth"
import { listTeamMemberRows, listTeamMomentRows } from "@/backend/team"
import { isSupabaseConfigured } from "@/backend/supabase"
import { AdminNav } from "../admin-nav"
import { MembersTable } from "./members-table"
import { MomentsTable } from "./moments-table"

export default async function AdminTeamPage() {
  if (!(await requireAdminSession())) {
    redirect("/admin/login")
  }

  if (!isSupabaseConfigured()) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-xl font-semibold text-white">Jamoa</h1>
        <p className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">
          SUPABASE_URL va SUPABASE_SERVICE_ROLE_KEY .env faylida sozlanmagan.
        </p>
      </main>
    )
  }

  const [members, moments] = await Promise.all([listTeamMemberRows(), listTeamMomentRows()])

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <AdminNav active="team" />

      <div className="mt-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Jamoa a&apos;zolari</h2>
          <p className="mt-1 text-sm text-slate-400">{members.length} ta a&apos;zo</p>
        </div>
        <Link
          href="/admin/team/members/new"
          className="rounded-lg bg-gradient-to-r from-avilab-accent to-avilab-glow px-4 py-2 text-sm font-medium text-white"
        >
          + Yangi a&apos;zo
        </Link>
      </div>
      <div className="mt-6">
        <MembersTable items={members} />
      </div>

      <div className="mt-14 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Jamoa lahzalari (Team Moments)</h2>
          <p className="mt-1 text-sm text-slate-400">{moments.length} ta yozuv</p>
        </div>
        <Link
          href="/admin/team/moments/new"
          className="rounded-lg bg-gradient-to-r from-avilab-accent to-avilab-glow px-4 py-2 text-sm font-medium text-white"
        >
          + Yangi lahza
        </Link>
      </div>
      <div className="mt-6">
        <MomentsTable items={moments} />
      </div>
    </main>
  )
}
