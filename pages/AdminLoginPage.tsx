
import React from 'react';
import { useApp } from '../store/AppContext';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';

const AdminLoginPage: React.FC = () => {
  const { isAdminAuthenticated, setAdminAuthenticated } = useApp();

  const handleLogin = (password: string) => {
    // ვიყენებთ მხოლოდ Vercel-ში გაწერილ პაროლს. 
    // ჰარდკოდირებული 'admin123' წაშლილია უსაფრთხოებისთვის.
    const securePassword = process.env.ADMIN_PASSWORD;
    
    if (securePassword && password === securePassword) {
      setAdminAuthenticated(true);
    } else {
      alert('არასწორი პაროლი! გთხოვთ შეამოწმოთ ADMIN_PASSWORD ცვლადი Vercel-ის პანელში.');
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
