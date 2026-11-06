# Me-landing — план реализации каркаса

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Собрать статический одностраничник-портфолио на React с тремя темами и лёгкой анимацией, готовый к замене текстов.

**Architecture:** Одна страница на Vite + React + TS. Весь контент — типизированный объект в `src/content.ts`; секции — тонкие компоненты, читающие его. Темы — CSS-переменные на `[data-theme]`, логика выбора темы вынесена в `src/theme.ts` и покрыта тестами. Анимации — Motion, отключаются при `prefers-reduced-motion`.

**Tech Stack:** Vite, React 19, TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), Motion, Vitest + Testing Library.

**Spec:** `docs/superpowers/specs/2026-11-06-me-landing-design.md`

## Global Constraints

- Язык интерфейса и контента — только русский.
- Темы: ровно `day`, `warm`, `night`; ключ `localStorage` — `theme`; по умолчанию `day`; если выбора нет и `prefers-color-scheme: dark` — `night`.
- Тема применяется до первой отрисовки (инлайн-скрипт в `index.html`), без мигания.
- `base: './'` в `vite.config.ts`.
- `prefers-reduced-motion: reduce` отключает анимации.
- Контент живёт только в `src/content.ts`; компоненты не содержат текста, кроме подписей интерфейса.
- Телефон владельца на странице остаётся.

## Review Focus

- Узкий экран 320 px: заголовки карточек и длинные названия статей не должны ломать вёрстку.
- Первый кадр при тёмной системной теме: страница не должна мигнуть светлым.
- `prefers-reduced-motion`: контент виден сразу, без прозрачности и сдвигов.
- Клавиатурная навигация: переключатель темы и ссылки имеют видимый фокус и доступные подписи.
- Длинные тексты в карточках не обрезаются в нечитаемое.

---

### Task 1: Скаффолд проекта, Tailwind и палитры тем

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `.gitignore`
- Test: `npm run build`

**Interfaces:**
- Produces: рабочая команда `npm run dev` / `npm run build`; в `index.css` — переменные `--bg`, `--surface`, `--text`, `--muted`, `--accent`, `--border` для трёх `[data-theme]`.

- [ ] **Step 1: Инициализировать git и проект**

