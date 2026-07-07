import Link from "next/link"

export default function AdminNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-xl font-semibold text-white">Topilmadi</h1>
      <p className="text-sm text-slate-400">So&apos;ralgan sahifa yoki yozuv mavjud emas.</p>
      <Link href="/admin/portfolio" className="text-avilab-glow hover:underline">
        Admin panelga qaytish
      </Link>
    </main>
  )
}
