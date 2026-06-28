import type { CaseStudy, SiteContent, ThreatFeedItem } from '../api/generated/models'
import seed from '../../content/seed.json'

export const siteContentFixture = seed.siteContent as SiteContent
export const threatFeedFixture = seed.threatFeed as ThreatFeedItem[]
export const caseStudiesFixture = seed.caseStudies as CaseStudy[]