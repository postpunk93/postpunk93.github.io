import { content } from '../content'
import { Section } from './Section'

export function Experience() {
  return (
    <Section
      id="experience"
      folio="04"
      title="Опыт"
      note="Журнал эксплуатации · 2016—2026"
    >
      <div className="exp">
        {content.experience.map((item) => (
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
