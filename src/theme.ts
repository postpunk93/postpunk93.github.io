export type Theme = 'day' | 'warm' | 'night'

export const THEMES: Theme[] = ['day', 'warm', 'night']

export const THEME_LABELS: Record<Theme, string> = {
  day: 'Утро',
  warm: 'Вечер',
  night: 'Ночь',
}

export const THEME_STORAGE_KEY = 'theme'

function isTheme(value: string | null): value is Theme {
  return value !== null && (THEMES as string[]).includes(value)
}

export function resolveInitialTheme(
  stored: string | null,
  prefersDark: boolean,
): Theme {
  if (isTheme(stored)) return stored
  return prefersDark ? 'night' : 'day'
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement
  root.dataset.theme = theme
  root.style.colorScheme = theme === 'night' ? 'dark' : 'light'
}

export function persistTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Хранилище может быть недоступно (приватный режим, запрет cookies).
  }
}

export function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    return isTheme(stored) ? stored : null
  } catch {
    return null
  }
}

export function nextTheme(current: Theme): Theme {
  return THEMES[(THEMES.indexOf(current) + 1) % THEMES.length]
}
