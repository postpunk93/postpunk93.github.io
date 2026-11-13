import { useSite, useSection } from '../content/context'
import { Section } from './Section'

export function Experience() {
  const { id, folio, title, note } = useSection('experience')
  const { experience } = useSite()

  return (
    <Section id={id} folio={folio} title={title} note={note}>
      <div className="exp">
        {experience.map((item) => (
          <div className="exp-row" key={item.company}>
            <div className="exp-meta">
              <p className="exp-period">{item.period}</p>
              <p className="exp-place">{item.company}</p>
            </div>
            <div>
              <h3 className="exp-role">{item.role}</h3>
              <p className="exp-summary">{item.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
