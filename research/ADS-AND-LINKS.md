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
| **DiscoverCars** (cars) | ждёт | — | Admitad 20065, 365-дн. cookie |
| **NordVPN** (VPN) | ждёт | — | Admitad 18867 |
| **Trip.com** (hotels/flights Asia) | ждёт | — | Indoleads 378 |
| **EKTA** (insurance) | нет | — | программа закрывается (08.10) |
| **Travelpayouts Drive** (скрипт site-wide) | активна | — | флаг `TRAVELPAYOUTS_DRIVE`; выключить перед AdSense-ревью |

Детали по каждому каналу, гео-скоуп, трекеры и rel= — в разделах ниже.

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

Единый источник — `src/lib/affiliates/toolkit.ts` (`buildGeoToolkit`, гео-скоуп по
`city.countryCode`, новые города покрываются автоматически). Рендерят `PlanYourMove.tsx`,
`CityProfileSections.tsx`, `OfferSlot.tsx`, `FlightWidget.tsx`, `MyTripCard.tsx`.

| Категория | Партнёр | Сеть | Гео | Трекер |
|---|---|---|---|---|
| ✈️ Flights (widget) | **Aviasales** (поисковая форма) | Travelpayouts | global | `shmarker=770708.flights_form` |
| ✈️ Flights (card) | **MyTrip** (Etraveli) | **Indoleads** | global (→ UK сайт) | `io10.info/6aa7d36473fb3` |
| ✈️ Flights (slot) | Cheapvuelos / Flight Network | Admitad | в profile-слотах | `yknhc.com` / `xyowz.com` |
| 🏨 Hotels | **Planetofhotels** (единственный, метапоиск 2M+) | Travelpayouts | везде, **кроме TR** | `uhtkc.com/...` (CPA 4.93%) |
| 🚗 Cars | **Localrent** (турист. рынки) / иначе **Economybookings** | Travelpayouts | Localrent: GE/TR/AE/TH/ID/VN/MY/GR/ES/IT/PT/MX/CO | `localrent.tpm.li` / `economybookings.tpm.li` |
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

### Ждём одобрения — проверять раз в пару дней (статус 2026-10-08)
| Оффер | Сеть | ID | Статус | Категория (куда вставить) |
|---|---|---|---|---|
| **DiscoverCars** | Admitad | 20065 | 🟡 pending | cars (365-дн. cookie — лучше текущих) |
| **NordVPN** | Admitad | 18867 | 🟡 pending | other/VPN (nomad) |
| **Trip.com** | Indoleads | 378 | 🟡 pending | hotels/flights Asia |

Как только `active`/`allowed:true` → я генерю диплинк `source=costtrek.com`, вставляю
в `toolkit.ts` по паттерну кластера, `npm run build`, пуш по подтверждению.

### Отклонено / мимо
- 🔴 **declined** (авто-реджект мелкого сайта): italki (24736), Preply (29694) на Admitad;
  Omio (16528), Trip.com (Admitad 23733), Infobus (19229). Переподать позже, когда подрастёт траст.
- **EKTA** (Admitad 162553 / Travelpayouts) — ⚠️ **закрывается** (платежи стоп 08.10, прога до 14.10).
  Снято из кандидатов. В коде не было — удалять нечего. Нужна ещё страховка →
  **VisitorsCoverage** (FlexOffers/Travelpayouts) как альтернатива.
- Indoleads стали `allowed` Udemy (650) / Macpaw (2015) / Costway (21626) — **нерелевантны**, не ставим.

### Реквизиты сетей (для ручной подачи)
- **Admitad:** website_id costtrek.com = **2988082**. ⚠️ API-attach мёртв (HTTP 410) —
  подавать только в веб-кабинете. Каталог ~775 программ.
- **Indoleads:** app.indoleads.ru (**домен заблокирован** для браузера Claude — текст/коды
  владелец копирует сам). API требует заголовок `User-Agent` иначе 403. 518 офферов.
- **Travelpayouts:** основной линчпин — один аккаунт закрывает 4 категории (cars/transfers/
  tours/hotels). marker 567317.

### Незакрытые гео-гапы (не на этих сетях)
- **Money-transfer (Wise/Revolut/Remitly)** — высший RPM релокации, **отсутствует** в каталогах
  Admitad/Indoleads → только через Travelpayouts/Impact напрямую. Главный незакрытый вертикал.
- **Недвижимость (rent/buy)** — тончайшие рельсы; реально только Spotahome/Uniplaces.
  HousingAnywhere/Blueground — без affiliate (только B2B) → прямой аутрич.
- **Визы** — iVisa (проверить payout rail).

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
