import { content } from '../content'
import { Section } from './Section'

export function About() {
  const { about, profile } = content

  return (
    <Section id="about" folio="03" title="О себе" note="Пояснение к номеру">
      <div className="about-grid">
        <div className="about-prose">
          {about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <aside className="pull">
          <p className="pull-text">
            «Рутину вокруг текста терпеть не умею — как только задача повторяется,
            я превращаю её в инструмент.»
          </p>
          <p className="pull-sign">
            {profile.name} · {profile.location}
          </p>
        </aside>
      </div>
    </Section>
  )
}
