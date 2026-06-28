export const sections = [
  { id: 'services', label: 'Services', nav: true },
  { id: 'why-us', label: 'Why Us', nav: true },
  { id: 'process', label: 'Process', nav: true },
  { id: 'industries', label: 'Industries', nav: true },
  { id: 'case-studies', label: 'Case Studies', nav: true },
  { id: 'contact', label: 'Get Started', nav: true, cta: true },
] as const

export type SectionId = (typeof sections)[number]['id']

export const sectionIds: SectionId[] = sections.map((section) => section.id)

export const SECTION = Object.fromEntries(sectionIds.map((id) => [id, id])) as {
  [K in SectionId]: K
}

export const navLinks = sections
  .filter((section) => section.nav)
  .map((section) => ({
    to: '/' as const,
    hash: section.id,
    label: section.label,
    cta: 'cta' in section ? section.cta : undefined,
  }))

export const dataStreamHex =
  '0x4F2A8B1C 0x9E3D7F42 0x1A6C5E89 0x8B4F2D01 0x7E9A3C56 0x3D8F1A2B 0x6C4E9F01 0xA1B2C3D4 0x5E7F8A9B 0x2C4D6E8F'