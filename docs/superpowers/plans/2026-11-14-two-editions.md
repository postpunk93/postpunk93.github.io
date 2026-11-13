# Два выпуска лендинга — план реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Один код и два адреса портфолио: `/` — выпуск «Контент», `/ai/` — выпуск «AI-автоматизация», с общими фактами и разными текстами, порядком разделов и метаданными.

**Architecture:** Контент переезжает из `src/content.ts` в `src/content/`: типы, общие факты, два выпуска, контекст. `App` выбирает выпуск по пропу или `data-edition`, раскладывает разделы по `site.order`; компоненты читают данные через `useSite()`/`useSection()`. Vite собирает две HTML-точки входа с общим кодом.

**Tech Stack:** Vite 8, React 19, TypeScript, Tailwind CSS v4, Motion, Vitest, Testing Library, oxlint.

**Spec:** `docs/superpowers/specs/2026-11-13-two-editions-design.md` — читать вместе с планом; тексты выпусков берутся оттуда дословно.

## Global Constraints

- Язык сайта только русский. О себе — первое лицо единственного числа; третье лицо допустимо только в имени на шапке/подвале и в цитатах.
- Запрещённые метки и обороты: «две компетенции», «Пишет то», «стенды», «допуски», «приёмная», «журнал эксплуатации», «подстраиваюсь», «эксперт», «гуру», «уникальный», «комплексный», «бесшовный», «экосистема», «синергия», «раскрыть потенциал», «вывести на новый уровень», «не просто X, а Y», «это не X — это Y», «в современном мире», «сегодня как никогда». Без восклицательных знаков, эмодзи и обращения «друзья».
- Факты: 8 публикаций, у семи из них 141, 88, 71, 26, 18, 16 и 9 тыс. просмотров (сумма 369). Ровно 3 инструмента: `article-layout`, `video-factory`, `vacancy-hunter`. `media-scan` не упоминается нигде. Все три ведут на публичные репозитории `github.com/postpunk93/`.
- Адреса: `/` — контент, `/ai/` — автоматизация. `base` — `'/'`, сайт в корне `postpunk93.github.io`. OG-картинок нет, различаются только заголовки и описания.
- Вёрстка, типографика, темы, анимации и состав экранов не меняются. Новые секции не добавляются.
- Весь текст — в `src/content/`; компоненты не содержат текста о человеке.
- `npm test`, `npm run lint`, `npm run build` проходят; в `dist/` есть `index.html` и `ai/index.html`.

## Review Focus

- **Прямой заход на `/ai/`.** Видео, постер и favicon должны грузиться из корня, а не из `/ai/`; иначе на втором выпуске чёрный прямоугольник. Тест в Task 3 проверяет `/vizitka.mp4` и `/vizitka-poster.jpg`, Task 4 — `/favicon.svg`.
- **Отсутствующий или неизвестный `data-edition`.** Страница должна открыться как контент-выпуск, а не упасть. Тест в Task 2.
- **Порядок и колонцифры на `/ai/`.** Инструменты — 01, тексты — 02 и в шапке, и в «В номере». Тест в Task 3.
- **Данные выпусков расходятся.** Общие статьи, инструменты, контакты и опыт должны совпадать; из одного выпуска не должен протекать `media-scan`, четвёртый инструмент или текст другого выпуска. Тесты в Task 1 и 2.
- **Скрипт темы в двух HTML расходится.** Один выпуск мигнёт светлой темой при тёмной. Тест в Task 4 сравнивает inline-скрипты.

---

### Task 1: Типы и общие факты

**Files:**
- Create: `src/content/types.ts`
- Create: `src/content/shared.ts`
- Test: `src/content/shared.test.ts`

**Interfaces:**
- Produces: `Edition`, `SectionId`, `Profile`, `TextCard`, `ToolCard`, `ExperienceItem`, `SkillGroup`, `Contact`, `ProofPoint`, `VideoChapter`, `SectionMeta`, `SiteContent`; `texts`, `tools`, `contacts`, `experienceBase`, `skills`, `sections`, `videoChapters`, `editionYear`, `editionDate`, `folioFor(index: number): string`.

- [ ] **Step 1: Написать падающий тест общих фактов**

