import { Header } from "@/components/Header/Header";
import { Outlet } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ScrollToTop />
      <Header />
      <Outlet />
      
    </div>
  );
};