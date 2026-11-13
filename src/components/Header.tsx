import { useEffect, useRef, useState } from 'react'
import { folioFor } from '../content'
import { useSite } from '../content/context'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const site = useSite()
  const navigation = site.order
    .filter((id) => id !== 'video' && id !== 'skills')
    .map((id) => ({
      id,
      href: `#${id}`,
      label: `${folioFor(site.order.indexOf(id))} · ${site.sections[id].title}`,
    }))
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(navigation[0].id)
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

      let current = navigation[0].id
      for (const item of navigation) {
        const element = document.getElementById(item.id)
        if (element && element.getBoundingClientRect().top <= 160) {
          current = item.id
        }
      }
      if (y + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        current = navigation[navigation.length - 1].id
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

  const current =
    navigation.find((item) => item.id === active) ?? navigation[0]
  const [firstName, ...lastName] = site.profile.name.split(' ')
  const shortName = `${firstName[0]}. ${lastName.join(' ')}`

  return (
    <header
      className={`running-head${visible ? ' is-visible' : ''}`}
      inert={!visible}
      aria-hidden={visible ? undefined : true}
    >
      <div className="sheet running-inner">
        <a href="#top" className="running-name">
          {shortName}
        </a>
        <p className="running-section">{current.label}</p>
        <nav className="running-nav" aria-label="Разделы страницы">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.id ? 'true' : undefined}
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
