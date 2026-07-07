import { redirect } from "next/navigation"
import { requireAdminSession } from "@/backend/auth"
import { getCompanyVideoRow } from "@/backend/company-video"
import { isSupabaseConfigured } from "@/backend/supabase"
import { AdminNav } from "../admin-nav"
import { CompanyVideoForm } from "./company-video-form"

export default async function AdminCompanyVideoPage() {
  if (!(await requireAdminSession())) {
    redirect("/admin/login")
  }

  if (!isSupabaseConfigured()) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-xl font-semibold text-white">Kompaniya videosi</h1>
        <p className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">
          SUPABASE_URL va SUPABASE_SERVICE_ROLE_KEY .env faylida sozlanmagan.
        </p>
      </main>
    )
  }

  const item = await getCompanyVideoRow()

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <AdminNav active="video" />
      <div className="mt-6">
        <h1 className="text-xl font-semibold text-white">Kompaniya haqida video</h1>
        <p className="mt-1 text-sm text-slate-400">
          Bosh sahifada 16:9 formatda ko&apos;rsatiladigan yagona video. Yangisini yuklasangiz, eskisi
          almashtiriladi.
        </p>
      </div>
      <div className="mt-6">
        <CompanyVideoForm initialVideoUrl={item?.video_url ?? null} />
      </div>
    </main>
  )
}
