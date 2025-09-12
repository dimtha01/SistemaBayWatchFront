
import type React from "react"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, ShoppingCart, MapPin, Building2, ArrowLeft, Phone, User, CreditCard, Loader2, ChefHat } from "lucide-react"
import Filter from "@/components/FullMenuPage/Filter"
import { DishCard } from "@/components/FullMenuPage/DishCard"

type Dish = {
  id: string
  name: string
  description: string
  price: string
  time?: string
  rating?: number
  image?: string
  isVegetarian?: boolean
  isGlutenFree?: boolean
  isSpicy?: boolean
}

type Category = {
  name: string
  description: string
  dishes: Dish[]
}

type Menu = {
  id: string
  name: string
  subtitle: string
  icon: string
  color: string
  iconColor: string
  categories: Category[]
}

type MenuData = Record<string, Menu>

type FilterOption = {
  key: string
  label: string
}

type FilterType = string

type CartItem = {
  id: string
  name: string
  price: string
  quantity: number
}

const API_BASE_URL = "http://localhost:3000/api"

export const FullMenuPage: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>("menu-principal")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [activeFilters, setActiveFilters] = useState<FilterType[]>(["all"])
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [cart, setCart] = useState<Map<string, CartItem>>(new Map())
  const [showOrderDetails, setShowOrderDetails] = useState<boolean>(false)
  const [showOrderConfirmation, setShowOrderConfirmation] = useState<boolean>(false)
  const [showConfirmationMessage, setShowConfirmationMessage] = useState<boolean>(false)
  const [orderType, setOrderType] = useState<"delivery" | "room" | null>(null)
  const [deliveryAddress, setDeliveryAddress] = useState<string>("")
  const [roomNumber, setRoomNumber] = useState<string>("")
  const [customerName, setCustomerName] = useState<string>("")
  const [customerPhone, setCustomerPhone] = useState<string>("")
  const [customerID, setCustomerID] = useState<string>("")
  const [googleMapsAddress, setGoogleMapsAddress] = useState<string>("")
  const [orderNotes, setOrderNotes] = useState<string>("")
  const [isProcessingOrder, setIsProcessingOrder] = useState<boolean>(false)
  const [lastOrderId, setLastOrderId] = useState<number | null>(null)

  const [menuData, setMenuData] = useState<MenuData>({})
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [savedCart, setSavedCart] = useState<Map<string, CartItem>>(new Map())

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        const cartArray = JSON.parse(storedCart)
        const cartMap = new Map<string, CartItem>()
        cartArray.forEach((item: CartItem) => {
          cartMap.set(item.id, item)
        })
        setSavedCart(cartMap)
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  useEffect(() => {
    setCart(savedCart)
  }, [savedCart])

  // Save cart to localStorage
  useEffect(() => {
    const cartArray = Array.from(cart.values())
    localStorage.setItem("cart", JSON.stringify(cartArray))
  }, [cart])

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${API_BASE_URL}/menu`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()

        if (result.success) {
          setMenuData(result.data.fullMenuData)
          setFilterOptions(result.data.filterOptions)
        } else {
          throw new Error(result.message || "Failed to fetch menu data")
        }
      } catch (err) {
        console.error("Error fetching menu data:", err)
        setError(err instanceof Error ? err.message : "Failed to load menu data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMenuData()
  }, [])

  const currentMenu = menuData[selectedMenu]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-orange-600" />
          <p className="text-gray-600">Cargando menú...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <Button onClick={() => window.location.reload()}>Reintentar</Button>
        </div>
      </div>
    )
  }

  if (!currentMenu) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Menú no encontrado</p>
        </div>
      </div>
    )
  }

  const getBackgroundImage = (menuId: string): string => {
    const backgroundImages: Record<string, string> = {
      "menu-principal": "/images/gastronomia banner.webp",
      "vinos-bebidas": "/images/vinos-background.webp",
      "desayuno-buffet": "/images/desayuno-background.webp",
    }

    return backgroundImages[menuId] || "/images/gastronomia banner.webp"
  }

  const getGradientOverlay = (menuId: string): { primary: string; secondary: string } => {
    const gradients: Record<string, { primary: string; secondary: string }> = {
      "menu-principal": {
        primary: "from-slate-900/70 via-gray-800/80 to-black/90 sm:from-slate-900/75 sm:via-gray-800/85 sm:to-black/95",
        secondary: "from-red-600/30 via-orange-500/25 to-transparent sm:from-red-600/40 sm:via-orange-500/30",
      },
      "vinos-bebidas": {
        primary:
          "from-purple-900/70 via-violet-800/80 to-black/90 sm:from-purple-900/75 sm:via-violet-800/85 sm:to-black/95",
        secondary: "from-purple-600/30 via-violet-500/25 to-transparent sm:from-purple-600/40 sm:via-violet-500/30",
      },
      "desayuno-buffet": {
        primary:
          "from-amber-900/70 via-yellow-800/80 to-black/90 sm:from-amber-900/75 sm:via-yellow-800/85 sm:to-black/95",
        secondary: "from-amber-600/30 via-yellow-500/25 to-transparent sm:from-amber-600/40 sm:via-yellow-500/30",
      },
    }

    return gradients[menuId] || gradients["menu-principal"]
  }

  const getAccentColor = (menuId: string): string => {
    const accentColors: Record<string, string> = {
      "menu-principal": "#dc2626", // red-600
      "vinos-bebidas": "#7c3aed", // violet-600
      "desayuno-buffet": "#f59e0b", // amber-500
    }

    return accentColors[menuId] || "#dc2626"
  }

  const toggleFavorite = (dishId: string): void => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(dishId)) {
      newFavorites.delete(dishId)
    } else {
      newFavorites.add(dishId)
    }
    setFavorites(newFavorites)
  }

  const toggleCart = (dishId: string): void => {
    const newCart = new Map(cart)
    
    if (newCart.has(dishId)) {
      // Remove from cart
      newCart.delete(dishId)
    } else {
      // Add to cart - find dish details
      const dish = Object.values(menuData)
        .flatMap((menu: Menu) => menu.categories.flatMap((category: Category) => category.dishes))
        .find((d) => d.id === dishId)
      
      if (dish) {
        const cartItem: CartItem = {
          id: dish.id,
          name: dish.name,
          price: dish.price,
          quantity: 1
        }
        newCart.set(dishId, cartItem)
      }
    }
    
    setCart(newCart)
  }

  const updateCartQuantity = (dishId: string, quantity: number): void => {
    const newCart = new Map(cart)
    const item = newCart.get(dishId)
    
    if (item) {
      if (quantity <= 0) {
        newCart.delete(dishId)
      } else {
        newCart.set(dishId, { ...item, quantity })
      }
      setCart(newCart)
    }
  }

  const calculateCartTotal = (): number => {
    return Array.from(cart.values()).reduce((total, item) => {
      const price = Number.parseFloat(item.price.replace("€", ""))
      return total + (price * item.quantity)
    }, 0)
  }

  const filterDishes = (dishes: Dish[]): Dish[] => {
    return dishes.filter((dish) => {
      const matchesSearch =
        dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchTerm.toLowerCase())

      if (activeFilters.includes("all")) {
        return matchesSearch
      }

      const matchesFilter =
        (activeFilters.includes("vegetarian") && dish.isVegetarian) ||
        (activeFilters.includes("glutenFree") && dish.isGlutenFree) ||
        (activeFilters.includes("spicy") && dish.isSpicy)

      return matchesSearch && matchesFilter
    })
  }

  const filteredCategories: Category[] = currentMenu.categories
    .map((category) => ({
      ...category,
      dishes: filterDishes(category.dishes),
    }))
    .filter((category) => category.dishes.length > 0)

  const handleMenuChange = (menuId: string): void => {
    setSelectedMenu(menuId)
    setSearchTerm("")
    setActiveFilters(["all"])
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value)
  }

  const handleFilterChange = (filters: FilterType[]): void => {
    setActiveFilters(filters)
  }

  const handleShowOrderDetails = (): void => {
    setShowOrderDetails(true)
  }

  const handleCloseOrderDetails = (): void => {
    setShowOrderDetails(false)
    setShowOrderConfirmation(false)
    setOrderType(null)
    setDeliveryAddress("")
    setRoomNumber("")
    setCustomerName("")
    setCustomerPhone("")
    setCustomerID("")
    setGoogleMapsAddress("")
    setOrderNotes("")
  }

  const handleConfirmOrder = (): void => {
    setShowOrderDetails(false)
    setShowOrderConfirmation(true)
  }

  const handleProcessOrder = async (): Promise<void> => {
    if (!orderType || isProcessingOrder) return

    const isDelivery = orderType === "delivery"
    const isValidDelivery = isDelivery && customerName && customerPhone && customerID && deliveryAddress
    const isValidRoom = !isDelivery && roomNumber

    if (!isValidDelivery && !isValidRoom) {
      alert("Por favor, completa todos los campos requeridos.")
      return
    }

    setIsProcessingOrder(true)

    try {
      // Prepare cart items for API
      const cartItems = Array.from(cart.values()).map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))

      const subtotal = calculateCartTotal()

      const orderData = {
        orderType,
        customerInfo: {
          name: customerName || null,
          phone: customerPhone || null,
          cedula: customerID || null,
          address: deliveryAddress || null,
          googleMapsLink: googleMapsAddress || null,
          roomNumber: roomNumber || null,
        },
        items: cartItems,
        subtotal: subtotal,
        notes: orderNotes || null,
      }

      console.log("Sending order data:", orderData)

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      const result = await response.json()
      console.log("Order response:", result)

      if (result.success) {
        setLastOrderId(result.data.orderId)
        setShowOrderConfirmation(false)
        setShowConfirmationMessage(true)
        setCart(new Map()) // Clear cart

        // Auto close confirmation message after 5 seconds
        setTimeout(() => {
          setShowConfirmationMessage(false)
          handleCloseOrderDetails()
        }, 5000)
      } else {
        throw new Error(result.message || "Error al procesar el pedido")
      }
    } catch (error) {
      console.error("Error processing order:", error)
      alert(`Error al procesar el pedido: ${error instanceof Error ? error.message : "Error desconocido"}`)
    } finally {
      setIsProcessingOrder(false)
    }
  }

  const currentGradients = getGradientOverlay(selectedMenu)
  const accentColor = getAccentColor(selectedMenu)

  const handleCheckout = () => {
    setShowOrderConfirmation(true)
  }

  const handleFinalOrder = () => {
    if (orderType === "delivery") {
      if (!deliveryAddress.trim()) {
        alert("Por favor ingresa la dirección de entrega")
        return
      }
      if (!customerName.trim()) {
        alert("Por favor ingresa tu nombre completo")
        return
      }
      if (!customerPhone.trim()) {
        alert("Por favor ingresa tu número de teléfono")
        return
      }
      if (!customerID.trim()) {
        alert("Por favor ingresa tu número de cédula")
        return
      }
    }
    if (orderType === "room" && !roomNumber.trim()) {
      alert("Por favor ingresa el número de habitación")
      return
    }

    handleProcessOrder()
  }

  return (
    <div
      className="relative z-10 pt-16 md:pt-24 pb-12 min-h-screen bg-cover bg-center bg-no-repeat bg-fixed transition-all duration-700 ease-in-out"
      style={{
        backgroundImage: `url('${getBackgroundImage(selectedMenu)}')`,
      }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-b transition-all duration-700 ease-in-out ${currentGradients.primary}`}
      />

      <div
        className={`absolute inset-0 bg-gradient-to-r transition-all duration-700 ease-in-out ${currentGradients.secondary}`}
      />

      <div
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${selectedMenu === "desayuno-buffet"
          ? "bg-gradient-to-tr from-amber-300/25 via-transparent to-yellow-200/15"
          : selectedMenu === "menu-principal"
            ? "bg-gradient-to-bl from-emerald-300/25 via-transparent to-teal-200/15"
            : selectedMenu === "vinos-bebidas"
              ? "bg-gradient-to-tl from-indigo-400/25 via-transparent to-violet-300/15"
              : "bg-gradient-to-tr from-red-400/22 via-transparent to-orange-300/15"
          }`}
      />

      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
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
                filterOptions={filterOptions}
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-8 sm:mb-12">
              <div className="flex items-center space-x-4 mb-6">
                <div
                  className={`p-3 sm:p-4 rounded-2xl shadow-xl transition-all duration-300 backdrop-blur-sm`}
                  style={{
                    backgroundColor: `${accentColor}90`,
                    boxShadow: `0 8px 32px ${accentColor}40`,
                  }}
                >
                  <ChefHat className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-100 mb-1">{currentMenu.name}</h2>
                  <p className="text-base sm:text-lg text-gray-200">{currentMenu.subtitle}</p>
                </div>
              </div>

              {!activeFilters.includes("all") && (
                <div className="lg:hidden flex flex-wrap gap-2 mt-4">
                  {activeFilters.map((filter) => {
                    const filterOption = filterOptions.find((f) => f.key === filter)
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
                            const newFilters = activeFilters.filter((f) => f !== filter)
                            setActiveFilters(newFilters.length > 0 ? newFilters : ["all"])
                          }}
                        >
                          ×
                        </span>
                      </Badge>
                    ) : null
                  })}

                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-6 px-2 rounded-full transition-all duration-300 hover:bg-white/10 backdrop-blur-sm border bg-transparent"
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

            <div className="space-y-12 sm:space-y-16">
              {filteredCategories.length === 0 ? (
                <div className="text-center py-16 sm:py-20">
                  <div className="mb-4">
                    <Search className="w-16 h-16 text-gray-300 mx-auto" />
                  </div>
                  <p className="text-gray-50 text-lg sm:text-xl mb-2">No se encontraron platos</p>
                  <p className="text-gray-50 text-sm sm:text-base">Prueba con otros términos de búsqueda o filtros</p>
                </div>
              ) : (
                filteredCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <div className="mb-8">
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-3">{category.name}</h3>
                      <p className="text-gray-200 text-base sm:text-lg">{category.description}</p>
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

      {/* Cart Button */}
      {cart.size > 0 && (
        <div className="fixed bottom-20 sm:bottom-24 lg:bottom-28 right-4 sm:right-6 lg:right-8 z-50">
          <Button
            size="lg"
            className="rounded-full shadow-2xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold transform hover:scale-105 transition-all duration-200 text-white backdrop-blur-sm"
            style={{
              backgroundColor: `${accentColor}90`,
              boxShadow: `0 10px 30px ${accentColor}50`,
            }}
            onClick={handleShowOrderDetails}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">Ver Pedido</span>
            <span className="sm:hidden">Pedido</span>
            <Badge className="ml-2 bg-white font-bold" style={{ color: accentColor }}>
              {Array.from(cart.values()).reduce((total, item) => total + item.quantity, 0)}
            </Badge>
          </Button>
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderDetails && !showOrderConfirmation && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
          <div className="hidden lg:flex items-center justify-center p-4 h-full">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100">
              <div
                className="px-6 py-4 border-b border-gray-100"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}10, ${accentColor}05)`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl" style={{ backgroundColor: `${accentColor}20` }}>
                      <ShoppingCart className="w-6 h-6" style={{ color: accentColor }} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Tu Pedido</h2>
                      <p className="text-sm text-gray-600">
                        {Array.from(cart.values()).reduce((total, item) => total + item.quantity, 0)} productos seleccionados
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowOrderDetails(false)}
                    className="rounded-full w-10 h-10 p-0 hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-2xl text-gray-400 hover:text-gray-600">×</span>
                  </Button>
                </div>
              </div>

              <div className="px-6 py-4 max-h-96 overflow-y-auto">
                {cart.size === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Array.from(cart.values()).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <div
                            className="w-full h-full flex items-center justify-center text-white font-bold text-sm"
                            style={{ backgroundColor: `${accentColor}60` }}
                          >
                            {item.name.charAt(0)}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.price} c/u</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 p-0 rounded-full"
                            >
                              -
                            </Button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 p-0 rounded-full"
                            >
                              +
                            </Button>
                          </div>
                          <span className="font-bold text-lg w-20 text-right" style={{ color: accentColor }}>
                            {(Number.parseFloat(item.price.replace("€", "")) * item.quantity).toFixed(2)}€
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleCart(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full w-8 h-8 p-0"
                          >
                            ×
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">{calculateCartTotal().toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Envío:</span>
                    <span>Gratis</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total:</span>
                    <span style={{ color: accentColor }}>{calculateCartTotal().toFixed(2)}€</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowOrderDetails(false)}
                    className="flex-1 rounded-xl py-3 border-gray-300 hover:bg-gray-100 transition-colors"
                  >
                    Seguir Comprando
                  </Button>
                  <Button
                    onClick={handleCheckout}
                    disabled={cart.size === 0}
                    className="flex-1 rounded-xl py-3 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    style={{
                      backgroundColor: accentColor,
                      boxShadow: `0 4px 20px ${accentColor}40`,
                    }}
                  >
                    Confirmar Pedido
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Order Details */}
          <div className="lg:hidden absolute inset-0" onClick={() => setShowOrderDetails(false)} />
          <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-white rounded-t-xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Tu Pedido</h3>
              <button onClick={() => setShowOrderDetails(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                ×
              </button>
            </div>

            {cart.size === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
              </div>
            ) : (
              <div className="space-y-4 mb-6">
                {Array.from(cart.values()).map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <div
                        className="w-full h-full flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: `${accentColor}60` }}
                      >
                        {item.name.charAt(0)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.price} c/u</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 p-0 rounded-full"
                        >
                          -
                        </Button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 p-0 rounded-full"
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="font-bold text-lg" style={{ color: accentColor }}>
                        {(Number.parseFloat(item.price.replace("€", "")) * item.quantity).toFixed(2)}€
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCart(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full w-8 h-8 p-0"
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cart.size > 0 && (
              <>
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between text-gray-700 mb-2">
                    <span>Subtotal:</span>
                    <span className="font-semibold">{calculateCartTotal().toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-gray-700 mb-2 text-sm">
                    <span>Envío:</span>
                    <span>Gratis</span>
                  </div>
                  <div className="flex justify-between font-bold text-xl text-gray-900 border-t pt-3 mt-3">
                    <span>Total</span>
                    <span style={{ color: accentColor }}>{calculateCartTotal().toFixed(2)}€</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full text-white py-4 font-semibold rounded-xl"
                  style={{
                    backgroundColor: accentColor,
                  }}
                >
                  Confirmar Pedido
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {showOrderConfirmation && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
          <div className="hidden lg:flex items-center justify-center p-4 h-full">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all duration-300 scale-100">
              <div
                className="px-6 py-4 border-b border-gray-100"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}10, ${accentColor}05)`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowOrderConfirmation(false)}
                      className="rounded-full w-10 h-10 p-0 hover:bg-gray-100 transition-colors"
                      disabled={isProcessingOrder}
                    >
                      <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </Button>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Confirmar Pedido</h2>
                      <p className="text-sm text-gray-600">Elige el tipo de entrega</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
                {!orderType ? (
                  <div className="space-y-4">
                    <p className="text-gray-700 mb-6 text-center">¿Cómo quieres recibir tu pedido?</p>

                    <button
                      onClick={() => setOrderType("delivery")}
                      disabled={isProcessingOrder}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                          <MapPin className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Delivery</h3>
                          <p className="text-sm text-gray-600">Entrega a domicilio</p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setOrderType("room")}
                      disabled={isProcessingOrder}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200 text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                          <Building2 className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Habitación</h3>
                          <p className="text-sm text-gray-600">Entrega en habitación del hotel</p>
                        </div>
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orderType === "delivery" ? (
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <MapPin className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">Delivery</h3>
                            <p className="text-sm text-gray-600">Completa tus datos para la entrega</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <User className="w-4 h-4" />
                                Nombre completo *
                              </label>
                              <input
                                type="text"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                placeholder="Ej: Juan Pérez García"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                                disabled={isProcessingOrder}
                              />
                            </div>
                            <div>
                              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <Phone className="w-4 h-4" />
                                Número de teléfono *
                              </label>
                              <input
                                type="tel"
                                value={customerPhone}
                                onChange={(e) => setCustomerPhone(e.target.value)}
                                placeholder="Ej: +34 612 345 678"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                                disabled={isProcessingOrder}
                              />
                            </div>
                            <div>
                              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <CreditCard className="w-4 h-4" />
                                Número de cédula *
                              </label>
                              <input
                                type="text"
                                value={customerID}
                                onChange={(e) => setCustomerID(e.target.value)}
                                placeholder="Ej: 12345678A"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                                disabled={isProcessingOrder}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                              <MapPin className="w-4 h-4" />
                              Dirección completa *
                            </label>
                            <textarea
                              value={deliveryAddress}
                              onChange={(e) => setDeliveryAddress(e.target.value)}
                              placeholder="Ej: Calle Principal 123, Piso 2, Apartamento A, Ciudad"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                              rows={3}
                              required
                              disabled={isProcessingOrder}
                            />
                          </div>
                          <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                              <MapPin className="w-4 h-4" />
                              Enlace de Google Maps (opcional)
                            </label>
                            <input
                              type="url"
                              value={googleMapsAddress}
                              onChange={(e) => setGoogleMapsAddress(e.target.value)}
                              placeholder="Ej: https://maps.google.com/..."
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              disabled={isProcessingOrder}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              Comparte tu ubicación desde Google Maps para una entrega más precisa
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Building2 className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">Habitación</h3>
                            <p className="text-sm text-gray-600">Ingresa el número de habitación</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-700">Número de habitación *</label>
                          <input
                            type="text"
                            value={roomNumber}
                            onChange={(e) => setRoomNumber(e.target.value)}
                            placeholder="Ej: 205, 1A, Suite 301"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            required
                            disabled={isProcessingOrder}
                          />
                        </div>
                      </div>
                    )}

                    {/* Order Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notas adicionales (opcional)
                      </label>
                      <textarea
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="Ej: Sin cebolla, entregar en portería, etc."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 resize-none"
                        rows={2}
                        disabled={isProcessingOrder}
                      />
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Resumen del pedido</h4>
                      <div className="space-y-1 text-sm">
                        {Array.from(cart.values()).map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <span className="text-gray-600">
                              {item.name} x{item.quantity}
                            </span>
                            <span className="font-medium">
                              {(Number.parseFloat(item.price.replace("€", "")) * item.quantity).toFixed(2)}€
                            </span>
                          </div>
                        ))}
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total:</span>
                        <span className="font-bold text-lg" style={{ color: accentColor }}>
                          {calculateCartTotal().toFixed(2)}€
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setOrderType(null)}
                        disabled={isProcessingOrder}
                        className="flex-1 rounded-xl py-3 border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50"
                      >
                        Atrás
                      </Button>
                      <Button
                        onClick={handleFinalOrder}
                        disabled={
                          isProcessingOrder ||
                          (orderType === "delivery" &&
                            (!deliveryAddress.trim() ||
                              !customerName.trim() ||
                              !customerPhone.trim() ||
                              !customerID.trim())) ||
                          (orderType === "room" && !roomNumber.trim())
                        }
                        className="flex-1 rounded-xl py-3 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        style={{
                          backgroundColor: accentColor,
                          boxShadow: `0 4px 20px ${accentColor}40`,
                        }}
                      >
                        {isProcessingOrder ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Procesando...
                          </div>
                        ) : (
                          "Confirmar Pedido"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Order Confirmation */}
          <div className="lg:hidden absolute inset-0" onClick={() => !isProcessingOrder && setShowOrderConfirmation(false)} />
          <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-white rounded-t-xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Confirmar Pedido</h3>
              <button
                onClick={() => !isProcessingOrder && setShowOrderConfirmation(false)}
                disabled={isProcessingOrder}
                className="text-gray-500 hover:text-gray-700 text-2xl disabled:opacity-50"
              >
                ×
              </button>
            </div>

            {!orderType ? (
              <div className="space-y-4">
                <p className="text-gray-700 mb-6 text-center">¿Cómo quieres recibir tu pedido?</p>

                <button
                  onClick={() => setOrderType("delivery")}
                  disabled={isProcessingOrder}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left group disabled:opacity-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Delivery</h3>
                      <p className="text-sm text-gray-600">Entrega a domicilio</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setOrderType("room")}
                  disabled={isProcessingOrder}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200 text-left group disabled:opacity-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                      <Building2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Habitación</h3>
                      <p className="text-sm text-gray-600">Entrega en habitación del hotel</p>
                    </div>
                  </div>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orderType === "delivery" ? (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Delivery</h3>
                        <p className="text-sm text-gray-600">Completa tus datos</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          <User className="w-4 h-4" />
                          Nombre completo *
                        </label>
                        <input
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Ej: Juan Pérez García"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                          disabled={isProcessingOrder}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          <Phone className="w-4 h-4" />
                          Número de teléfono *
                        </label>
                        <input
                          type="tel"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="Ej: +34 612 345 678"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                          disabled={isProcessingOrder}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          <CreditCard className="w-4 h-4" />
                          Número de cédula *
                        </label>
                        <input
                          type="text"
                          value={customerID}
                          onChange={(e) => setCustomerID(e.target.value)}
                          placeholder="Ej: 12345678A"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                          disabled={isProcessingOrder}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          <MapPin className="w-4 h-4" />
                          Dirección completa *
                        </label>
                        <textarea
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          placeholder="Ej: Calle Principal 123, Piso 2, Apartamento A, Ciudad"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                          rows={3}
                          required
                          disabled={isProcessingOrder}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          <MapPin className="w-4 h-4" />
                          Enlace de Google Maps (opcional)
                        </label>
                        <input
                          type="url"
                          value={googleMapsAddress}
                          onChange={(e) => setGoogleMapsAddress(e.target.value)}
                          placeholder="Ej: https://maps.google.com/..."
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          disabled={isProcessingOrder}
                        />
                        <p className="text-xs text-gray-500 mt-1">Para una entrega más precisa</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Building2 className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Habitación</h3>
                        <p className="text-sm text-gray-600">Ingresa el número</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Número de habitación *</label>
                      <input
                        type="text"
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                        placeholder="Ej: 205, 1A, Suite 301"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                        disabled={isProcessingOrder}
                      />
                    </div>
                  </div>
                )}

                {/* Order Notes Mobile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notas adicionales (opcional)
                  </label>
                  <textarea
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Ej: Sin cebolla, entregar en portería, etc."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 resize-none"
                    rows={2}
                    disabled={isProcessingOrder}
                  />
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between font-bold text-xl text-gray-900">
                    <span>Total</span>
                    <span style={{ color: accentColor }}>{calculateCartTotal().toFixed(2)}€</span>
                  </div>
                </div>

                <Button
                  onClick={handleFinalOrder}
                  disabled={
                    isProcessingOrder ||
                    (orderType === "delivery" &&
                      (!deliveryAddress.trim() ||
                        !customerName.trim() ||
                        !customerPhone.trim() ||
                        !customerID.trim())) ||
                    (orderType === "room" && !roomNumber.trim())
                  }
                  className="w-full text-white py-4 font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: accentColor,
                  }}
                >
                  {isProcessingOrder ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Procesando pedido...
                    </div>
                  ) : orderType === "delivery" &&
                    (!deliveryAddress.trim() || !customerName.trim() || !customerPhone.trim() || !customerID.trim())
                    ? "Completa todos los campos"
                    : orderType === "room" && !roomNumber.trim()
                      ? "Ingresa el número de habitación"
                      : "Confirmar Pedido"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Success Confirmation Message */}
      {showConfirmationMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 scale-100">
            <div
              className="px-6 py-4 text-center"
              style={{
                background: `linear-gradient(135deg, ${accentColor}10, ${accentColor}05)`,
              }}
            >
                            <div className="mb-4">
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${accentColor}20` }}
                >
                  <svg className="w-8 h-8" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Pedido Confirmado!</h2>
                
                {lastOrderId && (
                  <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Número de pedido:</strong> #{lastOrderId}
                    </p>
                  </div>
                )}

                {orderType === "delivery" ? (
                  <div className="text-left bg-gray-50 rounded-lg p-4 mt-4">
                    <p className="text-gray-700 mb-3">
                      <strong>Entrega en:</strong> {deliveryAddress}
                    </p>
                    <p className="text-gray-700 mb-3">
                      <strong>Cliente:</strong> {customerName}
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <span className="font-semibold text-green-800">WhatsApp</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Te estaremos avisando sobre el pedido por tu número de WhatsApp:{" "}
                        <strong>{customerPhone}</strong>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-left bg-gray-50 rounded-lg p-4 mt-4">
                    <p className="text-gray-700 mb-2">
                      <strong>Pedido confirmado para habitación:</strong> {roomNumber}
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-blue-800">Room Service</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        Tu pedido será entregado directamente en tu habitación
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold text-amber-800">Tiempo estimado</span>
                  </div>
                  <p className="text-sm text-amber-700">
                    Tu pedido estará listo en aproximadamente 25-35 minutos
                  </p>
                </div>

                <div className="mt-4 text-sm text-gray-500">
                  Este mensaje se cerrará automáticamente en unos segundos...
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Filter */}
      <div className="lg:hidden">
        <Filter
          selectedMenu={selectedMenu}
          searchTerm={searchTerm}
          onMenuChange={handleMenuChange}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          activeFilters={activeFilters}
          isMobile={true}
          filterOptions={filterOptions}
        />
      </div>
    </div>
  )
}

export default FullMenuPage

