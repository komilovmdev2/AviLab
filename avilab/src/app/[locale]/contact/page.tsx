import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/site/footer"
import { Navbar } from "@/components/site/navbar"
import { SubpageHeader } from "@/components/site/subpage-header"
import { openGraphLocale } from "@/lib/i18n-utils"
import { languageAlternates, siteOrigin } from "@/lib/seo"
import { routing } from "@/i18n/routing"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "meta.contact" })
  const title = t("title")
  const description = t("description")

  return {
    title,
    description,
    alternates: {
      canonical: `${siteOrigin()}/${locale}/contact`,
      languages: languageAlternates("contact"),
    },
    openGraph: {
      title: `${title} | AviLab`,
      description,
      type: "website",
      locale: openGraphLocale(locale as "en" | "uz" | "ru"),
      alternateLocale: routing.locales.filter((l) => l !== locale),
      url: `${siteOrigin()}/${locale}/contact`,
      siteName: "AviLab",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | AviLab`,
      description,
    },
  }
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <SubpageHeader namespace="contact" />
        <Contact compact />
      </main>
      <Footer />
    </>
  )
}
