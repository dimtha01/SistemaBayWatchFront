"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, StarHalf, Plus } from "lucide-react";
import { ReviewModal } from "../ReviewModal";
import type { Review } from "../../types";


interface RoomReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  onAddReview: (review: Review) => void;
}

export const RoomReviews = ({
  reviews,
  averageRating,
  totalReviews,
  onAddReview,
}: RoomReviewsProps) => {
  const [showModal, setShowModal] = useState(false);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="fill-yellow-400 text-yellow-400 h-4 w-4" />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="fill-yellow-400 text-yellow-400 h-4 w-4"
        />
      );
    }

    return stars;
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4 sm:mb-0">
          Reseñas de Huéspedes
        </h2>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Agregar Reseña</span>
          <span className="sm:hidden">Reseña</span>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center mb-6 gap-4">
        <span className="text-4xl md:text-5xl font-bold text-red-600">
          {averageRating.toFixed(1)}
        </span>
        <div>
          <div className="flex text-yellow-400 text-xl mb-1">
            {renderStars(averageRating)}
          </div>
          <p className="text-gray-600 text-sm md:text-base">
            Basado en {totalReviews} reseñas
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-t border-gray-200 pt-6">
            <div className="flex items-center mb-2">
              <Avatar className="mr-3 h-10 w-10">
                <AvatarImage
                  src={review.avatar || "/placeholder.svg"}
                  alt={review.name}
                />
                <AvatarFallback className="bg-red-100 text-red-600">
                  {review.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-sm md:text-base">
                  {review.name}
                </p>
                <div className="flex">{renderStars(review.rating)}</div>
              </div>
            </div>
            <p className="text-gray-700 mb-2 text-sm md:text-base">
              {review.comment}
            </p>
            <p className="text-gray-500 text-xs">Publicado el {review.date}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <ReviewModal
          onClose={() => setShowModal(false)}
          onSubmit={(review) => {
            onAddReview(review);
            setShowModal(false);
          }}
        />
      )}
    </>
  );
};
