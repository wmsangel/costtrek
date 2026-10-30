# CostTrek — реклама, партнёрки и перелинковка (единый справочник)

> Обновлено: 2026-10-09. Источник правды по коду: `src/lib/affiliates/toolkit.ts`,
> `src/lib/network.ts`, `src/lib/flags.ts`, `src/app/[locale]/layout.tsx`.
> Статусы заявок дублируются в `research/IDEAS.md`; суть — в памяти
> `affiliate-toolkit-research`, `personal-network-crosspromo`.

Три источника дохода/ссылочной массы:
1. **AdSense (display)** — рычаг дохода №1. Главное, остальное — копейки на нынешнем трафике.
2. **Партнёрки (CPS/CPA)** — внешние `sponsored nofollow`. Монетизация travel-намерения.
3. **Внутренняя сеть** — `do-follow` ссылки между своими сайтами (SEO-масса + трафик).

---

## Сводка — реклама и офферы (сетевой стандарт)

Статусы: `активна` · `ждёт` (заявка на рассмотрении) · `рано` (не дотягиваем до порога) · `нет`.

| Канал | Статус | Доход/мес | Условия / ссылка |
|---|---|---|---|
| **AdSense** (display) | рано | — | сайт ещё не добавлен; рычаг №1, ждёт порог трафика |
| **Travelpayouts** (flights/hotels/cars/tours/eSIM/luggage/comp) | активна | ≈ $0 | marker 567317; ~0 при текущем трафике |
| **SafetyWing** (insurance) | активна | — | direct, 10% recurring, Wise |
| **MyTrip** (flights) | активна | — | Indoleads, CPS $6/sale |
| **Admitad** (Way.com / Cheapvuelos / Flight Network) | активна | — | website_id 2988082 |
| **DiscoverCars** (cars) | активна | — | Admitad 20065, **ОДОБРЕНА + размещена 26.10** (deeplink `naiawork.com`), 365-дн. cookie, глоб. дефолт авто (заменил Economybookings) |
| **Instarem** (money-transfer) 💰 | ждёт | — | Indoleads 20719, одобрен только под calclumen. **Владелец запросил менеджеру под costtrek 27.10** — ждём; в Requests строки ещё нет. Как одобрят → диплинк в toolkit.ts (category `other`/money-transfer) + деплой |
| **Trip.com** (hotels/flights Asia) | нет | — | Indoleads 378, под costtrek **REJECTED** 05.10 (проверено 26.10); можно пере-подать с др. источником |
| **NordVPN** (VPN) | нет | — | Admitad 18867 declined |
| **EKTA** (insurance) | нет | — | программа закрылась (08.10) |
| **Amazon Associates** (книги/гаджеты) | активна | — | tag `costtrek-20`; ДОП-блок на country-страницах, за флагом `AMAZON_ENABLED` |
| **Travelpayouts Drive** (скрипт site-wide) | активна | — | флаг `TRAVELPAYOUTS_DRIVE`; выключить перед AdSense-ревью |

Детали по каждому каналу, гео-скоуп, трекеры и rel= — в разделах ниже.

**Amazon Associates (запущен 2026-10-14).** tag **`costtrek-20`** (`src/lib/amazon.ts`).
Нативный ДОП-блок «Recommended reading & gear» внизу country-страниц (`AmazonPicks.tsx`,
за флагом `AMAZON_ENABLED` в `flags.ts` — вырубить перед AdSense-ревью, если придерутся).
v1 = тегированные **search-ссылки** на amazon.com (вечнозелёные; без цен/фото — политика
до PA-API), `rel="sponsored nofollow noopener"` + дисклеймер. Правило «3 продажи/180 дней»
— на весь аккаунт (держат другие сайты сети). **TODO:** (1) OneLink для гео-роутинга
de/fr/es/pt на локальные маркетплейсы (иначе не-US трафик идёт на amazon.com и хуже
конвертит); (2) после первых 3 продаж — PA-API → конкретные ASIN вместо search + фото.

---

## 0. Правило rel= (главный ответ на вопрос «что no-follow, что do-follow»)

