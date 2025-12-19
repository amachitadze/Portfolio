
import React from 'react';
import { useApp } from '../store/AppContext';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';

const AdminLoginPage: React.FC = () => {
  const { isAdminAuthenticated, setAdminAuthenticated } = useApp();

  const handleLogin = (password: string) => {
    // სარეზერვო პაროლი 'admin123' იმ შემთხვევისთვის, თუ process.env.ADMIN_PASSWORD ვერ იკითხება
    const securePassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (password === securePassword) {
      setAdminAuthenticated(true);
    } else {
      alert('არასწორი პაროლი! (თუ Vercel ცვლადი არ მუშაობს, სცადეთ admin123)');
    }
  };

  if (isAdminAuthenticated) {
    return <AdminDashboard />;
  }

  return (
    <AdminLogin onLogin={handleLogin} />
  );
};

export default AdminLoginPage;
