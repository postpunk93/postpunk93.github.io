import { content } from '../content'
import { ArrowText } from './Arrow'
import { Section } from './Section'

export function Tools() {
  const { tools } = content

  return (
    <Section
      id="tools"
      folio="02"
      title="Инструменты"
      note={`${tools.length} инструмента · собраны и работают`}
    >
      <div className="tools-grid">
        {tools.map((tool, index) => (
          <article className="tool" key={tool.name}>
            <h3 className="tool-name">
              <span>{String(index + 1).padStart(2, '0')}</span>
              {tool.href ? (
                <a href={tool.href} target="_blank" rel="noreferrer">
                  {tool.name}
                </a>
              ) : (
                <span>{tool.name}</span>
              )}
            </h3>
            <p className="tool-effect">
              <ArrowText text={tool.effect} />
            </p>
            <p className="tool-summary">{tool.summary}</p>
            <p className="tool-stack">{tool.stack.join(' · ')}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
