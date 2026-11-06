import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Section } from './components/Section'

const placeholder = <p className="text-muted">Раздел в работе.</p>

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Section id="about" eyebrow="О себе" title="Кто я и что умею">
          {placeholder}
        </Section>
        <Section id="texts" eyebrow="Тексты" title="Лонгриды, которые читают">
          {placeholder}
        </Section>
        <Section id="tools" eyebrow="Инструменты" title="Автоматизация, которую я собрал">
          {placeholder}
        </Section>
        <Section id="experience" eyebrow="Опыт" title="Где и чем занимался">
          {placeholder}
        </Section>
        <Section id="skills" eyebrow="Навыки" title="Чем владею">
          {placeholder}
        </Section>
        <Section id="contacts" eyebrow="Контакты" title="Напишите мне">
          {placeholder}
        </Section>
      </main>
      <Footer />
    </>
  )
}
