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
    name: "Abdurasulov Abdulla",
    role: "Founder & AI Engineer",
    bio: "Visionary leader with a passion for AI innovation. Experienced in building scalable AI solutions and leading high-performing teams.",
    experience: "5+ years",
    stack: ["AI", "Systems", "Leadership"],
    image: "/abdulla.jpg",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    id: "maya",
    name: "Akbar Satipov",
    role: "Full Stack developer",
    bio: "Skilled full stack developer with expertise in Python, Django, and modern web technologies. Passionate about building impactful software solutions.",
    experience: "6+ years",
    stack: ["Python", "Django", "AI", "React", "Next.js", "Figma", "Framer", "Motion"],
    image: "/akbar.jpeg",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    id: "daniel",
    name: "Shahzod Jumanazarov",
    role: "Backend developer",
    bio: "Building scalable and secure cloud infrastructure. Specialized in Kubernetes and enterprise security solutions.",
    experience: "3+ years",
    stack: ["Python", "HTML", "Ract", "Next.js", "AWS", "Kubernetes"],
    image: "/shox.jpg",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    id: "sofia",
    name: "Azizbek Atoyev",
    role: "ML Engineer",
    bio: "Developing cutting-edge machine learning models and MLOps pipelines. Expert in LLMs and Python.",
    experience: "2+ years",
    stack: ["LLMs", "Python", "MLOps"],
    image: "/azizbek.jpeg",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    id: "james",
    name: "Mukhammad Komilov",
    role: "Full Stack Developer",
    bio: "Building robust web applications with modern technologies. Passionate about clean code and best practices.",
    experience: "6+ years",
    stack: ["React", "TypeScript", "Node.js"],
    image: "/mukhammad.JPG",
    social: { linkedin: "#", github: "#", twitter: "#" },
  }
] as const

export const teamGroupImages = [
  {
    id: "team1",
    image: "/team1.jpg",
    caption: "Ai national hackaton winners 2025 with our CEO Abdurasulov Abdulla in the middle"
  },
  {
    id: "team2",
    image: "/team2.jpg",
    caption: "Central Asian Unversity Ai hackathon winners 2026 with our CEO Abdurasulov Abdulla on the right"
  },
  {
    id: "team3",
    image: "/team3.jpg",
    caption: "Global startup award ceremony 2024 with our CEO Abdurasulov Abdulla on the left"
  },
  {
    id: "team4",
    image: "/team4.jpg",
    caption: "Team building activity at the park"
  }
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
