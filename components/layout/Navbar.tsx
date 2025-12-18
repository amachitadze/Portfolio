
import React, { useState, useEffect } from 'react';
import { useApp } from '../../store/AppContext';
import { LANGUAGES } from '../../constants';
import { GlobeIcon, SunIcon, MoonIcon } from '../Icons';

const Navbar: React.FC = () => {
  const { lang, setLang, isDark, toggleDark, setView } = useApp();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between transition-all duration-500 ${scrolled ? 'glass-nav py-4 border-b border-zinc-100 dark:border-zinc-800/50' : ''}`}>
      <div 
        onClick={() => setView('SITE')} 
        className="text-[12px] font-black tracking-[0.4em] uppercase cursor-pointer hover:opacity-70 transition-opacity"
      >
        Portfolio
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => setView('GALLERY')}
          className="px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg active:scale-95"
        >
          Work Process
        </button>

        <div className="relative">
          <button 
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-brand-black dark:hover:text-white transition-all"
          >
            <GlobeIcon className="w-3.5 h-3.5" />
            {lang}
          </button>

          {isLangMenuOpen && (
            <div className="absolute right-0 mt-3 w-32 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
              {LANGUAGES.map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l);
                    setIsLangMenuOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3 text-[10px] font-black tracking-widest uppercase transition-colors ${lang === l ? 'text-brand-black dark:text-white bg-zinc-50 dark:bg-zinc-800/50' : 'text-zinc-400 hover:text-brand-black dark:hover:text-white'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          )}
        </div>

        <button onClick={toggleDark} className="p-2.5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-full text-zinc-500 hover:text-brand-black dark:hover:text-white transition-all active:scale-90">
          {isDark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
