"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useSyncExternalStore } from "react"

function subscribePointerFine(cb: () => void) {
  const mq = window.matchMedia("(pointer: fine)")
  mq.addEventListener("change", cb)
  return () => mq.removeEventListener("change", cb)
}

function getPointerFine() {
  return window.matchMedia("(pointer: fine)").matches
}

export function CustomCursor() {
  const enabled = useSyncExternalStore(subscribePointerFine, getPointerFine, () => false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 280, damping: 28, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 280, damping: 28, mass: 0.6 })
  const dotX = useSpring(x, { stiffness: 1200, damping: 55 })
  const dotY = useSpring(y, { stiffness: 1200, damping: 55 })

  useEffect(() => {
    if (!enabled) return
    document.body.classList.add("cursor-none")
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener("mousemove", move)
    return () => {
      window.removeEventListener("mousemove", move)
      document.body.classList.remove("cursor-none")
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99] hidden mix-blend-screen md:block"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <div className="size-8 rounded-full border border-avilab-glow/50 bg-avilab-accent/10 shadow-[0_0_40px_rgb(56_189_248/0.35)] backdrop-blur-sm" />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[98] hidden md:block"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      >
        <div className="size-1 rounded-full bg-white shadow-[0_0_12px_white]" />
      </motion.div>
    </>
  )
}
