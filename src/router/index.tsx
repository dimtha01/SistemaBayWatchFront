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
import { RegisterPage } from "@/pages/RegisterPage";
import RoomDetailsPage from "@/pages/RoomDetailsPage";
import { FullMenuPage } from "@/pages/FullMenuPage";
import { AboutUsGaleryPage } from "@/pages/AboutUsGaleryPage";
import { LoginPage } from "@/pages/LoginPage";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import { ExperienceDetailsPage } from "@/pages/ExperienceDetailsPage";
import { MainteincePage } from "@/pages/MainteincePage";
import { RoomsPage } from "@/pages/RoomsPage";
import { GestionLayout } from "@/layouts/GestionLayout"

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
        path: "roomsDetails/:id",
        element: <RoomDetailsPage />,
      },
      {
        path: "experiences/:id?", // Corregido typo + opcional
        element: <ExperienceDetailsPage />,
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
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
        index: true,
      },
      {
        path: "/dashboard/mantenimiento",
        element: <MainteincePage />,
      },
    ],
  },
  {
    path: "/Gestion",
    element: <GestionLayout/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/Gestion",
        element: <RoomsPage />,
        index: true,
      },
    ],
  },
]);
