import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import BlurImage from '../ui/BlurImage'

const title = ['CUENTO', 'HISTORIAS', 'QUE', 'LATEN']

const word = {
  hidden: { y: '110%' },
  visible: (i) => ({
    y: '0%',
    transition: { duration: 0.7, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Parallax: image drifts up and the text layer lifts away on scroll.
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex h-screen min-h-[640px] items-end overflow-hidden"
    >
      {/* Featured visual with parallax + progressive load */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-10 scale-110">
        <BlurImage
          src="/images/camila1.jpeg"
          placeholder="/images/camila1.jpeg"
          alt="Pieza destacada del portafolio"
          className="h-full w-full grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
      </motion.div>

      {/* Headline */}
      <motion.div style={{ y: textY, opacity: fade } } className="relative w-full px-6 pb-16 md:px-10 md:pb-24">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-6 block font-mono text-[11px] uppercase tracking-[0.3em] text-smoke"
        >
          Camila Quiceno — Filmmaker & Editor
        </motion.span>

        <h1 className="font-display text-[15vw] leading-[0.85] tracking-tight text-paper md:text-[11vw]">
          {title.map((w, i) => (
            <span key={w} className="block overflow-hidden">
              <motion.span
                custom={i}
                variants={word}
                initial="hidden"
                animate="visible"
                className="block"
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-smoke md:flex-row md:gap-10"
        >
          <span>Comerciales · Documentales · Cortometrajes</span>
          <span>Basada en Colombia · Disponible mundialmente</span>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-8 right-6 hidden items-center gap-3 md:right-10 md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="block h-8 w-[1px] bg-smoke"
        />
      </motion.div>
    </section>
  )
}
