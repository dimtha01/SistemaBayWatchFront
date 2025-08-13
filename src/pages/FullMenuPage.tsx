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

      // Si "all" está en los filtros activos, mostrar todos
      if (activeFilters.includes("all")) {
        return matchesSearch;
      }

      // Verificar si el plato coincide con alguno de los filtros activos
      const matchesFilter =
        (activeFilters.includes("vegetarian") && dish.isVegetarian) ||
        (activeFilters.includes("glutenFree") && dish.isGlutenFree) ||
        (activeFilters.includes("spicy") && dish.isSpicy) ||
        // Agregar otros filtros según sea necesario
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

  return (
    <div className="relative z-10 pt-16 md:pt-24 pb-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Título en móvil */}
        <div className="lg:hidden mb-6 flex justify-center items-center">
          <h1 className="text-xl font-bold text-gray-900">
            {currentMenu.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Desktop Filter */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
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
                  className={`p-3 sm:p-4 rounded-2xl shadow-lg ${currentMenu.color}`}
                >
                  <currentMenu.icon
                    className={`w-8 h-8 sm:w-10 sm:h-10 ${currentMenu.iconColor}`}
                  />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                    {currentMenu.name}
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600">
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
                        className="bg-[#D90D1E] text-white px-3 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        {filterOption.label}
                        <span
                          className="ml-1 cursor-pointer"
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
                    className="text-[#D90D1E] border-[#D90D1E] hover:bg-red-50 text-xs h-6 px-2 rounded-full"
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
                  <p className="text-gray-500 text-lg sm:text-xl mb-2">
                    No se encontraron platos
                  </p>
                  <p className="text-gray-400 text-sm sm:text-base">
                    Prueba con otros términos de búsqueda o filtros
                  </p>
                </div>
              ) : (
                filteredCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <div className="mb-8">
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-base sm:text-lg">
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
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
          <Button
            size="lg"
            className="rounded-full shadow-2xl bg-orange-600 hover:bg-orange-700 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold transform hover:scale-105 transition-all duration-200"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">Ver Pedido</span>
            <span className="sm:hidden">Pedido</span>
            <Badge className="ml-2 bg-white text-orange-600 font-bold">
              {cart.size}
            </Badge>
          </Button>
        </div>
      )}

      {/* Mobile Filter Component - Se muestra como drawer desde abajo SOLO en móvil */}
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
