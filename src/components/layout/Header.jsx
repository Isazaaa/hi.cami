import { useState } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useSpring,
} from 'framer-motion'

const links = [
  { id: 'hero', label: 'Inicio', index: '01' },
  { id: 'work', label: 'Portafolio', index: '02' },
  { id: 'about', label: 'Sobre mí', index: '03' },
  { id: 'contact', label: 'Contacto', index: '04' },
]

const overlay = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.06 },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const linkItem = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit: { y: '110%', transition: { duration: 0.3 } },
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()

  // Smooth progress line at the very top of the viewport.
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  // Hide on scroll down, reveal on scroll up — stays out of the artwork's way.
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0
    if (open) return
    setHidden(latest > prev && latest > 120)
  })

  const go = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Scroll progress hairline */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-paper"
      />

      {/* Floating header */}
      <motion.header
        initial={{ y: -120 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[55] flex items-center justify-between bg-ink/20 px-6 py-5 backdrop-blur-md md:px-10"
      >
        {/* Logo mark */}
        <button
          onClick={() => go('hero')}
          className="group flex items-baseline gap-2 mix-blend-difference"
        >
          <span className="font-display text-xl tracking-wide text-paper">
            hi.cami
          </span>
          <span className="font-mono text-[10px] text-paper/70 transition-opacity group-hover:opacity-100">
            © {new Date().getFullYear()}
          </span>
        </button>

        {/* Menu toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className="group relative z-[70] flex items-center gap-3 mix-blend-difference"
        >
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-paper sm:block">
            {open ? 'Cerrar' : 'Menú'}
          </span>
          <span className="relative flex h-4 w-7 flex-col justify-between">
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1.5px] w-full bg-paper"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="h-[1.5px] w-full bg-paper"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1.5px] w-full bg-paper"
            />
          </span>
        </button>
      </motion.header>

      {/* Fullscreen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[58] flex flex-col justify-center bg-ink px-6 md:px-10"
          >
            <ul className="space-y-2 md:space-y-4">
              {links.map((link) => (
                <li key={link.id} className="overflow-hidden">
                  <motion.button
                    variants={linkItem}
                    onClick={() => go(link.id)}
                    className="group flex w-full items-baseline gap-4 text-left md:gap-8"
                  >
                    <span className="font-mono text-xs text-smoke md:text-sm">
                      {link.index}
                    </span>
                    <span className="font-display text-5xl leading-none tracking-tight text-paper transition-all duration-300 ease-out group-hover:translate-x-3 group-hover:text-smoke sm:text-7xl md:text-8xl">
                      {link.label}
                    </span>
                  </motion.button>
                </li>
              ))}
            </ul>

            <motion.div
              variants={linkItem}
              className="mt-16 flex flex-col gap-1 font-mono text-[11px] uppercase tracking-[0.2em] text-smoke md:flex-row md:gap-10"
            >
              <span>Disponible para proyectos · 2026</span>
              <a
                href="mailto:Quicenocamila1331@gmail.com"
                className="text-paper transition-opacity hover:opacity-60"
              >
                Quicenocamila1331@gmail.com
              </a>
              <a
                href="https://wa.me/573195253657"
                target="_blank"
                rel="noreferrer"
                className="text-paper transition-opacity hover:opacity-60"
              >
                +57 319 5253657
              </a>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
