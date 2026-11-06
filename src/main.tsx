import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { applyTheme, readStoredTheme, resolveInitialTheme } from './theme.ts'

const initialTheme = resolveInitialTheme(
  readStoredTheme(),
  window.matchMedia('(prefers-color-scheme: dark)').matches,
)
applyTheme(initialTheme)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
