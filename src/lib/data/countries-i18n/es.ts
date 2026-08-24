import type { CountryText } from "./index";

const es: Record<string, CountryText> = {
  "TR": { summary: "El permiso de residencia de corta duración (ikamet) es la vía habitual; además, un nuevo programa para nómadas digitales (2024) y la ciudadanía por inversión inmobiliaria.", visaFreeNote: "Estancias cortas sin visado o con e-Visa (hasta 90 días) para muchos pasaportes (UE, R.U., EE. UU.…).", residencyNote: "Residencia permanente tras 8 años; naturalización tras 5.", nomadNote: "Tarjeta de identificación para nómadas digitales, lanzada en 2024.", healthcareNote: "Sistema público universal SGK; los expatriados prefieren los hospitales privados: alta calidad a bajo coste.", incomeTaxNote: "Tramos del 15/20/27/35/40 %.", vatNote: "KDV; tipo estándar del 20 % desde 2023.", socialNote: "Cotizaciones a la SGK.", taxNotes: ["La alta inflación provoca frecuentes revalorizaciones de los tramos y del salario mínimo."], visaNotes: ["Renovable; usado por trabajadores remotos y propietarios.", "Programa de 2024: trabajadores remotos de 21 a 55 años con título y prueba de ingresos.", "Compra de inmueble de 400 000 $, mantenida 3 años.", "Patrocinado por el empleador."] },
  "US": {
    summary: "Vías basadas en el empleo (H-1B, L-1, O-1) y familiares; célebre por la dificultad de la green card.",
    visaFreeNote: "No aplica para inmigración; ESTA para visitas cortas desde países del VWP.",
    residencyNote: "Naturalización tras 5 años como LPR (3 si está casado con un ciudadano).",
    nomadNote: "Sin visado nómada específico.",
    healthcareNote: "Seguro del empleador o privado; gastos de bolsillo muy altos.",
    incomeTaxNote: "Federal; los estados añaden un 0–13,3% por encima.",
    vatNote: "Sin IVA; el impuesto estatal y local sobre las ventas ronda el 0–10%.",
    socialNote: "FICA (Social Security + Medicare).",
    cgNote: "A largo plazo 0/15/20% + 3,8% de NIIT.",
    visaNotes: [
      "Basado en lotería, patrocinado por el empleador.",
      "Para el mejor talento; sin lotería.",
      null
    ]
  },
  "GB": {
    summary: "Vía Skilled Worker por puntos; Global Talent para los mejores profesionales.",
    visaFreeNote: "Visitas cortas sin visado para la UE/EE. UU./muchos; trabajar requiere visado.",
    healthcareNote: "NHS; los residentes pagan un recargo sanitario con el visado.",
    incomeTaxNote: "Más el National Insurance.",
    socialNote: "National Insurance.",
    visaNotes: [
      "Oferta de empleo de un patrocinador con licencia.",
      null,
      null
    ]
  },
  "FR": {
    summary: "Talent Passport para trabajadores cualificados, fundadores e investigadores.",
    visaFreeNote: "Schengen: 90/180 días sin visado para muchos pasaportes.",
    nomadNote: "Sin visado específico; existe la vía de la profession libérale.",
    healthcareNote: "Universal (PUMA) tras la residencia.",
    incomeTaxNote: "Más elevadas cargas sociales.",
    socialNote: "Entre las más altas de la OCDE.",
    cgNote: "'PFU' plano sobre las rentas de inversión.",
    visaNotes: [
      "Trabajadores cualificados, fundadores, inversores.",
      null
    ]
  },
  "DE": {
    summary: "EU Blue Card y la nueva Opportunity Card (búsqueda de empleo por puntos).",
    visaFreeNote: "Schengen 90/180 para muchos; trabajar requiere un permiso.",
    nomadNote: "El permiso de residencia Freiberufler es la vía habitual.",
    healthcareNote: "Legal (GKV) o privado (PKV); obligatorio.",
    incomeTaxNote: "Más un recargo de solidaridad del 5,5% sobre rentas altas.",
    socialNote: "Salud, pensión, dependencia, desempleo.",
    cgNote: "Abgeltungsteuer plano, incluida la solidaridad.",
    visaNotes: [
      "Titulación + umbral salarial.",
      "Basado en puntos, para búsqueda de empleo.",
      null
    ]
  },
  "NL": {
    summary: "Régimen Highly Skilled Migrant; vía del tratado DAFT para emprendedores estadounidenses.",
    visaFreeNote: "Schengen 90/180 para muchos pasaportes.",
    healthcareNote: "Seguro básico privado obligatorio.",
    socialNote: "Integrado en los tramos ('boxes') del impuesto sobre la renta.",
    cgNote: "El Box 3 grava un rendimiento presunto del patrimonio.",
    visaNotes: [
      "Patrocinador reconocido + umbral salarial.",
      null
    ]
  },
  "IE": {
    summary: "Critical Skills Employment Permit para puestos demandados.",
    visaFreeNote: "Common Travel Area con el Reino Unido; estancias cortas sin visado para muchos.",
    incomeTaxNote: "Más USC y PRSI.",
    socialNote: "PRSI.",
    visaNotes: [
      null,
      null
    ]
  },
  "ES": {
    summary: "El Visado de Nómada Digital y el visado no lucrativo son vías populares para expatriados.",
    visaFreeNote: "Schengen 90/180 para muchos pasaportes.",
    visaNotes: [
      "Renta remota + opción fiscal de la ley Beckham.",
      "Prueba de ingresos pasivos."
    ]
  },
  "PT": {
    summary: "Visados D8 de nómada digital y D7 de renta pasiva; un destino de reubicación de primer nivel.",
    visaFreeNote: "Schengen 90/180 para muchos pasaportes.",
    taxNotes: [
      "El IFICI ('NHR 2.0') ofrece ventajas fiscales a algunos recién llegados cualificados."
    ],
    visaNotes: [
      "Trabajadores remotos.",
      null
    ]
  },
  "IT": {
    summary: "Permisos de trabajo por cupos (Decreto Flussi); nueva vía para nómadas digitales.",
    visaFreeNote: "Schengen 90/180 para muchos pasaportes.",
    incomeTaxNote: "Más recargos regionales/municipales.",
    taxNotes: [
      "Regímenes de impuesto plano para nuevos residentes e impatriados."
    ],
    visaNotes: [
      null,
      "Renta pasiva."
    ]
  },
  "CH": {
    summary: "Sistema de cupos; más fácil para nacionales de la UE/AELC que de terceros países.",
    visaFreeNote: "Schengen 90/180 para muchos pasaportes.",
    incomeTaxNote: "Federal + cantón + municipio; varía enormemente.",
    cgNote: "Las plusvalías privadas suelen estar exentas de impuestos.",
    visaNotes: [
      "Patrocinado por el empleador, limitado por cupos.",
      null
    ]
  },
  "CA": {
    summary: "Sistema de puntos Express Entry; Provincial Nominee Programs.",
    visaFreeNote: "eTA para visitas cortas desde muchos países.",
    residencyNote: "PR vía Express Entry; ciudadanía tras unos 3 años.",
    nomadNote: "Estancia de 6 meses para trabajadores remotos anunciada dentro de Tech Talent.",
    healthcareNote: "Cobertura provincial tras la residencia.",
    incomeTaxNote: "Federal; las provincias añaden un ~10–25%.",
    vatNote: "GST del 5% + provincial (HST/PST hasta ~15%).",
    cgNote: "Se incluye en la renta el 50%+ de las plusvalías.",
    visaNotes: [
      null,
      null
    ]
  },
  "AE": {
    summary: "Visados de empleador, permisos de autónomo y la Golden Visa de 10 años.",
    visaFreeNote: "Visado a la llegada para muchos; la residencia depende del empleo o la propiedad.",
    healthcareNote: "Proporcionado por el empleador o privado; obligatorio en algunos emiratos.",
    incomeTaxNote: "Sin impuesto sobre la renta de las personas físicas.",
    visaNotes: [
      "10 años para inversores/talento.",
      "1 año, renta remota.",
      null
    ]
  },
  "SG": {
    summary: "Employment Pass para profesionales; ONE Pass para los que más ganan.",
    visaFreeNote: "Visitas cortas sin visado para muchos pasaportes.",
    residencyNote: "PR posible tras un par de años con el EP.",
    vatNote: "GST.",
    cgNote: "Sin impuesto sobre las plusvalías.",
    visaNotes: [
      "Umbral salarial + puntos (COMPASS).",
      "Para quienes ganan mucho / el mejor talento."
    ]
  },
  "JP": {
    summary: "Visados de trabajo por categoría; sistema de puntos Highly Skilled Professional.",
    visaFreeNote: "Visitas cortas sin visado para muchos; trabajar requiere un estatus de residencia.",
    residencyNote: "Antes mediante los puntos HSP.",
    incomeTaxNote: "Más un ~10% de impuesto local para residentes.",
    vatNote: "Impuesto sobre el consumo.",
    visaNotes: [
      null,
      "Basado en puntos, PR por vía rápida.",
      null
    ]
  },
  "AU": {
    summary: "Migración cualificada por puntos; visados patrocinados por el empleador.",
    visaFreeNote: "ETA/eVisitor para visitas cortas desde muchos países.",
    incomeTaxNote: "Más un 2% de Medicare levy.",
    vatNote: "GST.",
    cgNote: "Gravadas como renta; 50% de descuento si se mantienen 1 año o más.",
    visaNotes: [
      null,
      null
    ]
  },
  "TH": {
    summary: "Visado Long-Term Resident, visado Elite y el nuevo DTV para nómadas.",
    visaFreeNote: "Estancias cortas exentas de visado para muchos pasaportes.",
    nomadNote: "DTV, múltiples entradas por 5 años.",
    visaNotes: [
      "5 años, trabajadores remotos.",
      "Profesionales adinerados/cualificados."
    ]
  },
  "MX": {
    summary: "Visado de Residente Temporal mediante ingresos/ahorros; popular entre los nómadas.",
    visaFreeNote: "Entrada turística de 180 días para muchos pasaportes.",
    nomadNote: "De facto mediante la Residencia Temporal.",
    visaNotes: [
      "Prueba de ingresos o ahorros; hasta 4 años.",
      null
    ]
  },
  "PL": {
    summary: "Permiso de trabajo de tipo A y EU Blue Card; forma parte de Schengen.",
    visaFreeNote: "Schengen 90/180 para muchos pasaportes.",
    incomeTaxNote: "Más un 4% de gravamen de solidaridad sobre rentas altas.",
    visaNotes: [
      null,
      null
    ]
  },
  "AR": {
    summary: "Vías de rentista y de nómada digital; un camino a la residencia relativamente abierto.",
    visaFreeNote: "Entrada turística de 90 días para muchos pasaportes.",
    taxNotes: [
      "Inflación alta; las cifras cambian rápido."
    ],
    visaNotes: [
      null,
      null
    ]
  },
  "IN": {
    summary: "Visado de empleo para puestos cualificados; las vías de largo plazo son limitadas.",
    visaFreeNote: "e-Visa para turismo desde muchos países.",
    incomeTaxNote: "Más recargo + 4% de cess (efectivo hasta ~39%).",
    vatNote: "Tramos de GST.",
    cgNote: "12,5% a largo plazo / 20% a corto plazo (acciones cotizadas).",
    visaNotes: [
      "Se aplica un umbral salarial.",
      null
    ]
  },
  "KG": {
    summary: "Base barata y de baja tributación; e-visa sencilla y largas estancias sin visado para muchos.",
    visaFreeNote: "Sin visado hasta 60 días para muchos pasaportes (EE. UU., UE, Reino Unido…).",
    residencyNote: "Residencia fiscal tras 183 días.",
    nomadNote: "Sin visado específico, pero las largas estancias sin visado convienen a los trabajadores remotos.",
    healthcareNote: "Sistema público básico; los expatriados usan clínicas privadas.",
    incomeTaxNote: "Impuesto sobre la renta plano del 10%.",
    taxNotes: [
      "Uno de los regímenes de impuesto plano más bajos de la región."
    ],
    visaNotes: [
      "Cupo patrocinado por el empleador.",
      "Renovable anualmente."
    ]
  }
};

export default es;
