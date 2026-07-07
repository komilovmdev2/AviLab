import type { Metadata } from "next"
import "@/app/globals.css"

export const metadata: Metadata = {
  title: "AviLab Admin",
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark h-full">
      <body className="min-h-full bg-[#050816] text-slate-100 antialiased">{children}</body>
    </html>
  )
}
