import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const aspectClass = {
  tall: 'aspect-[3/4]',
  wide: 'aspect-[16/10]',
  square: 'aspect-square',
}

const EASE = [0.16, 1, 0.3, 1]

/**
 * Shared-element lightbox. The media wrapper carries the same `layoutId` as the
 * grid card (`media-${id}`), so opening/closing/navigating morphs the thumbnail
 * into the large view. Supports keyboard nav (← → Esc), prev/next, a counter,
 * an editorial metadata panel, and optional video embeds.
 */
export default function ProjectModal({ items, index, onClose, onNavigate }) {
  const project = index != null ? items[index] : null
  const total = items.length

  const next = useCallback(
    () => onNavigate((index + 1) % total),
    [index, total, onNavigate],
  )
  const prev = useCallback(
    () => onNavigate((index - 1 + total) % total),
    [index, total, onNavigate],
  )

  // Keyboard controls + body scroll lock while open.
  useEffect(() => {
    if (project == null) return

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }

    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [project, onClose, next, prev])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            onClick={onClose}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.35, ease: EASE }}
            className="absolute inset-0 bg-ink/95 backdrop-blur-xl"
          />

          {/* Top bar: counter + close */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
            className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-smoke">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="group flex items-center gap-3"
            >
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-smoke transition-colors group-hover:text-paper sm:block">
                Cerrar
              </span>
              <span className="relative flex h-4 w-4 items-center justify-center">
                <span className="absolute h-[1.5px] w-5 rotate-45 bg-paper transition-transform group-hover:rotate-[135deg]" />
                <span className="absolute h-[1.5px] w-5 -rotate-45 bg-paper transition-transform group-hover:rotate-45" />
              </span>
            </button>
          </motion.div>

          {/* Stage */}
          <div className="relative z-10 flex flex-1 items-center justify-center px-4 pb-6 md:px-10">
            {/* Prev / Next */}
            {total > 1 && (
              <>
                <NavArrow side="left" onClick={prev} />
                <NavArrow side="right" onClick={next} />
              </>
            )}

            <div className="flex w-full max-w-6xl flex-col items-center gap-6 lg:flex-row lg:items-end lg:gap-12">
              {/* Morphing media */}
              <motion.div
                layoutId={`media-${project.id}`}
                transition={{ duration: 0.5, ease: EASE }}
                className={`relative w-full overflow-hidden bg-fog lg:flex-1 ${aspectClass[project.aspect]} max-h-[72vh]`}
              >
                {project.videoUrl ? (
                  <iframe
                    src={project.videoUrl}
                    title={project.title}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                ) : (
                  <img
                    src={project.src}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
              </motion.div>

              {/* Editorial info panel */}
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.15 }}
                className="w-full shrink-0 lg:w-72"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-smoke">
                  {project.category}
                </span>
                <h3 className="mt-2 font-display text-4xl leading-none tracking-tight text-paper md:text-5xl">
                  {project.title}
                </h3>

                <dl className="mt-6 space-y-3 border-t hairline pt-6">
                  <Meta label="Año" value={project.year} />
                  <Meta label="Locación" value={project.location} />
                  {project.client && <Meta label="Cliente" value={project.client} />}
                </dl>

                {project.description && (
                  <p className="mt-6 text-sm leading-relaxed text-paper/60">
                    {project.description}
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Meta({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
        {label}
      </dt>
      <dd className="font-mono text-[11px] uppercase tracking-[0.1em] text-paper">
        {value}
      </dd>
    </div>
  )
}

function NavArrow({ side, onClick }) {
  const isLeft = side === 'left'
  return (
    <button
      onClick={onClick}
      aria-label={isLeft ? 'Anterior' : 'Siguiente'}
      className={`group absolute top-1/2 z-20 -translate-y-1/2 ${
        isLeft ? 'left-2 md:left-6' : 'right-2 md:right-6'
      } flex h-12 w-12 items-center justify-center`}
    >
      <span
        className={`block font-mono text-2xl text-smoke transition-all duration-300 group-hover:text-paper ${
          isLeft ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
        }`}
      >
        {isLeft ? '←' : '→'}
      </span>
    </button>
  )
}
