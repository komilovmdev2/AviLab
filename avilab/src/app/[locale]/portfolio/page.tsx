import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { Portfolio } from "@/components/sections/portfolio"
import { Footer } from "@/components/site/footer"
import { Navbar } from "@/components/site/navbar"
import { SubpageHeader } from "@/components/site/subpage-header"
import { openGraphLocale } from "@/lib/i18n-utils"
import { languageAlternates, siteOrigin } from "@/lib/seo"
import { routing } from "@/i18n/routing"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "meta.portfolio" })
  const title = t("title")
  const description = t("description")

  return {
    title,
    description,
    alternates: {
      canonical: `${siteOrigin()}/${locale}/portfolio`,
      languages: languageAlternates("portfolio"),
    },
    openGraph: {
      title: `${title} | AviLab`,
      description,
      type: "website",
      locale: openGraphLocale(locale as "en" | "uz" | "ru"),
      alternateLocale: routing.locales.filter((l) => l !== locale),
      url: `${siteOrigin()}/${locale}/portfolio`,
      siteName: "AviLab",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | AviLab`,
      description,
    },
  }
}

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main>
        <SubpageHeader namespace="portfolio" />
        <Portfolio compact />
      </main>
      <Footer />
    </>
  )
}
