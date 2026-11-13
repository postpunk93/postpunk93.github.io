import { afterEach, describe, expect, it } from 'vitest'
import { contentFor, editions, folioFor, getEdition } from './content'

const editorOrder = [
  'video',
  'texts',
  'tools',
  'about',
  'experience',
  'skills',
  'contacts',
]

const automationOrder = [
  'video',
  'tools',
  'texts',
  'about',
  'experience',
  'skills',
  'contacts',
]

const forbidden = [
  'две компетенции',
  'Пишет то',
  'стенды',
  'допуски',
  'приёмная',
  'журнал эксплуатации',
  'подстраиваюсь',
]

afterEach(() => {
  delete document.documentElement.dataset.edition
})

describe('editions', () => {
  it('собирает оба выпуска и делит факты', () => {
    expect(editions.editor.profile.role).toBe('Контент-маркетолог')
    expect(editions.automation.profile.role).toBe('AI-автоматизатор')
    expect(editions.editor.texts).toEqual(editions.automation.texts)
    expect(editions.editor.tools).toEqual(editions.automation.tools)
    expect(editions.editor.contacts).toEqual(editions.automation.contacts)
    expect(editions.editor.videoChapters).toEqual(
      editions.automation.videoChapters,
    )
    expect(editions.editor.profile.name).toBe(
      editions.automation.profile.name,
    )
    expect(
      editions.editor.experience.map(({ company, role, period }) => ({
        company,
        role,
        period,
      })),
    ).toEqual(
      editions.automation.experience.map(({ company, role, period }) => ({
        company,
        role,
        period,
      })),
    )
  })

  it('держит по три доказательства в заданном порядке', () => {
    expect(editions.editor.proof.map((point) => point.value)).toEqual([
      '141 тыс.',
      '4 ч\u00A0→ 10 мин',
      '3',
    ])
    expect(editions.automation.proof.map((point) => point.value)).toEqual([
      '3',
      '3',
      '4 ч\u00A0→ 10 мин',
    ])
  })

  it('ставит разделы в порядке выпуска', () => {
    expect(editions.editor.order).toEqual(editorOrder)
    expect(editions.automation.order).toEqual(automationOrder)
    expect(editions.editor.heroLead).toBe('texts')
    expect(editions.automation.heroLead).toBe('tools')
  })

  it('не содержит запрещённых меток и удалённого инструмента', () => {
    const copy = JSON.stringify(editions)
    for (const marker of forbidden) {
      expect(copy.toLowerCase()).not.toContain(marker.toLowerCase())
    }
    expect(copy).not.toContain('media-scan')
    expect(editions.editor.tools).toHaveLength(3)
    expect(editions.editor.texts).toHaveLength(8)
  })

  it('ведёт на второй выпуск с обоих адресов', () => {
    expect(editions.editor.crossLink).toEqual({
      label: 'Версия для AI-автоматизации →',
      href: '/ai/',
    })
    expect(editions.automation.crossLink).toEqual({
      label: 'Версия для контента →',
      href: '/',
    })
  })

  it('по умолчанию выбирает контент, читает data-edition и знает contentFor', () => {
    expect(getEdition()).toBe('editor')
    expect(contentFor('editor')).toBe(editions.editor)

    document.documentElement.dataset.edition = 'automation'
    expect(getEdition()).toBe('automation')

    document.documentElement.dataset.edition = 'unknown'
    expect(getEdition()).toBe('editor')
  })

  it('нумерует разделы по порядку', () => {
    expect(folioFor(0)).toBe('00')
    expect(folioFor(1)).toBe('01')
    expect(folioFor(6)).toBe('06')
  })
})
