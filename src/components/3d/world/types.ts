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

// All biome positions are on a sphere of radius 10, computed as:
//   x = R * cos(lat) * sin(lon)
//   y = R * sin(lat)
//   z = R * cos(lat) * cos(lon)
// where lat = elevation above equator, lon = azimuth from +Z axis.
// Detail cameras orbit from outside (radius 18) looking at the biome point.

export const BIOMES: BiomeData[] = [
  {
    id: "jungle",
    name: "Selva Tropical",
    description: "Ecosistema de alta densidad con flora exuberante, ruinas ancestrales y fauna exotica.",
    position: [-6.2, 2.6, 7.4],   // lat=15°N, lon=-40°
    color: "#3a9a4a",
    markerColor: "#4EDEA3",
    cameraPosition: [0, 14, 18],
    cameraTarget: [0, 0, 0],
    detailCameraPosition: [-11.2, 4.7, 13.3],
    detailCameraTarget: [-6.2, 2.6, 7.4],
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
    position: [1.5, 4.7, 8.7],    // lat=28°N, lon=10°
    color: "#e8c170",
    markerColor: "#FFB347",
    cameraPosition: [0, 14, 18],
    cameraTarget: [0, 0, 0],
    detailCameraPosition: [2.7, 8.5, 15.7],
    detailCameraTarget: [1.5, 4.7, 8.7],
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
    position: [4.8, 8.7, 1.3],    // lat=60°N, lon=75°
    color: "#dff4fb",
    markerColor: "#88CCE8",
    cameraPosition: [0, 14, 18],
    cameraTarget: [0, 0, 0],
    detailCameraPosition: [8.6, 15.7, 2.3],
    detailCameraTarget: [4.8, 8.7, 1.3],
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
    position: [5.0, -1.4, 8.6],   // lat=8°S, lon=30° — equatorial right-front
    color: "#2a7aa8",
    markerColor: "#4A90D9",
    cameraPosition: [0, 14, 18],
    cameraTarget: [0, 0, 0],
    detailCameraPosition: [9.0, -2.5, 15.5],
    detailCameraTarget: [5.0, -1.4, 8.6],
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
    position: [-7.4, 4.2, -5.2],  // lat=25°N, lon=-125°
    color: "#5a9a3a",
    markerColor: "#6BCB77",
    cameraPosition: [0, 14, 18],
    cameraTarget: [0, 0, 0],
    detailCameraPosition: [-13.3, 7.6, -9.4],
    detailCameraTarget: [-7.4, 4.2, -5.2],
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
    position: [8.5, 3.4, -4.0],   // lat=20°N, lon=115°
    color: "#a8421a",
    markerColor: "#FF6B35",
    cameraPosition: [0, 14, 18],
    cameraTarget: [0, 0, 0],
    detailCameraPosition: [15.3, 6.1, -7.2],
    detailCameraTarget: [8.5, 3.4, -4.0],
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
  {
    id: "savanna",
    name: "Sabana Dorada",
    description: "Llanura arida con acacias en parasol, termiteros y manadas de camellos bajo el sol abrasador.",
    position: [-2.5, -2.6, -9.3], // lat=15°S, lon=-165° — southern back
    color: "#c9a84c",
    markerColor: "#E8B84B",
    cameraPosition: [0, 14, 18],
    cameraTarget: [0, 0, 0],
    detailCameraPosition: [-4.5, -4.7, -16.7],
    detailCameraTarget: [-2.5, -2.6, -9.3],
    projects: [],
  },
  {
    id: "swamp",
    name: "Pantano Profundo",
    description: "Manglares ancestrales sobre aguas turbias, hongos luminiscentes y tortugas entre raices emergentes.",
    position: [-9.9, 0.9, 0.4],   // lat=5°N, lon=-88° — equatorial left
    color: "#3d5a2a",
    markerColor: "#7BC67E",
    cameraPosition: [0, 14, 18],
    cameraTarget: [0, 0, 0],
    detailCameraPosition: [-17.8, 1.6, 0.7],
    detailCameraTarget: [-9.9, 0.9, 0.4],
    projects: [],
  },
  {
    id: "taiga",
    name: "Taiga Boreal",
    description: "Bosque de coniferas bajo manto de nieve, zorros entre pinos helados y auroras en el horizonte.",
    position: [-4.4, 8.2, 3.7],   // lat=55°N, lon=-50° — northern left
    color: "#dce8ee",
    markerColor: "#A8D8EA",
    cameraPosition: [0, 14, 18],
    cameraTarget: [0, 0, 0],
    detailCameraPosition: [-7.9, 14.8, 6.7],
    detailCameraTarget: [-4.4, 8.2, 3.7],
    projects: [],
  },
  {
    id: "reef",
    name: "Gran Arrecife",
    description: "Coral multicolor bajo aguas tropicales, cardumenes de peces y tortugas marinas entre anemones.",
    position: [8.4, -5.0, 2.2],   // lat=30°S, lon=75° — southern right
    color: "#ffe8a0",
    markerColor: "#00CED1",
    cameraPosition: [0, 14, 18],
    cameraTarget: [0, 0, 0],
    detailCameraPosition: [15.1, -9.0, 4.0],
    detailCameraTarget: [8.4, -5.0, 2.2],
    projects: [],
  },
];
