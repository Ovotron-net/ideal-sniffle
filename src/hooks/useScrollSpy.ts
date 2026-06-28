import { useEffect, useState } from 'react'
import { sectionIds } from '../config/sections'

export function useScrollSpy() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    function onScroll() {
      let current = ''
      for (const id of sectionIds) {
        const section = document.getElementById(id)
        if (section && window.scrollY >= section.offsetTop - 120) {
          current = id
        }
      }
      setActiveSection(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return activeSection
}