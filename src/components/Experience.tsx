import { content } from '../content'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Experience() {
  return (
    <Section id="experience" eyebrow="Опыт" title="Где и чем занимался">
      <ol className="space-y-8">
        {content.experience.map((item, index) => (
          <li
            key={item.company}
            className="border-t border-line pt-6 first:border-t-0 first:pt-0"
          >
            <Reveal delay={index * 0.05}>
              <div className="grid gap-2 sm:grid-cols-[190px_1fr] sm:gap-8">
                <p className="font-mono text-xs text-muted">{item.period}</p>
                <div>
                  <h3 className="font-medium">
                    {item.role} · {item.company}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                    {item.summary}
                  </p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
