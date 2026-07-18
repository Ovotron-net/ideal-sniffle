import { CaseStudies } from '../components/CaseStudies'
import { CosmicDimension } from '../components/CosmicDimension'
import { CTA } from '../components/CTA'
import { Hero } from '../components/Hero'
import { Industries } from '../components/Industries'
import { JsonLd } from '../components/JsonLd'
import { Process } from '../components/Process'
import { Services } from '../components/Services'
import { WhyUs } from '../components/WhyUs'
import { siteBrand, siteSeo } from '../config/seo'
import { useSiteContent } from '../hooks/useSiteContent'

export function HomePage() {
  const { isLoading, isError } = useSiteContent()

  if (isLoading) {
    return (
      <main id="main" className="section">
        <div className="container">
          <p className="section-loading">Loading site content…</p>
        </div>
      </main>
    )
  }

  if (isError) {
    return (
      <main id="main" className="section">
        <div className="container">
          <p className="section-error">Unable to load site content. Please refresh.</p>
        </div>
      </main>
    )
  }

  return (
    <>
      <CosmicDimension />
      <main id="main" className="cosmic-content">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: siteSeo.name,
            url: siteSeo.url,
            description: siteSeo.defaultDescription,
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'sales',
              email: siteBrand.emails.security,
            },
          }}
        />
        <Hero />
        <Services />
        <WhyUs />
        <Process />
        <Industries />
        <CaseStudies />
        <CTA />
      </main>
    </>
  )
}
