import { RegisterHero } from "../modules/auth/components/RegisterHero";
import { RegisterForm } from "../modules/auth/components/RegisterForm";

export const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <RegisterHero />
      <main className="relative z-10">
        <RegisterForm />
      </main>
    </div>
  );
};