```ts
// src/content/shared.test.ts
import { describe, expect, it } from 'vitest'
import {
  contacts,
  experienceBase,
  sections,
  skills,
  texts,
  tools,
} from './shared'

const sectionIds = [
  'video',
  'texts',
  'tools',
  'about',
  'experience',
  'skills',
  'contacts',
] as const

describe('shared facts', () => {
  it('содержит восемь публикаций, у семи есть просмотры, сумма 369', () => {
    expect(texts).toHaveLength(8)
    const views = texts
      .map((text) => text.views.match(/^(\d+)/))
      .filter((match): match is RegExpMatchArray => match !== null)
      .map((match) => Number(match[1]))

    expect(views).toHaveLength(7)
    expect(views.reduce((sum, value) => sum + value, 0)).toBe(369)
  })

  it('содержит три инструмента, все в публичных репозиториях, без media-scan', () => {
    expect(tools.map((tool) => tool.name)).toEqual([
      'article-layout',
      'video-factory',
      'vacancy-hunter',
    ])
    for (const tool of tools) {
      expect(tool.href).toMatch(/^https:\/\/github\.com\/postpunk93\//)
    }
    expect(JSON.stringify(tools)).not.toContain('media-scan')
  })

  it('держит контакты и метаданные всех разделов', () => {
    expect(contacts.map((contact) => contact.label)).toEqual([
      'Почта',
      'Telegram',
      'Телефон',
    ])
    for (const id of sectionIds) {
      expect(sections[id].title.trim()).not.toBe('')
      expect(sections[id].short.trim()).not.toBe('')
    }
  })

  it('держит общий опыт и три группы навыков', () => {
    expect(experienceBase.map((item) => item.company)).toEqual([
      'RuminLab',
      'Фриланс',
    ])
    expect(Object.keys(skills)).toEqual(['texts', 'ai', 'web'])
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test -- src/content/shared.test.ts`
Expected: FAIL — не удаётся разрешить `./shared`.

- [ ] **Step 3: Создать типы**

```ts
// src/content/types.ts
export type Edition = 'editor' | 'automation'

export type SectionId =
  | 'video'
  | 'texts'
  | 'tools'
  | 'about'
  | 'experience'
  | 'skills'
  | 'contacts'

export interface Profile {
  name: string
  role: string
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

export interface VideoChapter {
  time: string
  label: string
}

export interface SectionMeta {
  title: string
  note?: string
  short: string
}

export interface SiteContent {
  edition: Edition
  profile: Profile
  headline: string[]
  heroLead: 'texts' | 'tools'
  about: string[]
  pullQuote: string
  texts: TextCard[]
  tools: ToolCard[]
  videoChapters: VideoChapter[]
  experience: ExperienceItem[]
  skills: SkillGroup[]
  contacts: Contact[]
  proof: ProofPoint[]
  order: SectionId[]
  sections: Record<SectionId, SectionMeta>
  crossLink: { label: string; href: string }
}
```

- [ ] **Step 4: Создать общие факты**

Перенести статьи и контакты из текущего `src/content.ts` без изменения формулировок. Инструменты — три: `article-layout`, `video-factory`, `vacancy-hunter`; `media-scan` удалить целиком. Заголовки и заметки разделов — из §12 спеки. Опыт — общие `company`, `role`, `period`; `summary` добавляют выпуски.

```ts
// src/content/shared.ts
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

// texts: 8 карточек из текущего content.ts, без изменений.
export const texts: TextCard[] = [
  // ...
]

// tools: article-layout, video-factory, vacancy-hunter. media-scan удалён.
export const tools: ToolCard[] = [
  // ...
]

export const contacts: Contact[] = [
  // ...
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
```

- [ ] **Step 5: Прогнать тест**

Run: `npm test -- src/content/shared.test.ts`
Expected: PASS, 4 теста.

- [ ] **Step 6: Коммит**

```bash
git add src/content/types.ts src/content/shared.ts src/content/shared.test.ts
git commit -m "feat: вынести общие факты портфолио"
```

---

### Task 2: Два выпуска и выбор по адресу

**Files:**
- Create: `src/content/editor.ts`
- Create: `src/content/automation.ts`
- Create: `src/content/index.ts`
- Modify: `src/content.test.ts` (полностью заменить)
- Modify: `src/content/shared.ts` (только если нужны экспорты)

