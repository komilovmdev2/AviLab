export type PortfolioCategoryId = "ai" | "web" | "mobile" | "design" | "enterprise"

export const portfolioCategories: PortfolioCategoryId[] = [
  "ai",
  "web",
  "mobile",
  "design",
  "enterprise",
]

export type PortfolioItemRow = {
  id: string
  category: PortfolioCategoryId
  title_uz: string
  title_ru: string
  title_en: string
  description_uz: string | null
  description_ru: string | null
  description_en: string | null
  stack: string[]
  project_url: string | null
  video_url: string | null
  video_path: string | null
  thumbnail_url: string | null
  thumbnail_path: string | null
  sort_order: number
  published: boolean
  created_at: string
  updated_at: string
}

/** Locale-resolved shape handed to the public site. */
export type PortfolioItem = {
  id: string
  category: PortfolioCategoryId
  title: string
  description: string | null
  stack: string[]
  projectUrl: string | null
  videoUrl: string | null
  thumbnailUrl: string | null
  sortOrder: number
  published: boolean
}

export type PortfolioLocale = "uz" | "ru" | "en"

export function toPublicPortfolioItem(row: PortfolioItemRow, locale: PortfolioLocale): PortfolioItem {
  const titleKey = `title_${locale}` as const
  const descriptionKey = `description_${locale}` as const
  return {
    id: row.id,
    category: row.category,
    title: row[titleKey] || row.title_en,
    description: row[descriptionKey] ?? row.description_en,
    stack: row.stack ?? [],
    projectUrl: row.project_url,
    videoUrl: row.video_url,
    thumbnailUrl: row.thumbnail_url,
    sortOrder: row.sort_order,
    published: row.published,
  }
}

export type TeamMemberRow = {
  id: string
  name: string
  role: string
  bio: string | null
  experience: string | null
  stack: string[]
  image_url: string | null
  image_path: string | null
  linkedin_url: string | null
  github_url: string | null
  twitter_url: string | null
  sort_order: number
  published: boolean
  created_at: string
  updated_at: string
}

export type TeamMomentRow = {
  id: string
  caption: string | null
  image_url: string | null
  image_path: string | null
  video_url: string | null
  video_path: string | null
  sort_order: number
  published: boolean
  created_at: string
  updated_at: string
}

export type CompanyVideoRow = {
  id: string
  video_url: string | null
  video_path: string | null
  updated_at: string
}
