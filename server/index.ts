import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import {
  caseStudiesFixture,
  siteContentFixture,
  threatFeedFixture,
} from '../src/mocks/fixtures.ts'

interface ConsultationRequest {
  name: string
  email: string
  company: string
  message: string
}

const app = new Hono()

app.use('/*', cors())

app.get('/api/v1/site-content', (c) => c.json(siteContentFixture))

app.get('/api/v1/threat-feed', (c) => c.json(threatFeedFixture))

app.get('/api/v1/case-studies', (c) => c.json(caseStudiesFixture))

app.post('/api/v1/consultation-requests', async (c) => {
  const body = await c.req.json<ConsultationRequest>()
  const id = `req_${crypto.randomUUID().slice(0, 8)}`

  return c.json(
    {
      id,
      status: 'received',
      message: `Thanks ${body.name}. Our team will respond to ${body.email} within one business day.`,
    },
    201,
  )
})

app.get('/health', (c) => c.json({ status: 'ok' }))

const port = Number(process.env.API_PORT ?? 3001)

console.log(`Ovotron API listening on http://localhost:${port}/api/v1`)

serve({ fetch: app.fetch, port })