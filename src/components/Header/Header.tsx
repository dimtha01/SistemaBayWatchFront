import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, User, Settings, LogOut, Calendar, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../modules/auth/hook/useAuth";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const userMenuRef = useRef(null);

  // Detectar scroll para cambiar estilo del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, []);

  // Cerrar menú de usuario al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigationLinks = [
    { to: "/rooms-and-suites", label: "Habitaciones" },
    { to: "/gastronomy", label: "Gastronomía" },
    { to: "/services", label: "Servicios" },
    { to: "/experiences", label: "Experiencias" },
    { to: "/about-us", label: "Sobre Nosotros" },
    { to: "/contact", label: "Contacto" },
  ];

  const userMenuItems = [
    { to: "/profile", label: "Mi Perfil", icon: User },
    { to: "/my-reservations", label: "Mis Reservas", icon: Calendar },
    { to: "/favorites", label: "Favoritos", icon: Heart },
    { to: "/settings", label: "Configuración", icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto transition-all duration-300">
          {/* Logo */}
          <Link
            to="/"
            className="text-white hover:opacity-90 transition-opacity z-50 relative"
          >
            <img
              src="/images/baywatch_logo.webp"
              alt="Bay Watch Logo"
              className={`w-auto transition-all duration-300 ${
                isScrolled ? "h-12 sm:h-16" : "h-16 sm:h-20 lg:h-24"
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 bg-black/30 backdrop-blur-md rounded-full px-4 xl:px-6 py-2.5 xl:py-3 border border-white/20 shadow-lg">
            {navigationLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-white hover:text-yellow-200 transition-colors duration-300 font-medium text-sm xl:text-base whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop User Actions */}
          <div className="hidden lg:flex items-center space-x-3 lg:space-x-4">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                {/* User Menu Button */}
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center space-x-2 px-3 lg:px-4 py-2 bg-black/30 backdrop-blur-md text-white font-medium rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300 ${
                    isScrolled ? "text-xs lg:text-sm px-2 lg:px-3" : "text-sm lg:text-base"
                  }`}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden md:inline">
                    Hola, {user.name || user.email?.split('@')[0]}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`} />
                </button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 overflow-hidden"
                    >
                      {/* User Info Header */}
                      <div className="px-4 py-3 bg-gradient-to-r from-red-600/20 to-red-700/20 border-b border-white/10">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-semibold text-sm">
                              {user.name || 'Usuario'}
                            </p>
                            <p className="text-white/70 text-xs">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        {userMenuItems.map((item) => {
                          const IconComponent = item.icon;
                          return (
                            <Link
                              key={item.to}
                              to={item.to}
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/10 hover:text-yellow-200 transition-all duration-300 group"
                            >
                              <IconComponent className="w-4 h-4 text-white/70 group-hover:text-yellow-200" />
                              <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Logout Button */}
                      <div className="border-t border-white/10 p-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 rounded-lg group"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="text-sm font-medium">Cerrar Sesión</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/signin"
                className={`px-4 lg:px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full shadow-lg hover:from-red-500 hover:to-red-600 hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm lg:text-base ${
                  isScrolled ? "text-xs lg:text-sm px-3 lg:px-5" : ""
                }`}
              >
                <span className="hidden md:inline">Iniciar Sesión</span>
                <span className="md:hidden">Entrar</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Buttons */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className={`lg:hidden p-2 text-white hover:text-yellow-200 transition-colors duration-300 z-50 relative ${
              isMenuOpen ? "hidden" : ""
            }`}
            aria-label="Abrir menú"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={() => setIsMenuOpen(false)}
            className={`lg:hidden p-2 text-white hover:text-yellow-200 transition-colors duration-300 z-50 relative ${
              !isMenuOpen ? "hidden" : ""
            }`}
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-72 sm:w-80 max-w-[85vw] bg-gradient-to-b from-gray-900 via-gray-800 to-black shadow-2xl z-40 lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 mt-16 sm:mt-20">
                  {user ? (
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-white text-lg font-bold">
                          {user.name || 'Usuario'}
                        </h2>
                        <p className="text-white/70 text-sm">{user.email}</p>
                      </div>
                    </div>
                  ) : (
                    <h2 className="text-white text-lg sm:text-xl font-bold">
                      Menú
                    </h2>
                  )}
                </div>

                {/* User Menu Items (Mobile) */}
                {user && (
                  <div className="px-4 sm:px-6 py-4 border-b border-white/10">
                    <h3 className="text-white/70 text-sm font-semibold mb-3 uppercase tracking-wider">
                      Mi Cuenta
                    </h3>
                    <div className="space-y-1">
                      {userMenuItems.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                          <motion.div
                            key={item.to}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                          >
                            <Link
                              to={item.to}
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center space-x-3 w-full px-3 sm:px-4 py-3 text-white hover:text-yellow-200 hover:bg-white/10 rounded-lg transition-all duration-300 group text-sm sm:text-base"
                            >
                              <IconComponent className="w-4 h-4 text-white/70 group-hover:text-yellow-200" />
                              <span className="font-medium">{item.label}</span>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Navigation Links */}
                <nav className="flex-1 px-4 sm:px-6 py-6 sm:py-8">
                  <h3 className="text-white/70 text-sm font-semibold mb-3 uppercase tracking-wider">
                    Navegación
                  </h3>
                  <div className="space-y-1 sm:space-y-2">
                    {navigationLinks.map((link, index) => (
                      <motion.div
                        key={link.to}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: (index + userMenuItems.length) * 0.1, duration: 0.3 }}
                      >
                        <Link
                          to={link.to}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center justify-between w-full px-3 sm:px-4 py-3 sm:py-4 text-white hover:text-yellow-200 hover:bg-white/10 rounded-lg transition-all duration-300 group text-sm sm:text-base"
                        >
                          <span className="font-medium">{link.label}</span>
                          <ChevronDown className="w-4 h-4 rotate-[-90deg] group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>

                {/* Mobile User Actions */}
                <div className="p-4 sm:p-6 border-t border-white/10 space-y-3 sm:space-y-4">
                  {user ? (
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center justify-center space-x-2 w-full px-4 sm:px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full shadow-lg hover:from-red-500 hover:to-red-600 hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Cerrar Sesión</span>
                    </button>
                  ) : (
                    <Link
                      to="/signin"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full px-4 sm:px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full shadow-lg hover:from-red-500 hover:to-red-600 hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center text-sm sm:text-base"
                    >
                      Iniciar Sesión
                    </Link>
                  )}

                  {/* Additional Mobile Actions */}
                  <div className="flex space-x-2 sm:space-x-3">
                    <button className="flex-1 px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-md text-white font-medium rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 text-xs sm:text-sm">
                      Reservar
                    </button>
                    <button className="flex-1 px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-md text-white font-medium rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 text-xs sm:text-sm">
                      Llamar
                    </button>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="p-4 sm:p-6 bg-black/30">
                  <p className="text-white/70 text-sm text-center">
                    Bay Watch Hotel
                  </p>
                  <p className="text-white/50 text-xs text-center mt-1">
                    Experiencias únicas te esperan
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
