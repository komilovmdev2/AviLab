import { redirect } from "next/navigation"
import { requireAdminSession } from "@/backend/auth"
import { MomentForm } from "../../moment-form"

export default async function NewTeamMomentPage() {
  if (!(await requireAdminSession())) {
    redirect("/admin/login")
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-xl font-semibold text-white">Yangi jamoa lahzasi</h1>
      <div className="mt-6">
        <MomentForm />
      </div>
    </main>
  )
}
