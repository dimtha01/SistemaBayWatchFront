import { useState, useEffect } from "react"
import type { PaginationConfig } from "../types"

interface UsePaginationProps {
  totalItems: number
  itemsPerPage: number
  autoScroll?: boolean
}

export const usePagination = ({ totalItems, itemsPerPage, autoScroll = true }: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  // Auto scroll when page changes
  useEffect(() => {
    if (autoScroll && currentPage > 1) {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      })
    }
  }, [currentPage, autoScroll])

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const resetPage = () => {
    setCurrentPage(1)
  }

  const config: PaginationConfig = {
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
  }

  return {
    config,
    startIndex,
    endIndex,
    goToPage,
    nextPage,
    prevPage,
    resetPage,
  }
}
