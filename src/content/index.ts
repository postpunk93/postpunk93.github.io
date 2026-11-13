import { automation } from './automation'
import { editor } from './editor'
import type { Edition, SiteContent } from './types'

export type {
  Contact,
  Edition,
  ExperienceItem,
  Profile,
  ProofPoint,
  SectionId,
  SectionMeta,
  SiteContent,
  SkillGroup,
  TextCard,
  ToolCard,
  VideoChapter,
} from './types'
export { editionDate, editionYear, folioFor } from './shared'

export const editions: Record<Edition, SiteContent> = { editor, automation }

export function contentFor(edition: Edition): SiteContent {
  return editions[edition]
}

export function getEdition(): Edition {
  return document.documentElement.dataset.edition === 'automation'
    ? 'automation'
    : 'editor'
}
