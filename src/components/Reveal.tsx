import type { ElementType, ReactNode } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface RevealProps {
  as?: ElementType
  className?: string
  delay?: boolean
  children?: ReactNode
}

export function Reveal({ as: Tag = 'div', className = '', delay = false, children }: RevealProps) {
  const { revealRef, className: revealClass } = useScrollReveal({ delay })
  const mergedClass = [revealClass, className].filter(Boolean).join(' ')

  return (
    <Tag ref={revealRef as never} className={mergedClass}>
      {children}
    </Tag>
  )
}