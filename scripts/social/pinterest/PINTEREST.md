# CostTrek — настройка Pinterest (пошагово для владельца)

Pinterest — **поисковик картинок** с коммерческим/relocation-интентом → приоритетная
сеть по плану #5. Аккаунт создаёт владелец (Claude аккаунты не создаёт); ниже — что
регистрировать и как настроить. Фото профиля — тот же `../profile/avatar.png`.

> Что уже сделано: **Instagram** — полный профиль-кит (`../profile/`, отправлен в бот).
> **Telegram как канал — нет** (решение: только органика, TG не поисковый).

## 1. Тип аккаунта
Завести **Business**-аккаунт (бесплатно): даёт аналитику, «заявленный сайт» (website
claim), Rich Pins и доступ к Pinterest-поиску как бизнес. Регистрация:
pinterest.com → Sign up → **Convert to business** (или сразу business).

## 2. Профиль
- **Фото:** `../profile/avatar.png` (тот же знак, что в IG — узнаваемость сети).
- **Display name (до ~65 симв., участвует в поиске):** `CostTrek — Cost of Living & Moving Abroad`
- **Username:** `costtrek` (если занят — `costtrekhq`).
- **Bio (до 160):** `Compare the cost of living between cities worldwide — rent, salaries, taxes & moving tips. Free tools for your move abroad.`
- **Website:** `https://costtrek.com` (заявить — см. §3).

## 3. Заявить (claim) сайт costtrek.com
Settings → **Claimed accounts** → Claim website → способ **«Add HTML tag»**: Pinterest
выдаст мета-тег вида `<meta name="p:domain_verify" content="XXatoken">`.
→ **Пришли этот тег мне** — я добавлю его в `<head>` сайта (`src/app/[locale]/layout.tsx`),
задеплою, ты нажмёшь «Verify». Даёт атрибуцию пинов и логотип на чужих пинах с сайта.
(Альтернатива без кода: DNS TXT в Cloudflare — тоже годится.)

## 4. Rich Pins
Сайт уже отдаёт Open Graph на всех страницах → Rich Pins должны пройти валидатор без
правок. Проверить: Pinterest Rich Pins Validator → вставить любой URL costtrek.com
(напр. `/en/cost-of-living/singapore-sg`) → Apply. После одобрения пины с сайта
подтягивают заголовок/описание автоматически.

## 5. Доски (keyword-driven — это Pinterest-SEO)
Названия и описания досок = ключевые запросы. Создать 6:

| Доска | Описание (вставить) |
|---|---|
| **Cost of Living by City** | Real cost-of-living breakdowns for cities worldwide — rent, food, transport, taxes. |
| **Moving Abroad Tips** | Practical guides for relocating: budgets, visas, renting without scams. |
| **Digital Nomad Visas** | Where remote workers can legally live — nomad visa requirements by country. |
| **City vs City** | Side-by-side cost comparisons: is one city cheaper than another? |
| **Salaries & Budgeting Abroad** | The salary you need to live in a city, and how to budget a move. |
| **Best Cities to Live** | Shortlists by budget, climate, safety and walkability. |

## 6. Первые пины (из готовых слайдов)
Репостить слайды из контент-плана (`../out/<id>/*.png`, генерит `../gen.mjs`) как пины.
Каждый пин **ведёт на свою страницу costtrek.com с UTM**:
`...?utm_source=pinterest&utm_medium=social&utm_campaign=<доска>`
- Singapore-разбор → `/guides/cost-of-living-in-singapore` → доска *Cost of Living by City*
- Find-your-city → `/find-your-city` → *Best Cities to Live*
- Japan vs India → `/compare/tokyo-jp-vs-mumbai-in` → *City vs City*
- Lease-checklist → `/guides/renting-an-apartment-abroad` → *Moving Abroad Tips*
- Salary-myth → `/guides/salary-you-need-to-move-abroad` → *Salaries & Budgeting Abroad*
> Формат: Pinterest любит **вертикаль 2:3 (1000×1500)**. Квадрат 1080×1080 работает, но
> 2:3 заметнее. При желании добавлю в `gen.mjs` вертикальный пресет под пины — скажи.

## 7. Чек-лист «что нажать»
1. pinterest.com → создать/конвертировать в **Business**.
2. Фото = `avatar.png`; имя/username/bio — из §2.
3. Settings → Claimed accounts → Claim website → HTML tag → **пришли тег мне**.
4. Прогнать Rich Pins Validator на любом URL costtrek.com.
5. Создать 6 досок (§5) с описаниями.
6. Запинить 5 первых пинов (§6), каждый с UTM-ссылкой на свою страницу.
7. (Позже) включить Pinterest-аналитику, следить какие доски дают клики в GA4.

## Что я могу сделать через твой Chrome после регистрации (с твоего «да»)
- Добавить мета-тег claim в код сайта + деплой (как пришлёшь тег).
- Проверить Rich Pins на проде.
- Завести доски и их описания, оформить профиль (если залогинен в Pinterest в Chrome).
Само создание аккаунта и вход — только ты.
