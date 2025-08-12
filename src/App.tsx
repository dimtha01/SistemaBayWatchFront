import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { WhatsAppButton } from "./components/WhatsAppButton";

export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <WhatsAppButton />
    </>
  );
};
