// One-off migration script: pushes the site's previously-hardcoded portfolio,
// team member, and team moment data into Supabase, uploading the matching
// images from /public along the way.
//
// Usage (from the `avilab` folder):
//   node --env-file=.env backend/seed.mjs

import { readFile } from "node:fs/promises"
import path from "node:path"

const SUPABASE_URL = process.env.SUPABASE_URL?.replace(/\/$/, "")
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY is not set. Run with --env-file=.env")
  process.exit(1)
}

const PUBLIC_DIR = path.resolve(process.cwd(), "public")

function mimeFor(ext) {
  const map = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg" }
  return map[ext.toLowerCase()] ?? "application/octet-stream"
}

async function restInsert(table, row) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(row),
  })
  if (!res.ok) throw new Error(`Insert into ${table} failed: ${res.status} ${await res.text()}`)
  const rows = await res.json()
  return rows[0]
}

async function restUpdate(table, id, patch) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(patch),
  })
  if (!res.ok) throw new Error(`Update ${table} ${id} failed: ${res.status} ${await res.text()}`)
  const rows = await res.json()
  return rows[0]
}

async function restCount(table) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=id`, {
    headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
  })
  if (!res.ok) throw new Error(`Count ${table} failed: ${res.status} ${await res.text()}`)
  const rows = await res.json()
  return rows.length
}

async function uploadFile(bucket, itemId, field, localPath) {
  const buf = await readFile(localPath)
  const ext = path.extname(localPath)
  const safeName = path.basename(localPath).replace(/[^a-zA-Z0-9_.-]/g, "_")
  const objectPath = `${itemId}/${field}-${Date.now()}-${safeName}`
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucket}/${objectPath}`, {
    method: "POST",
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": mimeFor(ext),
      "x-upsert": "true",
    },
    body: buf,
  })
  if (!res.ok) throw new Error(`Upload ${localPath} failed: ${res.status} ${await res.text()}`)
  return { url: `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${objectPath}`, path: objectPath }
}

const portfolioSeed = [
  {
    image: "avishifo.png",
    category: "ai",
    stack: ["OpenAI", "Next.js", "Python", "PostgreSQL"],
    url: "https://www.avishifo.uz/",
    title: { uz: "AviShifo", ru: "AviShifo", en: "AviShifo" },
  },
  {
    image: "aviradiolog.png",
    category: "ai",
    stack: ["React", "Node.js", "AWS", "Docker"],
    url: "https://www.aviradiology.uz",
    title: { uz: "AviRadiology", ru: "AviRadiology", en: "AviRadiology" },
  },
  {
    image: "avifitness.png",
    category: "mobile",
    stack: ["Flutter", "Kotlin", "PostgreSQL"],
    url: "https://www.avifitness.uz",
    title: { uz: "AviFitness", ru: "AviFitness", en: "AviFitness" },
  },
  {
    image: "cleanway.png",
    category: "web",
    stack: ["Figma", "Framer", "Motion"],
    url: "https://cleanway.4mi.uz/login",
    title: { uz: "CleanWay", ru: "CleanWay", en: "CleanWay" },
  },
  {
    image: "shifogo.png",
    category: "web",
    stack: ["Next.js", "Kubernetes", "PostgreSQL"],
    url: "https://shifogo.arkzone.uz",
    title: { uz: "ShifoGO", ru: "ShifoGO", en: "ShifoGO" },
  },
  {
    image: "med.png",
    category: "web",
    stack: ["TensorFlow", "Python", "AWS"],
    url: "https://www.urdtiyoshlar.uz",
    title: { uz: "Med instituti", ru: "Медицинский институт", en: "Med Institute" },
  },
]

