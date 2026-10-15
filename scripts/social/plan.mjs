/**
 * CostTrek social content plan — week 1 (7 posts), English.
 *
 * Every post is tied to a real page on costtrek.com (the "link in bio" target),
 * tone honest (no clickbait, cost-of-living figures framed as estimates).
 * Rubrics: breakdown (carousel-5), myth-vs-fact (post), checklist (carousel),
 * tool promo (CTA), story (native poll/quiz — clean background only).
 *
 * Consumed by gen.mjs (renders slides) and surfaced in the hub artifact
 * (captions + hashtags with copy buttons). `link` is where the bio link points
 * for that day.
 */

export const BRAND = {
  name: "CostTrek",
  domain: "costtrek.com",
  accent: "#9c5a3a",
};

/** Slide types map to templates in gen.mjs. Carousels = array of slides. */
export const PLAN = [
  {
    id: "01-singapore-breakdown",
    day: "Mon",
    rubric: "Breakdown",
    kind: "carousel",
    link: "costtrek.com/guides/cost-of-living-in-singapore",
    caption:
      "Is Singapore really that expensive? Short answer: it depends almost entirely on two things — housing and whether you own a car. Everything else (hawker food, transit, healthcare) is cheap and excellent.\n\nWe broke down what a move actually costs, for a single, a couple and a family. Full guide — link in bio.",
    hashtags:
      "#singapore #costofliving #expat #movingabroad #relocation #singaporelife #expatlife #digitalnomad",
    slides: [
      {
        type: "cover",
        rubric: "Cost of living",
        title: "Is Singapore really\nthat expensive?",
      },
      {
        type: "text",
        heading: "Two things decide your budget",
        body: "Rent and a car. Private rents are high, and owning a car means buying a Certificate of Entitlement that can cost more than the car itself.",
      },
      {
        type: "text",
        heading: "What stays cheap",
        body: "Hawker centres, the MRT, and world-class healthcare. A single person living modestly keeps costs in check.",
      },
      {
        type: "checklist",
        heading: "Where the money goes",
        rows: [
          { ok: false, text: "Central condo + car" },
          { ok: false, text: "International school fees" },
          { ok: true, text: "Hawker food & transit" },
          { ok: true, text: "Public healthcare" },
        ],
      },
      {
        type: "cta",
        title: "The full Singapore\nbudget breakdown",
        link: "costtrek.com/guides",
      },
    ],
  },
  {
    id: "02-dubai-myth",
    day: "Tue",
    rubric: "Myth vs Fact",
    kind: "post",
    link: "costtrek.com/cost-of-living/dubai-ae",
    caption:
      "Dubai isn't just for the ultra-rich — the real story is the tax. No personal income tax means a given salary stretches much further than in high-tax Europe. The costs that bite are rent (often paid in a few big cheques), schooling and running a car.\n\nFull Dubai profile — link in bio.",
    hashtags:
      "#dubai #uae #expat #costofliving #movingtodubai #expatlife #relocation #notax",
    slides: [
      {
        type: "mythfact",
        tag: "MYTH",
        statement: "Dubai is only affordable if you're rich.",
        answer:
          "No income tax reshapes the math — a salary stretches further than in high-tax Europe. The real costs are rent, schooling and a car.",
        link: "costtrek.com",
      },
    ],
  },
  {
    id: "03-lease-checklist",
    day: "Wed",
    rubric: "Checklist",
    kind: "carousel",
    link: "costtrek.com/guides/renting-an-apartment-abroad",
    caption:
      "The rental market is where new arrivals lose the most money and sleep. Before you sign a lease abroad, run this checklist — deposits, contracts, and the scams to spot early.\n\nFull renting guide — link in bio.",
    hashtags:
      "#renting #movingabroad #expat #relocation #apartmenthunting #expatlife #rentalscams #housing",
    slides: [
      {
        type: "cover",
        rubric: "Checklist",
        title: "Before you sign\na lease abroad",
      },
      {
        type: "checklist",
        heading: "Do",
        rows: [
          { ok: true, text: "Get the contract translated" },
          { ok: true, text: "Photograph the flat's condition" },
          { ok: true, text: "Confirm what the deposit covers" },
          { ok: true, text: "Meet the actual landlord" },
        ],
      },
      {
        type: "checklist",
        heading: "Don't",
        rows: [
          { ok: false, text: "Pay a deposit before viewing" },
          { ok: false, text: "Wire money to 'hold' a flat" },
          { ok: false, text: "Sign what you can't read" },
          { ok: false, text: "Skip the inventory list" },
        ],
      },
      {
        type: "cta",
        title: "Rent abroad without\nlosing your deposit",
        link: "costtrek.com/guides",
      },
    ],
  },
  {
    id: "04-finder-promo",
    day: "Thu",
    rubric: "Tool",
    kind: "post",
    link: "costtrek.com/find-your-city",
    caption:
      "Not sure where to move? Find your city ranks real cities by what matters to you — budget, climate, safety, walkability, English, internet. Move the sliders, get a shortlist, share the link.\n\nTry it — link in bio.",
    hashtags:
      "#movingabroad #relocation #digitalnomad #expat #wheretolive #costofliving #citylife #nomadlife",
    slides: [
      {
        type: "cta",
        title: "Find your city",
        subtitle:
          "Rank cities by your budget, climate, safety and more. Move the sliders, get a shortlist.",
        link: "costtrek.com/find-your-city",
      },
    ],
  },
  {
    id: "05-move-story",
    day: "Fri",
    rubric: "Story",
    kind: "story",
    link: "costtrek.com/find-your-city",
    caption:
      "Story poll — would you move abroad for a lower cost of living?",
    hashtags: "",
    sticker: "Poll sticker — options: Yes, already planning / No, staying put",
    slides: [
      {
        type: "story",
        question: "Would you move abroad\nfor a lower cost\nof living?",
        sticker: "Add a poll: Yes, planning it  /  No, staying put",
      },
    ],
  },
  {
    id: "06-japan-india-breakdown",
    day: "Sat",
    rubric: "Breakdown",
    kind: "carousel",
    link: "costtrek.com/compare/tokyo-jp-vs-mumbai-in",
    caption:
      "Is Japan cheaper than India? Not even close on most things — but the gap is narrower than you'd think on housing, and wages tell the other half of the story. We compared them honestly.\n\nFull comparison — link in bio.",
    hashtags:
      "#japan #india #costofliving #tokyo #mumbai #expat #movingabroad #comparecities",
    slides: [
      {
        type: "cover",
        rubric: "City vs city",
        title: "Is Japan cheaper\nthan India?",
      },
      {
        type: "text",
        heading: "On daily life — no",
        body: "Food, transport and services are far cheaper in India. For most everyday spending, India wins comfortably.",
      },
      {
        type: "text",
        heading: "On housing — closer",
        body: "Central Tokyo rent is high, but up-front move-in costs (deposit, key money, a guarantor) are the real barrier, not the monthly figure.",
      },
      {
        type: "checklist",
        heading: "The honest read",
        rows: [
          { ok: true, text: "India: cheaper day to day" },
          { ok: true, text: "Japan: safer, better transit" },
          { ok: false, text: "Japan: high move-in costs" },
        ],
      },
      {
        type: "cta",
        title: "Compare any two\ncities, honestly",
        link: "costtrek.com/compare",
      },
    ],
  },
  {
    id: "07-salary-myth",
    day: "Sun",
    rubric: "Myth vs Fact",
    kind: "post",
    link: "costtrek.com/guides/salary-you-need-to-move-abroad",
    caption:
      "You don't need a huge salary to live abroad — you need the right city for your salary. The same income that's tight in Zurich or Singapore is comfortable in Lisbon or Kuala Lumpur.\n\nWork out the number — link in bio.",
    hashtags:
      "#movingabroad #salary #costofliving #expat #relocation #financialfreedom #digitalnomad #geoarbitrage",
    slides: [
      {
        type: "mythfact",
        tag: "MYTH",
        statement: "You need a big salary to live abroad.",
        answer:
          "You need the right city for your salary. The income that's tight in Zurich is comfortable in Lisbon or Kuala Lumpur.",
        link: "costtrek.com",
      },
    ],
  },
];
