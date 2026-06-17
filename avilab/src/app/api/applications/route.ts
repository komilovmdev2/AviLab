import { NextResponse } from "next/server"
import { z } from "zod"

const applicationSchema = z.object({
  fullName: z.string().min(2),
  companyName: z.string().min(1),
  telegramUsername: z.string().min(1),
  phone: z.string().trim().min(9).regex(/^[\d\s+\-()]+$/),
  email: z.string().email(),
  serviceType: z.string().min(1),
  budget: z.string().optional(),
  deadline: z.string().min(1),
  projectDescription: z.string().min(10),
})

type ApplicationData = z.infer<typeof applicationSchema>

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}

function getTelegramAdminIds(): string[] {
  const raw = process.env.TELEGRAM_ADMIN_IDS ?? process.env.TELEGRAM_CHAT_ID ?? ""
  return raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean)
}

function formatTelegramMessage(data: ApplicationData, fileName: string | null) {
  const lines = [
    "<b>🆕 Yangi AviLab arizasi</b>",
    "",
    `<b>Ism:</b> ${escapeHtml(data.fullName)}`,
    `<b>Kompaniya:</b> ${escapeHtml(data.companyName)}`,
    `<b>Telegram:</b> ${escapeHtml(data.telegramUsername)}`,
    `<b>Telefon:</b> ${escapeHtml(data.phone)}`,
    `<b>Email:</b> ${escapeHtml(data.email)}`,
    `<b>Xizmat:</b> ${escapeHtml(data.serviceType)}`,
    `<b>Muddat:</b> ${escapeHtml(data.deadline)}`,
    `<b>Tavsif:</b> ${escapeHtml(data.projectDescription)}`,
  ]

  if (data.budget) {
    lines.splice(8, 0, `<b>Byudjet:</b> ${escapeHtml(data.budget)}`)
  }
  if (fileName) lines.push("", `<b>Fayl:</b> ${escapeHtml(fileName)}`)

  return lines.join("\n")
}

async function sendTelegramMessage(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const adminIds = getTelegramAdminIds()
  if (!token || adminIds.length === 0) {
    return { ok: false as const, skipped: true as const }
  }

  const results = await Promise.all(
    adminIds.map(async (chatId) => {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        console.error(`Telegram sendMessage failed for ${chatId}:`, err)
        return false
      }

      return true
    })
  )

  return {
    ok: results.some(Boolean),
    skipped: false as const,
  }
}

async function sendTelegramDocument(token: string, chatId: string, file: File) {
  const form = new FormData()
  form.set("chat_id", chatId)
  form.set("document", file, file.name)
  const res = await fetch(`https://api.telegram.org/bot${token}/sendDocument`, {
    method: "POST",
    body: form,
  })
  if (!res.ok) console.error(`Telegram sendDocument failed for ${chatId}:`, await res.text())
}

async function saveToSupabaseRow(data: ApplicationData, fileName: string | null) {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return

  const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/project_applications`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      ...data,
      attachment_name: fileName,
      created_at: new Date().toISOString(),
    }),
  })
  if (!res.ok) console.error("Supabase insert failed:", await res.text())
}

async function sendEmailNotification(data: ApplicationData, fileName: string | null) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.NOTIFICATION_EMAIL
  const from = process.env.RESEND_FROM ?? "AviLab <onboarding@resend.dev>"
  if (!apiKey || !to) return

  const html = `
    <h2>New AviLab application</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.fullName)}</p>
    <p><strong>Company:</strong> ${escapeHtml(data.companyName)}</p>
    <p><strong>Telegram:</strong> ${escapeHtml(data.telegramUsername)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Service:</strong> ${escapeHtml(data.serviceType)}</p>
    ${data.budget ? `<p><strong>Budget:</strong> ${escapeHtml(data.budget)}</p>` : ""}
    <p><strong>Deadline:</strong> ${escapeHtml(data.deadline)}</p>
    <p><strong>Description:</strong></p>
    <p>${escapeHtml(data.projectDescription)}</p>
    ${fileName ? `<p><strong>Attachment:</strong> ${escapeHtml(fileName)}</p>` : ""}
  `

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New AviLab lead: ${data.fullName}`,
      html,
    }),
  })
  if (!res.ok) console.error("Resend email failed:", await res.text())
}

export async function POST(req: Request) {
  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 })
  }

  const raw = {
    fullName: String(formData.get("fullName") ?? ""),
    companyName: String(formData.get("companyName") ?? ""),
    telegramUsername: String(formData.get("telegramUsername") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    serviceType: String(formData.get("serviceType") ?? ""),
    budget: String(formData.get("budget") ?? "").trim() || undefined,
    deadline: String(formData.get("deadline") ?? ""),
    projectDescription: String(formData.get("projectDescription") ?? ""),
  }

  const parsed = applicationSchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 })
  }

  const file = formData.get("file")
  const attachment = file instanceof File && file.size > 0 ? file : null
  const fileName = attachment ? attachment.name : null

  const message = formatTelegramMessage(parsed.data, fileName)
  const tg = await sendTelegramMessage(message)

  const token = process.env.TELEGRAM_BOT_TOKEN
  const adminIds = getTelegramAdminIds()
  if (attachment && token && adminIds.length > 0 && attachment.size <= 15 * 1024 * 1024) {
    await Promise.all(adminIds.map((chatId) => sendTelegramDocument(token, chatId, attachment)))
  }

  await saveToSupabaseRow(parsed.data, fileName)
  await sendEmailNotification(parsed.data, fileName)

  if (!tg.skipped && !tg.ok) {
    return NextResponse.json(
      { error: "Could not deliver notification. Check Telegram credentials." },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
