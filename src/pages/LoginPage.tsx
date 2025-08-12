import { Header } from "../components/Header/Header";
import { LoginHero } from "../components/LoginHero/LoginHero";
import { LoginForm } from "../components/LoginForm/LoginForm";

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
