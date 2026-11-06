import { Fragment } from 'react'

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={className ? `arrow-glyph ${className}` : 'arrow-glyph'}
      viewBox="0 0 18 10"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 5h17M12.6 1 17 5l-4.4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  )
}

export function ArrowText({ text }: { text: string }) {
  const parts = text.split('→')

  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={index}>
          {part}
          {index < parts.length - 1 ? <Arrow /> : null}
        </Fragment>
      ))}
    </>
  )
}
