# Ovotron — Cybersecurity Website

A modern, animated single-page website for an enterprise cybersecurity business.

## Prerequisites

- **Node.js** >= 22.18.0
- **npm** >= 9

## Stack

- **React 19** + **TypeScript** + **Vite 7**
- **TanStack Router** — client-side routing
- **TanStack Query** — server state
- **Orval** — OpenAPI → types, hooks, MSW mocks
- **MSW** — API mocking in development
- **Hono** — local dev API server
- **Vitest** — unit testing
- **ESLint** — linting with `eslint-plugin-jsx-a11y` for accessibility

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
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests (Vitest) |
| `npm run test:api` | Run API tests only |
| `npm run test:watch` | Run tests in watch mode |
| `npm run check` | Lint + test + build (CI gate) |
| `npm run preview` | Preview production build locally |

## Testing

Tests are written with [Vitest](https://vitest.dev/) and live alongside the code they cover:

```
src/config/seo.test.ts       # SEO config validation
src/mocks/fixtures.test.ts   # Mock fixture schema checks
server/api.test.ts           # API endpoint tests
```

Run all tests:

```bash
npm run test
```

Run only API tests:

```bash
npm run test:api
```

Watch mode for development:

```bash
npm run test:watch
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/site-content` | Hero stats, services, industries |
| GET | `/api/v1/threat-feed` | SOC dashboard threat signals |
| GET | `/api/v1/case-studies` | Published case studies |
| POST | `/api/v1/consultation-requests` | Submit consultation form |
| GET | `/health` | Health check (local API server only) |

Spec: [`openapi/ovotron.openapi.yaml`](openapi/ovotron.openapi.yaml)

### Regenerating API types

When the OpenAPI spec changes, regenerate the TypeScript types and React Query hooks:

```bash
npm run generate:api
```

This uses [Orval](https://orval.dev/) configured in [`orval.config.ts`](orval.config.ts) to produce:

- `src/api/generated/endpoints.ts` — React Query hooks
- `src/api/generated/models/` — TypeScript interfaces
- `src/api/generated/endpoints.msw.ts` — MSW handlers
- `src/api/generated/endpoints.faker.ts` — Faker-based mock factories

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_USE_MSW` | `true` | Enable MSW in dev |
| `VITE_API_URL` | `/api/v1` | API base URL |
| `VITE_API_PROXY_TARGET` | `http://localhost:3001` | Vite proxy target |
| `VITE_SITE_URL` | `https://ovotron.io` | Canonical site URL for SEO meta |

See [`.env.example`](.env.example) for a commented reference of all variables.

## Development Modes

The project supports three development configurations:

1. **MSW mocks** (`npm run dev`) — Default. No server needed. MSW intercepts fetch calls in the browser and returns fixture data. Best for UI development.

2. **Local API server** (`npm run dev:full`) — Runs the Hono server on `:3001` alongside Vite. Vite proxies `/api/v1` to the local server. MSW is disabled. Best for testing server logic.

3. **Remote backend** — Set `VITE_USE_MSW=false` and `VITE_API_URL` to your deployed endpoint. Best for integration testing with a real backend.

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
server/            # Hono dev API + tests
scripts/           # generate-seo-static.ts
src/
  api/generated/   # Orval output (do not edit manually)
  components/      # React UI components
  config/          # brand defaults, sections registry, SEO metadata
  contexts/        # React contexts
  data/            # static data (service icons)
  hooks/           # custom React hooks
  mocks/           # MSW worker + fixtures
  providers/       # React providers (QueryClient, Router, SiteContent)
  routes/          # page-level route components
  styles/          # modular CSS (one file per component/section)
```

## Production Build

```bash
npm run build
```

This generates a static build in `dist/`. The build step:

1. Regenerates API types from the OpenAPI spec
2. Generates SEO static assets (sitemap, robots.txt, og-image)
3. Runs TypeScript type checking
4. Bundles with Vite

Preview the production build locally:

```bash
npm run preview
```
