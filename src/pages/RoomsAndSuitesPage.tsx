import { RoomsHero } from "@/components/RoomsHero.tsx/RoomsHero"
import { Header } from "../components/Header/Header"
import { RoomsGridSection } from "../components/RoomsGridSection/RoomsGridSection"

export const RoomsAndSuitesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <RoomsHero /> {/* Añadir el nuevo hero */}
      <main className="relative z-10">
        {" "}
        {/* No need for pt-24 here, as RoomsHero provides the visual offset */}
        <RoomsGridSection />
      </main>
    </div>
  )
}
