# Affiliates

_Last updated: 2026-08-28. Owner payout: **KG ИП — PayPal can't RECEIVE.** Only
Payoneer / Wise / crypto / bank rails. Travelpayouts (pays Payoneer) is the
linchpin — one account covers many categories._

**Deep research artifact (live):** https://claude.ai/code/artifact/10736f27-7558-446b-8b09-a97e1ec5c7f4

## How they're wired
Geo-scoped cards are injected in `src/components/CityProfileSections.tsx` via a
`geo: ReferralLink[]` array keyed on `city.countryCode` (NOT hardcoded per
profile — auto-covers future cities). Live links render as white **"Sponsored"**
cards; `rel="sponsored nofollow noopener"`. Some partners also sit in
`cityProfiles.ts` referral slots or on the compare page.

## Live roster

| Category | Partner | Geo | Link domain |
|---|---|---|---|
| Flights | Cheapvuelos | all city pages | `yknhc.com` |
| Flights | Aviasales (40%) | all | `aviasales.tpm.li` |
| Flights | Flight Network | compare pages | `xyowz.com` |
| Insurance | SafetyWing (nomad) | all | `safetywing.com` |
| eSIM | Airalo | all | `airalo.tpm.li` |
| Car rental | Localrent | GE/TR/AE/TH/ID/VN/MY/GR/ES/IT/PT/MX/CO | `localrent.tpm.li` |
| Car rental | Economybookings | everywhere else | `economybookings.tpm.li` |
| Scooters | BikesBooking | ID/VN/TH | `bikesbooking.tpm.li` |
| Transfers | Welcome Pickups | ES/IT/GR/PT/FR | `tpm.li/bFe65KrG` |
| Transfers | Kiwitaxi | else (skip TR) | `kiwitaxi.tpm.li` |
| Transfers | AvitoVIP | Istanbul only | `kjuzv.com` |
| Tours | Klook | all | `klook.tpm.li` |
| Tours | Tiqets | EU + TR + AE | `tiqets.tpm.li` |
| Hotels | NH Hotels | NL/ES/DE/GB/IT/FR/US/MX/AR/BR/CO/PT/AT | `xnmik.com` |
| Luggage | Radical Storage | all | `radicalstorage.tpm.li` |
| Flight comp. | AirHelp | EU + UK (EU261) | `airhelp.tpm.li` |
| US/CA auto | Way.com | US/CA | `yyczo.com` |

## Held in reserve (links exist, deliberately NOT wired)
- **Yesim** — duplicate of Airalo (eSIM)
- **EKTA** — duplicate of SafetyWing (insurance)

Reason: two near-identical cards read as a link farm → ad-approval risk. Use as
A/B swap or fallback if a primary partner breaks.

## Still missing
Real estate (Spotahome/Uniplaces — verify network), visas (iVisa), banking
(Wise/Revolut).

## Adding a new link
Get the tracking URL → add a `ReferralLink` in the geo block of
`CityProfileSections.tsx` (or a `cityProfiles.ts` slot). Prefer a network link
(Travelpayouts/Awin/Indoleads → Payoneer) over any PayPal-only direct program.