```bash
git init
npm create vite@latest . -- --template react-ts
npm install
npm install tailwindcss @tailwindcss/vite motion
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 2: Подключить Tailwind и `base: './'`**

`vite.config.ts`: плагины `react()` и `tailwindcss()`, `base: './'`, `test: { environment: 'jsdom', setupFiles: './src/test-setup.ts', globals: true }`.

`src/index.css`: `@import "tailwindcss";` и три блока `[data-theme="…"]` с палитрами:
- `day` — светлый фон, тёмный текст, синий акцент;
- `warm` — кремовый фон, коричневый текст, терракотовый акцент;
- `night` — тёмный фон, светлый текст, тёплый жёлтый акцент.

Каждая палитра задаёт все шесть переменных и `color-scheme`.

- [ ] **Step 3: Проверить сборку**

Run: `npm run build`
Expected: `dist/` создан, ошибок нет.

- [ ] **Step 4: Коммит**

```bash
git add -A && git commit -m "chore: scaffold vite react ts with tailwind and themes"
```

---

### Task 2: Логика темы

**Files:**
- Create: `src/theme.ts`, `src/theme.test.ts`, `src/test-setup.ts`
- Modify: `index.html` (инлайн-скрипт до отрисовки), `src/main.tsx`

**Interfaces:**
- Produces:
  - `type Theme = 'day' | 'warm' | 'night'`
  - `const THEMES: Theme[]` — порядок переключения
  - `const THEME_LABELS: Record<Theme, string>` — «День», «Тёплая», «Ночь»
  - `resolveInitialTheme(stored: string | null, prefersDark: boolean): Theme`
  - `applyTheme(theme: Theme): void` — ставит `data-theme` на `<html>`
  - `persistTheme(theme: Theme): void` — пишет в `localStorage`
  - `nextTheme(current: Theme): Theme`

- [ ] **Step 1: Написать падающие тесты `src/theme.test.ts`**

Проверить: валидное значение из хранилища возвращается как есть; `null` + `prefersDark=true` → `night`; `null` + `prefersDark=false` → `day`; мусор (`'purple'`) ведёт себя как `null`; `nextTheme` идёт по кругу `day → warm → night → day`.

- [ ] **Step 2: Убедиться, что тесты падают**

Run: `npx vitest run src/theme.test.ts`
Expected: FAIL — модуль не найден.

- [ ] **Step 3: Реализовать `src/theme.ts`**

Функции по интерфейсу выше; `applyTheme` дополнительно ставит `document.documentElement.style.colorScheme = theme === 'night' ? 'dark' : 'light'`.

- [ ] **Step 4: Инлайн-скрипт в `index.html`**

До монтирования React прочитать `localStorage.theme`, проверить допустимость, иначе `matchMedia('(prefers-color-scheme: dark)')`, и выставить `data-theme` на `<html>`.

- [ ] **Step 5: Тесты проходят**

Run: `npx vitest run src/theme.test.ts`
Expected: PASS, 5 тестов.

- [ ] **Step 6: Коммит**

```bash
git add -A && git commit -m "feat: theme resolution and pre-paint theme script"
```

---

### Task 3: Модель контента

**Files:**
- Create: `src/content.ts`, `src/content.test.ts`

**Interfaces:**
- Produces типы и объект:
  - `SiteContent { profile: Profile; about: string[]; texts: TextCard[]; tools: ToolCard[]; experience: ExperienceItem[]; skills: SkillGroup[]; contacts: Contact[] }`
  - `TextCard { title: string; source: string; views: string; href: string }`
  - `ToolCard { name: string; summary: string; stack: string[]; effect: string; href?: string }`
  - `ExperienceItem { company: string; role: string; period: string; summary: string }`
  - `SkillGroup { title: string; items: string[] }`
  - `Contact { label: string; value: string; href: string }`
  - `export const content: SiteContent`

- [ ] **Step 1: Написать тест `src/content.test.ts`**

Проверить: `profile.name` непустой; `texts.length >= 4`; у каждой карточки есть `title`, `source`, `views`, `href`; `tools.length >= 3`; у контактов `href` начинается с `mailto:`, `tel:` или `https://`.

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npx vitest run src/content.test.ts`
Expected: FAIL — модуль не найден.

- [ ] **Step 3: Заполнить `src/content.ts` реальными данными из профиля**

- `profile`: «Александр Кузакин»; позиционирование «Пишу лонгриды, которые выходят в топ, и собираю инструменты, которые убирают рутину»; «Томск · удалённо».
- `about`: 3 абзаца — две сильные стороны, 8 лет веб-разработки, инструменты для нетехнических коллег.
- `texts` (6): 141 тыс. «Мое производство на 90 млн…» (Хабр · МойСклад), 88 тыс. «Я нашел золотую жилу в кабине грузовика…» (Хабр · МойСклад), 71 тыс. «Как устроен китайский завод электроники…» (Хабр · ГРАН), 26 тыс. «Вожу семью в прицепе…» (Хабр · МойСклад), 18 тыс. «Дефект в 8 микрон…» (Хабр · ГРАН), «Чем заменить YouTube в России: 15 вариантов» (VC). Ссылки — из `resumes/author.md`.
- `tools` (4): `article-layout` (4 ч в понедельник → 10 минут; Python, Playwright), `factory` (5 дней → 4; Python, WhisperX, ffmpeg), `media-scan` (мониторинг медиа региона; PHP, Slim, PostgreSQL, Vue 3, Docker), `vacancy-hunter` (дайджест вакансий в Telegram; Python, SQLite).
- `experience`: RuminLab 06.2024–09.2026, шеф-редактор; фриланс 2016–2024, веб-разработчик.
- `skills`: «Тексты» (лонгриды, интервью, заголовки, B2B, Хабр и VC), «ИИ и автоматизация» (Claude Code, Python, Playwright, LLM-пайплайны, n8n), «Веб» (React, TypeScript, PHP/Yii2, WordPress, PostgreSQL).
- `contacts`: почта `kuzakin.work@gmail.com`, Telegram `@protopunk70`, телефон `+7 913 885-59-17`.

- [ ] **Step 4: Тест проходит**

Run: `npx vitest run src/content.test.ts`
Expected: PASS.

- [ ] **Step 5: Коммит**

```bash
git add -A && git commit -m "feat: typed site content"
```

---

### Task 4: Каркас страницы и шапка

**Files:**
- Create: `src/components/Header.tsx`, `src/components/ThemeToggle.tsx`, `src/components/Section.tsx`, `src/components/Reveal.tsx`, `src/components/Hero.tsx`, `src/components/Footer.tsx`
- Modify: `src/App.tsx`, `src/main.tsx`

**Interfaces:**
- `Header` — якорная навигация (`#about`, `#texts`, `#tools`, `#experience`, `#contacts`) и `ThemeToggle`.
- `ThemeToggle` — кнопка с `aria-label` «Сменить тему, сейчас: {label}», циклически меняет тему через `nextTheme`, сохраняет выбор.
- `Section({ id, title, children })` — `<section>` с якорем и заголовком.
- `Reveal({ children, delay? })` — Motion-обёртка: `initial={{ opacity: 0, y: 16 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: '-80px' }}`; при `useReducedMotion()` рендерит без анимации.
- `Hero` — имя, позиционирование, две кнопки-якоря «Тексты» и «Инструменты», контакты.
- `Footer` — год и строка «Сделано на React».

