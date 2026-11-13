import {
  contacts,
  experienceBase,
  profileLocation,
  profileName,
  sections,
  skills,
  texts,
  tools,
  videoChapters,
} from './shared'
import type { SiteContent } from './types'

export const automation: SiteContent = {
  edition: 'automation',
  profile: {
    name: profileName,
    role: 'AI-автоматизатор',
    tagline:
      'Автовёрстка статей и черновой монтаж видео работают у коллег без кода. Для поиска вакансий собрал отдельный инструмент. До этого восемь лет веб-разработки и два года контента.',
    location: profileLocation,
    availability: 'Открыт к роли AI-автоматизатора · удалённо',
  },
  headline: ['Собираю AI-инструменты', 'и довожу их', 'до продакшена.'],
  heroLead: 'tools',
  about: [
    'Собираю инструменты, которые убирают ручную работу: автовёрстку статей, черновой монтаж видео и поиск вакансий. Код всех трёх открыт на GitHub. Автовёрсткой и монтажом пользуются коллеги без кода: формулируют запрос по-русски и не программируют. Третий собрал для себя, но пользоваться сможет и человек без кода.',
    'До этого восемь лет делал сайты и веб-приложения: PHP, Yii2, WordPress, PostgreSQL. Последние два года писал для Хабра и VC. Поэтому могу написать текст и собрать под него инструмент: вижу, где инструмент неудобен, и довожу его до продакшена.',
    'Собираю с Claude Code и агентами. Демки в продакшен не отдаю: у инструментов есть тесты, двумя уже пользуются коллеги. Ищу роль AI-автоматизатора в продуктовой или контентной команде. Работаю удалённо.',
  ],
  pullQuote: 'Автовёрстку коллега запускает сам, без меня и без кода.',
  texts,
  tools,
  videoChapters,
  contacts,
  sections,
  experience: [
    {
      ...experienceBase[0],
      summary:
        'Собрал инструменты редакции — автовёрстку статей, черновой монтаж видео, скиллы Claude — и довёл их до продакшена. Параллельно вёл контент для Хабра и VC и рекламу клиентов: Яндекс Директ и Telegram Ads.',
    },
    {
      ...experienceBase[1],
      summary:
        'Восемь лет делал сайты и веб-приложения на Yii2 и WordPress, занимался SEO.',
    },
  ],
  skills: [skills.ai, skills.web, skills.texts],
  proof: [
    {
      value: '3',
      label: 'инструмента в работе',
      source: 'собраны мной',
    },
    {
      value: '3',
      label: 'публичных репозитория на GitHub',
      source: 'github.com/postpunk93',
    },
    {
      value: '4 ч\u00A0→ 10 мин',
      label: 'раскладка статьи на восемь площадок',
      source: 'article-layout',
    },
  ],
  order: [
    'video',
    'tools',
    'texts',
    'about',
    'experience',
    'skills',
    'contacts',
  ],
  crossLink: { label: 'Версия для контента →', href: '/' },
}
