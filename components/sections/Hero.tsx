
import React, { useState, useEffect } from 'react';
import { Translation } from '../../types';
import { LocationIcon, ArrowRightIcon } from '../Icons';
import { THEME } from '../../theme';

const Hero: React.FC<{ t: Translation }> = ({ t }) => {
  const [displayText, setDisplayText] = useState('');
  const { typography, colors } = THEME;

  useEffect(() => {
    let i = 0;
    setDisplayText('');
    const timer = setInterval(() => {
      setDisplayText(t.title.slice(0, i));
      i++;
      if (i > t.title.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, [t.title]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="snap-start min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden bg-white dark:bg-[#1a1c22]">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 dark:opacity-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-zinc-200 dark:bg-zinc-800 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-zinc-100 dark:bg-zinc-700 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-6xl animate-fade-up">
        <span className={`${typography.label.size} ${typography.label.weight} ${typography.label.tracking} uppercase text-zinc-400 mb-8 block antialiased`}>
          {t.subtitle}
        </span>
        
        <h1 className={`${typography.heroTitle.size} ${typography.heroTitle.weight} ${typography.heroTitle.tracking} ${typography.heroTitle.leading} mb-12 text-brand-black dark:text-zinc-50`}>
          {displayText}
          <span className="typewriter-cursor"></span>
        </h1>

        <p className="max-w-2xl text-zinc-500 dark:text-zinc-400 mb-14 font-light text-lg md:text-xl leading-relaxed mx-auto antialiased">
          {t.description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-10 mb-16 text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">
           <div className="flex items-center gap-3">
             <LocationIcon className="w-4 h-4" />
             {t.location}
           </div>
           <div className="flex items-center gap-3">
             <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.accent }}></span>
             {t.status}
           </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <button 
            onClick={() => scrollToSection('work')}
            className="group px-10 py-5 bg-brand-black dark:bg-zinc-50 text-white dark:text-brand-black rounded-[18px] text-[11px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center gap-3 shadow-xl"
          >
            {t.viewWork}
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="px-10 py-5 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-[18px] text-[11px] font-black uppercase tracking-widest text-brand-black dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all hover:border-zinc-300 dark:hover:border-zinc-600"
          >
            {t.getInTouch}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
