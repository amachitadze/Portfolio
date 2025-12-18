
import React from 'react';
import { useApp } from '../store/AppContext';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';

const AdminLoginPage: React.FC = () => {
  const { isAdminAuthenticated, setAdminAuthenticated } = useApp();

  const handleLogin = (password: string) => {
    // პირდაპირი მიმართვა სტატიკური ჩანაცვლებისთვის
    const securePassword = typeof process !== 'undefined' ? process.env.ADMIN_PASSWORD : '';
    
    if (password === securePassword && securePassword !== '') {
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
