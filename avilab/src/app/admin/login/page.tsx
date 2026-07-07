import { redirect } from "next/navigation"
import { requireAdminSession } from "@/backend/auth"
import { LoginForm } from "./login-form"

export default async function AdminLoginPage() {
  if (await requireAdminSession()) {
    redirect("/admin/portfolio")
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
        <h1 className="text-lg font-semibold text-white">AviLab Admin</h1>
        <p className="mt-1 text-sm text-slate-400">Portfolio boshqaruv paneliga kirish</p>
        <LoginForm />
      </div>
    </main>
  )
}
