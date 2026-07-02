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
    position: [-7.5, 4.7, 4.7],   // lat=28°, lon=-58°
    color: "#3a9a4a",
    markerColor: "#4EDEA3",
    cameraPosition: [0, 14, 18],
    cameraTarget: [0, 0, 0],
    detailCameraPosition: [-13.5, 8.5, 8.5],
    detailCameraTarget: [-7.5, 4.7, 4.7],
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
    position: [0.4, 5.7, 8.2],    // lat=35°, lon=3°
    color: "#e8c170",
    markerColor: "#FFB347",
    cameraPosition: [0, 14, 18],
    cameraTarget: [0, 0, 0],
    detailCameraPosition: [0.7, 10.3, 14.8],
    detailCameraTarget: [0.4, 5.7, 8.2],
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
    position: [5.1, 7.7, 4.0],    // lat=50°, lon=52°
    color: "#dff4fb",
    markerColor: "#88CCE8",
    cameraPosition: [0, 14, 18],
    cameraTarget: [0, 0, 0],
    detailCameraPosition: [9.2, 13.9, 7.2],
    detailCameraTarget: [5.1, 7.7, 4.0],
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
    position: [-2.6, 1.7, 9.5],   // lat=10°, lon=-15° — equatorial front, shallow reef
    color: "#2a7aa8",
    markerColor: "#4A90D9",
    cameraPosition: [0, 14, 18],
    cameraTarget: [0, 0, 0],
    detailCameraPosition: [-4.7, 3.1, 17.1],
    detailCameraTarget: [-2.6, 1.7, 9.5],
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
    position: [-7.6, 3.8, -5.3],  // lat=22°, lon=-125°
    color: "#5a9a3a",
    markerColor: "#6BCB77",
    cameraPosition: [0, 14, 18],
    cameraTarget: [0, 0, 0],
    detailCameraPosition: [-13.7, 6.8, -9.5],
    detailCameraTarget: [-7.6, 3.8, -5.3],
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
    position: [8.5, 4.2, -3.1],   // lat=25°, lon=110°
    color: "#a8421a",
    markerColor: "#FF6B35",
    cameraPosition: [0, 14, 18],
    cameraTarget: [0, 0, 0],
    detailCameraPosition: [15.3, 7.6, -5.6],
    detailCameraTarget: [8.5, 4.2, -3.1],
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
    position: [4.9, -1.7, 8.5],
    color: "#c9a84c",
    markerColor: "#E8B84B",
    cameraPosition: [0, 14, 18],
    cameraTarget: [0, 0, 0],
    detailCameraPosition: [8.8, -3.1, 15.3],
    detailCameraTarget: [4.9, -1.7, 8.5],
    projects: [],
  },
  {
    id: "swamp",
    name: "Pantano Profundo",
    description: "Manglares ancestrales sobre aguas turbias, hongos luminiscentes y tortugas entre raices emergentes.",
    position: [-9.8, 0.9, -1.7],
    color: "#3d5a2a",
    markerColor: "#7BC67E",
    cameraPosition: [0, 14, 18],
    cameraTarget: [0, 0, 0],
    detailCameraPosition: [-17.6, 1.6, -3.1],
    detailCameraTarget: [-9.8, 0.9, -1.7],
    projects: [],
  },
  {
    id: "taiga",
    name: "Taiga Boreal",
    description: "Bosque de coniferas bajo manto de nieve, zorros entre pinos helados y auroras en el horizonte.",
    position: [-4.1, 8.2, 3.8],
    color: "#dce8ee",
    markerColor: "#A8D8EA",
    cameraPosition: [0, 14, 18],
    cameraTarget: [0, 0, 0],
    detailCameraPosition: [-7.4, 14.8, 6.8],
    detailCameraTarget: [-4.1, 8.2, 3.8],
    projects: [],
  },
  {
    id: "reef",
    name: "Gran Arrecife",
    description: "Coral multicolor bajo aguas tropicales, cardumenes de peces y tortugas marinas entre anemones.",
    position: [7.5, -3.4, 5.0],
    color: "#ffe8a0",
    markerColor: "#00CED1",
    cameraPosition: [0, 14, 18],
    cameraTarget: [0, 0, 0],
    detailCameraPosition: [13.5, -6.1, 9.0],
    detailCameraTarget: [7.5, -3.4, 5.0],
    projects: [],
  },
];
