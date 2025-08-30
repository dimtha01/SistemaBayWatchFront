import { generatePageNumbers } from "../../utils"
import type { PaginationConfig } from "../../types"

interface PaginationProps {
  config: PaginationConfig
  onPageChange: (page: number) => void
}

export const Pagination = ({ config, onPageChange }: PaginationProps) => {
  const { currentPage, totalPages } = config

  if (totalPages <= 1) return null

  const pageNumbers = generatePageNumbers(currentPage, totalPages)

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-2 px-2">
      {/* Información de página en móvil */}
      <div className="sm:hidden text-sm text-gray-600 mb-2">
        Página {currentPage} de {totalPages}
      </div>

      <div className="flex items-center space-x-1 sm:space-x-2 flex-wrap justify-center">
        {/* Botón Anterior */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-2 sm:px-4 py-2 text-xs sm:text-sm rounded-lg border transition-colors ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
              : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-gray-400"
          }`}
        >
          <span className="hidden sm:inline">Anterior</span>
          <span className="sm:hidden">‹</span>
        </button>

        {/* Números de página */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {pageNumbers.map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={page === "..."}
              className={`px-2 sm:px-4 py-2 text-xs sm:text-sm rounded-lg border transition-colors min-w-[32px] sm:min-w-[40px] ${
                page === currentPage
                  ? "bg-blue-600 text-white border-blue-600"
                  : page === "..."
                    ? "bg-white text-gray-400 cursor-default border-gray-200"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-gray-400"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Botón Siguiente */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-2 sm:px-4 py-2 text-xs sm:text-sm rounded-lg border transition-colors ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
              : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-gray-400"
          }`}
        >
          <span className="hidden sm:inline">Siguiente</span>
          <span className="sm:hidden">›</span>
        </button>
      </div>

      {/* Ir a página específica en desktop */}
      <div className="hidden lg:flex items-center space-x-2 ml-4">
        <span className="text-sm text-gray-600">Ir a:</span>
        <input
          type="number"
          min="1"
          max={totalPages}
          value={currentPage}
          onChange={(e) => {
            const page = Number.parseInt(e.target.value)
            if (page >= 1 && page <= totalPages) {
              onPageChange(page)
            }
          }}
          className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  )
}
