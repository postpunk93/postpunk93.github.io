import { Section } from './Section'

const chapters = [
  { time: '0:00', label: '141 000 просмотров' },
  { time: '0:11', label: 'ещё три лонгрида' },
  { time: '0:17', label: 'текст — половина дела' },
  { time: '0:22', label: 'инструменты с нейросетями' },
  { time: '0:28', label: 'четыре инструмента' },
  { time: '0:42', label: 'кого ищу' },
  { time: '0:50', label: 'контакты' },
]

export function Video() {
  return (
    <Section id="video" folio="00" title="Видео-визитка" note="Минута вместо резюме">
      <figure className="video-figure">
        <video
          className="video-frame"
          controls
          playsInline
          preload="metadata"
          poster="./vizitka-poster.jpg"
          src="./vizitka.mp4"
        >
          Ваш браузер не показывает видео —{' '}
          <a href="./vizitka.mp4">скачать файл</a>.
        </video>
        <div className="video-side">
          <figcaption className="video-caption">
            Тексты, инструменты и зачем одно другому. Собрано из этого же
            портфолио — титрами, без съёмки.
          </figcaption>
          <ol className="video-chapters">
            {chapters.map((chapter) => (
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
