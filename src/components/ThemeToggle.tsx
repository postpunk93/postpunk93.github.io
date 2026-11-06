import { useState } from 'react'
import {
  applyTheme,
  nextTheme,
  persistTheme,
  readStoredTheme,
  resolveInitialTheme,
  THEME_LABELS,
  type Theme,
} from '../theme'

function currentTheme(): Theme {
  const fromDom = document.documentElement.dataset.theme
  if (fromDom === 'day' || fromDom === 'warm' || fromDom === 'night') {
    return fromDom
  }

  return resolveInitialTheme(
    readStoredTheme(),
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  )
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(currentTheme)

  function handleClick() {
    const next = nextTheme(theme)
    applyTheme(next)
    persistTheme(next)
    setTheme(next)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Сменить тему, сейчас: ${THEME_LABELS[theme]}`}
      className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-muted transition hover:border-accent hover:text-ink"
    >
      <span
        aria-hidden="true"
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: 'var(--c-accent)' }}
      />
      <span>{THEME_LABELS[theme]}</span>
    </button>
  )
}
