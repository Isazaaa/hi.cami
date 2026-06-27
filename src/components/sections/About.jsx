import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import BlurImage from '../ui/BlurImage'
import Reveal from '../ui/Reveal'

const paragraphs = [
  'Soy Camila Quiceno. Hago piezas audiovisuales — comerciales, documentales y cortometrajes — para marcas y artistas que entienden la imagen en movimiento como lenguaje, no como decoración.',
  'Edito con el ojo puesto en lo que duele o emociona. Creo que una historia bien contada no necesita artificios: necesita ritmo, silencio y el corte justo.',
]

const stats = [
  { value: '13+', label: 'Años' },
  { value: '120+', label: 'Proyectos' },
  { value: '1000+', label: 'Videos editados' },
]

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Image and the floating label drift at different speeds → depth.
  const imageY = useTransform(scrollYProgress, [0, 1], ['12%', '-12%'])
  const labelY = useTransform(scrollYProgress, [0, 1], ['60%', '-60%'])

  return (
    <section
      id="about"
      ref={ref}
      className="relative grid grid-cols-1 gap-12 px-6 py-24 md:grid-cols-12 md:gap-8 md:px-10 md:py-32"
    >
      {/* Asymmetric image column */}
      <div className="relative md:col-span-5 md:col-start-1">
        <div className="relative aspect-[3/4] overflow-hidden">
          <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
            <BlurImage
              src="/images/camila2.jpeg"
              placeholder="/images/camila2.jpeg"
              alt="Retrato de Camila"
              className="h-full w-full grayscale"
            />
          </motion.div>
        </div>

        {/* Floating mono caption that parallaxes over the image edge */}
        <motion.span
          style={{ y: labelY }}
          className="absolute -right-2 top-1/2 font-mono text-[11px] uppercase tracking-[0.3em] text-smoke [writing-mode:vertical-rl] md:-right-6"
        >
          Detrás de cámara
        </motion.span>
      </div>

      {/* Text column, offset for asymmetry */}
      <div className="flex flex-col justify-center md:col-span-6 md:col-start-7">
        <Reveal as="span" className="font-mono text-[11px] uppercase tracking-[0.3em] text-smoke">
          03 — Sobre mí
        </Reveal>

        <Reveal
          as="h2"
          index={1}
          className="mt-4 font-display text-5xl leading-[0.9] tracking-tight text-paper md:text-7xl"
        >
          ENTRE LA CALLE
          <br />Y EL ESTUDIO
        </Reveal>

        <div className="mt-8 max-w-xl space-y-5">
          {paragraphs.map((text, i) => (
            <Reveal
              as="p"
              key={i}
              index={i + 2}
              className="text-balance text-base leading-relaxed text-paper/70 md:text-lg"
            >
              {text}
            </Reveal>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-6 border-t hairline pt-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} index={i}>
              <p className="font-display text-4xl tracking-tight text-paper md:text-5xl">
                {s.value}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
