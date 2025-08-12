// components/WhatsAppButton.tsx
import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  const phoneNumber = "+584244572397"; // Reemplazar con número real
  const message = "Hola, me interesa la Suite Ocean View Premium";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed 
        bottom-4 right-4 
        sm:bottom-6 sm:right-6 
        lg:bottom-8 lg:right-8 
        bg-green-500 hover:bg-green-600 
        text-white 
        p-2 sm:p-3 lg:p-4
        rounded-full 
        shadow-lg hover:shadow-xl
        z-50 
        transition-all duration-300 ease-in-out
        hover:scale-110 
        active:scale-95
        group
        touch-manipulation
      "
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 group-hover:rotate-12 transition-transform duration-300" />

      {/* Tooltip responsivo */}
      <div
        className="
        absolute right-full mr-2 sm:mr-3 lg:mr-4
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
        ¡Chatea con nosotros!
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
      </div>

      {/* Pulse animation */}
      <div
        className="
        absolute inset-0 
        bg-green-500 
        rounded-full 
        animate-ping 
        opacity-20
        scale-110
      "
      ></div>
    </a>
  );
};
