import { describe, expect, it } from 'vitest'
import { nextTheme, resolveInitialTheme } from './theme'

describe('resolveInitialTheme', () => {
  it('возвращает сохранённую тему как есть', () => {
    expect(resolveInitialTheme('warm', true)).toBe('warm')
  })

  it('без сохранённой темы и тёмной системе отдаёт night', () => {
    expect(resolveInitialTheme(null, true)).toBe('night')
  })

  it('без сохранённой темы и светлой системе отдаёт day', () => {
    expect(resolveInitialTheme(null, false)).toBe('day')
  })

  it('невалидное значение в хранилище считает отсутствующим', () => {
    expect(resolveInitialTheme('purple', true)).toBe('night')
    expect(resolveInitialTheme('purple', false)).toBe('day')
  })
})

describe('nextTheme', () => {
  it('идёт по кругу day → warm → night → day', () => {
    expect(nextTheme('day')).toBe('warm')
    expect(nextTheme('warm')).toBe('night')
    expect(nextTheme('night')).toBe('day')
  })
})
