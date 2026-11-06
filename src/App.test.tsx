import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { content } from './content'

describe('App', () => {
  it('показывает имя и ведёт на разделы текстов и инструментов', () => {
    render(<App />)

    expect(
      screen.getAllByText(content.profile.name).length,
    ).toBeGreaterThan(0)

    const textLinks = screen.getAllByRole('link', { name: /тексты/i })
    expect(textLinks.some((link) => link.getAttribute('href') === '#texts')).toBe(
      true,
    )

    const toolLinks = screen.getAllByRole('link', { name: /инструменты/i })
    expect(
      toolLinks.some((link) => link.getAttribute('href') === '#tools'),
    ).toBe(true)
  })

  it('рендерит карточки статей и инструментов из контента', () => {
    render(<App />)

    expect(
      screen.getAllByText(content.texts[0].title).length,
    ).toBeGreaterThan(0)
    expect(
      screen.getAllByText(content.tools[0].name).length,
    ).toBeGreaterThan(0)
    expect(
      screen.getAllByText(content.contacts[0].value).length,
    ).toBeGreaterThan(0)
  })

  it('даёт кнопке смены темы доступное имя', () => {
    render(<App />)

    expect(
      screen.getByRole('button', { name: /сменить тему/i }),
    ).toBeInTheDocument()
  })
})
