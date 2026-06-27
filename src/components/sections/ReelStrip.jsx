import { useRef } from 'react'
import BlurImage from '../ui/BlurImage'
import Reveal from '../ui/Reveal'
import { reels, reelTypes } from '../../data/reels'
import { useDragScroll } from '../../hooks/useDragScroll'

// Constant card HEIGHT; width follows each shape's aspect ratio. This is what
// lets vertical reels and horizontal edits live in the same row without cropping.
const shapeClass = {
  vertical: 'aspect-[9/16]',
  horizontal: 'aspect-[16/9]',
  square: 'aspect-square',
}

function ReelCard({ item }) {
  const videoRef = useRef(null)

  // Hover-to-play muted preview (desktop). Resets on leave so it never drifts.
  const play = () => videoRef.current?.play().catch(() => {})
  const stop = () => {
    const v = videoRef.current
    if (v) {
      v.pause()
      v.currentTime = 0
    }
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={play}
      onMouseLeave={stop}
      aria-label={`${reelTypes[item.type]} — ${item.title}`}
      className={`group relative block h-72 shrink-0 overflow-hidden rounded-sm bg-fog md:h-96 ${shapeClass[item.shape]}`}
    >
      {/* Poster */}
      <BlurImage
        src={item.thumbnail}
        placeholder={item.thumbnail}
        alt={item.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 can-hover:group-hover:scale-105"
      />

      {/* Muted hover-preview video (desktop only fades in) */}
      {item.videoSrc && (
        <video
          ref={videoRef}
          src={item.videoSrc}
          muted
          loop
          playsInline
          preload="none"
          poster={item.thumbnail}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 can-hover:group-hover:opacity-100"
        />
      )}

      {/* Legibility gradient (always — keeps the label readable on mobile) */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/5" />

      {/* Type tag */}
      <span className="absolute left-3 top-3 rounded-full border border-paper/20 bg-ink/40 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-paper backdrop-blur-md">
        {reelTypes[item.type]}
      </span>

      {/* Play affordance — hides while the preview is playing on hover */}
      {item.videoSrc && (
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-paper/20 bg-ink/40 backdrop-blur-md transition-opacity duration-300 can-hover:group-hover:opacity-0">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 text-paper">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      )}

      {/* Title + client */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="font-display text-lg leading-tight tracking-tight text-paper">
          {item.title}
        </p>
        {item.client && (
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-smoke">
            {item.client}
          </p>
        )}
      </div>
    </a>
  )
}

function StripArrow({ dir, onClick }) {
  const isLeft = dir < 0
  return (
    <button
      onClick={onClick}
      aria-label={isLeft ? 'Anterior' : 'Siguiente'}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        {isLeft ? (
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  )
}

export default function ReelStrip() {
  const scrollRef = useDragScroll()

  const scrollByViewport = (dir) => {
    const el = scrollRef.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section className="relative py-24 md:py-32">
      {/* Header + desktop controls */}
      <div className="flex items-end justify-between gap-6 px-6 md:px-10">
        <div>
          <Reveal as="span" className="font-mono text-[11px] uppercase tracking-[0.3em] text-smoke">
            Reels · Ediciones · Videoclips
          </Reveal>
          <Reveal
            as="h2"
            index={1}
            className="mt-3 font-display text-4xl leading-none tracking-tight text-paper md:text-6xl"
          >
            Más allá
            <br />
            del portafolio
          </Reveal>
        </div>

        <div className="hidden shrink-0 gap-2 md:flex">
          <StripArrow dir={-1} onClick={() => scrollByViewport(-1)} />
          <StripArrow dir={1} onClick={() => scrollByViewport(1)} />
        </div>
      </div>

      {/* Mixed-aspect horizontal strip — drag (mouse) / swipe (touch) / arrows */}
      <div
        ref={scrollRef}
        className="no-scrollbar mt-10 flex gap-4 overflow-x-auto px-6 pb-4 md:gap-5 md:px-10 cursor-grab"
      >
        {reels.map((item) => (
          <ReelCard key={item.id} item={item} />
        ))}
      </div>

      {/* Touch hint */}
      <p className="mt-2 px-6 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke/40 md:hidden">
        Desliza →
      </p>
    </section>
  )
}
