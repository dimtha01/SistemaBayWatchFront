// data/experiences.ts
export type DiningExperience = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  duration: string;
  time: string;
  type: string;
  isVegetarianFriendly: boolean;
  isAlcoholIncluded: boolean;
  features: string[];
  fullDescription: string;
  chef: string;
  maxCapacity: number;
  location: string;
  dietaryRestrictions: string[];
  gallery: string[];
  schedule: {
    day: string;
    times: string[];
    available: boolean;
  }[];
};

export const diningExperiences: DiningExperience[] = [
  {
    id: "d1",
    name: "Cena Gourmet Mediterránea",
    description: "Menú degustación con influencias griegas, italianas y españolas para una experiencia culinaria única",
    fullDescription: "Sumérgete en una experiencia gastronómica única que celebra los sabores auténticos del Mediterráneo. Nuestro chef ejecutivo ha creado un menú degustación de 5 tiempos que combina técnicas culinarias tradicionales con toques modernos. Cada plato cuenta una historia, desde los olivos centenarios de Grecia hasta las costas doradas de España. Acompañado de una selección premium de vinos locales e internacionales, maridados perfectamente con cada curso. La velada se complementa con música en vivo que transporta a los comensales a las terrazas mediterráneas.",
    price: 75,
    image: "/images/comida mediterrania.webp",
    duration: "3 horas",
    time: "20:00 - 23:00",
    type: "Cena",
    isVegetarianFriendly: true,
    isAlcoholIncluded: true,
    features: ["5 platos gourmet", "Maridaje de vinos", "Música en vivo"],
    chef: "Chef Isabella Rossi",
    maxCapacity: 24,
    location: "Terraza Mediterránea - Piso 12",
    dietaryRestrictions: ["Vegetariano", "Vegano", "Sin gluten", "Sin lactosa"],
    gallery: [
      "/images/comida mediterrania.webp",
      "/images/comida mediterrania.webp",
      "/images/comida mediterrania.webp",
      "/images/comida mediterrania.webp"
    ],
    schedule: [
      { day: "Lunes", times: ["20:00"], available: true },
      { day: "Martes", times: ["20:00"], available: true },
      { day: "Miércoles", times: ["20:00"], available: false },
      { day: "Jueves", times: ["20:00"], available: true },
      { day: "Viernes", times: ["20:00", "21:30"], available: true },
      { day: "Sábado", times: ["19:00", "21:30"], available: true },
      { day: "Domingo", times: ["20:00"], available: true }
    ]
  },
  {
    id: "d3",
    name: "Degustación de Vinos Premium",
    description: "Selección exclusiva de los mejores vinos de la región con acompañamiento gourmet",
    fullDescription: "Una experiencia enológica excepcional guiada por nuestro sommelier certificado. Descubre 6 vinos premium cuidadosamente seleccionados de las mejores bodegas regionales e internacionales. Cada vino viene acompañado de una explicación detallada sobre su origen, proceso de elaboración y características únicas. La degustación incluye una exquisita tabla de quesos artesanales, embutidos premium y frutos secos, perfectamente maridados para realzar los sabores de cada vino. Aprende sobre técnicas de cata, maridajes y la historia vinícola de la región.",
    price: 60,
    image: "/images/degustacion de vinos premium.webp",
    duration: "2 horas",
    time: "18:00 - 20:00",
    type: "Degustación",
    isVegetarianFriendly: false,
    isAlcoholIncluded: true,
    features: ["6 vinos premium", "Tabla de quesos", "Guía sommelier"],
    chef: "Sommelier Marcus Dubois",
    maxCapacity: 16,
    location: "Cava Premium - Sótano",
    dietaryRestrictions: ["Sin gluten disponible"],
    gallery: [
      "/images/degustacion de vinos premium.webp",
      "/images/degustacion de vinos premium.webp",
      "/images/degustacion de vinos premium.webp",
      "/images/degustacion de vinos premium.webp"
    ],
    schedule: [
      { day: "Lunes", times: [], available: false },
      { day: "Martes", times: ["18:00"], available: true },
      { day: "Miércoles", times: ["18:00"], available: true },
      { day: "Jueves", times: ["18:00", "20:30"], available: true },
      { day: "Viernes", times: ["18:00", "20:30"], available: true },
      { day: "Sábado", times: ["16:00", "18:00", "20:30"], available: true },
      { day: "Domingo", times: ["18:00"], available: true }
    ]
  },
  {
    id: "d4",
    name: "Clase de Cocina con Chef",
    description: "Aprende los secretos de nuestra cocina estrella con técnicas profesionales",
    fullDescription: "Una experiencia culinaria inmersiva donde aprenderás de la mano de nuestro chef ejecutivo. Esta clase magistral te enseñará técnicas profesionales de cocina, desde el manejo del cuchillo hasta técnicas avanzadas de cocción. Trabajarás con ingredientes premium y aprenderás a crear 3 platos signature del restaurante. La clase incluye un recetario exclusivo con todos los secretos y técnicas enseñadas. Al final, disfrutarás de una degustación completa de todos los platos preparados, acompañados de vinos seleccionados. Perfecto para entusiastas de la cocina que quieren llevar sus habilidades al siguiente nivel.",
    price: 90,
    image: "/images/clases de cocina.webp",
    duration: "3.5 horas",
    time: "10:00 - 13:30",
    type: "Taller",
    isVegetarianFriendly: false,
    isAlcoholIncluded: false,
    features: ["Ingredientes premium", "Recetario exclusivo", "Degustación final"],
    chef: "Chef Executive Antonio Martínez",
    maxCapacity: 12,
    location: "Cocina Didáctica - Piso 2",
    dietaryRestrictions: ["Adaptable según necesidades"],
    gallery: [
      "/images/clases de cocina.webp",
      "/images/clases de cocina.webp",
      "/images/clases de cocina.webp",
      "/images/clases de cocina.webp"
    ],
    schedule: [
      { day: "Lunes", times: ["10:00"], available: true },
      { day: "Martes", times: ["10:00"], available: false },
      { day: "Miércoles", times: ["10:00"], available: true },
      { day: "Jueves", times: ["10:00"], available: true },
      { day: "Viernes", times: ["10:00"], available: true },
      { day: "Sábado", times: ["10:00", "15:00"], available: true },
      { day: "Domingo", times: ["10:00"], available: true }
    ]
  }
];
