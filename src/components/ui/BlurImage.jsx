import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Progressive image: paints a tiny blurred placeholder instantly, then fades
 * in the full WebP once decoded. Keeps perceived performance high without
 * layout shift. `loading="lazy"` + async decode keep off-screen work cheap.
 */
export default function BlurImage({ src, placeholder, alt, className = '' }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-fog ${className}`}>
      {/* Blurred low-res placeholder */}
      {placeholder && (
        <img
          src={placeholder}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl"
        />
      )}

      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full w-full object-cover"
      />
    </div>
  )
}
