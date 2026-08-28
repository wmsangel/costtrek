/**
 * The owner's personal network of sites — cross-promoted in a rotating footer
 * strip (see `NetworkStrip`). CostTrek itself is intentionally excluded (no
 * point advertising the current site to its own visitors).
 *
 * Taglines are kept short and in English: CostTrek's audiences are en/de/fr/es/pt,
 * so English is the common denominator even for the Russian-language sites, whose
 * brand names stay as-is.
 */
export type NetworkSite = {
  url: string;
  name: string;
  tagline: string;
  emoji: string;
};

export const NETWORK_SITES: NetworkSite[] = [
  {
    url: "https://izntools.com/",
    name: "IZN Tools",
    tagline: "Small tools, done fast",
    emoji: "🛠️",
  },
  {
    url: "https://iznkit.com/en",
    name: "iznkit",
    tagline: "Tools that make clean PDFs",
    emoji: "📄",
  },
  {
    url: "https://calclumen.com/en",
    name: "CalcLumen",
    tagline: "Free everyday calculators",
    emoji: "🧮",
  },
  {
    url: "https://thecryptotools.com/",
    name: "TheCryptoTools",
    tagline: "Crypto calculators & tools",
    emoji: "🪙",
  },
  {
    url: "https://izngames.com/",
    name: "izn.games",
    tagline: "Free browser games",
    emoji: "🎮",
  },
  {
    url: "https://bilimjol.com/",
    name: "Bilimjol",
    tagline: "Learning games for kids",
    emoji: "🎓",
  },
  {
    url: "https://24zdorovie.com/ru/",
    name: "24zdorovie",
    tagline: "Evidence-based health guides",
    emoji: "🩺",
  },
  {
    url: "https://prodom-expert.ru/",
    name: "ДомЭксперт",
    tagline: "Home repair & interior design",
    emoji: "🔨",
  },
  {
    // testsweep.com was unreachable when wired; tagline pending from the owner.
    url: "https://testsweep.com/",
    name: "TestSweep",
    tagline: "",
    emoji: "🧪",
  },
];
