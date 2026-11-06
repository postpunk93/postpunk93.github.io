import { content } from '../content'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Contacts() {
  return (
    <Section id="contacts" eyebrow="Контакты" title="Напишите мне">
      <ul className="grid gap-3 sm:grid-cols-3">
        {content.contacts.map((contact, index) => (
          <li key={contact.href}>
            <Reveal delay={index * 0.05}>
              <a
                href={contact.href}
                className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-line bg-surface p-5 transition hover:border-accent"
                {...(contact.href.startsWith('http')
                  ? { target: '_blank', rel: 'noreferrer' }
                  : {})}
              >
                <span className="text-xs uppercase tracking-[0.14em] text-muted">
                  {contact.label}
                </span>
                <span className="flex items-center justify-between gap-2 text-sm font-medium transition group-hover:text-accent">
                  {contact.value}
                  <span aria-hidden="true">↗</span>
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
