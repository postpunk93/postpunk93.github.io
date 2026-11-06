# me-landing

Одностраничное портфолио Александра Кузакина: лонгриды и инструменты автоматизации.

## Стек

- Vite + React + TypeScript
- Tailwind CSS v4 (темы на CSS-переменных)
- Motion (анимации появления секций)
- Vitest + Testing Library

## Команды

```bash
npm install
npm run dev     # локальная разработка
npm test        # тесты
npm run build   # сборка в dist/
npm run preview # просмотр собранной версии
```

## Где что лежит

- `src/content.ts` — весь текст, ссылки, контакты. Правки контента — только здесь.
- `src/theme.ts` — три темы: `day`, `warm`, `night`; выбор хранится в `localStorage`.
- `src/components/` — секции страницы.
- `docs/superpowers/` — дизайн-док и план первой версии.

## Публикация

`vite.config.ts` собран с `base: './'`, поэтому `dist/` работает и из корня домена,
и из подпапки (GitHub Pages). Достаточно залить содержимое `dist/` на любой
статический хостинг.
