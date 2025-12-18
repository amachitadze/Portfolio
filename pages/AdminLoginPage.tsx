
import React from 'react';
import { useApp } from '../store/AppContext';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';

const AdminLoginPage: React.FC = () => {
  const { isAdminAuthenticated, setAdminAuthenticated } = useApp();

  const handleLogin = (password: string) => {
    const securePassword = process.env.ADMIN_PASSWORD;
    
    if (password === securePassword) {
      setAdminAuthenticated(true);
    } else {
      alert('არასწორი პაროლი!');
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
