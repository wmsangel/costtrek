import type { CalcText } from "./index";

const fr: Record<string, CalcText> = {
  "mortgage-calculator": {
    title: "Calculateur de prêt immobilier",
    excerpt: "Estimez votre mensualité de prêt immobilier — capital, intérêts, taxes et assurance — et voyez quelle part du prêt part en intérêts sur toute sa durée.",
    intent: "Calculez la mensualité d'un crédit immobilier avant de faire une demande.",
    intro: [
      "Ce calculateur de prêt immobilier affiche le coût mensuel complet d'un crédit immobilier : capital et intérêts, plus, en option, la taxe foncière, l'assurance habitation et les charges de copropriété (HOA). Ajustez le prix, l'apport, le taux d'intérêt et la durée pour voir la mensualité se mettre à jour instantanément.",
      "Le calcul repose sur un amortissement standard à taux fixe — exact, et non une simple estimation. Les seuls chiffres qui varient dans la réalité sont le taux qu'un prêteur vous propose et vos taxes et assurances locales, c'est pourquoi comparer plusieurs prêteurs avant de bloquer un taux peut vous faire économiser des milliers de dollars sur toute la durée du prêt."
    ],
    notes: [
      "Un apport plus important réduit à la fois le montant emprunté et, souvent, le taux d'intérêt — et un apport de 20 % ou plus permet généralement d'éviter l'assurance hypothécaire privée (PMI).",
      "Une durée plus courte (15 ans plutôt que 30) implique une mensualité plus élevée mais bien moins d'intérêts au total.",
      "Même un écart de 0,5 % sur le taux représente des milliers de dollars sur 30 ans — comparez toujours les offres."
    ],
    faq: [
      {
        q: "Comment la mensualité du prêt immobilier est-elle calculée ?",
        a: "Elle utilise la formule d'amortissement standard M = P·r / (1 − (1 + r)^−n), où P est le montant du prêt, r le taux d'intérêt mensuel (taux annuel ÷ 12) et n le nombre de mensualités (années × 12). La taxe foncière, l'assurance et les charges de copropriété (HOA) s'ajoutent par-dessus."
      },
      {
        q: "Cela inclut-il la taxe foncière et l'assurance ?",
        a: "Oui — en option. Saisissez votre taxe foncière annuelle, votre assurance habitation et vos charges de copropriété mensuelles (HOA) : elles s'ajoutent à la mensualité capital-intérêts pour afficher votre véritable coût mensuel."
      },
      {
        q: "Qu'est-ce que la PMI et est-elle incluse ?",
        a: "L'assurance hypothécaire privée (PMI) est généralement exigée lorsque votre apport est inférieur à 20 %. Ce calculateur n'ajoute pas la PMI automatiquement ; si votre prêteur l'exige, incluez-la dans le champ assurance."
      },
      {
        q: "Pourquoi une si grande part de mes premières mensualités part-elle en intérêts ?",
        a: "Avec l'amortissement, les intérêts sont calculés sur le capital restant dû, qui est le plus élevé au début. Les premières mensualités sont surtout composées d'intérêts et se tournent progressivement vers le capital — le détail annuel le montre."
      }
    ],
    offersHeading: "Comparer les offres de prêt immobilier",
    offers: [
      {
        name: "Comparer les taux immobiliers",
        blurb: "Les taux varient selon le prêteur — comparer plusieurs offres avant de bloquer un taux peut vous faire économiser des milliers de dollars sur toute la durée du prêt.",
        cta: "Comparer les taux"
      },
      {
        name: "Obtenir un accord de principe en ligne",
        blurb: "Découvrez combien vous pouvez emprunter et bloquez un taux grâce à un accord de principe rapide en ligne.",
        cta: "Vérifier mon éligibilité"
      },
      {
        name: "Renégocier un prêt immobilier existant",
        blurb: "Si les taux ont baissé depuis votre achat, une renégociation pourrait réduire votre mensualité.",
        cta: "Voir les taux de renégociation"
      }
    ]
  },
  "loan-calculator": {
    title: "Calculateur de prêt",
    excerpt: "Calculez la mensualité, le total des intérêts et le coût total d'un prêt personnel, étudiant ou classique.",
    intent: "Découvrez la vraie mensualité et le coût total d'un prêt avant d'emprunter.",
    intro: [
      "Ce calculateur de prêt transforme un montant emprunté, un taux d'intérêt (TAEG) et une durée en une mensualité — et, tout aussi important, montre combien d'intérêts vous paierez sur toute la durée du prêt. Utilisez-le pour les prêts personnels, les prêts étudiants, le regroupement de crédits ou tout prêt amortissable à taux fixe.",
      "Le seul chiffre qui mérite votre attention est le total des intérêts : une mensualité plus faible obtenue en allongeant la durée signifie presque toujours que vous payez bien plus au total. C'est en comparant plusieurs prêteurs sur le TAEG, et non sur la seule mensualité, que se trouvent les vraies économies."
    ],
    notes: [
      "Le TAEG regroupe le taux d'intérêt et la plupart des frais, c'est donc le chiffre le plus juste pour comparer les prêteurs.",
      "Une durée plus longue réduit la mensualité mais augmente le total des intérêts — parfois de façon spectaculaire.",
      "Rembourser un peu plus chaque mois va directement au capital et raccourcit le prêt."
    ],
    faq: [
      {
        q: "Comment la mensualité du prêt est-elle calculée ?",
        a: "Elle utilise la formule d'amortissement standard : le montant du prêt multiplié par le taux mensuel, divisé par un moins (un plus le taux mensuel) élevé à la puissance moins le nombre de mensualités. Le taux mensuel est le TAEG divisé par 12 ; le nombre de mensualités correspond à la durée en mois."
      },
      {
        q: "Quelle est la différence entre le taux d'intérêt et le TAEG ?",
        a: "Le taux d'intérêt est le coût de l'emprunt du capital ; le TAEG inclut aussi la plupart des frais du prêteur, il reflète donc le véritable coût annuel. Comparez les prêts au TAEG."
      },
      {
        q: "Une durée plus longue me fait-elle économiser de l'argent ?",
        a: "Non — elle réduit la mensualité mais augmente le total des intérêts que vous payez. Une durée plus courte coûte plus cher par mois mais moins au total."
      }
    ],
    offersHeading: "Comparer les offres de prêt",
    offers: [
      {
        name: "Comparer les taux de prêt personnel",
        blurb: "Consultez les taux de plusieurs prêteurs en quelques minutes sans affecter votre score de crédit.",
        cta: "Comparer les taux"
      },
      {
        name: "Regrouper des dettes à taux élevé",
        blurb: "Un seul prêt à taux plus bas peut réduire les intérêts que vous payez sur vos cartes de crédit.",
        cta: "Voir les options"
      },
      {
        name: "Vérifier votre taux en ligne",
        blurb: "Obtenez une estimation de taux personnalisée avec une vérification de crédit sans impact (soft credit check).",
        cta: "Vérifier mon éligibilité"
      }
    ]
  },
  "car-loan-calculator": {
    title: "Calculateur de crédit auto",
    excerpt: "Estimez votre mensualité de crédit auto, apport, reprise et taxe de vente compris — ainsi que le coût total du financement.",
    intent: "Connaissez le vrai coût mensuel d'une voiture, taxe et intérêts compris, avant le concessionnaire.",
    intro: [
      "Ce calculateur de crédit auto affiche la mensualité d'un prêt automobile après votre apport et votre reprise, avec la taxe de vente intégrée au montant financé. Ajustez le prix, la durée et le TAEG pour voir comment la mensualité et le total des intérêts évoluent.",
      "Les concessionnaires aiment négocier sur la mensualité — mais une mensualité faible peut cacher une longue durée et des milliers de dollars d'intérêts supplémentaires. Concentrez-vous sur le montant financé et le total des intérêts, pas seulement sur le montant par mois."
    ],
    notes: [
      "Dans la plupart des États américains, la taxe de vente est calculée sur le prix moins votre reprise — c'est pourquoi une reprise peut aussi réduire votre taxe.",
      "Les durées auto plus longues (72 à 84 mois) réduisent la mensualité mais vous pouvez finir par devoir plus que la valeur de la voiture.",
      "Un apport plus important réduit à la fois le prêt et les intérêts que vous payez."
    ],
    faq: [
      {
        q: "La taxe de vente est-elle incluse dans la mensualité de la voiture ?",
        a: "Oui. Ce calculateur ajoute la taxe de vente (sur le prix moins la reprise, comme l'appliquent la plupart des États américains) au montant financé, puis calcule la mensualité sur ce total."
      },
      {
        q: "Comment une reprise affecte-t-elle la mensualité ?",
        a: "La valeur de votre reprise réduit à la fois le montant que vous financez et, dans la plupart des États, le montant imposable — elle diminue donc la mensualité et la taxe de vente."
      },
      {
        q: "Quelle durée choisir ?",
        a: "Les durées plus courtes coûtent plus cher par mois mais bien moins en intérêts au total et réduisent le risque de valeur nette négative. Comparez le total des intérêts entre les durées, pas seulement la mensualité."
      }
    ],
    offersHeading: "Financez et assurez votre voiture",
    offers: [
      {
        name: "Comparer les taux de crédit auto",
        blurb: "Préqualifiez-vous auprès de plusieurs prêteurs pour battre l'offre de financement du concessionnaire.",
        cta: "Comparer les taux"
      },
      {
        name: "Obtenir des devis d'assurance auto",
        blurb: "Comparez les garanties de plusieurs assureurs au même endroit et changez pour économiser.",
        cta: "Obtenir des devis"
      },
      {
        name: "Renégocier votre crédit auto",
        blurb: "Si votre crédit s'est amélioré, une renégociation pourrait réduire votre taux et votre mensualité.",
        cta: "Voir les taux de renégociation"
      }
    ]
  },
  "salary-calculator": {
    title: "Calculateur de salaire",
    excerpt: "Estimez votre salaire net américain après l'impôt fédéral et la FICA, et convertissez entre rémunération horaire, hebdomadaire, mensuelle et annuelle.",
    intent: "Transformez un salaire brut en véritable salaire net par paie.",
    intro: [
      "Ce calculateur de salaire estime votre salaire net pour l'année fiscale américaine 2024 à l'aide des véritables tranches fédérales de l'IRS, de la déduction forfaitaire et de la FICA (Social Security et Medicare). Saisissez n'importe quelle période de paie — horaire, hebdomadaire, mensuelle ou annuelle — et il la convertit en salaire équivalent et en rémunération nette.",
      "Il s'agit d'une estimation, et non d'un bulletin de paie : il exclut les crédits d'impôt, les déductions détaillées et les nombreuses règles propres à chaque État, c'est pourquoi l'impôt de l'État est appliqué sous forme d'un taux forfaitaire que vous saisissez. Pour un chiffre exact, vérifiez auprès de votre employeur ou d'un fiscaliste."
    ],
    notes: [
      "La FICA s'élève à 7,65 % (6,2 % de Social Security jusqu'au plafond annuel de rémunération, plus 1,45 % de Medicare) en plus de l'impôt sur le revenu.",
      "Les cotisations avant impôt comme un 401(k) ou un HSA réduisent votre revenu imposable — et votre salaire net — mais constituent une épargne.",
      "Le taux d'imposition effectif correspond à votre impôt total divisé par votre salaire brut ; il est toujours inférieur à votre tranche marginale la plus élevée."
    ],
    faq: [
      {
        q: "Comment le salaire net est-il calculé ?",
        a: "Le salaire brut moins les déductions avant impôt donne le salaire imposable ; nous soustrayons la déduction forfaitaire, appliquons les tranches fédérales 2024 correspondant à votre statut fiscal, ajoutons la FICA sur le salaire brut et appliquons le taux d'État que vous avez saisi. Ce qui reste est votre salaire net estimé."
      },
      {
        q: "Quelle année de tranches fiscales utilise-t-il ?",
        a: "L'année fiscale fédérale américaine 2024 : les tranches marginales de l'IRS, la déduction forfaitaire (14 600 $ pour un célibataire / 29 200 $ pour un couple marié déclarant conjointement) et les taux et plafonds FICA 2024."
      },
      {
        q: "Pourquoi ne correspond-il pas exactement à ma fiche de paie ?",
        a: "Les fiches de paie réelles reflètent les crédits d'impôt, les déductions détaillées, les taxes locales, les choix d'avantages sociaux et les retenues propres à l'employeur. Il s'agit d'une estimation simplifiée — considérez-la comme un bon repère, pas comme un chiffre exact."
      }
    ],
    offersHeading: "Faites fructifier votre salaire",
    offers: [
      {
        name: "Compte d'épargne à haut rendement",
        blurb: "Gagnez davantage sur les liquidités qui dorment sur votre compte courant grâce à un taux d'épargne en ligne parmi les meilleurs.",
        cta: "Comparer les comptes"
      },
      {
        name: "Déclarez vos impôts en ligne",
        blurb: "Bénéficiez de chaque crédit et déduction qui vous revient grâce à un logiciel fiscal en ligne facile à utiliser.",
        cta: "Commencer la déclaration"
      },
      {
        name: "Banque en ligne sans frais",
        blurb: "Évitez les frais mensuels et soyez payé jusqu'à deux jours plus tôt avec un compte courant moderne.",
        cta: "Voir les comptes"
      }
    ]
  },
  "electricity-cost-calculator": {
    title: "Calculateur de coût de l'électricité",
    excerpt: "Découvrez combien coûte le fonctionnement de n'importe quel appareil — par jour, par mois et par an — à partir de sa puissance et de votre prix de l'électricité.",
    intent: "Découvrez ce que coûte vraiment le fonctionnement d'un appareil et où réduire la facture.",
    intro: [
      "Ce calculateur d'électricité transforme la puissance d'un appareil (en watts), sa durée d'utilisation et votre prix du kilowattheure en un coût de fonctionnement par jour, par mois et par an. C'est le moyen le plus rapide de repérer quels appareils alourdissent discrètement votre facture d'électricité.",
      "Le calcul est simple et exact : watts ÷ 1 000 × heures donne les kilowattheures, et kWh × votre tarif donne le coût. Les surprises viennent des appareils laissés allumés toute la journée — radiateurs, vieux réfrigérateurs, climatisation — où de petits coûts horaires s'additionnent vite."
    ],
    notes: [
      "Trouvez la puissance d'un appareil sur son étiquette ou dans le manuel ; pour le chauffage et la climatisation, c'est généralement le chiffre le plus élevé de votre maison.",
      "Votre prix du kWh figure sur votre facture d'électricité — il varie beaucoup selon le pays et le fournisseur.",
      "Les appareils toujours allumés et de chauffage/climatisation dominent les factures ; changer de fournisseur ou de tarif peut réduire le tarif lui-même."
    ],
    faq: [
      {
        q: "Comment calculer le coût de fonctionnement d'un appareil ?",
        a: "Multipliez la puissance en watts par le nombre d'heures d'utilisation et divisez par 1 000 pour obtenir les kilowattheures (kWh), puis multipliez par votre prix du kWh. Ce calculateur le fait automatiquement pour un jour, un mois et un an."
      },
      {
        q: "Où trouver la puissance d'un appareil ?",
        a: "Sur l'étiquette signalétique (souvent à l'arrière ou en dessous) ou dans le manuel. Si seuls les volts et les ampères sont indiqués, multipliez-les pour obtenir les watts."
      },
      {
        q: "Qu'est-ce qui consomme le plus d'électricité à la maison ?",
        a: "Le chauffage, la climatisation et tout ce qui fonctionne en permanence — radiateurs électriques, climatisation, chauffe-eau et réfrigérateurs anciens — représentent généralement la plus grande part d'une facture."
      }
    ],
    offersHeading: "Réduisez votre facture d'énergie",
    offers: [
      {
        name: "Comparer les offres d'électricité",
        blurb: "Changer de fournisseur ou de tarif peut réduire le prix que vous payez par kWh — comparez en quelques minutes.",
        cta: "Comparer les offres"
      },
      {
        name: "Obtenir des devis de panneaux solaires",
        blurb: "Découvrez combien le solaire en toiture pourrait faire économiser sur votre facture grâce à des devis locaux gratuits.",
        cta: "Obtenir des devis"
      },
      {
        name: "Appareils intelligents économes en énergie",
        blurb: "Les prises et thermostats intelligents réduisent le coût des appareils toujours allumés.",
        cta: "Voir les appareils"
      }
    ]
  }
};

export default fr;
