import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight } from "lucide-react";

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }

    // Simulación de envío
    setTimeout(() => {
      console.log("Registro enviado:", formData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-4 relative">
      {/* Elementos decorativos de fondo (originales) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply blur-xl opacity-70 animate-pulse delay-1000"></div>
      </div>

      {/* Formulario */}
      <Card className="w-full max-w-md relative z-10 bg-white/90 backdrop-blur-sm border border-orange-200 shadow-2xl shadow-orange-100/70">
        <CardHeader className="text-center pb-2">
          {/* Ícono */}
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-[#F20C0C] via-[#D10000] to-[#A00000] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <CardTitle
            className="text-3xl font-bold"
            style={{ color: "#0D0D0D" }}
          >
            Crea tu Cuenta
          </CardTitle>
          <p className="text-gray-600 text-sm mt-2">
            Únete a nuestra comunidad hotelera
          </p>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium"
                style={{ color: "#0D0D0D" }}
              >
                Nombre Completo
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500 text-[#0D0D0D] placeholder:text-gray-400 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium"
                style={{ color: "#0D0D0D" }}
              >
                Correo Electrónico
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500 text-[#0D0D0D] placeholder:text-gray-400 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Teléfono */}
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium"
                style={{ color: "#0D0D0D" }}
              >
                Teléfono
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+52 123 456 7890"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10 h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500 text-[#0D0D0D] placeholder:text-gray-400 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium"
                style={{ color: "#0D0D0D" }}
              >
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-12 h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500 text-[#0D0D0D] placeholder:text-gray-400 transition-colors"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500">Mínimo 8 caracteres</p>
            </div>

            {/* Confirmar Contraseña */}
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium"
                style={{ color: "#0D0D0D" }}
              >
                Confirmar Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 pr-12 h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500 text-[#0D0D0D] placeholder:text-gray-400 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Términos */}
            <div className="flex items-start space-x-2 pt-2">
              <input
                id="terms"
                type="checkbox"
                className="mt-1 rounded border-gray-400 text-[#F20C0C] focus:ring-orange-500"
                style={{ accentColor: "#F20C0C" }}
                required
              />
              <Label htmlFor="terms" className="text-gray-600 text-sm">
                Acepto los{" "}
                <a href="#" className="text-[#F20C0C] hover:underline font-medium">
                  Términos de Servicio
                </a>{" "}
                y la{" "}
                <a href="#" className="text-[#F20C0C] hover:underline font-medium">
                  Política de Privacidad
                </a>
              </Label>
            </div>

            {/* Botón de registro */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-[#F20C0C] via-[#D10000] to-[#A00000] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:opacity-70 mt-4"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creando cuenta...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Registrarse</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>

            {/* Enlace a login */}
            <p className="text-center text-sm text-gray-600 pt-4">
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