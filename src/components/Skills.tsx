import { content } from '../content'
import { Section } from './Section'

export function Skills() {
  return (
    <Section
      id="skills"
      folio="05"
      title="Навыки"
      note="Допуски и инструменты"
    >
      <div className="skills-grid">
        {content.skills.map((group) => (
          <div className="skill-group" key={group.title}>
            <h3 className="skill-title">{group.title}</h3>
            <ul className="skill-list">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
