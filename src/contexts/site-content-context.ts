import { createContext } from 'react'
import type { SiteContent } from '../api/generated/models'

export type SiteContentContextValue = {
  content: SiteContent | undefined
  isLoading: boolean
  isError: boolean
}

export const SiteContentContext = createContext<SiteContentContextValue | null>(null)