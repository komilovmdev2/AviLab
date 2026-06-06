/** Structural / media config only — all user-facing copy lives in `messages/{locale}.json`. */

import avishifo from "../../public/avishifo.png"
import aviRadiolog from "../../public/aviradiolog.png"
import avifitness from "../../public/avifitness.png"
import cleanway from "../../public/cleanway.png"
import shifogo from "../../public/shifogo.png"
import medInstitute from "../../public/med.png"

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
    image: avishifo,
    url: "https://www.avishifo.uz/",
  },
  {
    id: "pulseAnalytics",
    category: "ai",
    stack: ["React", "Node.js", "AWS", "Docker"],
    image: aviRadiolog,
    url: "https://www.aviradiology.uz",
  },
  {
    id: "orbitMobile",
    category: "mobile",
    stack: ["Flutter", "Kotlin", "PostgreSQL"],
    image: avifitness,
    url: "https://www.avifitness.uz",
  },
  {
    id: "lumenDesign",
    category: "web",
    stack: ["Figma", "Framer", "Motion"],
    image: cleanway,
    url: "https://cleanway.4mi.uz/login",
  },
  {
    id: "vertexErp",
    category: "web",
    stack: ["Next.js", "Kubernetes", "PostgreSQL"],
    image: shifogo,
    url: "https://shifogo.arkzone.uz",
  },
  {
    id: "helixVision",
    category: "web",
    stack: ["TensorFlow", "Python", "AWS"],
    image: medInstitute,
    url: "https://www.urdtiyoshlar.uz",
  },
] as const

export const teamMembers = [
  {
    id: "alex",
    name: "Abdurasulov Abdulla",
    role: "Founder & Data Scientist",
    bio: "Visionary leader with a passion for AI innovation. Experienced in building scalable AI solutions and leading high-performing teams.",
    experience: "5+ years",
    stack: ["AI", "Systems", "Leadership", "Python", "MLOps"],
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
    experience: "4+ years",
    stack: ["Python", "Aiogram", "React", "Next.js", "AWS", "Kubernetes"],
    image: "/shox.jpg",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    id: "sofia",
    name: "Azizbek Atoyev",
    role: "Data Scientist & MLOps Engineer",
    bio: "Technical visionary with expertise in AI architecture and MLOps. Leading the development of cutting-edge AI solutions that drive business value.",
    experience: "6+ years",
    stack: ["LLMs", "Python", "MLOps", "AI"],
    image: "/azizbek.jpeg",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    id: "james",
    name: "Mukhammad Komilov",
    role: "Designer & Frontend Developer",
    bio: "Creating beautiful and intuitive user experiences that delight users. Expert in design systems and motion design.",
    experience: "6+ years",
    stack: ["React", "TypeScript", "Node.js", "Figma", "Framer", "Motion"],
    image: "/mukhammad.JPG",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    id: "emma",
    name: "Alibek Jumanyazov",
    role: "Frontend Developer",
    bio: "Exploring the frontiers of AI research to develop innovative solutions. Specialized in natural language processing and deep learning.",
    experience: "4+ years",
    stack: ["React", "Next.js", "TypeScript", "Python", "TensorFlow"],
    image: "/alibek2.jpg",
    social: { linkedin: "#", github: "#", twitter: "#" },
  }
] as const

export const teamGroupImages = [
  {
    id: "team1",
    image: "/team1.jpg",
    caption: "Ai national hackaton 2026. Samarqand Uzbekistan"
  },
  {
    id: "team2",
    image: "/team2.jpg",
    caption: "Central Asian Unversity Ai hackathon 2026. Tashkent Uzbekistan"
  },
  {
    id: "team3",
    image: "/team3.jpg",
    caption: "Global startup award 2025. Tashkent Uzbekistan"
  },
  {
    id: "team4",
    image: "/team4.jpg",
    caption: "Innoweek 2024. Tashkent Uzbekistan"
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
