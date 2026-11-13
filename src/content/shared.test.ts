import { describe, expect, it } from 'vitest'
import {
  contacts,
  experienceBase,
  sections,
  skills,
  texts,
  tools,
} from './shared'

const sectionIds = [
  'video',
  'texts',
  'tools',
  'about',
  'experience',
  'skills',
  'contacts',
] as const

describe('shared facts', () => {
  it('содержит восемь публикаций, у семи есть просмотры, сумма 369', () => {
    expect(texts).toHaveLength(8)
    const views = texts
      .map((text) => text.views.match(/^(\d+)/))
      .filter((match): match is RegExpMatchArray => match !== null)
      .map((match) => Number(match[1]))

    expect(views).toHaveLength(7)
    expect(views.reduce((sum, value) => sum + value, 0)).toBe(369)
  })

  it('содержит три инструмента, все в публичных репозиториях, без media-scan', () => {
    expect(tools.map((tool) => tool.name)).toEqual([
      'article-layout',
      'video-factory',
      'vacancy-hunter',
    ])
    for (const tool of tools) {
      expect(tool.href).toMatch(/^https:\/\/github\.com\/postpunk93\//)
    }
    expect(JSON.stringify(tools)).not.toContain('media-scan')
  })

  it('держит контакты и метаданные всех разделов', () => {
    expect(contacts.map((contact) => contact.label)).toEqual([
      'Почта',
      'Telegram',
      'Телефон',
    ])
    for (const id of sectionIds) {
      expect(sections[id].title.trim()).not.toBe('')
      expect(sections[id].short.trim()).not.toBe('')
    }
  })

  it('держит общий опыт и три группы навыков', () => {
    expect(experienceBase.map((item) => item.company)).toEqual([
      'RuminLab',
      'Фриланс',
    ])
    expect(Object.keys(skills)).toEqual(['texts', 'ai', 'web'])
  })
})
