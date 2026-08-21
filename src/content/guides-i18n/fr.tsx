import Link from "next/link";
import type { GuideContent } from "@/content/guides";

const fr: Record<string, GuideContent> = {
  "cost-of-living-index-explained": {
    title: "Ce que signifie vraiment un indice du coût de la vie de 100",
    excerpt:
      "Chaque site de comparaison brandit un chiffre d'« indice ». Voici ce qu'il mesure réellement, pourquoi la moyenne américaine sert de référence, et comment le lire sans se laisser tromper.",
    Body: ({ l }) => (
      <>
        <p>
          Si vous avez parcouru le moindre site sur l&apos;expatriation, vous avez
          vu une ville décrite par un seul chiffre — un indice de 62, ou de 154, ou
          de 100. Cela paraît précis, mais la plupart des gens n&apos;ont aucune
          idée de ce que ce chiffre compte réellement. Voici la version honnête.
        </p>
        <h2>La référence est un choix, pas une loi de la nature</h2>
        <p>
          Un indice du coût de la vie a besoin d&apos;un point de repère. Sur
          CostTrek, comme sur la plupart des outils anglophones, cette référence est{" "}
          <strong>la ville américaine moyenne, fixée à 100</strong>. Ainsi, une
          ville à 60 est environ 40 % moins chère qu&apos;une ville américaine
          typique ; une ville à 150 est environ 50 % plus chère. La référence
          pourrait tout aussi bien être Londres ou la moyenne mondiale — les
          chiffres changeraient, mais le <em>classement</em> entre les villes
          resterait le même.
        </p>
        <h2>Ce qui entre dans le chiffre</h2>
        <p>
          Un bon indice combine plusieurs paniers de dépenses, pas seulement le
          loyer : logement, alimentation et courses, transport, charges, santé et
          biens et services du quotidien. Le logement pèse généralement le plus,
          car c&apos;est le poste le plus important et le plus variable. C&apos;est
          pourquoi une ville peut sembler globalement &quot;bon marché&quot; alors
          qu&apos;une catégorie précise — le transport ou la santé, par exemple —
          est en réalité coûteuse.
        </p>
        <h2>Lisez le détail, pas seulement le titre</h2>
        <p>
          L&apos;indice unique est un point de départ, jamais la réponse. Deux
          villes affichant le même chiffre global peuvent être ressenties très
          différemment : l&apos;une avec un loyer bas et une alimentation chère,
          l&apos;autre l&apos;inverse. Ouvrez toujours le détail par catégorie et
          mettez-le en regard de la façon dont <em>vous</em> dépensez. Une banlieue
          dépendante de la voiture et un centre-ville bien desservi par les
          transports pèseront sur votre budget à des endroits très différents.
        </p>
        <h2>Les indices sont des estimations — traitez-les comme telles</h2>
        <p>
          Les prix bougent sans cesse, les devises fluctuent, et aucun jeu de
          données n&apos;est parfaitement à jour pour chaque ville. Servez-vous de
          l&apos;indice pour établir une présélection et comparer, puis vérifiez les
          deux ou trois coûts qui comptent le plus pour vous — en général le loyer
          et les impôts — auprès d&apos;une source locale et récente avant de vous
          engager.
        </p>
        <p>
          Prêt à le voir en action ?{" "}
          <Link href={`/${l}`}>Comparez deux villes</Link> ou parcourez les{" "}
          <Link href={`/${l}/best/cheapest`}>villes les moins chères de notre indice</Link>.
        </p>
      </>
    ),
  },
  "how-to-compare-cities-before-moving": {
    title: "Comment comparer deux villes avant de déménager (une checklist pratique)",
    excerpt:
      "Le loyer fait les gros titres, mais ce n'est que rarement ce qui fait le succès ou l'échec d'un déménagement. Une méthode pas à pas pour comparer deux villes au-delà du prix affiché.",
    Body: ({ l }) => (
      <>
        <p>
          Choisir entre deux villes commence généralement par le loyer et se
          termine dans le regret, car le loyer n&apos;est qu&apos;une ligne
          d&apos;un budget bien plus long. Voici une démarche qui rattrape ce que
          les gens oublient.
        </p>
        <h2>1. Partez du salaire net, pas du salaire brut</h2>
        <p>
          Un salaire plus élevé dans un pays fortement taxé peut vous laisser moins
          qu&apos;un salaire modeste dans un endroit peu imposé. Comparez le{" "}
          <strong>taux marginal supérieur de l&apos;impôt sur le revenu</strong> et
          les cotisations sociales de chaque pays, puis raisonnez en fonction de ce
          qui arrive réellement sur votre compte. Nos{" "}
          <Link href={`/${l}/countries`}>pages pays</Link> présentent les principaux
          chiffres fiscaux côte à côte.
        </p>
        <h2>2. Ancrez-vous sur un loyer réel, dans le quartier que vous choisiriez</h2>
        <p>
          Le loyer moyen d&apos;une ville masque d&apos;énormes écarts. Regardez un
          deux-pièces dans le <em>centre</em> par rapport à l&apos;<em>extérieur</em>{" "}
          du centre, et soyez honnête sur l&apos;endroit où vous vivriez vraiment.
          Vingt minutes de trajet supplémentaires peuvent réduire le loyer
          d&apos;un tiers.
        </p>
        <h2>3. Convertissez votre mode de vie, pas seulement votre loyer</h2>
        <p>
          Ajoutez les coûts qui reflètent votre routine : restaurants, abonnement de
          transport, salle de sport, charges, internet. Quelqu&apos;un qui cuisine
          chez lui et se déplace à vélo vivra une ville tout autrement que quelqu&apos;un
          qui mange dehors et conduit. Utilisez l&apos;outil d&apos;équivalence
          salariale sur n&apos;importe quelle{" "}
          <Link href={`/${l}`}>page de comparaison</Link> pour traduire votre revenu
          actuel en ce dont vous auriez besoin pour vivre de la même façon ailleurs.
        </p>
        <h2>4. Pesez les facteurs non financiers</h2>
        <p>
          La sécurité, la santé, la qualité de l&apos;air, le climat, le débit
          internet, la langue et l&apos;accès au visa n&apos;apparaissent pas dans
          un chiffre de loyer, mais façonnent le quotidien — et certains sont
          rédhibitoires. Une ville 30 % moins chère mais qui exige un visa que vous
          ne pouvez pas obtenir n&apos;est en réalité pas une option.
        </p>
        <h2>5. Vérifiez auprès des habitants</h2>
        <p>
          Les données réduisent le champ ; les gens le confirment. Une fois votre
          présélection de deux ou trois villes établie, trouvez un forum ou un ami
          sur place et posez les questions gênantes — cautions, frais cachés, à quel
          point il est vraiment difficile de trouver un appartement.
        </p>
        <p>
          Un bon point de départ :{" "}
          <Link href={`/${l}/cost-of-living/lisbon-pt`}>Lisbonne</Link>,{" "}
          <Link href={`/${l}/cost-of-living/berlin-de`}>Berlin</Link> ou{" "}
          <Link href={`/${l}/cost-of-living/bangkok-th`}>Bangkok</Link> — puis
          alignez votre préférée face à votre ville actuelle.
        </p>
      </>
    ),
  },
  "salary-you-need-to-move-abroad": {
    title: "De quel salaire avez-vous réellement besoin pour vous expatrier ?",
    excerpt:
      "La réponse honnête est « ça dépend d'où » — mais il existe une méthode simple pour transformer votre revenu actuel en objectif pour n'importe où dans le monde.",
    Body: ({ l }) => (
      <>
        <p>
          &quot;Combien dois-je gagner là-bas ?&quot; est la question derrière chaque
          expatriation. La bonne nouvelle : vous pouvez y répondre en un seul calcul,
          en partant d&apos;un salaire que vous comprenez déjà — le vôtre.
        </p>
        <h2>La méthode de l&apos;équivalence</h2>
        <p>
          Pour conserver le même niveau de vie, multipliez votre salaire actuel par
          le rapport des deux indices de coût. Si votre ville a un indice de 100 et
          que la nouvelle ville est à 70, il vous faut environ{" "}
          <strong>70 % de votre salaire actuel</strong> pour vivre de la même façon.
          Si la nouvelle ville est à 150, il vous faut environ 50 % de plus. Chaque{" "}
          <Link href={`/${l}`}>page de comparaison</Link> le fait pour vous — saisissez
          votre salaire et lisez l&apos;équivalent.
        </p>
        <h2>Ajustez ensuite pour l&apos;impôt</h2>
        <p>
          L&apos;équivalence porte sur les <em>dépenses</em>, mais vous êtes payé en{" "}
          <em>brut</em>. Un pays avec un taux marginal supérieur de 45 % et de
          lourdes charges sociales exigera un brut plus élevé pour atteindre le même
          net qu&apos;un pays à taux forfaitaire de 10 %. Vérifiez les lignes
          fiscales des deux villes avant de traduire le chiffre en offre d&apos;emploi.
        </p>
        <h2>N&apos;oubliez pas les coûts ponctuels</h2>
        <p>
          Déménager, ce n&apos;est pas seulement un budget mensuel. Prévoyez les
          vols, une caution (souvent 1 à 3 mois de loyer), les frais de visa,
          l&apos;expédition ou le remplacement du mobilier, et une marge pour les
          semaines précédant le début de vos revenus. Règle empirique : ayez de trois
          à six mois de dépenses de la nouvelle ville de côté avant de partir.
        </p>
        <h2>Là où votre argent va le plus loin</h2>
        <p>
          Si l&apos;objectif est de maximiser votre pouvoir d&apos;achat, regardez
          les villes où le même dollar achète tout simplement plus — beaucoup se
          trouvent en Asie du Sud-Est, en Amérique latine et en Europe centrale.
          Notre{" "}
          <Link href={`/${l}/best/cheapest`}>liste des villes les moins chères</Link>{" "}
          et nos{" "}
          <Link href={`/${l}/best/nomad`}>meilleures villes pour nomades numériques</Link>{" "}
          sont un moyen rapide de les repérer.
        </p>
      </>
    ),
  },
  "cheapest-places-to-live-and-the-catch": {
    title: "Les endroits les moins chers du monde où vivre — et le piège",
    excerpt:
      "Un loyer au ras du sol, c'est réel, mais « pas cher » s'accompagne toujours de compromis. Ce qu'il faut regarder au-delà de l'étiquette quand un faible coût de la vie vous tente.",
    Body: ({ l }) => (
      <>
        <p>
          Il est tout à fait possible de bien vivre avec une fraction d&apos;un
          budget occidental. Mais les villes les moins chères de tout indice
          partagent quelques constantes qu&apos;il vaut la peine de comprendre avant
          d&apos;acheter un aller simple.
        </p>
        <h2>Pourquoi elles sont bon marché</h2>
        <p>
          Un faible coût de la vie reflète généralement des salaires locaux plus bas
          et une devise plus faible, pas un cadeau. C&apos;est formidable si votre
          revenu vient de l&apos;étranger — un emploi à distance ou une épargne — et
          bien moins si vous comptez gagner votre vie sur place. L&apos;arbitrage ne
          fonctionne que dans un sens.
        </p>
        <h2>Les compromis à vérifier</h2>
        <ul>
          <li>
            <strong>Santé</strong> — les systèmes publics peuvent être limités ;
            prévoyez une assurance privée.
          </li>
          <li>
            <strong>Qualité de l&apos;air &amp; infrastructures</strong> — certaines
            mégapoles à faible coût connaissent une pollution grave ou des services
            peu fiables.
          </li>
          <li>
            <strong>Visas</strong> — une ville bon marché où vous ne pouvez rester
            que 30 jours n&apos;est pas un foyer. Vérifiez les options de résidence
            et de visa nomade numérique.
          </li>
          <li>
            <strong>Banque &amp; logistique</strong> — transférer de l&apos;argent,
            obtenir une carte SIM, signer un bail peut être plus difficile que chez
            vous.
          </li>
        </ul>
        <h2>Comment bien utiliser une liste des « moins chères »</h2>
        <p>
          Voyez-la comme un générateur de présélection, pas comme un verdict. Prenez
          les premières de notre{" "}
          <Link href={`/${l}/best/cheapest`}>classement des villes les moins chères</Link>,
          puis ouvrez la page de chaque ville et lisez les sections qualité de vie et
          visa. Un endroit comme{" "}
          <Link href={`/${l}/cost-of-living/bishkek-kg`}>Bichkek</Link> est
          étonnamment abordable, avec un impôt forfaitaire de 10 % — mais vous
          voudrez peser les hivers, la santé et la connectivité face aux économies.
        </p>
        <p>
          La bonne réponse, c&apos;est la ville la moins chère qui respecte encore{" "}
          <em>vos</em> exigences non négociables — pas le chiffre le plus bas de la
          liste.
        </p>
      </>
    ),
  },
  "taxes-when-you-relocate": {
    title: "Les impôts quand on s'expatrie : impôt sur le revenu, TVA et ce qu'il vous reste",
    excerpt:
      "Deux villes peuvent avoir des loyers identiques et des salaires nets radicalement différents. Un tour d'horizon en langage clair des impôts qui déterminent ce que vous gardez réellement.",
    Body: ({ l }) => (
      <>
        <p>
          Le coût de la vie vous dit ce que coûtent les choses ; les impôts vous
          disent combien vous avez à dépenser au départ. Ignorez-les et une ville
          &quot;moins chère&quot; peut discrètement vous appauvrir.
        </p>
        <h2>Impôt sur le revenu : le taux supérieur n&apos;est que la moitié de l&apos;histoire</h2>
        <p>
          Les pays affichent un taux marginal supérieur — 10 % au Kirghizistan, 45 %
          en Allemagne, 0 % aux Émirats arabes unis. Mais la plupart des systèmes
          sont progressifs, si bien que vous ne payez le taux supérieur que sur le
          revenu au-dessus d&apos;un seuil, et beaucoup ajoutent des{" "}
          <strong>cotisations de sécurité sociale</strong> par-dessus, qui peuvent
          rivaliser avec l&apos;impôt affiché. Comparez à la fois la ligne
          d&apos;impôt sur le revenu et la ligne sociale sur nos{" "}
          <Link href={`/${l}/countries`}>pages pays</Link>.
        </p>
        <h2>TVA / taxe sur les ventes : les 5 à 25 % invisibles</h2>
        <p>
          Les taxes à la consommation sont intégrées aux prix, donc faciles à
          oublier — pourtant elles vont d&apos;environ 5 % à plus de 25 %. Un pays
          avec un faible impôt sur le revenu mais une TVA de plus de 20 % en récupère
          une partie à la caisse. Cela compte surtout pour ceux qui dépensent une
          grande part de leur revenu localement.
        </p>
        <h2>Résidence et la règle des 183 jours</h2>
        <p>
          La plupart des pays vous considèrent comme résident fiscal dès que vous y
          passez environ <strong>183 jours</strong> par an — moment à partir duquel
          votre revenu mondial peut devenir imposable localement. Si vous partagez
          votre temps entre plusieurs pays, c&apos;est le chiffre le plus important à
          comprendre, et celui qui mérite le plus un conseil professionnel.
        </p>
        <h2>Régimes spéciaux pour les nouveaux arrivants</h2>
        <p>
          Plusieurs pays courtisent les migrants qualifiés et les travailleurs à
          distance avec des dispositifs à fiscalité réduite — le Portugal,
          l&apos;Italie et d&apos;autres en ont proposé des versions. Ils peuvent
          changer radicalement le calcul, mais ils comportent des conditions et des
          dates d&apos;expiration. Vérifiez les règles en vigueur avant de vous en
          remettre à eux.
        </p>
        <h2>L&apos;essentiel</h2>
        <p>
          Avant de comparer les loyers, comparez le <em>net</em>. Mettez deux pays
          face à face — par exemple{" "}
          <Link href={`/${l}/compare-countries/portugal-vs-germany`}>
            le Portugal contre l&apos;Allemagne
          </Link>{" "}
          — et regardez ensemble l&apos;impôt sur le revenu, la TVA et le salaire net
          moyen. Et pour tout ce qui vous engage, parlez à un fiscaliste dans le pays
          de destination ; rien ici n&apos;est un conseil fiscal.
        </p>
      </>
    ),
  },
  "digital-nomad-visas-explained": {
    title: "Les visas nomade numérique expliqués : qui est éligible et comment ils fonctionnent",
    excerpt:
      "Une vague de pays délivre désormais des visas conçus pour les travailleurs à distance. Voici en quoi ils diffèrent d'un tampon touristique, les revenus qu'ils exigent, et leurs limites.",
    Body: ({ l }) => (
      <>
        <p>
          Il y a dix ans, travailler à distance depuis l&apos;étranger signifiait
          vivre sous tampons touristiques en espérant que personne ne pose de
          questions. Aujourd&apos;hui, des dizaines de pays délivrent un{" "}
          <strong>visa nomade numérique</strong> spécialement conçu pour cela.
          C&apos;est une vraie avancée — mais plus restreinte que ne le suggère la
          communication.
        </p>
        <h2>En quoi ils diffèrent d&apos;un visa touristique</h2>
        <p>
          Un visa touristique vous autorise à visiter ; il ne vous autorise pas à
          travailler, même pour un employeur étranger, et vous limite généralement à
          30–90 jours. Un visa nomade permet explicitement le travail à distance pour
          des clients ou un employeur <em>hors</em> du pays, et court généralement sur
          un ou deux ans, avec possibilité de renouvellement. La contrepartie, c&apos;est
          la paperasse : justificatifs de revenus, assurance, casier judiciaire vierge
          et parfois des frais de dossier de plusieurs centaines.
        </p>
        <h2>La condition de revenu est le vrai filtre</h2>
        <p>
          Presque chaque dispositif fixe un revenu mensuel minimum, et c&apos;est la
          condition sur laquelle butent la plupart des gens. Fourchettes
          approximatives que vous verrez :
        </p>
        <ul>
          <li>
            <strong>Seuil bas</strong> — certaines régions d&apos;Asie du Sud-Est,
            d&apos;Amérique latine et d&apos;Europe centrale demandent souvent environ
            1 000 à 2 500 EUR par mois.
          </li>
          <li>
            <strong>Seuil élevé</strong> — les destinations plus riches et plus
            chères peuvent exiger 3 500 EUR ou plus, parfois le double pour un couple.
          </li>
          <li>
            <strong>Justificatifs</strong> — attendez-vous à présenter plusieurs mois
            de relevés bancaires ou de contrats, pas seulement une fiche de paie.
          </li>
        </ul>
        <h2>Visa, titre de séjour ou voie vers la citoyenneté ?</h2>
        <p>
          Ne confondez pas un visa nomade avec une résidence permanente. La plupart
          sont temporaires et ne comptent <em>pas</em> pour la citoyenneté, même si
          quelques-uns se transforment en titres de séjour plus longs si vous restez
          et payez des impôts. Lisez les petites lignes sur les renouvellements et sur
          la prise en compte du temps passé avant de bâtir des projets à long terme
          dessus.
        </p>
        <h2>Le piège fiscal que personne n&apos;affiche</h2>
        <p>
          Un visa est une autorisation de rester ; ce n&apos;est pas la promesse de ne
          pas être imposé. Franchissez le seuil de résidence local — souvent autour de
          183 jours — et votre revenu mondial peut y devenir imposable. Certains
          dispositifs nomades prévoient une exonération, beaucoup non. Vérifiez le
          traitement fiscal auprès d&apos;un professionnel dans la destination avant de
          vous engager.
        </p>
        <p>
          Pour voir quels endroits conviennent au travail à distance, commencez par nos{" "}
          <Link href={`/${l}/best/nomad`}>meilleures villes pour nomades numériques</Link>,
          puis vérifiez les lignes fiscales et de coût sur les{" "}
          <Link href={`/${l}/countries`}>pages pays</Link> concernées.
        </p>
      </>
    ),
  },
  "health-insurance-for-expats": {
    title: "L'assurance santé quand on s'expatrie : public, privé ou les deux",
    excerpt:
      "Le système qui vous couvre chez vous vous suit rarement au-delà d'une frontière. Un regard pratique sur les régimes publics, la couverture privée et pourquoi les nomades ont besoin de quelque chose en plus.",
    Body: ({ l }) => (
      <>
        <p>
          La couverture santé est le poste que les gens budgétisent en dernier et
          regrettent en premier. Dès que vous partez, le système de votre pays
          d&apos;origine cesse généralement de payer, et ce qui le remplace dépend
          entièrement de la façon dont vous arrivez et du temps que vous restez.
        </p>
        <h2>Les systèmes publics : bons, mais pas automatiques</h2>
        <p>
          Beaucoup de pays disposent d&apos;une excellente santé publique — mais
          l&apos;accès est lié à la résidence et, en général, aux cotisations.
          Installez-vous dans un endroit comme{" "}
          <Link href={`/${l}/cost-of-living/berlin-de`}>Berlin</Link> avec un visa de
          travail et vous rejoindrez généralement le système obligatoire via des
          cotisations sur salaire. Arrivez en nomade ou en jeune retraité sans emploi
          local et vous pourriez en être exclu pendant des mois, voire entièrement,
          jusqu&apos;à ce que vous y ayez droit.
        </p>
        <h2>La couverture privée comble le vide</h2>
        <p>
          L&apos;assurance santé privée achète rapidité et choix — et, pour les
          nouveaux arrivants, elle <em>est</em> souvent la seule option jusqu&apos;à
          l&apos;obtention de la résidence. Dans certains pays, une preuve de
          couverture privée est une condition du visa. Elle compte aussi là où le
          niveau public est limité : dans une ville comme{" "}
          <Link href={`/${l}/cost-of-living/bangkok-th`}>Bangkok</Link>, la plupart
          des expatriés s&apos;appuient sur les hôpitaux et les assurances privés
          plutôt que sur le système public.
        </p>
        <h2>Pourquoi les nomades ont besoin d&apos;une couverture internationale</h2>
        <p>
          Une police locale s&apos;arrête à la frontière. Si vous déménagez tous les
          quelques mois, un{" "}
          <strong>plan santé mondial ou international</strong> qui vous suit d&apos;un
          pays à l&apos;autre — et couvre un retour au pays — a généralement plus de
          sens que d&apos;empiler des polices locales. L&apos;assurance voyage n&apos;est
          pas la même chose ; elle est faite pour les courts séjours et les urgences,
          pas pour des soins continus.
        </p>
        <h2>Ce qu&apos;il faut vérifier avant d&apos;acheter</h2>
        <ul>
          <li>
            <strong>Portée géographique</strong> — votre pays d&apos;origine est-il
            inclus ? Beaucoup de plans moins chers l&apos;excluent, ou excluent les
            États-Unis.
          </li>
          <li>
            <strong>Conditions préexistantes</strong> — la raison la plus fréquente de
            refus d&apos;une demande d&apos;indemnisation. Déclarez tout.
          </li>
          <li>
            <strong>Hospitalisation vs soins ambulatoires</strong> — les plans bon
            marché ne couvrent souvent que les séjours à l&apos;hôpital, pas les
            consultations courantes.
          </li>
          <li>
            <strong>Renouvellement et limites d&apos;âge</strong> — pouvez-vous
            conserver la police en vieillissant, et la prime fait-elle un bond ?
          </li>
        </ul>
        <p>
          Rien de tout cela n&apos;est un conseil médical ou d&apos;assurance — la
          couverture et l&apos;éligibilité varient selon la nationalité et le visa,
          alors confirmez les détails avec un courtier agréé avant de vous fier à un
          plan.
        </p>
      </>
    ),
  },
  "budgeting-a-move-abroad-with-family": {
    title: "Budgéter une expatriation en famille : les coûts qui s'accumulent",
    excerpt:
      "Déménager seul, c'est une valise et une caution. Déménager en famille multiplie les coûts ponctuels et ajoute écoles, logement plus grand et une marge bien plus importante.",
    Body: ({ l }) => (
      <>
        <p>
          Une personne seule peut s&apos;expatrier avec trois fois rien et improviser
          le reste. Une famille, non. Les coûts ne se contentent pas d&apos;augmenter
          avec le nombre de têtes — de toutes nouvelles catégories apparaissent, et la
          marge nécessaire grandit plus vite que vous ne l&apos;imagineriez.
        </p>
        <h2>Les coûts ponctuels, multipliés</h2>
        <p>
          Vols, expédition, cautions et frais de visa se comptent tous par personne.
          Ajoutez les frais d&apos;inscription scolaire, le mobilier neuf pour un plus
          grand logement, et le coût du remplacement de tout ce que vous n&apos;avez pas
          pu emporter. Il est courant qu&apos;un déménagement familial coûte plusieurs
          fois le prix d&apos;un déménagement en solo avant même que le premier mois de
          loyer ne soit dû.
        </p>
        <h2>Les écoles sont le facteur décisif</h2>
        <p>
          L&apos;éducation peut discrètement devenir votre plus gros poste. Les écoles
          publiques peuvent être gratuites mais enseignées dans la langue locale ; les
          écoles internationales résolvent ce problème mais peuvent coûter autant qu&apos;un
          loyer — par enfant. Vos options se résument généralement à :
        </p>
        <ul>
          <li>
            <strong>Public local</strong> — le moins cher, le meilleur pour
            l&apos;intégration, le plus difficile au début en cas de barrière de la
            langue.
          </li>
          <li>
            <strong>Bilingue ou privé local</strong> — une voie intermédiaire, au prix
            et à la disponibilité variables.
          </li>
          <li>
            <strong>International</strong> — programme familier et enseignement en
            anglais, mais prévoyez des milliers par enfant et par an.
          </li>
        </ul>
        <h2>Un logement plus grand change toute l&apos;équation</h2>
        <p>
          Une famille a besoin de chambres, et le passage d&apos;un deux-pièces à un
          quatre-pièces est rarement linéaire — les appartements familiaux dans les bons
          secteurs scolaires se paient à prix fort. Quand vous comparez des villes,
          chiffrez le logement que vous loueriez vraiment, pas la moyenne. Un moyen
          rapide de vérifier les chiffres, ce sont nos{" "}
          <Link href={`/${l}/calculators`}>calculateurs</Link>, et si vous hésitez entre
          acheter et louer, le{" "}
          <Link href={`/${l}/calculators/mortgage-calculator`}>
            calculateur de prêt immobilier
          </Link>{" "}
          transforme un prix en mensualité.
        </p>
        <h2>Constituez une marge plus grande que vous ne le pensez</h2>
        <p>
          Avec des personnes à charge, &quot;on verra bien en chemin&quot; n&apos;est
          pas un plan. Visez six mois de coût de la vie de la destination épargnés avant
          de partir, et testez cette marge face à un début d&apos;emploi retardé ou à une
          fluctuation de change. Étirer cette marge est plus facile dans une ville
          réellement abordable — notre{" "}
          <Link href={`/${l}/best/cheapest`}>liste des villes les moins chères</Link> est
          un bon endroit pour en trouver une qui respecte encore les exigences non
          négociables de votre famille.
        </p>
      </>
    ),
  },
  "renting-an-apartment-abroad": {
    title: "Louer un appartement à l'étranger : cautions, contrats et éviter les arnaques",
    excerpt:
      "Le marché locatif est là où les nouveaux arrivants perdent le plus d'argent et de sommeil. À quoi s'attendre côté cautions, agents et contrats — et comment repérer une arnaque tôt.",
    Body: ({ l }) => (
      <>
        <p>
          Trouver un logement est le premier vrai test d&apos;une nouvelle ville, et
          c&apos;est là que les arnaqueurs font leur meilleur travail — parce que vous
          êtes pressé, peu familier des usages locaux et souvent en recherche avant même
          d&apos;arriver. Un peu de méthode protège votre argent et vos nerfs.
        </p>
        <h2>Cautions et argent à avancer</h2>
        <p>
          Attendez-vous à devoir avancer beaucoup d&apos;un coup : généralement une à
          trois mensualités de caution plus le premier mois de loyer, et parfois des
          frais d&apos;agence en plus. Sur des marchés tendus comme{" "}
          <Link href={`/${l}/cost-of-living/amsterdam-nl`}>Amsterdam</Link>, les
          propriétaires peuvent demander encore plus aux locataires sans historique
          local. Sachez comment les cautions sont protégées localement, et obtenez
          toujours un reçu signé indiquant le montant et les conditions de restitution.
        </p>
        <h2>Lisez le contrat avant de signer quoi que ce soit</h2>
        <p>
          Le droit locatif varie énormément. Vérifiez le préavis, qui paie les
          réparations et les charges, si les hausses de loyer sont plafonnées, et ce qui
          compte comme &quot;usure normale&quot; à votre départ. Si le contrat est
          uniquement dans la langue locale, faites-le traduire — signer un document que
          vous ne pouvez pas lire, c&apos;est ainsi que naissent les litiges.
        </p>
        <h2>Les frais d&apos;agence et leur fonctionnement</h2>
        <p>
          Dans certains pays, le propriétaire paie l&apos;agent ; dans d&apos;autres,
          c&apos;est le locataire, parfois un mois entier de loyer. Ni l&apos;un ni
          l&apos;autre n&apos;est une arnaque en soi — le piège, c&apos;est de ne pas
          savoir ce qui s&apos;applique avant la visite. Demandez d&apos;emblée qui paie
          les frais et ce qu&apos;ils couvrent exactement.
        </p>
        <h2>Repérer une arnaque locative</h2>
        <ul>
          <li>
            <strong>Le prix est trop beau</strong> — un appartement central bien en
            dessous du prix du marché dans une ville comme{" "}
            <Link href={`/${l}/cost-of-living/london-uk`}>Londres</Link> est un appât, pas
            de la chance.
          </li>
          <li>
            <strong>Vous ne pouvez pas le visiter</strong> — le &quot;propriétaire&quot;
            est à l&apos;étranger et a besoin d&apos;une caution pour le réserver. Ne payez
            jamais pour un logement que vous n&apos;avez pas vu, en personne ou via un
            contact de confiance.
          </li>
          <li>
            <strong>Pression et virements bancaires</strong> — l&apos;urgence associée à
            un moyen de paiement irréversible est la combinaison classique. Ralentissez.
          </li>
          <li>
            <strong>Aucun contrat écrit</strong> — s&apos;ils rechignent à mettre les
            conditions par écrit, passez votre chemin.
          </li>
        </ul>
        <p>
          Dès que possible, sécurisez d&apos;abord un logement de courte durée et ne
          signez un bail long qu&apos;après avoir visité le logement et rencontré le
          propriétaire. Les quinze jours supplémentaires en location coûtent moins cher
          qu&apos;une caution que vous ne récupérez jamais.
        </p>
      </>
    ),
  },
  "tax-breaks-for-new-residents": {
    title: "Avantages fiscaux pour nouveaux résidents : comment fonctionnent vraiment les régimes spéciaux",
    excerpt:
      "Plusieurs pays attirent les migrants qualifiés avec des dispositifs à fiscalité réduite. Ils peuvent transformer le calcul — mais s'accompagnent de conditions, d'échéances et d'une durée de vie limitée.",
    Body: ({ l }) => (
      <>
        <p>
          Pour attirer les talents et les revenus à distance, un certain nombre de pays
          offrent aux nouveaux arrivants une réduction d&apos;impôt temporaire — parfois
          spectaculaire. Ces régimes spéciaux peuvent faire basculer une décision
          d&apos;expatriation, mais ils sont aussi largement mal compris, et les règles
          changent souvent.
        </p>
        <h2>Ce que font réellement ces régimes</h2>
        <p>
          La plupart fonctionnent en exonérant ou en réduisant une partie de votre revenu
          pendant un nombre d&apos;années fixe. Le Portugal a mené un dispositif bien connu
          pour les nouveaux résidents ; l&apos;Italie a proposé d&apos;importantes
          exonérations de revenu aux personnes qui y transfèrent leur résidence fiscale ;
          d&apos;autres accordent des taux forfaitaires ou des exclusions sur les revenus
          étrangers. Le fil conducteur : une fenêtre limitée de traitement favorable pour
          vous faire franchir la porte.
        </p>
        <h2>Les conditions sont strictes</h2>
        <p>
          Une réduction à laquelle vous n&apos;êtes pas éligible ne vaut rien, alors lisez
          d&apos;abord les règles d&apos;éligibilité. Contreparties typiques :
        </p>
        <ul>
          <li>
            <strong>Vous devez être réellement nouveau</strong> — généralement pas
            résident fiscal sur place au cours des 5 à 10 années précédentes.
          </li>
          <li>
            <strong>La profession ou le type de revenu compte</strong> — certains
            dispositifs ne couvrent que certains emplois qualifiés, les pensions ou les
            revenus de source étrangère.
          </li>
          <li>
            <strong>Vous devez vous enregistrer à temps</strong> — manquez la fenêtre de
            candidature après votre installation et vous risquez de perdre entièrement
            l&apos;avantage.
          </li>
          <li>
            <strong>Cela expire</strong> — ces régimes sont temporaires, souvent 5 à 10
            ans, après quoi les taux normaux s&apos;appliquent.
          </li>
        </ul>
        <h2>Les réserves que personne ne met dans la brochure</h2>
        <p>
          Les gouvernements modifient ou suppriment ces dispositifs avec peu de préavis,
          et un régime généreux aujourd&apos;hui peut avoir disparu avant votre arrivée.
          Il peut aussi y avoir un revers chez vous : votre pays précédent peut continuer
          à vous imposer, ou une taxe de sortie peut s&apos;appliquer à votre départ. Et un
          taux affiché faible n&apos;aide en rien si le coût de la vie engloutit
          l&apos;économie réalisée.
        </p>
        <h2>Comment les intégrer à une décision</h2>
        <p>
          Voyez un régime spécial comme un bonus, pas comme l&apos;argument central d&apos;un
          déménagement. Comparez d&apos;abord les fondamentaux — mettez deux pays côte à
          côte, par exemple{" "}
          <Link href={`/${l}/compare-countries/portugal-vs-germany`}>
            le Portugal contre l&apos;Allemagne
          </Link>{" "}
          — et parcourez les principales lignes fiscales sur nos{" "}
          <Link href={`/${l}/countries`}>pages pays</Link>. Ensuite, comme ces règles sont
          techniques et changent fréquemment, confirmez les conditions en vigueur avec un
          fiscaliste dans la destination. Rien ici n&apos;est un conseil fiscal.
        </p>
      </>
    ),
  },
};

export default fr;