**Interfaces:**
- Consumes: типы и общие факты из Task 1.
- Produces: `editions: Record<Edition, SiteContent>`, `contentFor(edition: Edition): SiteContent`, `getEdition(): Edition`, `folioFor`; реэкспорт `editionYear`, `editionDate`.

- [ ] **Step 1: Написать падающий тест выпусков**

```ts
// src/content.test.ts
import { afterEach, describe, expect, it } from 'vitest'
import { contentFor, editions, folioFor, getEdition } from './content'

const editorOrder = [
  'video',
  'texts',
  'tools',
  'about',
  'experience',
  'skills',
  'contacts',
]

const automationOrder = [
  'video',
  'tools',
  'texts',
  'about',
  'experience',
  'skills',
  'contacts',
]

const forbidden = [
  'две компетенции',
  'Пишет то',
  'стенды',
  'допуски',
  'приёмная',
  'журнал эксплуатации',
  'подстраиваюсь',
]

afterEach(() => {
  delete document.documentElement.dataset.edition
})

describe('editions', () => {
  it('собирает оба выпуска и делит факты', () => {
    expect(editions.editor.profile.role).toBe('Контент-маркетолог')
    expect(editions.automation.profile.role).toBe('AI-автоматизатор')
    expect(editions.editor.texts).toEqual(editions.automation.texts)
    expect(editions.editor.tools).toEqual(editions.automation.tools)
    expect(editions.editor.contacts).toEqual(editions.automation.contacts)
    expect(editions.editor.videoChapters).toEqual(
      editions.automation.videoChapters,
    )
    expect(editions.editor.profile.name).toBe(
      editions.automation.profile.name,
    )
    expect(
      editions.editor.experience.map(({ company, role, period }) => ({
        company,
        role,
        period,
      })),
    ).toEqual(
      editions.automation.experience.map(({ company, role, period }) => ({
        company,
        role,
        period,
      })),
    )
  })

  it('держит по три доказательства в заданном порядке', () => {
    expect(editions.editor.proof.map((point) => point.value)).toEqual([
      '141 тыс.',
      '4 ч\u00A0→ 10 мин',
      '3',
    ])
    expect(editions.automation.proof.map((point) => point.value)).toEqual([
      '3',
      '3',
      '4 ч\u00A0→ 10 мин',
    ])
  })

  it('ставит разделы в порядке выпуска', () => {
    expect(editions.editor.order).toEqual(editorOrder)
    expect(editions.automation.order).toEqual(automationOrder)
    expect(editions.editor.heroLead).toBe('texts')
    expect(editions.automation.heroLead).toBe('tools')
  })

  it('не содержит запрещённых меток и удалённого инструмента', () => {
    const copy = JSON.stringify(editions)
    for (const marker of forbidden) {
      expect(copy.toLowerCase()).not.toContain(marker.toLowerCase())
    }
    expect(copy).not.toContain('media-scan')
    expect(editions.editor.tools).toHaveLength(3)
    expect(editions.editor.texts).toHaveLength(8)
  })

  it('ведёт на второй выпуск с обоих адресов', () => {
    expect(editions.editor.crossLink).toEqual({
      label: 'Версия для AI-автоматизации →',
      href: '/ai/',
    })
    expect(editions.automation.crossLink).toEqual({
      label: 'Версия для контента →',
      href: '/',
    })
  })

  it('по умолчанию выбирает контент, читает data-edition и знает contentFor', () => {
    expect(getEdition()).toBe('editor')
    expect(contentFor('editor')).toBe(editions.editor)

    document.documentElement.dataset.edition = 'automation'
    expect(getEdition()).toBe('automation')

    document.documentElement.dataset.edition = 'unknown'
    expect(getEdition()).toBe('editor')
  })

  it('нумерует разделы по порядку', () => {
    expect(folioFor(0)).toBe('00')
    expect(folioFor(1)).toBe('01')
    expect(folioFor(6)).toBe('06')
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test -- src/content.test.ts`
Expected: FAIL — нет `./content` с `editions`.

- [ ] **Step 3: Собрать контент-выпуск**

Создать `src/content/editor.ts`. Тексты — дословно из §9 спеки, заметки — из §12. Поля:

