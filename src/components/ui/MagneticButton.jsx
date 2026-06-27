import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Magnetic micro-interaction: the element is pulled toward the cursor while
 * hovered and springs back on leave. Used for primary CTAs and links.
 */
export default function MagneticButton({
  as = 'button',
  strength = 0.4,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 200, damping: 15 })
  const springY = useSpring(y, { stiffness: 200, damping: 15 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const MotionTag = motion[as] ?? motion.button

  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
