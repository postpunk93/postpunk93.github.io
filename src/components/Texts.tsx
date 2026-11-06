import { content } from '../content'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Texts() {
  return (
    <Section
      id="texts"
      eyebrow="Тексты"
      title="Лонгриды, которые читают"
      contained={false}
    >
      <ul className="space-y-3">
        {content.texts.map((text, index) => (
          <li key={text.href}>
            <Reveal delay={index * 0.04}>
              <a
                href={text.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col justify-between gap-4 rounded-2xl border border-line bg-surface p-5 transition hover:border-accent"
              >
                <h3 className="text-base font-medium leading-snug transition group-hover:text-accent">
                  {text.title}
                </h3>
                <p className="text-xs text-muted">
                  {text.source} · {text.views}
                </p>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
