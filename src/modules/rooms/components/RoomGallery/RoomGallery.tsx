"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface RoomGalleryProps {
  images: string[]
  mainTitle: string
}

export const RoomGallery = ({ images, mainTitle }: RoomGalleryProps) => {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative">
      {/* Galería principal */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-lg mb-4">
        <img
          src={images[currentImage] || "/placeholder.svg"}
          alt={`${mainTitle} - Vista ${currentImage + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Controles de navegación */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 md:p-2 rounded-full transition"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 md:p-2 rounded-full transition"
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-full transition ${index === currentImage ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>

      {/* Miniaturas - ocultas en móvil */}
      <div className="hidden md:grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`relative aspect-[4/3] overflow-hidden rounded-lg ${
              index === currentImage ? "ring-2 ring-red-600" : ""
            }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Miniatura ${index + 1}`}
              className="w-full h-full object-cover hover:scale-110 transition-transform"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
