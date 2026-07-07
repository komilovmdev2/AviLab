import Link from "next/link"
import { redirect } from "next/navigation"
import { requireAdminSession } from "@/backend/auth"
import { listPortfolioRows } from "@/backend/portfolio"
import { isSupabaseConfigured } from "@/backend/supabase"
import { AdminNav } from "../admin-nav"
import { PortfolioTable } from "./portfolio-table"

export default async function AdminPortfolioPage() {
  if (!(await requireAdminSession())) {
    redirect("/admin/login")
  }

  if (!isSupabaseConfigured()) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-xl font-semibold text-white">Portfolio</h1>
        <p className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">
          SUPABASE_URL va SUPABASE_SERVICE_ROLE_KEY .env faylida sozlanmagan. Avval backend/schema.sql
          faylini Supabase loyihangizda ishga tushiring va .env ni to&apos;ldiring.
        </p>
      </main>
    )
  }

  const items = await listPortfolioRows()

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <AdminNav active="portfolio" />
      <div className="mt-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Portfolio</h1>
          <p className="mt-1 text-sm text-slate-400">{items.length} ta loyiha</p>
        </div>
        <Link
          href="/admin/portfolio/new"
          className="rounded-lg bg-gradient-to-r from-avilab-accent to-avilab-glow px-4 py-2 text-sm font-medium text-white"
        >
          + Yangi loyiha
        </Link>
      </div>

      <div className="mt-8">
        <PortfolioTable items={items} />
      </div>
    </main>
  )
}
