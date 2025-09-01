"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Star, StarHalf, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
  RoomGallery,
  RoomDescription,
  RoomAmenities,
  RoomReviews,
  type Review,
} from "@/modules/rooms";
import { useRoomDetails } from "@/modules/rooms/hook/useRoomDetails";
import BookingWidget from "@/components/RoomDetails/BookingWidget";

const RoomDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const roomId = id || "/not/Erro"; // Default to room 1 if no ID provided

  const { roomData, loading, error, refetch } = useRoomDetails(roomId);

  const [reviews, setReviews] = useState(roomData?.reviews || []);

  useEffect(() => {
    if (roomData?.reviews) {
      setReviews(roomData.reviews);
    }
  }, [roomData]);

  const handleBooking = (data: any) => {
    console.log("Reserva realizada:", data);
    try {
      console.log("Procesando reserva...", {
        roomId: roomData?.id,
        roomType: roomData?.roomType.name,
        bookingData: data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error al procesar la reserva:", error);
    }
  };

  const handleAddReview = (newReview: Omit<Review, "id" | "date">) => {
    const review = {
      id: reviews.length + 1, // Generar un ID único
      ...newReview,
      date: new Date().toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
    setReviews([review, ...reviews]);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando detalles de la habitación...</p>
        </div>
      </div>
    );
  }

  if (error || !roomData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            Error al cargar la habitación: {error}
          </p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('${roomData.mainImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 backdrop-blur-md bg-white/40"></div>
      </div>

      <main className="relative z-10 pt-16 md:pt-24 pb-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/rooms-and-suites"
            className="inline-flex items-center text-gray-700 hover:text-red-600 text-sm mb-4 md:mb-6 font-semibold"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Volver a Habitaciones</span>
            <span className="sm:hidden">Volver</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 md:p-8 mb-6 md:mb-8">
                <h1 className="text-2xl md:text-4xl font-bold mb-4">
                  {roomData.roomType.name}
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
                      {roomData.reviewStats.averageRating.toFixed(1)} (
                      {roomData.reviewStats.totalReviews} reseñas)
                    </span>
                  </div>
                  <span className="hidden sm:inline mx-3">•</span>
                  <span className="flex items-center text-sm md:text-base">
                    <MapPin className="mr-1 h-3 md:h-4 w-3 md:w-4" />
                    Piso {roomData.floor}, {roomData.view}
                  </span>
                </div>

                <RoomGallery
                  images={roomData.images}
                  mainTitle={roomData.roomType.name}
                />
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 md:p-8 mb-6 md:mb-8">
                <RoomDescription
                  description={roomData.roomType.description}
                  details={`Habitación ${roomData.roomNumber} - ${roomData.roomType.bedSummary}. Capacidad máxima: ${roomData.roomType.maxCapacity} huéspedes.`}
                />
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 md:p-8 mb-6 md:mb-8">
                <RoomAmenities amenitiesData={roomData.amenities} />
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 md:p-8">
                <RoomReviews
                  reviews={reviews}
                  averageRating={roomData.reviewStats.averageRating}
                  totalReviews={roomData.reviewStats.totalReviews}
                  onAddReview={handleAddReview}
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              <BookingWidget
                roomId={roomId}
                pricePerNight={roomData.roomType.basePrice}
                onBooking={handleBooking}
                maxGuests={roomData?.roomType.maxCapacity || 4}
                minNights={1}
                maxNights={30}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoomDetailsPage;
