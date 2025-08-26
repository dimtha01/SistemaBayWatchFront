import { useState } from 'react';
import { LoginForm, LoginHero } from "@/modules/auth";
import Alert from "@/components/Alert/Alert";

export const LoginPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState({
    icon: 'success' as 'success' | 'error' | 'warning' | 'info' | 'question',
    title: '',
    text: '',
  });

  const handleShowAlert = (icon: 'success' | 'error' | 'warning' | 'info' | 'question', title: string, text: string) => {
    setAlertProps({ icon, title, text });
    setShowAlert(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LoginHero />
      <main className="relative z-10">
        <LoginForm onLoginResult={handleShowAlert} />
      </main>
      {showAlert && <Alert {...alertProps} />}
    </div>
  );
};
