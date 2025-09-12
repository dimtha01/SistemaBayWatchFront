export const schedulesData = [
  {
    id: "r1",
    name: "Restaurante 'El Sabor'",
    description: "Cocina de autor con ingredientes frescos y de temporada.",
    fullDescription: "Experiencia gastronómica única con platos elaborados por nuestro chef ejecutivo. Ambiente elegante con vista al mar y servicio personalizado.",
    image: "/images/restaurante.webp",
    rating: 4.9,
    capacity: "2-8 personas",
    location: "Planta Baja - Vista al Mar",
    specialties: ["Mariscos Frescos", "Carnes Premium", "Postres Artesanales"],
    schedule: [
      { day: "Desayuno", time: "07:00 - 10:30", available: true, capacity: 80 },
      { day: "Almuerzo", time: "12:30 - 15:00", available: false, capacity: 0, reason: "Evento privado" },
      { day: "Cena", time: "19:00 - 22:30", available: true, capacity: 15 },
    ],
    isOpen: true,
    maintenanceMode: false,
    type: "restaurant"
  },
  {
    id: "b2",
    name: "Bar 'El Refugio'",
    description: "Ambiente íntimo con cócteles clásicos y música jazz.",
    fullDescription: "Bar de estilo speakeasy con decoración vintage. Especializado en cócteles clásicos preparados por mixólogos expertos. Ambiente tenue con música jazz en vivo y una selección premium de whiskies y rones añejos.",
    image: "/images/restaurante.webp",
    rating: 4.6,
    capacity: "2-8 personas",
    location: "Planta Baja - Zona Lounge",
    specialties: ["Cócteles Clásicos", "Whiskies Premium", "Música Jazz en Vivo"],
    schedule: [
      { day: "Lunes a Miércoles", time: "18:00 - 01:00", available: true, capacity: 8, reason: null },
      { day: "Jueves a Sábado", time: "17:00 - 02:00", available: true, capacity: 8, reason: null },
      { day: "Domingo", time: "19:00 - 00:00", available: false, capacity: 0, reason: "Evento privado" }
    ],
    isOpen: true,
    maintenanceMode: false,
    type: "bar"
  },
  {
    id: "r2",
    name: "Cafetería 'Dulce Amanecer'",
    description: "El lugar perfecto para un café y repostería recién hecha.",
    fullDescription: "Ambiente acogedor para disfrutar del mejor café de la región. Repostería artesanal, desayunos completos y opciones saludables.",
    image: "/images/Cafetería 'Dulce Amanecer'.webp",
    rating: 4.7,
    capacity: "1-6 personas",
    location: "Lobby - Planta Baja",
    specialties: ["Café Artesanal", "Repostería Casera", "Desayunos Saludables"],
    schedule: [
      { day: "Lunes - Viernes", time: "06:30 - 18:00", available: true, capacity: 45 },
      { day: "Sábados - Domingos", time: "07:00 - 19:00", available: true, capacity: 8 },
    ],
    isOpen: true,
    maintenanceMode: false,
    type: "cafe"
  },
];
