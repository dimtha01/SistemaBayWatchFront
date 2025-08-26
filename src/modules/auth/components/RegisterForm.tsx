import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useRegisterForm } from "../hook/useRegisterForm";

export const RegisterForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    error,
    isLoading,
    handleSubmit,
  } = useRegisterForm();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-3 sm:p-4 md:p-6 relative">
      {/* Elementos decorativos de fondo (originales) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply blur-xl opacity-70 animate-pulse delay-1000"></div>
      </div>

      {/* Formulario */}
      <Card className=" w-full max-w-sm sm:max-w-md lg:max-w-lg relative z-10 bg-white/90 backdrop-blur-sm border border-orange-200 shadow-2xl shadow-orange-100/70 py-7">
        <CardHeader className="text-center pb-2 px-4 sm:px-6">
          {/* Ícono */}
          <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-[#F20C0C] via-[#D10000] to-[#A00000] rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
            <User className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
          </div>
          <CardTitle
            className="text-2xl sm:text-3xl font-bold"
            style={{ color: "#0D0D0D" }}
          >
            Crea tu Cuenta
          </CardTitle>
          <p className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2">
            Únete a nuestra comunidad hotelera
          </p>
        </CardHeader>

        <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}
            {/* Email */}
            <div className="space-y-1 sm:space-y-2">
              <Label
                htmlFor="email"
                className="text-xs sm:text-sm font-medium"
                style={{ color: "#0D0D0D" }}
              >
                Correo Electrónico
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 sm:top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 sm:pl-10 h-10 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-orange-500 focus:ring-orange-500 text-[#0D0D0D] placeholder:text-gray-400 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="space-y-1 sm:space-y-2">
              <Label
                htmlFor="password"
                className="text-xs sm:text-sm font-medium"
                style={{ color: "#0D0D0D" }}
              >
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 sm:top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 sm:pl-10 pr-10 sm:pr-12 h-10 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-orange-500 focus:ring-orange-500 text-[#0D0D0D] placeholder:text-gray-400 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 sm:top-3 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500">Mínimo 8 caracteres</p>
            </div>

            {/* Confirmar Contraseña */}
            <div className="space-y-1 sm:space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-xs sm:text-sm font-medium"
                style={{ color: "#0D0D0D" }}
              >
                Confirmar Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 sm:top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-9 sm:pl-10 pr-10 sm:pr-12 h-10 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-orange-500 focus:ring-orange-500 text-[#0D0D0D] placeholder:text-gray-400 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 sm:top-3 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Términos */}
            <div className="flex items-start space-x-2 pt-1 sm:pt-2">
              <input
                id="terms"
                type="checkbox"
                className="mt-0.5 sm:mt-1 rounded border-gray-400 text-[#F20C0C] focus:ring-orange-500 w-4 h-4"
                style={{ accentColor: "#F20C0C" }}
                required
              />
              <Label
                htmlFor="terms"
                className="text-gray-600 text-xs sm:text-sm leading-tight"
              >
                Acepto los{" "}
                <a
                  href="#"
                  className="text-[#F20C0C] hover:underline font-medium"
                >
                  Términos de Servicio
                </a>{" "}
                y la{" "}
                <a
                  href="#"
                  className="text-[#F20C0C] hover:underline font-medium"
                >
                  Política de Privacidad
                </a>
              </Label>
            </div>

            {/* Botón de registro */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 sm:h-12 text-sm sm:text-base bg-gradient-to-r from-[#F20C0C] via-[#D10000] to-[#A00000] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:opacity-70 mt-3 sm:mt-4"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creando cuenta...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Registrarse</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              )}
            </Button>

            {/* Enlace a login */}
            <p className="text-center text-xs sm:text-sm text-gray-600 pt-3 sm:pt-4">
              ¿Ya tienes una cuenta?{" "}
              <a
                href="/login"
                className="text-[#F20C0C] hover:text-orange-600 font-semibold hover:underline transition-colors"
              >
                Inicia sesión aquí
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
