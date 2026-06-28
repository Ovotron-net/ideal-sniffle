import { setupWorker } from 'msw/browser'
import {
  getCreateConsultationRequestMockHandler,
  getGetCaseStudiesMockHandler,
  getGetSiteContentMockHandler,
  getGetThreatFeedMockHandler,
} from '../api/generated/endpoints.msw'
import { caseStudiesFixture, siteContentFixture, threatFeedFixture } from './fixtures'

export const worker = setupWorker(
  getGetSiteContentMockHandler(siteContentFixture),
  getGetThreatFeedMockHandler(threatFeedFixture),
  getGetCaseStudiesMockHandler(caseStudiesFixture),
  getCreateConsultationRequestMockHandler(),
)