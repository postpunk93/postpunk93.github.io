import { content } from '../content'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {content.profile.name}
        </p>
        <p>Сделано на React</p>
      </div>
    </footer>
  )
}
