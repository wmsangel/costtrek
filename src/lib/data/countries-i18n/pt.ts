import type { CountryText } from "./index";

const pt: Record<string, CountryText> = {
  "MY": { summary: "O passe de nómada DE Rantau (2022) e o programa de longa estadia MM2H (Malaysia My Second Home).", visaFreeNote: "Estadias curtas sem visto (até 90 dias) para muitos passaportes.", nomadNote: "Passe DE Rantau, lançado em 2022.", healthcareNote: "Hospitais privados acessíveis e de alta qualidade; um polo de turismo médico.", vatNote: "SST (imposto sobre vendas e serviços); sem IVA generalizado.", visaNotes: ["Trabalhadores remotos/freelancers da área tecnológica; renovável.", "Longa estadia com prova de poupanças/rendimentos.", "Patrocinado pelo empregador."] },
  "VN": { summary: "Sem visto de nómada dedicado; longa estadia através de um e-visa de 90 dias, residência temporária ou autorização de trabalho.", visaFreeNote: "Isenção de visto de 45 dias para alguns passaportes; e-visa de 90 dias para a maioria.", nomadNote: "Sem visto dedicado; as renovações de e-visa são comuns.", healthcareNote: "Sistema público mais clínicas privadas/internacionais em crescimento; recomenda-se seguro.", vatNote: "IVA (GTGT).", visaNotes: ["Múltiplas entradas; usado de facto por trabalhadores remotos.", "Por via de trabalho, investimento ou família.", "Patrocinado pelo empregador."] },
  "KR": { summary: "Visto E-7 de trabalhadores qualificados por pontos e vias de residência F-2; um visto de nómada workation (F-1-D) foi lançado em 2024.", visaFreeNote: "K-ETA ou estadias curtas sem visto para muitos passaportes.", nomadNote: "Visto de workation F-1-D, 2024.", healthcareNote: "Excelente NHIS universal; os expatriados inscrevem-se ao fim de cerca de 6 meses.", visaNotes: ["2024; trabalhadores remotos, rendimento de cerca de 65 mil $/ano.", "Patrocinado pelo empregador, com lista de profissões.", null] },
  "CZ": { summary: "O EU Blue Card e o Employee Card; o živnostenský list (licença de atividade) é a via clássica para freelancers e nómadas.", visaFreeNote: "Schengen 90/180 para muitos passaportes.", nomadNote: "Programa de 2023 para nacionalidades selecionadas na área de TI.", healthcareNote: "Seguro público obrigatório; alta qualidade e acessível.", incomeTaxNote: "15% de base, 23% acima de cerca de 3× o salário médio.", visaNotes: ["Residência + autorização de trabalho ligadas ao empregador.", null, "Via de trabalho por conta própria usada pelos nómadas.", "Programa de 2023 para nacionalidades selecionadas na área de TI."] },
  "AT": { summary: "O Red-White-Red Card por pontos para trabalhadores qualificados; o EU Blue Card.", visaFreeNote: "Schengen 90/180 para muitos passaportes.", nomadNote: "Sem visto dedicado.", healthcareNote: "Seguro estatutário universal; consistentemente entre os melhores classificados.", visaNotes: ["Por pontos, para trabalhadores qualificados.", null, null] },
  "HU": { summary: "Um imposto único de 15% sobre o rendimento e a autorização de residência para nómadas digitais White Card.", visaFreeNote: "Schengen 90/180 para muitos passaportes.", nomadNote: "Autorização de residência White Card.", healthcareNote: "Sistema público; os expatriados juntam muitas vezes clínicas privadas.", vatNote: "Os 27% são o IVA mais alto da UE.", taxNotes: ["O imposto sobre sociedades de 9% é o mais baixo da UE."], visaNotes: ["Trabalhadores remotos, rendimento de cerca de 3 000 $/mês.", null, null] },
  "GR": { summary: "O Golden Visa (imóvel) e um visto de nómada digital com um benefício fiscal de 50% para novos residentes.", visaFreeNote: "Schengen 90/180 para muitos passaportes.", nomadNote: "Visto de nómada digital + benefício fiscal de 50%.", healthcareNote: "Sistema público ESY; a saúde privada é comum entre os expatriados.", taxNotes: ["Isenção de 50% do imposto sobre o rendimento durante 7 anos para novos residentes fiscais elegíveis."], visaNotes: ["Trabalhadores remotos, 3 500 €/mês; benefício fiscal de 50% sobre o rendimento.", "Investimento imobiliário de 250 000 a 800 000 €.", null] },
  "EE": { summary: "Pioneira do Digital Nomad Visa e da e-Residency; um sistema simples e digital em primeiro lugar.", visaFreeNote: "Schengen 90/180 para muitos passaportes.", nomadNote: "Lançou o primeiro DNV da Europa, em 2020.", healthcareNote: "Seguro público; a saúde mais digital da UE.", incomeTaxNote: "Taxa única; subiu para 22% em 2025.", taxNotes: ["Imposto sobre sociedades ao estilo estónio — cobrado apenas sobre o lucro distribuído."], visaNotes: ["O DNV original (2020); trabalhadores remotos, 4 500 €/mês.", "Gerir uma empresa da UE à distância — não é uma autorização de residência.", null] },
  "ID": { summary: "A nova KITAS de Trabalhador Remoto E33G (2024), além de um visto Second Home para reformados e investidores.", visaFreeNote: "Visto à chegada (30 dias, renovável uma vez) para muitos passaportes.", nomadNote: "KITAS de Trabalhador Remoto E33G, lançada em 2024.", healthcareNote: "Sistema público BPJS; os expatriados recorrem a hospitais privados ou a seguros internacionais.", incomeTaxNote: "Escalões de 5/15/25/30/35 %.", vatNote: "PPN; a caminho dos 12 %.", visaNotes: ["1 ano; o rendimento estrangeiro não é tributado localmente.", "5 a 10 anos; exige poupanças ou aquisição de imóvel.", "Patrocinado pelo empregador."] },
  "CO": { summary: "O visto de Nómada Digital tipo V e os vistos de migrante tipo M fazem dela uma base latino-americana popular e acessível.", visaFreeNote: "90 dias sem visto (renováveis até 180 por ano) para muitos passaportes.", nomadNote: "Visto de Nómada Digital tipo V, desde 2022.", healthcareNote: "Sistema público EPS; a saúde privada é de alta qualidade e barata.", vatNote: "IVA.", visaNotes: ["Até 2 anos; rendimento de cerca de 1 000 $/mês.", "Vias de trabalho, casamento ou investimento.", null] },
  "GE": { summary: "Um ano inteiro de estadia sem visto para muitas nacionalidades, um célebre imposto de 1% para pequenos negócios e o programa Remotely from Georgia.", visaFreeNote: "Sem visto até 365 dias para cidadãos de cerca de 95 países.", nomadNote: "Remotely from Georgia, além da estadia de 1 ano sem visto.", healthcareNote: "Programa de saúde universal; as clínicas privadas são baratas; recomenda-se seguro.", incomeTaxNote: "Regime de pequenos negócios de 1% sobre a faturação até cerca de 155 mil GEL.", taxNotes: ["Imposto sobre sociedades ao estilo estónio — cobrado apenas sobre o lucro distribuído."], visaNotes: ["Cerca de 95 nacionalidades; base de nómadas de facto.", "Trabalhadores remotos, rendimento de cerca de 2 000 $/mês.", null] },
  "BR": { summary: "O visto de Nómada Digital VITEM XIV; residência por investimento, reforma ou laços familiares.", visaFreeNote: "90 dias sem visto (renováveis) para UE/R.U.; EUA/CA/AU precisam de e-visa (2025).", nomadNote: "VITEM XIV, desde 2022.", healthcareNote: "SUS universal e gratuito; os expatriados costumam juntar um plano privado.", vatNote: "IVA estadual ICMS de cerca de 17–20 %; mais o PIS/COFINS federal.", visaNotes: ["1 ano, renovável; rendimento de cerca de 1 500 $/mês.", "Investimento empresarial de cerca de 500 mil R$.", null] },
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
