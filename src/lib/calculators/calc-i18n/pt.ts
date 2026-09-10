import type { CalcText } from "./index";

const pt: Record<string, CalcText> = {
  "mortgage-calculator": {
    title: "Calculadora de Crédito Habitação",
    excerpt: "Estime a prestação mensal do seu crédito habitação — capital, juros, impostos e seguro — e veja quanto do empréstimo corresponde a juros ao longo da sua vida.",
    intent: "Calcule a prestação mensal de um crédito habitação antes de pedir financiamento.",
    intro: [
      "Esta calculadora de crédito habitação mostra o custo mensal total de um empréstimo para habitação: capital e juros, mais imposto sobre o imóvel, seguro multirriscos e condomínio opcionais. Ajuste o preço, a entrada, a taxa de juro e o prazo para ver a prestação a atualizar-se instantaneamente.",
      "O cálculo é uma amortização padrão de taxa fixa — exato, não uma estimativa. Os únicos valores que variam na prática são a taxa que o banco lhe oferece e os seus impostos e seguros locais, razão pela qual comparar alguns bancos antes de fixar uma taxa pode poupar milhares ao longo da vida do empréstimo.",
    ],
    notes: [
      "Uma entrada maior reduz tanto o montante do empréstimo como, muitas vezes, a taxa de juro — e uma entrada de 20% ou mais costuma evitar o seguro hipotecário privado (PMI).",
      "Um prazo mais curto (15 vs 30 anos) significa uma prestação mensal mais alta, mas muito menos juros no total.",
      "Mesmo uma diferença de 0,5% na taxa vale milhares ao longo de 30 anos — compare sempre as propostas.",
    ],
    faq: [
      {
        q: "Como é calculada a prestação mensal do crédito habitação?",
        a: "Utiliza a fórmula de amortização padrão M = P·r / (1 − (1 + r)^−n), em que P é o montante do empréstimo, r é a taxa de juro mensal (taxa anual ÷ 12) e n é o número de prestações mensais (anos × 12). O imposto sobre o imóvel, o seguro e o condomínio são acrescentados por cima.",
      },
      {
        q: "Isto inclui o imposto sobre o imóvel e o seguro?",
        a: "Sim — de forma opcional. Introduza o imposto anual sobre o imóvel e o seguro multirriscos e qualquer condomínio mensal, e estes são somados à prestação de capital e juros para mostrar o seu custo mensal real.",
      },
      {
        q: "O que é o PMI e está incluído?",
        a: "O seguro hipotecário privado (PMI) é normalmente exigido quando a sua entrada é inferior a 20%. Esta calculadora não adiciona o PMI automaticamente; se o seu banco o exigir, inclua-o no campo do seguro.",
      },
      {
        q: "Porque é que grande parte da minha prestação inicial vai para juros?",
        a: "Com a amortização, os juros incidem sobre o capital em dívida, que é mais elevado no início. As primeiras prestações são maioritariamente juros e vão passando para capital ao longo do tempo — a repartição anual mostra isto.",
      },
    ],
    offersHeading: "Compare propostas de crédito habitação",
    offers: [
      {
        name: "Compare taxas de crédito habitação",
        blurb: "As taxas variam de banco para banco — comparar algumas propostas antes de fixar pode poupar milhares ao longo da vida do empréstimo.",
        cta: "Comparar taxas",
      },
      {
        name: "Obtenha uma pré-aprovação online",
        blurb: "Veja quanto pode pedir emprestado e fixe uma taxa com uma pré-aprovação online rápida.",
        cta: "Verificar elegibilidade",
      },
      {
        name: "Refinancie um crédito habitação existente",
        blurb: "Se as taxas desceram desde que comprou, refinanciar pode reduzir a sua prestação mensal.",
        cta: "Ver taxas de refinanciamento",
      },
    ],
  },
  "loan-calculator": {
    title: "Calculadora de Empréstimos",
    excerpt: "Calcule a prestação mensal, o total de juros e o custo total de um empréstimo pessoal, para estudantes ou de uso geral.",
    intent: "Veja a prestação mensal real e o custo total de um empréstimo antes de contrair a dívida.",
    intro: [
      "Esta calculadora de empréstimos converte um montante, uma taxa de juro (TAEG) e um prazo numa prestação mensal — e, tão importante quanto isso, mostra quantos juros vai pagar ao longo da vida do empréstimo. Utilize-a para empréstimos pessoais, empréstimos para estudantes, consolidação de dívidas ou qualquer crédito ao consumo de taxa fixa.",
      "O único número que vale a pena vigiar é o total de juros: uma prestação mensal mais baixa devido a um prazo mais longo significa quase sempre que paga muito mais no total. Comparar alguns bancos pela TAEG, e não apenas pelo valor mensal, é onde estão as verdadeiras poupanças.",
    ],
    notes: [
      "A TAEG agrupa a taxa de juro com a maioria dos encargos, sendo por isso o número mais justo para comparar entre bancos.",
      "Um prazo mais longo reduz a prestação mensal, mas aumenta o total de juros — por vezes de forma drástica.",
      "Pagar um pouco a mais todos os meses vai diretamente para o capital e encurta o empréstimo.",
    ],
    faq: [
      {
        q: "Como é calculada a prestação mensal do empréstimo?",
        a: "Utiliza a fórmula de amortização padrão: o montante do empréstimo multiplicado pela taxa mensal, dividido por um menos (um mais a taxa mensal) elevado a menos o número de prestações. A taxa mensal é a TAEG dividida por 12; o número de prestações é o prazo em meses.",
      },
      {
        q: "Qual é a diferença entre taxa de juro e TAEG?",
        a: "A taxa de juro é o custo de pedir emprestado o capital; a TAEG inclui também a maioria dos encargos do banco, refletindo assim o verdadeiro custo anual. Compare os empréstimos pela TAEG.",
      },
      {
        q: "Um prazo mais longo poupa-me dinheiro?",
        a: "Não — reduz a prestação mensal, mas aumenta o total de juros que paga. Um prazo mais curto custa mais por mês, mas menos no total.",
      },
    ],
    offersHeading: "Compare propostas de empréstimo",
    offers: [
      {
        name: "Compare taxas de empréstimos pessoais",
        blurb: "Consulte taxas de vários bancos em minutos, sem afetar a sua avaliação de crédito.",
        cta: "Comparar taxas",
      },
      {
        name: "Consolide dívidas com juros elevados",
        blurb: "Um único empréstimo com taxa mais baixa pode reduzir os juros que paga nos cartões de crédito.",
        cta: "Ver opções",
      },
      {
        name: "Consulte a sua taxa online",
        blurb: "Obtenha uma estimativa de taxa personalizada com uma consulta de crédito ligeira.",
        cta: "Verificar elegibilidade",
      },
    ],
  },
  "car-loan-calculator": {
    title: "Calculadora de Crédito Automóvel",
    excerpt: "Estime a prestação mensal do seu automóvel, incluindo entrada, retoma e imposto sobre vendas — e o custo total do financiamento.",
    intent: "Conheça o custo mensal real de um carro, com imposto e juros incluídos, antes de ir ao stand.",
    intro: [
      "Esta calculadora de crédito automóvel mostra a prestação mensal de um empréstimo para automóvel após a sua entrada e retoma, com o imposto sobre vendas incorporado no montante financiado. Ajuste o preço, o prazo e a TAEG para ver como a prestação e o total de juros mudam.",
      "Os stands gostam de negociar pela prestação mensal — mas uma prestação baixa pode esconder um prazo longo e milhares em juros adicionais. Concentre-se no montante financiado e no total de juros, e não apenas no valor por mês.",
    ],
    notes: [
      "Na maioria dos estados dos EUA, o imposto sobre vendas incide sobre o preço menos a sua retoma — razão pela qual uma retoma também pode reduzir o seu imposto.",
      "Prazos automóveis mais longos (72–84 meses) reduzem a prestação, mas pode acabar a dever mais do que o carro vale.",
      "Uma entrada maior reduz tanto o empréstimo como os juros que paga.",
    ],
    faq: [
      {
        q: "O imposto sobre vendas está incluído na prestação do automóvel?",
        a: "Sim. Esta calculadora adiciona o imposto sobre vendas (sobre o preço menos a retoma, tal como a maioria dos estados dos EUA o aplica) ao montante financiado e depois calcula a prestação mensal sobre esse total.",
      },
      {
        q: "Como é que uma retoma afeta a prestação?",
        a: "O valor da sua retoma reduz tanto o montante que financia como, na maioria dos estados, o valor tributável — pelo que reduz a prestação e o imposto sobre vendas.",
      },
      {
        q: "Que prazo devo escolher?",
        a: "Prazos mais curtos custam mais por mês, mas muito menos em juros totais e reduzem o risco de capital negativo. Compare o total de juros entre prazos, e não apenas a prestação mensal.",
      },
    ],
    offersHeading: "Financie e segure o seu carro",
    offers: [
      {
        name: "Compare taxas de crédito automóvel",
        blurb: "Pré-qualifique-se com vários bancos para superar a proposta de financiamento do stand.",
        cta: "Comparar taxas",
      },
      {
        name: "Obtenha orçamentos de seguro automóvel",
        blurb: "Compare coberturas de várias seguradoras num só lugar e mude para poupar.",
        cta: "Obter orçamentos",
      },
      {
        name: "Refinancie o seu crédito automóvel",
        blurb: "Se a sua avaliação de crédito melhorou, refinanciar pode reduzir a sua taxa e prestação.",
        cta: "Ver taxas de refinanciamento",
      },
    ],
  },
  "salary-calculator": {
    title: "Calculadora de Salário",
    excerpt: "Estime o seu salário líquido nos EUA após o imposto federal e a FICA, e converta entre remuneração horária, semanal, mensal e anual.",
    intent: "Converta um salário ou vencimento bruto no salário líquido real por ordenado.",
    intro: [
      "Esta calculadora de salário estima o seu salário líquido para o ano fiscal de 2024 nos EUA, utilizando os escalões federais reais do IRS, a dedução padrão e a FICA (Social Security e Medicare). Introduza qualquer período de pagamento — horário, semanal, mensal ou anual — e ela converte-o num salário e num valor líquido equivalentes.",
      "É uma estimativa, não um recibo de vencimento: exclui créditos fiscais, deduções específicas e as inúmeras regras próprias de cada estado, pelo que o imposto estadual é aplicado como uma taxa fixa que introduz. Para um valor exato, confirme com a sua entidade empregadora ou um profissional de fiscalidade.",
    ],
    notes: [
      "A FICA é de 7,65% (6,2% de Social Security até ao limite anual de rendimentos, mais 1,45% de Medicare) por cima do imposto sobre o rendimento.",
      "Contribuições antes de impostos, como um 401(k) ou HSA, reduzem o seu rendimento tributável — e o seu líquido — mas constroem poupança.",
      "A taxa de imposto efetiva é o seu imposto total dividido pela remuneração bruta; é sempre inferior ao seu escalão mais alto.",
    ],
    faq: [
      {
        q: "Como é calculado o salário líquido?",
        a: "A remuneração bruta menos as deduções antes de impostos dá os rendimentos tributáveis; subtraímos a dedução padrão, aplicamos os escalões federais de 2024 para o seu estado civil fiscal, adicionamos a FICA sobre os rendimentos brutos e aplicamos a taxa estadual que introduziu. O que sobra é o seu valor líquido estimado.",
      },
      {
        q: "Que ano de escalões fiscais utiliza?",
        a: "O ano fiscal federal de 2024 nos EUA: os escalões marginais do IRS, a dedução padrão ($14,600 para solteiro / $29,200 para casados com declaração conjunta) e as taxas e o limite de rendimentos da FICA de 2024.",
      },
      {
        q: "Porque é que não corresponde exatamente ao meu recibo de vencimento?",
        a: "Os recibos de vencimento reais refletem créditos, deduções específicas, impostos locais, escolhas de benefícios e retenções próprias da entidade empregadora. Esta é uma estimativa simplificada — encare-a como um guia próximo, não como um valor exato.",
      },
    ],
    offersHeading: "Faça o seu ordenado render mais",
    offers: [
      {
        name: "Conta poupança de alto rendimento",
        blurb: "Ganhe mais com o dinheiro parado na sua conta à ordem com uma das melhores taxas de poupança online.",
        cta: "Comparar contas",
      },
      {
        name: "Entregue os seus impostos online",
        blurb: "Obtenha todos os créditos e deduções a que tem direito com um software fiscal online simples.",
        cta: "Começar a declarar",
      },
      {
        name: "Banco online sem comissões",
        blurb: "Evite comissões mensais e receba o ordenado até dois dias mais cedo com uma conta à ordem moderna.",
        cta: "Ver contas",
      },
    ],
  },
  "electricity-cost-calculator": {
    title: "Calculadora de Custo de Eletricidade",
    excerpt: "Veja quanto custa pôr qualquer eletrodoméstico a funcionar — por dia, mês e ano — a partir da sua potência e do seu preço da eletricidade.",
    intent: "Descubra quanto custa realmente pôr um eletrodoméstico a funcionar e onde reduzir a fatura.",
    intro: [
      "Esta calculadora de eletricidade converte a potência de um eletrodoméstico (em watts), o tempo que o utiliza e o seu preço por quilowatt-hora num custo de funcionamento por dia, mês e ano. É a forma mais rápida de identificar quais os aparelhos que fazem subir discretamente a sua fatura de eletricidade.",
      "O cálculo é simples e exato: watts ÷ 1.000 × horas dá os quilowatts-hora, e kWh × a sua tarifa dá o custo. As surpresas vêm das coisas deixadas ligadas o dia todo — aquecedores, frigoríficos antigos, ar condicionado — onde pequenos custos por hora se acumulam depressa.",
    ],
    notes: [
      "Encontre a potência de um eletrodoméstico na etiqueta ou no manual; para aquecimento e arrefecimento é normalmente o maior número da sua casa.",
      "O seu preço por kWh está na fatura de eletricidade — varia muito consoante o país e o fornecedor.",
      "Os aparelhos sempre ligados e de aquecimento/arrefecimento dominam as faturas; mudar de fornecedor ou de tarifa pode reduzir a própria tarifa.",
    ],
    faq: [
      {
        q: "Como calculo o custo de pôr um eletrodoméstico a funcionar?",
        a: "Multiplique a potência em watts pelas horas de utilização e divida por 1.000 para obter os quilowatts-hora (kWh), depois multiplique pelo seu preço por kWh. Esta calculadora fá-lo automaticamente para um dia, mês e ano.",
      },
      {
        q: "Onde encontro a potência de um eletrodoméstico?",
        a: "Na etiqueta de características (muitas vezes na parte de trás ou na base) ou no manual. Se só estiverem indicados volts e amperes, multiplique-os para obter os watts.",
      },
      {
        q: "O que consome mais eletricidade em casa?",
        a: "O aquecimento, o arrefecimento e tudo o que funciona de forma constante — aquecedores elétricos, ar condicionado, esquentadores/termoacumuladores e frigoríficos mais antigos — representam normalmente a maior parte de uma fatura.",
      },
    ],
    offersHeading: "Reduza a sua fatura de energia",
    offers: [
      {
        name: "Compare tarifários de eletricidade",
        blurb: "Mudar de fornecedor ou de tarifa pode reduzir o valor que paga por kWh — compare em minutos.",
        cta: "Comparar tarifários",
      },
      {
        name: "Obtenha orçamentos de painéis solares",
        blurb: "Veja quanto o solar no telhado poderia poupar na sua fatura com orçamentos locais gratuitos.",
        cta: "Obter orçamentos",
      },
      {
        name: "Dispositivos inteligentes de poupança de energia",
        blurb: "Tomadas e termostatos inteligentes reduzem o custo dos aparelhos sempre ligados.",
        cta: "Ver dispositivos",
      },
    ],
  },
  "take-home-pay-calculator": {
    title: "Calculadora de Salário Líquido por País",
    excerpt: "Veja o seu salário líquido após o imposto sobre o rendimento e as contribuições sociais nos EUA, Reino Unido, Alemanha, França e mais — escolha um país e introduza o seu salário bruto.",
    intent: "Converta um salário bruto no salário líquido real num país à escolha.",
    intro: [
      "Esta calculadora estima o seu salário líquido — o que realmente chega à sua conta após o imposto sobre o rendimento e as contribuições sociais do trabalhador — em dez países importantes. Escolha um país, introduza o seu salário bruto anual ou mensal na moeda local e veja o valor líquido, a divisão entre imposto e contribuições sociais e a sua taxa efetiva de imposto.",
      "Modela os escalões de imposto de referência de cada país para 2025, acrescentando os principais ajustes-padrão (deduções pessoais, créditos de imposto gerais e regras das contribuições sociais), e está calibrada para ficar a poucos pontos percentuais dos valores líquidos oficiais. É uma estimativa aproximada para um único trabalhador, não um recibo de vencimento: não inclui dependentes, créditos pessoais, deduções discriminadas nem variações regionais, por isso confirme tudo o que for importante com um profissional.",
    ],
    notes: [
      "A taxa efetiva de imposto é o total de imposto e contribuições sociais dividido pelo salário bruto — é sempre inferior ao escalão marginal mais alto.",
      "O mesmo salário bruto proporciona estilos de vida muito diferentes depois de considerar o custo de vida — compare cidades e países noutras secções do CostTrek.",
      "As contribuições sociais financiam muitas vezes pensões e cuidados de saúde, por isso uma dedução mais elevada não é uma perda pura.",
    ],
    faq: [
      {
        q: "Como é calculado o salário líquido?",
        a: "Partimos do seu salário bruto, aplicamos a dedução básica e as deduções-padrão do país, percorremos os escalões progressivos do imposto sobre o rendimento, somamos as contribuições sociais do trabalhador e subtraímos ambos ao valor bruto. O que sobra é o seu salário líquido estimado.",
      },
      {
        q: "Que países e ano abrange?",
        a: "Dez países — os EUA, o Reino Unido, a Alemanha, a França, a Espanha, a Itália, o Canadá, a Austrália, os Países Baixos e a Irlanda — com base nas regras nacionais aproximadas de 2025 para um único trabalhador.",
      },
      {
        q: "Porque é que não corresponde exatamente ao meu recibo de vencimento?",
        a: "O salário real reflete dependentes, créditos de imposto pessoais, opções de reforma, impostos regionais ou provinciais e retenções específicas da entidade empregadora. Esta é uma estimativa calibrada — um guia aproximado, não aconselhamento fiscal.",
      },
    ],
    offersHeading: "Faça o seu salário render mais",
    offers: [
      {
        name: "Envie dinheiro para o estrangeiro com a Wise",
        blurb: "A transferir o salário entre países? Obtenha a taxa de câmbio real e comissões baixas e transparentes.",
        cta: "Comparar custos de transferência",
      },
      {
        name: "Conta multimoeda",
        blurb: "Guarde e gaste em várias moedas com uma conta moderna pensada para expatriados e nómadas.",
        cta: "Ver contas",
      },
      {
        name: "Seguro de saúde internacional",
        blurb: "Proteja-se onde quer que trabalhe com um plano concebido para quem muda de país e trabalha remotamente.",
        cta: "Pedir orçamento",
      },
    ],
  },
};

export default pt;
