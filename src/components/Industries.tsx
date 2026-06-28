import type { Industry } from '../api/generated/models'
import { SECTION } from '../config/sections'
import { useSiteContent } from '../hooks/useSiteContent'
import { Reveal } from './Reveal'

function IndustryCard({ icon, title, description }: Industry) {
  return (
    <Reveal className="industry-card">
      <span className="industry-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </Reveal>
  )
}

export function Industries() {
  const { content } = useSiteContent()

  return (
    <section className="section industries" id={SECTION.industries} aria-labelledby="industries-heading">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">Who We Serve</span>
          <h2 id="industries-heading" className="section-title">
            Industries We Protect
          </h2>
        </Reveal>
        <div className="industries-grid">
          {content?.industries.map((industry) => (
            <IndustryCard key={industry.title} {...industry} />
          ))}
        </div>
      </div>
    </section>
  )
}