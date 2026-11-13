import { useEffect, type ComponentType } from 'react'
import { About } from './components/About'
import { Contacts } from './components/Contacts'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Skills } from './components/Skills'
import { Texts } from './components/Texts'
import { Tools } from './components/Tools'
import { Video } from './components/Video'
import { contentFor, getEdition } from './content'
import { SiteProvider } from './content/context'
import type { Edition, SectionId } from './content/types'

const sectionComponents: Record<SectionId, ComponentType> = {
  video: Video,
  texts: Texts,
  tools: Tools,
  about: About,
  experience: Experience,
  skills: Skills,
  contacts: Contacts,
}

export default function App({ edition }: { edition?: Edition } = {}) {
  const site = contentFor(edition ?? getEdition())

  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return

    const target = document.getElementById(id)
    if (!target) return

    const frame = requestAnimationFrame(() => {
      target.scrollIntoView({ block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <SiteProvider site={site}>
      <a className="skip" href="#main">
        Перейти к содержанию
      </a>
      <Header />
      <main id="main">
        <Hero />
        {site.order.map((id) => {
          const SectionComponent = sectionComponents[id]
          return <SectionComponent key={id} />
        })}
      </main>
      <Footer />
    </SiteProvider>
  )
}
