import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { AuthProvider } from "./modules/auth/context/AuthContext";


export const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <WhatsAppButton />
    </AuthProvider>
  );
};
