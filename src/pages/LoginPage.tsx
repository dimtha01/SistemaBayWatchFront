import { LoginForm, LoginHero } from "@/modules/auth";
import { Header } from "../components/Header/Header";

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <LoginHero />
      <main className="relative z-10">
        <LoginForm />
      </main>
    </div>
  );
};
