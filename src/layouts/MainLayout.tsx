import { Header } from "@/components/Header/Header";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Outlet />
      
    </div>
  );
};
