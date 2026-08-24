import type { CountryText } from "./index";

const pt: Record<string, CountryText> = {
  "TR": { summary: "A autorização de residência de curta duração (ikamet) é a via habitual; há ainda um novo programa para nómadas digitais (2024) e a cidadania por investimento imobiliário.", visaFreeNote: "Estadias curtas sem visto ou com e-Visa (até 90 dias) para muitos passaportes (UE, R.U., EUA…).", residencyNote: "Residência permanente após 8 anos; naturalização após 5.", nomadNote: "Cartão de identificação para nómadas digitais, lançado em 2024.", healthcareNote: "Sistema público universal SGK; os expatriados preferem os hospitais privados — alta qualidade a baixo custo.", incomeTaxNote: "Escalões de 15/20/27/35/40 %.", vatNote: "KDV; taxa padrão de 20 % desde 2023.", socialNote: "Contribuições para a SGK.", taxNotes: ["A inflação elevada provoca revalorizações frequentes dos escalões e do salário mínimo."], visaNotes: ["Renovável; usado por trabalhadores remotos e proprietários.", "Programa de 2024: trabalhadores remotos dos 21 aos 55 anos com diploma e comprovativo de rendimentos.", "Compra de imóvel de 400 000 $, mantida 3 anos.", "Patrocinado pelo empregador."] },
  "US": {
    summary: "Vias baseadas no emprego (H-1B, L-1, O-1) e familiares; notoriamente difícil obter o green card.",
    visaFreeNote: "N/A para imigração; ESTA para visitas curtas de países do VWP.",
    residencyNote: "Naturalização após 5 anos como LPR (3 se casado com cidadão).",
    nomadNote: "Sem visto dedicado para nómadas.",
    healthcareNote: "Seguro do empregador ou privado; custos diretos muito elevados.",
    incomeTaxNote: "Federal; os estados acrescentam 0–13,3% por cima.",
    vatNote: "Sem IVA; imposto estadual e local sobre vendas ~0–10%.",
    socialNote: "FICA (Social Security + Medicare).",
    cgNote: "Longo prazo 0/15/20% + 3,8% de NIIT.",
    visaNotes: [
      "Baseado em sorteio, patrocinado pelo empregador.",
      "Para talento de topo; sem sorteio.",
      null
    ]
  },
  "GB": {
    summary: "Via Skilled Worker por pontos; Global Talent para profissionais de topo.",
    visaFreeNote: "Visitas curtas sem visto para UE/EUA/muitos; trabalhar exige visto.",
    healthcareNote: "NHS; os residentes pagam uma sobretaxa de saúde com o visto.",
    incomeTaxNote: "Acresce a National Insurance.",
    socialNote: "National Insurance.",
    visaNotes: [
      "Oferta de emprego de um patrocinador licenciado.",
      null,
      null
    ]
  },
  "FR": {
    summary: "Talent Passport para trabalhadores qualificados, fundadores e investigadores.",
    visaFreeNote: "Schengen: 90/180 dias sem visto para muitos passaportes.",
    nomadNote: "Sem visto dedicado; existe a via de profession libérale.",
    healthcareNote: "Universal (PUMA) após residência.",
    incomeTaxNote: "Acrescem elevados encargos sociais.",
    socialNote: "Entre os mais elevados da OCDE.",
    cgNote: "'PFU' de taxa fixa sobre rendimentos de investimento.",
    visaNotes: [
      "Trabalhadores qualificados, fundadores, investidores.",
      null
    ]
  },
  "DE": {
    summary: "EU Blue Card e o novo Opportunity Card (procura de emprego por pontos).",
    visaFreeNote: "Schengen 90/180 para muitos; trabalhar exige autorização.",
    nomadNote: "A autorização de residência Freiberufler é a via comum.",
    healthcareNote: "Legal (GKV) ou privado (PKV); obrigatório.",
    incomeTaxNote: "Acresce 5,5% de sobretaxa de solidariedade sobre rendimentos altos.",
    socialNote: "Saúde, pensão, dependência, desemprego.",
    cgNote: "Abgeltungsteuer de taxa fixa, incluindo solidariedade.",
    visaNotes: [
      "Diploma + limiar salarial.",
      "Por pontos, para procura de emprego.",
      null
    ]
  },
  "NL": {
    summary: "Regime Highly Skilled Migrant; via do tratado DAFT para empreendedores dos EUA.",
    visaFreeNote: "Schengen 90/180 para muitos passaportes.",
    healthcareNote: "Seguro de base privado obrigatório.",
    socialNote: "Integrado nos escalões do imposto sobre o rendimento.",
    cgNote: "A Box 3 tributa um rendimento presumido sobre o património.",
    visaNotes: [
      "Patrocinador reconhecido + limiar salarial.",
      null
    ]
  },
  "IE": {
    summary: "Critical Skills Employment Permit para funções em procura.",
    visaFreeNote: "Common Travel Area com o Reino Unido; estadias curtas sem visto para muitos.",
    incomeTaxNote: "Acrescem a USC e a PRSI.",
    socialNote: "PRSI.",
    visaNotes: [
      null,
      null
    ]
  },
  "ES": {
    summary: "O Digital Nomad Visa e o visto não lucrativo são vias populares para expatriados.",
    visaFreeNote: "Schengen 90/180 para muitos passaportes.",
    visaNotes: [
      "Rendimento remoto + opção fiscal da lei Beckham.",
      "Comprovativo de rendimento passivo."
    ]
  },
  "PT": {
    summary: "Vistos D8 para nómadas digitais e D7 de rendimento passivo; um destino de topo para relocalização.",
    visaFreeNote: "Schengen 90/180 para muitos passaportes.",
    taxNotes: [
      "O IFICI ('NHR 2.0') dá benefícios fiscais a alguns recém-chegados qualificados."
    ],
    visaNotes: [
      "Trabalhadores remotos.",
      null
    ]
  },
  "IT": {
    summary: "Autorizações de trabalho por quotas (Decreto Flussi); nova via para nómadas digitais.",
    visaFreeNote: "Schengen 90/180 para muitos passaportes.",
    incomeTaxNote: "Acrescem sobretaxas regionais/municipais.",
    taxNotes: [
      "Regimes de taxa fixa para novos residentes e trabalhadores impatriados."
    ],
    visaNotes: [
      null,
      "Rendimento passivo."
    ]
  },
  "CH": {
    summary: "Sistema de quotas; mais fácil para nacionais da UE/EFTA do que de países terceiros.",
    visaFreeNote: "Schengen 90/180 para muitos passaportes.",
    incomeTaxNote: "Federal + cantão + município; varia muito.",
    cgNote: "As mais-valias privadas são geralmente isentas de imposto.",
    visaNotes: [
      "Patrocinado pelo empregador, limitado por quotas.",
      null
    ]
  },
  "CA": {
    summary: "Sistema de pontos Express Entry; Provincial Nominee Programs.",
    visaFreeNote: "eTA para visitas curtas de muitos países.",
    residencyNote: "PR via Express Entry; cidadania após cerca de 3 anos.",
    nomadNote: "Estadia de 6 meses para trabalhadores remotos anunciada no âmbito do Tech Talent.",
    healthcareNote: "Cobertura provincial após residência.",
    incomeTaxNote: "Federal; as províncias acrescentam ~10–25%.",
    vatNote: "GST 5% + provincial (HST/PST até ~15%).",
    cgNote: "50%+ das mais-valias incluídas no rendimento.",
    visaNotes: [
      null,
      null
    ]
  },
  "AE": {
    summary: "Vistos de empregador, autorizações de freelancer e o Golden Visa de 10 anos.",
    visaFreeNote: "Visto à chegada para muitos; residência ligada ao emprego ou à propriedade.",
    healthcareNote: "Fornecido pelo empregador ou privado; obrigatório nalguns emirados.",
    incomeTaxNote: "Sem imposto sobre o rendimento das pessoas singulares.",
    visaNotes: [
      "10 anos para investidores/talento.",
      "1 ano, rendimento remoto.",
      null
    ]
  },
  "SG": {
    summary: "Employment Pass para profissionais; ONE Pass para quem ganha mais.",
    visaFreeNote: "Visitas curtas sem visto para muitos passaportes.",
    residencyNote: "PR possível após alguns anos com EP.",
    vatNote: "GST.",
    cgNote: "Sem imposto sobre mais-valias.",
    visaNotes: [
      "Limiar salarial + pontos (COMPASS).",
      "Para quem ganha muito / talento de topo."
    ]
  },
  "JP": {
    summary: "Vistos de trabalho por categoria; sistema de pontos Highly Skilled Professional.",
    visaFreeNote: "Visitas curtas sem visto para muitos; trabalhar exige um estatuto de residência.",
    residencyNote: "Mais cedo através dos pontos HSP.",
    incomeTaxNote: "Acresce ~10% de imposto local de residente.",
    vatNote: "Imposto sobre o consumo.",
    visaNotes: [
      null,
      "Por pontos, PR acelerada.",
      null
    ]
  },
  "AU": {
    summary: "Migração qualificada por pontos; vistos patrocinados pelo empregador.",
    visaFreeNote: "ETA/eVisitor para visitas curtas de muitos países.",
    incomeTaxNote: "Acresce 2% de Medicare levy.",
    vatNote: "GST.",
    cgNote: "Tributadas como rendimento; desconto de 50% se detidas 1 ano ou mais.",
    visaNotes: [
      null,
      null
    ]
  },
  "TH": {
    summary: "Visto Long-Term Resident, visto Elite e o novo DTV para nómadas.",
    visaFreeNote: "Estadias curtas isentas de visto para muitos passaportes.",
    nomadNote: "DTV, múltiplas entradas por 5 anos.",
    visaNotes: [
      "5 anos, trabalhadores remotos.",
      "Profissionais ricos/qualificados."
    ]
  },
  "MX": {
    summary: "Visto de Residente Temporário por rendimento/poupança; popular entre nómadas.",
    visaFreeNote: "Entrada turística de 180 dias para muitos passaportes.",
    nomadNote: "De facto, através da Residência Temporária.",
    visaNotes: [
      "Comprovativo de rendimento ou poupança; até 4 anos.",
      null
    ]
  },
  "PL": {
    summary: "Autorização de trabalho Tipo A e EU Blue Card; faz parte de Schengen.",
    visaFreeNote: "Schengen 90/180 para muitos passaportes.",
    incomeTaxNote: "Acresce 4% de contribuição de solidariedade sobre rendimentos altos.",
    visaNotes: [
      null,
      null
    ]
  },
  "AR": {
    summary: "Vias Rentista e para nómadas digitais; um caminho relativamente aberto à residência.",
    visaFreeNote: "Entrada turística de 90 dias para muitos passaportes.",
    taxNotes: [
      "Inflação elevada; os valores mudam depressa."
    ],
    visaNotes: [
      null,
      null
    ]
  },
  "IN": {
    summary: "Visto de emprego para funções qualificadas; as vias de longo prazo são limitadas.",
    visaFreeNote: "e-Visa para turismo de muitos países.",
    incomeTaxNote: "Acrescem sobretaxa + 4% de cess (efetivo até ~39%).",
    vatNote: "Escalões de GST.",
    cgNote: "12,5% longo prazo / 20% curto prazo (ações cotadas).",
    visaNotes: [
      "Aplica-se um limiar salarial.",
      null
    ]
  },
  "KG": {
    summary: "Base barata e de baixa tributação; e-visa simples e longas estadias sem visto para muitos.",
    visaFreeNote: "Sem visto até 60 dias para muitos passaportes (EUA, UE, Reino Unido…).",
    residencyNote: "Residência fiscal após 183 dias.",
    nomadNote: "Sem visto dedicado, mas as longas estadias sem visto convêm a trabalhadores remotos.",
    healthcareNote: "Sistema público básico; os expatriados usam clínicas privadas.",
    incomeTaxNote: "Imposto sobre o rendimento de taxa fixa de 10%.",
    taxNotes: [
      "Um dos regimes de taxa fixa mais baixos da região."
    ],
    visaNotes: [
      "Quota patrocinada pelo empregador.",
      "Renovável anualmente."
    ]
  }
};

export default pt;
