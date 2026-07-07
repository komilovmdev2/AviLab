import { notFound, redirect } from "next/navigation"
import { requireAdminSession } from "@/backend/auth"
import { getTeamMemberRow } from "@/backend/team"
import { MemberForm } from "../../member-form"

type Props = { params: Promise<{ id: string }> }

export default async function EditTeamMemberPage({ params }: Props) {
  if (!(await requireAdminSession())) {
    redirect("/admin/login")
  }

  const { id } = await params
  const item = await getTeamMemberRow(id)
  if (!item) notFound()

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-xl font-semibold text-white">A&apos;zoni tahrirlash</h1>
      <div className="mt-6">
        <MemberForm initial={item} />
      </div>
    </main>
  )
}
