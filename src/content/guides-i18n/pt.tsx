import Link from "next/link";
import type { GuideContent } from "@/content/guides";

const pt: Record<string, GuideContent> = {
  "cost-of-living-index-explained": {
    title: "O que significa realmente um índice de custo de vida de 100",
    excerpt:
      "Todos os sites de comparação usam um número de «índice». Eis o que ele mede na verdade, porque é que a média dos EUA serve de base e como o interpretar sem se deixar enganar.",
    Body: ({ l }) => (
      <>
        <p>
          Se já visitou algum site de relocalização, viu uma cidade descrita com
          um único número — um índice de 62, ou 154, ou 100. Parece preciso, mas
          a maioria das pessoas não faz ideia do que está a contar. Eis a versão
          honesta.
        </p>
        <h2>A base é uma escolha, não uma lei da natureza</h2>
        <p>
          Um índice de custo de vida precisa de um ponto de referência. Na
          CostTrek, e na maioria das ferramentas em inglês, essa referência é{" "}
          <strong>a cidade norte-americana média, fixada em 100</strong>. Assim,
          uma cidade em 60 é cerca de 40% mais barata do que uma cidade americana
          típica; uma cidade em 150 é cerca de 50% mais cara. A base poderia
          igualmente ser Londres ou a média mundial — os números mudariam, mas a{" "}
          <em>ordenação</em> entre cidades manter-se-ia igual.
        </p>
        <h2>O que entra no número</h2>
        <p>
          Um bom índice combina vários cabazes de despesa, e não apenas a renda:
          habitação, alimentação e mercearia, transportes, serviços, saúde e bens
          e serviços do dia a dia. A habitação costuma ter o maior peso, porque é
          o custo maior e mais variável. É por isso que uma cidade pode parecer
          &quot;barata&quot; no conjunto, ao mesmo tempo que uma categoria
          específica — digamos, transportes ou saúde — é na verdade cara.
        </p>
        <h2>Leia a repartição, não só o título</h2>
        <p>
          O índice único é um ponto de partida, nunca a resposta. Duas cidades
          com o mesmo número global podem dar sensações completamente diferentes:
          uma com renda barata e comida cara, outra ao contrário. Abra sempre a
          repartição por categorias e pondere-a face à forma como <em>você</em>{" "}
          gasta. Um subúrbio dependente do carro e um centro bem servido de
          transportes vão pesar no seu orçamento em sítios muito diferentes.
        </p>
        <h2>Os índices são estimativas — trate-os como tal</h2>
        <p>
          Os preços mudam constantemente, as moedas oscilam e nenhum conjunto de
          dados está perfeitamente atualizado para todas as cidades. Use o índice
          para pré-selecionar e comparar e, depois, verifique os dois ou três
          custos que mais lhe importam — normalmente a renda e os impostos — numa
          fonte local e atualizada antes de se comprometer.
        </p>
        <p>
          Pronto para o ver em ação?{" "}
          <Link href={`/${l}`}>Compare quaisquer duas cidades</Link> ou explore as{" "}
          <Link href={`/${l}/best/cheapest`}>cidades mais baratas do nosso índice</Link>.
        </p>
      </>
    ),
  },
  "how-to-compare-cities-before-moving": {
    title: "Como comparar duas cidades antes de se mudar (uma lista prática)",
    excerpt:
      "A renda é o destaque, mas raramente é o que decide uma mudança. Uma forma passo a passo de comparar duas cidades que vai além do preço de tabela.",
    Body: ({ l }) => (
      <>
        <p>
          Escolher entre duas cidades costuma começar na renda e acabar no
          arrependimento, porque a renda é apenas uma linha de um orçamento muito
          mais longo. Eis uma sequência que apanha aquilo que as pessoas esquecem.
        </p>
        <h2>1. Comece pelo salário líquido, não pelo salário bruto</h2>
        <p>
          Um salário mais alto num país de impostos elevados pode deixá-lo com
          menos do que um salário modesto num sítio enxuto. Compare a{" "}
          <strong>taxa máxima de imposto sobre o rendimento</strong> e as
          contribuições sociais de cada país e depois pense em termos do que
          efetivamente cai na sua conta. As nossas{" "}
          <Link href={`/${l}/countries`}>páginas de países</Link> listam os
          valores de imposto de referência lado a lado.
        </p>
        <h2>2. Ancore-se na renda real, no bairro que escolheria</h2>
        <p>
          A renda média da cidade esconde enormes variações. Veja um T1 no{" "}
          <em>centro</em> face a <em>fora</em> do centro e seja honesto quanto ao
          sítio onde de facto viveria. Um trajeto 20 minutos mais longo pode
          reduzir a renda num terço.
        </p>
        <h2>3. Converta o seu estilo de vida, não só a renda</h2>
        <p>
          Some os custos que refletem a sua rotina: comer fora, passe de
          transportes, ginásio, serviços, internet. Quem cozinha em casa e anda
          de bicicleta vive uma cidade de forma completamente diferente de quem
          come fora e conduz. Use a ferramenta de equivalência salarial em
          qualquer{" "}
          <Link href={`/${l}`}>página de comparação</Link> para traduzir o seu
          rendimento atual naquilo de que precisaria para viver da mesma forma
          noutro sítio.
        </p>
        <h2>4. Pondere os fatores não monetários</h2>
        <p>
          Segurança, saúde, qualidade do ar, clima, velocidade da internet,
          língua e acesso a vistos não aparecem num valor de renda, mas moldam o
          dia a dia — e alguns são impeditivos. Uma cidade 30% mais barata mas que
          exige um visto que não consegue obter não é, na verdade, uma opção.
        </p>
        <h2>5. Confirme com locais</h2>
        <p>
          Os dados estreitam o campo; as pessoas confirmam-no. Assim que tiver uma
          lista curta de duas ou três, encontre um fórum ou um amigo no terreno e
          faça as perguntas incómodas — cauções, taxas escondidas, o quão difícil
          é mesmo encontrar apartamento.
        </p>
        <p>
          Um bom sítio para começar:{" "}
          <Link href={`/${l}/cost-of-living/lisbon-pt`}>Lisboa</Link>,{" "}
          <Link href={`/${l}/cost-of-living/berlin-de`}>Berlim</Link> ou{" "}
          <Link href={`/${l}/cost-of-living/bangkok-th`}>Banguecoque</Link> —
          depois compare a sua favorita com a sua terra.
        </p>
      </>
    ),
  },
  "salary-you-need-to-move-abroad": {
    title: "De quanto salário precisa realmente para se mudar para o estrangeiro?",
    excerpt:
      "A resposta honesta é «depende de onde» — mas há uma forma simples de transformar o seu rendimento atual num objetivo para qualquer lugar do mundo.",
    Body: ({ l }) => (
      <>
        <p>
          &quot;Quanto preciso de ganhar lá?&quot; é a pergunta por trás de toda a
          relocalização. A boa notícia: pode respondê-la num único cálculo,
          partindo de um salário que já compreende — o seu atual.
        </p>
        <h2>O método da equivalência</h2>
        <p>
          Para manter o mesmo nível de vida, multiplique o seu salário atual pela
          razão entre os dois índices de custo. Se a sua cidade tem um índice de
          100 e a nova cidade está em 70, precisa de cerca de{" "}
          <strong>70% do seu salário atual</strong> para viver da mesma forma. Se
          a nova cidade está em 150, precisa de cerca de mais 50%. Cada{" "}
          <Link href={`/${l}`}>página de comparação</Link> faz isto por si —
          introduza o seu salário e leia o equivalente.
        </p>
        <h2>Depois, ajuste para o imposto</h2>
        <p>
          A equivalência funciona sobre a <em>despesa</em>, mas você é pago em{" "}
          <em>bruto</em>. Um país com uma taxa máxima de 45% e encargos sociais
          pesados precisará de um número bruto maior para atingir o mesmo líquido
          do que um país com taxa fixa de 10%. Verifique as linhas de imposto de
          ambas as cidades antes de traduzir o valor numa proposta de emprego.
        </p>
        <h2>Não se esqueça dos custos pontuais</h2>
        <p>
          Mudar-se não é só orçamento mensal. Orçamente voos, uma caução (muitas
          vezes 1 a 3 meses de renda), taxas de visto, envio ou substituição de
          mobília e uma margem para as semanas antes de o seu rendimento começar.
          Uma regra prática: ter três a seis meses das despesas da nova cidade
          poupados antes de partir.
        </p>
        <h2>Onde o seu dinheiro rende mais</h2>
        <p>
          Se o objetivo é maximizar o poder de compra, olhe para cidades onde o
          mesmo dólar simplesmente compra mais — muitas ficam no Sudeste Asiático,
          na América Latina e na Europa Central. A nossa{" "}
          <Link href={`/${l}/best/cheapest`}>lista de cidades mais baratas</Link> e
          as{" "}
          <Link href={`/${l}/best/nomad`}>melhores cidades para nómadas digitais</Link>{" "}
          são uma forma rápida de as identificar.
        </p>
      </>
    ),
  },
  "cheapest-places-to-live-and-the-catch": {
    title: "Os lugares mais baratos para viver no mundo — e a armadilha",
    excerpt:
      "As rendas mínimas são reais, mas «barato» vem sempre com contrapartidas. O que procurar para além da etiqueta de preço quando um baixo custo de vida o tenta.",
    Body: ({ l }) => (
      <>
        <p>
          É genuinamente possível viver bem com uma fração de um orçamento
          ocidental. Mas as cidades mais baratas de qualquer índice partilham
          alguns padrões que vale a pena compreender antes de comprar um bilhete
          só de ida.
        </p>
        <h2>Porque são baratas</h2>
        <p>
          Um baixo custo de vida reflete normalmente salários locais mais baixos e
          uma moeda mais fraca, não uma refeição grátis. Isso é ótimo se o seu
          rendimento vem do estrangeiro — um emprego remoto ou poupanças — e muito
          menos ótimo se pensa ganhar localmente. A arbitragem só funciona num
          sentido.
        </p>
        <h2>As contrapartidas a verificar</h2>
        <ul>
          <li>
            <strong>Saúde</strong> — os sistemas públicos podem ser frágeis;
            orçamente seguro privado.
          </li>
          <li>
            <strong>Qualidade do ar &amp; infraestruturas</strong> — algumas
            megacidades de baixo custo têm poluição grave ou serviços pouco
            fiáveis.
          </li>
          <li>
            <strong>Vistos</strong> — uma cidade barata onde só pode ficar 30 dias
            não é um lar. Verifique as opções de residência e de nómada digital.
          </li>
          <li>
            <strong>Banca &amp; logística</strong> — transferir dinheiro, arranjar
            um SIM ou assinar um contrato de arrendamento pode ser mais difícil do
            que na sua terra.
          </li>
        </ul>
        <h2>Como usar bem uma lista de «mais baratas»</h2>
        <p>
          Trate-a como um gerador de pré-seleção, não como um veredicto. Pegue nas
          primeiras da nossa{" "}
          <Link href={`/${l}/best/cheapest`}>classificação de cidades mais baratas</Link>{" "}
          e depois abra a página de cada cidade e leia as secções de qualidade de
          vida e de vistos. Um sítio como{" "}
          <Link href={`/${l}/cost-of-living/bishkek-kg`}>Bishkek</Link> é
          espantosamente acessível, com um imposto fixo de 10% — mas vai querer
          pesar os invernos, a saúde e a conectividade face à poupança.
        </p>
        <p>
          A resposta certa é a cidade mais barata que continua a cumprir <em>as
          suas</em>{" "}
          exigências inegociáveis — não o número mais baixo da lista.
        </p>
      </>
    ),
  },
  "taxes-when-you-relocate": {
    title: "Impostos quando se muda: IRS, IVA e o que fica no seu bolso",
    excerpt:
      "Duas cidades podem ter rendas idênticas e salários líquidos radicalmente diferentes. Um percurso em linguagem simples pelos impostos que decidem quanto fica mesmo consigo.",
    Body: ({ l }) => (
      <>
        <p>
          O custo de vida diz-lhe quanto custam as coisas; os impostos dizem-lhe
          quanto tem, à partida, para gastar. Ignore-os e uma cidade
          &quot;mais barata&quot; pode discretamente deixá-lo mais pobre.
        </p>
        <h2>Imposto sobre o rendimento: a taxa máxima é só metade da história</h2>
        <p>
          Os países anunciam uma taxa marginal máxima — 10% no Quirguistão, 45% na
          Alemanha, 0% nos EAU. Mas a maioria dos sistemas é progressiva, pelo que
          só paga a taxa máxima sobre o rendimento acima de um limiar, e muitos
          acrescentam{" "}
          <strong>contribuições para a segurança social</strong> por cima que
          podem rivalizar com o imposto de referência. Compare tanto a linha do
          imposto sobre o rendimento como a linha social nas nossas{" "}
          <Link href={`/${l}/countries`}>páginas de países</Link>.
        </p>
        <h2>IVA / imposto sobre vendas: os 5–25% invisíveis</h2>
        <p>
          Os impostos sobre o consumo estão incorporados nos preços, por isso são
          fáceis de esquecer — mas vão de cerca de 5% a mais de 25%. Um país com
          imposto sobre o rendimento baixo mas um IVA de mais de 20% recupera uma
          parte disso na caixa. Importa sobretudo a quem gasta uma grande fatia do
          rendimento localmente.
        </p>
        <h2>Residência e a regra dos 183 dias</h2>
        <p>
          A maioria dos países considera-o residente fiscal assim que passa lá
          cerca de{" "}
          <strong>183 dias</strong> por ano — momento em que o seu rendimento
          mundial pode passar a ser tributável localmente. Se divide o tempo entre
          países, este é o número mais importante a compreender, e aquele que mais
          vale aconselhamento profissional.
        </p>
        <h2>Regimes especiais para recém-chegados</h2>
        <p>
          Vários países cortejam migrantes qualificados e trabalhadores remotos
          com esquemas de imposto reduzido — Portugal, Itália e outros já
          aplicaram versões destes. Podem alterar drasticamente as contas, mas têm
          condições e prazos de validade. Verifique as regras atuais antes de
          contar com eles.
        </p>
        <h2>A conclusão</h2>
        <p>
          Antes de comparar rendas, compare o <em>líquido</em>. Ponha dois países
          frente a frente — por exemplo{" "}
          <Link href={`/${l}/compare-countries/portugal-vs-germany`}>
            Portugal vs Alemanha
          </Link>{" "}
          — e olhe em conjunto para o imposto sobre o rendimento, o IVA e o
          salário líquido médio. E, para qualquer coisa vinculativa, fale com um
          profissional de fiscalidade no país de destino; nada aqui é
          aconselhamento fiscal.
        </p>
      </>
    ),
  },
  "digital-nomad-visas-explained": {
    title: "Vistos para nómadas digitais explicados: quem se qualifica e como funcionam",
    excerpt:
      "Uma onda de países emite agora vistos feitos para trabalhadores remotos. Eis como diferem de um carimbo de turista, o rendimento que esperam e onde ficam aquém.",
    Body: ({ l }) => (
      <>
        <p>
          Há uma década, trabalhar remotamente a partir do estrangeiro significava
          viver de carimbos de turista e esperar que ninguém fizesse perguntas.
          Agora dezenas de países emitem um{" "}
          <strong>visto para nómadas digitais</strong> feito de propósito. São uma
          verdadeira evolução — mas são mais restritos do que o marketing sugere.
        </p>
        <h2>Como diferem de um visto de turista</h2>
        <p>
          Um visto de turista permite-lhe visitar; não permite trabalhar, nem
          sequer para uma entidade patronal estrangeira, e normalmente limita-o a
          30–90 dias. Um visto de nómada permite explicitamente trabalho remoto
          para clientes ou uma entidade patronal <em>fora</em> do país, e dura
          tipicamente um ano ou dois, com a opção de renovar. A contrapartida é a
          papelada: prova de rendimento, seguro, registo criminal limpo e, por
          vezes, uma taxa de candidatura na ordem das centenas.
        </p>
        <h2>O requisito de rendimento é o verdadeiro filtro</h2>
        <p>
          Quase todos os esquemas fixam um rendimento mensal mínimo, e é a
          condição que tramita a maioria das pessoas. Intervalos aproximados que
          vai encontrar:
        </p>
        <ul>
          <li>
            <strong>Fasquia mais baixa</strong> — partes do Sudeste Asiático, da
            América Latina e da Europa Central pedem muitas vezes cerca de
            1.000–2.500 EUR por mês.
          </li>
          <li>
            <strong>Fasquia mais alta</strong> — destinos mais ricos e mais caros
            podem exigir 3.500 EUR ou mais, por vezes o dobro para um casal.
          </li>
          <li>
            <strong>Prova</strong> — conte com mostrar vários meses de extratos
            bancários ou contratos, e não apenas um recibo de vencimento.
          </li>
        </ul>
        <h2>Visto, autorização de residência ou caminho para a cidadania?</h2>
        <p>
          Não confunda um visto de nómada com residência permanente. A maioria é
          temporária e <em>não</em> conta para a cidadania, embora alguns se
          convertam em autorizações de residência mais longas se ficar e pagar
          imposto. Leia as letras miúdas sobre renovações e sobre se o tempo
          passado conta antes de construir planos de longo prazo à sua volta.
        </p>
        <h2>A armadilha fiscal que ninguém anuncia</h2>
        <p>
          Um visto é permissão para ficar; não é uma promessa de que não será
          tributado. Ultrapasse o limiar de residência local — muitas vezes cerca
          de 183 dias — e o seu rendimento mundial pode passar a ser tributável
          aí. Alguns esquemas de nómada preveem uma isenção, muitos não.
          Verifique o tratamento fiscal com um profissional no destino antes de se
          comprometer.
        </p>
        <p>
          Para ver que lugares se adequam ao trabalho remoto, comece pelas nossas{" "}
          <Link href={`/${l}/best/nomad`}>melhores cidades para nómadas digitais</Link>{" "}
          e depois consulte as linhas de imposto e de custo nas respetivas{" "}
          <Link href={`/${l}/countries`}>páginas de países</Link>.
        </p>
      </>
    ),
  },
  "health-insurance-for-expats": {
    title: "Seguro de saúde quando se muda para o estrangeiro: público, privado ou ambos",
    excerpt:
      "O sistema que o cobre na sua terra raramente o acompanha através de uma fronteira. Um olhar prático sobre os esquemas públicos, a cobertura privada e porque os nómadas precisam de algo mais.",
    Body: ({ l }) => (
      <>
        <p>
          A cobertura de saúde é a rubrica que as pessoas orçamentam por último e
          de que se arrependem primeiro. No momento em que parte, o sistema do seu
          país de origem normalmente deixa de pagar, e o que o substitui depende
          inteiramente de como chega e de quanto tempo fica.
        </p>
        <h2>Sistemas públicos: bons, mas não automáticos</h2>
        <p>
          Muitos países têm saúde pública excelente — mas o acesso está ligado à
          residência e, normalmente, ao facto de descontar. Mude-se para um sítio
          como{" "}
          <Link href={`/${l}/cost-of-living/berlin-de`}>Berlim</Link> com um visto
          de trabalho e vai tipicamente aderir ao sistema legal através de
          descontos na folha de pagamento. Chegue como nómada ou reformado precoce
          sem emprego local e pode ficar de fora durante meses, ou por completo,
          até se qualificar.
        </p>
        <h2>A cobertura privada preenche a lacuna</h2>
        <p>
          O seguro de saúde privado compra rapidez e escolha — e, para os
          recém-chegados, muitas vezes <em>é</em> a única opção até a residência
          ficar resolvida. Nalguns países a prova de cobertura privada é um
          requisito de visto. Também importa em sítios onde o nível público é
          frágil: numa cidade como{" "}
          <Link href={`/${l}/cost-of-living/bangkok-th`}>Banguecoque</Link>, a
          maioria dos expatriados depende de hospitais e seguros privados em vez do
          sistema público.
        </p>
        <h2>Porque os nómadas precisam de cobertura internacional</h2>
        <p>
          Uma apólice local pára na fronteira. Se se muda de poucos em poucos
          meses, um{" "}
          <strong>plano de saúde global ou internacional</strong> que o acompanha
          entre países — e cobre uma viagem a casa — costuma fazer mais sentido do
          que remendar apólices locais. O seguro de viagem não é a mesma coisa; é
          para viagens curtas e emergências, não para cuidados continuados.
        </p>
        <h2>O que verificar antes de comprar</h2>
        <ul>
          <li>
            <strong>Âmbito geográfico</strong> — o seu país de origem está
            incluído? Muitos planos mais baratos excluem-no, ou aos EUA.
          </li>
          <li>
            <strong>Condições pré-existentes</strong> — a razão mais comum para uma
            reclamação ser recusada. Declare tudo.
          </li>
          <li>
            <strong>Internamento vs ambulatório</strong> — os planos baratos cobrem
            muitas vezes só estadias hospitalares, não as consultas de rotina.
          </li>
          <li>
            <strong>Renovabilidade e limites de idade</strong> — pode manter a
            apólice à medida que envelhece, e o prémio dispara?
          </li>
        </ul>
        <p>
          Nada disto é aconselhamento médico ou de seguros — a cobertura e a
          elegibilidade variam por nacionalidade e visto, por isso confirme os
          pormenores com um corretor licenciado antes de contar com um plano.
        </p>
      </>
    ),
  },
  "budgeting-a-move-abroad-with-family": {
    title: "Orçamentar uma mudança para o estrangeiro com família: os custos que se acumulam",
    excerpt:
      "Mudar-se sozinho é uma mala e uma caução. Mudar uma família multiplica os custos pontuais e acrescenta escolas, habitação maior e uma margem muito maior.",
    Body: ({ l }) => (
      <>
        <p>
          Uma pessoa sozinha pode mudar-se para o estrangeiro com pouco dinheiro e
          improvisar o resto. Uma família não pode. Os custos não se limitam a
          escalar com o número de pessoas — surgem categorias inteiramente novas, e
          a margem de que precisa cresce mais depressa do que esperaria.
        </p>
        <h2>Os custos pontuais, multiplicados</h2>
        <p>
          Voos, envios, cauções e taxas de visto contam-se todos por pessoa.
          Acrescente a inscrição na escola, mobília nova para um espaço maior e o
          custo de substituir tudo o que não pôde trazer. É comum uma mudança em
          família custar várias vezes o preço de uma mudança a solo antes mesmo de
          a primeira renda ser devida.
        </p>
        <h2>As escolas são o fator decisivo</h2>
        <p>
          A educação pode discretamente tornar-se a sua maior rubrica. As escolas
          públicas podem ser gratuitas mas lecionadas na língua local; as escolas
          internacionais resolvem isso mas podem custar tanto como a renda — por
          criança. As suas opções resumem-se normalmente a:
        </p>
        <ul>
          <li>
            <strong>Pública local</strong> — a mais barata, a melhor para a
            integração, a mais difícil ao início se houver uma barreira
            linguística.
          </li>
          <li>
            <strong>Bilingue ou privada local</strong> — um caminho intermédio,
            variável no preço e na disponibilidade.
          </li>
          <li>
            <strong>Internacional</strong> — currículo familiar e ensino em inglês,
            mas orçamente milhares por criança por ano.
          </li>
        </ul>
        <h2>Uma habitação maior muda toda a equação</h2>
        <p>
          Uma família precisa de quartos, e o salto de um T1 para um T3 raramente é
          linear — os apartamentos de dimensão familiar em boas zonas escolares
          têm um prémio. Quando compara cidades, orce a casa que de facto
          arrendaria, não a média. Uma forma rápida de confirmar os números são as
          nossas{" "}
          <Link href={`/${l}/calculators`}>calculadoras</Link> e, se está a ponderar
          comprar em vez de arrendar, a{" "}
          <Link href={`/${l}/calculators/mortgage-calculator`}>
            calculadora de crédito à habitação
          </Link>{" "}
          transforma um preço num valor mensal.
        </p>
        <h2>Construa uma margem maior do que julga precisar</h2>
        <p>
          Com dependentes, &quot;logo se vê&quot; não é um plano. Procure ter seis
          meses do custo de vida do destino poupados antes de partir, e ponha-os à
          prova contra um começo de emprego adiado ou uma oscilação cambial.
          Esticar essa margem é mais fácil numa cidade genuinamente acessível — a
          nossa{" "}
          <Link href={`/${l}/best/cheapest`}>lista de cidades mais baratas</Link> é
          um bom sítio para encontrar uma que continue a cumprir as exigências
          inegociáveis da sua família.
        </p>
      </>
    ),
  },
  "renting-an-apartment-abroad": {
    title: "Arrendar um apartamento no estrangeiro: cauções, contratos e evitar burlas",
    excerpt:
      "O mercado de arrendamento é onde os recém-chegados perdem mais dinheiro e sono. O que esperar de cauções, agentes e contratos — e como detetar cedo uma burla.",
    Body: ({ l }) => (
      <>
        <p>
          Encontrar onde viver é o primeiro teste real de uma nova cidade, e é onde
          os burlões fazem o seu melhor trabalho — porque você está com pressa,
          pouco familiarizado com as normas locais e muitas vezes a procurar antes
          de chegar. Um pouco de estrutura protege o seu dinheiro e os seus nervos.
        </p>
        <h2>Cauções e dinheiro adiantado</h2>
        <p>
          Conte com adiantar muito de uma só vez: tipicamente uma a três rendas de
          caução mais a primeira renda e, por vezes, uma comissão de agente por
          cima. Em mercados competitivos como{" "}
          <Link href={`/${l}/cost-of-living/amsterdam-nl`}>Amesterdão</Link>, os
          senhorios podem pedir ainda mais a inquilinos sem historial local. Saiba
          como as cauções estão protegidas localmente e obtenha sempre um recibo
          assinado a indicar o montante e as condições da sua devolução.
        </p>
        <h2>Leia o contrato antes de assinar seja o que for</h2>
        <p>
          A lei do arrendamento varia imenso. Verifique o período de aviso prévio,
          quem paga reparações e serviços, se os aumentos de renda têm limite e o
          que conta como &quot;desgaste normal&quot; quando sair. Se o contrato só
          estiver na língua local, mande-o traduzir — assinar algo que não consegue
          ler é como começam os litígios.
        </p>
        <h2>Comissões de agente e como funcionam</h2>
        <p>
          Nalguns países o senhorio paga o agente; noutros paga o inquilino, por
          vezes uma renda inteira. Nenhuma das situações é por si só uma burla — a
          armadilha é não saber qual se aplica antes de visitar. Pergunte à partida
          quem paga a comissão e exatamente o que cobre.
        </p>
        <h2>Detetar uma burla de arrendamento</h2>
        <ul>
          <li>
            <strong>O preço é bom demais</strong> — um apartamento central muito
            abaixo do preço de mercado numa cidade como{" "}
            <Link href={`/${l}/cost-of-living/london-uk`}>Londres</Link> é isco, não
            sorte.
          </li>
          <li>
            <strong>Não o pode visitar</strong> — o &quot;proprietário&quot; está no
            estrangeiro e precisa de uma caução para o reservar. Nunca pague por um
            sítio que não viu, pessoalmente ou através de um contacto de confiança.
          </li>
          <li>
            <strong>Pressão e transferências bancárias</strong> — urgência mais um
            meio de pagamento irreversível é a combinação clássica. Abrande.
          </li>
          <li>
            <strong>Sem contrato escrito</strong> — se resistirem a pôr as
            condições por escrito, afaste-se.
          </li>
        </ul>
        <p>
          Sempre que puder, garanta primeiro alojamento de curta duração e assine
          um contrato longo só depois de ter visitado o sítio e conhecido o
          senhorio. As duas semanas extra num alojamento custam menos do que uma
          caução que nunca recupera.
        </p>
      </>
    ),
  },
  "tax-breaks-for-new-residents": {
    title: "Benefícios fiscais para novos residentes: como funcionam realmente os regimes especiais",
    excerpt:
      "Vários países atraem migrantes qualificados com esquemas de imposto reduzido. Podem transformar as contas — mas vêm com condições, prazos e um prazo de validade.",
    Body: ({ l }) => (
      <>
        <p>
          Para atrair talento e rendimento remoto, vários países oferecem aos
          recém-chegados um desconto fiscal temporário — por vezes drástico. Estes
          regimes especiais podem inclinar uma decisão de relocalização, mas são
          também largamente mal compreendidos, e as regras mudam com frequência.
        </p>
        <h2>O que estes regimes fazem na verdade</h2>
        <p>
          A maioria funciona isentando ou descontando parte do seu rendimento
          durante um número fixo de anos. Portugal aplicou um esquema bem conhecido
          para novos residentes; a Itália ofereceu grandes isenções sobre o
          rendimento a quem transfere para lá a sua residência fiscal; outros dão
          taxas fixas ou exclusões de rendimento estrangeiro. O fio comum: uma
          janela limitada de tratamento favorável para o fazer entrar.
        </p>
        <h2>As condições são estritas</h2>
        <p>
          Um desconto para o qual não se qualifica não vale nada, por isso leia
          primeiro as regras de elegibilidade. Amarras típicas:
        </p>
        <ul>
          <li>
            <strong>Tem de ser genuinamente novo</strong> — normalmente não
            residente fiscal aí nos 5 a 10 anos anteriores.
          </li>
          <li>
            <strong>A profissão ou o tipo de rendimento importa</strong> — alguns
            esquemas só cobrem certos empregos qualificados, pensões ou rendimento
            de fonte estrangeira.
          </li>
          <li>
            <strong>Tem de se registar a tempo</strong> — falhe a janela de
            candidatura após a mudança e pode perder o benefício por completo.
          </li>
          <li>
            <strong>Expira</strong> — são temporários, muitas vezes 5 a 10 anos,
            após os quais se aplicam as taxas normais.
          </li>
        </ul>
        <h2>As ressalvas que ninguém põe na brochura</h2>
        <p>
          Os governos alteram ou encerram estes esquemas com pouco aviso, e um
          regime generoso hoje pode desaparecer antes de você chegar. Também pode
          haver um espinho na origem: o seu país anterior pode continuar a
          tributá-lo, ou pode aplicar-se um imposto de saída quando parte. E uma
          taxa de referência baixa não ajuda se o custo de vida devorar a poupança.
        </p>
        <h2>Como usá-los numa decisão</h2>
        <p>
          Trate um regime especial como um bónus, não como toda a justificação para
          uma mudança. Compare primeiro os fundamentos de base — ponha dois países
          lado a lado, por exemplo{" "}
          <Link href={`/${l}/compare-countries/portugal-vs-germany`}>
            Portugal vs Alemanha
          </Link>{" "}
          — e percorra as linhas de imposto de referência nas nossas{" "}
          <Link href={`/${l}/countries`}>páginas de países</Link>. Depois, porque
          estas regras são técnicas e mudam com frequência, confirme os termos
          atuais com um profissional de fiscalidade no destino. Nada aqui é
          aconselhamento fiscal.
        </p>
      </>
    ),
  },
};

export default pt;
