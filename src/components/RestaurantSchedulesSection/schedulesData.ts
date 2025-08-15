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
    id: "b1",
    name: "Bar 'La Terraza'",
    description: "Disfruta de cócteles exclusivos y vistas panorámicas.",
    fullDescription: "Rooftop bar con las mejores vistas de la ciudad. Cócteles artesanales, ambiente relajado y música en vivo los fines de semana.",
    image: "/images/Bar 'La Terraza'.webp",
    rating: 4.8,
    capacity: "2-12 personas",
    location: "Azotea - Piso 15",
    specialties: ["Cócteles Signature", "Vinos Premium", "Tapas Gourmet"],
    schedule: [
      { day: "Todos los días", time: "11:00 - 00:00", available: false, capacity: 0, reason: "Mantenimiento programado" }
    ],
    isOpen: false,
    maintenanceMode: true,
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
