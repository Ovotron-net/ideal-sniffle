import type { ProcessStep } from '../api/generated/models'
import { SECTION } from '../config/sections'
import { useSiteContent } from '../hooks/useSiteContent'
import { Reveal } from './Reveal'

function TimelineStep({ step, title, description }: ProcessStep) {
  return (
    <Reveal as="li" className="timeline-step">
      <div className="step-marker">
        <span>{step}</span>
      </div>
      <div className="step-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Reveal>
  )
}

export function Process() {
  const { content } = useSiteContent()

  return (
    <section className="section process" id={SECTION.process} aria-labelledby="process-heading">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">Our Methodology</span>
          <h2 id="process-heading" className="section-title">
            From Discovery to Hardened Defense
          </h2>
        </Reveal>
        <ol className="timeline">
          {content?.processSteps.map((step) => (
            <TimelineStep key={step.step} {...step} />
          ))}
        </ol>
      </div>
    </section>
  )
}