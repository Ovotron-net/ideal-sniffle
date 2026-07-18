import { siteBrand } from '../config/seo'

export function Logo() {
  return (
    <img
      className="logo-banner"
      src="/ovotron-banner.png"
      alt={siteBrand.name}
      width={672}
      height={179}
      decoding="async"
    />
  )
}