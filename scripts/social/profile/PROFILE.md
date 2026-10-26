# CostTrek — оформление профиля Instagram

Готовый пакет для ручной настройки IG-аккаунта. Данные-источник — `profile.json`
(из него же шлёт `telegram-daily.mjs --profile`). Картинки генерит `gen-profile.mjs`.

## 1. Аватар
`avatar.png` — 1080×1080, фирменный знак (гора + «CostTrek», тёмное на жёлтом, как
фавикон/OG сайта), знак в центральных ~68% — безопасно под круглый кроп. Загружать
из присланного **файла** (без сжатия), не из превью.

## 2. Имя профиля
**CostTrek · Cost of Living** (25 симв., лимит 30). Ключевое слово «Cost of Living»
для поиска внутри IG.

## 3. Username (варианты)
`@costtrek` → если занят: `@costtrek.app` → `@getcosttrek`.

## 4. Bio (≤150)
> Compare the real cost of living between cities worldwide. Rent, salaries, taxes — what a move actually costs. Free tools, no hype 👇

Честный тон, сразу понятно «что получишь» + стрелка на ссылку.

## 5. Ссылка в профиле (с UTM)
```
https://costtrek.com/?utm_source=instagram&utm_medium=social&utm_campaign=bio
```

## 6. Категория и тип аккаунта
- **Тип: Business** (не Creator) — даёт кнопку-ссылку, статистику, контактные кнопки.
  Creator — под личный бренд, нам не подходит.
- **Категория: Website** (нейтрально и точно). Альтернативы: «Travel & Tourism» / «Personal Blog».

## 7. Обложки «Актуального» (6 шт., 1080×1920, без текста)
Иконка по центру, без подписи (круг обрезает текст) — имена задаются в IG вручную:

| Файл | Название |
|---|---|
| highlight-1-guides.png | Guides |
| highlight-2-calculators.png | Calculators |
| highlight-3-compare.png | City vs City |
| highlight-4-breakdown.png | Cost Breakdown |
| highlight-5-nomad.png | Nomad Visas |
| highlight-6-checklist.png | Move Checklist |

## 8. Контакты
На домене включён Cloudflare Email Routing (MX есть), но публичный алиас не подтверждён.
Рекомендация: Cloudflare → Email → Email Routing → создать `hello@costtrek.com` →
forward на свой ящик; добавить в контакты IG **только после тест-письма**. До этого —
контактный e-mail оставить пустым.

## 9. Какие 3 поста закрепить
1. **Singapore — что реально стоит жизнь** (разбор-карусель) — сильнейший кластер, глубина.
2. **Find your city** (интерактивный подбор) — утилита, гонит клики по ссылке.
3. **Japan vs India** (честное сравнение) — популярное сравнение, сильный хук.

## 10. Чек-лист «что нажать в Instagram»
1. Настройки → Аккаунт → Перейти на профессиональный → **Бизнес**.
2. Редактировать профиль → фото = `avatar.png` (из файла, без сжатия).
3. Имя = «CostTrek · Cost of Living»; username = `@costtrek` (или альт.).
4. Bio → вставить текст.
5. Ссылки → добавить внешнюю → URL с UTM.
6. Категория = Website; контактный e-mail пока пропустить.
7. Актуальное: создать 6 highlight'ов → «изменить обложку» → загрузить `highlight-N-*.png` → назвать.
8. После первых постов — закрепить 3 поста (пост → ⋯ → Закрепить в профиле).

---
**Отправка в Telegram-бот:** `node scripts/social/telegram-daily.mjs --profile`
(каждый пункт — отдельным сообщением; аватар — файлом+превью, обложки — файлами).
