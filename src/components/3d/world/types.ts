export interface BiomeData {
  id: string;
  name: string;
  description: string;
  position: [number, number, number];
  color: string;
  markerColor: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  detailCameraPosition: [number, number, number];
  detailCameraTarget: [number, number, number];
  projects: BiomeProject[];
}

export interface BiomeProject {
  id: number;
  name: string;
  description: string;
  tech: string[];
  url: string;
  localPosition: [number, number, number];
}

export type ViewState = "map" | "transitioning" | "detail";

export const BIOMES: BiomeData[] = [
  {
    id: "jungle",
    name: "Selva Tropical",
    description: "Ecosistema de alta densidad con flora exuberante, ruinas ancestrales y fauna exotica.",
    position: [-12, 0, -4],
    color: "#3a9a4a",
    markerColor: "#4EDEA3",
    cameraPosition: [-12, 8, 4],
    cameraTarget: [-12, 0, -4],
    detailCameraPosition: [-12, 6, 2],
    detailCameraTarget: [-12, 0, -4],
    projects: [
      {
        id: 1,
        name: "E-commerce Tropical",
        description: "Plataforma de venta online con experiencia inmersiva y catalogo 3D de productos.",
        tech: ["Next.js", "Three.js", "Stripe"],
        url: "#",
        localPosition: [-2, 3, -1],
      },
      {
        id: 2,
        name: "App de Ecoturismo",
        description: "Aplicacion movil para reservas de tours ecologicos con mapas interactivos.",
        tech: ["React Native", "MapBox", "Node.js"],
        url: "#",
        localPosition: [2, 3.5, 1],
      },
    ],
  },
  {
    id: "desert",
    name: "Desierto Dorado",
    description: "Paisaje arido con dunas esculpidas, piramides ancestrales y oasis escondidos.",
    position: [0, 0, -10],
    color: "#e8c170",
    markerColor: "#FFB347",
    cameraPosition: [0, 8, -2],
    cameraTarget: [0, 0, -10],
    detailCameraPosition: [0, 6, -4],
    detailCameraTarget: [0, 0, -10],
    projects: [
      {
        id: 3,
        name: "Dashboard Energia Solar",
        description: "Panel de control para plantas solares con telemetria en tiempo real.",
        tech: ["React", "D3.js", "WebSocket"],
        url: "#",
        localPosition: [-1, 3, -2],
      },
    ],
  },
  {
    id: "arctic",
    name: "Tundra Artica",
    description: "Territorio helado con icebergs majestuosos, bases de investigacion y fauna polar.",
    position: [12, 0, -6],
    color: "#dff4fb",
    markerColor: "#88CCE8",
    cameraPosition: [12, 8, 2],
    cameraTarget: [12, 0, -6],
    detailCameraPosition: [12, 6, 0],
    detailCameraTarget: [12, 0, -6],
    projects: [
      {
        id: 4,
        name: "Plataforma Cientifica",
        description: "Sistema de gestion de datos climaticos con visualizaciones avanzadas.",
        tech: ["Python", "React", "PostgreSQL"],
        url: "#",
        localPosition: [1, 3, 0],
      },
    ],
  },
  {
    id: "ocean",
    name: "Oceano Profundo",
    description: "Mundo submarino con arrecifes de coral, fauna marina y restos de naufragios.",
    position: [0, -1.5, 4],
    color: "#2a7aa8",
    markerColor: "#4A90D9",
    cameraPosition: [0, 7, 12],
    cameraTarget: [0, -1, 4],
    detailCameraPosition: [0, 5, 10],
    detailCameraTarget: [0, -1, 4],
    projects: [
      {
        id: 5,
        name: "Simulador Oceanografico",
        description: "Herramienta de simulacion de corrientes marinas con visualizacion 3D.",
        tech: ["WebGL", "GLSL", "Three.js"],
        url: "#",
        localPosition: [0, 2.5, 1],
      },
    ],
  },
  {
    id: "forest",
    name: "Bosque Templado",
    description: "Bosque ancestral con arboles caducifolios, rios cristalinos y vida silvestre.",
    position: [-8, 0, 8],
    color: "#5a9a3a",
    markerColor: "#6BCB77",
    cameraPosition: [-8, 8, 16],
    cameraTarget: [-8, 0, 8],
    detailCameraPosition: [-8, 6, 14],
    detailCameraTarget: [-8, 0, 8],
    projects: [
      {
        id: 6,
        name: "Portal Inmobiliario",
        description: "Web con recorridos virtuales 3D de propiedades y sistema de reservas.",
        tech: ["Next.js", "R3F", "Prisma"],
        url: "#",
        localPosition: [-1, 3.5, 2],
      },
    ],
  },
  {
    id: "volcanic",
    name: "Islas Volcanicas",
    description: "Archipielago volcanico con lava incandescente, playas negras y vegetacion tropical.",
    position: [10, 0, 10],
    color: "#a8421a",
    markerColor: "#FF6B35",
    cameraPosition: [10, 8, 18],
    cameraTarget: [10, 0, 10],
    detailCameraPosition: [10, 9, 20],
    detailCameraTarget: [10, 2.5, 10],
    projects: [
      {
        id: 7,
        name: "Monitor Sismico",
        description: "Dashboard de actividad volcanica con alertas y predicciones basadas en IA.",
        tech: ["React", "TensorFlow.js", "Firebase"],
        url: "#",
        localPosition: [1, 4, 0],
      },
    ],
  },
];
