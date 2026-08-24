import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

const es: Record<string, (p: { l: Locale }) => React.ReactNode> = {
  about: ({ l }) => (
    <>
      <p>
        CostTrek te ayuda a comparar el{" "}
        <strong>
          coste de vida, los impuestos, los salarios, la calidad de vida y los
          visados
        </strong>{" "}
        entre ciudades y países de todo el mundo, para que puedas ver lo que
        realmente implica una mudanza antes de hacerla. Todo está disponible en
        cinco idiomas.
      </p>
      <h2>Cómo funciona el índice de coste</h2>
      <p>
        Nuestra cifra principal es un índice del coste de vida en el que la
        ciudad estadounidense media se fija en <strong>100</strong>. Una ciudad
        con 60 es aproximadamente un 40&nbsp;% más barata que una ciudad
        estadounidense típica; una ciudad con 150 es cerca de un 50&nbsp;% más
        cara. El índice combina vivienda, alimentación, transporte, servicios
        públicos, sanidad y bienes de consumo cotidianos. Introduce tu salario
        en cualquier página de comparación para ver el equivalente que
        necesitarías para mantener el mismo nivel de vida en otro lugar.
      </p>
      <h2>De dónde proceden nuestros datos</h2>
      <ul>
        <li>
          <strong>Las cifras económicas</strong> —PIB per cápita, esperanza de
          vida e inflación— proceden de{" "}
          <a href="https://data.worldbank.org" rel="noopener" target="_blank">
            World Bank Open Data
          </a>
          .
        </li>
        <li>
          <strong>Los resúmenes fiscales y de visados</strong> se recopilan a
          partir de autoridades tributarias nacionales y fuentes públicas, a
          nivel general.
        </li>
        <li>
          <strong>
            El índice general de coste de las ciudades estadounidenses
          </strong>{" "}
          se ancla en las{" "}
          <a
            href="https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area"
            rel="noopener"
            target="_blank"
          >
            Regional Price Parities de la BEA
          </a>{" "}
          reales (todos los conceptos, EE.&nbsp;UU. = 100, 2023).
        </li>
        <li>
          <strong>Los alquileres de las áreas metropolitanas de EE.&nbsp;UU.</strong>{" "}
          utilizan el alquiler bruto medio real del{" "}
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
          <strong>
            Los desgloses por categorías, las estimaciones de alquiler de un
            dormitorio y las puntuaciones de calidad de vida
          </strong>{" "}
          son estimaciones recopiladas con fines de orientación general, que se
          refinan con el tiempo. Los índices de las ciudades internacionales son
          estimaciones calibradas.
        </li>
      </ul>
      <p>
        Trabajamos para mantener las cifras razonables y actualizadas, pero son
        estimaciones, no estadísticas oficiales. Nada de lo aquí expuesto
        constituye asesoramiento financiero, fiscal, legal ni migratorio;
        verifica cualquier dato importante con una fuente oficial o un
        profesional cualificado antes de tomar decisiones.
      </p>
      <h2>Para quién es</h2>
      <p>
        Personas que sopesan una reubicación, trabajadores remotos y nómadas
        digitales que eligen una base, empresas que planifican traslados y
        cualquiera que simplemente sienta curiosidad por saber hasta dónde le
        llegaría su dinero en otro lugar.
      </p>
      <h2>Ponte en contacto</h2>
      <p>
        ¿Preguntas, correcciones o ideas de colaboración? Consulta nuestra
        página de{" "}
        <Link href={`/${l}/contact`}>Contacto</Link>.
      </p>
    </>
  ),
  privacy: ({ l }) => (
    <>
      <p>
        Esta es una plantilla de política de privacidad para CostTrek; revísala
        con un profesional cualificado antes de basarte en ella. Explica qué
        recopilamos y por qué.
      </p>
      <h2>Información que recopilamos</h2>
      <p>
        CostTrek es un sitio de contenidos. No te pedimos que crees una cuenta
        ni que envíes datos personales para navegar por él. Recibimos
        automáticamente datos técnicos estándar (dirección IP, tipo de
        navegador, páginas vistas) y utilizamos cookies y tecnologías similares
        tal como se describe en nuestra política de{" "}
        <Link href={`/${l}/cookies`}>Cookies</Link>.
      </p>
      <h2>Cómo utilizamos los datos</h2>
      <ul>
        <li>Para operar, proteger y mejorar el sitio web.</li>
        <li>
          Para medir el tráfico con analíticas respetuosas con la privacidad.
        </li>
        <li>
          Para mostrar publicidad, que puede usar cookies para personalizar los
          anuncios.
        </li>
      </ul>
      <h2>Publicidad y terceros</h2>
      <p>
        Podemos mostrar anuncios servidos por redes de terceros (por ejemplo,
        Google AdSense). Estos socios pueden usar cookies para mostrar anuncios
        basados en tus visitas anteriores. Puedes controlar la publicidad
        personalizada a través de la configuración de tu dispositivo y navegador
        y, en la UE/RU, mediante las opciones de consentimiento que te
        presentamos.
      </p>
      <h2>Tus derechos</h2>
      <p>
        Según dónde vivas (por ejemplo, bajo el RGPD o la CCPA), puedes tener
        derecho a acceder a tus datos, corregirlos o eliminarlos y a oponerte a
        determinados tratamientos. Contáctanos para ejercerlos.
      </p>
      <h2>Contacto</h2>
      <p>
        ¿Preguntas sobre tus datos o esta política? Escribe a{" "}
        <a href="mailto:info@costtrek.com">info@costtrek.com</a>.
      </p>
    </>
  ),
  terms: () => (
    <>
      <p>
        Al usar CostTrek aceptas estas condiciones. Esta es una plantilla;
        revísala con un profesional cualificado antes de basarte en ella.
      </p>
      <h2>Uso solo informativo</h2>
      <p>
        Todas las cifras de coste de vida, impuestos y reubicación son
        estimaciones aproximadas ofrecidas con fines de información general. No
        constituyen asesoramiento financiero, fiscal, legal ni migratorio.
        Verifica cualquier dato importante con una fuente oficial o un
        profesional cualificado antes de tomar decisiones.
      </p>
      <h2>Sin garantía</h2>
      <p>
        El sitio se ofrece &quot;tal cual&quot;, sin garantías de ningún tipo.
        Hacemos todo lo posible por mantener los datos actualizados, pero no
        podemos garantizar que sean exactos, completos ni estén al día.
      </p>
      <h2>Enlaces externos</h2>
      <p>
        Podemos enlazar a sitios y servicios de terceros, algunos mediante
        acuerdos de afiliación. No somos responsables de sus contenidos ni de
        sus prácticas.
      </p>
      <h2>Cambios</h2>
      <p>
        Podemos actualizar estas condiciones; el uso continuado significa que
        aceptas los cambios.
      </p>
    </>
  ),
  cookies: () => (
    <>
      <p>
        CostTrek utiliza cookies —pequeños archivos almacenados en tu
        dispositivo— para hacer funcionar el sitio y, con tu consentimiento,
        para medir el tráfico y dar soporte a la publicidad.
      </p>
      <h2>Tipos de cookies que utilizamos</h2>
      <ul>
        <li>
          <strong>Esenciales</strong> — necesarias para que el sitio funcione
          (por ejemplo, recordar tu idioma y tu elección de cookies). Siempre
          activas.
        </li>
        <li>
          <strong>Analíticas</strong> — nos ayudan a entender qué páginas son
          útiles. Se establecen solo si las aceptas.
        </li>
        <li>
          <strong>Publicitarias</strong> — utilizadas por socios publicitarios
          (por ejemplo, Google AdSense) para medir y personalizar los anuncios.
          Se establecen solo si las aceptas.
        </li>
      </ul>
      <h2>Gestión de las cookies</h2>
      <p>
        Puedes aceptar o rechazar las cookies no esenciales mediante el aviso
        que se muestra en tu primera visita, y cambiar de opinión en cualquier
        momento borrando los datos de este sitio en tu navegador. También puedes
        bloquear las cookies en la configuración de tu navegador.
      </p>
    </>
  ),
  contact: () => (
    <>
      <p>
        Nos encantaría saber de ti: preguntas, comentarios, correcciones de
        datos o ideas de colaboración son todos bienvenidos. Procuramos
        responder en unos pocos días laborables.
      </p>
      <h2>Consultas generales y correcciones</h2>
      <p>
        Escribe a <a href="mailto:info@costtrek.com">info@costtrek.com</a>. Si
        una cifra parece incorrecta para una ciudad o país, dínoslo: estamos
        refinando los datos y agradecemos las indicaciones.
      </p>
      <h2>Publicidad y colaboraciones</h2>
      <p>
        Para consultas sobre publicidad, patrocinios o colaboraciones, escribe a{" "}
        <a href="mailto:ads@costtrek.com">ads@costtrek.com</a>.
      </p>
      <h2>Sobre el sitio</h2>
      <p>
        CostTrek es un proyecto independiente y financiado con publicidad que
        compara el coste de vida, los impuestos y la calidad de vida entre
        ciudades y países de todo el mundo.
      </p>
    </>
  ),
};

export default es;
