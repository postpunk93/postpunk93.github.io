import { useEffect, useState } from 'react'
import {
  applyTheme,
  nextTheme,
  persistTheme,
  readStoredTheme,
  resolveInitialTheme,
  THEME_LABELS,
  type Theme,
} from '../theme'

const THEME_EVENT = 'themechange'

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

  useEffect(() => {
    const sync = () => setTheme(currentTheme())
    window.addEventListener(THEME_EVENT, sync)
    return () => window.removeEventListener(THEME_EVENT, sync)
  }, [])

  function handleClick() {
    const next = nextTheme(theme)
    applyTheme(next)
    persistTheme(next)
    setTheme(next)
    window.dispatchEvent(new Event(THEME_EVENT))
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Сменить тему, сейчас: ${THEME_LABELS[theme]}`}
      title="Сменить тему"
      className="edition-switch"
    >
      <span className="edition-dot" aria-hidden="true" />
      <span>Выпуск: {THEME_LABELS[theme]}</span>
    </button>
  )
}
