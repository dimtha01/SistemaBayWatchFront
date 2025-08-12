import { Header } from "../components/Header/Header";
import { RegisterHero } from "../components/RegisterHero/RegisterHero";
import { RegisterForm } from "../components/RegisterForm/RegisterForm";

export const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <RegisterHero />
      <main className="relative z-10">
        <RegisterForm />
      </main>
    </div>
  );
};
