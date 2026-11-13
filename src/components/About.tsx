import { useSite, useSection } from '../content/context'
import { Section } from './Section'

export function About() {
  const { id, folio, title, note } = useSection('about')
  const { about, profile, pullQuote } = useSite()

  return (
    <Section id={id} folio={folio} title={title} note={note}>
      <div className="about-grid">
        <div className="about-prose">
          {about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <aside className="pull">
          <p className="pull-text">«{pullQuote}»</p>
          <p className="pull-sign">
            {profile.name} · {profile.location}
          </p>
        </aside>
      </div>
    </Section>
  )
}
