import { redirect } from "next/navigation"
import { requireAdminSession } from "@/backend/auth"
import { PortfolioForm } from "../portfolio-form"

export default async function NewPortfolioItemPage() {
  if (!(await requireAdminSession())) {
    redirect("/admin/login")
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-xl font-semibold text-white">Yangi loyiha</h1>
      <div className="mt-6">
        <PortfolioForm />
      </div>
    </main>
  )
}
