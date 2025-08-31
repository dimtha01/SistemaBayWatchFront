import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Star, StarHalf } from "lucide-react";
import { Link } from "react-router-dom";
import { RoomGallery } from "@/components/RoomDetails/RoomGallery";
import { RoomDescription } from "@/components/RoomDetails/RoomDescription";
import { RoomAmenities } from "@/components/RoomDetails/RoomAmenities";
import { RoomReviews } from "@/components/RoomDetails/RoomReviews";
import { BookingWidget } from "@/modules/booking";
const RoomDetailsPage = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Ana García",
      avatar: "/avatars/ana.jpg",
      rating: 5,
      comment:
        "¡Una suite espectacular! Las vistas al mar son impresionantes y el jacuzzi privado fue el toque perfecto. El servicio de habitaciones fue impecable. ¡Volveremos sin duda!",
      date: "15 de Noviembre, 2023",
    },
    {
      id: 2,
      name: "Juan Pérez",
      avatar: "/avatars/juan.jpg",
      rating: 4.5,
      comment:
        "Muy buena experiencia. La suite es muy cómoda y las vistas son increíbles. Solo un pequeño detalle con el minibar, pero fue resuelto rápidamente. Recomendado.",
      date: "10 de Octubre, 2023",
    },
  ]);

  const roomImages = [
    "/images/habitacion ejecutiva.webp",
    "/images/habitacion ejecutiva.webp",
    "/images/habitacion ejecutiva.webp",
    "/images/habitacion ejecutiva.webp",
    "/images/habitacion ejecutiva.webp",
  ];

  const pricePerNight = 650;

  // ===== CONFIGURACIÓN DE FECHAS NO DISPONIBLES =====

  // Fechas individuales no disponibles
  const unavailableDates = [
    // Fechas festivas
    "2024-12-24", // Nochebuena
    "2024-12-25", // Navidad
    "2024-12-31", // Nochevieja
    "2025-01-01", // Año Nuevo
    "2025-02-14", // San Valentín (ya reservado)
    "2025-04-18", // Viernes Santo
    "2025-04-19", // Sábado Santo
    "2025-04-20", // Domingo de Resurrección
    "2025-05-01", // Día del Trabajador
    "2025-07-05", // Día de la Independencia
    "2025-07-24", // Natalicio de Bolívar
    "2025-10-12", // Día de la Resistencia Indígena
  ];

  // Períodos reservados (rangos de fechas)
  const reservedPeriods = [
    {
      start: "2024-12-15",
      end: "2024-12-23",
      reason: "Reserva confirmada - Temporada navideña",
    },
    {
      start: "2024-12-26",
      end: "2024-12-30",
      reason: "Reserva confirmada - Fin de año",
    },
    {
      start: "2025-01-02",
      end: "2025-01-08",
      reason: "Mantenimiento programado",
    },
    {
      start: "2025-01-15",
      end: "2025-01-22",
      reason: "Reserva confirmada - Evento corporativo",
    },
    {
      start: "2025-02-10",
      end: "2025-02-17",
      reason: "Reserva confirmada - San Valentín",
    },
    {
      start: "2025-03-01",
      end: "2025-03-05",
      reason: "Renovación de mobiliario",
    },
    {
      start: "2025-03-20",
      end: "2025-03-27",
      reason: "Reserva confirmada - Semana Santa",
    },
    {
      start: "2025-04-15",
      end: "2025-04-22",
      reason: "Reserva confirmada - Semana Santa",
    },
    {
      start: "2025-05-15",
      end: "2025-05-20",
      reason: "Evento privado - Boda",
    },
    {
      start: "2025-06-01",
      end: "2025-06-07",
      reason: "Mantenimiento de aires acondicionados",
    },
    {
      start: "2025-07-01",
      end: "2025-07-08",
      reason: "Reserva confirmada - Temporada vacacional",
    },
    {
      start: "2025-07-20",
      end: "2025-07-28",
      reason: "Reserva confirmada - Vacaciones de verano",
    },
    {
      start: "2025-08-10",
      end: "2025-08-17",
      reason: "Reserva confirmada - Temporada alta",
    },
    {
      start: "2025-09-05",
      end: "2025-09-12",
      reason: "Conferencia internacional",
    },
    {
      start: "2025-10-08",
      end: "2025-10-15",
      reason: "Reserva confirmada - Puente festivo",
    },
    {
      start: "2025-11-01",
      end: "2025-11-05",
      reason: "Mantenimiento general",
    },
    {
      start: "2025-11-20",
      end: "2025-11-27",
      reason: "Evento corporativo - Convención",
    },
    {
      start: "2025-12-10",
      end: "2025-12-31",
      reason: "Reserva confirmada - Temporada navideña",
    },
  ];

  // Configuración adicional para el widget
  const bookingConfig = {
    maxGuests: 4, // Máximo 4 huéspedes para esta suite
    minNights: 1, // Mínimo 2 noches para suite premium
    maxNights: 30, // Máximo 30 noches
  };

  // ===== FUNCIONES DE MANEJO =====

  // Define a type for the booking data
  interface BookingData {
    checkInDate: string;
    checkOutDate: string;
    guests: number;
  }

  // Función principal para manejar la reserva
  const handleBooking = (data: BookingData) => {
    console.log("Reserva realizada:", data);

    // Aquí puedes agregar lógica adicional como:
    // - Enviar datos al servidor
    // - Mostrar notificación de éxito
    // - Redirigir a página de confirmación
    // - Actualizar estado de disponibilidad

    // Ejemplo de procesamiento:
    try {
      // Simular envío al servidor
      console.log("Procesando reserva...", {
        roomType: "Suite Ocean View Premium",
        bookingData: data,
        timestamp: new Date().toISOString(),
      });

      // Aquí podrías hacer una llamada a tu API
      // await bookingAPI.createReservation(data);

      // Mostrar notificación de éxito (si tienes un sistema de notificaciones)
      // showNotification("Reserva confirmada exitosamente", "success");
    } catch (error) {
      console.error("Error al procesar la reserva:", error);
      // Manejar errores
      // showNotification("Error al procesar la reserva", "error");
    }
  };

  interface Review {
    name: string;
    avatar: string;
    rating: number;
    comment: string;
  }

  const handleAddReview = (newReview: Review) => {
    const review = {
      id: reviews.length + 1,
      ...newReview,
      date: new Date().toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
    setReviews([review, ...reviews]);
  };
  // Calcular promedio de rating
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Imagen de fondo con blur */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('/images/habitacion ejecutiva.webp ')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 backdrop-blur-md bg-white/40"></div>
      </div>

      {/* Contenido principal */}
      <main className="relative z-10 pt-16 md:pt-24 pb-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/habitaciones"
            className="inline-flex items-center text-gray-700 hover:text-red-600 text-sm mb-4 md:mb-6 font-semibold"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Volver a Habitaciones</span>
            <span className="sm:hidden">Volver</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              {/* Información principal */}
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 md:p-8 mb-6 md:mb-8">
                <h1 className="text-2xl md:text-4xl font-bold mb-4">
                  Suite Ocean View Premium
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 mb-6 gap-2 sm:gap-0">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      <Star className="fill-current h-4 md:h-5 w-4 md:w-5" />
                      <Star className="fill-current h-4 md:h-5 w-4 md:w-5" />
                      <Star className="fill-current h-4 md:h-5 w-4 md:w-5" />
                      <Star className="fill-current h-4 md:h-5 w-4 md:w-5" />
                      <StarHalf className="fill-current h-4 md:h-5 w-4 md:w-5" />
                    </div>
                    <span className="text-sm md:text-base">
                      {averageRating.toFixed(1)} ({reviews.length} reseñas)
                    </span>
                  </div>
                  <span className="hidden sm:inline mx-3">•</span>
                  <span className="flex items-center text-sm md:text-base">
                    <MapPin className="mr-1 h-3 md:h-4 w-3 md:w-4" />
                    Piso 12, Vista al Mar
                  </span>
                </div>

                <RoomGallery
                  images={roomImages}
                  mainTitle="Suite Ocean View Premium"
                />
              </div>

              {/* Descripción */}
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 md:p-8 mb-6 md:mb-8">
                <RoomDescription
                  description="Sumérgete en el lujo y la comodidad de nuestra Suite Ocean View Premium. Con un diseño elegante y moderno, esta suite ofrece vistas espectaculares al océano desde su balcón privado. Disfruta de una espaciosa sala de estar, un dormitorio principal con cama king-size y un baño de mármol con jacuzzi. Ideal para parejas o familias pequeñas que buscan una experiencia inolvidable."
                  details="Cada detalle ha sido cuidadosamente seleccionado para garantizar una estancia de máximo confort, desde la ropa de cama de algodón egipcio hasta el sistema de entretenimiento de última generación."
                />
              </div>

              {/* Amenidades */}
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 md:p-8 mb-6 md:mb-8">
                <RoomAmenities />
              </div>

              {/* Reseñas */}
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 md:p-8">
                <RoomReviews
                  reviews={reviews}
                  averageRating={averageRating}
                  totalReviews={reviews.length}
                  onAddReview={handleAddReview}
                />
              </div>
            </div>

            {/* Widget de reserva con fechas no disponibles */}
            <div className="lg:col-span-1">
              <BookingWidget
                pricePerNight={pricePerNight}
                onBooking={handleBooking}
                maxGuests={bookingConfig.maxGuests}
                minNights={bookingConfig.minNights}
                maxNights={bookingConfig.maxNights}
                unavailableDates={unavailableDates}
                reservedPeriods={reservedPeriods}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoomDetailsPage;
