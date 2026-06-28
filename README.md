# Ovotron — Cybersecurity Website

A modern, animated single-page website for an enterprise cybersecurity business.

## Stack

- **React 19** + **TypeScript** + **Vite 7**
- **TanStack Router** — client-side routing
- **TanStack Query** — server state
- **Orval** — OpenAPI → types, hooks, MSW mocks
- **MSW** — API mocking in development
- **Hono** — local dev API server

## Quick Start

### MSW mocks (default)

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). MSW intercepts `/api/v1/*`.

### Local API server (real backend)

```bash
npm run dev:full
```

Runs Hono API on `:3001` + Vite with proxy. MSW disabled.

### Remote backend

Copy `.env.example` → `.env.local`:

```env
VITE_USE_MSW=false
VITE_API_URL=https://api.ovotron.io/api/v1
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite + MSW mocks |
| `npm run dev:api` | Hono API server only (`:3001`) |
| `npm run dev:full` | API server + Vite (no MSW) |
| `npm run generate:api` | Regenerate from OpenAPI spec |
| `npm run generate:seo` | Regenerate sitemap, robots.txt, og-image.png |
| `npm run build` | Production build |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/site-content` | Hero stats, services, industries |
| GET | `/api/v1/threat-feed` | SOC dashboard threat signals |
| GET | `/api/v1/case-studies` | Published case studies |
| POST | `/api/v1/consultation-requests` | Submit consultation form |

Spec: `openapi/ovotron.openapi.yaml`

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_USE_MSW` | `true` | Enable MSW in dev |
| `VITE_API_URL` | `/api/v1` | API base URL |
| `VITE_API_PROXY_TARGET` | `http://localhost:3001` | Vite proxy target |
| `VITE_SITE_URL` | `https://ovotron.io` | Canonical site URL for SEO meta |

## SEO

Per-route `<title>`, description, Open Graph, and Twitter cards are managed via TanStack Router `head()` in [`src/router.tsx`](src/router.tsx), with defaults in [`src/config/seo.ts`](src/config/seo.ts). Brand name, contact emails, social links, and logo text live in [`src/config/brand.ts`](src/config/brand.ts).

Static crawl assets are generated from the same site URL as SEO meta (`VITE_SITE_URL`):

- [`public/robots.txt`](public/robots.txt)
- [`public/sitemap.xml`](public/sitemap.xml)
- [`public/og-image.png`](public/og-image.png) — social preview image

Run `npm run generate:seo` after changing `VITE_SITE_URL` or brand defaults. `dev` and `build` run this automatically.

The home page includes Organization JSON-LD structured data.

## Accessibility

- Skip link, section landmarks, and form label associations
- Mobile nav: Escape to close, focus returns to toggle
- `prefers-reduced-motion` respected globally in [`src/styles/base.css`](src/styles/base.css)
- `eslint-plugin-jsx-a11y` enforces recommended a11y rules (`npm run lint`)

## Project Structure

```
content/           # seed.json — single content source
openapi/           # OpenAPI spec
public/            # robots.txt, sitemap.xml, og-image.png
server/            # Hono dev API
src/api/generated/ # Orval output
src/config/        # brand defaults, sections registry, SEO metadata
scripts/           # generate-seo-static.ts
src/mocks/         # MSW worker + fixtures
src/styles/        # modular CSS
```