
import React from 'react';
import { useApp } from '../store/AppContext';
import AuthGate from './AuthGate';

interface AdminLoginProps {
  onLogin: (password: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const { setView } = useApp();

  return (
    <AuthGate 
      title="Admin Access"
      subtitle="Control Center"
      onSuccess={onLogin}
      onBack={() => setView('SITE')}
    />
  );
};

export default AdminLogin;
