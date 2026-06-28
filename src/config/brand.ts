export const brand = {
  name: 'Ovotron',
  domain: 'ovotron.io',
  tagline: 'Next-generation security operations for the enterprise.',
  logoParts: ['Ovo', 'tron'] as const,
  twitterHandle: '@ovotron',
  defaultDescription:
    'Advanced cybersecurity services — penetration testing, cloud security, red team assessments, and managed protection for enterprise businesses.',
  ogTagline: 'ENTERPRISE CYBERSECURITY',
  emailRoles: {
    security: 'security',
    privacy: 'privacy',
    legal: 'legal',
  },
  socialHandles: {
    linkedin: 'ovotron',
    x: 'ovotron',
    github: 'ovotron',
  },
} as const

export type EmailRole = keyof typeof brand.emailRoles
export type SocialPlatform = keyof typeof brand.socialHandles

export const sitemapEntries = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
] as const

export function defaultSiteUrl(domain = brand.domain) {
  return `https://${domain}`
}

export function domainFromUrl(siteUrl: string, fallback = brand.domain) {
  try {
    return new URL(siteUrl).hostname
  } catch {
    return fallback
  }
}

export function emailForRole(role: EmailRole, domain: string = brand.domain) {
  return `${brand.emailRoles[role]}@${domain}`
}

export function socialUrlFor(platform: SocialPlatform, handle: string) {
  const urls: Record<SocialPlatform, string> = {
    linkedin: `https://linkedin.com/company/${handle}`,
    x: `https://x.com/${handle}`,
    github: `https://github.com/${handle}`,
  }
  return urls[platform]
}

export function buildEmails(domain: string = brand.domain) {
  return {
    security: emailForRole('security', domain),
    privacy: emailForRole('privacy', domain),
    legal: emailForRole('legal', domain),
  } as const
}

export function buildSocialUrls() {
  return {
    linkedin: socialUrlFor('linkedin', brand.socialHandles.linkedin),
    x: socialUrlFor('x', brand.socialHandles.x),
    github: socialUrlFor('github', brand.socialHandles.github),
  } as const
}