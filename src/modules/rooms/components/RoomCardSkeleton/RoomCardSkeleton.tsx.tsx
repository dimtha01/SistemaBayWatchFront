export const RoomCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="animate-pulse">
        {/* Imagen skeleton */}
        <div className="h-48 sm:h-56 bg-gray-300"></div>

        <div className="p-4 sm:p-6">
          {/* Título skeleton */}
          <div className="h-6 bg-gray-300 rounded mb-3"></div>

          {/* Precio skeleton */}
          <div className="h-8 bg-gray-300 rounded w-24 mb-4"></div>

          {/* Info skeleton */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>

          {/* Amenities skeleton */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            <div className="h-6 bg-gray-200 rounded-full w-12"></div>
            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            <div className="h-6 bg-gray-200 rounded-full w-14"></div>
          </div>

          {/* Botón skeleton */}
          <div className="h-10 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};
