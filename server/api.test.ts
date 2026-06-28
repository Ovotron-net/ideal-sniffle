import { describe, expect, it } from 'vitest'
import { caseStudiesFixture, siteContentFixture, threatFeedFixture } from '../src/mocks/fixtures'

const API_BASE = process.env.API_BASE ?? 'http://localhost:3001/api/v1'

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`)
  if (!response.ok) throw new Error(`${path} returned ${response.status}`)
  return response.json() as Promise<T>
}

describe('API smoke tests', () => {
  it('GET /site-content returns fixture data', async () => {
    const data = await getJson<typeof siteContentFixture>('/site-content')
    expect(data.services).toHaveLength(siteContentFixture.services.length)
    expect(data.heroStats[0].count).toBe(500)
  })

  it('GET /threat-feed returns threat items', async () => {
    const data = await getJson<typeof threatFeedFixture>('/threat-feed')
    expect(data).toHaveLength(threatFeedFixture.length)
    expect(data[0].tag).toBe('BLOCKED')
  })

  it('GET /case-studies returns case studies', async () => {
    const data = await getJson<typeof caseStudiesFixture>('/case-studies')
    expect(data.length).toBeGreaterThanOrEqual(2)
  })

  it('POST /consultation-requests accepts submissions', async () => {
    const response = await fetch(`${API_BASE}/consultation-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Co',
        message: 'Need a pentest',
      }),
    })
    expect(response.status).toBe(201)
    const data = await response.json()
    expect(data.status).toBe('received')
    expect(data.id).toMatch(/^req_/)
  })
})