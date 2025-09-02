import { AboutUsGallery } from "../components/AboutUsGalery/AboutUsGallery"
import { AboutUsHero } from "../components/AboutUsGalery/AboutUsGalleryHero"

export const AboutUsGaleryPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <AboutUsHero />
            <main className="relative z-10">
                <AboutUsGallery />
            </main>
        </div>
    );
};