import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { About } from "@/components/sections/about"
import { ApplicationForm } from "@/components/sections/application-form"
import { CompanyVideo } from "@/components/sections/company-video"
import { Contact } from "@/components/sections/contact"
import { FAQ } from "@/components/sections/faq"
import { Hero } from "@/components/sections/hero"
import { Portfolio } from "@/components/sections/portfolio"
import { Pricing } from "@/components/sections/pricing"
import { Process } from "@/components/sections/process"
import { Services } from "@/components/sections/services"
import { Team } from "@/components/sections/team"
import { Technologies } from "@/components/sections/technologies"
import { Testimonials } from "@/components/sections/testimonials"
import { TrustedCompanies } from "@/components/sections/trusted-companies"
import { Footer } from "@/components/site/footer"
import { Navbar } from "@/components/site/navbar"
import { openGraphLocale } from "@/lib/i18n-utils"
import { languageAlternates, siteOrigin } from "@/lib/seo"
import { routing } from "@/i18n/routing"
import { getPublicPortfolioForLocale } from "@/lib/portfolio-data"
import { getPublicTeamData } from "@/lib/team-data"
import { getPublicCompanyVideoUrl } from "@/lib/company-video-data"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "meta.home" })
  const title = t("title")
  const description = t("description")
  const keywords = t("keywords")
  const ogTitle = t("ogTitle")
  const ogDescription = t("ogDescription")
  const twitterTitle = t("twitterTitle")
  const twitterDescription = t("twitterDescription")

  return {
    title,
    description,
    keywords: keywords.split(",").map((k) => k.trim()),
    alternates: {
      canonical: `${siteOrigin()}/${locale}`,
      languages: languageAlternates(""),
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: "website",
      locale: openGraphLocale(locale as "en" | "uz" | "ru"),
      alternateLocale: routing.locales.filter((l) => l !== locale),
      url: `${siteOrigin()}/${locale}`,
      siteName: "AviLab",
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
    },
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const portfolioItems = await getPublicPortfolioForLocale(locale)
  const { members: teamMembers, moments: teamMoments } = await getPublicTeamData()
  const companyVideoUrl = await getPublicCompanyVideoUrl()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* <TrustedCompanies /> */}
        <Services />
        <About />
        <Technologies />
        <Portfolio items={portfolioItems} />
        <Process />
        <Team members={teamMembers} moments={teamMoments} />
        <CompanyVideo videoUrl={companyVideoUrl} />
        {/* <Testimonials /> */}
        {/* <Pricing /> */}
        <FAQ />
        <ApplicationForm />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
