import { useSite, useSection } from '../content/context'
import { Section } from './Section'

export function Texts() {
  const { id, folio, title, note } = useSection('texts')
  const { texts } = useSite()
  const featured = texts[0]
  const rest = texts.slice(1)
  const [amount, unit] = featured.views.split(' ')

  return (
    <Section id={id} folio={folio} title={title} note={note}>
      <article className="featured">
        <div>
          <p className="featured-source">{featured.source}</p>
          <h3 className="featured-title">
            <a href={featured.href} target="_blank" rel="noreferrer">
              {featured.title}
            </a>
          </h3>
        </div>
        <div className="featured-view">
          <span className="featured-number">{amount}</span>
          <span className="featured-unit">{unit} просмотров</span>
        </div>
      </article>

      <div className="index">
        {rest.map((text, index) => {
          const hasViews = /^\d/.test(text.views)
          return (
            <a
              className="index-row"
              href={text.href}
              target="_blank"
              rel="noreferrer"
              key={text.href}
            >
              <span className="index-num">
                {String(index + 2).padStart(2, '0')}
              </span>
              <span className="index-title">{text.title}</span>
              <span className="index-source">{text.source}</span>
              <span className={`index-views${hasViews ? '' : ' is-text'}`}>
                {hasViews ? text.views.replace(' просмотров', '') : 'обзор'}
              </span>
            </a>
          )
        })}
      </div>
    </Section>
  )
}
