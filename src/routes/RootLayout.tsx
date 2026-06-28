import { HeadContent, Outlet } from '@tanstack/react-router'
import { Footer } from '../components/Footer'
import { GridCanvas } from '../components/GridCanvas'
import { Header } from '../components/Header'
import { SiteContentProvider } from '../providers/SiteContentProvider'

export function RootLayout() {
  return (
    <SiteContentProvider>
      <HeadContent />
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <GridCanvas />
      <div className="scan-line" aria-hidden="true" />

      <Header />

      <Outlet />

      <Footer />
    </SiteContentProvider>
  )
}