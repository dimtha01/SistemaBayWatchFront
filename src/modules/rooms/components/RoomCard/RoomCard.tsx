"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Bed,
  Users,
  Star,
  Heart,
  Share2,
  Eye,
  MapPin,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { BookingData, RoomCardProps } from "../../types/room.types";
import { useRoomCardState, useRoomBooking, useAmenityIcons } from "../../hook";
import {
  VIEW_ICONS,
  VIEW_LABELS,
  DEFAULT_BOOKING_CONFIG,
} from "../../utils/room-card.constants";
import { useEffect, useState, type ReactNode } from "react";
import BookingWidget from "@/components/RoomDetails/BookingWidget";

export const RoomCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  capacity,
  bedType,
  view,
  amenities,
  rating = 4.5,
  reviewCount = 0,
  isPopular = false,
  discount,
  isAvailable = true,
  onClick,
}: RoomCardProps) => {
  const {
    isFavorite,
    imageLoaded,
    isModalOpen,
    setIsModalOpen,
    handleFavoriteClick,
    handleShareClick,
    handleReserveClick,
    handleImageLoad,
  } = useRoomCardState();

  const { handleBooking } = useRoomBooking();
  const { getAmenityIcon } = useAmenityIcons();


  const bookingConfig = DEFAULT_BOOKING_CONFIG;

  const onBookingSubmit = (data: BookingData) => {
    handleBooking(data, name);
  };

  // Estado para almacenar los iconos de las amenidades
  const [iconMap, setIconMap] = useState<{ [key: string]: ReactNode }>({});

  // Cargar iconos de amenidades de forma asíncrona
  useEffect(() => {
    const loadIcons = async () => {
      const icons: { [key: string]: ReactNode } = {};
      for (const amenity of amenities) {
        icons[amenity.icono] = await getAmenityIcon(amenity.icono);
      }
      setIconMap(icons);
    };

    loadIcons();
  }, [amenities, getAmenityIcon]);
  console.log(amenities);

  return (
    <Card
      className={cn(
        "group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border-0 shadow-md bg-white",
        !isAvailable && "opacity-70 pointer-events-none"
      )}
      onClick={onClick}
      data-testid={`room-card-${id}`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div
          className={cn(
            "w-full h-52 bg-gray-200",
            !imageLoaded && "animate-pulse"
          )}
        >
          <img
            src={image || "/placeholder.svg?height=250&width=400"}
            alt={`Habitación ${name}`}
            className={cn(
              "w-full h-full object-cover transition-transform duration-500",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        </div>

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isPopular && (
            <Badge className="bg-[#F20C1F] text-white text-xs font-medium px-2 py-1">
              Popular
            </Badge>
          )}
          {discount && (
            <Badge className="bg-[#F2E205] text-[#0D0D0D] text-xs font-medium px-2 py-1">
              -{discount}%
            </Badge>
          )}
          {!isAvailable && (
            <Badge className="bg-gray-600 text-white text-xs font-medium px-2 py-1">
              No disponible
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleFavoriteClick}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200 shadow-sm"
            aria-label={
              isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"
            }
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-colors",
                isFavorite ? "fill-[#F20C1F] text-[#F20C1F]" : "text-[#020659]"
              )}
            />
          </button>
          <button
            onClick={handleShareClick}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200 shadow-sm"
            aria-label="Compartir habitación"
          >
            <Share2 className="w-4 h-4 text-[#020659]" />
          </button>
        </div>

        {/* Rating Badge */}
        {rating && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-[#F2E205] text-[#F2E205]" />
            <span className="text-sm font-medium text-[#0D0D0D]">
              {rating.toFixed(1)}
            </span>
            {reviewCount > 0 && (
              <span className="text-xs text-[#020659]">({reviewCount})</span>
            )}
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Room Name */}
        <h3 className="font-bold text-[#0D0D0D] text-lg mb-2 line-clamp-1 group-hover:text-[#F20C0C] transition-colors">
          {name}
        </h3>

        {/* Pricing */}
        <div className="flex items-baseline justify-between mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-[#F20C1F] font-bold text-xl">
              ${price.toLocaleString()}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-gray-400 line-through text-sm">
                ${originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-[#020659] text-xs">/ noche</span>
          </div>
        </div>

        {/* Room Details */}
        <div className="grid grid-cols-2 gap-2 text-xs text-[#020659] mb-3">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#F20C0C]" />
            <span>
              {capacity} {capacity === 1 ? "persona" : "personas"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5 text-[#F20C0C]" />
            <span>Cama {bedType}</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            {VIEW_ICONS[view]}
            <span>Vista {VIEW_LABELS[view] || view}</span>
          </div>
        </div>

        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {amenities.slice(0, 3).map((amenity, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-[#020659]/10 rounded-full px-2 py-1 text-xs text-[#020659]"
              >
                {iconMap[amenity.icono]}
                <span>{amenity.nombre}</span>
              </div>
            ))}
            {amenities.length > 3 && (
              <div className="flex items-center gap-1 bg-[#020659]/10 rounded-full px-2 py-1 text-xs text-[#020659]">
                <span>+{amenities.length - 3} más</span>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-[#020659] text-[#020659] hover:bg-[#020659]/10 hover:border-[#020659] transition-colors group bg-transparent"
            aria-label="Ver detalles de la habitación"
          >
            <Link
              to={`/roomsDetails/${id}`}
              className="flex w-full justify-center items-center"
            >
              <Eye className="w-3.5 h-3.5 mr-1.5 group-hover:scale-110 transition-transform" />
              Ver Detalles
            </Link>
          </Button>

          {/* Modal Dialog Mejorado */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="flex-1 bg-gradient-to-r from-[#F20C0C] to-[#F20C1F] hover:from-[#D10000] text-white border-0 shadow-md hover:shadow-lg transition-all duration-300"
                disabled={!isAvailable}
                onClick={handleReserveClick}
                aria-label="Reservar habitación ahora"
              >
                Reservar Ahora
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-6xl max-h-[95vh] overflow-hidden p-0 gap-0 bg-white">
              {/* Header del Modal */}
              <div className="relative">
                {/* Imagen de fondo del header */}
                <div className="h-32 bg-gradient-to-r from-[#020659] to-[#F20C1F] relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <img
                    src={image || "/placeholder.svg?height=200&width=800"}
                    alt={name}
                    className="w-full h-full object-cover opacity-30"
                  />
                </div>

                {/* Contenido del header */}
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="text-white">
                    <div className="flex items-center gap-2 mb-2">
                      {isPopular && (
                        <Badge className="bg-[#F20C1F] text-white text-xs">
                          Popular
                        </Badge>
                      )}
                      {discount && (
                        <Badge className="bg-[#F2E205] text-[#0D0D0D] text-xs">
                          -{discount}%
                        </Badge>
                      )}
                    </div>
                    <DialogTitle className="text-2xl font-bold text-white mb-1">
                      {name}
                    </DialogTitle>
                    <DialogDescription className="text-white/90 flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Vista {VIEW_LABELS[view] || view}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        Hasta {capacity} personas
                      </span>
                      {rating && (
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-current" />
                          {rating.toFixed(1)})
                        </span>
                      )}
                    </DialogDescription>
                  </div>
                </div>
              </div>
              {/* Contenido principal del modal */}
              <div className="grid lg:grid-cols-3 gap-6 p-6">
                {/* Información de la habitación */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Detalles de la habitación */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-[#020659] mb-3 flex items-center gap-2">
                      <Bed className="w-5 h-5" />
                      Detalles de la Habitación
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#F20C0C]" />
                        <span>Capacidad: {capacity} personas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bed className="w-4 h-4 text-[#F20C0C]" />
                        <span>{bedType}</span>
                      </div>
                      <div className="flex items-center gap-2 col-span-2">
                        {VIEW_ICONS[view]}
                        <span>Vista {VIEW_LABELS[view] || view}</span>
                      </div>
                    </div>
                  </div>

                  {/* Amenidades */}
                  {amenities.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-[#020659] mb-3">
                        Amenidades Incluidas
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {amenities.map((amenity, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm text-[#020659]"
                          >
                            {iconMap[amenity.icono]}
                            <span>{amenity.nombre}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Políticas */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-semibold text-[#020659] mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Políticas de Reserva
                    </h3>
                    <div className="space-y-2 text-sm text-green-700">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Cancelación gratuita hasta 24 horas antes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Sin prepago requerido</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Check-in: 15:00 - Check-out: 12:00</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Widget de reserva */}
                <div className="lg:col-span-1">
                  <div className="sticky top-6">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-1">
                      <BookingWidget
                        roomId={id}
                        pricePerNight={price}
                        onBooking={onBookingSubmit}
                        maxGuests={bookingConfig.maxGuests}
                        minNights={bookingConfig.minNights}
                        maxNights={bookingConfig.maxNights}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>

      <CardFooter className="px-4 pt-0 pb-3 border-t border-gray-100">
        <div className="w-full flex items-center justify-between text-xs text-[#0D0D0D]">
          <span className="flex items-center">
            <svg
              className="w-3 h-3 mr-1 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Cancelación gratuita
          </span>
          <span className="flex items-center">
            <svg
              className="w-3 h-3 mr-1 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Sin prepago
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};