| Тип ссылки | Где | `rel=` | Follow? |
|---|---|---|---|
| **Партнёрские (affiliate)** | toolkit, OfferSlot, FlightWidget, MyTrip, /best CTA, compare CTA | `sponsored nofollow noopener` | 🔴 **no-follow** (обязательно по правилам Google + сетей) |
| **Своя сеть — футер «From our network»** | `NetworkStrip` | `noopener` | 🟢 **do-follow** |
| **Своя сеть — контекст в теле гайдов** | `guides.tsx` + переводы | `noopener` | 🟢 **do-follow** |
| **House-ad «Featured on CostTrek»** | `FeaturedPromo` | — (внутренний `next/link`, тот же домен) | 🟢 **do-follow** (internal) |
| **Внутренняя навигация** (город↔город, гайды, коллекции) | весь сайт | — (`next/link`) | 🟢 **do-follow** (internal) |

Принцип: **всё, что приносит нам деньги от третьих лиц, — `nofollow sponsored`**
(иначе бан в AdSense/сетях и слив веса на партнёра). **Всё своё — `do-follow`**
(передаём вес внутри сети). Промежуточного не держим.

---

## 1. AdSense (display-реклама)

- **Клиент (pub id):** `pub-5535516142831006` — зашит в `layout.tsx` (loader грузится
  site-wide, НЕ за cookie-гейтом, чтобы бот-ревьюер его видел).
- **Статус:** ⚠️ **costtrek.com ещё НЕ добавлен в AdSense** (Sites → Add site). Это
  действие владельца и это **рычаг №1** — важнее любых партнёрок.
- **Согласие (EEA/UK):** обрабатывается Google Funding Choices (настраивается в AdSense
  после одобрения), а не нашим `CookieBanner` (он только localStorage `cc-consent`).
- **Перед ревью:** выключить Travelpayouts Drive (см. §4) — его «open offer in background
  tab» = pop-under-риск для Better Ads.

**TODO владельца:** добавить сайт в AdSense → пройти ревью → разместить слоты.

---

## 2. Партнёрки — РАЗМЕЩЕНО И ЖИВЁТ (external, `sponsored nofollow noopener`)

> **Клоакинг через `/go/<id>` (30.10, по итогам аудита «клики есть, денег ноль»).**
> Реальные affiliate-URL больше НЕ в разметке — страницы ведут на `/go/<id>?s=<slug>`,
> а `src/app/go/[id]/route.ts` резолвит id в `src/lib/affiliates/links.ts` (server-only
> реестр) и отдаёт **302 человеку / 204 боту**. Фильтр (проверен на pawdget/prodom):
> UA содержит «Mozilla» и не bot-слово + `Sec-Fetch-Site: same-origin|same-site` ИЛИ
> `Referer` на нашем хосте. subid = slug страницы (`subid` для Admitad, `sub_id` для TP).
> `Disallow:/go/` в robots, `X-Robots-Tag: noindex` на всех ответах, `/go` исключён из
> locale-редиректа в `proxy.ts`. Цель — чтобы сети не считали краулеров кликами. rel
> прежний (`sponsored nofollow noopener`, БЕЗ noreferrer — Referer нужен фильтру).


Единый источник — `src/lib/affiliates/toolkit.ts` (`buildGeoToolkit`, гео-скоуп по
`city.countryCode`, новые города покрываются автоматически). Рендерят `PlanYourMove.tsx`,
`CityProfileSections.tsx`, `OfferSlot.tsx`, `FlightWidget.tsx`, `MyTripCard.tsx`.

