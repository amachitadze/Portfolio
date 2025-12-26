
import React, { useState, useEffect } from 'react';
import { Translation } from '../../types';
import { LocationIcon, ArrowRightIcon } from '../Icons';
import { THEME } from '../../theme';

const Hero: React.FC<{ t: Translation }> = ({ t }) => {
  const [displayText, setDisplayText] = useState('');
  const { typography, colors, spacing } = THEME;

  useEffect(() => {
    setDisplayText(t.titles[0]);
  }, [t.titles]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="snap-start min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden bg-white dark:bg-zinc-950">
      <div className="relative z-10 max-w-6xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        <span className={`${typography.label.size} ${typography.label.weight} ${typography.label.tracking} uppercase text-zinc-400 ${spacing.elementMargin} block antialiased`}>
          {t.subtitle}
        </span>
        
        <h1 
          className={`${typography.heroTitle.size} ${typography.heroTitle.weight} ${typography.heroTitle.tracking} ${typography.heroTitle.leading} ${spacing.elementMargin} antialiased`}
          style={{ color: colors.black }}
        >
          {displayText}
        </h1>

        <p className="max-w-2xl text-zinc-500 dark:text-zinc-400 mb-16 text-lg md:text-xl font-light leading-relaxed mx-auto antialiased">
          {t.description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-12 mb-20 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-200">
           <div className="flex items-center gap-3">
             <LocationIcon className="w-4 h-4" /> {t.location}
           </div>
           <div className="flex items-center gap-3">
             <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.accent }}></span>
             {t.status}
           </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button 
            onClick={() => scrollToSection('work')}
            className="group px-10 py-5 text-white rounded-[22px] text-[11px] font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-2xl"
            style={{ backgroundColor: colors.black }}
          >
            {t.viewWork}
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="px-10 py-5 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-[22px] text-[11px] font-bold uppercase tracking-widest transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900"
            style={{ color: colors.black }}
          >
            {t.getInTouch}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
