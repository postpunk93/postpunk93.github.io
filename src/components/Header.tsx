import { content } from '../content'
import { ThemeToggle } from './ThemeToggle'

const navigation = [
  { href: '#about', label: 'О себе' },
  { href: '#texts', label: 'Тексты' },
  { href: '#tools', label: 'Инструменты' },
  { href: '#experience', label: 'Опыт' },
  { href: '#contacts', label: 'Контакты' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-page/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
        <a
          href="#top"
          className="text-sm font-semibold tracking-tight transition hover:text-accent"
        >
          {content.profile.name}
        </a>

        <nav
          aria-label="Основная навигация"
          className="hidden items-center gap-5 text-sm text-muted md:flex"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  )
}
