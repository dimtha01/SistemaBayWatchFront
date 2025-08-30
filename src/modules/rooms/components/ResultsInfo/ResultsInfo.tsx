interface ResultsInfoProps {
  startIndex: number
  endIndex: number
  totalItems: number
}

export const ResultsInfo = ({ startIndex, endIndex, totalItems }: ResultsInfoProps) => {
  return (
    <div className="mb-4 sm:mb-6 text-xs sm:text-sm text-gray-600 px-2">
      <span className="block sm:inline">
        Mostrando {startIndex + 1}-{Math.min(endIndex, totalItems)}
      </span>
      <span className="block sm:inline sm:ml-1">de {totalItems} habitaciones</span>
    </div>
  )
}
