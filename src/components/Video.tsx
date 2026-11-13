import { useSite, useSection } from '../content/context'
import { Section } from './Section'

export function Video() {
  const { id, folio, title, note } = useSection('video')
  const { videoChapters } = useSite()

  return (
    <Section id={id} folio={folio} title={title} note={note}>
      <figure className="video-figure">
        <video
          className="video-frame"
          controls
          playsInline
          preload="metadata"
          poster="/vizitka-poster.jpg"
          src="/vizitka.mp4"
        >
          Ваш браузер не показывает видео —{' '}
          <a href="/vizitka.mp4">скачать файл</a>.
        </video>
        <div className="video-side">
          <figcaption className="video-caption">
            Тексты, инструменты и зачем одно другому. Собрано из этого же
            портфолио — титрами, без съёмки.
          </figcaption>
          <ol className="video-chapters">
            {videoChapters.map((chapter) => (
              <li key={chapter.time}>
                <span className="video-time">{chapter.time}</span>
                <span>{chapter.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </figure>
    </Section>
  )
}
