import { About } from './components/About'
import { Contacts } from './components/Contacts'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Skills } from './components/Skills'
import { Texts } from './components/Texts'
import { Tools } from './components/Tools'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:shadow-lg"
      >
        Перейти к содержанию
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid lg:grid-cols-2 lg:gap-10">
            <Texts />
            <Tools />
          </div>
        </div>
        <Experience />
        <Skills />
        <Contacts />
      </main>
      <Footer />
    </>
  )
}
