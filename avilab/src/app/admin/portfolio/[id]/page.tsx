import { notFound, redirect } from "next/navigation"
import { requireAdminSession } from "@/backend/auth"
import { getPortfolioRow } from "@/backend/portfolio"
import { PortfolioForm } from "../portfolio-form"

type Props = { params: Promise<{ id: string }> }

export default async function EditPortfolioItemPage({ params }: Props) {
  if (!(await requireAdminSession())) {
    redirect("/admin/login")
  }

  const { id } = await params
  const item = await getPortfolioRow(id)
  if (!item) notFound()

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-xl font-semibold text-white">Loyihani tahrirlash</h1>
      <div className="mt-6">
        <PortfolioForm initial={item} />
      </div>
    </main>
  )
}
