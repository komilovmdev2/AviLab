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
    name: "Mukhammad Komilov",
    role: "Founder & AI Engineer",
    bio: "Passionate about building intelligent systems that solve real-world problems. Leading AI initiatives with 5+ years of experience.",
    experience: "5+ years",
    stack: ["AI", "Systems", "Next.js"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    id: "maya",
    name: "Maya Chen",
    role: "Lead UI/UX Designer",
    bio: "Creating beautiful and intuitive user experiences that delight users. Expert in design systems and motion design.",
    experience: "4+ years",
    stack: ["UI/UX", "Motion", "Design Systems"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    id: "daniel",
    name: "Daniel Okonkwo",
    role: "Cloud Architect",
    bio: "Building scalable and secure cloud infrastructure. Specialized in Kubernetes and enterprise security solutions.",
    experience: "6+ years",
    stack: ["Cloud", "Kubernetes", "Security"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    id: "sofia",
    name: "Sofia Andersson",
    role: "ML Engineer",
    bio: "Developing cutting-edge machine learning models and MLOps pipelines. Expert in LLMs and Python.",
    experience: "4+ years",
    stack: ["LLMs", "Python", "MLOps"],
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    id: "james",
    name: "James Wilson",
    role: "Full Stack Developer",
    bio: "Building robust web applications with modern technologies. Passionate about clean code and best practices.",
    experience: "5+ years",
    stack: ["React", "TypeScript", "Node.js"],
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    id: "emma",
    name: "Emma Rodriguez",
    role: "Product Manager",
    bio: "Driving product strategy and ensuring successful project delivery. Expert in analytics and user research.",
    experience: "6+ years",
    stack: ["Product", "Strategy", "Analytics"],
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    id: "ryan",
    name: "Ryan Kim",
    role: "DevOps Engineer",
    bio: "Automating deployment pipelines and managing infrastructure. Focused on CI/CD and system reliability.",
    experience: "4+ years",
    stack: ["DevOps", "CI/CD", "Infrastructure"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    social: { linkedin: "#", github: "#", twitter: "#" },
  },
] as const

export const teamGroupImages = [
  {
    id: "team1",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
    caption: "Our team collaborating on innovative projects"
  },
  {
    id: "team2",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
    caption: "Brainstorming session with the team"
  },
  {
    id: "team3",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    caption: "Team celebration after successful project launch"
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
