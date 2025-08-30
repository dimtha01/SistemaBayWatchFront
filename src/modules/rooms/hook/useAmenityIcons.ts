
import { useCallback } from "react"
import { DynamicIcon } from "../components/DynamicIcon/DynamicIcon"

export const useAmenityIcons = () => {
  const getAmenityIcon = useCallback((Droplets: string) => {
    

    return DynamicIcon({
      name: Droplets as string,
      className: "w-3.5 h-3.5 text-[#020659]",
    })
  }, [])

  return {
    getAmenityIcon,
  }
}
