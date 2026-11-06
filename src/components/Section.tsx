import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  title: string
  eyebrow?: string
  children: ReactNode
}

export function Section({ id, title, eyebrow, children }: SectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-line py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          {eyebrow ? (
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
        </Reveal>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}
