import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Search,
  ChevronRight,
  SlidersHorizontal,
  X,
  FilterIcon,
} from "lucide-react";
import {
  filterOptions,
  fullMenuData,
  FilterType,
} from "@/components/FullMenuPage";

interface FilterProps {
  selectedMenu: string;
  searchTerm: string;
  onMenuChange: (menuId: string) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterChange: (filters: FilterType[]) => void;
  activeFilters: FilterType[];
  isMobile?: boolean; // Nueva propiedad para determinar si es móvil o desktop
}

export const Filter: React.FC<FilterProps> = ({
  selectedMenu,
  searchTerm,
  onMenuChange,
  onSearchChange,
  onFilterChange,
  activeFilters,
  isMobile = false, // Por defecto es false (desktop)
}) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState<FilterType[]>(activeFilters);

  // Actualizar tempFilters cuando cambian los activeFilters
  useEffect(() => {
    setTempFilters(activeFilters);
  }, [activeFilters]);

  const additionalFilters = [
    {
      category: "Tiempo de preparación",
      options: [
        { key: "quick" as FilterType, label: "Rápido (menos de 15 min)" },
        { key: "medium" as FilterType, label: "Medio (15-25 min)" },
      ],
    },
    {
      category: "Precio",
      options: [
        { key: "economic" as FilterType, label: "Económico (menos de €10)" },
        { key: "premium" as FilterType, label: "Premium (más de €25)" },
      ],
    },
    {
      category: "Valoración",
      options: [
        { key: "topRated" as FilterType, label: "Mejor valorados (4.8+)" },
      ],
    },
  ];

  const handleFilterToggle = (filter: FilterType) => {
    if (filter === "all") {
      setTempFilters(["all"]);
      return;
    }

    // Remove "all" if it exists and another filter is selected
    const newFilters = tempFilters.filter((f) => f !== "all");

    // Toggle the selected filter
    if (newFilters.includes(filter)) {
      setTempFilters(newFilters.filter((f) => f !== filter));
    } else {
      setTempFilters([...newFilters, filter]);
    }
  };

  const applyFilters = () => {
    const finalFilters = tempFilters.length > 0 ? tempFilters : ["all"];
    onFilterChange(finalFilters);
    setIsFilterModalOpen(false);
  };

  // Determine which filters to show in the main view (limit to 3)
  const visibleFilters = filterOptions.slice(0, 3);
  const hasActiveFilter = (filter: FilterType) =>
    activeFilters.includes(filter);

  // Botón flotante para abrir el filtro (solo en móvil)
  const FilterButton = () => (
    <button
      onClick={() => setIsFilterDrawerOpen(true)}
      className="
          fixed 
          bottom-4 left-4 
          sm:bottom-6 sm:left-6 
          bg-[#D90D1E] hover:bg-[#F20C0C] 
          text-white 
          p-2 sm:p-3
          rounded-full 
          shadow-lg hover:shadow-xl
          z-50 
          transition-all duration-300 ease-in-out
          hover:scale-110 
          active:scale-95
          group
          touch-manipulation
        "
      aria-label="Abrir filtros"
    >
      <FilterIcon className="h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform duration-300" />

      {/* Tooltip responsivo */}
      <div
        className="
          absolute left-full ml-2 sm:ml-3
          top-1/2 -translate-y-1/2
          bg-gray-900 text-white text-xs sm:text-sm
          px-2 sm:px-3 py-1 sm:py-2
          rounded-lg
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          whitespace-nowrap
          pointer-events-none
          hidden sm:block
        "
      >
        Filtros y Menús
        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
      </div>

      {/* Pulse animation */}
      <div
        className="
          absolute inset-0 
          bg-[#D90D1E] 
          rounded-full 
          animate-ping 
          opacity-20
          scale-110
        "
      ></div>

      {/* Badge para mostrar filtros activos */}
      {!activeFilters.includes("all") && (
        <div className="absolute -top-2 -right-2 bg-white text-[#D90D1E] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border border-[#D90D1E]">
          {activeFilters.length}
        </div>
      )}
    </button>
  );

  // Drawer para filtros en móvil (aparece desde abajo)
  const FilterDrawer = () => (
    <div
      className={`
        fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
        ${isFilterDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      onClick={() => setIsFilterDrawerOpen(false)}
    >
      <div
        className={`
            fixed bottom-0 left-0 right-0 
            bg-white 
            rounded-t-2xl 
            shadow-xl 
            transition-transform duration-300 ease-in-out
            max-h-[85vh] overflow-y-auto
            ${isFilterDrawerOpen ? "translate-y-0" : "translate-y-full"}
          `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer handle */}
        <div className="w-full flex justify-center py-2">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-[#D90D1E]">Menú y Filtros</h2>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-full"
            onClick={() => setIsFilterDrawerOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Drawer Content */}
        <div className="p-4">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Buscar platos..."
                value={searchTerm}
                onChange={onSearchChange}
                className="pl-12 py-3 text-base bg-white border border-gray-200 rounded-full"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-lg">Filtros</h3>
              {!activeFilters.includes("all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#D90D1E] hover:text-red-700 hover:bg-red-50 text-sm h-8 px-2"
                  onClick={() => onFilterChange(["all"])}
                >
                  <X className="h-4 w-4 mr-1" />
                  Limpiar
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((filter) => (
                <Badge
                  key={filter.key}
                  variant={hasActiveFilter(filter.key) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 px-4 py-2 text-sm font-medium rounded-full ${
                    hasActiveFilter(filter.key)
                      ? "bg-[#D90D1E] hover:bg-[#F20C0C] text-white"
                      : "hover:bg-gray-100 border border-gray-200"
                  }`}
                  onClick={() => {
                    if (filter.key === "all") {
                      onFilterChange(["all"]);
                    } else if (hasActiveFilter(filter.key)) {
                      const newFilters = activeFilters.filter(
                        (f) => f !== filter.key
                      );
                      onFilterChange(
                        newFilters.length > 0 ? newFilters : ["all"]
                      );
                    } else {
                      const newFilters = [
                        ...activeFilters.filter((f) => f !== "all"),
                        filter.key,
                      ];
                      onFilterChange(newFilters);
                    }
                  }}
                >
                  {filter.label}
                </Badge>
              ))}

              <Button
                variant="outline"
                className="rounded-full border border-gray-200 flex items-center gap-2 px-4 py-2 h-auto text-sm font-medium"
                onClick={() => {
                  setTempFilters(activeFilters);
                  setIsFilterModalOpen(true);
                }}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Más filtros
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-4"></div>

          {/* Menu Selection */}
          <div className="mb-3">
            <h3 className="font-bold text-gray-900 text-lg mb-3">Menús</h3>
          </div>
          <div className="rounded-xl overflow-hidden border border-gray-200 mb-6">
            {/* Generación dinámica de menús basada en fullMenuData */}
            {Object.values(fullMenuData).map((menu, index) => (
              <button
                key={menu.id}
                onClick={() => {
                  onMenuChange(menu.id);
                  setIsFilterDrawerOpen(false);
                }}
                className={`w-full flex items-center justify-between p-4 text-left ${
                  index > 0 ? "border-t border-gray-100" : ""
                } transition-all duration-200 ${
                  selectedMenu === menu.id
                    ? `bg-${menu.color.split(" ")[0]}/20`
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-full ${
                      selectedMenu === menu.id
                        ? menu.color
                        : `${menu.color.split(" ")[0]}/30 ${menu.iconColor}`
                    }`}
                  >
                    <menu.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div
                      className={`font-medium text-base ${
                        selectedMenu === menu.id
                          ? menu.iconColor
                          : "text-[#0D0D0D]"
                      }`}
                    >
                      {menu.name}
                    </div>
                    <div className="text-sm text-gray-500">{menu.subtitle}</div>
                  </div>
                </div>
                <ChevronRight
                  className={`w-5 h-5 transition-transform ${
                    selectedMenu === menu.id
                      ? `${menu.iconColor} rotate-90`
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Ordenar por */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-800 mb-3">Ordenar por</h4>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 rounded-lg bg-red-50 text-red-700 font-medium border border-red-100">
                Más populares
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
                Precio: menor a mayor
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
                Precio: mayor a menor
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
                Mejor valorados
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-gray-50 -mx-4 -mb-4 mt-4">
            <Button
              onClick={() => setIsFilterDrawerOpen(false)}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Ver resultados (
              {activeFilters.includes("all") ? "Todos" : activeFilters.length})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // Si es móvil, renderizar solo el filtro móvil
  if (isMobile) {
    return (
      <>
        <FilterButton />
        <FilterDrawer />

        {/* Filter Modal (para móvil) */}
        <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Filtros adicionales
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="space-y-4">
                {/* Filtros principales */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700 mb-2">Categorías</h4>
                  {filterOptions.map((filter) => (
                    <div
                      key={filter.key}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        id={`filter-mobile-${filter.key}`}
                        checked={tempFilters.includes(filter.key)}
                        onCheckedChange={() => handleFilterToggle(filter.key)}
                        className="border-[#D90D1E] text-[#D90D1E] focus:ring-[#F2A2A2]"
                      />
                      <Label
                        htmlFor={`filter-mobile-${filter.key}`}
                        className="text-base font-medium cursor-pointer"
                      >
                        {filter.label}
                      </Label>
                    </div>
                  ))}
                </div>

                {/* Filtros adicionales */}
                {additionalFilters.map((category, index) => (
                  <div key={index} className="pt-2 border-t border-gray-200">
                    <h4 className="font-medium text-gray-700 mb-3">
                      {category.category}
                    </h4>
                    <div className="space-y-3">
                      {category.options.map((option) => (
                        <div
                          key={option.key}
                          className="flex items-center space-x-3"
                        >
                          <Checkbox
                            id={`filter-mobile-${option.key}`}
                            checked={tempFilters.includes(option.key)}
                            onCheckedChange={() =>
                              handleFilterToggle(option.key)
                            }
                            className="border-[#D90D1E] text-[#D90D1E] focus:ring-[#F2A2A2]"
                          />
                          <Label
                            htmlFor={`filter-mobile-${option.key}`}
                            className="text-base font-medium cursor-pointer"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter className="sm:justify-between">
              <Button
                variant="outline"
                onClick={() => setIsFilterModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                onClick={applyFilters}
                className="bg-[#D90D1E] hover:bg-[#F20C0C] text-white"
              >
                Aplicar filtros
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Si es desktop, renderizar solo el filtro de escritorio
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Buscar platos..."
            value={searchTerm}
            onChange={onSearchChange}
            className="pl-12 py-3 text-base bg-white border border-gray-200 rounded-full"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 pb-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-lg">Filtros</h3>
          {!activeFilters.includes("all") && (
            <Button
              variant="ghost"
              size="sm"
              className="text-[#D90D1E] hover:text-red-700 hover:bg-red-50 text-sm h-8 px-2"
              onClick={() => onFilterChange(["all"])}
            >
              <X className="h-4 w-4 mr-1" />
              Limpiar
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((filter) => (
            <Badge
              key={filter.key}
              variant={hasActiveFilter(filter.key) ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-200 px-4 py-2 text-sm font-medium rounded-full ${
                hasActiveFilter(filter.key)
                  ? "bg-[#D90D1E] hover:bg-[#F20C0C] text-white"
                  : "hover:bg-gray-100 border border-gray-200"
              }`}
              onClick={() => {
                if (filter.key === "all") {
                  onFilterChange(["all"]);
                } else if (hasActiveFilter(filter.key)) {
                  const newFilters = activeFilters.filter(
                    (f) => f !== filter.key
                  );
                  onFilterChange(newFilters.length > 0 ? newFilters : ["all"]);
                } else {
                  const newFilters = [
                    ...activeFilters.filter((f) => f !== "all"),
                    filter.key,
                  ];
                  onFilterChange(newFilters);
                }
              }}
            >
              {filter.label}
            </Badge>
          ))}

          <Button
            variant="outline"
            className="rounded-full border border-gray-200 flex items-center gap-2 px-4 py-2 h-auto text-sm font-medium"
            onClick={() => {
              setTempFilters(activeFilters);
              setIsFilterModalOpen(true);
            }}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Más filtros
          </Button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-2"></div>

      {/* Menu Selection */}
      <div className="px-4 pb-2">
        <h3 className="font-bold text-gray-900 text-lg mb-3">Menús</h3>
      </div>
      <div>
        {/* Generación dinámica de menús basada en fullMenuData */}
        {Object.values(fullMenuData).map((menu, index) => (
          <button
            key={menu.id}
            onClick={() => onMenuChange(menu.id)}
            className={`w-full flex items-center justify-between p-4 text-left ${
              index > 0 ? "border-t border-gray-100" : ""
            } transition-all duration-200 ${
              selectedMenu === menu.id
                ? `bg-${menu.color.split(" ")[0]}/20`
                : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`p-3 rounded-full ${
                  selectedMenu === menu.id
                    ? menu.color
                    : `${menu.color.split(" ")[0]}/30 ${menu.iconColor}`
                }`}
              >
                <menu.icon className="w-5 h-5" />
              </div>
              <div>
                <div
                  className={`font-medium text-base ${
                    selectedMenu === menu.id ? menu.iconColor : "text-[#0D0D0D]"
                  }`}
                >
                  {menu.name}
                </div>
                <div className="text-sm text-gray-500">{menu.subtitle}</div>
              </div>
            </div>
            <ChevronRight
              className={`w-5 h-5 transition-transform ${
                selectedMenu === menu.id
                  ? `${menu.iconColor} rotate-90`
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Filter Modal (para desktop) */}
      <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Filtros adicionales
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-4">
              {/* Filtros principales */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-700 mb-2">Categorías</h4>
                {filterOptions.map((filter) => (
                  <div key={filter.key} className="flex items-center space-x-3">
                    <Checkbox
                      id={`filter-desktop-${filter.key}`}
                      checked={tempFilters.includes(filter.key)}
                      onCheckedChange={() => handleFilterToggle(filter.key)}
                      className="border-[#D90D1E] text-[#D90D1E] focus:ring-[#F2A2A2]"
                    />
                    <Label
                      htmlFor={`filter-desktop-${filter.key}`}
                      className="text-base font-medium cursor-pointer"
                    >
                      {filter.label}
                    </Label>
                  </div>
                ))}
              </div>

              {/* Filtros adicionales */}
              {additionalFilters.map((category, index) => (
                <div key={index} className="pt-2 border-t border-gray-200">
                  <h4 className="font-medium text-gray-700 mb-3">
                    {category.category}
                  </h4>
                  <div className="space-y-3">
                    {category.options.map((option) => (
                      <div
                        key={option.key}
                        className="flex items-center space-x-3"
                      >
                        <Checkbox
                          id={`filter-desktop-${option.key}`}
                          checked={tempFilters.includes(option.key)}
                          onCheckedChange={() => handleFilterToggle(option.key)}
                          className="border-[#D90D1E] text-[#D90D1E] focus:ring-[#F2A2A2]"
                        />
                        <Label
                          htmlFor={`filter-desktop-${option.key}`}
                          className="text-base font-medium cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setIsFilterModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={applyFilters}
              className="bg-[#D90D1E] hover:bg-[#F20C0C] text-white"
            >
              Aplicar filtros
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Filter;
