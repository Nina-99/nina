/**
 * ---------------------------------------------------------------------------
 * LAUNCH VIDEOS — PLACEHOLDER DATA
 * Each item is a launch video. Drop a file in /public/media and set `video`
 * (e.g. video: '/media/lanzamiento-flowdeck.mp4') and it plays inline.
 * Without a `video`, a poster placeholder is shown.
 * ---------------------------------------------------------------------------
 */

export type Launch = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  accent: string;
  accent2: string;
  video?: string;
  poster?: string;
  /** Frame orientation. Defaults to landscape 16:9. */
  mediaAspect?: "landscape" | "portrait";
};

export const launches: Launch[] = [
  {
    id: "yottu",
    title: "Yottu",
    subtitle: "Marketplace de belleza",
    date: "Beta privada",
    accent: "#f5c542",
    accent2: "#b8862f",
    mediaAspect: "portrait",
    video: "/media/yotu/video/yotu.web.mp4",
    poster: "/media/yotu/video/yotu-poster.jpg",
  },
  {
    id: "orbit",
    title: "Orbit",
    subtitle: "El kit de los que construyen",
    date: "Marzo 2027",
    accent: "#a78bfa",
    accent2: "#6366f1",
  },
  // {
  //   id: 'flowdeck-2',
  //   title: 'FlowDeck 2.0',
  //   subtitle: 'Automatizacion, repensada',
  //   date: 'Enero 2026',
  //   accent: '#ff4d8d',
  //   accent2: '#7c5cff',
  // },
  // {
  //   id: 'pulseboard',
  //   title: 'PulseBoard',
  //   subtitle: 'Metricas en vivo',
  //   date: 'Noviembre 2025',
  //   accent: '#22d3ee',
  //   accent2: '#3b82f6',
  // },
  // {
  //   id: 'linkbridge',
  //   title: 'LinkBridge',
  //   subtitle: 'El hub de integraciones',
  //   date: 'Septiembre 2025',
  //   accent: '#34d399',
  //   accent2: '#06b6d4',
  // },
];