```ts
export const editor: SiteContent = {
  edition: 'editor',
  profile: {
    name: profileName,
    role: 'Контент-маркетолог',
    tagline:
      'Интервью провожу сам. Рутину вокруг текста превращаю в инструменты: раскладка на восемь площадок — 10 минут вместо четырёх часов.',
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
    // три абзаца из §9, дословно
  ],
  pullQuote: 'Как только задача повторяется, я превращаю её в инструмент.',
  texts,
  tools,
  videoChapters,
  contacts,
  sections,
  experience: [
    { ...experienceBase[0], summary: '…' },
    { ...experienceBase[1], summary: '…' },
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
      label: 'инструмента в продакшене, не прототипа',
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
```

Сводка RuminLab ведёт текстами: контент-маркетинг, лонгриды, интервью, заголовки и дистрибуция; инструменты редакции вторым планом. Сводка фриланса: восемь лет сайтов и веб-приложений на Yii2 и WordPress, SEO.

- [ ] **Step 4: Собрать AI-выпуск**

Создать `src/content/automation.ts` по той же форме. Тексты — дословно из §10 спеки.

```ts
export const automation: SiteContent = {
  edition: 'automation',
  profile: {
    name: profileName,
    role: 'AI-автоматизатор',
    tagline:
      'Автовёрстка статей и черновой монтаж видео работают у коллег без кода. Поиск вакансий собрал для себя. До этого восемь лет веба и два года контента.',
    location: profileLocation,
    availability: 'Открыт к роли AI-автоматизатора · удалённо',
  },
  headline: ['Собираю AI-инструменты', 'и довожу их', 'до продакшена.'],
  heroLead: 'tools',
  about: [
    // три абзаца из §10, дословно
  ],
  pullQuote: 'Автовёрстку коллега запускает сам, без меня и без кода.',
  texts,
  tools,
  videoChapters,
  contacts,
  sections,
  experience: [
    { ...experienceBase[0], summary: '…' },
    { ...experienceBase[1], summary: '…' },
  ],
  skills: [skills.ai, skills.web, skills.texts],
  proof: [
    {
      value: '3',
      label: 'инструмента в продакшене, не прототипа',
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
```

Сводка RuminLab ведёт инструментами: собрал автовёрстку, монтаж и скиллы Claude, довёл до продакшена; контент вторым планом.

- [ ] **Step 5: Создать точку входа контента**

```ts
// src/content/index.ts
import { automation } from './automation'
import { editor } from './editor'
import type { Edition, SiteContent } from './types'

export type {
  Contact,
  Edition,
  ExperienceItem,
  Profile,
  ProofPoint,
  SectionId,
  SectionMeta,
  SiteContent,
  SkillGroup,
  TextCard,
  ToolCard,
  VideoChapter,
} from './types'
export { editionDate, editionYear, folioFor } from './shared'

export const editions: Record<Edition, SiteContent> = { editor, automation }

export function contentFor(edition: Edition): SiteContent {
  return editions[edition]
}

export function getEdition(): Edition {
  return document.documentElement.dataset.edition === 'automation'
    ? 'automation'
    : 'editor'
}
```

- [ ] **Step 6: Прогнать тесты**

Run: `npm test -- src/content.test.ts src/content/shared.test.ts`
Expected: PASS, 11 тестов.

- [ ] **Step 7: Коммит**

```bash
git add src/content/editor.ts src/content/automation.ts src/content/index.ts src/content.test.ts
git commit -m "feat: собрать два выпуска лендинга"
```

---

### Task 3: Страница рендерится из выпуска

