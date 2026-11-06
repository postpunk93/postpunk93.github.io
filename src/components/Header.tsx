import { useEffect, useRef, useState } from 'react'
import { ThemeToggle } from './ThemeToggle'

const sections = [
  { id: 'texts', label: '01 · Тексты' },
  { id: 'tools', label: '02 · Инструменты' },
  { id: 'about', label: '03 · О себе' },
  { id: 'experience', label: '04 · Опыт' },
  { id: 'skills', label: '05 · Навыки' },
  { id: 'contacts', label: '06 · Контакты' },
]

const navigation = [
  { href: '#texts', label: 'Тексты' },
  { href: '#tools', label: 'Инструменты' },
  { href: '#about', label: 'О себе' },
  { href: '#experience', label: 'Опыт' },
  { href: '#contacts', label: 'Контакты' },
]

export function Header() {
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(sections[0].id)
  const progressRef = useRef<HTMLSpanElement>(null)
  const frameRef = useRef(0)

  useEffect(() => {
    const update = () => {
      frameRef.current = 0
      const y = window.scrollY
      setVisible(y > 140)

      const max = document.documentElement.scrollHeight - window.innerHeight
      const ratio = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${ratio})`
      }

      let current = sections[0].id
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element && element.getBoundingClientRect().top <= 160) {
          current = section.id
        }
      }
      if (y + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        current = sections[sections.length - 1].id
      }
      setActive((previous) => (previous === current ? previous : current))
    }

    const onScroll = () => {
      if (!frameRef.current) frameRef.current = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const current = sections.find((section) => section.id === active) ?? sections[0]

  return (
    <header
      className={`running-head${visible ? ' is-visible' : ''}`}
      inert={!visible}
      aria-hidden={visible ? undefined : true}
    >
      <div className="sheet running-inner">
        <a href="#top" className="running-name">
          А. Кузакин
        </a>
        <p className="running-section">{current.label}</p>
        <nav className="running-nav" aria-label="Разделы номера">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={
                `#${active}` === item.href ? 'true' : undefined
              }
            >
              {item.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
        <span ref={progressRef} className="running-progress" aria-hidden="true" />
      </div>
    </header>
  )
}
