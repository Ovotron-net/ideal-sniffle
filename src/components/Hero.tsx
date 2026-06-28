import { Link } from '@tanstack/react-router'
import { Fragment } from 'react'
import { SECTION } from '../config/sections'
import { useSiteContent } from '../hooks/useSiteContent'
import { useCounter } from '../hooks/useCounter'
import { ArrowIcon } from './ArrowIcon'
import { HeroDashboard } from './HeroDashboard'
import { Reveal } from './Reveal'

function StatCounter({ count, suffix, label }: { count: number; suffix: string; label: string }) {
  const { ref, value } = useCounter(count)
  const display = suffix === '.9%' && value >= 99 ? 99 : value

  return (
    <div className="stat">
      <span className="stat-value" ref={ref}>
        {display}
      </span>
      <span className="stat-suffix">{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export function Hero() {
  const { content } = useSiteContent()

  return (
    <section className="hero" id="hero" aria-labelledby="hero-heading">
      <div className="hero-bg-glow" aria-hidden="true" />
      <div className="container hero-grid">
        <Reveal>
          <div className="hero-badge">
            <span className="pulse-dot" />
            Threat Intelligence Active
          </div>
          <h1 id="hero-heading" className="hero-title">
            Secure Your Digital Future
            <span className="title-highlight">Before Threats Find You</span>
          </h1>
          <p className="hero-subtitle">
            We help businesses detect, prevent, and respond to cyber threats through advanced
            security engineering, penetration testing, cloud security, and managed protection
            services.
          </p>
          <div className="hero-actions">
            <Link to="/" hash={SECTION.contact} className="btn btn-primary">
              <span>Book a Security Consultation</span>
              <ArrowIcon />
            </Link>
            <Link to="/" hash={SECTION.services} className="btn btn-secondary">
              View Services
            </Link>
          </div>
          {content && (
            <div className="hero-stats">
              {content.heroStats.map((stat, i) => (
                <Fragment key={stat.label}>
                  {i > 0 && <div className="stat-divider" />}
                  <StatCounter count={stat.count} suffix={stat.suffix} label={stat.label} />
                </Fragment>
              ))}
            </div>
          )}
        </Reveal>

        <Reveal className="hero-visual" delay>
          <HeroDashboard />
        </Reveal>
      </div>
    </section>
  )
}