import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

const fr: Record<string, (p: { l: Locale }) => React.ReactNode> = {
  about: ({ l }) => (
    <>
      <p>
        CostTrek vous aide à comparer le <strong>coût de la vie, la fiscalité,
        les salaires, la qualité de vie et les visas</strong> entre les villes et
        les pays du monde entier — afin que vous puissiez voir ce qu&apos;un
        déménagement signifie réellement avant de vous lancer. Tout est disponible
        en cinq langues.
      </p>
      <h2>Comment fonctionne l&apos;indice de coût</h2>
      <p>
        Notre chiffre de référence est un indice du coût de la vie où la ville
        américaine moyenne est fixée à <strong>100</strong>. Une ville à 60 est
        environ 40&nbsp;% moins chère qu&apos;une ville américaine typique&nbsp;;
        une ville à 150 est environ 50&nbsp;% plus chère. L&apos;indice combine le
        logement, l&apos;alimentation, les transports, les services publics, la
        santé et les biens du quotidien. Saisissez votre salaire sur n&apos;importe
        quelle page de comparaison pour voir l&apos;équivalent dont vous auriez
        besoin pour conserver le même niveau de vie ailleurs.
      </p>
      <h2>D&apos;où proviennent nos données</h2>
      <ul>
        <li>
          <strong>Les chiffres économiques</strong> — PIB par habitant, espérance
          de vie et inflation — proviennent de{" "}
          <a href="https://data.worldbank.org" rel="noopener" target="_blank">
            World Bank Open Data
          </a>
          .
        </li>
        <li>
          <strong>Les résumés fiscaux et sur les visas</strong> sont compilés à
          partir des administrations fiscales nationales et de sources publiques,
          à un niveau général.
        </li>
        <li>
          <strong>L&apos;indice de coût global des villes américaines</strong> est
          ancré aux véritables{" "}
          <a
            href="https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area"
            rel="noopener"
            target="_blank"
          >
            parités de prix régionales du BEA
          </a>{" "}
          (tous articles, US = 100, 2023).
        </li>
        <li>
          <strong>Les loyers dans les métropoles américaines</strong> utilisent le
          loyer brut médian réel issu de l&apos;{" "}
          <a
            href="https://data.census.gov/table?q=B25064"
            rel="noopener"
            target="_blank"
          >
            enquête ACS de l&apos;U.S. Census Bureau
          </a>{" "}
          (2023).
        </li>
        <li>
          <strong>Les ventilations par catégorie, les estimations de loyer pour un
          logement d&apos;une chambre et les scores de qualité de vie</strong>{" "}
          sont des estimations compilées à titre indicatif général, affinées au fil
          du temps. Les indices des villes internationales sont des estimations
          calibrées.
        </li>
      </ul>
      <p>
        Nous nous efforçons de maintenir des chiffres raisonnables et à jour, mais
        il s&apos;agit d&apos;estimations, et non de statistiques officielles. Rien
        ici ne constitue un conseil financier, fiscal, juridique ou en matière
        d&apos;immigration — vérifiez tout élément important auprès d&apos;une
        source officielle ou d&apos;un professionnel qualifié avant de prendre des
        décisions.
      </p>
      <h2>À qui cela s&apos;adresse</h2>
      <p>
        Aux personnes qui envisagent une relocalisation, aux travailleurs à distance
        et nomades numériques qui choisissent une base, aux entreprises qui
        planifient des déménagements, et à quiconque est simplement curieux de savoir
        jusqu&apos;où irait son argent ailleurs.
      </p>
      <h2>Nous contacter</h2>
      <p>
        Des questions, des corrections ou des idées de partenariat&nbsp;? Consultez
        notre page{" "}
        <Link href={`/${l}/contact`}>Contact</Link>.
      </p>
    </>
  ),
  privacy: ({ l }) => (
    <>
      <p>
        Il s&apos;agit d&apos;un modèle de politique de confidentialité pour
        CostTrek&nbsp;; examinez-le avec un professionnel qualifié avant de vous y
        fier. Il explique ce que nous collectons et pourquoi.
      </p>
      <h2>Informations que nous collectons</h2>
      <p>
        CostTrek est un site de contenu. Nous ne vous demandons pas de créer un
        compte ni de soumettre des données personnelles pour le consulter. Nous
        recevons automatiquement des données techniques standard (adresse IP, type
        de navigateur, pages consultées) et utilisons des cookies et technologies
        similaires comme décrit dans nos{" "}
        <Link href={`/${l}/cookies`}>Cookies</Link>.
      </p>
      <h2>Comment nous utilisons les données</h2>
      <ul>
        <li>Pour exploiter, sécuriser et améliorer le site web.</li>
        <li>
          Pour mesurer le trafic à l&apos;aide d&apos;outils d&apos;analyse
          respectueux de la vie privée.
        </li>
        <li>
          Pour afficher de la publicité, qui peut utiliser des cookies afin de
          personnaliser les annonces.
        </li>
      </ul>
      <h2>Publicité &amp; tiers</h2>
      <p>
        Nous pouvons afficher des annonces diffusées par des réseaux tiers (par
        exemple, Google AdSense). Ces partenaires peuvent utiliser des cookies pour
        diffuser des annonces en fonction de vos visites précédentes. Vous pouvez
        contrôler la publicité personnalisée via les paramètres de votre appareil et
        de votre navigateur et, dans l&apos;UE/au Royaume-Uni, via les choix de
        consentement que nous présentons.
      </p>
      <h2>Vos droits</h2>
      <p>
        Selon votre lieu de résidence (par exemple, dans le cadre du RGPD ou du
        CCPA), vous pouvez disposer de droits d&apos;accès, de rectification ou de
        suppression de vos données et du droit de vous opposer à certains
        traitements. Contactez-nous pour les exercer.
      </p>
      <h2>Contact</h2>
      <p>
        Des questions sur vos données ou sur cette politique&nbsp;? Écrivez à{" "}
        <a href="mailto:info@costtrek.com">info@costtrek.com</a>.
      </p>
    </>
  ),
  terms: () => (
    <>
      <p>
        En utilisant CostTrek, vous acceptez ces conditions. Il s&apos;agit
        d&apos;un modèle&nbsp;; examinez-le avec un professionnel qualifié avant de
        vous y fier.
      </p>
      <h2>Usage informatif uniquement</h2>
      <p>
        Tous les chiffres relatifs au coût de la vie, à la fiscalité et à la
        relocalisation sont des estimations approximatives fournies à titre
        d&apos;information générale. Ils ne constituent pas un conseil financier,
        fiscal, juridique ou en matière d&apos;immigration. Vérifiez tout élément
        important auprès d&apos;une source officielle ou d&apos;un professionnel
        qualifié avant de prendre des décisions.
      </p>
      <h2>Aucune garantie</h2>
      <p>
        Le site est fourni «&nbsp;en l&apos;état&nbsp;», sans garantie
        d&apos;aucune sorte. Nous faisons de notre mieux pour maintenir les données
        à jour, mais nous ne pouvons pas garantir qu&apos;elles sont exactes,
        complètes ou actuelles.
      </p>
      <h2>Liens externes</h2>
      <p>
        Nous pouvons créer des liens vers des sites et services tiers, certains via
        des accords d&apos;affiliation. Nous ne sommes pas responsables de leur
        contenu ni de leurs pratiques.
      </p>
      <h2>Modifications</h2>
      <p>
        Nous pouvons mettre à jour ces conditions&nbsp;; toute utilisation continue
        signifie que vous acceptez les modifications.
      </p>
    </>
  ),
  cookies: () => (
    <>
      <p>
        CostTrek utilise des cookies — de petits fichiers stockés sur votre
        appareil — pour faire fonctionner le site et, avec votre consentement,
        mesurer le trafic et prendre en charge la publicité.
      </p>
      <h2>Types de cookies que nous utilisons</h2>
      <ul>
        <li>
          <strong>Essentiels</strong> — nécessaires au fonctionnement du site (par
          exemple, mémoriser votre langue et votre choix en matière de cookies).
          Toujours activés.
        </li>
        <li>
          <strong>Analytiques</strong> — nous aident à comprendre quelles pages sont
          utiles. Activés uniquement si vous les acceptez.
        </li>
        <li>
          <strong>Publicitaires</strong> — utilisés par des partenaires publicitaires
          (par exemple, Google AdSense) pour mesurer et personnaliser les annonces.
          Activés uniquement si vous les acceptez.
        </li>
      </ul>
      <h2>Gérer les cookies</h2>
      <p>
        Vous pouvez accepter ou refuser les cookies non essentiels via la bannière
        affichée lors de votre première visite, et changer d&apos;avis à tout moment
        en effaçant les données de ce site dans votre navigateur. Vous pouvez
        également bloquer les cookies dans les paramètres de votre navigateur.
      </p>
    </>
  ),
  contact: () => (
    <>
      <p>
        Nous serions ravis d&apos;avoir de vos nouvelles — questions, commentaires,
        corrections de données ou idées de partenariat sont les bienvenus. Nous nous
        efforçons de répondre sous quelques jours ouvrables.
      </p>
      <h2>Demandes générales &amp; corrections</h2>
      <p>
        Écrivez à <a href="mailto:info@costtrek.com">info@costtrek.com</a>. Si un
        chiffre vous semble erroné pour une ville ou un pays, dites-le-nous — nous
        affinons les données et apprécions les remarques.
      </p>
      <h2>Publicité &amp; partenariats</h2>
      <p>
        Pour toute demande de publicité, de parrainage ou de partenariat, écrivez à{" "}
        <a href="mailto:ads@costtrek.com">ads@costtrek.com</a>.
      </p>
      <h2>À propos du site</h2>
      <p>
        CostTrek est un projet indépendant financé par la publicité qui compare le
        coût de la vie, la fiscalité et la qualité de vie entre les villes et les
        pays du monde entier.
      </p>
    </>
  ),
};

export default fr;
