import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

/**
 * Scroll-triggered reveal. Animates once when the element enters the viewport.
 * `index` staggers siblings; `as` lets it wrap any element.
 */
export default function Reveal({
  children,
  index = 0,
  as = 'div',
  className = '',
  ...rest
}) {
  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      custom={index}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
