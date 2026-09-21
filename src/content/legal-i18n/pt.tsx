import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

const pt: Record<string, (p: { l: Locale }) => React.ReactNode> = {
  about: ({ l }) => (
    <>
      <p>
        A CostTrek ajuda-o a comparar o <strong>custo de vida, os impostos,
        os salários, a qualidade de vida e os vistos</strong> entre cidades e
        países de todo o mundo — para que possa perceber o que significa
        realmente uma mudança antes de a concretizar. Tudo está disponível em
        cinco idiomas.
      </p>
      <h2>Como funciona o índice de custos</h2>
      <p>
        O nosso número de referência é um índice de custo de vida em que a
        cidade norte-americana média está fixada em <strong>100</strong>. Uma
        cidade com 60 é cerca de 40% mais barata do que uma cidade típica dos
        EUA; uma cidade com 150 é cerca de 50% mais cara. O índice combina
        habitação, alimentação, transportes, serviços públicos, saúde e bens do
        dia a dia. Introduza o seu salário em qualquer página de comparação para
        ver o valor equivalente de que precisaria para manter o mesmo nível de
        vida noutro local.
      </p>
      <h2>De onde vêm os nossos dados</h2>
      <ul>
        <li>
          <strong>Os dados económicos</strong> — PIB per capita, esperança de
          vida e inflação — provêm do{" "}
          <a href="https://data.worldbank.org" rel="noopener" target="_blank">
            World Bank Open Data
          </a>
          .
        </li>
        <li>
          <strong>Os resumos fiscais e de vistos</strong> são compilados a partir
          das autoridades fiscais nacionais e de fontes públicas, a um nível
          geral.
        </li>
        <li>
          <strong>O índice global de custos das cidades dos EUA</strong> tem por
          base os valores reais das{" "}
          <a
            href="https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area"
            rel="noopener"
            target="_blank"
          >
            BEA Regional Price Parities
          </a>{" "}
          (todos os itens, EUA = 100, 2023).
        </li>
        <li>
          <strong>As rendas nas áreas metropolitanas dos EUA</strong> utilizam a
          renda bruta mediana real do{" "}
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
          <strong>As repartições por categoria, as estimativas de renda de
          apartamento T1 e as pontuações de qualidade de vida</strong>{" "}
          são estimativas compiladas para orientação geral, aperfeiçoadas ao
          longo do tempo. Os índices das cidades internacionais são estimativas
          calibradas.
        </li>
      </ul>
      <p>
        Esforçamo-nos por manter os valores razoáveis e atualizados, mas trata-se
        de estimativas, não de estatísticas oficiais. Nada aqui constitui
        aconselhamento financeiro, fiscal, jurídico ou de imigração — confirme
        tudo o que for importante junto de uma fonte oficial ou de um
        profissional qualificado antes de tomar decisões.
      </p>
      <h2>A quem se destina</h2>
      <p>
        Pessoas que ponderam uma mudança de país, trabalhadores remotos e nómadas
        digitais à procura de uma base, empresas que planeiam deslocações e
        qualquer pessoa simplesmente curiosa sobre até onde o seu dinheiro
        chegaria noutro lugar.
      </p>
      <h2>Entre em contacto</h2>
      <p>
        Dúvidas, correções ou ideias de parceria? Consulte a nossa página de{" "}
        <Link href={`/${l}/contact`}>Contacto</Link>.
      </p>
    </>
  ),
  methodology: ({ l }) => (
    <>
      <p>
        Esta página explica exatamente como a CostTrek produz cada número que
        vê — o índice de custo de vida, a equivalência salarial, os impostos e
        as pontuações de qualidade de vida — e, com igual importância, de onde
        vem cada valor e o grau de confiança que lhe deve atribuir. Preferimos
        ser transparentes a fingir que as nossas estimativas são estatísticas
        oficiais.
      </p>

      <h2>O índice de custo de vida</h2>
      <p>
        O nosso número de referência é um índice em que a cidade
        norte-americana média está fixada em <strong>100</strong>. Uma cidade
        com 60 é cerca de 40% mais barata do que uma cidade típica dos EUA; uma
        cidade com 150 é cerca de 50% mais cara. O índice combina seis
        categorias do dia a dia — <strong>habitação, alimentação, transportes,
        serviços públicos, saúde e bens &amp; serviços</strong> — cada uma
        avaliada na mesma escala de EUA = 100 e depois combinada no valor
        global.
      </p>

      <h2>Equivalência salarial</h2>
      <p>
        Em qualquer página de comparação pode introduzir um salário e ver o
        valor equivalente de que precisaria na outra cidade para manter o mesmo
        nível de vida. É um rácio direto entre os dois índices de custos — se o
        índice da cidade B for 20% superior ao da cidade A, precisaria de cerca
        de mais 20% ali. É um guia de poder de compra, não um estudo salarial
        nem uma proposta de emprego.
      </p>

      <h2>De onde vem cada valor</h2>
      <p>
        Combinamos dados abertos de referência, quando existem, com estimativas
        calibradas, quando não há uma fonte gratuita, mundial e por cidade.
        Assinalamos qual é qual, em vez de esbater a linha que os separa:
      </p>
      <ul>
        <li>
          <strong>Economia — real.</strong> O PIB per capita, a esperança de
          vida e a inflação provêm do{" "}
          <a href="https://data.worldbank.org" rel="noopener" target="_blank">
            World Bank Open Data
          </a>
          .
        </li>
        <li>
          <strong>Índice global de custos dos EUA — real.</strong> Ancorado nas{" "}
          <a
            href="https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area"
            rel="noopener"
            target="_blank"
          >
            BEA Regional Price Parities
          </a>{" "}
          (todos os itens, EUA = 100, 2023 — o último ano em que a BEA publicou
          as RPP metropolitanas).
        </li>
        <li>
          <strong>Rendas nas áreas metropolitanas dos EUA — real.</strong> A
          renda bruta mediana do{" "}
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
          <strong>Impostos &amp; vistos — compilados.</strong> Resumos gerais do
          imposto sobre o rendimento, do IVA e dos vistos, a partir das
          autoridades fiscais nacionais e de fontes públicas. Apenas taxas
          gerais — não a sua taxa efetiva.
        </li>
        <li>
          <strong>Índices das cidades internacionais, rendas de apartamento T1,
          repartições por categoria e pontuações de qualidade de vida —
          estimativas.</strong> São aproximações calibradas para orientação
          geral, aperfeiçoadas ao longo do tempo. Não existe nenhum feed
          gratuito, licenciável e mundial de custos por cidade, pelo que
          modelamos estes valores em vez de deixar o mapa vazio.
        </li>
      </ul>

      <h2>Conversão de moeda</h2>
      <p>
        Os valores das cidades são armazenados em dólares dos EUA. O widget
        «na sua moeda» converte-os com taxas de referência estáticas (definidas
        pela última vez em 2026-09), pelo que os montantes são aproximados e se
        destinam a orientação, não a reservas ou a orçamentos ao cêntimo.
      </p>

      <h2>Com que frequência é atualizado</h2>
      <p>
        O site é reconstruído a cada alteração, pelo que as atualizações
        estruturais entram em vigor de imediato. Os conjuntos de dados
        subjacentes são atualizados periodicamente, à medida que surgem novas
        publicações oficiais (World Bank, BEA, Census) e que aperfeiçoamos as
        estimativas — a data de «última atualização» de cada página reflete a
        construção mais recente.
      </p>

      <h2>Limitações &amp; honestidade</h2>
      <p>
        Os custos variam consoante o bairro, o estilo de vida e o momento, e os
        nossos valores estimados podem estar errados para qualquer cidade
        individual. Encare tudo o que aqui consta como um ponto de partida para
        comparação, não como um orçamento preciso. Nada na CostTrek constitui
        aconselhamento financeiro, fiscal, jurídico ou de imigração — confirme
        tudo o que for importante junto de uma fonte oficial ou de um
        profissional qualificado antes de tomar decisões.
      </p>

      <h2>Correções</h2>
      <p>
        Detetou um valor que parece errado? Queremos mesmo saber — envie um
        e-mail para <a href="mailto:info@costtrek.com">info@costtrek.com</a> e
        iremos analisá-lo. Saiba mais sobre o projeto na nossa página{" "}
        <Link href={`/${l}/about`}>Sobre</Link>.
      </p>
    </>
  ),
  privacy: ({ l }) => (
    <>
      <p>
        Esta é uma política de privacidade modelo para a CostTrek; reveja-a com um
        profissional qualificado antes de nela confiar. Explica o que recolhemos e
        porquê.
      </p>
      <h2>Informação que recolhemos</h2>
      <p>
        A CostTrek é um site de conteúdos. Não lhe pedimos que crie uma conta nem
        que submeta dados pessoais para o consultar. Recebemos automaticamente
        dados técnicos habituais (endereço IP, tipo de navegador, páginas
        visualizadas) e utilizamos cookies e tecnologias semelhantes, conforme
        descrito na nossa política de{" "}
        <Link href={`/${l}/cookies`}>Cookies</Link>.
      </p>
      <h2>Como utilizamos os dados</h2>
      <ul>
        <li>Para operar, proteger e melhorar o site.</li>
        <li>Para medir o tráfego com análises que respeitam a privacidade.</li>
        <li>
          Para apresentar publicidade, que pode utilizar cookies para
          personalizar anúncios.
        </li>
      </ul>
      <h2>Publicidade &amp; terceiros</h2>
      <p>
        Podemos apresentar anúncios veiculados por redes de terceiros (por
        exemplo, o Google AdSense). Estes parceiros podem utilizar cookies para
        apresentar anúncios com base nas suas visitas anteriores. Pode controlar a
        publicidade personalizada através das definições do seu dispositivo e do
        seu navegador e, na UE/Reino Unido, através das opções de consentimento
        que lhe apresentamos.
      </p>
      <h2>Os seus direitos</h2>
      <p>
        Consoante o local onde reside (por exemplo, ao abrigo do RGPD ou da CCPA),
        pode ter direito a aceder aos seus dados, corrigi-los ou eliminá-los e a
        opor-se a determinados tratamentos. Contacte-nos para os exercer.
      </p>
      <h2>Contacto</h2>
      <p>
        Dúvidas sobre os seus dados ou sobre esta política? Envie um e-mail para{" "}
        <a href="mailto:info@costtrek.com">info@costtrek.com</a>.
      </p>
    </>
  ),
  terms: () => (
    <>
      <p>
        Ao utilizar a CostTrek, o utilizador aceita estes termos. Este é um
        modelo; reveja-o com um profissional qualificado antes de nele confiar.
      </p>
      <h2>Utilização apenas informativa</h2>
      <p>
        Todos os valores de custo de vida, impostos e mudança de país são
        estimativas aproximadas fornecidas para informação geral. Não constituem
        aconselhamento financeiro, fiscal, jurídico ou de imigração. Confirme tudo
        o que for importante junto de uma fonte oficial ou de um profissional
        qualificado antes de tomar decisões.
      </p>
      <h2>Sem garantias</h2>
      <p>
        O site é fornecido &quot;tal como está&quot;, sem garantias de qualquer
        tipo. Fazemos o nosso melhor para manter os dados atualizados, mas não
        podemos garantir que sejam exatos, completos ou atuais.
      </p>
      <h2>Ligações externas</h2>
      <p>
        Podemos incluir ligações para sites e serviços de terceiros, alguns
        através de acordos de afiliação. Não somos responsáveis pelo respetivo
        conteúdo ou práticas.
      </p>
      <h2>Alterações</h2>
      <p>
        Podemos atualizar estes termos; a utilização continuada significa que
        aceita as alterações.
      </p>
    </>
  ),
  cookies: () => (
    <>
      <p>
        A CostTrek utiliza cookies — pequenos ficheiros armazenados no seu
        dispositivo — para fazer funcionar o site e, com o seu consentimento, para
        medir o tráfego e apoiar a publicidade.
      </p>
      <h2>Tipos de cookies que utilizamos</h2>
      <ul>
        <li>
          <strong>Essenciais</strong> — necessários para o funcionamento do site
          (por exemplo, para memorizar o seu idioma e a sua escolha de cookies).
          Sempre ativos.
        </li>
        <li>
          <strong>Análise</strong> — ajudam-nos a perceber que páginas são úteis.
          Definidos apenas se aceitar.
        </li>
        <li>
          <strong>Publicidade</strong> — utilizados por parceiros de publicidade
          (por exemplo, o Google AdSense) para medir e personalizar anúncios.
          Definidos apenas se aceitar.
        </li>
      </ul>
      <h2>Gestão de cookies</h2>
      <p>
        Pode aceitar ou recusar os cookies não essenciais através do banner
        apresentado na sua primeira visita e mudar de ideias a qualquer momento
        apagando os dados deste site no seu navegador. Também pode bloquear os
        cookies nas definições do seu navegador.
      </p>
    </>
  ),
  contact: () => (
    <>
      <p>
        Gostaríamos muito de ter notícias suas — dúvidas, comentários, correções
        de dados ou ideias de parceria são todos bem-vindos. Procuramos responder
        no prazo de alguns dias úteis.
      </p>
      <h2>Dúvidas gerais &amp; correções</h2>
      <p>
        Envie um e-mail para{" "}
        <a href="mailto:info@costtrek.com">info@costtrek.com</a>. Se algum valor
        lhe parecer errado para uma cidade ou país, diga-nos — estamos a
        aperfeiçoar os dados e agradecemos as sugestões.
      </p>
      <h2>Publicidade &amp; parcerias</h2>
      <p>
        Para publicidade, patrocínios ou pedidos de parceria, envie um e-mail
        para <a href="mailto:ads@costtrek.com">ads@costtrek.com</a>.
      </p>
      <h2>Sobre o site</h2>
      <p>
        A CostTrek é um projeto independente, financiado por publicidade, que
        compara o custo de vida, os impostos e a qualidade de vida entre cidades e
        países de todo o mundo.
      </p>
    </>
  ),
};

export default pt;
