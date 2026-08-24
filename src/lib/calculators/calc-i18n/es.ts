import type { CalcText } from "./index";

const es: Record<string, CalcText> = {
  "mortgage-calculator": {
    title: "Calculadora de hipoteca",
    excerpt: "Estima el pago mensual de tu hipoteca — capital, intereses, impuestos y seguro — y descubre qué parte del préstamo son intereses a lo largo de su vida.",
    intent: "Calcula el pago mensual de un préstamo hipotecario antes de solicitarlo.",
    intro: [
      "Esta calculadora de hipoteca muestra el coste mensual total de un préstamo para vivienda: capital e intereses, más el impuesto predial, el seguro de hogar y la HOA opcionales. Ajusta el precio, la entrada, el tipo de interés y el plazo para ver cómo cambia el pago al instante.",
      "El cálculo es una amortización estándar a tipo fijo: exacto, no una estimación. Las únicas cifras que varían en el mundo real son el tipo que te ofrece un prestamista y tus impuestos y seguros locales, por lo que comparar varios prestamistas antes de fijar el tipo puede ahorrarte miles a lo largo de la vida del préstamo."
    ],
    notes: [
      "Una entrada mayor reduce tanto el importe del préstamo como, a menudo, el tipo de interés — y una entrada del 20 % o más suele evitar el seguro hipotecario privado (PMI).",
      "Un plazo más corto (15 frente a 30 años) supone un pago mensual más alto pero muchos menos intereses en total.",
      "Incluso una diferencia del 0,5 % en el tipo equivale a miles de dólares en 30 años — compara siempre las ofertas."
    ],
    faq: [
      {
        q: "¿Cómo se calcula el pago mensual de la hipoteca?",
        a: "Utiliza la fórmula de amortización estándar M = P·r / (1 − (1 + r)^−n), donde P es el importe del préstamo, r es el tipo de interés mensual (tipo anual ÷ 12) y n es el número de pagos mensuales (años × 12). El impuesto predial, el seguro y la HOA se suman aparte."
      },
      {
        q: "¿Incluye el impuesto predial y el seguro?",
        a: "Sí, de forma opcional. Introduce tu impuesto predial anual, el seguro de hogar y cualquier HOA mensual, y se suman al pago de capital e intereses para mostrar tu coste mensual real."
      },
      {
        q: "¿Qué es el PMI y está incluido?",
        a: "El seguro hipotecario privado suele exigirse cuando tu entrada es inferior al 20 %. Esta calculadora no añade el PMI automáticamente; si tu prestamista lo requiere, inclúyelo en el campo del seguro."
      },
      {
        q: "¿Por qué gran parte de mis primeros pagos va a intereses?",
        a: "Con la amortización, los intereses se cobran sobre el saldo restante, que es mayor al principio. Los primeros pagos son en su mayoría intereses y se desplazan hacia el capital con el tiempo — el desglose anual lo muestra."
      }
    ],
    offersHeading: "Compara ofertas de hipoteca",
    offers: [
      {
        name: "Compara tipos de hipoteca",
        blurb: "Los tipos varían según el prestamista — comparar varias ofertas antes de fijarlo puede ahorrarte miles a lo largo de la vida del préstamo.",
        cta: "Comparar tipos"
      },
      {
        name: "Obtén una preaprobación en línea",
        blurb: "Descubre cuánto puedes pedir prestado y fija un tipo con una preaprobación en línea rápida.",
        cta: "Comprobar elegibilidad"
      },
      {
        name: "Refinancia una hipoteca existente",
        blurb: "Si los tipos han bajado desde que compraste, refinanciar podría reducir tu pago mensual.",
        cta: "Ver tipos de refinanciación"
      }
    ]
  },
  "loan-calculator": {
    title: "Calculadora de préstamos",
    excerpt: "Calcula el pago mensual, los intereses totales y el coste total de un préstamo personal, estudiantil o general.",
    intent: "Descubre el pago mensual real y el coste total de un préstamo antes de pedirlo.",
    intro: [
      "Esta calculadora de préstamos convierte un importe, un tipo de interés (TAE) y un plazo en un pago mensual — y, igual de importante, muestra cuántos intereses pagarás a lo largo de la vida del préstamo. Úsala para préstamos personales, estudiantiles, consolidación de deudas o cualquier préstamo a plazos con tipo fijo.",
      "La única cifra que merece la pena vigilar es el total de intereses: un pago mensual más bajo por un plazo más largo casi siempre significa que pagas mucho más en total. Comparar un par de prestamistas por la TAE, y no solo por la cifra mensual, es donde está el verdadero ahorro."
    ],
    notes: [
      "La TAE agrupa el tipo de interés con la mayoría de las comisiones, así que es la cifra más justa para comparar entre prestamistas.",
      "Un plazo más largo reduce el pago mensual pero aumenta los intereses totales — a veces de forma drástica.",
      "Pagar un poco más cada mes va directo al capital y acorta el préstamo."
    ],
    faq: [
      {
        q: "¿Cómo se calcula el pago mensual del préstamo?",
        a: "Utiliza la fórmula de amortización estándar: el importe del préstamo multiplicado por el tipo mensual, dividido entre uno menos (uno más el tipo mensual) elevado a menos el número de pagos. El tipo mensual es la TAE dividida entre 12; el número de pagos es el plazo en meses."
      },
      {
        q: "¿Cuál es la diferencia entre el tipo de interés y la TAE?",
        a: "El tipo de interés es el coste de pedir prestado el capital; la TAE también incluye la mayoría de las comisiones del prestamista, por lo que refleja el coste anual real. Compara los préstamos por la TAE."
      },
      {
        q: "¿Un plazo más largo me ahorra dinero?",
        a: "No — reduce el pago mensual pero aumenta el total de intereses que pagas. Un plazo más corto cuesta más al mes pero menos en total."
      }
    ],
    offersHeading: "Compara ofertas de préstamos",
    offers: [
      {
        name: "Compara tipos de préstamos personales",
        blurb: "Consulta los tipos de varios prestamistas en minutos sin afectar a tu puntuación crediticia.",
        cta: "Comparar tipos"
      },
      {
        name: "Consolida deudas de alto interés",
        blurb: "Un único préstamo con un tipo más bajo puede reducir los intereses que pagas por las tarjetas de crédito.",
        cta: "Ver opciones"
      },
      {
        name: "Consulta tu tipo en línea",
        blurb: "Obtén una estimación de tipo personalizada con una consulta crediticia suave.",
        cta: "Comprobar elegibilidad"
      }
    ]
  },
  "car-loan-calculator": {
    title: "Calculadora de préstamos para coche",
    excerpt: "Estima el pago mensual de tu coche incluyendo la entrada, la permuta y el impuesto sobre ventas — y el coste total de la financiación.",
    intent: "Conoce el coste mensual real de un coche, impuestos e intereses incluidos, antes de ir al concesionario.",
    intro: [
      "Esta calculadora de préstamos para coche muestra el pago mensual de un préstamo automotriz tras tu entrada y tu permuta, con el impuesto sobre ventas incorporado al importe financiado. Ajusta el precio, el plazo y la TAE para ver cómo cambian el pago y los intereses totales.",
      "A los concesionarios les gusta negociar sobre el pago mensual — pero un pago mensual bajo puede ocultar un plazo largo y miles en intereses adicionales. Céntrate en el importe financiado y en los intereses totales, no solo en la cifra por mes."
    ],
    notes: [
      "En la mayoría de los estados de EE. UU., el impuesto sobre ventas se aplica al precio menos tu permuta — por eso una permuta también puede reducir tu impuesto.",
      "Los plazos más largos (72–84 meses) reducen el pago pero puedes acabar debiendo más de lo que vale el coche.",
      "Una entrada mayor reduce tanto el préstamo como los intereses que pagas."
    ],
    faq: [
      {
        q: "¿Está incluido el impuesto sobre ventas en el pago del coche?",
        a: "Sí. Esta calculadora añade el impuesto sobre ventas (sobre el precio menos la permuta, como lo aplican la mayoría de los estados de EE. UU.) al importe financiado y luego calcula el pago mensual sobre ese total."
      },
      {
        q: "¿Cómo afecta una permuta al pago?",
        a: "El valor de tu permuta reduce tanto el importe que financias como, en la mayoría de los estados, la cantidad imponible — así que reduce el pago y el impuesto sobre ventas."
      },
      {
        q: "¿Qué plazo debería elegir?",
        a: "Los plazos más cortos cuestan más al mes pero mucho menos en intereses totales y reducen el riesgo de patrimonio negativo. Compara los intereses totales entre plazos, no solo el pago mensual."
      }
    ],
    offersHeading: "Financia y asegura tu coche",
    offers: [
      {
        name: "Compara tipos de préstamos para coche",
        blurb: "Precalifica con varios prestamistas para superar la oferta de financiación del concesionario.",
        cta: "Comparar tipos"
      },
      {
        name: "Obtén presupuestos de seguro de coche",
        blurb: "Compara coberturas de varias aseguradoras en un solo lugar y cámbiate para ahorrar.",
        cta: "Obtener presupuestos"
      },
      {
        name: "Refinancia tu préstamo de coche",
        blurb: "Si tu crédito ha mejorado, refinanciar podría reducir tu tipo y tu pago.",
        cta: "Ver tipos de refinanciación"
      }
    ]
  },
  "salary-calculator": {
    title: "Calculadora de salario",
    excerpt: "Estima tu salario neto en EE. UU. tras el impuesto federal y la FICA, y convierte entre pago por hora, semanal, mensual y anual.",
    intent: "Convierte un salario o sueldo bruto en tu salario neto real por nómina.",
    intro: [
      "Esta calculadora de salario estima tu salario neto para el año fiscal 2024 de EE. UU. usando los tramos federales reales del IRS, la deducción estándar y la FICA (Social Security y Medicare). Introduce cualquier periodo de pago — por hora, semanal, mensual o anual — y lo convierte en un salario y un neto equivalentes.",
      "Es una estimación, no una nómina: excluye créditos fiscales, deducciones detalladas y las numerosas reglas específicas de cada estado, por lo que el impuesto estatal se aplica como un tipo fijo que tú introduces. Para una cifra exacta, consulta con tu empleador o un profesional fiscal."
    ],
    notes: [
      "La FICA es del 7,65 % (6,2 % de Social Security hasta la base salarial anual, más 1,45 % de Medicare) además del impuesto sobre la renta.",
      "Las aportaciones antes de impuestos como un 401(k) o una HSA reducen tu renta imponible — y tu salario neto — pero generan ahorro.",
      "El tipo impositivo efectivo es tu impuesto total dividido entre el pago bruto; siempre es inferior a tu tramo más alto."
    ],
    faq: [
      {
        q: "¿Cómo se calcula el salario neto?",
        a: "El pago bruto menos las deducciones antes de impuestos da los salarios imponibles; restamos la deducción estándar, aplicamos los tramos federales de 2024 según tu estado civil fiscal, sumamos la FICA sobre los salarios brutos y aplicamos el tipo estatal que has introducido. Lo que queda es tu salario neto estimado."
      },
      {
        q: "¿Qué tramos fiscales del año utiliza?",
        a: "El año fiscal federal 2024 de EE. UU.: los tramos marginales del IRS, la deducción estándar ($14,600 soltero / $29,200 casados que declaran conjuntamente) y los tipos y la base salarial de la FICA de 2024."
      },
      {
        q: "¿Por qué no coincide exactamente con mi nómina?",
        a: "Las nóminas reales reflejan créditos, deducciones detalladas, impuestos locales, elecciones de prestaciones y la retención específica del empleador. Esto es una estimación simplificada — tómala como una guía aproximada, no como una cifra exacta."
      }
    ],
    offersHeading: "Haz que tu nómina rinda más",
    offers: [
      {
        name: "Cuenta de ahorro de alto rendimiento",
        blurb: "Gana más con el dinero que tienes en tu cuenta corriente gracias a un tipo de ahorro en línea de los mejores.",
        cta: "Comparar cuentas"
      },
      {
        name: "Declara tus impuestos en línea",
        blurb: "Consigue todos los créditos y deducciones que te corresponden con un software fiscal en línea fácil de usar.",
        cta: "Empezar la declaración"
      },
      {
        name: "Banca en línea sin comisiones",
        blurb: "Olvídate de las comisiones mensuales y cobra hasta dos días antes con una cuenta corriente moderna.",
        cta: "Ver cuentas"
      }
    ]
  },
  "electricity-cost-calculator": {
    title: "Calculadora del coste de la electricidad",
    excerpt: "Descubre cuánto cuesta hacer funcionar cualquier electrodoméstico — por día, mes y año — a partir de su potencia y del precio de tu electricidad.",
    intent: "Averigua lo que cuesta realmente hacer funcionar un electrodoméstico y dónde recortar la factura.",
    intro: [
      "Esta calculadora de electricidad convierte la potencia de un electrodoméstico (en vatios), el tiempo que lo usas y tu precio por kilovatio-hora en un coste de funcionamiento por día, mes y año. Es la forma más rápida de detectar qué dispositivos disparan silenciosamente tu factura de electricidad.",
      "El cálculo es simple y exacto: vatios ÷ 1.000 × horas da los kilovatios-hora, y los kWh × tu tarifa dan el coste. Las sorpresas vienen de lo que se deja encendido todo el día — calefactores, neveras viejas, aire acondicionado — donde pequeños costes por hora se acumulan rápido."
    ],
    notes: [
      "Encuentra la potencia de un electrodoméstico en su etiqueta o en el manual; para calefacción y refrigeración suele ser la cifra más alta de tu hogar.",
      "Tu precio por kWh está en tu factura de electricidad — varía mucho según el país y el proveedor.",
      "Los dispositivos siempre encendidos y los de calefacción/refrigeración dominan las facturas; cambiar de proveedor o de tarifa puede reducir la propia tarifa."
    ],
    faq: [
      {
        q: "¿Cómo calculo el coste de hacer funcionar un electrodoméstico?",
        a: "Multiplica la potencia en vatios por las horas de uso y divide entre 1.000 para obtener los kilovatios-hora (kWh), luego multiplica por tu precio por kWh. Esta calculadora lo hace automáticamente para un día, un mes y un año."
      },
      {
        q: "¿Dónde encuentro la potencia de un electrodoméstico?",
        a: "En la etiqueta de características (a menudo en la parte trasera o inferior) o en el manual. Si solo aparecen voltios y amperios, multiplícalos para obtener los vatios."
      },
      {
        q: "¿Qué consume más electricidad en casa?",
        a: "La calefacción, la refrigeración y todo lo que funciona constantemente — calefactores eléctricos, aire acondicionado, calentadores de agua y neveras antiguas — suelen suponer la mayor parte de una factura."
      }
    ],
    offersHeading: "Reduce tu factura de energía",
    offers: [
      {
        name: "Compara planes de electricidad",
        blurb: "Cambiar de proveedor o de tarifa puede reducir el precio que pagas por kWh — compara en minutos.",
        cta: "Comparar planes"
      },
      {
        name: "Obtén presupuestos de paneles solares",
        blurb: "Descubre cuánto podría ahorrarte la energía solar en el tejado con presupuestos locales gratuitos.",
        cta: "Obtener presupuestos"
      },
      {
        name: "Dispositivos inteligentes de ahorro de energía",
        blurb: "Los enchufes inteligentes y los termostatos reducen el coste de los electrodomésticos siempre encendidos.",
        cta: "Ver dispositivos"
      }
    ]
  }
};

export default es;
