import { content } from '../content'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Skills() {
  return (
    <Section id="skills" eyebrow="Навыки" title="Чем владею">
      <div className="grid gap-8 sm:grid-cols-3">
        {content.skills.map((group, index) => (
          <Reveal key={group.title} delay={index * 0.05}>
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                {group.title}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-surface px-3 py-1 text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
