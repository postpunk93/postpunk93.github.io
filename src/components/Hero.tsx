import { Fragment } from 'react'
import { editionDate, folioFor } from '../content'
import { useSite } from '../content/context'
import { Arrow, ArrowText } from './Arrow'
import { ThemeToggle } from './ThemeToggle'

export function Hero() {
  const site = useSite()
  const {
    profile,
    proof,
    texts,
    tools,
    contacts,
    sections,
    order,
    crossLink,
    heroLead,
    headline,
  } = site
  const telegram = contacts.find((contact) => contact.label === 'Telegram')

  return (
    <section id="top">
      <div className="sheet">
        <div className="masthead" data-set>
          <div className="dateline">
            <span>Портфолио</span>
            <span>{profile.role}</span>
            <span className="dateline-right">
              <span>
                {profile.location} · {editionDate}
              </span>
              <ThemeToggle />
            </span>
          </div>
          <div className="nameplate">
            <h1>{profile.name}</h1>
          </div>
        </div>

        <div className="front">
          <div className="front-lead" data-set>
            <h2 className="front-headline">
              {headline.map((line, index) => (
                <Fragment key={line}>
                  {line}
                  {index < headline.length - 1 ? (
                    <br className="lead-break" />
                  ) : null}
                </Fragment>
              ))}
            </h2>
            <p className="front-deck">{profile.tagline}</p>
          </div>

          <aside
            className="front-rail"
            data-set
            aria-label="Содержание страницы"
          >
            <p className="rail-label">В номере</p>
            <nav className="contents" aria-label="Содержание">
              {order.map((id, index) => (
                <a href={`#${id}`} key={id}>
                  <span className="n">{folioFor(index)}</span>
                  <span>
                    {sections[id].title}
                    <small>{sections[id].short}</small>
                  </span>
                </a>
              ))}
            </nav>
            {telegram ? (
              <a
                className="slab"
                href={telegram.href}
                target="_blank"
                rel="noreferrer"
              >
                <span>Написать в Telegram</span>
                <Arrow className="slab-arrow" />
              </a>
            ) : null}
            <p className="rail-note">{profile.availability}</p>
            <a className="rail-cross" href={crossLink.href}>
              {crossLink.label}
            </a>
          </aside>

          <div className="measures" data-set>
            {proof.map((point) => (
              <div className="measure" key={point.label}>
                <p className="measure-value">
                  <ArrowText text={point.value} />
                </p>
                <p className="measure-label">{point.label}</p>
                <p className="measure-source">{point.source}</p>
              </div>
            ))}
          </div>

          <div className="teasers" data-set>
            <div className="teaser-head">
              <span>Дальше в номере</span>
              {heroLead === 'texts' ? (
                <a href="#texts">
                  Все {texts.length} публикаций <Arrow />
                </a>
              ) : (
                <a href="#tools">
                  Все {tools.length} инструмента <Arrow />
                </a>
              )}
            </div>
            {heroLead === 'texts'
              ? texts.slice(0, 3).map((text, index) => (
                  <a
                    className="teaser"
                    href={text.href}
                    target="_blank"
                    rel="noreferrer"
                    key={text.href}
                  >
                    <span className="num">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="title">{text.title}</span>
                    <span className="src">{text.source}</span>
                    <span className="views">
                      {text.views.replace(' просмотров', '')}
                    </span>
                  </a>
                ))
              : tools.slice(0, 3).map((tool, index) => (
                  <a
                    className="teaser"
                    href={tool.href ?? '#tools'}
                    {...(tool.href
                      ? { target: '_blank', rel: 'noreferrer' }
                      : {})}
                    key={tool.name}
                  >
                    <span className="num">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="title">{tool.name}</span>
                    <span className="src">{tool.stack.join(' · ')}</span>
                    <span className="views">
                      <ArrowText text={tool.effect} />
                    </span>
                  </a>
                ))}
          </div>
        </div>
      </div>
    </section>
  )
}
