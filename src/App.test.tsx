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

  it('даёт кнопке смены темы доступное имя', () => {
    render(<App />)

    expect(
      screen.getByRole('button', { name: /сменить тему/i }),
    ).toBeInTheDocument()
  })
})
