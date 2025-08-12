import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";

interface ZoneCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  isFavorite?: boolean;
}

export const ZoneCard = ({
  name,
  price,
  image,
  rating,
  isFavorite = false,
}: ZoneCardProps) => {
  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden bg-white border border-gray-200">
      <div className="relative">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Botón de Favorito */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 rounded-full transition-colors duration-300 ${
            isFavorite
              ? "bg-[#F20C1F] text-white"
              : "bg-white/80 text-[#F20C1F]"
          } hover:bg-[#F20C1F] hover:text-white`}
        >
          <Heart
            className="w-4 h-4"
            fill={isFavorite ? "currentColor" : "none"}
          />
        </Button>

        {/* Rating */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#000] text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3 fill-[#F2E205] text-[#F2E205]" />
          {rating.toFixed(2)}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-[#000] text-lg">{name}</h3>
          <span className="text-[#F20C1F] font-bold text-lg">${price}</span>
        </div>
        <p className="text-xs text-[#0D0D0D]">por noche</p>
      </CardContent>
    </Card>
  );
};