import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, Users } from "lucide-react"

export const SearchForm = () => {
  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Location */}
        <div className="space-y-2">
          <div className="flex items-center text-white/80">
            <Search className="w-4 h-4 mr-2" />
          </div>
          <Input
            placeholder="Stavanger, Noruega"
            className="bg-transparent border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
          />
        </div>

        {/* Registrarse */}
        <div className="space-y-2">
          <div className="flex items-center text-white/80">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">Registrarse</span>
          </div>
          <Input type="date" className="bg-transparent border-white/20 text-white focus:border-white/40" />
        </div>

        {/* Verificar */}
        <div className="space-y-2">
          <div className="flex items-center text-white/80">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">Verificar</span>
          </div>
          <Input type="date" className="bg-transparent border-white/20 text-white focus:border-white/40" />
        </div>

        {/* Invitados y botón de búsqueda */}
        <div className="space-y-2">
          <div className="flex items-center text-white/80">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm">Invitados</span>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="2 Invitados"
              className="bg-transparent border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
            />
            <Button className="bg-gradient-to-r from-[#F20C0C] to-[#8A0303] hover:from-[#D10000] hover:to-[#5A0000] text-white font-semibold rounded-sm px-8">Verificar</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
