import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '../ui/Reveal'
import MagneticButton from '../ui/MagneticButton'

const fields = [
  { name: 'name', label: 'Cómo te llamás', type: 'text', placeholder: 'Tu nombre' },
  { name: 'email', label: 'Tu correo', type: 'email', placeholder: 'nombre@correo.com' },
  { name: 'project', label: 'Contame del proyecto', type: 'text', placeholder: 'Editorial, campaña, video…' },
]

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', project: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // Wire to a real endpoint (Formspree / Resend / API route) here.
    setSent(true)
  }

  return (
    <section id="contact" className="px-6 py-24 md:px-10 md:py-32">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        {/* Left intent column */}
        <div className="md:col-span-5">
          <Reveal as="span" className="font-mono text-[11px] uppercase tracking-[0.3em] text-smoke">
            04 — Contacto
          </Reveal>
          <Reveal
            as="h2"
            index={1}
            className="mt-4 font-display text-6xl leading-[0.85] tracking-tight text-paper md:text-8xl"
          >
            CREEMOS
            <br />ALGO
          </Reveal>
          <Reveal
            as="p"
            index={2}
            className="mt-6 max-w-sm text-balance text-paper/60"
          >
            ¿Tenés una idea, una marca o un proyecto entre manos? Escribime y armamos algo que valga la pena mirar dos veces.
          </Reveal>
        </div>

        {/* Form column */}
        <div className="md:col-span-6 md:col-start-7">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-full min-h-[300px] flex-col justify-center"
              >
                <p className="font-display text-4xl tracking-tight text-paper md:text-5xl">
                  MENSAJE ENVIADO
                </p>
                <p className="mt-3 font-mono text-sm text-smoke">
                  Gracias, {values.name || 'crack'}. Te respondo en menos de 48h.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-10"
              >
                {fields.map((field, i) => (
                  <Reveal key={field.name} index={i} className="group">
                    <label
                      htmlFor={field.name}
                      className="block font-mono text-[11px] uppercase tracking-[0.2em] text-smoke"
                    >
                      {String(i + 1).padStart(2, '0')} / {field.label}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      required
                      value={values[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="mt-3 w-full border-b border-paper/20 bg-transparent pb-3 text-xl text-paper outline-none transition-colors placeholder:text-smoke/40 focus:border-paper md:text-2xl"
                    />
                  </Reveal>
                ))}

                <MagneticButton
                  type="submit"
                  strength={0.5}
                  className="group inline-flex items-center gap-4 rounded-full border border-paper/30 px-8 py-4 transition-colors hover:bg-paper"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors group-hover:text-ink">
                    Enviar mensaje
                  </span>
                  <span className="font-mono text-paper transition-colors group-hover:text-ink">
                    →
                  </span>
                </MagneticButton>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
