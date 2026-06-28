import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import sharp from 'sharp'
import { loadEnv } from 'vite'
import { brand, defaultSiteUrl } from '../src/config/brand.ts'
import { buildOgImageSvg, buildRobotsTxt, buildSitemapXml } from '../src/config/seo-static.ts'

const mode = process.argv[2] ?? (process.env.NODE_ENV === 'production' ? 'production' : 'development')
const env = loadEnv(mode, process.cwd(), 'VITE_')
const siteUrl = env.VITE_SITE_URL || process.env.VITE_SITE_URL || defaultSiteUrl(brand.domain)
const publicDir = resolve(process.cwd(), 'public')

writeFileSync(resolve(publicDir, 'sitemap.xml'), buildSitemapXml(siteUrl), 'utf8')
writeFileSync(resolve(publicDir, 'robots.txt'), buildRobotsTxt(siteUrl), 'utf8')

const ogSvg = buildOgImageSvg()
await sharp(Buffer.from(ogSvg)).png().toFile(resolve(publicDir, 'og-image.png'))

console.log(`Generated SEO assets for ${siteUrl}`)