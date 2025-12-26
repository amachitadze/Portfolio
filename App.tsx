
import React from 'react';
import { AppProvider, useApp } from './store/AppContext';
import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AdminLoginPage from './pages/AdminLoginPage';
import GalleryPage from './pages/GalleryPage';
import GalleryDetailPage from './pages/GalleryDetailPage';
import BioPage from './pages/BioPage';
import BrandPage from './pages/BrandPage';

const Router: React.FC = () => {
  const { view } = useApp();

  switch (view) {
    case 'ADMIN':
      return <AdminLoginPage />;
    case 'DETAIL':
      return <ProjectDetailPage />;
    case 'GALLERY':
      return <GalleryPage />;
    case 'GALLERY_DETAIL':
      return <GalleryDetailPage />;
    case 'BIO':
      return <BioPage />;
    case 'BRAND':
      return <BrandPage />;
    default:
      return <HomePage />;
  }
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
};

export default App;