const teamMemberSeed = [
  {
    image: "abdulla.jpg",
    name: "Abdurasulov Abdulla",
    role: "Founder & Data Scientist",
    bio: "Visionary leader with a passion for AI innovation. Experienced in building scalable AI solutions and leading high-performing teams.",
    experience: "5+ years",
    stack: ["AI", "Systems", "Leadership", "Python", "MLOps"],
  },
  {
    image: "akbar.jpeg",
    name: "Akbar Satipov",
    role: "Full Stack developer",
    bio: "Skilled full stack developer with expertise in Python, Django, and modern web technologies. Passionate about building impactful software solutions.",
    experience: "6+ years",
    stack: ["Python", "Django", "AI", "React", "Next.js", "Figma", "Framer", "Motion"],
  },
  {
    image: "shox.jpg",
    name: "Shahzod Jumanazarov",
    role: "Backend developer",
    bio: "Building scalable and secure cloud infrastructure. Specialized in Kubernetes and enterprise security solutions.",
    experience: "4+ years",
    stack: ["Python", "Aiogram", "React", "Next.js", "AWS", "Kubernetes"],
  },
  {
    image: "azizbek.jpeg",
    name: "Azizbek Atoyev",
    role: "Data Scientist & MLOps Engineer",
    bio: "Technical visionary with expertise in AI architecture and MLOps. Leading the development of cutting-edge AI solutions that drive business value.",
    experience: "6+ years",
    stack: ["LLMs", "Python", "MLOps", "AI"],
  },
  {
    image: "mukhammad.JPG",
    name: "Mukhammad Komilov",
    role: "Designer & Frontend Developer",
    bio: "Creating beautiful and intuitive user experiences that delight users. Expert in design systems and motion design.",
    experience: "6+ years",
    stack: ["React", "TypeScript", "Node.js", "Figma", "Framer", "Motion"],
  },
  {
    image: "alibek2.jpg",
    name: "Alibek Jumanyazov",
    role: "Frontend Developer",
    bio: "Exploring the frontiers of AI research to develop innovative solutions. Specialized in natural language processing and deep learning.",
    experience: "4+ years",
    stack: ["React", "Next.js", "TypeScript", "Python", "TensorFlow"],
  },
]

const teamMomentSeed = [
  { image: "team1.jpg", caption: "Ai national hackaton 2026. Samarqand Uzbekistan" },
  { image: "team2.jpg", caption: "Central Asian Unversity Ai hackathon 2026. Tashkent Uzbekistan" },
  { image: "team3.jpg", caption: "Global startup award 2025. Tashkent Uzbekistan" },
  { image: "team4.jpg", caption: "Innoweek 2024. Tashkent Uzbekistan" },
]

async function seedPortfolio() {
  const existing = await restCount("portfolio_items")
  if (existing > 0) {
    console.log(`portfolio_items already has ${existing} row(s) — skipping.`)
    return
  }
  for (const [i, item] of portfolioSeed.entries()) {
    const row = await restInsert("portfolio_items", {
      category: item.category,
      title_uz: item.title.uz,
      title_ru: item.title.ru,
      title_en: item.title.en,
      stack: item.stack,
      project_url: item.url,
      sort_order: i,
      published: true,
    })
    const uploaded = await uploadFile(
      "portfolio-media",
      row.id,
      "thumbnail",
      path.join(PUBLIC_DIR, item.image)
    )
    await restUpdate("portfolio_items", row.id, {
      thumbnail_url: uploaded.url,
      thumbnail_path: uploaded.path,
    })
    console.log(`  + portfolio: ${item.title.en}`)
  }
}

async function seedTeamMembers() {
  const existing = await restCount("team_members")
  if (existing > 0) {
    console.log(`team_members already has ${existing} row(s) — skipping.`)
    return
  }
  for (const [i, member] of teamMemberSeed.entries()) {
    const row = await restInsert("team_members", {
      name: member.name,
      role: member.role,
      bio: member.bio,
      experience: member.experience,
      stack: member.stack,
      sort_order: i,
      published: true,
    })
    const uploaded = await uploadFile("site-media", row.id, "member-photo", path.join(PUBLIC_DIR, member.image))
    await restUpdate("team_members", row.id, { image_url: uploaded.url, image_path: uploaded.path })
    console.log(`  + team member: ${member.name}`)
  }
}

async function seedTeamMoments() {
  const existing = await restCount("team_moments")
  if (existing > 0) {
    console.log(`team_moments already has ${existing} row(s) — skipping.`)
    return
  }
  for (const [i, moment] of teamMomentSeed.entries()) {
    const row = await restInsert("team_moments", {
      caption: moment.caption,
      sort_order: i,
      published: true,
    })
    const uploaded = await uploadFile("site-media", row.id, "moment-image", path.join(PUBLIC_DIR, moment.image))
    await restUpdate("team_moments", row.id, { image_url: uploaded.url, image_path: uploaded.path })
    console.log(`  + team moment: ${moment.caption}`)
  }
}

async function main() {
  console.log("Seeding portfolio_items...")
  await seedPortfolio()
  console.log("Seeding team_members...")
  await seedTeamMembers()
  console.log("Seeding team_moments...")
  await seedTeamMoments()
  console.log("Done.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
