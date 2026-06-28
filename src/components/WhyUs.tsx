import type { TrustPoint } from '../api/generated/models'
import { siteBrand } from '../config/seo'
import { SECTION } from '../config/sections'
import { useSiteContent } from '../hooks/useSiteContent'
import { Reveal } from './Reveal'

function TrustItem({ num, title, description }: TrustPoint) {
  return (
    <Reveal as="li" className="trust-item">
      <span className="trust-num">{num}</span>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Reveal>
  )
}

export function WhyUs() {
  const { content } = useSiteContent()

  return (
    <section className="section why-us" id={SECTION['why-us']} aria-labelledby="why-heading">
      <div className="container">
        <div className="why-grid">
          <Reveal className="why-content">
            <span className="section-tag">{siteBrand.whyUsTag}</span>
            <h2 id="why-heading" className="section-title">
              Security Partners, Not Checkbox Vendors
            </h2>
            <p className="section-desc">
              We translate complex technical findings into business decisions your leadership can
              act on.
            </p>
          </Reveal>
          <ul className="trust-points">
            {content?.trustPoints.map((point) => (
              <TrustItem key={point.num} {...point} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}