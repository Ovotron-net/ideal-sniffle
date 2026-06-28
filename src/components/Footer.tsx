import { Link } from '@tanstack/react-router'
import { siteBrand } from '../config/seo'
import { SECTION } from '../config/sections'
import { useSiteContent } from '../hooks/useSiteContent'
import { Logo } from './Logo'

export function Footer() {
  const { content } = useSiteContent()

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo footer-logo" aria-label={siteBrand.homeAriaLabel}>
            <Logo />
          </Link>
          <p className="footer-tagline">{siteBrand.tagline}</p>
        </div>

        <nav className="footer-nav" aria-label="Footer services">
          <h4>Services</h4>
          <ul>
            {content?.footerServices.map((service) => (
              <li key={service}>
                <Link to="/" hash={SECTION.services}>
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-contact">
          <h4>Contact</h4>
          <ul>
            <li>
              <a href={`mailto:${siteBrand.emails.security}`}>{siteBrand.emails.security}</a>
            </li>
            <li>
              <a href="tel:+18005551234">+1 (800) 555-1234</a>
            </li>
            <li>San Francisco, CA</li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Connect</h4>
          <ul className="social-links">
            <li>
              <a
                href={siteBrand.social.linkedin}
                aria-label="LinkedIn"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.13-.02-2.57-1.56-2.57-1.56 0-1.8 1.22-1.8 2.49V19h-3v-9h2.89v1.23h.04a3.17 3.17 0 012.85-1.56c3.05 0 3.61 2.01 3.61 4.64V19z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href={siteBrand.social.x}
                aria-label="X / Twitter"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href={siteBrand.social.github}
                aria-label="GitHub"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom container">
        <p>{siteBrand.copyright}</p>
        <ul className="footer-legal">
          <li>
            <Link to="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/terms">Terms of Service</Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}