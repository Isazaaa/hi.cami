import { useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { categories } from '../../data/projects'

const categoryLabel = Object.fromEntries(
  categories.filter((c) => c.id !== 'all').map((c) => [c.id, c.label]),
)

/**
 * Normalise any YouTube URL (youtu.be, youtube.com/watch, etc.)
 * into an embeddable `https://www.youtube.com/embed/ID?autoplay=1`.
 * Strips tracking params like `si`.
 */
function embedUrl(raw) {
  const match = raw.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=))([\w-]+)/,
  )
  if (!match) return raw // not a recognised YouTube format → passthrough
  return `https://www.youtube.com/embed/${match[1]}?autoplay=1`
}

const aspectClass = {
  tall: 'aspect-[3/4]',
  wide: 'aspect-[16/10]',
  square: 'aspect-square',
}

const EASE = [0.16, 1, 0.3, 1]
const SWIPE_THRESHOLD = 70

/**
 * Shared-element lightbox. The media wrapper carries the same `layoutId` as the
 * grid card (`media-${id}`), so opening/closing/navigating morphs the thumbnail
 * into the large view. Supports keyboard nav (← → Esc), swipe/drag, prev/next
 * controls, a counter, an editorial metadata panel, and optional video embeds.
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

  const handleDragEnd = (_, info) => {
    if (info.offset.x <= -SWIPE_THRESHOLD) next()
    else if (info.offset.x >= SWIPE_THRESHOLD) prev()
  }

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop — fade matches the media morph (0.5s) so on close the
              image never floats over the page after the backdrop is gone. */}
          <motion.div
            onClick={onClose}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 0.5, ease: EASE }}
            className="absolute inset-0 bg-ink/95 backdrop-blur-xl"
          />

          {/* Top bar: counter + close */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
            className="relative z-10 flex items-center justify-between px-5 py-4 md:px-10 md:py-5"
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
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 bg-ink/40 backdrop-blur-md transition-colors group-hover:bg-paper group-hover:text-ink">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-paper transition-colors group-hover:text-ink">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </span>
            </button>
          </motion.div>

          {/* Stage */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-5 md:px-10">
            {/* Desktop side arrows */}
            {total > 1 && (
              <>
                <ArrowButton
                  dir="left"
                  onClick={prev}
                  className="absolute left-4 top-1/2 hidden -translate-y-1/2 lg:flex"
                />
                <ArrowButton
                  dir="right"
                  onClick={next}
                  className="absolute right-4 top-1/2 hidden -translate-y-1/2 lg:flex"
                />
              </>
            )}

            <div className="flex w-full max-w-6xl flex-col items-center gap-5 lg:flex-row lg:items-end lg:gap-12">
              {/* Morphing media + swipe layer */}
              <motion.div
                layoutId={`media-${project.id}`}
                transition={{ duration: 0.5, ease: EASE }}
                className={`relative w-full overflow-hidden rounded-sm bg-fog lg:flex-1 ${aspectClass[project.aspect]} max-h-[58vh] lg:max-h-[74vh]`}
              >
                {project.videoUrl ? (
                  <iframe
                    src={embedUrl(project.videoUrl)}
                    title={project.title}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                ) : project.videoFile ? (
                  <video
                    key={project.id}
                    src={project.videoFile}
                    controls
                    autoPlay
                    playsInline
                    className="absolute inset-0 h-full w-full object-contain bg-black"
                  />
                ) : (
                  <motion.img
                    key={project.id}
                    src={project.src}
                    alt={project.title}
                    draggable={false}
                    drag={total > 1 ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.25}
                    dragSnapToOrigin
                    onDragEnd={handleDragEnd}
                    className="absolute inset-0 h-full w-full touch-pan-y cursor-grab object-cover select-none active:cursor-grabbing"
                  />
                )}
              </motion.div>

              {/* Editorial info panel */}
              <motion.div
                key={`info-${project.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.15 }}
                className="w-full shrink-0 lg:w-72"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-smoke">
                  {project.client ?? project.category}
                </span>
                <h3 className="mt-2 font-display text-3xl leading-none tracking-tight text-paper md:text-5xl">
                  {project.title}
                </h3>

                <dl className="mt-5 space-y-3 border-t hairline pt-5">
                  <Meta label="Año" value={project.year} />
                  <Meta label="Locación" value={project.location} />
                  <Meta label="Categoría" value={project.categoryLabel ?? categoryLabel[project.category] ?? project.category} />
                </dl>

                {project.description && (
                  <p className="mt-5 hidden text-sm leading-relaxed text-paper/60 lg:block">
                    {project.description}
                  </p>
                )}
              </motion.div>
            </div>

            {/* Mobile control bar: clear prev/next + swipe hint */}
            {total > 1 && (
              <div className="mt-6 flex items-center gap-6 lg:hidden">
                <ArrowButton dir="left" onClick={prev} />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                  Desliza
                </span>
                <ArrowButton dir="right" onClick={next} />
              </div>
            )}
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

function ArrowButton({ dir, onClick, className = '' }) {
  const isLeft = dir === 'left'
  return (
    <button
      onClick={onClick}
      aria-label={isLeft ? 'Anterior' : 'Siguiente'}
      className={`group z-20 flex h-12 w-12 items-center justify-center rounded-full border border-paper/25 bg-ink/50 text-paper backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-paper hover:bg-paper hover:text-ink ${className}`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        className={`transition-transform duration-300 ${isLeft ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`}
      >
        {isLeft ? (
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  )
}
