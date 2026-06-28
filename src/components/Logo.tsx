import { siteBrand } from '../config/seo'

export function Logo() {
  const [prefix, accent] = siteBrand.logoParts

  return (
    <>
      <span className="logo-icon">
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M16 2L28 8v8c0 7.5-5.2 14.5-12 16C9.2 30.5 4 23.5 4 16V8L16 2z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 10v12M12 14l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
      <span className="logo-text">
        {prefix}
        <span className="logo-accent">{accent}</span>
      </span>
    </>
  )
}