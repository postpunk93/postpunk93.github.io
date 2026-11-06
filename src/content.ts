export interface Profile {
  name: string
  tagline: string
  location: string
  availability: string
}

export interface TextCard {
  title: string
  source: string
  views: string
  href: string
}

export interface ToolCard {
  name: string
  summary: string
  stack: string[]
  effect: string
  href?: string
}

export interface ExperienceItem {
  company: string
  role: string
  period: string
  summary: string
}

export interface SkillGroup {
  title: string
  items: string[]
}

export interface Contact {
  label: string
  value: string
  href: string
}

export interface ProofPoint {
  value: string
  label: string
  source: string
}

export interface SiteContent {
  profile: Profile
  about: string[]
  texts: TextCard[]
  tools: ToolCard[]
  experience: ExperienceItem[]
  skills: SkillGroup[]
  contacts: Contact[]
  proof: ProofPoint[]
}

export const editionYear = new Date().getFullYear()

export const editionDate = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
}).format(new Date())

export const content: SiteContent = {
  profile: {
    name: 'Александр Кузакин',
    tagline:
      'Пишу лонгриды для Хабра и VC — до 141 тыс. просмотров у\u00A0одной статьи. Собираю инструменты, которые убирают рутину.',
    location: 'Томск · удалённо',
    availability:
      'Открыт к предложениям · подстраиваюсь под любой часовой пояс и график',
  },

  about: [
    'Два года делаю лонгриды для блогов на Хабре и VC — истории бизнеса и инженерии для МойСклада, ГРАНа и других компаний. Три статьи набрали 141, 88 и 71 тыс. просмотров. Интервью с героями провожу сам: нахожу в них историю, строю драматургию, придумываю заголовок, на который кликают.',
    'До этого восемь лет делал сайты на фрилансе: PHP, Yii2, WordPress. Поэтому рутину вокруг текста терпеть не умею — как только задача повторяется, я превращаю её в инструмент. Автовёрстка раскладывает статью на восемь площадок за 10 минут вместо четырёх часов — и её запускает нетехнический коллега.',
    'Второй год почти каждый день собираю с ИИ рабочие инструменты и довожу их до прода: у них есть тесты, ими пользуются нетехнические коллеги. Для себя сделал мониторинг медиа Томска и охотника за вакансиями — дайджест приходит в Telegram.',
  ],

  texts: [
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
  ],

  tools: [
    {
      name: 'article-layout',
      summary:
        'Раскладывает готовую статью на восемь площадок: VC, DTF, Пикабу, Хабр, Дзен и другие. Коллега пишет запрос по-русски — и обходится без кода.',
      stack: ['Python', 'Playwright', 'Claude Code'],
      effect: '4 часа в понедельник\u00A0→ 10 минут',
    },
    {
      name: 'factory',
      summary:
        'Черновой монтаж YouTube-интервью: расшифровка, поиск реплик сценария, резка по тишине — готовый таймлайн для DaVinci.',
      stack: ['Python', 'WhisperX', 'ffmpeg'],
      effect: '5 дней\u00A0→ 4 дня на выпуск',
    },
    {
      name: 'media-scan',
      summary:
        'Мониторинг медиа региона: RSS и Telegram-каналы в одной ленте, поиск по русскому тексту, дайджест с копированием в редакторы Хабра и vc.ru.',
      stack: ['PHP 8.3', 'Slim', 'PostgreSQL', 'Vue 3', 'Docker'],
      effect: 'Ручной обход заменила автоматическая лента',
    },
    {
      name: 'vacancy-hunter',
      summary:
        'Следит за hh.ru и zarplata.ru, отбирает вакансии по моим запросам и присылает дайджест в Telegram.',
      stack: ['Python', 'SQLite', 'Telegram Bot API'],
      effect: 'Вместо ежедневного скроллинга — один дайджест',
    },
  ],

  experience: [
    {
      company: 'RuminLab',
      role: 'Шеф-редактор, вайбкодер',
      period: '06.2024 — 09.2026',
      summary:
        'Контент-маркетинг для сложных продуктов: лонгриды для Хабра и VC, интервью с героями, разгон заголовков для команды. Собрал инструменты редакции — автовёрстку статей, черновой монтаж видео, скиллы Claude. Параллельно настраивал рекламу клиентов: Яндекс Директ и Telegram Ads.',
    },
    {
      company: 'Фриланс',
      role: 'Веб-разработчик',
      period: '2016 — 2024',
      summary:
        'Восемь лет делал сайты и веб-приложения на Yii2 и WordPress, занимался SEO.',
    },
  ],

  skills: [
    {
      title: 'Тексты',
      items: ['Лонгриды', 'Интервью', 'Заголовки', 'B2B и IT', 'Хабр и VC'],
    },
    {
      title: 'ИИ и автоматизация',
      items: ['Claude Code', 'Промпты и агенты', 'Python', 'Playwright', 'LLM-пайплайны'],
    },
    {
      title: 'Веб',
      items: ['React', 'TypeScript', 'PHP / Yii2', 'WordPress', 'PostgreSQL'],
    },
  ],

  contacts: [
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
  ],

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
      value: '4',
      label: 'инструмента в продакшене, не прототипа',
      source: 'собраны мной',
    },
  ],
}
