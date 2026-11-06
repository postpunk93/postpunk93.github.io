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

export interface SiteContent {
  profile: Profile
  about: string[]
  texts: TextCard[]
  tools: ToolCard[]
  experience: ExperienceItem[]
  skills: SkillGroup[]
  contacts: Contact[]
}

export const content: SiteContent = {
  profile: {
    name: 'Александр Кузакин',
    tagline:
      'Пишу лонгриды, которые выходят в топ, и собираю инструменты, которые убирают рутину',
    location: 'Томск · удалённо',
    availability: 'Открыт к предложениям · UTC+7, работаю с любым часовым поясом',
  },

  about: [
    'Один человек — две сильные стороны. Шесть лет я делал редакционные лонгриды для Хабра и VC: интервью с владельцами производств, разборы рынков, тексты, которые собирают десятки и сотни тысяч просмотров.',
    'Восемь лет до этого — веб-разработка на PHP и Yii2. Поэтому, когда в редакции появилась рутина вроде раскладки статьи на восемь площадок, я не просил разработчиков, а собирал инструменты сам: на Python, с Playwright, WhisperX и LLM-пайплайнами.',
    'Этими инструментами пользуются нетехнические коллеги — редакторы, продюсеры, маркетологи. Так и выглядит моя работа: текст, который читают, и автоматизация, которая освобождает время на этот текст.',
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
      title: 'Дефект в 8 микрон отправил в брак тысячи готовых плат',
      source: 'Хабр · ГРАН',
      views: '18 тыс. просмотров',
      href: 'https://habr.com/ru/companies/grangroup/articles/1016702/',
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
        'Раскладывает готовую статью на восемь площадок: обложки, разметка, черновики.',
      stack: ['Python', 'Playwright'],
      effect: '4 часа в понедельник → 10 минут',
    },
    {
      name: 'factory',
      summary:
        'Готовит черновой монтаж YouTube-интервью: расшифровка, монтажный лист, нарезка.',
      stack: ['Python', 'WhisperX', 'ffmpeg'],
      effect: '5 дней → 4 дня на выпуск',
    },
    {
      name: 'media-scan',
      summary:
        'Мониторит медиа региона и собирает сводку упоминаний в одном интерфейсе.',
      stack: ['PHP 8.3', 'Slim', 'PostgreSQL', 'Vue 3', 'Docker'],
      effect: 'Ручной обход заменила автоматическая лента',
    },
    {
      name: 'vacancy-hunter',
      summary:
        'Следит за hh.ru и zarplata.ru, отбирает подходящие вакансии и присылает дайджест в Telegram.',
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
        'Редакция и производство контента: лонгриды для Хабра и VC, интервью с предпринимателями, автоматизация редакционных процессов собственными инструментами.',
    },
    {
      company: 'Фриланс',
      role: 'Веб-разработчик',
      period: '2016 — 2024',
      summary:
        'Разработка сайтов и внутренних сервисов на PHP и Yii2: интеграции, личные кабинеты, магазины, поддержка проектов заказчиков.',
    },
  ],

  skills: [
    {
      title: 'Тексты',
      items: ['Лонгриды', 'Интервью', 'Заголовки', 'B2B', 'Хабр и VC'],
    },
    {
      title: 'ИИ и автоматизация',
      items: ['Claude Code', 'Python', 'Playwright', 'LLM-пайплайны', 'n8n'],
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
}
