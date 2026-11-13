import { createContext, useContext, type ReactNode } from 'react'
import { folioFor } from './shared'
import type { SectionId, SectionMeta, SiteContent } from './types'

const SiteContext = createContext<SiteContent | null>(null)

export function SiteProvider({
  site,
  children,
}: {
  site: SiteContent
  children: ReactNode
}) {
  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>
}

export function useSite(): SiteContent {
  const site = useContext(SiteContext)
  if (!site) throw new Error('useSite must be used inside SiteProvider')
  return site
}

export function useSection(
  id: SectionId,
): SectionMeta & { id: SectionId; folio: string } {
  const site = useSite()
  const index = site.order.indexOf(id)
  if (index < 0) throw new Error(`Section ${id} is not in site.order`)
  return { id, ...site.sections[id], folio: folioFor(index) }
}
