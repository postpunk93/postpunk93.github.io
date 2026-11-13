export type Edition = 'editor' | 'automation'

export type SectionId =
  | 'video'
  | 'texts'
  | 'tools'
  | 'about'
  | 'experience'
  | 'skills'
  | 'contacts'

export interface Profile {
  name: string
  role: string
  tagline: string
  location: string
  availability: string
}

export interface TextCard {
  title: string
  source: string
  views: string
  href: string
}

export interface ToolCard {
  name: string
  summary: string
  stack: string[]
  effect: string
  href?: string
}

export interface ExperienceItem {
  company: string
  role: string
  period: string
  summary: string
}

export interface SkillGroup {
  title: string
  items: string[]
}

export interface Contact {
  label: string
  value: string
  href: string
}

export interface ProofPoint {
  value: string
  label: string
  source: string
}

export interface VideoChapter {
  time: string
  label: string
}

export interface SectionMeta {
  title: string
  note?: string
  short: string
}

export interface SiteContent {
  edition: Edition
  profile: Profile
  headline: string[]
  heroLead: 'texts' | 'tools'
  about: string[]
  pullQuote: string
  texts: TextCard[]
  tools: ToolCard[]
  videoChapters: VideoChapter[]
  experience: ExperienceItem[]
  skills: SkillGroup[]
  contacts: Contact[]
  proof: ProofPoint[]
  order: SectionId[]
  sections: Record<SectionId, SectionMeta>
  crossLink: { label: string; href: string }
}
