import { render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

const pageSections = () =>
  Array.from(document.querySelectorAll('main > section')).map(
    (element) => element.id,
  )

const rail = () => screen.getByLabelText('Содержание страницы')

const railHrefs = () =>
  within(rail())
    .getAllByRole('link')
    .map((link) => link.getAttribute('href'))
    .filter((href): href is string => href?.startsWith('#') ?? false)

beforeEach(() => {
  delete document.documentElement.dataset.edition
})

describe('App', () => {
  it('по умолчанию показывает контент-выпуск', () => {
    render(<App />)

    expect(screen.getAllByText('Контент-маркетолог').length).toBeGreaterThan(0)
    expect(
      screen.getByRole('heading', { level: 2, name: /Пишу лонгриды/ }),
    ).toBeInTheDocument()
    expect(pageSections()).toEqual([
      'top',
      'video',
      'texts',
      'tools',
      'about',
      'experience',
      'skills',
      'contacts',
    ])
    expect(railHrefs()).toEqual([
      '#video',
      '#texts',
      '#tools',
      '#about',
      '#experience',
      '#skills',
      '#contacts',
    ])
    expect(
      screen.getByRole('link', { name: /Все 8 публикаций/ }),
    ).toHaveAttribute('href', '#texts')
    expect(
      screen.getByRole('link', { name: /Версия для AI-автоматизации/ }),
    ).toHaveAttribute('href', '/ai/')
  })

  it('в AI-выпуске инструменты идут раньше текстов', () => {
    render(<App edition="automation" />)

    expect(screen.getAllByText('AI-автоматизатор').length).toBeGreaterThan(0)
    expect(
      screen.getByRole('heading', { level: 2, name: /Собираю AI-инструменты/ }),
    ).toBeInTheDocument()
    expect(pageSections()).toEqual([
      'top',
      'video',
      'tools',
      'texts',
      'about',
      'experience',
      'skills',
      'contacts',
    ])
    expect(railHrefs()).toEqual([
      '#video',
      '#tools',
      '#texts',
      '#about',
      '#experience',
      '#skills',
      '#contacts',
    ])
    expect(
      screen.getByRole('link', { name: /Все 3 инструмента/ }),
    ).toHaveAttribute('href', '#tools')
    expect(
      screen.getByRole('link', { name: /Версия для контента/ }),
    ).toHaveAttribute('href', '/')
    expect(screen.getAllByText('01 · Инструменты').length).toBeGreaterThan(0)
    expect(screen.getAllByText('02 · Тексты').length).toBeGreaterThan(0)
  })

  it('показывает ведущую ветку в анонсах', () => {
    const { unmount } = render(<App />)
    expect(
      screen.getAllByText(/Мое производство на 90 млн/).length,
    ).toBeGreaterThan(0)
    unmount()

    render(<App edition="automation" />)
    expect(screen.getAllByText('article-layout').length).toBeGreaterThan(0)
  })

  it('выводит эффект инструмента отдельным слотом, а не числом', () => {
    render(<App edition="automation" />)

    const effects = Array.from(
      document.querySelectorAll('.teasers .views--effect'),
    )
    expect(effects).toHaveLength(3)
    expect(effects[0]).toHaveTextContent(/4 часа/)
    expect(effects[1]).toHaveTextContent(/5 дней/)
    expect(effects[2]).toHaveTextContent(/один дайджест/)
    expect(
      document.querySelectorAll('.teasers .views:not(.views--effect)'),
    ).toHaveLength(0)
  })

  it('держит видео, Telegram, контакты и переключатель темы', () => {
    render(<App />)

    const video = document.querySelector('video')
    expect(video).toHaveAttribute('src', '/vizitka.mp4')
    expect(video).toHaveAttribute('poster', '/vizitka-poster.jpg')
    expect(
      screen.getAllByRole('link', { name: /Написать в Telegram/ }).length,
    ).toBeGreaterThan(0)
    expect(
      screen.getAllByText('kuzakin.work@gmail.com').length,
    ).toBeGreaterThan(0)
    expect(
      screen.getByRole('button', { name: /Сменить тему/ }),
    ).toBeInTheDocument()
  })

  it('держит новые заметки разделов', () => {
    render(<App />)

    expect(
      screen.getAllByText('3 инструмента · 3 публичных репозитория').length,
    ).toBeGreaterThan(0)
    expect(screen.getAllByText('2016—2026').length).toBeGreaterThan(0)
  })
})
