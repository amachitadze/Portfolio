import React, { useState } from 'react';
import { Language } from '../types';
import { LANGUAGES } from '../constants';
import { GlobeIcon, SunIcon, MoonIcon } from './Icons';

interface NavbarProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
  isDark: boolean;
  toggleDark: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentLang, onLangChange, isDark, toggleDark }) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  return (
    <nav className="fixed top-8 right-8 z-50 flex items-center gap-4">
      <div className="relative">
        <button 
          onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 dark:bg-zinc-900/10 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-full text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all hover:scale-105"
        >
          <GlobeIcon />
          {currentLang}
        </button>

        {isLangMenuOpen && (
          <div className="absolute right-0 mt-3 w-32 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden py-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  onLangChange(lang);
                  setIsLangMenuOpen(false);
                }}
                className={`w-full text-left px-5 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-colors ${currentLang === lang ? 'text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-800/50' : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
              >
                {lang}
              </button>
            ))}
          </div>
        )}
      </div>

      <button 
        onClick={toggleDark}
        className="p-2.5 bg-white/10 dark:bg-zinc-900/10 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all hover:scale-110 active:scale-95 shadow-sm"
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
    </nav>
  );
};

export default Navbar;