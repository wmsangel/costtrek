# Переезд CostTrek: Vercel → Cloudflare (OpenNext)

Статус на 2026-10-05. Ветка: **`cloudflare-spike`**. Прод (`costtrek.com`) пока на
Vercel и не тронут. Всё ниже проверено локально; в облако не выехали — упёрлись в
дневной free-лимит KV (нужен Workers Paid).

---

## TL;DR
1. **Ты:** включаешь **Workers Paid $5/мес** в Cloudflare → пишешь мне «готово».
2. **Я:** `npm run cf:build && npm run cf:deploy` → превью `costtrek.workers.dev`,
   проверяю все маршруты, показываю тебе.
3. **Ты:** смотришь превью, говоришь «ок на домен».
4. **Я + ты:** переключаем `costtrek.com` на воркер (Custom Domain), Vercel держим
   пару дней как откат.

---

## ✅ Что уже сделано (код готов)
- **Next 16.2.12 → 16.3.8** (требование адаптера; смержено в `main`, прод здоров).
- `@opennextjs/cloudflare` установлен; **`open-next.config.ts`** (ISR-кэш через **KV**,
  т.к. у токена нет R2-скоупа) + **`wrangler.jsonc`** (worker `costtrek`,
  nodejs_compat, assets/KV/images-биндинги).
- **KV-namespace создан:** `NEXT_INC_CACHE_KV` = `05ae934d4b3a4683a695e30a55b5e24b`.
- npm-скрипты: `cf:build`, `cf:deploy`, `cf:preview`, `cf:upload`.
- **Проверено локально (`wrangler dev` + populateCache local):** middleware
  (`proxy.ts` locale-redirect) ✓, `/og` (PNG 1200×630, Satori/WASM) ✓,
  home/finder/compare(308)/sitemap/robots ✓, после наполнения кэша — city/
  calculator/charlotte/хабы 200 с корректным контентом ✓.
- **Ассетов всего ~39–45** (не 25–35k, как боялись) — file-лимит не проблема.

## ⛔ Почему нужен Workers Paid ($5/мес)
- Воркер **3.59 MB gzip** > free-лимит **3 MB** (paid = 10 MB).
- Наполнение ISR-кэша = **~11 869 записей** в KV; free-KV = **1 000 put/день**
  (мы его уже сожгли сегодня — отсюда письмо «KV requests temporarily blocked»,
  сброс 2026-10-06 00:00 UTC). Paid включает 1 млн записей/мес.
- Это ожидаемый гейт, не баг. Free-план технически не потянет наш объём.

---

## 📋 ТВОИ ШАГИ

### Шаг 1 — включить Workers Paid (сейчас/через пару часов)
Cloudflare dashboard → **Workers & Pages → Plans** (или кнопка **Upgrade plan**
из письма Cloudflare) → **Workers Paid $5/мес → Subscribe**. Нужна карта.
→ Напиши мне «**готово**».

### Шаг 2 — посмотреть превью (после моего деплоя)
Я дам ссылку `https://costtrek.<акк>.workers.dev`. Прокликай: главная, город,
сравнение, калькулятор, финдер, смена языка. Скажи «**ок на домен**» или что не так.

### Шаг 3 — переключение домена (делаем вместе, после зелёного превью)
В Cloudflare: **Workers & Pages → costtrek → Settings → Domains & Routes → Add →
Custom Domain** → `costtrek.com` и `www.costtrek.com`. CF сам переставит DNS на
воркер. (Если дашборд-скоупа хватит, часть сделаю через `wrangler`; что нельзя —
покажу по шагам.)

### Шаг 4 — выключить Vercel для домена (после проверки прода на CF)
В Vercel проекта **worldtime** → Settings → Domains → убрать `costtrek.com`
(или оставить проект, но снять домен). **Сам проект на Vercel НЕ удаляй ещё
~3–7 дней** — это наш быстрый откат.

### (Опционально, позже) Авто-деплой вместо «git push → Vercel»
Два пути, оба требуют твоего действия в дашборде:
- **Cloudflare Workers Builds:** Workers & Pages → connect GitHub-репо
  `wmsangel/costtrek`, команда билда `npm run cf:build`, деплой-команда `cf:deploy`.
- **или GitHub Actions:** добавить секрет `CLOUDFLARE_API_TOKEN` (Workers+KV scope)
  — тогда я напишу workflow. До этого деплой — вручную моей командой.

---

## 🤖 МОИ ШАГИ (после «готово»)
1. `nvm use 22` (wrangler требует Node ≥22; у тебя стоит v22.21.1 через nvm).
2. `npm run cf:build` — Next build + адаптация (~2–3 мин).
3. `npm run cf:deploy` — заливка воркера + populate ~11 869 записей в KV
   (**~20 мин**, прогресс-бар; это норма).
4. Проверю в облаке: middleware-редирект, `/og`, 10–15 ключевых URL (en+de,
   city/compare/calc/finder/хабы), консоль/заголовки, `sitemap.xml`.
5. Отдам тебе ссылку превью. Домен — только после твоего «ок».

## ⚠️ Заметки / риски
- **Node 22 обязателен** для любых wrangler/cf-команд (сайт сам собирается и на 20).
- **Middleware на CF — «experimental»** у OpenNext; у нас локально работает, но на
  это надо смотреть после переключения (локаль-редирект).
- **`@vercel/analytics`** на Cloudflare перестанет собирать (это Vercel-платформенная
  штука). У нас есть GA4 (consent-gated) + RUM-beacon; Vercel Analytics потом уберём
  из кода. Не блокер.
- **Edge-аналитика/404-5xx:** когда домен будет проксироваться через CF (а он и так
  на CF-DNS), откроется то, чего раньше не было — бонус переезда.
- **Каждый деплой** заново наполняет кэш (~12k put). На Paid (1 млн/мес включено) при
  1 деплое/день это ~360k/мес — с запасом. Не частить бессмысленными деплоями.
- **Прод-безопасность:** до Шага 3 `costtrek.com` остаётся на Vercel. Откат = вернуть
  домен на Vercel (минуты).

## Справочно (аккаунт/ресурсы)
- Аккаунт: `wmsangel@gmail.com`, id `d6d43b8e4c7d1d4858991c524843db4c`.
- Worker: `costtrek`. KV: `NEXT_INC_CACHE_KV` (`05ae934d4b3a4683a695e30a55b5e24b`).
- Конфиг: `wrangler.jsonc`, `open-next.config.ts`. Выхлоп сборки `.open-next/`
  (в .gitignore).
