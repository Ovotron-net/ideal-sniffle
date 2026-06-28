import { useGetCaseStudies } from '../api/generated/endpoints'
import { SECTION } from '../config/sections'
import { Reveal } from './Reveal'

export function CaseStudies() {
  const { data: caseStudies } = useGetCaseStudies({
    query: { select: (response) => response.data },
  })

  return (
    <section
      className="section case-studies"
      id={SECTION['case-studies']}
      aria-labelledby="case-studies-heading"
    >
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">Proven Results</span>
          <h2 id="case-studies-heading" className="section-title">
            Security Wins in the Field
          </h2>
          <p className="section-desc">
            Real engagements. Measurable outcomes. Enterprise-grade protection delivered.
          </p>
        </Reveal>
        <div className="case-studies-grid">
          {caseStudies?.map((study) => (
            <CaseStudyCard key={study.id} {...study} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseStudyCard({
  industry,
  title,
  outcome,
  services,
}: {
  industry: string
  title: string
  outcome: string
  services: string[]
}) {
  return (
    <Reveal as="article" className="case-study-card">
      <span className="case-study-industry">{industry}</span>
      <h3>{title}</h3>
      <p className="case-study-outcome">{outcome}</p>
      <ul className="case-study-services">
        {services.map((service) => (
          <li key={service}>{service}</li>
        ))}
      </ul>
    </Reveal>
  )
}