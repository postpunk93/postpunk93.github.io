import { useSite, useSection } from '../content/context'
import { Section } from './Section'

export function Skills() {
  const { id, folio, title, note } = useSection('skills')
  const { skills } = useSite()

  return (
    <Section id={id} folio={folio} title={title} note={note}>
      <div className="skills-grid">
        {skills.map((group) => (
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
