import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tag } from "lucide-react";

interface FlashDealCardProps {
  id: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  image: string;
  description: string;
}

export const FlashDealCard = ({
  name,
  originalPrice,
  discountedPrice,
  image,
  description,
}: FlashDealCardProps) => {
  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full bg-white border border-gray-200">
      <div className="relative">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Etiqueta de OFERTA */}
        <div className="absolute top-3 left-3 bg-[#F20C1F] text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
          <Tag className="w-3 h-3" />
          OFERTA
        </div>
      </div>

      <CardContent className="p-6 flex flex-col flex-1">
        {/* Nombre */}
        <h3 className="font-semibold text-[#0D0D0D] text-lg mb-2">{name}</h3>

        {/* Descripción */}
        <p className="text-sm text-[#0D0D0D] mb-3 line-clamp-2">{description}</p>

        {/* Precios */}
        <div className="flex items-baseline justify-between mb-4">
          <span className="text-gray-500 line-through text-sm">${originalPrice}</span>
          <span className="text-[#F20C1F] font-bold text-2xl">${discountedPrice}</span>
        </div>

        {/* Botón */}
        <Button className="w-full bg-[#F20C1F] hover:bg-[#F20C0C] text-white mt-auto transition-all duration-300 hover:shadow-md">
          Reservar Ahora
        </Button>
      </CardContent>
    </Card>
  );
};