import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  folio: string
  title: string
  note?: string
  children: ReactNode
}

export function Section({ id, folio, title, note, children }: SectionProps) {
  return (
    <section id={id} className="section">
      <div className="sheet section-grid">
        <div className="section-margin" aria-hidden="true">
          <span className="section-folio">{folio}</span>
        </div>
        <div className="section-main">
          <header className="section-head">
            <h2 className="section-title">{title}</h2>
            {note ? <p className="section-note">{note}</p> : null}
          </header>
          {children}
        </div>
      </div>
    </section>
  )
}
