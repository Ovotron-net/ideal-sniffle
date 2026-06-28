import type { ReactNode } from 'react'
import { useGetSiteContent } from '../api/generated/endpoints'
import { SiteContentContext } from '../contexts/site-content-context'

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, isError } = useGetSiteContent({
    query: { select: (response) => response.data },
  })

  return (
    <SiteContentContext.Provider value={{ content: data, isLoading, isError }}>
      {children}
    </SiteContentContext.Provider>
  )
}