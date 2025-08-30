import type React from "react";

import { useState, useCallback } from "react";

export const useRoomCardState = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFavoriteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  }, []);

  const handleShareClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    // Implementar lógica de compartir
    console.log("Compartir habitación");
  }, []);

  const handleReserveClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return {
    isFavorite,
    imageLoaded,
    isModalOpen,
    setIsModalOpen,
    handleFavoriteClick,
    handleShareClick,
    handleReserveClick,
    handleImageLoad,
  };
};
