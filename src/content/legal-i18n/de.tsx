import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

const de: Record<string, (p: { l: Locale }) => React.ReactNode> = {
  about: ({ l }) => (
    <>
      <p>
        CostTrek hilft Ihnen dabei, <strong>Lebenshaltungskosten, Steuern,
        Gehälter, Lebensqualität und Visa</strong> zwischen Städten und Ländern
        auf der ganzen Welt zu vergleichen — damit Sie sehen, was ein Umzug
        wirklich bedeutet, bevor Sie ihn wagen. Alles ist in fünf Sprachen
        verfügbar.
      </p>
      <h2>Wie der Kostenindex funktioniert</h2>
      <p>
        Unsere zentrale Kennzahl ist ein Lebenshaltungskostenindex, bei dem die
        durchschnittliche US-Stadt auf <strong>100</strong> gesetzt ist. Eine
        Stadt mit dem Wert 60 ist rund 40&nbsp;% günstiger als eine typische
        US-Stadt; eine Stadt mit dem Wert 150 ist etwa 50&nbsp;% teurer. Der
        Index vereint Wohnen, Lebensmittel, Verkehr, Nebenkosten,
        Gesundheitsversorgung und Güter des täglichen Bedarfs. Geben Sie auf
        einer beliebigen Vergleichsseite Ihr Gehalt ein, um zu sehen, wie viel
        Sie andernorts bräuchten, um denselben Lebensstandard zu halten.
      </p>
      <h2>Woher unsere Daten stammen</h2>
      <ul>
        <li>
          <strong>Wirtschaftskennzahlen</strong> — BIP pro Kopf,
          Lebenserwartung und Inflation — stammen von{" "}
          <a href="https://data.worldbank.org" rel="noopener" target="_blank">
            World Bank Open Data
          </a>
          .
        </li>
        <li>
          <strong>Steuer- und Visa-Übersichten</strong> werden auf
          Überblicksebene aus nationalen Steuerbehörden und öffentlichen Quellen
          zusammengestellt.
        </li>
        <li>
          <strong>Der Gesamtkostenindex der US-Städte</strong> ist an
          tatsächliche{" "}
          <a
            href="https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area"
            rel="noopener"
            target="_blank"
          >
            BEA Regional Price Parities
          </a>{" "}
          gekoppelt (alle Posten, USA = 100, 2023).
        </li>
        <li>
          <strong>US-Metropolen-Mieten</strong> verwenden die tatsächliche
          mittlere Bruttomiete des{" "}
          <a
            href="https://data.census.gov/table?q=B25064"
            rel="noopener"
            target="_blank"
          >
            U.S. Census Bureau ACS
          </a>{" "}
          (2023).
        </li>
        <li>
          <strong>Kategorie-Aufschlüsselungen, Mietschätzungen für
          1-Zimmer-Wohnungen und Lebensqualitäts-Bewertungen</strong>{" "}
          sind zusammengestellte Schätzwerte zur allgemeinen Orientierung, die
          im Laufe der Zeit verfeinert werden. Die Indizes internationaler
          Städte sind kalibrierte Schätzwerte.
        </li>
      </ul>
      <p>
        Wir bemühen uns, die Zahlen plausibel und aktuell zu halten, doch es
        handelt sich um Schätzwerte, nicht um amtliche Statistiken. Nichts hier
        ist eine Finanz-, Steuer-, Rechts- oder Einwanderungsberatung —
        überprüfen Sie alles Wichtige bei einer offiziellen Quelle oder einer
        qualifizierten Fachkraft, bevor Sie Entscheidungen treffen.
      </p>
      <h2>Für wen es gedacht ist</h2>
      <p>
        Menschen, die einen Umzug abwägen, Remote-Arbeitende und digitale
        Nomaden auf der Suche nach einem Standort, Unternehmen, die Umzüge
        planen, und alle, die einfach neugierig sind, wie weit ihr Geld
        anderswo reicht.
      </p>
      <h2>Kontakt aufnehmen</h2>
      <p>
        Fragen, Korrekturen oder Ideen für eine Zusammenarbeit? Besuchen Sie
        unsere{" "}
        <Link href={`/${l}/contact`}>Kontakt</Link>-Seite.
      </p>
    </>
  ),
  privacy: ({ l }) => (
    <>
      <p>
        Dies ist eine Muster-Datenschutzerklärung für CostTrek; lassen Sie sie
        von einer qualifizierten Fachkraft prüfen, bevor Sie sich darauf
        verlassen. Sie erläutert, was wir erheben und warum.
      </p>
      <h2>Informationen, die wir erheben</h2>
      <p>
        CostTrek ist eine Content-Website. Wir bitten Sie nicht, ein Konto
        anzulegen oder personenbezogene Daten anzugeben, um sie zu nutzen. Wir
        empfangen automatisch standardmäßige technische Daten (IP-Adresse,
        Browsertyp, aufgerufene Seiten) und verwenden Cookies und ähnliche
        Technologien, wie in unseren{" "}
        <Link href={`/${l}/cookies`}>Cookies</Link> beschrieben.
      </p>
      <h2>Wie wir Daten verwenden</h2>
      <ul>
        <li>Um die Website zu betreiben, abzusichern und zu verbessern.</li>
        <li>
          Um den Datenverkehr mit datenschutzfreundlicher Analyse zu messen.
        </li>
        <li>
          Um Werbung anzuzeigen, die Cookies zur Personalisierung von Anzeigen
          verwenden kann.
        </li>
      </ul>
      <h2>Werbung &amp; Dritte</h2>
      <p>
        Wir können Anzeigen einblenden, die von Drittanbieter-Netzwerken
        ausgeliefert werden (zum Beispiel Google AdSense). Diese Partner können
        Cookies verwenden, um Anzeigen auf Grundlage Ihrer früheren Besuche
        auszuliefern. Personalisierte Werbung können Sie über die
        Einstellungen Ihres Geräts und Browsers steuern und in der EU/im UK über
        die Einwilligungsoptionen, die wir Ihnen anbieten.
      </p>
      <h2>Ihre Rechte</h2>
      <p>
        Je nachdem, wo Sie wohnen (zum Beispiel gemäß DSGVO oder CCPA), haben
        Sie möglicherweise das Recht, auf Ihre Daten zuzugreifen, sie zu
        berichtigen oder zu löschen und bestimmten Verarbeitungen zu
        widersprechen. Kontaktieren Sie uns, um sie auszuüben.
      </p>
      <h2>Kontakt</h2>
      <p>
        Fragen zu Ihren Daten oder zu dieser Erklärung? Schreiben Sie an{" "}
        <a href="mailto:info@costtrek.com">info@costtrek.com</a>.
      </p>
    </>
  ),
  terms: () => (
    <>
      <p>
        Mit der Nutzung von CostTrek stimmen Sie diesen Bedingungen zu. Dies ist
        eine Vorlage; lassen Sie sie von einer qualifizierten Fachkraft prüfen,
        bevor Sie sich darauf verlassen.
      </p>
      <h2>Nur zu Informationszwecken</h2>
      <p>
        Alle Angaben zu Lebenshaltungskosten, Steuern und Umzug sind ungefähre
        Schätzwerte, die zur allgemeinen Information bereitgestellt werden. Sie
        sind keine Finanz-, Steuer-, Rechts- oder Einwanderungsberatung.
        Überprüfen Sie alles Wichtige bei einer offiziellen Quelle oder einer
        qualifizierten Fachkraft, bevor Sie Entscheidungen treffen.
      </p>
      <h2>Keine Gewährleistung</h2>
      <p>
        Die Website wird &quot;wie besehen&quot; bereitgestellt, ohne
        Gewährleistung jeglicher Art. Wir tun unser Bestes, um die Daten aktuell
        zu halten, können jedoch nicht garantieren, dass sie zutreffend,
        vollständig oder aktuell sind.
      </p>
      <h2>Externe Links</h2>
      <p>
        Wir können auf Websites und Dienste Dritter verlinken, einige über
        Affiliate-Vereinbarungen. Für deren Inhalte oder Praktiken sind wir
        nicht verantwortlich.
      </p>
      <h2>Änderungen</h2>
      <p>
        Wir können diese Bedingungen aktualisieren; die weitere Nutzung
        bedeutet, dass Sie die Änderungen akzeptieren.
      </p>
    </>
  ),
  cookies: () => (
    <>
      <p>
        CostTrek verwendet Cookies — kleine, auf Ihrem Gerät gespeicherte
        Dateien — um die Website zu betreiben und, mit Ihrer Einwilligung, den
        Datenverkehr zu messen und Werbung zu unterstützen.
      </p>
      <h2>Arten von Cookies, die wir verwenden</h2>
      <ul>
        <li>
          <strong>Essenziell</strong> — für den Betrieb der Website
          erforderlich (zum Beispiel, um sich Ihre Sprache und Ihre
          Cookie-Auswahl zu merken). Immer aktiv.
        </li>
        <li>
          <strong>Analyse</strong> — helfen uns zu verstehen, welche Seiten
          nützlich sind. Werden nur gesetzt, wenn Sie zustimmen.
        </li>
        <li>
          <strong>Werbung</strong> — werden von Werbepartnern (zum Beispiel
          Google AdSense) verwendet, um Anzeigen zu messen und zu
          personalisieren. Werden nur gesetzt, wenn Sie zustimmen.
        </li>
      </ul>
      <h2>Cookies verwalten</h2>
      <p>
        Sie können nicht-essenzielle Cookies über das Banner akzeptieren oder
        ablehnen, das bei Ihrem ersten Besuch angezeigt wird, und Ihre Meinung
        jederzeit ändern, indem Sie die Daten dieser Website in Ihrem Browser
        löschen. Sie können Cookies auch in Ihren Browser-Einstellungen
        blockieren.
      </p>
    </>
  ),
  contact: () => (
    <>
      <p>
        Wir freuen uns, von Ihnen zu hören — Fragen, Feedback,
        Datenkorrekturen oder Ideen für eine Zusammenarbeit sind alle
        willkommen. Wir bemühen uns, innerhalb weniger Werktage zu antworten.
      </p>
      <h2>Allgemeine Anfragen &amp; Korrekturen</h2>
      <p>
        Schreiben Sie an <a href="mailto:info@costtrek.com">info@costtrek.com</a>.
        Wenn eine Zahl für eine Stadt oder ein Land nicht stimmig erscheint,
        sagen Sie uns Bescheid — wir verfeinern die Daten und sind für Hinweise
        dankbar.
      </p>
      <h2>Werbung &amp; Partnerschaften</h2>
      <p>
        Für Werbung, Sponsoring oder Partnerschaftsanfragen schreiben Sie an{" "}
        <a href="mailto:ads@costtrek.com">ads@costtrek.com</a>.
      </p>
      <h2>Über die Website</h2>
      <p>
        CostTrek ist ein unabhängiges, werbefinanziertes Projekt, das
        Lebenshaltungskosten, Steuern und Lebensqualität zwischen Städten und
        Ländern weltweit vergleicht.
      </p>
    </>
  ),
};

export default de;
