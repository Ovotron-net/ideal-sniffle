import type { ReactNode } from 'react'

export const serviceIcons: Record<string, ReactNode> = {
  'penetration-testing': (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  'cloud-security': (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 16l4-8 4 6 4-10 4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  'web-app-security': (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  'red-team': (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  'blue-team': (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  'awareness-training': (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 19h16M6 16l3-8 3 5 3-9 3 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  'incident-response': (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 8v4l3 3M12 22a10 10 0 100-20 10 10 0 000 20z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  'vulnerability-management': (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M9 5H5a2 2 0 00-2 2v4m0 4v4a2 2 0 002 2h4m4 0h4a2 2 0 002-2v-4m0-4V7a2 2 0 00-2-2h-4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 9h6v6H9z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
}