import { useEffect } from 'react'
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

export default function App() {
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
    <>
      <a className="skip" href="#main">
        Перейти к содержанию
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Video />
        <Texts />
        <Tools />
        <About />
        <Experience />
        <Skills />
        <Contacts />
      </main>
      <Footer />
    </>
  )
}
