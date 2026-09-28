/**
 * ---------------------------------------------------------------------------
 * SITE CONTENT — PLACEHOLDER
 * Everything here is invented so the site renders. Replace with your real copy.
 * ---------------------------------------------------------------------------
 */

export type NavItem = { label: string; href: string };
export type Social = { label: string; url: string };
export type FaqItem = { question: string; answer: string };
export type Stat = { value: string; label: string };
export type RoadmapItem = { title: string; note: string; quarter: string };

export const site = {
  name: "Nina",
  legalName: "Nina Dev",
  tagline: "Software que pone tu negocio en orbita.",
  email: "ninadev.office@gmail.com",
  phone: "+591 68365165",
  location: "Oruro, Bolivia",

  // Hero headline, split into lines so each one can animate on its own.
  heroLines: ["Forjamos tecnología", "que enciende tu", "futuro."],
  heroEyebrow: "Estudio de producto · Desde 2025",
  heroIntro:
    "Diseñamos, construimos y operamos productos de software que resuelven problemas concretos. Sin humo.",

  nav: [
    { label: "Productos", href: "#productos" },
    { label: "Lanzamientos", href: "#lanzamientos" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Vision", href: "#vision" },
    { label: "FAQ", href: "#faq" },
    { label: "Contacto", href: "#contacto" },
  ] satisfies NavItem[],

  socials: [
    { label: "GitHub", url: "https://github.com/Nina-99" },
    { label: "LinkedIn", url: "https://linkedin.com" },
    { label: "X", url: "https://x.com" },
  ] satisfies Social[],

  about: {
    eyebrow: "Quienes somos",
    /* Words wrapped in *asterisks* are painted with the fire gradient. */
    // title: "Un equipo chico, *obsesionado* con el detalle.",
    title:
      "Un equipo compacto de alto rendimiento *comprometido* con el rigor técnico.",
    paragraphs: [
      "Somos ingenieros de producto que se cansaron de la 'tecnología de escaparate': esa que luce impecable en una demostración, pero colapsa cuando el negocio real entra producción.",
      "No desarrollamos software aislado para una empresa en particular; construimos la plataforma que hace evolucionar a sectores enteros.",
      "Nacimos en 2025 automatizando operaciones donde más dolía. Esa obsesión por eliminar procesos manuales y cuellos de botella nos enseñó algo fundamental: el verdadero impacto no está en digitalizar un negocio a la vez, sino en poner en órbita a comunidades e industrias completas.",
    ],
    stats: [
      { value: "+40", label: "Equipos usando Nina" },
      { value: "12", label: "Industrias atendidas" },
      { value: "99.98%", label: "Uptime promedio" },
    ] satisfies Stat[],
  },

  vision: {
    title: "Vision",
    text: "Un mundo donde cualquier equipo, sin importar su tamaño, tenga acceso a software de operaciones del nivel que hoy solo pueden pagar las grandes corporaciones.",
  },

  // "Lo que se viene" — the honest answer to "what's next".
  roadmapLabel: "En el horno",
  roadmap: [
    {
      title: "App movil",
      note: "FlowDeck y PulseBoard para iOS y Android.",
      quarter: "Q3 2026",
    },
    {
      title: "SSO empresarial",
      note: "SAML y OIDC en toda la plataforma.",
      quarter: "Q3 2026",
    },
    {
      title: "SentryGrid",
      note: "Observabilidad y seguridad para tus servicios.",
      quarter: "Q4 2026",
    },
    {
      title: "Nuevas regiones",
      note: "Infraestructura en Brasil y Espana.",
      quarter: "2027",
    },
  ] satisfies RoadmapItem[],

  mission: {
    title: "Mision",
    text: "Construir productos de software claros, confiables y honestos que le devuelvan tiempo a la gente. Menos planillas, menos friccion, mas foco en lo que importa.",
  },

  faq: [
    {
      question: "Que hace exactamente Nina?",
      answer:
        "Construimos y operamos productos de software para equipos de operaciones, datos e ingenieria. Cada producto resuelve un problema puntual y se integra con el resto del ecosistema.",
    },
    {
      question: "Puedo probar los productos antes de pagar?",
      answer:
        "Si. Todos nuestros productos tienen un plan gratuito o un periodo de prueba de tokens de regalos sin tarjeta de credito.",
    },
    {
      question: "Ofrecen desarrollos a medida?",
      answer:
        "En casos puntuales si. Escribinos contando el problema y evaluamos si encaja con lo que hacemos.",
    },
    {
      question: "Como manejan la seguridad y los datos?",
      answer:
        "Los datos se cifran en transito y en reposo. Trabajamos con proveedores de infraestructura certificados y hacemos auditorias de accesos de forma periodica.",
    },
    {
      question: "En que paises operan?",
      answer:
        "Estamos radicados en Bolivia y trabajamos con clientes de toda Latinoamerica de forma remota.",
    },
    {
      question: "Como los contacto?",
      answer:
        "Por email a ninadev.office@gmail.com o usando el formulario de contacto de esta pagina. Respondemos en menos de 24 horas habiles.",
    },
  ] satisfies FaqItem[],

  contact: {
    eyebrow: "Contacto",
    title: "Hablemos.",
    text: "Contanos que necesitas y te respondemos en menos de 24 horas habiles.",
  },

  footerNote: "Hecho con foco en el detalle.",
};
