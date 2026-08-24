import type { CalcText } from "./index";

const de: Record<string, CalcText> = {
  "mortgage-calculator": {
    title: "Hypothekenrechner",
    excerpt: "Schätzen Sie Ihre monatliche Hypothekenrate — Tilgung, Zinsen, Steuern und Versicherung — und sehen Sie, wie viel des Kredits über die Laufzeit auf Zinsen entfällt.",
    intent: "Berechnen Sie die monatliche Rate einer Baufinanzierung, bevor Sie einen Antrag stellen.",
    intro: [
      "Dieser Hypothekenrechner zeigt die vollen monatlichen Kosten einer Baufinanzierung: Tilgung und Zinsen sowie optional Grundsteuer, Wohngebäudeversicherung und HOA-Gebühren. Passen Sie Kaufpreis, Anzahlung, Zinssatz und Laufzeit an und beobachten Sie, wie sich die Rate sofort aktualisiert.",
      "Die Berechnung ist eine klassische Tilgung mit festem Zinssatz — exakt, keine Schätzung. Die einzigen Werte, die in der Praxis variieren, sind der Zinssatz, den ein Kreditgeber Ihnen bietet, sowie Ihre örtlichen Steuern und Versicherungen. Genau deshalb kann der Vergleich mehrerer Anbieter, bevor Sie einen Zinssatz festschreiben, über die Laufzeit des Kredits Tausende sparen."
    ],
    notes: [
      "Eine höhere Anzahlung senkt sowohl die Kreditsumme als auch oft den Zinssatz — und eine Anzahlung von 20 % oder mehr vermeidet in der Regel die private Hypothekenversicherung (PMI).",
      "Eine kürzere Laufzeit (15 statt 30 Jahre) bedeutet eine höhere monatliche Rate, aber deutlich weniger Gesamtzinsen.",
      "Selbst ein Unterschied von 0,5 % beim Zinssatz macht über 30 Jahre Tausende aus — vergleichen Sie immer die Angebote."
    ],
    faq: [
      {
        q: "Wie wird die monatliche Hypothekenrate berechnet?",
        a: "Sie beruht auf der klassischen Tilgungsformel M = P·r / (1 − (1 + r)^−n), wobei P die Kreditsumme, r der monatliche Zinssatz (Jahreszins ÷ 12) und n die Anzahl der monatlichen Zahlungen (Jahre × 12) ist. Grundsteuer, Versicherung und HOA-Gebühren kommen obendrauf."
      },
      {
        q: "Sind Grundsteuer und Versicherung enthalten?",
        a: "Ja — optional. Geben Sie Ihre jährliche Grundsteuer, die Wohngebäudeversicherung und etwaige monatliche HOA-Gebühren ein, und sie werden zur Tilgungs- und Zinsrate hinzugerechnet, um Ihre tatsächlichen monatlichen Kosten anzuzeigen."
      },
      {
        q: "Was ist PMI und ist es enthalten?",
        a: "Die private Hypothekenversicherung (PMI) wird in der Regel verlangt, wenn Ihre Anzahlung unter 20 % liegt. Dieser Rechner fügt PMI nicht automatisch hinzu; verlangt Ihr Kreditgeber sie, tragen Sie sie im Feld für die Versicherung ein."
      },
      {
        q: "Warum fließt ein so großer Teil meiner ersten Raten in die Zinsen?",
        a: "Bei der Tilgung werden Zinsen auf den Restsaldo berechnet, der zu Beginn am höchsten ist. Frühe Raten bestehen überwiegend aus Zinsen und verlagern sich im Laufe der Zeit hin zur Tilgung — die jährliche Aufschlüsselung zeigt dies."
      }
    ],
    offersHeading: "Hypothekenangebote vergleichen",
    offers: [
      {
        name: "Hypothekenzinsen vergleichen",
        blurb: "Die Zinssätze unterscheiden sich je nach Kreditgeber — der Vergleich einiger Angebote vor dem Festschreiben kann über die Laufzeit des Kredits Tausende sparen.",
        cta: "Zinsen vergleichen"
      },
      {
        name: "Online-Vorabgenehmigung erhalten",
        blurb: "Sehen Sie, wie viel Sie aufnehmen können, und sichern Sie sich mit einer schnellen Online-Vorabgenehmigung einen Zinssatz.",
        cta: "Berechtigung prüfen"
      },
      {
        name: "Bestehende Hypothek umschulden",
        blurb: "Wenn die Zinsen seit Ihrem Kauf gefallen sind, könnte eine Umschuldung Ihre monatliche Rate senken.",
        cta: "Umschuldungszinsen ansehen"
      }
    ]
  },
  "loan-calculator": {
    title: "Kreditrechner",
    excerpt: "Berechnen Sie die monatliche Rate, die Gesamtzinsen und die Gesamtkosten eines Privat-, Studien- oder allgemeinen Kredits.",
    intent: "Sehen Sie die tatsächliche monatliche Rate und die Gesamtkosten eines Kredits, bevor Sie ihn aufnehmen.",
    intro: [
      "Dieser Kreditrechner verwandelt eine Kreditsumme, einen Zinssatz (effektiver Jahreszins) und eine Laufzeit in eine monatliche Rate — und zeigt ebenso wichtig, wie viel Zinsen Sie über die Laufzeit des Kredits zahlen. Nutzen Sie ihn für Privatkredite, Studienkredite, Umschuldungen oder jeden Ratenkredit mit festem Zinssatz.",
      "Die eine Zahl, die es zu beachten gilt, sind die Gesamtzinsen: Eine niedrigere monatliche Rate durch eine längere Laufzeit bedeutet fast immer, dass Sie insgesamt weit mehr zahlen. Der Vergleich einiger Kreditgeber nach dem effektiven Jahreszins — nicht nur nach der Monatsrate — ist der Ort der wahren Ersparnis."
    ],
    notes: [
      "Der effektive Jahreszins bündelt den Zinssatz mit den meisten Gebühren und ist damit die fairste Kennzahl zum Vergleich zwischen Kreditgebern.",
      "Eine längere Laufzeit senkt die monatliche Rate, erhöht aber die Gesamtzinsen — mitunter drastisch.",
      "Wenn Sie jeden Monat etwas mehr zahlen, fließt dies direkt in die Tilgung und verkürzt den Kredit."
    ],
    faq: [
      {
        q: "Wie wird die monatliche Kreditrate berechnet?",
        a: "Sie beruht auf der klassischen Tilgungsformel: die Kreditsumme mal dem monatlichen Zinssatz, geteilt durch eins minus (eins plus dem monatlichen Zinssatz) hoch minus der Anzahl der Zahlungen. Der monatliche Zinssatz ist der effektive Jahreszins geteilt durch 12; die Anzahl der Zahlungen ist die Laufzeit in Monaten."
      },
      {
        q: "Was ist der Unterschied zwischen Zinssatz und effektivem Jahreszins?",
        a: "Der Zinssatz sind die Kosten für die Aufnahme der Kreditsumme; der effektive Jahreszins schließt zudem die meisten Gebühren des Kreditgebers ein und spiegelt damit die tatsächlichen jährlichen Kosten wider. Vergleichen Sie Kredite nach dem effektiven Jahreszins."
      },
      {
        q: "Spart mir eine längere Laufzeit Geld?",
        a: "Nein — sie senkt die monatliche Rate, erhöht aber die Gesamtzinsen, die Sie zahlen. Eine kürzere Laufzeit kostet mehr pro Monat, aber weniger insgesamt."
      }
    ],
    offersHeading: "Kreditangebote vergleichen",
    offers: [
      {
        name: "Privatkreditzinsen vergleichen",
        blurb: "Prüfen Sie in Minuten die Zinsen mehrerer Kreditgeber, ohne Ihre Bonität zu beeinträchtigen.",
        cta: "Zinsen vergleichen"
      },
      {
        name: "Hochverzinste Schulden umschulden",
        blurb: "Ein einzelner Kredit mit niedrigerem Zinssatz kann die Zinsen senken, die Sie auf Kreditkarten zahlen.",
        cta: "Optionen ansehen"
      },
      {
        name: "Ihren Zinssatz online prüfen",
        blurb: "Erhalten Sie mit einer sanften Bonitätsabfrage eine persönliche Zinsschätzung.",
        cta: "Berechtigung prüfen"
      }
    ]
  },
  "car-loan-calculator": {
    title: "Autokreditrechner",
    excerpt: "Schätzen Sie Ihre monatliche Autorate inklusive Anzahlung, Inzahlungnahme und Umsatzsteuer — sowie die Gesamtkosten der Finanzierung.",
    intent: "Kennen Sie die tatsächlichen monatlichen Kosten eines Autos, inklusive Steuer und Zinsen, bevor Sie zum Händler gehen.",
    intro: [
      "Dieser Autokreditrechner zeigt die monatliche Rate eines Autokredits nach Ihrer Anzahlung und Inzahlungnahme, wobei die Umsatzsteuer in den finanzierten Betrag eingerechnet wird. Passen Sie Preis, Laufzeit und effektiven Jahreszins an, um zu sehen, wie sich Rate und Gesamtzinsen ändern.",
      "Autohändler verhandeln gern über die Monatsrate — doch eine niedrige Monatsrate kann eine lange Laufzeit und Tausende an zusätzlichen Zinsen verbergen. Konzentrieren Sie sich auf den finanzierten Betrag und die Gesamtzinsen, nicht nur auf die Zahl pro Monat."
    ],
    notes: [
      "In den meisten US-Bundesstaaten wird die Umsatzsteuer auf den Preis abzüglich Ihrer Inzahlungnahme erhoben — weshalb eine Inzahlungnahme auch Ihre Steuer senken kann.",
      "Längere Autokreditlaufzeiten (72–84 Monate) verringern die Rate, doch Sie können am Ende mehr schulden, als das Auto wert ist.",
      "Eine höhere Anzahlung senkt sowohl den Kredit als auch die Zinsen, die Sie zahlen."
    ],
    faq: [
      {
        q: "Ist die Umsatzsteuer in der Autorate enthalten?",
        a: "Ja. Dieser Rechner addiert die Umsatzsteuer (auf den Preis abzüglich Inzahlungnahme, wie sie die meisten US-Bundesstaaten anwenden) zum finanzierten Betrag und berechnet dann die monatliche Rate auf diese Summe."
      },
      {
        q: "Wie wirkt sich eine Inzahlungnahme auf die Rate aus?",
        a: "Der Wert Ihrer Inzahlungnahme senkt sowohl den finanzierten Betrag als auch, in den meisten Bundesstaaten, den steuerpflichtigen Betrag — er verringert also die Rate und die Umsatzsteuer."
      },
      {
        q: "Welche Laufzeit sollte ich wählen?",
        a: "Kürzere Laufzeiten kosten mehr pro Monat, aber weit weniger an Gesamtzinsen und verringern das Risiko einer Unterdeckung. Vergleichen Sie die Gesamtzinsen über die Laufzeiten hinweg, nicht nur die Monatsrate."
      }
    ],
    offersHeading: "Ihr Auto finanzieren & versichern",
    offers: [
      {
        name: "Autokreditzinsen vergleichen",
        blurb: "Lassen Sie sich bei mehreren Kreditgebern vorab qualifizieren, um das Finanzierungsangebot des Händlers zu unterbieten.",
        cta: "Zinsen vergleichen"
      },
      {
        name: "Kfz-Versicherungsangebote einholen",
        blurb: "Vergleichen Sie den Versicherungsschutz mehrerer Anbieter an einem Ort und wechseln Sie, um zu sparen.",
        cta: "Angebote einholen"
      },
      {
        name: "Ihren Autokredit umschulden",
        blurb: "Wenn sich Ihre Bonität verbessert hat, könnte eine Umschuldung Ihren Zinssatz und Ihre Rate senken.",
        cta: "Umschuldungszinsen ansehen"
      }
    ]
  },
  "salary-calculator": {
    title: "Gehaltsrechner",
    excerpt: "Schätzen Sie Ihr US-Nettogehalt nach Bundessteuer und FICA und rechnen Sie zwischen Stunden-, Wochen-, Monats- und Jahreslohn um.",
    intent: "Verwandeln Sie ein Bruttogehalt oder einen Bruttolohn in das tatsächliche Nettogehalt pro Gehaltsabrechnung.",
    intro: [
      "Dieser Gehaltsrechner schätzt Ihr Nettogehalt für das US-Steuerjahr 2024 anhand der tatsächlichen IRS-Bundessteuerklassen, des Standardabzugs (standard deduction) und der FICA-Abgaben (Social Security und Medicare). Geben Sie einen beliebigen Zahlungszeitraum ein — Stunden, Wochen, Monate oder Jahre — und der Rechner rechnet ihn in ein entsprechendes Gehalt und Nettoentgelt um.",
      "Es ist eine Schätzung, keine Gehaltsabrechnung: Steuergutschriften, Einzelabzüge und die vielen bundesstaatsspezifischen Regeln bleiben unberücksichtigt, weshalb die Bundesstaatssteuer als von Ihnen eingegebener Pauschalsatz angewendet wird. Für einen exakten Wert wenden Sie sich an Ihren Arbeitgeber oder eine Steuerberatung."
    ],
    notes: [
      "FICA beträgt 7,65 % (6,2 % Social Security bis zur jährlichen Beitragsbemessungsgrenze plus 1,45 % Medicare) zusätzlich zur Einkommensteuer.",
      "Beiträge vor Steuern wie 401(k) oder HSA senken Ihr zu versteuerndes Einkommen — und Ihr Nettogehalt — bauen aber Ersparnisse auf.",
      "Der effektive Steuersatz ist Ihre Gesamtsteuer geteilt durch das Bruttogehalt; er liegt immer unter Ihrer höchsten Steuerklasse."
    ],
    faq: [
      {
        q: "Wie wird das Nettogehalt berechnet?",
        a: "Das Bruttogehalt abzüglich der Abzüge vor Steuern ergibt den zu versteuernden Lohn; wir ziehen den Standardabzug ab, wenden die Bundessteuerklassen 2024 für Ihren Steuerstatus an, addieren FICA auf den Bruttolohn und wenden Ihren eingegebenen Bundesstaatssatz an. Was übrig bleibt, ist Ihr geschätztes Nettoentgelt."
      },
      {
        q: "Die Steuerklassen welchen Jahres werden verwendet?",
        a: "Das US-Bundessteuerjahr 2024: die marginalen IRS-Steuerklassen, der Standardabzug (14.600 $ für Ledige / 29.200 $ bei gemeinsamer Veranlagung von Ehepaaren) sowie die FICA-Sätze und die Beitragsbemessungsgrenze 2024."
      },
      {
        q: "Warum stimmt es nicht genau mit meiner Gehaltsabrechnung überein?",
        a: "Echte Gehaltsabrechnungen berücksichtigen Steuergutschriften, Einzelabzüge, lokale Steuern, gewählte Zusatzleistungen und arbeitgeberspezifische Einbehalte. Dies ist eine vereinfachte Schätzung — betrachten Sie sie als guten Richtwert, nicht als exakten Wert."
      }
    ],
    offersHeading: "Mehr aus Ihrem Gehalt herausholen",
    offers: [
      {
        name: "Hochverzinstes Tagesgeldkonto",
        blurb: "Verdienen Sie mehr mit dem Geld auf Ihrem Girokonto dank eines erstklassigen Online-Sparzinssatzes.",
        cta: "Konten vergleichen"
      },
      {
        name: "Steuererklärung online einreichen",
        blurb: "Sichern Sie sich mit einfacher Online-Steuersoftware jede Gutschrift und jeden Abzug, der Ihnen zusteht.",
        cta: "Mit der Erklärung beginnen"
      },
      {
        name: "Online-Banking ohne Gebühren",
        blurb: "Sparen Sie monatliche Gebühren und lassen Sie sich mit einem modernen Girokonto bis zu zwei Tage früher bezahlen.",
        cta: "Konten ansehen"
      }
    ]
  },
  "electricity-cost-calculator": {
    title: "Stromkostenrechner",
    excerpt: "Sehen Sie, wie viel der Betrieb eines Geräts kostet — pro Tag, Monat und Jahr — anhand seiner Wattzahl und Ihres Strompreises.",
    intent: "Finden Sie heraus, was der Betrieb eines Geräts wirklich kostet und wo Sie die Rechnung senken können.",
    intro: [
      "Dieser Stromrechner verwandelt die Leistung eines Geräts (in Watt), die Nutzungsdauer und Ihren Preis pro Kilowattstunde in laufende Kosten pro Tag, Monat und Jahr. Es ist der schnellste Weg, um zu erkennen, welche Geräte Ihre Stromrechnung leise in die Höhe treiben.",
      "Die Rechnung ist einfach und exakt: Watt ÷ 1.000 × Stunden ergibt Kilowattstunden, und kWh × Ihr Tarif ergibt die Kosten. Die Überraschungen kommen von Dingen, die den ganzen Tag laufen — Heizungen, alte Kühlschränke, Klimaanlagen — bei denen sich kleine Stundenkosten schnell summieren."
    ],
    notes: [
      "Die Wattzahl eines Geräts finden Sie auf dem Typenschild oder in der Anleitung; bei Heizung und Kühlung ist es meist die größte Zahl in Ihrem Zuhause.",
      "Ihren Preis pro kWh finden Sie auf Ihrer Stromrechnung — er schwankt stark je nach Land und Anbieter.",
      "Dauerlaufende sowie Heiz- und Kühlgeräte dominieren die Rechnungen; ein Wechsel des Anbieters oder Tarifs kann den Tarif selbst senken."
    ],
    faq: [
      {
        q: "Wie berechne ich die Betriebskosten eines Geräts?",
        a: "Multiplizieren Sie die Leistung in Watt mit den Nutzungsstunden und teilen Sie durch 1.000, um Kilowattstunden (kWh) zu erhalten, und multiplizieren Sie dann mit Ihrem Preis pro kWh. Dieser Rechner erledigt das automatisch für einen Tag, Monat und ein Jahr."
      },
      {
        q: "Wo finde ich die Wattzahl eines Geräts?",
        a: "Auf dem Typenschild (oft auf der Rückseite oder Unterseite) oder in der Anleitung. Wenn nur Volt und Ampere angegeben sind, multiplizieren Sie beide, um Watt zu erhalten."
      },
      {
        q: "Was verbraucht zu Hause den meisten Strom?",
        a: "Heizung, Kühlung und alles, was ständig läuft — Elektroheizungen, Klimaanlagen, Warmwasserbereiter und ältere Kühlschränke — machen typischerweise den größten Anteil einer Rechnung aus."
      }
    ],
    offersHeading: "Ihre Energierechnung senken",
    offers: [
      {
        name: "Stromtarife vergleichen",
        blurb: "Ein Wechsel des Anbieters oder Tarifs kann den Preis senken, den Sie pro kWh zahlen — vergleichen Sie in Minuten.",
        cta: "Tarife vergleichen"
      },
      {
        name: "Angebote für Solaranlagen einholen",
        blurb: "Sehen Sie mit kostenlosen lokalen Angeboten, wie viel Solarstrom vom Dach auf Ihrer Rechnung sparen könnte.",
        cta: "Angebote einholen"
      },
      {
        name: "Smarte Energiespargeräte",
        blurb: "Smarte Steckdosen und Thermostate senken die Kosten dauerlaufender Geräte.",
        cta: "Geräte ansehen"
      }
    ]
  },
};

export default de;
