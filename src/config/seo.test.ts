import { describe, expect, it } from 'vitest'
import { routeSeo, siteSeo, sitemapPaths } from './seo'

describe('seo config', () => {
  it('defines site defaults', () => {
    expect(siteSeo.name).toBe('NexusGuard')
    expect(siteSeo.defaultTitle).toContain('NexusGuard')
  })

  it('defines per-route titles', () => {
    expect(routeSeo['/'].title).toContain('Cybersecurity')
    expect(routeSeo['/privacy'].title).toContain('Privacy')
    expect(routeSeo['/terms'].title).toContain('Terms')
  })

  it('lists all sitemap paths', () => {
    expect(sitemapPaths).toHaveLength(3)
    expect(sitemapPaths).toContain('/privacy')
  })
})