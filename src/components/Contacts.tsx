import { content } from '../content'
import { Arrow } from './Arrow'
import { Section } from './Section'

export function Contacts() {
  const { contacts, profile } = content
  const telegram = contacts.find((contact) => contact.label === 'Telegram')
  const others = contacts.filter((contact) => contact.label !== 'Telegram')

  return (
    <Section
      id="contacts"
      folio="06"
      title="Контакты"
      note="Приёмная · Томск"
    >
      <div className="contacts-grid">
        <div>
          <p className="contacts-lead">Быстрее всего — в Telegram.</p>
          {telegram ? (
            <a
              className="contact-handle"
              href={telegram.href}
              target="_blank"
              rel="noreferrer"
            >
              {telegram.value}
              <Arrow className="contact-arrow" />
            </a>
          ) : null}
          <p className="contact-note">{profile.availability}</p>
        </div>

        <div className="contact-rows">
          {others.map((contact) => (
            <div className="contact-row" key={contact.href}>
              <span className="contact-label">{contact.label}</span>
              <a
                className="contact-value"
                href={contact.href}
                {...(contact.href.startsWith('http')
                  ? { target: '_blank', rel: 'noreferrer' }
                  : {})}
              >
                {contact.value}
              </a>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
