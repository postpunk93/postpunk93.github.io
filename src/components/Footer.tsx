import { content, editionDate, editionYear } from '../content'

export function Footer() {
  return (
    <footer className="footer">
      <div className="sheet footer-inner">
        <p>
          © {editionYear} {content.profile.name}
        </p>
        <p>
          Личное портфолио · выпуск от {editionDate} · набрано PT Serif, Golos
          Text, PT Mono
        </p>
        <a className="to-top" href="#top">
          Наверх ↑
        </a>
      </div>
    </footer>
  )
}
