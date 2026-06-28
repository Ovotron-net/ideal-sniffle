const siteUrl = import.meta.env.VITE_SITE_URL ?? 'https://nexusguard.io'

export const siteSeo = {
  name: 'NexusGuard',
  url: siteUrl,
  defaultTitle: 'NexusGuard | Enterprise Cybersecurity',
  defaultDescription:
    'Advanced cybersecurity services — penetration testing, cloud security, red team assessments, and managed protection for enterprise businesses.',
  ogImage: `${siteUrl}/og-image.png`,
  twitterHandle: '@nexusguard',
} as const

export type RoutePath = '/' | '/privacy' | '/terms'

export const sitemapPaths: RoutePath[] = ['/', '/privacy', '/terms']

export const routeSeo: Record<RoutePath, { title: string; description: string }> = {
  '/': {
    title: siteSeo.defaultTitle,
    description: siteSeo.defaultDescription,
  },
  '/privacy': {
    title: 'Privacy Policy | NexusGuard',
    description: 'How NexusGuard collects, uses, and protects your data.',
  },
  '/terms': {
    title: 'Terms of Service | NexusGuard',
    description: 'Terms governing NexusGuard security assessment engagements.',
  },
}

export function buildRouteHead(path: RoutePath) {
  const { title, description } = routeSeo[path]
  const url = `${siteSeo.url}${path === '/' ? '' : path}`
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: siteSeo.name },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: siteSeo.ogImage },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: siteSeo.twitterHandle },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: siteSeo.ogImage },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}