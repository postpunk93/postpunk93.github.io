import type {
  Contact,
  ExperienceItem,
  SectionId,
  SectionMeta,
  SkillGroup,
  TextCard,
  ToolCard,
  VideoChapter,
} from './types'

export const profileName = 'Александр Кузакин'
export const profileLocation = 'Томск · удалённо'

export const editionYear = new Date().getFullYear()

export const editionDate = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
}).format(new Date())

export function folioFor(index: number): string {
  return String(index).padStart(2, '0')
}

export const texts: TextCard[] = [
  {
    title:
      'Мое производство на 90 млн началось с двух болгарок и чужого заказа',
    source: 'Хабр · МойСклад',
    views: '141 тыс. просмотров',
    href: 'https://habr.com/ru/companies/moysklad/articles/957176/',
  },
  {
    title:
      'Я нашел золотую жилу в кабине грузовика. Сейчас продаю на 340 млн в год',
    source: 'Хабр · МойСклад',
    views: '88 тыс. просмотров',
    href: 'https://habr.com/ru/companies/moysklad/articles/885052/',
  },
  {
    title:
      'Как устроен китайский завод электроники глазами русского инженера',
    source: 'Хабр · ГРАН',
    views: '71 тыс. просмотров',
    href: 'https://habr.com/ru/companies/grangroup/articles/862006/',
  },
  {
    title: 'Вожу семью в прицепе, чтобы заработать 100 млн в год',
    source: 'Хабр · МойСклад',
    views: '26 тыс. просмотров',
    href: 'https://habr.com/ru/companies/moysklad/articles/857888/',
  },
  {
    title:
      'Дефект в 8 микрон отправил в брак тысячи готовых плат. Рассказываю, как мы его нашли',
    source: 'Хабр · ГРАН',
    views: '18 тыс. просмотров',
    href: 'https://habr.com/ru/companies/grangroup/articles/1016702/',
  },
  {
    title: '5 смертельных проблем первого метро, и как их решили',
    source: 'Хабр · ГРАН',
    views: '16 тыс. просмотров',
    href: 'https://habr.com/ru/companies/grangroup/articles/915084/',
  },
  {
    title:
      'Через меня проходит 5 тысяч чертежей в год, и 99% ошибок в них одинаковые',
    source: 'Хабр · ГРАН',
    views: '9 тыс. просмотров',
    href: 'https://habr.com/ru/companies/grangroup/articles/1061798/',
  },
  {
    title: 'Чем заменить YouTube в России: 15 вариантов',
    source: 'VC',
    views: 'Обзор для авторов и бизнеса',
    href: 'https://vc.ru/video/1732353-chem-zamenit-youtube-v-rossii-15-variantov-dlya-avtorov-i-biznesa',
  },
]

export const tools: ToolCard[] = [
  {
    name: 'article-layout',
    summary:
      'Раскладывает готовую статью на восемь площадок: VC, DTF, Пикабу, Хабр, Дзен и другие. Коллега пишет запрос по-русски — и обходится без кода.',
    stack: ['Python', 'Playwright', 'Claude Code'],
    effect: '4 часа в понедельник\u00A0→ 10 минут',
    href: 'https://github.com/postpunk93/article-layout',
  },
  {
    name: 'video-factory',
    summary:
      'Черновой монтаж YouTube-интервью: расшифровка, поиск реплик сценария, резка по тишине — готовый таймлайн для DaVinci.',
    stack: ['Python', 'WhisperX', 'ffmpeg'],
    effect: '5 дней\u00A0→ 4 дня на выпуск',
    href: 'https://github.com/postpunk93/video-factory',
  },
  {
    name: 'vacancy-hunter',
    summary:
      'Собирает вакансии с четырёх площадок — hh.ru, superjob, rabota.ru, zarplata.ru — оценивает по профилю и присылает дайджест в Telegram.',
    stack: ['Python', 'SQLite', 'Telegram Bot API'],
    effect: 'Вместо ежедневного скроллинга — один дайджест',
    href: 'https://github.com/postpunk93/vacancy-hunter',
  },
]

export const contacts: Contact[] = [
  {
    label: 'Почта',
    value: 'kuzakin.work@gmail.com',
    href: 'mailto:kuzakin.work@gmail.com',
  },
  {
    label: 'Telegram',
    value: '@protopunk70',
    href: 'https://t.me/protopunk70',
  },
  {
    label: 'Телефон',
    value: '+7 913 885-59-17',
    href: 'tel:+79138855917',
  },
]

export const experienceBase: Array<Omit<ExperienceItem, 'summary'>> = [
  {
    company: 'RuminLab',
    role: 'Шеф-редактор · автоматизация редакции',
    period: '06.2024 — 09.2026',
  },
  {
    company: 'Фриланс',
    role: 'Веб-разработчик',
    period: '2016 — 2024',
  },
]

export const skills = {
  texts: {
    title: 'Тексты',
    items: ['Лонгриды', 'Интервью', 'Заголовки', 'B2B и IT', 'Хабр и VC'],
  },
  ai: {
    title: 'ИИ и автоматизация',
    items: ['Claude Code', 'Промпты и агенты', 'Python', 'Playwright', 'LLM-пайплайны'],
  },
  web: {
    title: 'Веб',
    items: ['React', 'TypeScript', 'PHP / Yii2', 'WordPress', 'PostgreSQL'],
  },
} satisfies Record<'texts' | 'ai' | 'web', SkillGroup>

export const sections: Record<SectionId, SectionMeta> = {
  video: { title: 'Видео-визитка', note: '60 секунд о работе', short: '60 секунд' },
  texts: {
    title: 'Тексты',
    note: '8 публикаций · 369 тыс. просмотров у семи статей',
    short: '8 публикаций',
  },
  tools: {
    title: 'Инструменты',
    note: '3 инструмента · 3 публичных репозитория',
    short: '3 инструмента',
  },
  about: { title: 'О себе', note: 'Коротко о себе', short: 'Коротко' },
  experience: { title: 'Опыт', note: '2016—2026', short: '2016—2026' },
  skills: { title: 'Навыки', note: 'Что умею', short: 'Что умею' },
  contacts: { title: 'Контакты', note: 'Томск · удалённо', short: 'Томск' },
}

export const videoChapters: VideoChapter[] = [
  { time: '0:00', label: '141 000 просмотров' },
  { time: '0:11', label: 'ещё три лонгрида' },
  { time: '0:17', label: 'текст — половина дела' },
  { time: '0:22', label: 'инструменты с нейросетями' },
  { time: '0:28', label: 'три инструмента' },
  { time: '0:42', label: 'кого ищу' },
  { time: '0:50', label: 'контакты' },
]
