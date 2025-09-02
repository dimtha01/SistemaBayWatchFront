import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart } from "lucide-react";
import Filter from "@/components/FullMenuPage/Filter";
import { DishCard } from "@/components/FullMenuPage/DishCard";
import {
  fullMenuData,
  filterOptions,
  type Category,
  type FilterType,
  type Dish,
} from "@/components/FullMenuPage";

export const FullMenuPage: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>("menu-principal");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState<FilterType[]>(["all"]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<Set<string>>(new Set());

  const currentMenu = fullMenuData[selectedMenu];

  // Función para obtener la imagen de fondo según el menú seleccionado
  const getBackgroundImage = (menuId: string): string => {
    const backgroundImages: Record<string, string> = {
      "menu-principal": "/images/gastronomia banner.webp",
      desayunos: "/images/desayunos-background.webp",
      almuerzo: "/images/almuerzo-background.webp",
      cena: "/images/cena-background.webp",
      bebidas: "/images/bebidas-background.webp",
      postres: "/images/postres-background.webp",
      especiales: "/images/especiales-background.webp",
    };

    return backgroundImages[menuId] || "/images/gastronomia banner.webp";
  };

  // Función para obtener gradientes más variados y únicos
  const getGradientOverlay = (
    menuId: string
  ): { primary: string; secondary: string } => {
    const gradients: Record<string, { primary: string; secondary: string }> = {
      "menu-principal": {
        primary:
          "from-slate-900/40 via-gray-800/60 to-black/80 sm:from-slate-900/50 sm:via-gray-800/70 sm:to-black/90",
        secondary:
          "from-red-600/20 via-orange-500/15 to-transparent sm:from-red-600/30 sm:via-orange-500/20",
      },
      desayunos: {
        primary:
          "from-amber-900/35 via-yellow-800/55 to-orange-900/75 sm:from-amber-900/45 sm:via-yellow-800/65 sm:to-orange-900/85",
        secondary:
          "from-yellow-400/25 via-amber-300/20 to-transparent sm:from-yellow-400/35 sm:via-amber-300/25",
      },
      almuerzo: {
        primary:
          "from-emerald-900/35 via-teal-800/55 to-green-900/75 sm:from-emerald-900/45 sm:via-teal-800/65 sm:to-green-900/85",
        secondary:
          "from-lime-400/25 via-emerald-300/20 to-transparent sm:from-lime-400/35 sm:via-emerald-300/25",
      },
      cena: {
        primary:
          "from-indigo-900/35 via-purple-800/55 to-violet-900/75 sm:from-indigo-900/45 sm:via-purple-800/65 sm:to-violet-900/85",
        secondary:
          "from-violet-400/25 via-indigo-300/20 to-transparent sm:from-violet-400/35 sm:via-indigo-300/25",
      },
      bebidas: {
        primary:
          "from-cyan-900/35 via-blue-800/55 to-sky-900/75 sm:from-cyan-900/45 sm:via-blue-800/65 sm:to-sky-900/85",
        secondary:
          "from-cyan-400/25 via-blue-300/20 to-transparent sm:from-cyan-400/35 sm:via-blue-300/25",
      },
      postres: {
        primary:
          "from-rose-900/35 via-pink-800/55 to-fuchsia-900/75 sm:from-rose-900/45 sm:via-pink-800/65 sm:to-fuchsia-900/85",
        secondary:
          "from-pink-400/25 via-rose-300/20 to-transparent sm:from-pink-400/35 sm:via-rose-300/25",
      },
      especiales: {
        primary:
          "from-red-900/35 via-orange-800/55 to-yellow-900/75 sm:from-red-900/45 sm:via-orange-800/65 sm:to-yellow-900/85",
        secondary:
          "from-orange-400/30 via-red-300/25 to-transparent sm:from-orange-400/40 sm:via-red-300/30",
      },
    };

    return gradients[menuId] || gradients["menu-principal"];
  };

  // Función para obtener colores de acento más únicos
  const getAccentColor = (menuId: string): string => {
    const accentColors: Record<string, string> = {
      "menu-principal": "#dc2626", // red-600
      desayunos: "#f59e0b", // amber-500
      almuerzo: "#10b981", // emerald-500
      cena: "#7c3aed", // violet-600
      bebidas: "#0ea5e9", // sky-500
      postres: "#ec4899", // pink-500
      especiales: "#ea580c", // orange-600
    };

    return accentColors[menuId] || "#dc2626";
  };

  // Función para obtener el nombre del menú formateado
  const getMenuDisplayName = (menuId: string): string => {
    const menuNames: Record<string, string> = {
      "menu-principal": "Menú Principal",
      desayunos: "Desayunos",
      almuerzo: "Almuerzo",
      cena: "Cena",
      bebidas: "Bebidas",
      postres: "Postres",
      especiales: "Especiales",
    };

    return menuNames[menuId] || "Menú";
  };

  const toggleFavorite = (dishId: string): void => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(dishId)) {
      newFavorites.delete(dishId);
    } else {
      newFavorites.add(dishId);
    }
    setFavorites(newFavorites);
  };

  const toggleCart = (dishId: string): void => {
    const newCart = new Set(cart);
    if (newCart.has(dishId)) {
      newCart.delete(dishId);
    } else {
      newCart.add(dishId);
    }
    setCart(newCart);
  };

  const filterDishes = (dishes: Dish[]): Dish[] => {
    return dishes.filter((dish) => {
      const matchesSearch =
        dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchTerm.toLowerCase());

      if (activeFilters.includes("all")) {
        return matchesSearch;
      }

      const matchesFilter =
        (activeFilters.includes("vegetarian") && dish.isVegetarian) ||
        (activeFilters.includes("glutenFree") && dish.isGlutenFree) ||
        (activeFilters.includes("spicy") && dish.isSpicy) ||
        (activeFilters.includes("quick") &&
          dish.time &&
          parseInt(dish.time) < 15) ||
        (activeFilters.includes("economic") &&
          dish.price &&
          parseFloat(dish.price.replace("€", "")) < 10) ||
        (activeFilters.includes("premium") &&
          dish.price &&
          parseFloat(dish.price.replace("€", "")) > 25) ||
        (activeFilters.includes("topRated") &&
          dish.rating &&
          dish.rating >= 4.8);

      return matchesSearch && matchesFilter;
    });
  };

  const filteredCategories: Category[] = currentMenu.categories
    .map((category) => ({
      ...category,
      dishes: filterDishes(category.dishes),
    }))
    .filter((category) => category.dishes.length > 0);

  const handleMenuChange = (menuId: string): void => {
    setSelectedMenu(menuId);
    setSearchTerm("");
    setActiveFilters(["all"]);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filters: FilterType[]): void => {
    setActiveFilters(filters);
  };

  // Obtener los gradientes para el menú actual
  const currentGradients = getGradientOverlay(selectedMenu);
  const accentColor = getAccentColor(selectedMenu);

  return (
    <div
      className="relative z-10 pt-16 md:pt-24 pb-12 min-h-screen bg-cover bg-center bg-no-repeat bg-fixed transition-all duration-700 ease-in-out"
      style={{
        backgroundImage: `url('${getBackgroundImage(selectedMenu)}')`,
      }}
    >
      {/* Indicador del menú actual - Fijo en la parte superior */}
      <div className="fixed top-16 md:top-20 left-0 right-0 z-30 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md border transition-all duration-500 shadow-lg"
            style={{
              backgroundColor: `${accentColor}20`,
              borderColor: `${accentColor}40`,
              boxShadow: `0 4px 20px ${accentColor}30`,
            }}
          ></div>
        </div>
      </div>

      {/* Overlay principal con gradiente dinámico */}
      <div
        className={`absolute inset-0 bg-gradient-to-b transition-all duration-700 ease-in-out ${currentGradients.primary}`}
      />

      {/* Overlay secundario con color de acento */}
      <div
        className={`absolute inset-0 bg-gradient-to-r transition-all duration-700 ease-in-out ${currentGradients.secondary}`}
      />

      {/* Overlay adicional para efectos especiales según el menú */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
          selectedMenu === "desayunos"
            ? "bg-gradient-to-tr from-amber-300/15 via-transparent to-yellow-200/8"
            : selectedMenu === "almuerzo"
            ? "bg-gradient-to-bl from-emerald-300/15 via-transparent to-teal-200/8"
            : selectedMenu === "cena"
            ? "bg-gradient-to-tl from-indigo-400/15 via-transparent to-violet-300/8"
            : selectedMenu === "bebidas"
            ? "bg-gradient-to-br from-cyan-300/15 via-transparent to-blue-200/8"
            : selectedMenu === "postres"
            ? "bg-gradient-to-tr from-pink-300/15 via-transparent to-rose-200/8"
            : selectedMenu === "especiales"
            ? "bg-gradient-to-bl from-orange-400/20 via-transparent to-red-300/10"
            : "bg-gradient-to-tr from-red-400/12 via-transparent to-orange-300/8"
        }`}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Desktop Filter */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-32">
              <Filter
                selectedMenu={selectedMenu}
                searchTerm={searchTerm}
                onMenuChange={handleMenuChange}
                onSearchChange={handleSearchChange}
                onFilterChange={handleFilterChange}
                activeFilters={activeFilters}
                isMobile={false}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Menu Header */}
            <div className="mb-8 sm:mb-12">
              <div className="flex items-center space-x-4 mb-6">
                <div
                  className={`p-3 sm:p-4 rounded-2xl shadow-xl transition-all duration-300 backdrop-blur-sm`}
                  style={{
                    backgroundColor: `${accentColor}90`,
                    boxShadow: `0 8px 32px ${accentColor}40`,
                  }}
                >
                  <currentMenu.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-100 mb-1">
                    {currentMenu.name}
                  </h2>
                  <p className="text-base sm:text-lg text-gray-200">
                    {currentMenu.subtitle}
                  </p>
                </div>
              </div>

              {/* Filtros activos - Mostrar en móvil */}
              {!activeFilters.includes("all") && (
                <div className="lg:hidden flex flex-wrap gap-2 mt-4">
                  {activeFilters.map((filter) => {
                    const filterOption = filterOptions.find(
                      (f) => f.key === filter
                    );
                    return filterOption ? (
                      <Badge
                        key={filter}
                        variant="default"
                        className="text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 transition-all duration-300 backdrop-blur-sm"
                        style={{
                          backgroundColor: `${accentColor}90`,
                          boxShadow: `0 2px 8px ${accentColor}40`,
                        }}
                      >
                        {filterOption.label}
                        <span
                          className="ml-1 cursor-pointer hover:bg-white/20 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                          onClick={() => {
                            const newFilters = activeFilters.filter(
                              (f) => f !== filter
                            );
                            setActiveFilters(
                              newFilters.length > 0 ? newFilters : ["all"]
                            );
                          }}
                        >
                          ×
                        </span>
                      </Badge>
                    ) : null;
                  })}

                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-6 px-2 rounded-full transition-all duration-300 hover:bg-white/10 backdrop-blur-sm border"
                    style={{
                      color: accentColor,
                      borderColor: `${accentColor}60`,
                      backgroundColor: `${accentColor}10`,
                    }}
                    onClick={() => setActiveFilters(["all"])}
                  >
                    Limpiar filtros
                  </Button>
                </div>
              )}
            </div>

            {/* Categories */}
            <div className="space-y-12 sm:space-y-16">
              {filteredCategories.length === 0 ? (
                <div className="text-center py-16 sm:py-20">
                  <div className="mb-4">
                    <Search className="w-16 h-16 text-gray-300 mx-auto" />
                  </div>
                  <p className="text-gray-50 text-lg sm:text-xl mb-2">
                    No se encontraron platos
                  </p>
                  <p className="text-gray-50 text-sm sm:text-base">
                    Prueba con otros términos de búsqueda o filtros
                  </p>
                </div>
              ) : (
                filteredCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <div className="mb-8">
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-3">
                        {category.name}
                      </h3>
                      <p className="text-gray-200 text-base sm:text-lg">
                        {category.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                      {category.dishes.map((dish) => (
                        <DishCard
                          key={dish.id}
                          dish={dish}
                          isFavorite={favorites.has(dish.id)}
                          isInCart={cart.has(dish.id)}
                          onToggleFavorite={toggleFavorite}
                          onToggleCart={toggleCart}
                        />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Cart Button */}
      {cart.size > 0 && (
        <div className="fixed bottom-20 sm:bottom-24 lg:bottom-28 right-4 sm:right-6 lg:right-8 z-50">
          <Button
            size="lg"
            className="rounded-full shadow-2xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold transform hover:scale-105 transition-all duration-200 text-white backdrop-blur-sm"
            style={{
              backgroundColor: `${accentColor}90`,
              boxShadow: `0 10px 30px ${accentColor}50`,
            }}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">Ver Pedido</span>
            <span className="sm:hidden">Pedido</span>
            <Badge
              className="ml-2 bg-white font-bold"
              style={{ color: accentColor }}
            >
              {cart.size}
            </Badge>
          </Button>
        </div>
      )}

      {/* Mobile Filter Component */}
      <div className="lg:hidden">
        <Filter
          selectedMenu={selectedMenu}
          searchTerm={searchTerm}
          onMenuChange={handleMenuChange}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          activeFilters={activeFilters}
          isMobile={true}
        />
      </div>
    </div>
  );
};

export default FullMenuPage;
