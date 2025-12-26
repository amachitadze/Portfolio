
import React from 'react';
import { useApp } from '../store/AppContext';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';

const AdminLoginPage: React.FC = () => {
  const { isAdminAuthenticated, setAdminAuthenticated } = useApp();

  const handleLogin = (password: string) => {
    // სტატიკური მიმართვა, რომ Vite-მა Build-ისას ჩაანაცვლოს
    // გასწორება: TypeScript-ის შეცდომა 'env' თვისებაზე ImportMeta-ში
    const securePassword = (import.meta as any).env.VITE_ADMIN_PASSWORD;
    
    if (securePassword && password === securePassword) {
      setAdminAuthenticated(true);
    } else {
      alert('ავტორიზაციის შეცდომა! შეამოწმეთ VITE_ADMIN_PASSWORD ვერსელში და გააკეთეთ Redeploy.');
    }
  };

  if (isAdminAuthenticated) {
    return <AdminDashboard />;
  }

  return <AdminLogin onLogin={handleLogin} />;
};

export default AdminLoginPage;