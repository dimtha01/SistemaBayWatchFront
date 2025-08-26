import { LoginForm, LoginHero } from "@/modules/auth";

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <LoginHero />
      <main className="relative z-10">
        <LoginForm />
      </main>
    </div>
  );
};
