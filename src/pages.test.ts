import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const read = (path: string) =>
  readFileSync(new URL(path, import.meta.url), 'utf8')

const inlineScript = (html: string) =>
  html.match(/<script>\s*([\s\S]*?)<\/script>/)?.[1] ?? ''

describe('pages', () => {
  const editor = read('../index.html')
  const automation = read('../ai/index.html')

  it('помечает выпуски и задаёт разные заголовки', () => {
    expect(editor).toContain('data-edition="editor"')
    expect(automation).toContain('data-edition="automation"')
    expect(editor).toContain(
      '<title>Александр Кузакин — контент-маркетолог</title>',
    )
    expect(automation).toContain(
      '<title>Александр Кузакин — AI-автоматизатор</title>',
    )
  })

  it('даёт разные описания и OG-описания', () => {
    expect(editor).toContain('Александр Кузакин — контент-маркетолог.')
    expect(automation).toContain('Александр Кузакин — AI-автоматизатор.')
    expect(editor).not.toContain('Собираю AI-инструменты и довожу их')
    expect(automation).toContain('Собираю AI-инструменты и довожу их')
  })

  it('держит мета-описания в одной формулировке с выпуском', () => {
    expect(editor).toContain('три инструмента в работе')
    expect(editor).not.toContain('в продакшене')
    expect(editor).not.toContain('Рутину')
  })

  it('грузит общий код и favicon из корня', () => {
    for (const html of [editor, automation]) {
      expect(html).toContain('src="/src/main.tsx"')
      expect(html).toContain('href="/favicon.svg"')
    }
  })

  it('держит одинаковый скрипт темы', () => {
    expect(inlineScript(editor)).not.toBe('')
    expect(inlineScript(editor)).toBe(inlineScript(automation))
  })
})
