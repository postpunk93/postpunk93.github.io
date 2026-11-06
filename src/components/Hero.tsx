import { content, editionDate } from '../content'
import { Arrow, ArrowText } from './Arrow'
import { ThemeToggle } from './ThemeToggle'

export function Hero() {
  const { profile, proof, texts, contacts } = content
  const telegram = contacts.find((contact) => contact.label === 'Telegram')

  return (
    <section id="top">
      <div className="sheet">
        <div className="masthead" data-set>
          <div className="dateline">
            <span>Сводка · личное дело</span>
            <span>Портфолио · две компетенции</span>
            <span className="dateline-right">
              <span>Томск · {editionDate}</span>
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
              Пишет то, <br className="lead-break" />
              что читают. <br className="lead-break" />
              Собирает то, <br className="lead-break" />
              чем пользуются.
            </h2>
            <p className="front-deck">{profile.tagline}</p>
          </div>

          <aside className="front-rail" data-set aria-label="Содержание номера">
            <p className="rail-label">В номере</p>
            <nav className="contents" aria-label="Содержание">
              <a href="#texts">
                <span className="n">01</span>
                <span>
                  Тексты
                  <small>{texts.length} публикаций</small>
                </span>
              </a>
              <a href="#tools">
                <span className="n">02</span>
                <span>
                  Инструменты
                  <small>4 стенда</small>
                </span>
              </a>
              <a href="#experience">
                <span className="n">03</span>
                <span>
                  Опыт
                  <small>RumlinLab, фриланс, Томск</small>
                </span>
              </a>
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
              <span>Начинается в номере</span>
              <a href="#texts">
                Все {texts.length} публикаций <Arrow />
              </a>
            </div>
            {texts.slice(0, 3).map((text, index) => (
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
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
