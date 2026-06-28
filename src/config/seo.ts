import {
  brand,
  buildEmails,
  buildSocialUrls,
  defaultSiteUrl,
  domainFromUrl,
} from './brand'

const siteUrl = import.meta.env.VITE_SITE_URL ?? defaultSiteUrl(brand.domain)
const domain = domainFromUrl(siteUrl)

export const siteBrand = {
  name: brand.name,
  tagline: brand.tagline,
  logoParts: brand.logoParts,
  url: siteUrl,
  homeAriaLabel: `${brand.name} home`,
  whyUsTag: `Why ${brand.name}`,
  copyright: `© ${new Date().getFullYear()} ${brand.name}. All rights reserved.`,
  emails: buildEmails(domain),
  social: buildSocialUrls(),
} as const

export const siteSeo = {
  name: siteBrand.name,
  url: siteBrand.url,
  defaultTitle: `${brand.name} | Enterprise Cybersecurity`,
  defaultDescription: brand.defaultDescription,
  ogImage: `${siteBrand.url}/og-image.png`,
  twitterHandle: brand.twitterHandle,
} as const

export type RoutePath = '/' | '/privacy' | '/terms'

export const sitemapPaths: RoutePath[] = ['/', '/privacy', '/terms']

export const routeSeo: Record<RoutePath, { title: string; description: string }> = {
  '/': {
    title: siteSeo.defaultTitle,
    description: siteSeo.defaultDescription,
  },
  '/privacy': {
    title: `Privacy Policy | ${brand.name}`,
    description: `How ${brand.name} collects, uses, and protects your data.`,
  },
  '/terms': {
    title: `Terms of Service | ${brand.name}`,
    description: `Terms governing ${brand.name} security assessment engagements.`,
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