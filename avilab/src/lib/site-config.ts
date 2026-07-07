/** Structural / media config only — all user-facing copy lives in `messages/{locale}.json`. */

export const serviceItems = [
  { id: "aiDev", icon: "Brain" },
  { id: "webDev", icon: "Globe" },
  { id: "mobile", icon: "Smartphone" },
  { id: "uiux", icon: "Palette" },
  { id: "crmErp", icon: "Building2" },
  { id: "telegramBots", icon: "Send" },
  { id: "saas", icon: "Layers" },
  { id: "cloud", icon: "Cloud" },
  { id: "branding", icon: "Sparkles" },
  { id: "security", icon: "Shield" },
] as const

export const testimonialItems = [
  {
    id: "jordan",
    name: "Jordan Lee",
    company: "Northwind",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  {
    id: "elena",
    name: "Elena Vasquez",
    company: "Lumen",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
  },
  {
    id: "marcus",
    name: "Marcus Webb",
    company: "Atlas Commerce",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&q=80",
  },
] as const

export const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Flutter",
  "TensorFlow",
  "PostgreSQL",
  "Docker",
  "AWS",
  "OpenAI",
  "Kubernetes",
] as const

export const trustedLogos = [
  "Vertex",
  "Northwind",
  "Lumen",
  "Atlas",
  "Helix",
  "Pulse",
  "Orbit",
  "Nexus",
] as const

export const processStepIds = [
  "discovery",
  "planning",
  "design",
  "development",
  "testing",
  "deployment",
] as const

export const faqIds = [
  "timelines",
  "pricing",
  "technologies",
  "support",
  "maintenance",
  "ai",
] as const

export const pricingPlanIds = ["startup", "business", "enterprise"] as const

export const applicationBudgets = [
  "tier1",
  "tier2",
  "tier3",
  "tier4",
  "tierUnsure",
] as const
