import { describe, expect, it } from 'vitest'
import { brand, buildEmails, emailForRole } from './brand'
import { buildRobotsTxt, buildSitemapXml } from './seo-static'
import { routeSeo, siteBrand, siteSeo, sitemapPaths } from './seo'

describe('seo config', () => {
  it('defines site defaults', () => {
    expect(siteSeo.name).toBe('Ovotron')
    expect(siteSeo.defaultTitle).toContain('Ovotron')
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

  it('derives contact emails from the site domain', () => {
    expect(siteBrand.emails.security).toBe(emailForRole('security', brand.domain))
    expect(siteBrand.emails.privacy).toBe(emailForRole('privacy', brand.domain))
    expect(siteBrand.emails.legal).toBe(emailForRole('legal', brand.domain))
  })

  it('keeps brand labels aligned with siteSeo', () => {
    expect(siteBrand.name).toBe(siteSeo.name)
    expect(siteBrand.whyUsTag).toBe(`Why ${siteSeo.name}`)
    expect(siteBrand.homeAriaLabel).toBe(`${siteSeo.name} home`)
    expect(siteBrand.logoParts.join('')).toBe(siteSeo.name)
  })
})

describe('seo static generators', () => {
  const stagingUrl = 'https://staging.ovotron.io'

  it('builds sitemap entries from the site URL', () => {
    const xml = buildSitemapXml(stagingUrl)
    expect(xml).toContain('<loc>https://staging.ovotron.io/</loc>')
    expect(xml).toContain('<loc>https://staging.ovotron.io/privacy</loc>')
    expect(xml).toContain('<loc>https://staging.ovotron.io/terms</loc>')
  })

  it('builds robots.txt from the site URL', () => {
    const robots = buildRobotsTxt(stagingUrl)
    expect(robots).toContain('Sitemap: https://staging.ovotron.io/sitemap.xml')
  })

  it('builds default-domain emails consistently', () => {
    const emails = buildEmails(brand.domain)
    expect(emails.security).toBe(`security@${brand.domain}`)
  })
})