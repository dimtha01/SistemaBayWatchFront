"use client"

import type React from "react"
import { useState } from "react"
import { X, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { Review } from "../../types"

interface ReviewModalProps {
  onClose: () => void
  onSubmit: (review: Review) => void
}

export const ReviewModal = ({ onClose, onSubmit }: ReviewModalProps) => {
  const [name, setName] = useState("")
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      alert("Por favor selecciona una calificación")
      return
    }

    setIsSubmitting(true)

    // Simular envío
    setTimeout(() => {
      onSubmit({
        id: Date.now(), // Generar un ID único
        name: name || "Usuario Anónimo",
        avatar: "/avatars/default.webp",
        rating,
        comment,
        date: new Date().toISOString(), // Agregar la fecha actual
      })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">Agregar Reseña</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="name">Tu Nombre (opcional)</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingresa tu nombre"
              className="mt-1"
            />
          </div>

          <div>
            <Label>Calificación</Label>
            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                {rating === 5 && "Excelente"}
                {rating === 4 && "Muy bueno"}
                {rating === 3 && "Bueno"}
                {rating === 2 && "Regular"}
                {rating === 1 && "Malo"}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="comment">Tu Comentario</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comparte tu experiencia..."
              rows={4}
              required
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">{comment.length}/500 caracteres</p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !comment.trim()}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              {isSubmitting ? "Publicando..." : "Publicar Reseña"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
