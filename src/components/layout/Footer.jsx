const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/hi.camifilm' },
  { label: 'WhatsApp', href: 'https://wa.me/573195253657' },
  // { label: 'Behance', href: 'https://behance.net' },
  // { label: 'Vimeo', href: 'https://vimeo.com' },
]

export default function Footer() {
  return (
    <footer className="border-t hairline px-6 py-12 md:px-10">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-4xl tracking-tight text-paper md:text-6xl">
            HABLEMOS
          </p>
          <div className="mt-2 flex flex-col gap-1">
            <a
              href="mailto:crear@hicamifilm.com"
              className="inline-block font-mono text-sm text-smoke transition-colors hover:text-paper"
            >
              crear@hicamifilm.com
            </a>
            <a
              href="https://wa.me/573195253657"
              target="_blank"
              rel="noreferrer"
              className="inline-block font-mono text-sm text-smoke transition-colors hover:text-paper"
            >
              
            </a>
          </div>
        </div>

        <ul className="flex gap-6">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-smoke transition-colors hover:text-paper"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
