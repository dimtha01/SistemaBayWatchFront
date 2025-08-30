import { RoomsGridSection, RoomsHero } from "@/modules/rooms";

export const RoomsAndSuitesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <RoomsHero /> {/* Añadir el nuevo hero */}
      <main className="relative z-10">
        {" "}
        {/* No need for pt-24 here, as RoomsHero provides the visual offset */}
        <RoomsGridSection />
      </main>
    </div>
  );
};
