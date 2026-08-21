import Link from "next/link";
import type { GuideContent } from "@/content/guides";

const es: Record<string, GuideContent> = {
  "cost-of-living-index-explained": {
    title: "Qué significa realmente un índice de coste de vida de 100",
    excerpt:
      "Todas las webs de comparación manejan un número, un «índice». Aquí te explicamos qué mide de verdad, por qué la media de EE. UU. es la referencia y cómo leerlo sin dejarte engañar.",
    Body: ({ l }) => (
      <>
        <p>
          Si has navegado por cualquier web de reubicación, habrás visto una
          ciudad descrita con un solo número: un índice de 62, de 154 o de 100.
          Parece preciso, pero la mayoría de la gente no tiene ni idea de qué
          está contando. Aquí va la versión honesta.
        </p>
        <h2>La referencia es una elección, no una ley natural</h2>
        <p>
          Un índice de coste de vida necesita un punto de referencia. En
          CostTrek, y en la mayoría de herramientas en inglés, esa referencia es{" "}
          <strong>la ciudad estadounidense media, fijada en 100</strong>. Así que
          una ciudad con 60 es aproximadamente un 40 % más barata que una ciudad
          americana típica; una ciudad con 150 es alrededor de un 50 % más cara.
          La referencia podría ser igual de bien Londres o la media mundial: los
          números cambiarían, pero la <em>clasificación</em> entre ciudades
          seguiría siendo la misma.
        </p>
        <h2>Qué entra en el número</h2>
        <p>
          Un buen índice combina varias cestas de gasto, no solo el alquiler:
          vivienda, comida y compra, transporte, suministros, sanidad y los
          bienes y servicios del día a día. La vivienda suele tener el mayor peso,
          porque es el coste más grande y más variable. Por eso una ciudad puede
          parecer &quot;barata&quot; en conjunto mientras una categoría concreta
          —digamos, el transporte o la sanidad— resulta cara en realidad.
        </p>
        <h2>Lee el desglose, no solo el titular</h2>
        <p>
          El índice único es un punto de partida, nunca la respuesta. Dos ciudades
          con el mismo número global pueden sentirse completamente distintas: una
          con alquiler barato y comida cara, otra al revés. Abre siempre el
          desglose por categorías y ponderálo según cómo gastas <em>tú</em>. Un
          barrio residencial dependiente del coche y un centro con buen transporte
          golpearán tu presupuesto en lugares muy distintos.
        </p>
        <h2>Los índices son estimaciones: trátalos como tales</h2>
        <p>
          Los precios se mueven constantemente, las divisas oscilan y ningún
          conjunto de datos está perfectamente actualizado para cada ciudad. Usa
          el índice para preseleccionar y comparar, y luego verifica los dos o
          tres costes que más te importan —normalmente el alquiler y los
          impuestos— frente a una fuente local y actualizada antes de decidirte.
        </p>
        <p>
          ¿Listo para verlo en acción?{" "}
          <Link href={`/${l}`}>Compara dos ciudades cualesquiera</Link> o explora
          las{" "}
          <Link href={`/${l}/best/cheapest`}>ciudades más baratas de nuestro índice</Link>.
        </p>
      </>
    ),
  },
  "how-to-compare-cities-before-moving": {
    title: "Cómo comparar dos ciudades antes de mudarte (una lista práctica)",
    excerpt:
      "El alquiler es el titular, pero rara vez es lo que decide una mudanza. Una forma paso a paso de comparar dos ciudades que va más allá del precio de la etiqueta.",
    Body: ({ l }) => (
      <>
        <p>
          Elegir entre dos ciudades suele empezar por el alquiler y acabar en el
          arrepentimiento, porque el alquiler es solo una línea de un presupuesto
          mucho más largo. Aquí tienes una secuencia que atrapa las cosas que la
          gente olvida.
        </p>
        <h2>1. Empieza por el sueldo neto, no por el salario bruto</h2>
        <p>
          Un salario más alto en un país con impuestos elevados puede dejarte con
          menos que un salario modesto en un sitio con carga fiscal baja. Compara
          el <strong>tipo máximo del impuesto sobre la renta</strong> y las
          cotizaciones sociales de cada país, y luego piensa en términos de lo que
          realmente llega a tu cuenta. Nuestras{" "}
          <Link href={`/${l}/countries`}>páginas de países</Link> muestran las
          cifras fiscales principales una al lado de la otra.
        </p>
        <h2>2. Ánclate en el alquiler real, en el barrio que elegirías</h2>
        <p>
          El alquiler medio de una ciudad esconde enormes variaciones. Fíjate en
          un piso de un dormitorio en el <em>centro</em> frente a las{" "}
          <em>afueras</em>, y sé honesto sobre dónde vivirías de verdad. Un
          trayecto 20 minutos más largo puede reducir el alquiler en un tercio.
        </p>
        <h2>3. Convierte tu estilo de vida, no solo tu alquiler</h2>
        <p>
          Suma los costes que reflejan tu rutina: comer fuera, el abono de
          transporte, el gimnasio, los suministros, internet. Quien cocina en casa
          y va en bici vivirá una ciudad de forma completamente distinta a quien
          come fuera y conduce. Usa la herramienta de equivalencia salarial de
          cualquier{" "}
          <Link href={`/${l}`}>página de comparación</Link> para traducir tus
          ingresos actuales en lo que necesitarías para vivir igual en otro sitio.
        </p>
        <h2>4. Sopesa los factores que no son dinero</h2>
        <p>
          La seguridad, la sanidad, la calidad del aire, el clima, la velocidad de
          internet, el idioma y el acceso a visados no aparecen en una cifra de
          alquiler, pero moldean la vida diaria, y algunos son decisivos. Una
          ciudad un 30 % más barata pero que exige un visado que no puedes obtener
          no es en realidad una opción.
        </p>
        <h2>5. Contrasta con gente local</h2>
        <p>
          Los datos acotan el campo; las personas lo confirman. Cuando tengas una
          preselección de dos o tres, busca un foro o un amigo sobre el terreno y
          hazle las preguntas incómodas: fianzas, gastos ocultos, lo difícil que
          es de verdad encontrar piso.
        </p>
        <p>
          Un buen punto de partida:{" "}
          <Link href={`/${l}/cost-of-living/lisbon-pt`}>Lisboa</Link>,{" "}
          <Link href={`/${l}/cost-of-living/berlin-de`}>Berlín</Link> o{" "}
          <Link href={`/${l}/cost-of-living/bangkok-th`}>Bangkok</Link>, y luego
          pon tu favorita frente a tu ciudad actual.
        </p>
      </>
    ),
  },
  "salary-you-need-to-move-abroad": {
    title: "¿Cuánto salario necesitas de verdad para mudarte al extranjero?",
    excerpt:
      "La respuesta honesta es «depende de dónde», pero hay una forma sencilla de convertir tus ingresos actuales en un objetivo para cualquier lugar del mundo.",
    Body: ({ l }) => (
      <>
        <p>
          &quot;¿Cuánto necesito ganar allí?&quot; es la pregunta que hay detrás
          de toda reubicación. La buena noticia: puedes responderla con un solo
          cálculo, partiendo de un salario que ya entiendes: el tuyo actual.
        </p>
        <h2>El método de equivalencia</h2>
        <p>
          Para mantener el mismo nivel de vida, multiplica tu salario actual por
          la proporción entre los dos índices de coste. Si tu ciudad tiene un
          índice de 100 y la nueva es 70, necesitas aproximadamente el{" "}
          <strong>70 % de tu salario actual</strong> para vivir igual. Si la nueva
          ciudad es 150, necesitas alrededor de un 50 % más. Cada{" "}
          <Link href={`/${l}`}>página de comparación</Link> hace esto por ti:
          escribe tu salario y lee el equivalente.
        </p>
        <h2>Luego ajusta por impuestos</h2>
        <p>
          La equivalencia funciona sobre el <em>gasto</em>, pero a ti te pagan en{" "}
          <em>bruto</em>. Un país con un tipo máximo del 45 % y fuertes cargas
          sociales necesitará una cifra bruta mayor para alcanzar el mismo neto
          que un país con un tipo plano del 10 %. Consulta las líneas fiscales de
          ambas ciudades antes de traducir la cifra en una oferta de trabajo.
        </p>
        <h2>No olvides los costes puntuales</h2>
        <p>
          Mudarse no es solo el presupuesto mensual. Presupuesta vuelos, una
          fianza (a menudo de 1 a 3 meses de alquiler), tasas de visado, el envío
          o la reposición de muebles, y un colchón para las semanas antes de que
          empiecen tus ingresos. Una regla práctica: ten ahorrados de tres a seis
          meses de los gastos de la nueva ciudad antes de irte.
        </p>
        <h2>Dónde rinde más tu dinero</h2>
        <p>
          Si el objetivo es maximizar el poder adquisitivo, fíjate en ciudades
          donde el mismo dólar simplemente compra más; muchas están en el Sudeste
          Asiático, América Latina y Europa Central. Nuestra{" "}
          <Link href={`/${l}/best/cheapest`}>lista de ciudades más baratas</Link> y
          las{" "}
          <Link href={`/${l}/best/nomad`}>mejores ciudades para nómadas digitales</Link>{" "}
          son una forma rápida de detectarlas.
        </p>
      </>
    ),
  },
  "cheapest-places-to-live-and-the-catch": {
    title: "Los lugares más baratos del mundo para vivir, y la trampa",
    excerpt:
      "El alquiler por los suelos es real, pero lo «barato» siempre viene con contrapartidas. Qué buscar más allá del precio cuando un coste de vida bajo te tienta.",
    Body: ({ l }) => (
      <>
        <p>
          Es genuinamente posible vivir bien con una fracción de un presupuesto
          occidental. Pero las ciudades más baratas de cualquier índice comparten
          unos cuantos patrones que conviene entender antes de comprar un billete
          de ida.
        </p>
        <h2>Por qué son baratas</h2>
        <p>
          Un coste de vida bajo suele reflejar salarios locales más bajos y una
          moneda más débil, no un regalo. Eso es estupendo si tus ingresos vienen
          de fuera —un trabajo remoto o unos ahorros— y mucho menos estupendo si
          piensas ganar localmente. El arbitraje solo funciona en un sentido.
        </p>
        <h2>Las contrapartidas que hay que revisar</h2>
        <ul>
          <li>
            <strong>Sanidad</strong>: los sistemas públicos pueden ser precarios;
            presupuesta un seguro privado.
          </li>
          <li>
            <strong>Calidad del aire e infraestructuras</strong>: algunas
            megaciudades de bajo coste tienen contaminación grave o suministros
            poco fiables.
          </li>
          <li>
            <strong>Visados</strong>: una ciudad barata en la que solo puedes
            quedarte 30 días no es un hogar. Comprueba las opciones de residencia
            y de nómada digital.
          </li>
          <li>
            <strong>Banca y logística</strong>: mover dinero, conseguir una SIM o
            firmar un contrato de alquiler puede ser más difícil que en tu país.
          </li>
        </ul>
        <h2>Cómo usar bien una lista de «lo más barato»</h2>
        <p>
          Trátala como un generador de preselección, no como un veredicto. Toma
          las primeras de nuestra{" "}
          <Link href={`/${l}/best/cheapest`}>clasificación de ciudades más baratas</Link>{" "}
          y luego abre la página de cada ciudad y lee las secciones de calidad de
          vida y visados. Un sitio como{" "}
          <Link href={`/${l}/cost-of-living/bishkek-kg`}>Biskek</Link> es
          asombrosamente asequible con un impuesto plano del 10 %, pero querrás
          sopesar los inviernos, la sanidad y la conectividad frente al ahorro.
        </p>
        <p>
          La respuesta correcta es la ciudad más barata que aún cumple <em>tus</em>{" "}
          condiciones innegociables, no el número más bajo de la lista.
        </p>
      </>
    ),
  },
  "taxes-when-you-relocate": {
    title: "Impuestos al reubicarte: IRPF, IVA y lo que te queda",
    excerpt:
      "Dos ciudades pueden tener alquileres idénticos y un sueldo neto radicalmente distinto. Un recorrido en lenguaje claro por los impuestos que deciden cuánto conservas de verdad.",
    Body: ({ l }) => (
      <>
        <p>
          El coste de vida te dice cuánto cuestan las cosas; los impuestos te
          dicen cuánto tienes para gastar en primer lugar. Ignóralos y una ciudad
          &quot;más barata&quot; puede dejarte más pobre sin que te des cuenta.
        </p>
        <h2>Impuesto sobre la renta: el tipo máximo es solo la mitad de la historia</h2>
        <p>
          Los países anuncian un tipo marginal máximo: 10 % en Kirguistán, 45 % en
          Alemania, 0 % en los Emiratos Árabes Unidos. Pero la mayoría de los
          sistemas son progresivos, así que solo pagas el tipo máximo por la renta
          que supera un umbral, y muchos añaden{" "}
          <strong>cotizaciones a la seguridad social</strong> encima que pueden
          rivalizar con el impuesto de portada. Compara tanto la línea del
          impuesto sobre la renta como la de cotizaciones en nuestras{" "}
          <Link href={`/${l}/countries`}>páginas de países</Link>.
        </p>
        <h2>IVA / impuesto sobre ventas: el 5-25 % invisible</h2>
        <p>
          Los impuestos al consumo van incorporados en los precios, así que es
          fácil olvidarlos, y sin embargo van desde alrededor del 5 % hasta más
          del 25 %. Un país con un impuesto sobre la renta bajo pero un IVA
          superior al 20 % recupera parte de eso en la caja. Importa sobre todo a
          quienes gastan localmente una gran parte de sus ingresos.
        </p>
        <h2>Residencia y la regla de los 183 días</h2>
        <p>
          La mayoría de los países te consideran residente fiscal en cuanto pasas
          allí aproximadamente <strong>183 días</strong> al año, momento en el que
          tu renta mundial puede pasar a tributar localmente. Si repartes tu tiempo
          entre países, este es el número más importante que hay que entender, y el
          que más merece asesoramiento profesional.
        </p>
        <h2>Regímenes especiales para recién llegados</h2>
        <p>
          Varios países cortejan a migrantes cualificados y trabajadores remotos
          con esquemas de tributación reducida: Portugal, Italia y otros han tenido
          versiones de estos. Pueden cambiar drásticamente las cuentas, pero tienen
          condiciones y fechas de caducidad. Verifica las reglas vigentes antes de
          confiar en ellos.
        </p>
        <h2>La conclusión</h2>
        <p>
          Antes de comparar alquileres, compara el <em>neto</em>. Pon dos países
          cara a cara —por ejemplo{" "}
          <Link href={`/${l}/compare-countries/portugal-vs-germany`}>
            Portugal vs Alemania
          </Link>{" "}
          — y mira juntos el impuesto sobre la renta, el IVA y el salario neto
          medio. Y para cualquier cosa vinculante, habla con un asesor fiscal en el
          país de destino; nada de lo aquí escrito es asesoramiento fiscal.
        </p>
      </>
    ),
  },
  "digital-nomad-visas-explained": {
    title: "Visados de nómada digital: quién califica y cómo funcionan",
    excerpt:
      "Una oleada de países emite ahora visados pensados para trabajadores remotos. Aquí ves en qué se diferencian de un sello de turista, qué ingresos esperan y dónde se quedan cortos.",
    Body: ({ l }) => (
      <>
        <p>
          Hace una década, trabajar en remoto desde el extranjero significaba
          vivir de sellos de turista y esperar que nadie hiciera preguntas. Ahora
          decenas de países emiten un{" "}
          <strong>visado de nómada digital</strong> hecho a propósito. Son una
          mejora real, pero son más limitados de lo que sugiere el marketing.
        </p>
        <h2>En qué se diferencian de un visado de turista</h2>
        <p>
          Un visado de turista te permite visitar; no te permite trabajar, ni
          siquiera para un empleador extranjero, y suele limitarte a 30-90 días. Un
          visado de nómada permite explícitamente el trabajo remoto para clientes o
          un empleador <em>fuera</em> del país, y normalmente dura uno o dos años
          con opción a renovar. La contrapartida es el papeleo: prueba de ingresos,
          seguro, antecedentes penales limpios y a veces una tasa de solicitud de
          cientos de euros.
        </p>
        <h2>El requisito de ingresos es el verdadero filtro</h2>
        <p>
          Casi todos los esquemas fijan un ingreso mensual mínimo, y es la
          condición con la que más gente tropieza. Rangos aproximados que verás:
        </p>
        <ul>
          <li>
            <strong>Umbral más bajo</strong>: partes del Sudeste Asiático, América
            Latina y Europa Central suelen pedir en torno a 1000-2500 EUR al mes.
          </li>
          <li>
            <strong>Umbral más alto</strong>: destinos más ricos y caros pueden
            exigir 3500 EUR o más, a veces el doble para una pareja.
          </li>
          <li>
            <strong>Prueba</strong>: cuenta con mostrar varios meses de extractos
            bancarios o contratos, no solo una nómina.
          </li>
        </ul>
        <h2>¿Visado, permiso de residencia o vía a la ciudadanía?</h2>
        <p>
          No confundas un visado de nómada con la residencia permanente. La mayoría
          son temporales y <em>no</em> cuentan para la ciudadanía, aunque algunos
          se convierten en permisos de residencia más largos si te quedas y pagas
          impuestos. Lee la letra pequeña sobre las renovaciones y sobre si el
          tiempo transcurrido cuenta antes de construir planes a largo plazo en
          torno a ello.
        </p>
        <h2>La trampa fiscal que nadie anuncia</h2>
        <p>
          Un visado es permiso para quedarte; no es una promesa de que no te
          cobrarán impuestos. Cruza el umbral de residencia local —a menudo en
          torno a 183 días— y tu renta mundial puede pasar a tributar allí. Algunos
          esquemas de nómada contemplan una exención, muchos no. Verifica el
          tratamiento fiscal con un profesional en el destino antes de decidirte.
        </p>
        <p>
          Para ver qué lugares encajan con el trabajo remoto, empieza por nuestras{" "}
          <Link href={`/${l}/best/nomad`}>mejores ciudades para nómadas digitales</Link>,
          y luego consulta las líneas de impuestos y coste en las{" "}
          <Link href={`/${l}/countries`}>páginas de países</Link> pertinentes.
        </p>
      </>
    ),
  },
  "health-insurance-for-expats": {
    title: "Seguro médico al mudarte al extranjero: público, privado o ambos",
    excerpt:
      "El sistema que te cubre en casa rara vez te sigue al cruzar una frontera. Una mirada práctica a los esquemas públicos, la cobertura privada y por qué los nómadas necesitan algo más.",
    Body: ({ l }) => (
      <>
        <p>
          La cobertura sanitaria es la línea que la gente presupuesta la última y
          lamenta la primera. En cuanto te vas, el sistema de tu país de origen
          suele dejar de pagar, y lo que lo sustituye depende por completo de cómo
          llegas y cuánto tiempo te quedas.
        </p>
        <h2>Sistemas públicos: buenos, pero no automáticos</h2>
        <p>
          Muchos países tienen una sanidad pública excelente, pero el acceso está
          ligado a la residencia y, normalmente, a cotizar. Múdate a un sitio como{" "}
          <Link href={`/${l}/cost-of-living/berlin-de`}>Berlín</Link> con un visado
          de trabajo y por lo general te unirás al sistema obligatorio a través de
          las cotizaciones de la nómina. Llega como nómada o jubilado anticipado sin
          empleo local y puedes quedarte fuera durante meses, o del todo, hasta que
          reúnas los requisitos.
        </p>
        <h2>La cobertura privada llena el vacío</h2>
        <p>
          El seguro médico privado compra rapidez y opciones y, para los recién
          llegados, a menudo <em>es</em> la única opción hasta que se resuelve la
          residencia. En algunos países la prueba de cobertura privada es un
          requisito del visado. También importa en lugares donde el nivel público
          es precario: en una ciudad como{" "}
          <Link href={`/${l}/cost-of-living/bangkok-th`}>Bangkok</Link>, la mayoría
          de los expatriados dependen de hospitales y seguros privados en lugar del
          sistema público.
        </p>
        <h2>Por qué los nómadas necesitan cobertura internacional</h2>
        <p>
          Una póliza local se detiene en la frontera. Si te mudas cada pocos meses,
          un{" "}
          <strong>plan de salud global o internacional</strong> que te siga entre
          países —y cubra un viaje a casa— suele tener más sentido que ir cosiendo
          pólizas locales. El seguro de viaje no es lo mismo; es para viajes cortos
          y emergencias, no para la atención continuada.
        </p>
        <h2>Qué comprobar antes de contratar</h2>
        <ul>
          <li>
            <strong>Ámbito geográfico</strong>: ¿está incluido tu país de origen?
            Muchos planes más baratos lo excluyen, o excluyen EE. UU.
          </li>
          <li>
            <strong>Condiciones preexistentes</strong>: el motivo más común por el
            que se rechaza una reclamación. Declara todo.
          </li>
          <li>
            <strong>Hospitalización vs ambulatorio</strong>: los planes baratos a
            menudo solo cubren estancias hospitalarias, no las consultas de rutina.
          </li>
          <li>
            <strong>Renovabilidad y límites de edad</strong>: ¿puedes mantener la
            póliza a medida que envejeces, y da un salto la prima?
          </li>
        </ul>
        <p>
          Nada de esto es asesoramiento médico ni de seguros: la cobertura y la
          elegibilidad varían según la nacionalidad y el visado, así que confirma
          los detalles con un corredor autorizado antes de confiar en un plan.
        </p>
      </>
    ),
  },
  "budgeting-a-move-abroad-with-family": {
    title: "Presupuestar una mudanza al extranjero en familia: los costes que se acumulan",
    excerpt:
      "Mudarse solo es una maleta y una fianza. Mudar a una familia multiplica los costes puntuales y añade colegios, una vivienda más grande y un colchón mucho mayor.",
    Body: ({ l }) => (
      <>
        <p>
          Una persona sola puede mudarse al extranjero con lo justo e improvisar el
          resto. Una familia no. Los costes no solo escalan con el número de
          personas: aparecen categorías completamente nuevas, y el colchón que
          necesitas crece más rápido de lo que esperarías.
        </p>
        <h2>Los costes puntuales, multiplicados</h2>
        <p>
          Vuelos, envío, fianzas y tasas de visado se cuentan por persona. Añade la
          matrícula escolar, muebles nuevos para un sitio más grande y el coste de
          reponer todo lo que no pudiste llevarte. Es habitual que una mudanza
          familiar cueste varias veces el precio de una en solitario antes incluso
          de que venza el primer mes de alquiler.
        </p>
        <h2>Los colegios son el factor decisivo</h2>
        <p>
          La educación puede convertirse silenciosamente en tu mayor partida. Los
          colegios públicos pueden ser gratuitos pero impartir clase en el idioma
          local; los internacionales resuelven eso pero pueden costar tanto como el
          alquiler, por hijo. Tus opciones suelen reducirse a:
        </p>
        <ul>
          <li>
            <strong>Público local</strong>: el más barato, el mejor para la
            integración, el más duro al principio si hay barrera idiomática.
          </li>
          <li>
            <strong>Bilingüe o privado local</strong>: un término medio, variable
            en precio y disponibilidad.
          </li>
          <li>
            <strong>Internacional</strong>: currículo familiar e instrucción en
            inglés, pero presupuesta miles por hijo al año.
          </li>
        </ul>
        <h2>Una vivienda más grande cambia toda la ecuación</h2>
        <p>
          Una familia necesita dormitorios, y el salto de un piso de un dormitorio
          a uno de tres rara vez es lineal: los pisos de tamaño familiar en buenas
          zonas escolares tienen sobreprecio. Cuando compares ciudades, valora la
          vivienda que realmente alquilarías, no la media. Una forma rápida de
          contrastar los números son nuestras{" "}
          <Link href={`/${l}/calculators`}>calculadoras</Link>, y si estás sopesando
          comprar en vez de alquilar, la{" "}
          <Link href={`/${l}/calculators/mortgage-calculator`}>
            calculadora de hipoteca
          </Link>{" "}
          convierte un precio en una cifra mensual.
        </p>
        <h2>Construye un colchón mayor del que crees necesitar</h2>
        <p>
          Con dependientes, &quot;ya lo iré resolviendo&quot; no es un plan.
          Apunta a tener ahorrados seis meses de los gastos de vida del destino
          antes de irte, y ponlo a prueba frente a un inicio de trabajo retrasado o
          una oscilación de la divisa. Estirar ese colchón más lejos es más fácil
          en una ciudad genuinamente asequible: nuestra{" "}
          <Link href={`/${l}/best/cheapest`}>lista de ciudades más baratas</Link> es
          un buen sitio para encontrar una que aún cumpla los innegociables de tu
          familia.
        </p>
      </>
    ),
  },
  "renting-an-apartment-abroad": {
    title: "Alquilar un piso en el extranjero: fianzas, contratos y cómo evitar estafas",
    excerpt:
      "El mercado del alquiler es donde los recién llegados pierden más dinero y más sueño. Qué esperar de fianzas, agentes y contratos, y cómo detectar una estafa a tiempo.",
    Body: ({ l }) => (
      <>
        <p>
          Encontrar dónde vivir es la primera prueba real de una ciudad nueva, y es
          donde los estafadores hacen su mejor trabajo, porque vas con prisa, no
          conoces las normas locales y a menudo buscas antes de llegar. Un poco de
          estructura protege tu dinero y tus nervios.
        </p>
        <h2>Fianzas y dinero por adelantado</h2>
        <p>
          Cuenta con adelantar mucho de una vez: normalmente de una a tres
          mensualidades de fianza más el primer mes de alquiler, y a veces una
          comisión de agencia encima. En mercados competitivos como{" "}
          <Link href={`/${l}/cost-of-living/amsterdam-nl`}>Ámsterdam</Link>, los
          caseros pueden pedir aún más a inquilinos sin historial local. Conoce cómo
          se protegen las fianzas localmente, y consigue siempre un recibo firmado
          que indique el importe y las condiciones para su devolución.
        </p>
        <h2>Lee el contrato antes de firmar nada</h2>
        <p>
          La ley de arrendamientos varía enormemente. Comprueba el plazo de
          preaviso, quién paga las reparaciones y los suministros, si hay tope a las
          subidas de alquiler y qué cuenta como &quot;desgaste normal&quot; cuando
          te vayas. Si el contrato está solo en el idioma local, hazlo traducir:
          firmar algo que no puedes leer es como empiezan las disputas.
        </p>
        <h2>Comisiones de agencia y cómo funcionan</h2>
        <p>
          En algunos países el casero paga al agente; en otros lo hace el
          inquilino, a veces una mensualidad completa. Ninguna de las dos es una
          estafa en sí; la trampa es no saber cuál se aplica antes de ver el piso.
          Pregunta de entrada quién paga la comisión y qué cubre exactamente.
        </p>
        <h2>Cómo detectar una estafa de alquiler</h2>
        <ul>
          <li>
            <strong>El precio es demasiado bueno</strong>: un piso céntrico muy por
            debajo del precio de mercado en una ciudad como{" "}
            <Link href={`/${l}/cost-of-living/london-uk`}>Londres</Link> es cebo, no
            suerte.
          </li>
          <li>
            <strong>No puedes verlo</strong>: el &quot;dueño&quot; está en el
            extranjero y necesita una fianza para reservarlo. Nunca pagues por un
            sitio que no has visto, en persona o a través de un contacto de
            confianza.
          </li>
          <li>
            <strong>Presión y transferencias bancarias</strong>: la urgencia más un
            método de pago irreversible es la combinación clásica. Ve más despacio.
          </li>
          <li>
            <strong>Sin contrato por escrito</strong>: si se resisten a poner los
            términos por escrito, aléjate.
          </li>
        </ul>
        <p>
          Siempre que puedas, asegura primero un alojamiento a corto plazo y firma
          un contrato largo solo después de haber visto el piso y conocido al
          casero. La quincena extra en un alquiler cuesta menos que una fianza que
          no recuperas.
        </p>
      </>
    ),
  },
  "tax-breaks-for-new-residents": {
    title: "Ventajas fiscales para nuevos residentes: cómo funcionan de verdad los regímenes especiales",
    excerpt:
      "Varios países atraen a migrantes cualificados con esquemas de tributación reducida. Pueden transformar las cuentas, pero vienen con condiciones, plazos y una fecha de caducidad.",
    Body: ({ l }) => (
      <>
        <p>
          Para atraer talento e ingresos remotos, varios países ofrecen a los
          recién llegados un descuento fiscal temporal, a veces drástico. Estos
          regímenes especiales pueden inclinar una decisión de reubicación, pero
          también se malinterpretan mucho, y las reglas cambian a menudo.
        </p>
        <h2>Qué hacen en realidad estos regímenes</h2>
        <p>
          La mayoría funcionan eximiendo o descontando parte de tus ingresos
          durante un número fijo de años. Portugal tuvo un esquema muy conocido para
          nuevos residentes; Italia ha ofrecido grandes exenciones sobre la renta a
          quienes trasladan allí su residencia fiscal; otros conceden tipos planos o
          exclusiones para la renta extranjera. El hilo común: una ventana limitada
          de trato favorable para hacerte cruzar la puerta.
        </p>
        <h2>Las condiciones son estrictas</h2>
        <p>
          Un descuento para el que no calificas no vale nada, así que lee primero
          las reglas de elegibilidad. Ataduras típicas:
        </p>
        <ul>
          <li>
            <strong>Debes ser genuinamente nuevo</strong>: normalmente no haber sido
            residente fiscal allí en los 5-10 años anteriores.
          </li>
          <li>
            <strong>La profesión o el tipo de ingreso importa</strong>: algunos
            esquemas solo cubren ciertos empleos cualificados, pensiones o renta de
            origen extranjero.
          </li>
          <li>
            <strong>Tienes que registrarte a tiempo</strong>: si pierdes el plazo de
            solicitud tras mudarte, puedes perder el beneficio por completo.
          </li>
          <li>
            <strong>Caduca</strong>: son temporales, a menudo de 5-10 años, tras los
            cuales se aplican los tipos normales.
          </li>
        </ul>
        <h2>Las salvedades que nadie pone en el folleto</h2>
        <p>
          Los gobiernos cambian o cierran estos esquemas con poco aviso, y un
          régimen generoso hoy puede haber desaparecido antes de que llegues. También
          puede haber un pinchazo en casa: tu país anterior puede seguir cobrándote
          impuestos, o puede aplicarse un impuesto de salida cuando te vayas. Y un
          tipo bajo de portada no sirve de nada si el coste de vida se come el
          ahorro.
        </p>
        <h2>Cómo usarlos en una decisión</h2>
        <p>
          Trata un régimen especial como un extra, no como todo el argumento de una
          mudanza. Compara primero los fundamentos de base —pon dos países uno al
          lado del otro, por ejemplo{" "}
          <Link href={`/${l}/compare-countries/portugal-vs-germany`}>
            Portugal vs Alemania
          </Link>{" "}
          — y explora las líneas fiscales principales en nuestras{" "}
          <Link href={`/${l}/countries`}>páginas de países</Link>. Luego, como estas
          reglas son técnicas y cambian con frecuencia, confirma los términos
          vigentes con un asesor fiscal en el destino. Nada de lo aquí escrito es
          asesoramiento fiscal.
        </p>
      </>
    ),
  },
};

export default es;
