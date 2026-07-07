"use client"

import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { useSyncExternalStore } from "react"
import { createPortal } from "react-dom"

function subscribeNoop() {
  return () => {}
}
function getIsMounted() {
  return true
}
function getIsMountedServer() {
  return false
}

/**
 * Renders into document.body via a portal. The page transition in
 * `[locale]/template.tsx` keeps a non-`none` `filter` on its wrapper even at
 * rest, which makes that wrapper the containing block for any `position:
 * fixed` descendant (per the CSS Filter Effects spec) — without the portal,
 * fixed-position lightboxes like this one get trapped inside that wrapper
 * instead of covering the real viewport.
 */
export function VideoLightbox({
  videoUrl,
  onClose,
  closeLabel,
}: {
  videoUrl: string | null
  onClose: () => void
  closeLabel: string
}) {
  const mounted = useSyncExternalStore(subscribeNoop, getIsMounted, getIsMountedServer)

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {videoUrl ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute -top-10 right-0 text-slate-300 hover:text-white"
              aria-label={closeLabel}
            >
              <X className="size-6" />
            </button>
            <video
              src={videoUrl}
              controls
              autoPlay
              playsInline
              className="w-full rounded-2xl border border-white/10"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  )
}
