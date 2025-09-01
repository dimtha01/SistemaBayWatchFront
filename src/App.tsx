import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthProvider } from "./modules/auth/context/AuthContext";


export const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
