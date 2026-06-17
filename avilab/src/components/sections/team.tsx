"use client"

import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import Image from "next/image"
import { AtSign, Code2, Share2, Users, Award, Target } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { teamMembers, teamGroupImages } from "@/lib/site-config"

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
          <motion.p
            className="mt-4 text-slate-400"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t("description")}
          </motion.p>
        </div>

        {/* Team Stats */}
        <motion.div
          className="mt-12 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center">
            <Users className="mx-auto mb-2 size-8 text-avilab-glow" />
            <p className="font-heading text-2xl font-semibold text-white">{teamMembers.length}+</p>
            <p className="text-sm text-slate-400">Team Members</p>
          </div>
          <div className="text-center">
            <Award className="mx-auto mb-2 size-8 text-avilab-glow" />
            <p className="font-heading text-2xl font-semibold text-white">50+</p>
            <p className="text-sm text-slate-400">Projects Delivered</p>
          </div>
          <div className="text-center">
            <Target className="mx-auto mb-2 size-8 text-avilab-glow" />
            <p className="font-heading text-2xl font-semibold text-white">5+</p>
            <p className="text-sm text-slate-400">Years Experience</p>
          </div>
          <div className="text-center">
            <Users className="mx-auto mb-2 size-8 text-avilab-glow" />
            <p className="font-heading text-2xl font-semibold text-white">100%</p>
            <p className="text-sm text-slate-400">Client Satisfaction</p>
          </div>
        </motion.div>

        {/* Team Members Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teamMembers.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>

        {/* Team Group Photos */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="mb-8 font-heading text-2xl font-semibold text-white text-center">
            Team Moments
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {teamGroupImages.map((groupImg, i) => (
              <motion.div
                key={groupImg.id}
                className="relative overflow-hidden rounded-2xl border border-white/10"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <Image
                  src={groupImg.image}
                  alt={groupImg.caption}
                  width={1200}
                  height={800}
                  className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-sm text-white">
                  {groupImg.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
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
        <p className="text-sm text-avilab-glow">{member.role}</p>
        <p className="mt-2 text-xs text-slate-400 line-clamp-2">{member.bio}</p>
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <span className="font-medium text-avilab-glow">{member.experience}</span>
          <span>•</span>
          <span>Experience</span>
        </div>
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
        {/* <div className="mt-4 flex gap-2">
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
        </div> */}
      </div>
    </motion.article>
  )
}
