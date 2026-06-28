import { brand, sitemapEntries } from './brand'

function normalizeSiteUrl(siteUrl: string) {
  return siteUrl.replace(/\/$/, '')
}

export function buildSitemapXml(siteUrl: string) {
  const base = normalizeSiteUrl(siteUrl)
  const urls = sitemapEntries
    .map(
      ({ path, changefreq, priority }) => `  <url>
    <loc>${base}${path === '/' ? '/' : path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

export function buildRobotsTxt(siteUrl: string) {
  const base = normalizeSiteUrl(siteUrl)
  return `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`
}

export function buildOgImageSvg(name = brand.name, tagline = brand.ogTagline) {
  const displayName = name.toUpperCase()

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="title" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#00d4ff"/>
    </linearGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="12" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00d4ff" stroke-opacity="0.08" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#0a0a0f"/>
  <rect x="600" y="0" width="600" height="630" fill="url(#grid)"/>
  <g transform="translate(180 315)" filter="url(#glow)">
    <path d="M0 -120 L104 -72 V24 C104 84 72 132 0 156 C-72 132 -104 84 -104 24 V-72 Z" fill="none" stroke="#00d4ff" stroke-width="4"/>
    <circle cx="0" cy="-12" r="34" fill="none" stroke="#00d4ff" stroke-width="4"/>
    <circle cx="0" cy="-12" r="10" fill="#00d4ff"/>
    <path d="M-22 -12 H22 M0 -34 V10" stroke="#00d4ff" stroke-width="3" stroke-linecap="round"/>
  </g>
  <text x="420" y="285" fill="url(#title)" font-family="Arial, Helvetica, sans-serif" font-size="88" font-weight="700" letter-spacing="6">${displayName}</text>
  <text x="420" y="350" fill="#e8eef2" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="500" letter-spacing="8">${tagline}</text>
  <rect x="420" y="370" width="320" height="3" fill="#00d4ff"/>
</svg>`
}