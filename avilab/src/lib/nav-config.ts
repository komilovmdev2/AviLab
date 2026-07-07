/** Locale-aware path config for main navigation (paths are without locale prefix). */

export const mainNav = [
  { key: "home", href: "/" as const },
  { key: "services", href: "/services" as const },
  { key: "portfolio", href: "/portfolio" as const },
  { key: "team", href: { pathname: "/" as const, hash: "team" } },
  { key: "companyVideo", href: { pathname: "/" as const, hash: "company-video" } },
  { key: "contact", href: "/contact" as const },
] as const

export type MainNavKey = (typeof mainNav)[number]["key"]
