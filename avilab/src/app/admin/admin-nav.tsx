import Link from "next/link"
import { LogoutButton } from "./logout-button"

type ActiveSection = "portfolio" | "team" | "video"

export function AdminNav({ active }: { active: ActiveSection }) {
  const linkClass = (key: ActiveSection) =>
    key === active ? "text-white" : "text-slate-400 hover:text-white"

  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-4">
      <nav className="flex gap-5 text-sm font-medium">
        <Link href="/admin/portfolio" className={linkClass("portfolio")}>
          Portfolio
        </Link>
        <Link href="/admin/team" className={linkClass("team")}>
          Jamoa
        </Link>
        <Link href="/admin/company-video" className={linkClass("video")}>
          Kompaniya videosi
        </Link>
      </nav>
      <LogoutButton />
    </div>
  )
}
