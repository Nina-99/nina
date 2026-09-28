/**
 * ---------------------------------------------------------------------------
 * PRODUCTS — PLACEHOLDER DATA
 * This single array feeds BOTH the home grid and each /productos/:slug page.
 * To add a product: append an object here. No UI changes needed.
 *
 * Optional media: drop a file in /public/media and set `video` or `image`
 * (e.g. video: '/media/flowdeck.mp4'). If omitted, a gradient panel is shown.
 * ---------------------------------------------------------------------------
 */

export type ProductStatus = "live" | "beta" | "soon";

export type ProductFeature = {
  title: string;
  text: string;
};

export type ProductMetric = {
  value: string;
  label: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  description: string;
  status: ProductStatus;
  /** Gradient colours used for the placeholder visual. */
  accent: string;
  accent2: string;
  features: ProductFeature[];
  metrics?: ProductMetric[];
  /** Product video (mp4). Shown in the product page hero frame. */
  video?: string;
  /** Poster frame shown before the video loads. */
  poster?: string;
  /** Static image, used when there is no video. */
  image?: string;
  /** Media frame orientation on the product page. Defaults to landscape 16:9. */
  mediaAspect?: "landscape" | "portrait";
  /** How the static image fills its box. Use 'contain' for logos. Default 'cover'. */
  visualFit?: "cover" | "contain";
};

