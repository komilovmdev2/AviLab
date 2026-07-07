import { notFound, redirect } from "next/navigation"
import { requireAdminSession } from "@/backend/auth"
import { getTeamMomentRow } from "@/backend/team"
import { MomentForm } from "../../moment-form"

type Props = { params: Promise<{ id: string }> }

export default async function EditTeamMomentPage({ params }: Props) {
  if (!(await requireAdminSession())) {
    redirect("/admin/login")
  }

  const { id } = await params
  const item = await getTeamMomentRow(id)
  if (!item) notFound()

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-xl font-semibold text-white">Lahzani tahrirlash</h1>
      <div className="mt-6">
        <MomentForm initial={item} />
      </div>
    </main>
  )
}
