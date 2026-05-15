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

export type PortfolioCategoryId = "ai" | "web" | "mobile" | "design" | "enterprise"

export const portfolioItems = [
  {
    id: "nexusAi",
    category: "ai" satisfies PortfolioCategoryId,
    stack: ["OpenAI", "Next.js", "Python", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&q=80",
  },
  {
    id: "pulseAnalytics",
    category: "web",
    stack: ["React", "Node.js", "AWS", "Docker"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
  },
  {
    id: "orbitMobile",
    category: "mobile",
    stack: ["Flutter", "Kotlin", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80",
  },
  {
    id: "lumenDesign",
    category: "design",
    stack: ["Figma", "Framer", "Motion"],
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=80",
  },
  {
    id: "vertexErp",
    category: "enterprise",
    stack: ["Next.js", "Kubernetes", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
  },
  {
    id: "helixVision",
    category: "ai",
    stack: ["TensorFlow", "Python", "AWS"],
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&q=80",
  },
] as const

export const teamMembers = [
  {
    id: "alex",
    name: "Alex Rivera",
    stack: ["AI", "Systems", "Next.js"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    id: "maya",
    name: "Maya Chen",
    stack: ["UI/UX", "Motion", "Design Systems"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    id: "daniel",
    name: "Daniel Okonkwo",
    stack: ["Cloud", "Kubernetes", "Security"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    id: "sofia",
    name: "Sofia Andersson",
    stack: ["LLMs", "Python", "MLOps"],
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
] as const

export const achievementItems = [
  { id: "aiSummit", year: "2025" },
  { id: "awsPartner", year: "2024" },
  { id: "hackathon", year: "2024" },
  { id: "iso27001", year: "2023" },
  { id: "fortune500", year: "2023" },
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
