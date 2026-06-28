import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { Reveal } from '../components/Reveal'

interface LegalPageProps {
  title: string
  children: ReactNode
}

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <main id="main" className="legal-page">
      <div className="container">
        <Reveal className="legal-content">
          <Link to="/" className="legal-back">
            ← Back to Home
          </Link>
          <h1 className="legal-title">{title}</h1>
          <div className="legal-body">{children}</div>
        </Reveal>
      </div>
    </main>
  )
}