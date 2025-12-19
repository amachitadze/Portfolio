
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
    <section className="snap-start min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 md:pt-0 relative overflow-hidden bg-white dark:bg-[#1a1c22]">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 dark:opacity-10">
        <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-zinc-200 dark:bg-zinc-800 rounded-full blur-[80px] md:blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-zinc-100 dark:bg-zinc-700 rounded-full blur-[70px] md:blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-6xl animate-fade-up px-2">
        <span className={`${typography.label.size} ${typography.label.weight} ${typography.label.tracking} uppercase text-zinc-400 mb-6 md:mb-8 block antialiased`}>
          {t.subtitle}
        </span>
        
        <h1 className={`${typography.heroTitle.size} ${typography.heroTitle.weight} ${typography.heroTitle.tracking} ${typography.heroTitle.leading} mb-8 md:mb-12 text-brand-black dark:text-zinc-50 break-words`}>
          {displayText}
          <span className="typewriter-cursor"></span>
        </h1>

        <p className="max-w-2xl text-zinc-500 dark:text-zinc-400 mb-10 md:mb-14 font-light text-base md:text-xl leading-relaxed mx-auto antialiased">
          {t.description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-12 md:mb-16 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-zinc-400">
           <div className="flex items-center gap-2 md:gap-3">
             <LocationIcon className="w-3.5 md:w-4 h-3.5 md:h-4" />
             {t.location}
           </div>
           <div className="flex items-center gap-2 md:gap-3">
             <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full" style={{ backgroundColor: colors.accent }}></span>
             {t.status}
           </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
          <button 
            onClick={() => scrollToSection('work')}
            className="group px-8 md:px-10 py-4 md:py-5 bg-brand-black dark:bg-zinc-50 text-white dark:text-brand-black rounded-[16px] md:rounded-[18px] text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-xl w-full sm:w-auto"
          >
            {t.viewWork}
            <ArrowRightIcon className="w-3.5 md:w-4 h-3.5 md:h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="px-8 md:px-10 py-4 md:py-5 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-[16px] md:rounded-[18px] text-[10px] md:text-[11px] font-black uppercase tracking-widest text-brand-black dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all w-full sm:w-auto"
          >
            {t.getInTouch}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
