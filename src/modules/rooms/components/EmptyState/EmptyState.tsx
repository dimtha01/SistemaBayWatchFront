import type { EmptyStateProps } from "../../types"


export const EmptyState = ({ type, onAction, actionLabel }: EmptyStateProps) => {
  const content = {
    error: {
      message: "No se pudieron cargar las habitaciones.",
      icon: "🏨",
    },
    "no-results": {
      message: "No se encontraron habitaciones con los filtros seleccionados.",
      icon: "🏨",
    },
  }

  return (
    <div className="col-span-full text-center text-gray-600 text-lg sm:text-xl py-8 sm:py-10 px-4">
      <div className="flex flex-col items-center space-y-4">
        <div className="text-6xl">{content[type].icon}</div>
        <div>{content[type].message}</div>
        <button
          onClick={onAction}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  )
}
