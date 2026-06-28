import { useCallback, useRef, useState } from 'react'

interface UseScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  delay?: boolean
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {},
) {
  const { threshold = 0.12, rootMargin = '0px 0px -40px 0px', delay = false } = options
  const [visible, setVisible] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const revealRef = useCallback(
    (node: T | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
      if (!node) return

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observerRef.current?.unobserve(node)
          }
        },
        { threshold, rootMargin },
      )
      observerRef.current.observe(node)
    },
    [threshold, rootMargin],
  )

  const className = ['reveal', visible && 'visible', delay && 'reveal-delay']
    .filter(Boolean)
    .join(' ')

  return { revealRef, className }
}