| Категория | Партнёр | Сеть | Гео | Трекер |
|---|---|---|---|---|
| ✈️ Flights (widget) | **Aviasales** (поисковая форма) | Travelpayouts | global | `shmarker=770708.flights_form` |
| ✈️ Flights (card) | **MyTrip** (Etraveli) | **Indoleads** | global (→ UK сайт) | `io10.info/6aa7d36473fb3` |
| ✈️ Flights (slot) | Cheapvuelos / Flight Network | Admitad | в profile-слотах | `yknhc.com` / `xyowz.com` |
| 🏨 Hotels | **Planetofhotels** (единственный, метапоиск 2M+) | Travelpayouts | везде, **кроме TR** | `uhtkc.com/...` (CPA 4.93%) |
| 🚗 Cars | **Localrent** (турист. рынки) / иначе **DiscoverCars** (Admitad, одобр. 26.10) | Travelpayouts / **Admitad** | Localrent: GE/TR/AE/TH/ID/VN/MY/GR/ES/IT/PT/MX/CO | `localrent.tpm.li` / `naiawork.com` (Economybookings — резерв) |
| 🛵 Scooter | **BikesBooking** | Travelpayouts | ID/VN/TH | `bikesbooking.tpm.li` |
| 🚕 Transfer | **Welcome Pickups** (юж. Европа) / иначе **Kiwitaxi** | Travelpayouts | WP: ES/IT/GR/PT/FR; Kiwitaxi: ост. (кроме TR) | `tpm.li/bFe65KrG` / `kiwitaxi.tpm.li` |
| 🎟️ Tours | **Klook** (global) + **Tiqets** (Европа) / **Platinumlist** (Gulf) | Travelpayouts | Tiqets: EU+TR; Platinumlist: AE/SA/QA/EG/BH/KW/OM | `klook.tpm.li` / `tiqets.tpm.li` / `i07o.xyz` |
| 📶 eSIM | **Airalo** | Travelpayouts | global | `airalo.tpm.li` |
| 🛡️ Insurance | **SafetyWing** (10% recurring, Wise) | direct | global | `safetywing.com/...?referenceID=26588804` |
| 🧳 Luggage | **Radical Storage** | Travelpayouts | global | `radicalstorage.tpm.li` |
| ⚖️ Flight comp. | **AirHelp** (EU261/UK261) | Travelpayouts | EU+UK | `airhelp.tpm.li` |
| 🅿️ US/CA | **Way.com** (парковка/мойка/страховка) | Admitad | US/CA | `yyczo.com/...` |

**В резерве (ссылки есть, НЕ подключены специально):** Yesim (дубль Airalo), EKTA
(дубль SafetyWing + **закрывается** — см. §3). Причина: две одинаковые карточки =
«link farm» риск для AdSense. Держим как A/B-замену при поломке основного.

**Платёжное ограничение владельца (KG ИП):** принимает Payoneer / Wise / крипта / банк,
**НЕ PayPal**. Все подключённые сети (Travelpayouts, Admitad/Mitgo, Indoleads, CJ, Impact,
Awin) платят на Payoneer/банк 🟢. Опасность — прямые in-house программы с PayPal-only.

---

## 3. Партнёрки — КАНДИДАТЫ / КУДА ПОДАВАТЬ (действия владельца вручную)

> Подача заявок и привязка офферов = действия от имени владельца → **делает владелец сам**.
> Я читаю API свободно и готовлю трекинг-вставки в код, но **пушу только по подтверждению.**

### Перепроверка 2026-10-26 (Chrome владельца, read-only)
**Admitad costtrek (ad space 2988082, «My Programs» = 9 подключённых):** DiscoverCars 20065
теперь **ОДОБРЕНА** (joined, Banners&Links доступны) → размещена в коде (deeplink
`naiawork.com/g/wqjhitsyjqa27dee2ccd5ea594bb46/`). NordVPN 18867 — в подключённых нет
(по-прежнему declined). Новые AvitoVIP Transfer / NH-Hotels — дубли категорий, не ставил.
**Indoleads (после входа владельца, read-only, Offers→Requests, 34 заявки):**
- **Trip.com** под costtrek — **REJECTED** (05.10, «apply with another source»); pending только
  для foundaday. → под costtrek недоступен (можно пере-подать с другим источником).
- **Instarem** — Approved только для **calclumen**, заявки под costtrek НЕТ → нужен запрос
  менеджеру (Marina Lavrenova) под costtrek. Пока не разместить.
- **Одобрены под costtrek, но НЕ ставлю (дубли категорий, анти-link-farm):** GetYourGuide
  (туры — дубль Klook/Tiqets), eSky (авиа — дубль Aviasales/MyTrip), Traveloka MY (авиа/отели
  SEA), Udemy (курсы — слабый фит под cost-of-living). MyTrip под costtrek — уже в коде.
- **Итог Indoleads:** нового, пригодного без дублирования — нет.

### Статус по кабинетам — ПРОВЕРЕНО ВРУЧНУЮ 2026-10-13 (истина = кабинет, не API)
Полный аудит по API + оба веб-кабинета (сессия владельца в Chrome). Итог: **нового,
пригодного к размещению под costtrek — нет**; все живые ссылки в коде здоровы.

