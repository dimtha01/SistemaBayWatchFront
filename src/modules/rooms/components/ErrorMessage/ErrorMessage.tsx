interface ErrorMessageProps {
  error: string
  onRetry: () => void
}

export const ErrorMessage = ({ error, onRetry }: ErrorMessageProps) => {
  return (
    <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-red-600 mr-3">⚠️</div>
          <div>
            <h3 className="text-red-800 font-medium">Error al cargar las habitaciones</h3>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        </div>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
        >
          Reintentar
        </button>
      </div>
    </div>
  )
}
