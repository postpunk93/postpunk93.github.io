import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  title: string
  eyebrow?: string
  children: ReactNode
  /** Оборачивать содержимое в контейнер max-w-5xl. Отключается в общем grid. */
  contained?: boolean
}

export function Section({
  id,
  title,
  eyebrow,
  children,
  contained = true,
}: SectionProps) {
  const body = (
    <>
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
    </>
  )

  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-line py-16 sm:py-20"
    >
      {contained ? (
        <div className="mx-auto max-w-5xl px-6">{body}</div>
      ) : (
        body
      )}
    </section>
  )
}
