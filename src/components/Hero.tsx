import { content } from '../content'
import { Reveal } from './Reveal'

export function Hero() {
  const { profile, contacts } = content

  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-40 h-80 w-80 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: 'var(--c-accent)' }}
      />

      <div className="mx-auto flex max-w-5xl flex-col gap-7 px-6 pb-16 pt-16 sm:pb-24 sm:pt-24">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: 'var(--c-accent)' }}
            />
            {profile.availability}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            {profile.name}
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            {profile.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-sm text-muted">{profile.location}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#texts"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-page transition hover:opacity-90"
            >
              Тексты
            </a>
            <a
              href="#tools"
              className="rounded-full border border-line px-5 py-2.5 text-sm font-medium transition hover:border-accent hover:text-accent"
            >
              Инструменты
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {contacts.map((contact) => (
              <li key={contact.href}>
                <a
                  href={contact.href}
                  className="transition hover:text-accent"
                  {...(contact.href.startsWith('http')
                    ? { target: '_blank', rel: 'noreferrer' }
                    : {})}
                >
                  {contact.value}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
