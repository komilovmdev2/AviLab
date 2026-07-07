import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { ADMIN_COOKIE_NAME, checkAdminPassword, createSessionToken } from "@/backend/auth"

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const password = typeof body?.password === "string" ? body.password : ""

  let valid: boolean
  try {
    valid = password.length > 0 && checkAdminPassword(password)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Admin auth is not configured" }, { status: 500 })
  }

  if (!valid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  }

  const { token, maxAge } = createSessionToken()
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  })

  return NextResponse.json({ ok: true })
}