| Оффер | Сеть | ID | Реальный статус (кабинет) | Решение |
|---|---|---|---|---|
| **DiscoverCars** | Admitad | 20065 | 🟡 **awaiting moderation** (рекламодатель) под costtrek | ждать; ссылок пока нет |
| **NordVPN** | Admitad | 18867 | 🔴 declined | мимо (VPN — слабый фит) |
| **Trip.com** | Indoleads | 378 | 🟡 applied, `allowed:false` (не одобрен) | ждать |
| **Instarem** 💰 | Indoleads | 20719 | ✅ approved — но для **calclumen**, НЕ costtrek | см. ниже (нужен запрос менеджеру) |
| **GetYourGuide** | Indoleads | 19048 | ✅ approved под costtrek | дубль туров (Klook/Tiqets) → не ставим |
| **eSky** | Indoleads | 17503 | ✅ approved под costtrek | дубль флайтов (Aviasales/MyTrip) → не ставим |
| **Udemy** | Indoleads | 650 | ✅ approved под costtrek | нерелевантно |

**Живые Admitad-ссылки в коде (costtrek 2988082) — все `active` ✓:** AvitoVIP (107567),
Cheapvuelos (183133), Flight Network (130860), Planetofhotels (100844), Way.com (29492).
Мёртвых нет. (NH-Hotels 17396 тоже active, но из кода убран — безвредно.)

**💰 Instarem — единственный стратегически ценный (money-transfer, закрывает гап №1):**
CPA **6 USD** (first-time transaction), cookie/hold 30 дней, deeplink yes, SEO/Websites/
Content ads = allow. Гео: US/UK/EU(весь)/Singapore/Japan/Malaysia/HK — отлично ложится.
НО approved только под **calclumen**; чтобы добавить costtrek — нет самосервисной кнопки
«Apply» (заявка на уровне аккаунта), нужен **запрос менеджеру Marina Lavrenova**
(m.lavrenova@indoleads.com) — это сообщение от имени владельца → по отдельному ок.

### Отклонено / мимо
- 🔴 **declined**: NordVPN (Admitad 18867), italki (24736), Preply (29694), Omio (16528),
  Trip.com (Admitad 23733), Infobus (19229).
- **EKTA** — закрылась (08.10). Нужна ещё страховка → **VisitorsCoverage** (FlexOffers/TP).
- Indoleads account-wide `allowed` (но НЕ под costtrek / нерелевантно): Macpaw, Costway,
  ExpressVPN/Crypto.com (→ thecryptotools), Platinumlist (→ testsweep, у нас уже через TP).

### Реквизиты сетей (для ручной подачи)
- **Admitad:** website_id costtrek.com = **2988082**. ⚠️ Файл `~/.config/seo-stats/
  admitad-website-id.txt` = 2995811 = **testsweep.com** (чужой сайт!) — всегда матчить по
  домену через `GET /websites/v2/`, не по файлу. API-attach мёртв (HTTP 410) — подавать в
  кабинете store.admitad.com, переключив **Ad Space → costtrek.com** (иначе заявка уйдёт
  не на тот сайт). «Banners and Links» в шапке ≠ approved: смотреть баннер «Codes will
  become available after you join» + «My Ad Spaces: Awaiting moderation».
- **Indoleads:** app.indoleads.**ru** (кабинет; в браузере владельца открывается). API —
  app.indoleads.**com** `/api/offers` (нужен User-Agent). ⚠️ Поля `applied`/`allowed`
  account-wide и ВРУТ про конкретный сайт — реальный source смотреть в Dashboard →
  «Latest Approved Offers» (там видно offer × source). Ссылку брать: оффер → Tracking link
  → Source = свой домен → Generate.
- **Travelpayouts:** основной линчпин — один аккаунт закрывает 4 категории. marker 567317.

### Незакрытые гео-гапы
- **Money-transfer** — **Instarem найден на Indoleads** (см. выше, нужен запрос менеджеру под
  costtrek). Это и есть главный незакрытый вертикал (высший RPM релокации). Wise/Revolut/
  Remitly по-прежнему только через TP/Impact напрямую.
- **Недвижимость (rent/buy)** — Spotahome/Uniplaces; HousingAnywhere/Blueground только B2B.
- **Визы** — iVisa / VisatoSingapore (Admitad 190129 / Indoleads 21830) — фит под Singapore-
  кластер, но качество офферов проверить; не подавали.

**Калибровка (честно):** travel-вертикаль насыщена; ещё один CPS-оффер = копейки при ~13
визитах/день. Реальные рычаги — **AdSense** + money-transfer, не travel-мелочь.

---

