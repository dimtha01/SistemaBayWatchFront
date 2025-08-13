import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Star, Heart, ShoppingCart } from "lucide-react";
import { Dish } from "./types";

interface DishCardProps {
  dish: Dish;
  isFavorite: boolean;
  isInCart: boolean;
  onToggleFavorite: (dishId: string) => void;
  onToggleCart: (dishId: string) => void;
}

export const DishCard: React.FC<DishCardProps> = ({
  dish,
  isFavorite,
  isInCart,
  onToggleFavorite,
  onToggleCart,
}) => (
  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-md">
    <div className="relative overflow-hidden">
      <img
        src={dish.image}
        alt={dish.name}
        className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute top-3 right-3 flex space-x-2">
        <button
          onClick={() => onToggleFavorite(dish.id)}
          className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 transform hover:scale-110 ${
            isFavorite
              ? "bg-red-500 text-white shadow-lg"
              : "bg-white/90 text-gray-600 hover:bg-white shadow-md"
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="absolute top-3 left-3 flex flex-col space-y-1">
        {dish.isVegetarian && (
          <Badge className="bg-green-500/90 text-white text-xs backdrop-blur-sm">
            Vegetariano
          </Badge>
        )}
        {dish.isGlutenFree && (
          <Badge className="bg-blue-500/90 text-white text-xs backdrop-blur-sm">
            Sin Gluten
          </Badge>
        )}
        {dish.isSpicy && (
          <Badge className="bg-red-500/90 text-white text-xs backdrop-blur-sm">
            Picante
          </Badge>
        )}
      </div>
    </div>

    <CardContent className="p-4 sm:p-6">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-bold text-lg sm:text-xl text-gray-900 group-hover:text-orange-600 transition-colors leading-tight">
          {dish.name}
        </h4>
        <span className="text-xl sm:text-2xl font-bold text-orange-600 ml-2 flex-shrink-0">
          {dish.price}
        </span>
      </div>

      <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed line-clamp-2">
        {dish.description}
      </p>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3 sm:space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span className="text-xs sm:text-sm">{dish.time}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-xs sm:text-sm font-medium">
              {dish.rating}
            </span>
          </div>
        </div>
      </div>

      <Button
        onClick={() => onToggleCart(dish.id)}
        className={`w-full transition-all duration-200 font-semibold py-2.5 sm:py-3 ${
          isInCart
            ? "bg-green-600 hover:bg-green-700 shadow-lg"
            : "bg-orange-600 hover:bg-orange-700 shadow-lg hover:shadow-xl"
        }`}
        size="lg"
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        {isInCart ? "✓ Añadido" : "Añadir al Pedido"}
      </Button>
    </CardContent>
  </Card>
);
