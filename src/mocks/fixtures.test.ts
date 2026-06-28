import { describe, expect, it } from 'vitest'
import { caseStudiesFixture, siteContentFixture, threatFeedFixture } from './fixtures'

describe('fixtures', () => {
  it('site content has required sections', () => {
    expect(siteContentFixture.heroStats).toHaveLength(3)
    expect(siteContentFixture.services).toHaveLength(8)
    expect(siteContentFixture.trustPoints).toHaveLength(6)
    expect(siteContentFixture.processSteps).toHaveLength(6)
    expect(siteContentFixture.industries).toHaveLength(6)
    expect(siteContentFixture.footerServices.length).toBeGreaterThan(0)
  })

  it('threat feed has severity values', () => {
    for (const item of threatFeedFixture) {
      expect(['safe', 'warn', 'critical']).toContain(item.severity)
    }
  })

  it('case studies have ids and services', () => {
    for (const study of caseStudiesFixture) {
      expect(study.id).toBeTruthy()
      expect(study.services.length).toBeGreaterThan(0)
    }
  })
})