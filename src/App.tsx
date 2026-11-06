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
      <Header />
      <main>
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
