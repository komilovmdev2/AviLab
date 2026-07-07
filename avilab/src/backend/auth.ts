import { createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"

export const ADMIN_COOKIE_NAME = "avilab_admin_session"
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7 // 7 days

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured. Set it in .env before using the admin backend.")
  }
  return secret
}

function sign(payload: string) {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("hex")
}

export function checkAdminPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) {
    throw new Error("ADMIN_PASSWORD is not configured. Set it in .env before using the admin backend.")
  }
  const a = Buffer.from(candidate)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export function createSessionToken(): { token: string; maxAge: number } {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000
  const payload = String(expiresAt)
  const signature = sign(payload)
  return { token: `${payload}.${signature}`, maxAge: SESSION_MAX_AGE_SECONDS }
}

export function isSessionTokenValid(token: string | undefined | null): boolean {
  if (!token) return false
  const [payload, signature] = token.split(".")
  if (!payload || !signature) return false

  let expected: string
  try {
    expected = sign(payload)
  } catch {
    return false
  }

  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false

  const expiresAt = Number(payload)
  return Number.isFinite(expiresAt) && Date.now() < expiresAt
}

export async function requireAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  return isSessionTokenValid(cookieStore.get(ADMIN_COOKIE_NAME)?.value)
}