export const products: Product[] = [
  {
    slug: "yottu",
    name: "Yottu",
    category: "Marketplace de belleza",
    tagline: "Todo el mundo de la belleza, en un solo lugar.",
    summary:
      "La plataforma que conecta clientes con centros de belleza de todo tipo: reservas, mapa, calificaciones y la mejor experiencia.",
    description:
      "Yottu conecta a las personas con centros de belleza de todo tipo — desde una peluquería de barrio hasta un gran centro estético. Los clientes reservan turno, encuentran el centro que buscan en el mapa y califican el servicio al terminarlo. Del otro lado, cada centro registra a su staff para validar y cerrar las reservas. El pago del centro se hace por tokens (Yottus). Disponible en web y en Android.",
    status: "beta",
    accent: "#f5c542",
    accent2: "#b8862f",
    mediaAspect: "portrait",
    visualFit: "contain",
    image: "/media/yotu/img/yotu.png",
    video: "/media/yotu/video/yotu.web.mp4",
    // poster: "/media/yotu/video/yotu-poster.jpg",
    poster: "/media/yotu/img/yotu.png",
    features: [
      {
        title: "Reservas en línea",
        text: "Los clientes reservan turno desde la web o la app, en segundos.",
      },
      {
        title: "Mapa con Top 10",
        text: "Los centros mejor calificados se destacan en el mapa, sin excluir al resto.",
      },
      {
        title: "Web y Android",
        text: "La misma cuenta en el navegador y en la app, con el mismo historial.",
      },
      {
        title: "Panel para el staff",
        text: "Cada centro registra a su personal, que valida y cierra las reservas.",
      },
      {
        title: "Calificaciones reales",
        text: "La puntuación se deja una vez terminado el servicio, no antes.",
      },
      {
        title: "Pago con tokens",
        text: "El centro paga por tokens (Yottus).",
      },
    ],
  },
  // {
  //   slug: "pulseboard",
  //   name: "PulseBoard",
  //   category: "Analitica en tiempo real",
  //   tagline: "Las metricas de tu negocio, vivas en una pantalla.",
  //   summary:
  //     "Dashboards en tiempo real que se conectan a tus fuentes y se actualizan solos.",
  //   description:
  //     "PulseBoard unifica tus fuentes de datos y las convierte en dashboards que se actualizan al segundo. Ideal para equipos que necesitan tomar decisiones sobre datos frescos, no sobre el reporte del mes pasado.",
  //   status: "live",
  //   accent: "#22d3ee",
  //   accent2: "#3b82f6",
  //   features: [
  //     {
  //       title: "Conectores",
  //       text: "Postgres, MySQL, Sheets, APIs REST y 30 fuentes mas.",
  //     },
  //     {
  //       title: "Alertas",
  //       text: "Defini umbrales y recibi avisos antes de que el problema explote.",
  //     },
  //     {
  //       title: "Compartir",
  //       text: "Publica un tablero con un link, con permisos granulares.",
  //     },
  //     {
  //       title: "Consultas",
  //       text: "Un editor SQL liviano para los que quieren ir mas profundo.",
  //     },
  //   ],
  //   metrics: [
  //     { value: "< 2s", label: "Latencia de actualizacion" },
  //     { value: "30+", label: "Conectores nativos" },
  //     { value: "1M", label: "Eventos por minuto" },
  //   ],
  // },
  // {
  //   slug: "linkbridge",
  //   name: "LinkBridge",
  //   category: "Integraciones",
  //   tagline: "Conecta tus sistemas sin escribir plomería.",
  //   summary:
  //     "Un hub de integraciones que mantiene tus herramientas hablando entre si, en tiempo real.",
  //   description:
  //     "LinkBridge es el pegamento entre tus sistemas. Sincroniza datos entre tu CRM, tu facturacion y tus herramientas internas, gestiona reintentos, y te avisa cuando algo falla. Todo con observabilidad incluida.",
  //   status: "beta",
  //   accent: "#34d399",
  //   accent2: "#06b6d4",
  //   features: [
  //     {
  //       title: "Webhooks",
  //       text: "Entrada y salida con validacion de firma y reintentos.",
  //     },
  //     {
  //       title: "Mapeo visual",
  //       text: "Transforma campos entre sistemas sin tocar codigo.",
  //     },
  //     {
  //       title: "Reintentos",
  //       text: "Cola con backoff exponencial y dead-letter queue.",
  //     },
  //     {
  //       title: "Observabilidad",
  //       text: "Cada mensaje trazable de punta a punta.",
  //     },
  //   ],
  //   metrics: [
  //     { value: "99.9%", label: "Entregas exitosas" },
  //     { value: "40ms", label: "Latencia media" },
  //     { value: "100k", label: "Mensajes por hora" },
  //   ],
  // },
  // {
  //   slug: "sentrygrid",
  //   name: "SentryGrid",
  //   category: "Observabilidad",
  //   tagline: "Enterate de los problemas antes que tus usuarios.",
  //   summary:
  //     "Monitoreo de aplicaciones, logs y seguridad en un solo lugar, con alertas inteligentes.",
  //   description:
  //     "SentryGrid centraliza metricas, logs y eventos de seguridad. Detecta anomalias de comportamiento, correlaciona errores con deploys, y reduce el ruido de alertas para que tu equipo de guardia duerma tranquilo.",
  //   status: "beta",
  //   accent: "#f59e0b",
  //   accent2: "#ef4444",
  //   features: [
  //     {
  //       title: "Deteccion de anomalias",
  //       text: "Modelos que aprenden la linea base de tu sistema.",
  //     },
  //     {
  //       title: "Correlacion",
  //       text: "Ata cada error al deploy que lo introdujo.",
  //     },
  //     {
  //       title: "Seguridad",
  //       text: "Reglas para detectar accesos y patrones sospechosos.",
  //     },
  //     {
  //       title: "Alertas",
  //       text: "Agrupacion inteligente para terminar con la fatiga de alertas.",
  //     },
  //   ],
  //   metrics: [
  //     { value: "-85%", label: "Ruido de alertas" },
  //     { value: "24/7", label: "Monitoreo continuo" },
  //     { value: "3 min", label: "Tiempo medio de deteccion" },
  //   ],
  // },
  {
    slug: "orbit",
    name: "Orbit",
    category: "Marketplace de fútbol",
    tagline: "El kit de herramientas para los que construyen.",
    summary:
      "Una plataforma que da una solución integral multiescuela para revolucionar el fútbol formativo.",
    description:
      "Unificamos en un solo lugar la gestión administrativa de las academias, el seguimiento analítico del rendimiento de cada estudiante y un marketplace exclusivo donde las escuelas de fútbol pueden proyectar su oferta deportiva, conectar con familias y captar nuevos talentos.",
    status: "soon",
    accent: "#a78bfa",
    accent2: "#6366f1",
    features: [
      {
        title: "Gestión Integral de Academias",
        text: "Automatización de inscripciones, control de asistencias, pagos, calendariios de entrenamiento y organización de plantillas para una o múltiples sedes.",
      },
      {
        title: "Seguimiento y Analítica de Rendimiento",
        text: "Registro y evaluación continua del desarrollo físico, técnico, táctico y diciplinario de cada alumno mediante reportes visuales y métricas de evolución.",
      },
      {
        title: "Marketplace Unificado de Escuelas",
        text: "Espacio centralizado donde las academias promocionan sus cursos, campamentos y torneos, permitiendo a familias y cazatalentos comparar, descubrir y conectar directamente con las mejores escuelas.",
      },
    ],
  },
];

export function getProduct(slug: string | undefined) {
  return products.find((product) => product.slug === slug);
}
