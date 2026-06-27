import { useEffect, useRef } from 'react'

/**
 * Click-and-drag horizontal scrolling for a scroll container, mouse only.
 * Touch devices keep their native inertial scroll (no interference).
 *
 * Guards clicks: if the pointer moved past a small threshold during the drag,
 * the subsequent click is swallowed so dragging the strip never opens a card.
 */
export function useDragScroll() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let down = false
    let startX = 0
    let startScroll = 0
    let moved = 0

    const onDown = (e) => {
      // Mouse only — let touch use native momentum scrolling.
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      down = true
      moved = 0
      startX = e.pageX
      startScroll = el.scrollLeft
      el.classList.add('cursor-grabbing')
    }

    const onMove = (e) => {
      if (!down) return
      const dx = e.pageX - startX
      moved = Math.max(moved, Math.abs(dx))
      el.scrollLeft = startScroll - dx
    }

    const onUp = () => {
      down = false
      el.classList.remove('cursor-grabbing')
    }

    // Capture phase: cancel the click born from a drag before it reaches a card.
    const onClickCapture = (e) => {
      if (moved > 8) {
        e.preventDefault()
        e.stopPropagation()
        moved = 0
      }
    }

    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    el.addEventListener('click', onClickCapture, true)

    return () => {
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      el.removeEventListener('click', onClickCapture, true)
    }
  }, [])

  return ref
}
