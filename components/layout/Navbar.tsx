
import React, { useState, useEffect } from 'react';
import { useApp } from '../../store/AppContext';

const Navbar: React.FC = () => {
  const { setView } = useApp();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navbar ახლა მხოლოდ გამჭვირვალე ზოლია, რომელიც შეიძლება გამოვიყენოთ მომავალში
  // ან საერთოდ დავტოვოთ ცარიელი სტრუქტურა სქროლის ეფექტისთვის
  return (
    <nav className={`fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 md:py-6 flex items-center justify-between transition-all duration-500 ${scrolled ? 'glass-nav border-b border-zinc-100 dark:border-zinc-800/50 shadow-sm' : ''}`}>
      <div className="flex-1"></div>
      {/* Navbar-ის ელემენტები წაიშალა მომხმარებლის მოთხოვნით */}
    </nav>
  );
};

export default Navbar;
