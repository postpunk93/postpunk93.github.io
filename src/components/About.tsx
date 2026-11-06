import { content } from '../content'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function About() {
  return (
    <Section id="about" eyebrow="О себе" title="Кто я и что умею">
      <div className="max-w-3xl space-y-4">
        {content.about.map((paragraph, index) => (
          <Reveal key={paragraph.slice(0, 24)} delay={index * 0.05}>
            <p className="leading-relaxed text-muted">{paragraph}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
