import { Link, useRouterState } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { siteBrand } from '../config/seo'
import { navLinks } from '../config/sections'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { Logo } from './Logo'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const activeSection = useScrollSpy()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isHome = pathname === '/'

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen) {
      document.getElementById('nav-menu')?.querySelector<HTMLElement>('.nav-link')?.focus()
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
    toggleRef.current?.focus()
  }

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`} id="header">
      <nav className="nav container" aria-label="Main navigation">
        <Link to="/" className="logo" aria-label={siteBrand.homeAriaLabel} onClick={closeMenu}>
          <Logo />
        </Link>

        <button
          ref={toggleRef}
          className={`nav-toggle${menuOpen ? ' active' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`nav-menu${menuOpen ? ' open' : ''}`} id="nav-menu">
          {navLinks.map((link) => {
            const isActive = isHome && !link.cta && activeSection === link.hash
            return (
              <li key={link.hash ?? link.label}>
                <Link
                  to={link.to}
                  hash={link.hash}
                  className={`nav-link${link.cta ? ' nav-cta' : ''}${isActive ? ' active' : ''}`}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}