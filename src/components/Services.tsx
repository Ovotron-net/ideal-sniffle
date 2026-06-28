import type { Service } from '../api/generated/models'
import { SECTION } from '../config/sections'
import { serviceIcons } from '../data/service-icons'
import { useSiteContent } from '../hooks/useSiteContent'
import { Reveal } from './Reveal'

function ServiceCard({ title, description, iconKey }: Service) {
  return (
    <Reveal as="article" className="service-card">
      <div className="card-glow" />
      <div className="service-icon">{serviceIcons[iconKey]}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </Reveal>
  )
}

export function Services() {
  const { content } = useSiteContent()

  return (
    <section className="section services" id={SECTION.services} aria-labelledby="services-heading">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">What We Do</span>
          <h2 id="services-heading" className="section-title">
            Security Services Engineered for Impact
          </h2>
          <p className="section-desc">
            End-to-end offensive and defensive capabilities tailored to your threat landscape.
          </p>
        </Reveal>
        <div className="services-grid">
          {content?.services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}