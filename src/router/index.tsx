// src/routes/index.tsx
import { createBrowserRouter } from "react-router-dom";
import { InicioPage } from "../pages/InicioPage";
import { AboutUsPage } from "../pages/AboutUsPage";
import { ContactPage } from "../pages/ContactPage";
import { ServicesPage } from "../pages/ServicesPage";
import { ExperiencesPage } from "@/pages/ExperiencesPage";
import { GastronomyPage } from "@/pages/GastronomyPage";
import { RoomsAndSuitesPage } from "@/pages/RoomsAndSuitesPage";
import { MainLayout } from "@/layouts/MainLayout";
import { ErrorPage } from "@/pages/ErrorPage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import RoomDetailsPage from "@/pages/RoomDetailsPage";
import { FullMenuPage } from "@/pages/FullMenuPage";
import { AboutUsGaleryPage } from "@/pages/AboutUsGaleryPage";

// Configuración de rutas
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <InicioPage />,
        index: true,
      },
      {
        path: "about-us",
        element: <AboutUsPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "experiences",
        element: <ExperiencesPage />,
      },
      {
        path: "gastronomy",
        element: <GastronomyPage />,
      },
      {
        path: "rooms-and-suites",
        element: <RoomsAndSuitesPage />,
      },
      {
        path: "services",
        element: <ServicesPage />,
      },
      {
        path: "signin",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "roomsDetails",
        element: <RoomDetailsPage />,
      },
      {
        path: "fullMenu",
        element: <FullMenuPage />,
      },
      {
        path: "aboutUsGalery",
        element: <AboutUsGaleryPage />,
      },
    ],
  },
]);
