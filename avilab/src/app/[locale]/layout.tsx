import type { Metadata } from "next"
import { Geist_Mono, Inter, Manrope } from "next/font/google"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { AIChatWidget } from "@/components/effects/ai-chat-widget"
import { CustomCursor } from "@/components/effects/custom-cursor"
import { NoiseOverlay } from "@/components/effects/noise-overlay"
import { PageLoader } from "@/components/effects/page-loader"
import { routing } from "@/i18n/routing"
import { getTextDirection } from "@/lib/i18n-utils"
import { siteOrigin } from "@/lib/seo"

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  variable: "--font-inter",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  variable: "--font-manrope",
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    return {}
  }

  return {
    metadataBase: new URL(siteOrigin()),
    title: { default: "AviLab", template: "%s | AviLab" },
    robots: { index: true, follow: true },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()
  const dir = getTextDirection(locale)

  return (
    <html
      lang={locale}
      dir={dir}
      className={`dark ${inter.variable} ${manrope.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          <PageLoader />
          <NoiseOverlay />
          {children}
          <CustomCursor />
          <AIChatWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
