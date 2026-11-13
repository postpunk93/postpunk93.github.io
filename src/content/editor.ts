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

export const editor: SiteContent = {
  edition: 'editor',
  profile: {
    name: profileName,
    role: 'Контент-маркетолог',
    tagline:
      'Интервью провожу сам. Повторяющуюся работу вокруг текста отдаю инструментам. Раскладка статьи на восемь площадок занимает 10 минут вместо четырёх часов.',
    location: profileLocation,
    availability: 'Открыт к роли контент-маркетолога · удалённо',
  },
  headline: [
    'Пишу лонгриды',
    'для Хабра и VC.',
    '141 тыс. просмотров',
    'у одной статьи.',
  ],
  heroLead: 'texts',
  about: [
    'Два года лонгридов для Хабра и VC: истории бизнеса и инженерии для МойСклада, ГРАНа и других компаний. Три статьи набрали 141, 88 и 71 тыс. просмотров. Интервью провожу сам: нахожу историю, строю драматургию, придумываю заголовок.',
    'До этого восемь лет делал сайты на фрилансе: PHP, Yii2, WordPress. Автовёрстка раскладывает статью на восемь площадок за 10 минут вместо четырёх часов; запускает её коллега без кода.',
    'Ищу роль контент-маркетолога в B2B или IT. Могу вести проект целиком: провожу интервью, пишу текст, придумываю заголовки, раскладываю по площадкам, настраиваю Директ и Telegram Ads. Работаю удалённо.',
  ],
  pullQuote: 'Как только задача повторяется, я превращаю её в инструмент.',
  texts,
  tools,
  videoChapters,
  contacts,
  sections,
  experience: [
    {
      ...experienceBase[0],
      summary:
        'Контент-маркетинг для B2B и IT: лонгриды для Хабра и VC, интервью с героями, заголовки и дистрибуция. Собрал инструменты редакции — автовёрстку статей, черновой монтаж видео, скиллы Claude. Параллельно настраивал рекламу клиентов: Яндекс Директ и Telegram Ads.',
    },
    {
      ...experienceBase[1],
      summary:
        'Восемь лет делал сайты и веб-приложения на Yii2 и WordPress, занимался SEO.',
    },
  ],
  skills: [skills.texts, skills.ai, skills.web],
  proof: [
    {
      value: '141 тыс.',
      label: 'просмотров у лонгрида про производство на 90 млн',
      source: 'Хабр · МойСклад',
    },
    {
      value: '4 ч\u00A0→ 10 мин',
      label: 'раскладка статьи на восемь площадок',
      source: 'article-layout',
    },
    {
      value: '3',
      label: 'инструмента в работе',
      source: 'собраны мной',
    },
  ],
  order: [
    'video',
    'texts',
    'tools',
    'about',
    'experience',
    'skills',
    'contacts',
  ],
  crossLink: { label: 'Версия для AI-автоматизации →', href: '/ai/' },
}
