import React, { useState, useEffect } from 'react';
import { Translation } from '../types';
import { LocationIcon, ArrowRightIcon } from './Icons';
import { THEME } from '../theme';

interface HeroProps {
  t: Translation;
}

const Hero: React.FC<HeroProps> = ({ t }) => {
  const [displayText, setDisplayText] = useState('');
  const fullText = t.title;

  useEffect(() => {
    let i = 0;
    setDisplayText('');
    const timer = setInterval(() => {
      setDisplayText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 60);
    return () => clearInterval(timer);
  }, [fullText, t.title]);

  return (
    <section className="snap-start min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 max-w-5xl">
        <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-zinc-400 mb-6 block">
          {t.subtitle}
        </span>
        
        <h1 className="text-5xl md:text-8xl font-black mb-10 tracking-[-0.04em] text-brand-black dark:text-zinc-50 leading-[1.1]">
          {displayText}
          <span className="typewriter-cursor"></span>
        </h1>

        <p className="max-w-xl text-base md:text-lg text-zinc-400 dark:text-zinc-500 mb-12 leading-relaxed font-light mx-auto">
          {t.description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 mb-12 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
           <div className="flex items-center gap-2">
             <LocationIcon />
             {t.location}
           </div>
           <div className="flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: THEME.colors.accent }}></span>
             {t.status}
           </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button 
            className="px-8 py-4 bg-zinc-100 dark:bg-zinc-800 text-brand-black dark:text-zinc-100 rounded-[14px] text-sm font-medium transition-all hover:brightness-95 active:scale-95 flex items-center gap-2"
          >
            {t.viewWork}
            <ArrowRightIcon className="w-4 h-4" />
          </button>
          <button 
            className="px-8 py-4 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-[14px] text-sm font-medium text-brand-black dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
          >
            {t.getInTouch}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;