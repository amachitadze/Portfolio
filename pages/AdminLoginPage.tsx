
import React from 'react';
import { useApp } from '../store/AppContext';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';
import { getEnv } from '../services/supabase';

const AdminLoginPage: React.FC = () => {
  const { isAdminAuthenticated, setAdminAuthenticated } = useApp();

  const handleLogin = (password: string) => {
    const securePassword = getEnv('ADMIN_PASSWORD');
    
    if (securePassword && password === securePassword) {
      setAdminAuthenticated(true);
    } else {
      console.error('Auth Error: Admin password not found or mismatch.');
      alert('ავტორიზაციის შეცდომა! დარწმუნდით, რომ Vercel-ში ცვლადს ჰქვია VITE_ADMIN_PASSWORD და გააკეთეთ Redeploy.');
    }
  };

  if (isAdminAuthenticated) {
    return <AdminDashboard />;
  }

  return <AdminLogin onLogin={handleLogin} />;
};

export default AdminLoginPage;
