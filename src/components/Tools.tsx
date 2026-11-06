import { content } from '../content'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Tools() {
  return (
    <Section
      id="tools"
      eyebrow="Инструменты"
      title="Автоматизация, которую я собрал"
      contained={false}
    >
      <ul className="space-y-3">
        {content.tools.map((tool, index) => (
          <li key={tool.name}>
            <Reveal delay={index * 0.04}>
              <article className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-surface p-5 transition hover:border-accent">
                <h3 className="font-mono text-sm font-medium">{tool.name}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {tool.summary}
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {tool.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line px-2 py-0.5 text-[11px] text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto text-xs">
                  <span className="font-medium text-accent">Эффект: </span>
                  <span className="text-muted">{tool.effect}</span>
                </p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
