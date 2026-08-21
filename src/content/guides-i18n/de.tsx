import Link from "next/link";
import type { GuideContent } from "@/content/guides";

const de: Record<string, GuideContent> = {
  "cost-of-living-index-explained": {
    title: "Was ein Lebenshaltungskosten-Index von 100 wirklich bedeutet",
    excerpt:
      "Jede Vergleichsseite wirft mit einer „Index“-Zahl um sich. Hier erfahren Sie, was sie tatsächlich misst, warum der US-Durchschnitt als Basis dient und wie Sie sie lesen, ohne sich täuschen zu lassen.",
    Body: ({ l }) => (
      <>
        <p>
          Wenn Sie schon einmal eine Umzugsseite durchstöbert haben, kennen Sie
          das: Eine Stadt wird mit einer einzigen Zahl beschrieben — einem Index
          von 62, 154 oder 100. Das wirkt präzise, doch die meisten Menschen
          haben keine Ahnung, was da eigentlich gezählt wird. Hier die ehrliche
          Version.
        </p>
        <h2>Die Basis ist eine Wahl, kein Naturgesetz</h2>
        <p>
          Ein Lebenshaltungskosten-Index braucht einen Bezugspunkt. Bei CostTrek,
          und bei den meisten englischsprachigen Tools, ist dieser Bezugspunkt{" "}
          <strong>die durchschnittliche US-Stadt, festgelegt auf 100</strong>.
          Eine Stadt bei 60 ist also rund 40 % günstiger als eine typische
          amerikanische Stadt; eine Stadt bei 150 ist etwa 50 % teurer. Die Basis
          könnte genauso gut London oder der weltweite Durchschnitt sein — die
          Zahlen würden sich verschieben, aber die <em>Rangfolge</em> zwischen
          den Städten bliebe gleich.
        </p>
        <h2>Was in die Zahl einfließt</h2>
        <p>
          Ein guter Index kombiniert mehrere Ausgabenkörbe, nicht nur die Miete:
          Wohnen, Lebensmittel, Verkehr, Nebenkosten, Gesundheit sowie Waren und
          Dienstleistungen des täglichen Bedarfs. Wohnen fällt meist am stärksten
          ins Gewicht, weil es der größte und variabelste Kostenpunkt ist. Deshalb
          kann eine Stadt insgesamt &quot;günstig&quot; wirken, während eine
          bestimmte Kategorie — etwa Verkehr oder Gesundheit — tatsächlich teuer
          ist.
        </p>
        <h2>Lesen Sie die Aufschlüsselung, nicht nur die Schlagzeile</h2>
        <p>
          Der einzelne Index ist ein Ausgangspunkt, niemals die Antwort. Zwei
          Städte mit derselben Gesamtzahl können sich völlig unterschiedlich
          anfühlen: die eine mit günstiger Miete und teurem Essen, die andere
          umgekehrt. Öffnen Sie stets die Kategorie-Aufschlüsselung und wägen Sie
          sie gegen Ihr eigenes <em>Ausgabeverhalten</em> ab. Ein autoabhängiger
          Vorort und ein gut angebundenes Stadtzentrum belasten Ihr Budget an
          ganz unterschiedlichen Stellen.
        </p>
        <h2>Indizes sind Schätzungen — behandeln Sie sie so</h2>
        <p>
          Preise ändern sich ständig, Währungen schwanken, und kein Datensatz ist
          für jede Stadt perfekt aktuell. Nutzen Sie den Index, um eine engere
          Auswahl zu treffen und zu vergleichen, und prüfen Sie dann die zwei oder
          drei Kosten, die Ihnen am wichtigsten sind — meist Miete und Steuern —
          anhand einer lokalen, aktuellen Quelle, bevor Sie sich festlegen.
        </p>
        <p>
          Bereit, es in Aktion zu sehen?{" "}
          <Link href={`/${l}`}>Vergleichen Sie zwei beliebige Städte</Link> oder
          durchstöbern Sie die{" "}
          <Link href={`/${l}/best/cheapest`}>günstigsten Städte in unserem Index</Link>.
        </p>
      </>
    ),
  },
  "how-to-compare-cities-before-moving": {
    title: "So vergleichen Sie zwei Städte vor dem Umzug (eine praktische Checkliste)",
    excerpt:
      "Die Miete ist die Schlagzeile, aber selten das, was einen Umzug gelingen oder scheitern lässt. Eine Schritt-für-Schritt-Methode, zwei Städte über den Preis hinaus zu vergleichen.",
    Body: ({ l }) => (
      <>
        <p>
          Die Wahl zwischen zwei Städten beginnt meist mit der Miete und endet in
          Reue, denn die Miete ist nur eine Zeile eines viel längeren Budgets.
          Hier ist eine Reihenfolge, die die Dinge erfasst, die man leicht
          vergisst.
        </p>
        <h2>1. Beginnen Sie mit dem Nettolohn, nicht dem Bruttogehalt</h2>
        <p>
          Ein höheres Gehalt in einem Hochsteuerland kann Ihnen weniger übrig
          lassen als ein bescheidenes Gehalt an einem steuergünstigen Ort.
          Vergleichen Sie den <strong>Spitzensteuersatz</strong> und die
          Sozialabgaben beider Länder und denken Sie dann in Kategorien dessen,
          was tatsächlich auf Ihrem Konto landet. Unsere{" "}
          <Link href={`/${l}/countries`}>Länderseiten</Link> stellen die
          wichtigsten Steuerkennzahlen nebeneinander.
        </p>
        <h2>2. Orientieren Sie sich an echter Miete, im Viertel Ihrer Wahl</h2>
        <p>
          Die städtische Durchschnittsmiete verbirgt riesige Unterschiede.
          Schauen Sie sich eine Einzimmerwohnung im <em>Zentrum</em> gegenüber{" "}
          <em>außerhalb</em> des Zentrums an und seien Sie ehrlich, wo Sie
          tatsächlich wohnen würden. Ein 20 Minuten längerer Arbeitsweg kann die
          Miete um ein Drittel senken.
        </p>
        <h2>3. Rechnen Sie Ihren Lebensstil um, nicht nur Ihre Miete</h2>
        <p>
          Addieren Sie die Kosten, die Ihren Alltag abbilden: Essengehen,
          Nahverkehrsticket, Fitnessstudio, Nebenkosten, Internet. Wer zu Hause
          kocht und Rad fährt, erlebt eine Stadt völlig anders als jemand, der
          auswärts isst und Auto fährt. Nutzen Sie das Gehaltsäquivalenz-Tool auf
          jeder{" "}
          <Link href={`/${l}`}>Vergleichsseite</Link>, um Ihr aktuelles Einkommen
          in das umzurechnen, was Sie bräuchten, um anderswo genauso zu leben.
        </p>
        <h2>4. Wägen Sie die nicht-monetären Faktoren ab</h2>
        <p>
          Sicherheit, Gesundheitsversorgung, Luftqualität, Klima,
          Internetgeschwindigkeit, Sprache und Visumszugang tauchen in einer
          Mietzahl nicht auf, prägen aber den Alltag — und manche sind K.-o.-
          Kriterien. Eine Stadt, die 30 % günstiger ist, aber ein Visum
          erfordert, das Sie nicht bekommen können, ist in Wahrheit keine Option.
        </p>
        <h2>5. Gegencheck mit Einheimischen</h2>
        <p>
          Daten grenzen das Feld ein; Menschen bestätigen es. Sobald Sie eine
          engere Auswahl von zwei oder drei haben, suchen Sie ein Forum oder eine
          Bekanntschaft vor Ort und stellen Sie die unbequemen Fragen — Kautionen,
          versteckte Gebühren, wie schwer es wirklich ist, eine Wohnung zu finden.
        </p>
        <p>
          Ein guter Anfang:{" "}
          <Link href={`/${l}/cost-of-living/lisbon-pt`}>Lissabon</Link>,{" "}
          <Link href={`/${l}/cost-of-living/berlin-de`}>Berlin</Link> oder{" "}
          <Link href={`/${l}/cost-of-living/bangkok-th`}>Bangkok</Link> — und
          stellen Sie dann Ihren Favoriten Ihrer Heimatstadt gegenüber.
        </p>
      </>
    ),
  },
  "salary-you-need-to-move-abroad": {
    title: "Wie viel Gehalt brauchen Sie wirklich, um ins Ausland zu ziehen?",
    excerpt:
      "Die ehrliche Antwort lautet „es kommt darauf an, wohin“ — aber es gibt einen einfachen Weg, Ihr aktuelles Einkommen in ein Zielgehalt für jeden Ort der Welt umzurechnen.",
    Body: ({ l }) => (
      <>
        <p>
          &quot;Wie viel muss ich dort verdienen?&quot; ist die Frage hinter
          jedem Umzug. Die gute Nachricht: Sie können sie mit einer einzigen
          Rechnung beantworten, ausgehend von einem Gehalt, das Sie bereits
          verstehen — Ihrem aktuellen.
        </p>
        <h2>Die Äquivalenzmethode</h2>
        <p>
          Um denselben Lebensstandard zu halten, multiplizieren Sie Ihr aktuelles
          Gehalt mit dem Verhältnis der beiden Kostenindizes. Hat Ihre Stadt einen
          Index von 100 und die neue Stadt 70, brauchen Sie rund{" "}
          <strong>70 % Ihres aktuellen Gehalts</strong>, um genauso zu leben. Liegt
          die neue Stadt bei 150, brauchen Sie etwa 50 % mehr. Jede{" "}
          <Link href={`/${l}`}>Vergleichsseite</Link> macht das für Sie — geben Sie
          Ihr Gehalt ein und lesen Sie das Äquivalent ab.
        </p>
        <h2>Dann passen Sie es an die Steuern an</h2>
        <p>
          Die Äquivalenz funktioniert über die <em>Ausgaben</em>, aber Sie werden{" "}
          <em>brutto</em> bezahlt. Ein Land mit einem Spitzensatz von 45 % und
          hohen Sozialabgaben braucht eine größere Bruttozahl, um dasselbe Netto
          zu erreichen, als ein Land mit pauschalen 10 %. Prüfen Sie die
          Steuerkennzahlen beider Städte, bevor Sie die Zahl in ein Jobangebot
          übersetzen.
        </p>
        <h2>Vergessen Sie die einmaligen Kosten nicht</h2>
        <p>
          Ein Umzug ist nicht nur das monatliche Budget. Kalkulieren Sie Flüge,
          eine Kaution (oft 1–3 Monatsmieten), Visumsgebühren, Transport oder
          Neuanschaffung von Möbeln sowie einen Puffer für die Wochen, bevor Ihr
          Einkommen einsetzt. Eine Faustregel: Haben Sie drei bis sechs Monate der
          Ausgaben der neuen Stadt angespart, bevor Sie aufbrechen.
        </p>
        <h2>Wo Ihr Geld am weitesten reicht</h2>
        <p>
          Wenn maximale Kaufkraft das Ziel ist, schauen Sie sich Städte an, in
          denen derselbe Euro einfach mehr kauft — viele davon liegen in
          Südostasien, Lateinamerika und Mitteleuropa. Unsere{" "}
          <Link href={`/${l}/best/cheapest`}>Liste der günstigsten Städte</Link> und{" "}
          <Link href={`/${l}/best/nomad`}>die besten Städte für digitale Nomaden</Link>{" "}
          sind ein schneller Weg, sie zu entdecken.
        </p>
      </>
    ),
  },
  "cheapest-places-to-live-and-the-catch": {
    title: "Die günstigsten Orte zum Leben weltweit — und der Haken",
    excerpt:
      "Spottbillige Miete gibt es wirklich, aber „günstig“ kommt immer mit Kompromissen. Worauf Sie über den Preis hinaus achten sollten, wenn niedrige Lebenshaltungskosten locken.",
    Body: ({ l }) => (
      <>
        <p>
          Es ist tatsächlich möglich, für einen Bruchteil eines westlichen Budgets
          gut zu leben. Doch die günstigsten Städte in jedem Index teilen ein paar
          Muster, die man verstehen sollte, bevor man ein One-Way-Ticket kauft.
        </p>
        <h2>Warum sie günstig sind</h2>
        <p>
          Niedrige Lebenshaltungskosten spiegeln meist niedrigere lokale Löhne und
          eine schwächere Währung wider, kein Geschenk. Das ist großartig, wenn
          Ihr Einkommen aus dem Ausland kommt — ein Remote-Job oder Ersparnisse —
          und deutlich weniger großartig, wenn Sie vor Ort verdienen wollen. Die
          Arbitrage funktioniert nur in eine Richtung.
        </p>
        <h2>Die Kompromisse, die zu prüfen sind</h2>
        <ul>
          <li>
            <strong>Gesundheitsversorgung</strong> — öffentliche Systeme können
            dünn sein; kalkulieren Sie eine private Versicherung ein.
          </li>
          <li>
            <strong>Luftqualität &amp; Infrastruktur</strong> — manche
            günstigen Megastädte haben erhebliche Umweltverschmutzung oder
            unzuverlässige Versorgung.
          </li>
          <li>
            <strong>Visa</strong> — eine günstige Stadt, in der Sie nur 30 Tage
            bleiben dürfen, ist kein Zuhause. Prüfen Sie Optionen für
            Aufenthalt und digitale Nomaden.
          </li>
          <li>
            <strong>Bankwesen &amp; Logistik</strong> — Geld transferieren, eine
            SIM-Karte bekommen, einen Mietvertrag unterschreiben kann schwieriger
            sein als zu Hause.
          </li>
        </ul>
        <h2>Wie man eine „Günstigste“-Liste richtig nutzt</h2>
        <p>
          Behandeln Sie sie als Generator für eine engere Auswahl, nicht als
          Urteil. Nehmen Sie die obersten paar aus unserem{" "}
          <Link href={`/${l}/best/cheapest`}>Ranking der günstigsten Städte</Link>,
          öffnen Sie dann die Seite jeder Stadt und lesen Sie die Abschnitte zur
          Lebensqualität und zu Visa. Ein Ort wie{" "}
          <Link href={`/${l}/cost-of-living/bishkek-kg`}>Bischkek</Link> ist
          erstaunlich erschwinglich mit einer pauschalen Steuer von 10 % — aber
          Sie werden Winter, Gesundheitsversorgung und Konnektivität gegen die
          Ersparnisse abwägen wollen.
        </p>
        <p>
          Die richtige Antwort ist die günstigste Stadt, die dennoch <em>Ihre</em>{" "}
          nicht verhandelbaren Ansprüche erfüllt — nicht die niedrigste Zahl auf
          der Liste.
        </p>
      </>
    ),
  },
  "taxes-when-you-relocate": {
    title: "Steuern beim Umzug: Einkommensteuer, Mehrwertsteuer und was Ihnen bleibt",
    excerpt:
      "Zwei Städte können identische Mieten und völlig unterschiedliche Nettoeinkommen haben. Eine verständliche Tour durch die Steuern, die entscheiden, wie viel Ihnen tatsächlich bleibt.",
    Body: ({ l }) => (
      <>
        <p>
          Die Lebenshaltungskosten sagen Ihnen, was die Dinge kosten; die Steuern
          sagen Ihnen, wie viel Sie überhaupt zum Ausgeben haben. Ignorieren Sie
          sie, und eine &quot;günstigere&quot; Stadt kann Sie klammheimlich ärmer
          machen.
        </p>
        <h2>Einkommensteuer: Der Spitzensatz ist nur die halbe Geschichte</h2>
        <p>
          Länder werben mit einem Spitzengrenzsteuersatz — 10 % in Kirgisistan,
          45 % in Deutschland, 0 % in den VAE. Doch die meisten Systeme sind
          progressiv, Sie zahlen den Spitzensatz also nur auf Einkommen über einer
          Schwelle, und viele fügen obendrauf{" "}
          <strong>Sozialversicherungsbeiträge</strong> hinzu, die es mit der
          eigentlichen Steuer aufnehmen können. Vergleichen Sie sowohl die
          Einkommensteuer- als auch die Sozialabgabenzeile auf unseren{" "}
          <Link href={`/${l}/countries`}>Länderseiten</Link>.
        </p>
        <h2>Mehrwertsteuer / Umsatzsteuer: die unsichtbaren 5–25 %</h2>
        <p>
          Verbrauchssteuern sind in die Preise eingebacken, deshalb vergisst man
          sie leicht — doch sie reichen von etwa 5 % bis über 25 %. Ein Land mit
          niedriger Einkommensteuer, aber über 20 % Mehrwertsteuer holt sich einen
          Teil davon an der Kasse zurück. Das ist am wichtigsten für Menschen, die
          einen großen Teil ihres Einkommens vor Ort ausgeben.
        </p>
        <h2>Steuerpflicht und die 183-Tage-Regel</h2>
        <p>
          Die meisten Länder behandeln Sie als steuerlich ansässig, sobald Sie
          rund <strong>183 Tage</strong> im Jahr dort verbringen — ab dann kann Ihr
          weltweites Einkommen vor Ort steuerpflichtig werden. Wenn Sie Ihre Zeit
          auf mehrere Länder aufteilen, ist dies die wichtigste einzelne Zahl, die
          Sie verstehen müssen, und die, für die sich professionelle Beratung am
          meisten lohnt.
        </p>
        <h2>Sonderregelungen für Neuankömmlinge</h2>
        <p>
          Mehrere Länder umwerben qualifizierte Zuwanderer und Remote-Arbeitende
          mit steuerermäßigten Programmen — Portugal, Italien und andere haben
          Varianten davon betrieben. Sie können die Rechnung drastisch verändern,
          haben aber Bedingungen und Ablaufdaten. Überprüfen Sie die aktuellen
          Regeln, bevor Sie sich darauf verlassen.
        </p>
        <h2>Das Fazit</h2>
        <p>
          Bevor Sie Mieten vergleichen, vergleichen Sie das <em>Netto</em>. Stellen
          Sie zwei Länder gegenüber — zum Beispiel{" "}
          <Link href={`/${l}/compare-countries/portugal-vs-germany`}>
            Portugal vs. Deutschland
          </Link>{" "}
          — und betrachten Sie Einkommensteuer, Mehrwertsteuer und
          durchschnittliches Nettogehalt zusammen. Und sprechen Sie für alles
          Verbindliche mit einem Steuerfachmann im Zielland; nichts hiervon ist
          Steuerberatung.
        </p>
      </>
    ),
  },
  "digital-nomad-visas-explained": {
    title: "Visa für digitale Nomaden erklärt: wer sich qualifiziert und wie sie funktionieren",
    excerpt:
      "Eine Welle von Ländern stellt inzwischen Visa aus, die für Remote-Arbeitende gemacht sind. Hier erfahren Sie, wie sie sich von einem Touristenstempel unterscheiden, welches Einkommen sie erwarten und wo ihre Grenzen liegen.",
    Body: ({ l }) => (
      <>
        <p>
          Vor einem Jahrzehnt bedeutete Remote-Arbeit aus dem Ausland, von
          Touristenstempeln zu leben und zu hoffen, dass niemand Fragen stellt.
          Heute stellen Dutzende Länder ein eigens dafür geschaffenes{" "}
          <strong>Visum für digitale Nomaden</strong> aus. Sie sind ein echter
          Fortschritt — aber enger gefasst, als das Marketing suggeriert.
        </p>
        <h2>Wie sie sich von einem Touristenvisum unterscheiden</h2>
        <p>
          Ein Touristenvisum erlaubt Ihnen den Besuch; es erlaubt Ihnen nicht zu
          arbeiten, selbst für einen ausländischen Arbeitgeber, und beschränkt Sie
          meist auf 30–90 Tage. Ein Nomadenvisum erlaubt ausdrücklich Remote-
          Arbeit für Kunden oder einen Arbeitgeber <em>außerhalb</em> des Landes
          und läuft in der Regel ein oder zwei Jahre mit der Option auf
          Verlängerung. Der Kompromiss ist Papierkram: Einkommensnachweis,
          Versicherung, ein einwandfreies Führungszeugnis und manchmal eine
          Antragsgebühr im dreistelligen Bereich.
        </p>
        <h2>Die Einkommensanforderung ist der eigentliche Torwächter</h2>
        <p>
          Fast jedes Programm legt ein monatliches Mindesteinkommen fest, und das
          ist die Bedingung, an der die meisten scheitern. Grobe Spannen, die
          Ihnen begegnen werden:
        </p>
        <ul>
          <li>
            <strong>Niedrigere Schwelle</strong> — Teile Südostasiens,
            Lateinamerikas und Mitteleuropas verlangen oft rund 1.000–2.500 EUR
            pro Monat.
          </li>
          <li>
            <strong>Höhere Schwelle</strong> — wohlhabendere und teurere Ziele
            können 3.500 EUR oder mehr fordern, für ein Paar manchmal das
            Doppelte.
          </li>
          <li>
            <strong>Nachweis</strong> — rechnen Sie damit, mehrere Monate an
            Kontoauszügen oder Verträgen vorzulegen, nicht nur eine
            Gehaltsabrechnung.
          </li>
        </ul>
        <h2>Visum, Aufenthaltstitel oder Weg zur Staatsbürgerschaft?</h2>
        <p>
          Verwechseln Sie ein Nomadenvisum nicht mit einem dauerhaften Aufenthalt.
          Die meisten sind befristet und zählen <em>nicht</em> zur
          Staatsbürgerschaft, wobei sich einige in längere Aufenthaltstitel
          umwandeln, wenn Sie bleiben und Steuern zahlen. Lesen Sie das
          Kleingedruckte zu Verlängerungen und dazu, ob verbrachte Zeit zählt,
          bevor Sie langfristige Pläne darauf aufbauen.
        </p>
        <h2>Der Steuerhaken, den niemand bewirbt</h2>
        <p>
          Ein Visum ist die Erlaubnis zu bleiben; es ist kein Versprechen, dass Sie
          nicht besteuert werden. Überschreiten Sie die lokale
          Ansässigkeitsschwelle — oft um die 183 Tage — und Ihr weltweites
          Einkommen kann dort steuerpflichtig werden. Manche Nomadenprogramme
          sehen eine Ausnahme vor, viele nicht. Klären Sie die steuerliche
          Behandlung mit einem Fachmann am Zielort, bevor Sie sich festlegen.
        </p>
        <p>
          Um zu sehen, welche Orte sich für Remote-Arbeit eignen, beginnen Sie mit
          unseren{" "}
          <Link href={`/${l}/best/nomad`}>besten Städten für digitale Nomaden</Link>{" "}
          und prüfen Sie dann die Steuer- und Kostenkennzahlen auf den passenden{" "}
          <Link href={`/${l}/countries`}>Länderseiten</Link>.
        </p>
      </>
    ),
  },
  "health-insurance-for-expats": {
    title: "Krankenversicherung beim Umzug ins Ausland: gesetzlich, privat oder beides",
    excerpt:
      "Das System, das Sie zu Hause absichert, folgt Ihnen selten über eine Grenze. Ein praktischer Blick auf gesetzliche Systeme, private Absicherung und warum Nomaden etwas Zusätzliches brauchen.",
    Body: ({ l }) => (
      <>
        <p>
          Die Krankenversicherung ist der Posten, den man zuletzt einplant und
          zuerst bereut. Sobald Sie gehen, hört Ihr Heimatsystem meist auf zu
          zahlen, und was an seine Stelle tritt, hängt ganz davon ab, wie Sie
          ankommen und wie lange Sie bleiben.
        </p>
        <h2>Gesetzliche Systeme: gut, aber nicht automatisch</h2>
        <p>
          Viele Länder haben eine ausgezeichnete öffentliche
          Gesundheitsversorgung — aber der Zugang ist an den Aufenthalt und in der
          Regel an Beiträge gebunden. Ziehen Sie mit einem Arbeitsvisum an einen
          Ort wie{" "}
          <Link href={`/${l}/cost-of-living/berlin-de`}>Berlin</Link>, treten Sie
          typischerweise über Lohnbeiträge dem gesetzlichen System bei. Kommen Sie
          als Nomade oder Frührentner ohne lokalen Job, können Sie monatelang oder
          ganz ausgeschlossen sein, bis Sie sich qualifizieren.
        </p>
        <h2>Private Absicherung schließt die Lücke</h2>
        <p>
          Eine private Krankenversicherung kauft Tempo und Wahlfreiheit — und für
          Neuankömmlinge <em>ist</em> sie oft die einzige Option, bis der
          Aufenthalt geklärt ist. In manchen Ländern ist der Nachweis einer
          privaten Absicherung eine Visumsvoraussetzung. Sie zählt auch an Orten,
          an denen das öffentliche Angebot dünn ist: In einer Stadt wie{" "}
          <Link href={`/${l}/cost-of-living/bangkok-th`}>Bangkok</Link> verlassen
          sich die meisten Expats auf private Krankenhäuser und Versicherungen
          statt auf das öffentliche System.
        </p>
        <h2>Warum Nomaden internationale Absicherung brauchen</h2>
        <p>
          Eine lokale Police endet an der Grenze. Wenn Sie alle paar Monate
          umziehen, ist ein{" "}
          <strong>globaler oder internationaler Krankenversicherungsplan</strong>,
          der Ihnen zwischen den Ländern folgt — und eine Reise nach Hause abdeckt
          — meist sinnvoller, als lokale Policen aneinanderzureihen. Eine
          Reiseversicherung ist nicht dasselbe; sie ist für kurze Reisen und
          Notfälle gedacht, nicht für laufende Versorgung.
        </p>
        <h2>Was Sie vor dem Abschluss prüfen sollten</h2>
        <ul>
          <li>
            <strong>Geografischer Geltungsbereich</strong> — ist Ihr Heimatland
            eingeschlossen? Viele günstigere Pläne schließen es oder die USA aus.
          </li>
          <li>
            <strong>Vorerkrankungen</strong> — der häufigste Grund, warum ein
            Antrag abgelehnt wird. Geben Sie alles an.
          </li>
          <li>
            <strong>Stationär vs. ambulant</strong> — günstige Pläne decken oft
            nur Krankenhausaufenthalte ab, nicht Routinebesuche.
          </li>
          <li>
            <strong>Verlängerbarkeit und Altersgrenzen</strong> — können Sie die
            Police behalten, wenn Sie älter werden, und springt die Prämie?
          </li>
        </ul>
        <p>
          Nichts davon ist medizinische oder versicherungsbezogene Beratung —
          Absicherung und Anspruch variieren je nach Staatsangehörigkeit und Visum,
          klären Sie die Einzelheiten also mit einem zugelassenen Makler, bevor Sie
          sich auf einen Plan verlassen.
        </p>
      </>
    ),
  },
  "budgeting-a-move-abroad-with-family": {
    title: "Ein Umzug ins Ausland mit Familie: die Kosten, die sich summieren",
    excerpt:
      "Allein umzuziehen bedeutet einen Koffer und eine Kaution. Mit einer Familie umzuziehen vervielfacht die einmaligen Kosten und bringt Schulen, größeren Wohnraum und einen viel größeren Puffer dazu.",
    Body: ({ l }) => (
      <>
        <p>
          Eine einzelne Person kann mit kleinem Budget ins Ausland ziehen und den
          Rest improvisieren. Eine Familie kann das nicht. Die Kosten skalieren
          nicht nur mit der Personenzahl — ganz neue Kategorien tauchen auf, und
          der Puffer, den Sie brauchen, wächst schneller, als Sie erwarten würden.
        </p>
        <h2>Die einmaligen Kosten, vervielfacht</h2>
        <p>
          Flüge, Transport, Kautionen und Visumsgebühren werden alle pro Person
          gezählt. Rechnen Sie Schulanmeldung, neue Möbel für eine größere Wohnung
          und die Kosten hinzu, alles zu ersetzen, was Sie nicht mitbringen
          konnten. Es ist üblich, dass ein Familienumzug ein Mehrfaches eines
          Umzugs allein kostet, noch bevor die erste Monatsmiete überhaupt fällig
          ist.
        </p>
        <h2>Schulen sind der entscheidende Faktor</h2>
        <p>
          Bildung kann klammheimlich zu Ihrem größten Posten werden. Öffentliche
          Schulen sind vielleicht kostenlos, aber in der Landessprache; interna­
          tionale Schulen lösen das, können aber so viel kosten wie die Miete — pro
          Kind. Ihre Optionen laufen meist auf Folgendes hinaus:
        </p>
        <ul>
          <li>
            <strong>Öffentlich vor Ort</strong> — am günstigsten, am besten für
            die Integration, anfangs am schwersten, wenn es eine Sprachbarriere
            gibt.
          </li>
          <li>
            <strong>Zweisprachig oder privat vor Ort</strong> — ein Mittelweg,
            variabel in Preis und Verfügbarkeit.
          </li>
          <li>
            <strong>International</strong> — vertrauter Lehrplan und
            englischsprachiger Unterricht, aber kalkulieren Sie Tausende pro Kind
            und Jahr.
          </li>
        </ul>
        <h2>Größerer Wohnraum verändert die ganze Gleichung</h2>
        <p>
          Eine Familie braucht Schlafzimmer, und der Sprung von einer Ein- zu einer
          Dreizimmerwohnung ist selten linear — familientaugliche Wohnungen in
          guten Schulbezirken verlangen einen Aufschlag. Wenn Sie Städte
          vergleichen, kalkulieren Sie die Wohnung, die Sie tatsächlich mieten
          würden, nicht den Durchschnitt. Ein schneller Weg, die Zahlen zu prüfen,
          sind unsere{" "}
          <Link href={`/${l}/calculators`}>Rechner</Link>, und wenn Sie Kaufen
          gegen Mieten abwägen, verwandelt der{" "}
          <Link href={`/${l}/calculators/mortgage-calculator`}>
            Hypothekenrechner
          </Link>{" "}
          einen Preis in eine monatliche Zahl.
        </p>
        <h2>Bauen Sie einen größeren Puffer, als Sie denken zu brauchen</h2>
        <p>
          Mit Angehörigen ist &quot;wird sich schon ergeben&quot; kein Plan.
          Streben Sie sechs Monate der Lebenshaltungskosten des Ziels an, angespart
          vor der Abreise, und testen Sie es gegen einen verzögerten Jobstart oder
          eine Währungsschwankung. Diesen Puffer weiter zu strecken ist in einer
          wirklich erschwinglichen Stadt leichter — unsere{" "}
          <Link href={`/${l}/best/cheapest`}>Liste der günstigsten Städte</Link> ist
          ein guter Ort, um eine zu finden, die dennoch die nicht verhandelbaren
          Ansprüche Ihrer Familie erfüllt.
        </p>
      </>
    ),
  },
  "renting-an-apartment-abroad": {
    title: "Eine Wohnung im Ausland mieten: Kautionen, Verträge und Betrug vermeiden",
    excerpt:
      "Der Mietmarkt ist der Ort, an dem Neuankömmlinge das meiste Geld und den meisten Schlaf verlieren. Was Sie von Kautionen, Maklern und Verträgen erwarten können — und wie Sie einen Betrug früh erkennen.",
    Body: ({ l }) => (
      <>
        <p>
          Eine Bleibe zu finden ist die erste echte Prüfung einer neuen Stadt, und
          es ist der Ort, an dem Betrüger ihre beste Arbeit leisten — weil Sie in
          Eile sind, mit den lokalen Gepflogenheiten nicht vertraut und oft schon
          suchen, bevor Sie ankommen. Ein wenig Struktur schützt Ihr Geld und Ihre
          Nerven.
        </p>
        <h2>Kautionen und Bargeld im Voraus</h2>
        <p>
          Rechnen Sie damit, auf einmal viel vorzustrecken: typischerweise ein bis
          drei Monatskautionen plus die erste Monatsmiete, und manchmal noch eine
          Maklergebühr obendrauf. In umkämpften Märkten wie{" "}
          <Link href={`/${l}/cost-of-living/amsterdam-nl`}>Amsterdam</Link> können
          Vermieter von Mietern ohne lokale Vorgeschichte sogar noch mehr
          verlangen. Wissen Sie, wie Kautionen vor Ort geschützt sind, und lassen
          Sie sich stets eine unterschriebene Quittung geben, die den Betrag und
          die Bedingungen für die Rückzahlung nennt.
        </p>
        <h2>Lesen Sie den Vertrag, bevor Sie irgendetwas unterschreiben</h2>
        <p>
          Das Mietrecht variiert enorm. Prüfen Sie die Kündigungsfrist, wer für
          Reparaturen und Nebenkosten zahlt, ob Mieterhöhungen gedeckelt sind und
          was beim Auszug als &quot;normale Abnutzung&quot; gilt. Ist der Vertrag
          nur in der Landessprache, lassen Sie ihn übersetzen — etwas zu
          unterschreiben, das Sie nicht lesen können, ist der Beginn von
          Streitigkeiten.
        </p>
        <h2>Maklergebühren und wie sie funktionieren</h2>
        <p>
          In manchen Ländern zahlt der Vermieter den Makler; in anderen der Mieter,
          manchmal eine volle Monatsmiete. Keines von beiden ist an sich Betrug —
          die Falle ist, vor der Besichtigung nicht zu wissen, was gilt. Fragen Sie
          von Anfang an, wer die Gebühr zahlt und was genau sie abdeckt.
        </p>
        <h2>Einen Mietbetrug erkennen</h2>
        <ul>
          <li>
            <strong>Der Preis ist zu gut</strong> — eine zentrale Wohnung weit
            unter dem Marktpreis in einer Stadt wie{" "}
            <Link href={`/${l}/cost-of-living/london-uk`}>London</Link> ist ein
            Köder, kein Glück.
          </li>
          <li>
            <strong>Sie können sie nicht besichtigen</strong> — der
            &quot;Eigentümer&quot; ist im Ausland und braucht eine Kaution, um sie
            zu reservieren. Zahlen Sie niemals für eine Wohnung, die Sie nicht
            gesehen haben, weder persönlich noch über einen vertrauenswürdigen
            Kontakt.
          </li>
          <li>
            <strong>Druck und Überweisungen</strong> — Dringlichkeit plus eine
            unumkehrbare Zahlungsmethode ist die klassische Kombination. Werden Sie
            langsamer.
          </li>
          <li>
            <strong>Kein schriftlicher Vertrag</strong> — wenn man sich sträubt,
            die Bedingungen schriftlich festzuhalten, gehen Sie weg.
          </li>
        </ul>
        <p>
          Sichern Sie sich, wann immer möglich, zuerst eine kurzfristige
          Unterkunft und unterschreiben Sie einen langen Mietvertrag erst, nachdem
          Sie die Wohnung besichtigt und den Vermieter getroffen haben. Die
          zusätzlichen zwei Wochen in einer Übergangswohnung kosten weniger als
          eine Kaution, die Sie nie zurückbekommen.
        </p>
      </>
    ),
  },
  "tax-breaks-for-new-residents": {
    title: "Steuervergünstigungen für Neuansässige: wie Sonderregelungen wirklich funktionieren",
    excerpt:
      "Mehrere Länder locken qualifizierte Zuwanderer mit steuerermäßigten Programmen. Sie können die Rechnung verändern — aber sie kommen mit Bedingungen, Fristen und einer begrenzten Haltbarkeit.",
    Body: ({ l }) => (
      <>
        <p>
          Um Talent und Remote-Einkommen anzuziehen, bieten einige Länder
          Neuankömmlingen einen befristeten Steuernachlass — manchmal einen
          drastischen. Diese Sonderregelungen können eine Umzugsentscheidung
          kippen, werden aber auch weithin missverstanden, und die Regeln ändern
          sich oft.
        </p>
        <h2>Was diese Regelungen tatsächlich bewirken</h2>
        <p>
          Die meisten funktionieren, indem sie einen Teil Ihres Einkommens für eine
          feste Anzahl von Jahren befreien oder ermäßigen. Portugal betrieb ein
          bekanntes Programm für Neuansässige; Italien hat große Befreiungen auf
          Einkommen für Menschen angeboten, die ihre Steueransässigkeit dorthin
          verlegen; andere gewähren Pauschalsätze oder Ausnahmen für
          ausländisches Einkommen. Der rote Faden: ein begrenztes Zeitfenster
          günstiger Behandlung, um Sie durch die Tür zu bekommen.
        </p>
        <h2>Die Bedingungen sind streng</h2>
        <p>
          Ein Nachlass, für den Sie sich nicht qualifizieren, ist nichts wert,
          lesen Sie also zuerst die Anspruchsvoraussetzungen. Typische Haken:
        </p>
        <ul>
          <li>
            <strong>Sie müssen wirklich neu sein</strong> — meist in den
            vorangegangenen 5–10 Jahren dort nicht steuerlich ansässig.
          </li>
          <li>
            <strong>Beruf oder Einkommensart zählt</strong> — manche Programme
            decken nur bestimmte qualifizierte Berufe, Renten oder Einkommen aus
            ausländischer Quelle ab.
          </li>
          <li>
            <strong>Sie müssen sich rechtzeitig anmelden</strong> — verpassen Sie
            das Antragsfenster nach dem Umzug, kann der Vorteil ganz entfallen.
          </li>
          <li>
            <strong>Sie läuft ab</strong> — diese sind befristet, oft 5–10 Jahre,
            danach gelten die normalen Sätze.
          </li>
        </ul>
        <h2>Die Vorbehalte, die niemand in die Broschüre schreibt</h2>
        <p>
          Regierungen ändern oder schließen diese Programme mit wenig Vorlauf, und
          eine Regelung, die heute großzügig ist, kann verschwunden sein, bevor Sie
          ankommen. Es kann auch einen Nachschlag zu Hause geben: Ihr früheres Land
          besteuert Sie vielleicht weiterhin, oder beim Wegzug fällt eine
          Wegzugssteuer an. Und ein niedriger Spitzensatz hilft nichts, wenn die
          Lebenshaltungskosten die Ersparnis auffressen.
        </p>
        <h2>Wie man sie in eine Entscheidung einbezieht</h2>
        <p>
          Behandeln Sie eine Sonderregelung als Bonus, nicht als das ganze Argument
          für einen Umzug. Vergleichen Sie zuerst die grundlegenden Kennzahlen —
          stellen Sie zwei Länder nebeneinander, zum Beispiel{" "}
          <Link href={`/${l}/compare-countries/portugal-vs-germany`}>
            Portugal vs. Deutschland
          </Link>{" "}
          — und durchstöbern Sie die wichtigsten Steuerkennzahlen auf unseren{" "}
          <Link href={`/${l}/countries`}>Länderseiten</Link>. Und weil diese Regeln
          technisch sind und sich häufig ändern, bestätigen Sie die aktuellen
          Bedingungen mit einem Steuerfachmann am Zielort. Nichts hiervon ist
          Steuerberatung.
        </p>
      </>
    ),
  },
};

export default de;