- [ ] **Step 1: Написать smoke-тест `src/App.test.tsx`**

Рендерит `<App />`, проверяет: есть имя из `content.profile.name`; есть ссылки на `#texts` и `#tools`; кнопка темы имеет доступное имя.

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npx vitest run src/App.test.tsx`
Expected: FAIL — `App` не собирается.

- [ ] **Step 3: Реализовать компоненты и собрать `App.tsx`**

Порядок: `Header`, `Hero`, `About`, `Texts`, `Tools`, `Experience`, `Skills`, `Contacts`, `Footer`. Секции из Task 5 на этом шаге подключаются заглушками-плейсхолдерами, чтобы тест прошёл.

- [ ] **Step 4: Тест проходит**

Run: `npx vitest run src/App.test.tsx`
Expected: PASS.

- [ ] **Step 5: Коммит**

```bash
git add -A && git commit -m "feat: page shell, header and theme toggle"
```

---

### Task 5: Секции контента

**Files:**
- Create: `src/components/About.tsx`, `src/components/Texts.tsx`, `src/components/Tools.tsx`, `src/components/Experience.tsx`, `src/components/Skills.tsx`, `src/components/Contacts.tsx`
- Modify: `src/App.tsx` (убрать плейсхолдеры)

**Interfaces:**
- Каждая секция принимает данные из `content` и не содержит собственного текста, кроме заголовков.
- `Texts` — сетка карточек «статья → площадка · просмотры»; вся карточка — ссылка.
- `Tools` — сетка карточек: имя, описание, стек чипами, эффект.
- `Experience` — вертикальный список периодов.
- `Skills` — три группы чипов.
- `Contacts` — список ссылок с `mailto:` / `https://` / `tel:`.

- [ ] **Step 1: Реализовать секции**

Десктоп: две колонки для `Texts` и `Tools` (они идут подряд и на широком экране встают рядом через общий grid-контейнер). Мобильный: одна колонка.

- [ ] **Step 2: Проверить сборку**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Коммит**

```bash
git add -A && git commit -m "feat: content sections"
```

---

### Task 6: Доступность, адаптив, финальная проверка

**Files:**
- Modify: `src/index.css`, компоненты по результатам проверки

- [ ] **Step 1: Проверить узкий экран**

Run: `npm run dev`, открыть в DevTools ширину 320 px.
Expected: нет горизонтальной прокрутки, заголовки переносятся, кнопки не наезжают.

- [ ] **Step 2: Проверить темы и reduced motion**

Переключить все три темы, перезагрузить страницу — выбор сохранён. Включить эмуляцию `prefers-reduced-motion: reduce` — контент виден без анимации.

- [ ] **Step 3: Проверить клавиатуру**

Tab по странице: видны фокус-рамки, переключатель темы доступен, ссылки читаются скринридером (`aria-label` у кнопки темы).

- [ ] **Step 4: Прогнать тесты и сборку**

Run: `npx vitest run && npm run build`
Expected: все тесты PASS, сборка без ошибок.

- [ ] **Step 5: Коммит**

```bash
git add -A && git commit -m "fix: responsive and accessibility pass"
```