## 4. Travelpayouts Drive (скрипт site-wide)

- Флаг `TRAVELPAYOUTS_DRIVE` в `src/lib/flags.ts` (сейчас `true`). Грузит `emrldco.com/...`
  в `layout.tsx` — нативная контекстная travel-монетизация (keyword links, previews, native blocks).
- ⚠️ **Перед AdSense-ревью → `false` + пуш.** Опция Drive «open offer in background tab»
  (Visitor Intelligence) = pop-under / Better Ads нарушение. Её же выключить в кабинете Drive.
  Остальной Drive AdSense-дружелюбен.

---

## 5. Внутренняя сеть — что рекламируем и как (всё `do-follow`)

Сеть владельца: **14 сайтов**, перекрёстный промоушен. CostTrek сам из списка исключён.

### 5.1. Футер «From our network» — `NetworkStrip` (ротация, do-follow)
- Данные: `src/lib/network.ts` → `NETWORK_SITES`. Компонент хеширует путь → показывает
  окно из **3** сайтов (на каждой странице свой срез, ре-ротация при клиентской навигации).
- `rel="noopener"`, `target="_blank"` — **do-follow** (это свои сайты, не sponsored).
- Заголовок — dict `footer.network` (×5 локалей).

**Ростер (14):** izntools.com · iznkit.com · calclumen.com · thecryptotools.com ·
pawdget.com · izngames.com · bilimjol.com · 24zdorovie.com · prodom-expert.ru ·
foldoutkit.com · ocrsnip.com · foundaday.com · dasha-motion.com · testsweep.com.
Добавить/изменить → append в `NETWORK_SITES` (короткий англ. tagline), больше ничего.

### 5.2. Контекстная перелинковка в теле гайдов (do-follow, editorial)
Редакционные ссылки внутри текста гайдов — максимум 1–2 на сайт, строго по теме,
не «для галочки». `rel="noopener"` (do-follow). Файлы: `src/content/guides.tsx` + переводы
`guides-i18n/{de,fr,es,pt}.tsx` (одна и та же вставка во всех 5 локалях).

| → Сайт | Гайд | Контекст / анкор |
|---|---|---|
| **OCRSnip** | digital-nomad-visa-guide | доход: выписки/пейслипы → чистая таблица |
| **CalcLumen** | salary-you-need-to-move-abroad | подушка: калькулятор цели накоплений |
| **Pawdget** | budgeting-a-move-abroad-with-family | one-off расходы: сколько стоит собака |
| **OCRSnip** | renting-an-apartment-abroad | договор на чужом языке → оцифровать фото/PDF в текст |

**Не линкуем** (осознанно): thecryptotools / iznkit / izntools — не по теме
cost-of-living/релокации. Ссылка ради ссылки вредит, а не помогает.

### 5.3. House-ad «Featured on CostTrek» — `FeaturedPromo` (internal, do-follow)
- Баннер в футере рекламирует **наши собственные фичи** (не внешнее): finder, калькуляторы,
  коллекции best/*, guides, countries. Пул — `src/lib/featured.ts` (8 позиций).
- Ротация раз в ISO-неделю, **клиентски** (SSR рендерит item 0 → после mount свап; без
  рассинхрона гидрации, без редеплоя). Клик шлёт `track("promo_click")`.
- Внутренний `next/link` (тот же домен) → do-follow по определению. Заголовок — `footer.featured` (×5).

---

## 6. Деплой правок по рекламе/ссылкам

Прод на **Cloudflare**, авто-деплой: **`git push` в `main` → GitHub Actions → Cloudflare**.
Ручной `cf:deploy` больше не нужен (строка про «НЕ git push» в IDEAS.md устарела).
`research/**` и `**/*.md` в `paths-ignore` — правки доков деплой не триггерят.

---

## 7. Чек-лист перед AdSense-ревью
- [ ] Добавить costtrek.com в AdSense (действие владельца).
- [ ] `TRAVELPAYOUTS_DRIVE = false` + пуш (убрать pop-under-риск), выключить VI в кабинете Drive.
- [ ] Убедиться, что все affiliate-ссылки = `sponsored nofollow noopener` (сейчас да — см. §0).
- [ ] Настроить Google Funding Choices (consent EEA/UK) после одобрения.
- [ ] (Опц.) Проверить «thin affiliate»: держим 1 карточку на категорию, дубли — в резерве.
