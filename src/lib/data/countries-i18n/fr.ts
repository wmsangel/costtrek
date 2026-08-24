import type { CountryText } from "./index";

const fr: Record<string, CountryText> = {
  "TR": { summary: "Le permis de séjour de courte durée (ikamet) est la voie courante ; s'y ajoutent un nouveau programme pour nomades numériques (2024) et la citoyenneté par investissement immobilier.", visaFreeNote: "Séjours courts sans visa ou avec e-Visa (jusqu'à 90 jours) pour de nombreux passeports (UE, R.-U., É.-U.…).", residencyNote: "Résidence permanente après 8 ans ; naturalisation après 5 ans.", nomadNote: "Carte d'identification pour nomades numériques, lancée en 2024.", healthcareNote: "Système public universel SGK ; les expatriés privilégient les hôpitaux privés — haute qualité à faible coût.", incomeTaxNote: "Tranches de 15/20/27/35/40 %.", vatNote: "KDV ; taux standard de 20 % depuis 2023.", socialNote: "Cotisations SGK.", taxNotes: ["Une forte inflation entraîne de fréquentes réévaluations des tranches et du salaire minimum."], visaNotes: ["Renouvelable ; utilisé par les travailleurs à distance et les propriétaires.", "Programme 2024 : travailleurs à distance de 21 à 55 ans, diplômés et justifiant de revenus.", "Achat immobilier de 400 000 $, conservé 3 ans.", "Parrainé par l'employeur."] },
  "US": {
    summary: "Voies fondées sur l'emploi (H-1B, L-1, O-1) et le regroupement familial ; la carte verte est réputée difficile à obtenir.",
    visaFreeNote: "Sans objet pour l'immigration ; ESTA pour les courts séjours depuis les pays du VWP.",
    residencyNote: "Naturalisation après 5 ans en tant que LPR (3 ans si marié à un citoyen).",
    nomadNote: "Pas de visa dédié aux nomades.",
    healthcareNote: "Assurance employeur ou privée ; reste à charge très élevé.",
    incomeTaxNote: "Fédéral ; les États ajoutent 0 à 13,3 % par-dessus.",
    vatNote: "Pas de TVA ; taxe de vente locale et d'État d'environ 0 à 10 %.",
    socialNote: "FICA (Social Security + Medicare).",
    cgNote: "Long terme 0/15/20 % + 3,8 % de NIIT.",
    visaNotes: [
      "Fondé sur une loterie, parrainé par l'employeur.",
      "Pour les meilleurs talents ; sans loterie.",
      null
    ]
  },
  "GB": {
    summary: "Voie Skilled Worker à points ; Global Talent pour les meilleurs professionnels.",
    visaFreeNote: "Courts séjours sans visa pour l'UE/les États-Unis/beaucoup d'autres ; le travail nécessite un visa.",
    healthcareNote: "NHS ; les résidents paient une surtaxe santé avec le visa.",
    incomeTaxNote: "Plus la National Insurance.",
    socialNote: "National Insurance.",
    visaNotes: [
      "Offre d'emploi d'un sponsor agréé.",
      null,
      null
    ]
  },
  "FR": {
    summary: "Passeport Talent pour les travailleurs qualifiés, les fondateurs et les chercheurs.",
    visaFreeNote: "Schengen : 90/180 jours sans visa pour de nombreux passeports.",
    nomadNote: "Pas de visa dédié ; la voie de la profession libérale existe.",
    healthcareNote: "Universelle (PUMA) après l'établissement de la résidence.",
    incomeTaxNote: "Plus des charges sociales élevées.",
    socialNote: "Parmi les plus élevées de l'OCDE.",
    cgNote: "PFU forfaitaire sur les revenus de placement.",
    visaNotes: [
      "Travailleurs qualifiés, fondateurs, investisseurs.",
      null
    ]
  },
  "DE": {
    summary: "Carte bleue européenne et la nouvelle Opportunity Card (recherche d'emploi à points).",
    visaFreeNote: "Schengen 90/180 pour beaucoup ; le travail nécessite un permis.",
    nomadNote: "Le titre de séjour Freiberufler est la voie courante.",
    healthcareNote: "Assurance légale (GKV) ou privée (PKV) ; obligatoire.",
    incomeTaxNote: "Plus une surtaxe de solidarité de 5,5 % sur les hauts revenus.",
    socialNote: "Santé, retraite, dépendance, chômage.",
    cgNote: "Abgeltungsteuer forfaitaire, solidarité incluse.",
    visaNotes: [
      "Diplôme + seuil de salaire.",
      "À points, pour la recherche d'emploi.",
      null
    ]
  },
  "NL": {
    summary: "Dispositif Highly Skilled Migrant ; voie du traité DAFT pour les entrepreneurs américains.",
    visaFreeNote: "Schengen 90/180 pour de nombreux passeports.",
    healthcareNote: "Assurance de base privée obligatoire.",
    socialNote: "Intégrées aux tranches de l'impôt sur le revenu.",
    cgNote: "La Box 3 taxe un rendement présumé sur le patrimoine.",
    visaNotes: [
      "Sponsor agréé + seuil de salaire.",
      null
    ]
  },
  "IE": {
    summary: "Critical Skills Employment Permit pour les métiers en tension.",
    visaFreeNote: "Common Travel Area avec le Royaume-Uni ; courts séjours sans visa pour beaucoup.",
    incomeTaxNote: "Plus l'USC et la PRSI.",
    socialNote: "PRSI.",
    visaNotes: [
      null,
      null
    ]
  },
  "ES": {
    summary: "Le visa Digital Nomad et le visa non lucratif sont des voies prisées des expatriés.",
    visaFreeNote: "Schengen 90/180 pour de nombreux passeports.",
    visaNotes: [
      "Revenus à distance + option fiscale de la loi Beckham.",
      "Preuve de revenus passifs."
    ]
  },
  "PT": {
    summary: "Visas D8 (nomade numérique) et D7 (revenus passifs) ; une destination de relocalisation de premier plan.",
    visaFreeNote: "Schengen 90/180 pour de nombreux passeports.",
    taxNotes: [
      "L'IFICI (« NHR 2.0 ») offre des avantages fiscaux à certains nouveaux arrivants qualifiés."
    ],
    visaNotes: [
      "Travailleurs à distance.",
      null
    ]
  },
  "IT": {
    summary: "Permis de travail par quotas (Decreto Flussi) ; nouvelle voie pour nomades numériques.",
    visaFreeNote: "Schengen 90/180 pour de nombreux passeports.",
    incomeTaxNote: "Plus des surtaxes régionales/municipales.",
    taxNotes: [
      "Régimes de fiscalité forfaitaire pour les nouveaux résidents et les impatriés."
    ],
    visaNotes: [
      null,
      "Revenus passifs."
    ]
  },
  "CH": {
    summary: "Système de quotas ; plus facile pour les ressortissants UE/AELE que pour les pays tiers.",
    visaFreeNote: "Schengen 90/180 pour de nombreux passeports.",
    incomeTaxNote: "Fédéral + canton + commune ; très variable.",
    cgNote: "Les gains en capital privés sont généralement exonérés.",
    visaNotes: [
      "Parrainé par l'employeur, limité par quotas.",
      null
    ]
  },
  "CA": {
    summary: "Système de points Entrée express ; Programmes des candidats des provinces.",
    visaFreeNote: "AVE pour les courts séjours depuis de nombreux pays.",
    residencyNote: "Résidence permanente via Entrée express ; citoyenneté après environ 3 ans.",
    nomadNote: "Séjour de 6 mois pour les travailleurs à distance annoncé dans le cadre de Tech Talent.",
    healthcareNote: "Couverture provinciale après l'établissement de la résidence.",
    incomeTaxNote: "Fédéral ; les provinces ajoutent environ 10 à 25 %.",
    vatNote: "TPS 5 % + provincial (TVH/TVP jusqu'à environ 15 %).",
    cgNote: "50 % et plus des gains inclus dans le revenu.",
    visaNotes: [
      null,
      null
    ]
  },
  "AE": {
    summary: "Visas d'employeur, permis de freelance et le Golden Visa de 10 ans.",
    visaFreeNote: "Visa à l'arrivée pour beaucoup ; résidence liée à l'emploi ou à un bien immobilier.",
    healthcareNote: "Fournie par l'employeur ou privée ; obligatoire dans certains émirats.",
    incomeTaxNote: "Pas d'impôt sur le revenu des personnes physiques.",
    visaNotes: [
      "10 ans pour les investisseurs/talents.",
      "1 an, revenus à distance.",
      null
    ]
  },
  "SG": {
    summary: "Employment Pass pour les professionnels ; ONE Pass pour les hauts revenus.",
    visaFreeNote: "Courts séjours sans visa pour de nombreux passeports.",
    residencyNote: "Résidence permanente possible après quelques années sous EP.",
    vatNote: "GST.",
    cgNote: "Pas d'impôt sur les gains en capital.",
    visaNotes: [
      "Seuil de salaire + points (COMPASS).",
      "Pour les très hauts revenus / les meilleurs talents."
    ]
  },
  "JP": {
    summary: "Visas de travail par catégorie ; système de points Highly Skilled Professional.",
    visaFreeNote: "Courts séjours sans visa pour beaucoup ; le travail nécessite un statut de résidence.",
    residencyNote: "Plus rapide via les points HSP.",
    incomeTaxNote: "Plus environ 10 % de taxe locale d'habitation.",
    vatNote: "Taxe à la consommation.",
    visaNotes: [
      null,
      "À points, résidence permanente accélérée.",
      null
    ]
  },
  "AU": {
    summary: "Migration qualifiée à points ; visas parrainés par l'employeur.",
    visaFreeNote: "ETA/eVisitor pour les courts séjours depuis de nombreux pays.",
    incomeTaxNote: "Plus le prélèvement Medicare de 2 %.",
    vatNote: "GST.",
    cgNote: "Imposés comme un revenu ; abattement de 50 % si détenus 1 an ou plus.",
    visaNotes: [
      null,
      null
    ]
  },
  "TH": {
    summary: "Visa Long-Term Resident, visa Elite et le nouveau DTV pour les nomades.",
    visaFreeNote: "Courts séjours sans visa pour de nombreux passeports.",
    nomadNote: "DTV, entrées multiples sur 5 ans.",
    visaNotes: [
      "5 ans, travailleurs à distance.",
      "Professionnels fortunés/qualifiés."
    ]
  },
  "MX": {
    summary: "Visa de Résident temporaire via revenus/épargne ; populaire auprès des nomades.",
    visaFreeNote: "Entrée touristique de 180 jours pour de nombreux passeports.",
    nomadNote: "De facto via le statut de Résident temporaire.",
    visaNotes: [
      "Preuve de revenus ou d'épargne ; jusqu'à 4 ans.",
      null
    ]
  },
  "PL": {
    summary: "Permis de travail de type A et carte bleue européenne ; membre de l'espace Schengen.",
    visaFreeNote: "Schengen 90/180 pour de nombreux passeports.",
    incomeTaxNote: "Plus un prélèvement de solidarité de 4 % sur les hauts revenus.",
    visaNotes: [
      null,
      null
    ]
  },
  "AR": {
    summary: "Voies Rentista et nomade numérique ; un accès relativement ouvert à la résidence.",
    visaFreeNote: "Entrée touristique de 90 jours pour de nombreux passeports.",
    taxNotes: [
      "Forte inflation ; les chiffres évoluent rapidement."
    ],
    visaNotes: [
      null,
      null
    ]
  },
  "IN": {
    summary: "Visa d'emploi pour les métiers qualifiés ; les voies de long séjour sont limitées.",
    visaFreeNote: "e-Visa touristique depuis de nombreux pays.",
    incomeTaxNote: "Plus une surtaxe + 4 % de cess (jusqu'à environ 39 % en effectif).",
    vatNote: "Tranches de GST.",
    cgNote: "12,5 % long terme / 20 % court terme (actions cotées).",
    visaNotes: [
      "Un seuil de salaire s'applique.",
      null
    ]
  },
  "KG": {
    summary: "Base peu coûteuse et faiblement imposée ; e-visa simple et longs séjours sans visa pour beaucoup.",
    visaFreeNote: "Sans visa jusqu'à 60 jours pour de nombreux passeports (États-Unis, UE, Royaume-Uni…).",
    residencyNote: "Résidence fiscale après 183 jours.",
    nomadNote: "Pas de visa dédié, mais les longs séjours sans visa conviennent aux travailleurs à distance.",
    healthcareNote: "Système public de base ; les expatriés recourent aux cliniques privées.",
    incomeTaxNote: "Impôt sur le revenu forfaitaire de 10 %.",
    taxNotes: [
      "L'un des régimes de fiscalité forfaitaire les plus bas de la région."
    ],
    visaNotes: [
      "Quota parrainé par l'employeur.",
      "Renouvelable chaque année."
    ]
  }
};

export default fr;