**Files:**
- Create: `src/content/context.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx` (полностью заменить)
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Video.tsx`
- Modify: `src/components/Texts.tsx`
- Modify: `src/components/Tools.tsx`
- Modify: `src/components/About.tsx`
- Modify: `src/components/Experience.tsx`
- Modify: `src/components/Skills.tsx`
- Modify: `src/components/Contacts.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/index.css` (только `.rail-cross`)

**Interfaces:**
- Consumes: `SiteContent`, `SectionId`, `contentFor`, `getEdition`, `folioFor`.
- Produces: `SiteProvider({ site, children })`, `useSite(): SiteContent`, `useSection(id: SectionId): SectionMeta & { id: SectionId; folio: string }`; `App({ edition?: Edition })`.

- [ ] **Step 1: Написать падающие тесты страницы**

```tsx
// src/App.test.tsx
import { render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

const pageSections = () =>
  Array.from(document.querySelectorAll('main > section')).map(
    (element) => element.id,
  )

const rail = () => screen.getByLabelText('Содержание страницы')

const railHrefs = () =>
  within(rail())
    .getAllByRole('link')
    .map((link) => link.getAttribute('href'))
    .filter((href): href is string => href?.startsWith('#') ?? false)

beforeEach(() => {
  delete document.documentElement.dataset.edition
})

describe('App', () => {
  it('по умолчанию показывает контент-выпуск', () => {
    render(<App />)

    expect(screen.getAllByText('Контент-маркетолог').length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { level: 2, name: /Пишу лонгриды/ })).toBeInTheDocument()
    expect(pageSections()).toEqual([
      'top',
      'video',
      'texts',
      'tools',
      'about',
      'experience',
      'skills',
      'contacts',
    ])
    expect(railHrefs()).toEqual([
      '#video',
      '#texts',
      '#tools',
      '#about',
      '#experience',
      '#skills',
      '#contacts',
    ])
    expect(
      screen.getByRole('link', { name: /Все 8 публикаций/ }),
    ).toHaveAttribute('href', '#texts')
    expect(
      screen.getByRole('link', { name: /Версия для AI-автоматизации/ }),
    ).toHaveAttribute('href', '/ai/')
  })

  it('в AI-выпуске инструменты идут раньше текстов', () => {
    render(<App edition="automation" />)

    expect(screen.getAllByText('AI-автоматизатор').length).toBeGreaterThan(0)
    expect(
      screen.getByRole('heading', { level: 2, name: /Собираю AI-инструменты/ }),
    ).toBeInTheDocument()
    expect(pageSections()).toEqual([
      'top',
      'video',
      'tools',
      'texts',
      'about',
      'experience',
      'skills',
      'contacts',
    ])
    expect(railHrefs()).toEqual([
      '#video',
      '#tools',
      '#texts',
      '#about',
      '#experience',
      '#skills',
      '#contacts',
    ])
    expect(
      screen.getByRole('link', { name: /Все 3 инструмента/ }),
    ).toHaveAttribute('href', '#tools')
    expect(
      screen.getByRole('link', { name: /Версия для контента/ }),
    ).toHaveAttribute('href', '/')
    expect(screen.getAllByText('01 · Инструменты').length).toBeGreaterThan(0)
    expect(screen.getAllByText('02 · Тексты').length).toBeGreaterThan(0)
  })

  it('показывает ведущую ветку в анонсах', () => {
    const { unmount } = render(<App />)
    expect(
      screen.getAllByText(/Мое производство на 90 млн/).length,
    ).toBeGreaterThan(0)
    unmount()

    render(<App edition="automation" />)
    expect(screen.getAllByText('article-layout').length).toBeGreaterThan(0)
  })

  it('держит видео, Telegram, контакты и переключатель темы', () => {
    render(<App />)

    const video = document.querySelector('video')
    expect(video).toHaveAttribute('src', '/vizitka.mp4')
    expect(video).toHaveAttribute('poster', '/vizitka-poster.jpg')
    expect(
      screen.getAllByRole('link', { name: /Написать в Telegram/ }).length,
    ).toBeGreaterThan(0)
    expect(
      screen.getAllByText('kuzakin.work@gmail.com').length,
    ).toBeGreaterThan(0)
    expect(
      screen.getByRole('button', { name: /Сменить тему/ }),
    ).toBeInTheDocument()
  })

  it('держит новые заметки разделов', () => {
    render(<App />)

    expect(
      screen.getAllByText('3 инструмента · 3 публичных репозитория').length,
    ).toBeGreaterThan(0)
    expect(
      screen.getAllByText('2016—2026').length,
    ).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Убедиться, что тесты падают**

Run: `npm test -- src/App.test.tsx`
Expected: FAIL — страница всё ещё берёт старый `content`.

- [ ] **Step 3: Добавить контекст выпуска**

```tsx
// src/content/context.tsx
import { createContext, useContext, type ReactNode } from 'react'
import { folioFor } from './shared'
import type { SectionId, SectionMeta, SiteContent } from './types'

const SiteContext = createContext<SiteContent | null>(null)

export function SiteProvider({
  site,
  children,
}: {
  site: SiteContent
  children: ReactNode
}) {
  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>
}

export function useSite(): SiteContent {
  const site = useContext(SiteContext)
  if (!site) throw new Error('useSite must be used inside SiteProvider')
  return site
}

export function useSection(
  id: SectionId,
): SectionMeta & { id: SectionId; folio: string } {
  const site = useSite()
  const index = site.order.indexOf(id)
  if (index < 0) throw new Error(`Section ${id} is not in site.order`)
  return { id, ...site.sections[id], folio: folioFor(index) }
}
```

- [ ] **Step 4: Переключить `App` на выпуск и `site.order`**

`App` принимает необязательный `edition`, берёт `contentFor(edition ?? getEdition())`, оборачивает всё в `SiteProvider`. `Hero` остаётся первым, дальше `site.order.map` по карте компонентов:

```tsx
const sectionComponents: Record<SectionId, ComponentType> = {
  video: Video,
  texts: Texts,
  tools: Tools,
  about: About,
  experience: Experience,
  skills: Skills,
  contacts: Contacts,
}
```

Эффект прокрутки к `location.hash` сохранить. `Header` и `Footer` — внутри провайдера.

- [ ] **Step 5: Перевести `Header` на данные**

Навигация — те же пять пунктов, что сейчас: `texts`, `tools`, `about`, `experience`, `contacts`, но в порядке `site.order` и с колонцифрами из него: `01 · Тексты`, на `/ai/` — `01 · Инструменты`, `02 · Тексты`. Имя слева выводить из `profile.name` как `А. Кузакин`. `aria-label` навигации — `Разделы страницы`. Скролл-спай работайте по этому же списку.

- [ ] **Step 6: Перевести `Hero` на данные**

- Левая метка — `Портфолио`, центральная — `profile.role`, правая — `profile.location · editionDate`.
- Заголовок — `headline.map`, между строками `<br className="lead-break" />`; дек — `profile.tagline`.
- «В номере» — все `site.order`, номер `folioFor(index)`, название и `sections[id].short`. `aria-label` у `aside` — `Содержание страницы`.
- Telegram-плашка, `profile.availability`, затем последней строкой ссылка `site.crossLink` с классом `rail-cross`.
- Доказательства — `proof`.
- Анонсы: `heroLead === 'texts'` — три статьи (номер, заголовок, площадка, просмотры без слова «просмотров»); `heroLead === 'tools'` — три инструмента (номер, имя, стек, эффект). Заголовок блока — `Дальше в номере`; ссылка — `Все 8 публикаций` / `Все 3 инструмента` на `#texts` / `#tools`. Внешние ссылки — `target="_blank" rel="noreferrer"`; для инструмента без `href` — `#tools`.

- [ ] **Step 7: Перевести разделы на `useSite`/`useSection`**

Каждый компонент берёт `const { id, folio, title, note } = useSection('…')` и передаёт в `Section`. Тексты, инструменты, опыт, навыки, контакты — из `useSite()`.

- `Video`: главы из `videoChapters`; `src="/vizitka.mp4"`, `poster="/vizitka-poster.jpg"`, ссылка скачивания — `/vizitka.mp4`. Абсолютные пути работают и на `/`, и на `/ai/`; `base` меняется в Task 4.
- `Texts`: убрать локальный подсчёт просмотров, заметка из данных.
- `About`: цитата из `pullQuote`, подпись — имя и локация.
- `Footer`: `© {editionYear} {profile.name}`, строка `Личное портфолио · обновлено {editionDate} · набрано …`.

- [ ] **Step 8: Добавить стиль ссылки на второй выпуск**

```css
.rail-cross {
  font: 400 11px/1.3 var(--font-mono);
  letter-spacing: 0.06em;
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.rail-cross:hover {
  color: var(--ink);
}
```

- [ ] **Step 9: Прогнать тесты**

Run: `npm test -- src/App.test.tsx src/content.test.ts src/content/shared.test.ts`
Expected: PASS, 16 тестов.

- [ ] **Step 10: Коммит**

```bash
git add src/App.tsx src/App.test.tsx src/content/context.tsx src/components src/index.css
git commit -m "feat: рендерить страницу из выбранного выпуска"
```

---

### Task 4: Две HTML-точки и адреса

**Files:**
- Create: `ai/index.html`
- Create: `src/pages.test.ts`
- Modify: `index.html`
- Modify: `vite.config.ts`
- Modify: `tsconfig.app.json` (добавить типы Node для теста, читающего HTML с диска)

**Interfaces:**
- Consumes: `data-edition` из Task 2.
- Produces: сборка `dist/index.html` и `dist/ai/index.html`.

- [ ] **Step 1: Написать падающий тест страниц**

```ts
// src/pages.test.ts
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const read = (path: string) =>
  readFileSync(new URL(path, import.meta.url), 'utf8')

const inlineScript = (html: string) =>
  html.match(/<script>\s*([\s\S]*?)<\/script>/)?.[1] ?? ''

describe('pages', () => {
  const editor = read('../index.html')
  const automation = read('../ai/index.html')

  it('помечает выпуски и задаёт разные заголовки', () => {
    expect(editor).toContain('data-edition="editor"')
    expect(automation).toContain('data-edition="automation"')
    expect(editor).toContain(
      '<title>Александр Кузакин — контент-маркетолог</title>',
    )
    expect(automation).toContain(
      '<title>Александр Кузакин — AI-автоматизатор</title>',
    )
  })

  it('даёт разные описания и OG-описания', () => {
    expect(editor).toContain('Александр Кузакин — контент-маркетолог.')
    expect(automation).toContain('Александр Кузакин — AI-автоматизатор.')
    expect(editor).not.toContain('Собираю AI-инструменты и довожу их')
    expect(automation).toContain('Собираю AI-инструменты и довожу их')
  })

  it('грузит общий код и favicon из корня', () => {
    for (const html of [editor, automation]) {
      expect(html).toContain('src="/src/main.tsx"')
      expect(html).toContain('href="/favicon.svg"')
    }
  })

  it('держит одинаковый скрипт темы', () => {
    expect(inlineScript(editor)).not.toBe('')
    expect(inlineScript(editor)).toBe(inlineScript(automation))
  })
})
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npm test -- src/pages.test.ts`
Expected: FAIL — нет `ai/index.html`.

- [ ] **Step 3: Обновить `index.html`**

- `<html lang="ru" data-theme="day" data-edition="editor">`
- favicon — `/favicon.svg`
- `description` — `Александр Кузакин — контент-маркетолог. Лонгриды для Хабра и VC до 141 тыс. просмотров, три инструмента в продакшене. Томск, удалённо.`
- `og:title` — `Александр Кузакин — контент-маркетолог`
- `og:description` — `Пишу лонгриды для Хабра и VC. 141 тыс. просмотров у одной статьи. Рутину вокруг текста превращаю в инструменты.`
- `<title>` — `Александр Кузакин — контент-маркетолог`

- [ ] **Step 4: Создать `ai/index.html`**

Копия `index.html` с отличиями:

- `data-edition="automation"`
- `description` — `Александр Кузакин — AI-автоматизатор. Собираю AI-инструменты и довожу до продакшена. Три публичных репозитория, автовёрстка статей и монтаж видео у коллег без кода.`
- `og:title` — `Александр Кузакин — AI-автоматизатор`
- `og:description` — `Собираю AI-инструменты и довожу их до продакшена. Автовёрстка статей и черновой монтаж видео работают у коллег без кода.`
- `<title>` — `Александр Кузакин — AI-автоматизатор`

Inline-скрипт темы скопировать байт в байт. `#root` и `src="/src/main.tsx"` те же.

- [ ] **Step 5: Обновить `vite.config.ts`**

```ts
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        ai: fileURLToPath(new URL('./ai/index.html', import.meta.url)),
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
    globals: true,
  },
})
```

В `tsconfig.app.json` заменить `"types": ["vite/client"]` на `"types": ["vite/client", "node"]`: `src/pages.test.ts` импортирует `node:fs`, и `tsc -b` должен его видеть.

- [ ] **Step 6: Прогнать тесты и сборку**

Run: `npm test -- src/pages.test.ts`
Expected: PASS, 4 теста.

Run: `npm run build`
Expected: успешная сборка; затем:

```bash
test -f dist/index.html
test -f dist/ai/index.html
grep -o '<title>[^<]*' dist/index.html dist/ai/index.html
```

Expected: оба файла на месте, заголовки разные.

- [ ] **Step 7: Коммит**

```bash
git add index.html ai/index.html vite.config.ts src/pages.test.ts
git commit -m "feat: собрать два адреса лендинга"
```

---

### Task 5: Текстовая вычитка

**Files:**
- Modify: `src/content/shared.ts`
- Modify: `src/content/editor.ts`
- Modify: `src/content/automation.ts`
- Modify: `src/content.test.ts` (только если меняется проверяемая строка)

**Interfaces:**
- Consumes: готовые тексты Task 2.
- Produces: те же факты и структура; формулировки без машинных маркеров.

- [ ] **Step 1: Прогнать текстовые скиллы**

Загрузить `text-edit` и `ai-text-detector`. Пройти по всем строкам трёх файлов контента. Править только конкретные маркеры: канцелярит, симметричные афоризмы, метафоры вместо обычных слов, утверждения без доказательства. Факты, роли, порядок разделов, `crossLink`, значения из тестов и запрещённый список не меняются.

- [ ] **Step 2: Проверить, что не протёк слоп**

Run: `npm test -- src/content.test.ts`
Expected: PASS, включая запрещённые метки и `media-scan`.

- [ ] **Step 3: Повторно прогнать детектор**

`ai-text-detector` по итоговым текстам. Оставшиеся срабатывания — только те, что являются цитатами, названиями или фактами; всё остальное исправить.

- [ ] **Step 4: Коммит**

```bash
git add src/content
git commit -m "copy: вычитать тексты двух выпусков"
```

---

### Task 6: Документация и уборка

**Files:**
- Delete: `src/content.ts`
- Modify: `README.md`
- Modify: `PRODUCT.md`
- Modify: `DESIGN.md`

**Interfaces:**
- Consumes: всё предыдущее.
- Produces: документация соответствует двум выпускам; старого контента нет.

- [ ] **Step 1: Удалить старый контент**

```bash
git rm src/content.ts
```

- [ ] **Step 2: Обновить README**

- Вступление: два выпуска, `/` — контент, `/ai/` — AI-автоматизация.
- `src/content/` вместо `src/content.ts`; описать `types`, `shared`, `editor`, `automation`, `index`.
- Публикация: `base: '/'`, сайт в корне `postpunk93.github.io`; при переносе в подпапку `base` менять.
- Упомянуть, что CI собирает обе страницы.

- [ ] **Step 3: Обновить PRODUCT.md**

- Users: рекрутеры под две роли, ссылка выбирает выпуск.
- Purpose/Positioning: один человек, две роли; в каждом выпуске ведущая ветка одна, вторая — ссылка.
- Operating Context: `src/content/`, адреса `/` и `/ai/`, публикация в корне домена.
- Capabilities: одна кодовая база, две HTML-страницы, один набор компонентов.
- Evidence: 3 инструмента, `media-scan` убрать; 8 публикаций, 369 тыс. у семи статей.
- Principles: убрать «две ветки равноправны», заменить на «в выпуске одна ветка ведёт».

- [ ] **Step 4: Обновить DESIGN.md**

В описании первой полосы: «В номере» перечисляет все разделы и их колонцифры; под статусом стоит ссылка на второй выпуск; шапка и «В номере» строятся из порядка разделов выпуска. Вёрстка и типографика не меняются.

- [ ] **Step 5: Финальная проверка**

Run: `npm test`
Expected: PASS, все тесты.

Run: `npm run lint`
Expected: без ошибок.

Run: `npm run build`
Expected: успешная сборка, `dist/index.html` и `dist/ai/index.html` существуют.

- [ ] **Step 6: Коммит**

```bash
git add -A
git commit -m "docs: описать два выпуска и убрать старый контент"
```

---

## Self-Review

- **Покрытие спеки:** адреса и `base` — Task 4; контент и общие факты — Tasks 1–2; компоненты, порядок, колонцифры, анонсы, cross-link — Task 3; тексты и голос — Task 5; документация — Task 6; тесты и критерии готовности — Tasks 1–4, 6.
- **Проверяемые значения:** 8 публикаций, 369 тыс., 3 инструмента, отсутствие `media-scan`, порядок разделов, колонцифры, cross-link, `/vizitka.mp4` — закреплены тестами.
- **Типы:** `SiteContent` из Task 1 используется в Task 2; `useSite`/`useSection` из Task 3 — во всех компонентах; `data-edition` из Task 2 — в Task 4.
- **Review Focus:** каждый пункт закрыт тестом в Task 1, 2, 3 или 4.
