import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { buildRouteHead, siteBrand } from './config/seo'
import { HomePage } from './routes/HomePage'
import { LegalPage } from './routes/LegalPage'
import { RootLayout } from './routes/RootLayout'

const rootRoute = createRootRoute({
  component: RootLayout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
  head: () => buildRouteHead('/'),
})

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy',
  component: () => (
    <LegalPage title="Privacy Policy">
      <p>
        {siteBrand.name} respects your privacy. We collect only the information necessary to deliver
        security assessments and respond to inquiries. Data is encrypted in transit and at rest,
        retained only for the duration required by engagement contracts, and never sold to third
        parties.
      </p>
      <p>
        For data access requests or privacy questions, contact{' '}
        <a href={`mailto:${siteBrand.emails.privacy}`}>{siteBrand.emails.privacy}</a>.
      </p>
    </LegalPage>
  ),
  head: () => buildRouteHead('/privacy'),
})

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms',
  component: () => (
    <LegalPage title="Terms of Service">
      <p>
        By engaging {siteBrand.name} services, you agree to scoped testing boundaries, responsible
        disclosure protocols, and confidentiality terms outlined in your statement of work.
        Unauthorized security testing outside agreed scope is prohibited.
      </p>
      <p>
        For contractual questions, contact{' '}
        <a href={`mailto:${siteBrand.emails.legal}`}>{siteBrand.emails.legal}</a>.
      </p>
    </LegalPage>
  ),
  head: () => buildRouteHead('/terms'),
})

const routeTree = rootRoute.addChildren([indexRoute, privacyRoute, termsRoute])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}