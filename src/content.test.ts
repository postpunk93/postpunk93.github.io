import { describe, expect, it } from 'vitest'
import { content } from './content'

describe('content', () => {
  it('содержит непустое имя', () => {
    expect(content.profile.name.trim()).not.toBe('')
  })

  it('содержит не меньше четырёх статей со всеми полями', () => {
    expect(content.texts.length).toBeGreaterThanOrEqual(4)
    for (const text of content.texts) {
      expect(text.title.trim()).not.toBe('')
      expect(text.source.trim()).not.toBe('')
      expect(text.views.trim()).not.toBe('')
      expect(text.href).toMatch(/^https:\/\//)
    }
  })

  it('содержит не меньше трёх инструментов с описанием и стеком', () => {
    expect(content.tools.length).toBeGreaterThanOrEqual(3)
    for (const tool of content.tools) {
      expect(tool.name.trim()).not.toBe('')
      expect(tool.summary.trim()).not.toBe('')
      expect(tool.stack.length).toBeGreaterThan(0)
      expect(tool.effect.trim()).not.toBe('')
    }
  })

  it('ведёт с инструментов в опубликованные репозитории', () => {
    const linked = content.tools.filter((tool) => tool.href)
    expect(linked.length).toBeGreaterThanOrEqual(3)
    for (const tool of linked) {
      expect(tool.href).toMatch(/^https:\/\/github\.com\/postpunk93\//)
    }
  })

  it('дает контактам рабочие ссылки', () => {
    expect(content.contacts.length).toBeGreaterThan(0)
    for (const contact of content.contacts) {
      expect(contact.href).toMatch(/^(mailto:|tel:|https:\/\/)/)
    }
  })
})
