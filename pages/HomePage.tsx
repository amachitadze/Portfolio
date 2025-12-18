
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import ProjectGrid from '../components/sections/ProjectGrid';
import { useApp } from '../store/AppContext';
import { TRANSLATIONS } from '../constants';

const HomePage: React.FC = () => {
  const { lang, setView } = useApp();
  const t = TRANSLATIONS[lang];

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth relative transition-colors duration-700">
      <Navbar />
      <main className="relative z-10">
        <Hero t={t} />
        <About t={t} />
        <ProjectGrid t={t} />
        <Footer t={t} />
        
        {/* ფარული ღილაკი ადმინისთვის */}
        <div 
          onClick={() => setView('ADMIN')}
          className="fixed bottom-0 left-0 w-8 h-8 opacity-0 cursor-default z-50 hover:opacity-10 bg-zinc-400"
        />
      </main>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vh] rounded-full bg-zinc-50 dark:bg-zinc-900/10 blur-[120px] opacity-40"></div>
      </div>
    </div>
  );
};

export default HomePage;
