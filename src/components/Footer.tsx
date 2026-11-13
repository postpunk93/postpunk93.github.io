import { editionDate, editionYear } from '../content'
import { useSite } from '../content/context'

export function Footer() {
  const { profile } = useSite()

  return (
    <footer className="footer">
      <div className="sheet footer-inner">
        <p>
          © {editionYear} {profile.name}
        </p>
        <p>
          Личное портфолио · обновлено {editionDate} · набрано PT Serif, Golos
          Text, PT Mono
        </p>
        <a className="to-top" href="#top">
          Наверх ↑
        </a>
      </div>
    </footer>
  )
}
