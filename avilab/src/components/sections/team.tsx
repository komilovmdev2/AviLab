"use client"

import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import Image from "next/image"
import { AtSign, Code2, Share2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { teamMembers } from "@/lib/site-config"

export function Team() {
  const t = useTranslations("team")

  return (
    <section id="team" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            className="text-xs font-medium tracking-[0.25em] text-avilab-glow uppercase"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t("eyebrow")}
          </motion.span>
          <motion.h2
            className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t("title")}
          </motion.h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamCard({
  member,
  index,
}: {
  member: (typeof teamMembers)[number]
  index: number
}) {
  const t = useTranslations("team")
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${mx}px ${my}px, rgb(56 189 248 / 0.22), transparent 65%)`

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_0_0_1px_rgb(255_255_255/0.04)_inset] backdrop-blur-xl"
      style={{ perspective: 900 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(e.clientX - r.left)
        my.set(e.clientY - r.top)
      }}
      whileHover={{ rotateX: 4, rotateY: -4 }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={{ backgroundImage: spotlight }}
      />
      <div className="relative overflow-hidden rounded-xl">
        <Image
          src={member.image}
          alt={member.name}
          width={400}
          height={480}
          className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-80" />
      </div>
      <div className="relative mt-4">
        <h3 className="font-heading text-lg font-semibold text-white">{member.name}</h3>
        <p className="text-sm text-avilab-glow">{t(`members.${member.id}.role`)}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {member.stack.map((s) => (
            <span
              key={s}
              className="rounded-md border border-white/10 bg-black/30 px-2 py-0.5 text-[10px] text-slate-300"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <Link
            href={member.social.linkedin}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-avilab-glow/40 hover:text-white"
            aria-label={t("socialLinkedIn")}
          >
            <Share2 className="size-4" />
          </Link>
          <Link
            href={member.social.github}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-avilab-glow/40 hover:text-white"
            aria-label={t("socialGitHub")}
          >
            <Code2 className="size-4" />
          </Link>
          <Link
            href={member.social.twitter}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-avilab-glow/40 hover:text-white"
            aria-label={t("socialTwitter")}
          >
            <AtSign className="size-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
