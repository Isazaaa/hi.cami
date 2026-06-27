import { useState, useMemo } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { projects, categories } from '../../data/projects'
import BlurImage from '../ui/BlurImage'
import ProjectModal from './ProjectModal'

const aspectClass = {
  tall: 'row-span-2 aspect-[3/4]',
  wide: 'aspect-[16/10]',
  square: 'aspect-square',
}

function ProjectCard({ project, onOpen }) {
  return (
    <motion.article
      layout
      layoutId={project.id}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onClick={onOpen}
      className={`group relative cursor-pointer overflow-hidden ${aspectClass[project.aspect]}`}
    >
      {/* Shared-element wrapper: morphs into the lightbox on open.
          Mobile/touch: full color + clear by default (no hover available).
          Desktop (can-hover): lens-focus effect — desaturated, sharpens on hover. */}
      <motion.div layoutId={`media-${project.id}`} className="absolute inset-0">
        <div className="h-full w-full transition-transform duration-500 ease-out can-hover:group-hover:scale-105">
          <BlurImage
            src={project.src}
            placeholder={project.placeholder}
            alt={project.title}
            className="h-full w-full transition-all duration-500 ease-out can-hover:grayscale can-hover:brightness-90 can-hover:contrast-110 can-hover:group-hover:grayscale-0 can-hover:group-hover:brightness-100"
          />
        </div>
      </motion.div>

      {/* Legibility gradient (always) + hover darkening (desktop only) */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent transition-colors duration-500 can-hover:from-ink/40 can-hover:group-hover:from-ink/70" />

      {/* Metadata — visible by default on touch, revealed on hover on desktop */}
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <div className="flex items-start justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/80 transition-all duration-500 can-hover:text-paper/0 can-hover:group-hover:text-paper/80">
            {project.location}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/80 transition-all duration-500 can-hover:text-paper/0 can-hover:group-hover:text-paper/80">
            {project.year}
          </span>
        </div>

        <div className="translate-y-0 opacity-100 transition-all duration-500 ease-out can-hover:translate-y-3 can-hover:opacity-0 can-hover:group-hover:translate-y-0 can-hover:group-hover:opacity-100">
          <h3 className="font-display text-2xl tracking-tight text-paper md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-1 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-smoke">
            <span className="inline-block h-[1px] w-4 bg-smoke" />
            Ver proyecto
          </p>
        </div>
      </div>
    </motion.article>
  )
}

export default function Portfolio() {
  const [active, setActive] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(
    () =>
      active === 'all'
        ? projects
        : projects.filter((p) => p.category === active),
    [active],
  )

  return (
    <section id="work" className="px-6 py-24 md:px-10 md:py-32">
      {/* Section header */}
      <div className="mb-12 flex flex-col gap-8 border-b hairline pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-smoke">
            02 — Portafolio
          </span>
          <h2 className="mt-3 font-display text-6xl leading-none tracking-tight text-paper md:text-8xl">
            TRABAJO
          </h2>
        </div>

        {/* Category filters */}
        <LayoutGroup>
          <ul className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => setActive(cat.id)}
                  className="relative rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors"
                >
                  {active === cat.id && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-paper"
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      active === cat.id ? 'text-ink' : 'text-smoke hover:text-paper'
                    }`}
                  >
                    {cat.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </LayoutGroup>
      </div>

      {/* Masonry grid with animated layout reordering */}
      <LayoutGroup>
        <motion.div
          layout
          className="grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={() => setSelected(i)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* Shared-element lightbox */}
      <ProjectModal
        items={filtered}
        index={selected}
        onNavigate={setSelected}
        onClose={() => setSelected(null)}
      />
    </section>
  )
}
