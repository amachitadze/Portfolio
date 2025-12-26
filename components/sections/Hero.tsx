
import React, { useState, useEffect } from 'react';
import { Translation } from '../../types';
import { LocationIcon, ArrowRightIcon } from '../Icons';
import { THEME } from '../../theme';

/**
 * ⚙️ რეჟიმის გადამრთველი:
 * true - ტექსტი იქნება ანიმირებული (ბეჭდვის ეფექტით)
 * false - ტექსტი იქნება სტატიკური (ურყევი)
 * 
 * ეს ხაზი ფაილის დასაწყისშია.
 */
const USE_ANIMATION = false; 

const Hero: React.FC<{ t: Translation }> = ({ t }) => {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const { typography, colors } = THEME;

  useEffect(() => {
    if (!USE_ANIMATION) {
      setDisplayText(t.titles[0]);
      return;
    }

    const currentFullText = t.titles[phraseIndex % t.titles.length];
    const handleTyping = () => {
      if (!isDeleting) {
        const nextText = currentFullText.slice(0, displayText.length + 1);
        setDisplayText(nextText);
        if (displayText === currentFullText) {
          setTimeout(() => setIsDeleting(true), 3000);
          return;
        }
      } else {
        const nextText = currentFullText.slice(0, displayText.length - 1);
        setDisplayText(nextText);
        if (displayText === '') {
          setIsDeleting(false);
          setPhraseIndex((prev) => prev + 1);
          return;
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? 30 : 60);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, t.titles]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="snap-start min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden bg-white dark:bg-zinc-950">
      <div className="relative z-10 max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* ზედა წარწერა - 'typography.label' სტილებით theme.ts-დან */}
        <span className={`${typography.label.size} ${typography.label.weight} ${typography.label.tracking} uppercase text-zinc-400 mb-8 block antialiased`}>
          {t.subtitle}
        </span>
        
        {/* მთავარი სათაური - 'typography.heroTitle' სტილებით theme.ts-დან */}
        <h1 
          className={`${typography.heroTitle.size} ${typography.heroTitle.weight} ${typography.heroTitle.tracking} ${typography.heroTitle.leading} mb-12 min-h-[1.1em]`}
          style={{ color: colors.black }}
        >
          {displayText}
          {USE_ANIMATION && (
            <span className="typewriter-cursor" style={{ backgroundColor: colors.accent }}></span>
          )}
        </h1>

        {/* აღწერა - ფონტის ზომა მორგებულია */}
        <p className="max-w-2xl text-zinc-500 dark:text-zinc-500 mb-14 text-base md:text-lg font-light leading-relaxed mx-auto antialiased">
          {t.description}
        </p>

        {/* მდებარეობა და სტატუსი */}
        <div className="flex flex-wrap items-center justify-center gap-10 mb-16 text-[10px] font-bold uppercase tracking-normal text-zinc-300">
           <div className="flex items-center gap-2.5">
             <LocationIcon className="w-3.5 h-3.5" /> {t.location}
           </div>
           <div className="flex items-center gap-2.5">
             <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.accent }}></span>
             {t.status}
           </div>
        </div>

        {/* ღილაკები */}
        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <button 
            onClick={() => scrollToSection('work')}
            className="group px-9 py-4 text-white rounded-[16px] text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-lg"
            style={{ backgroundColor: colors.black }}
          >
            {t.viewWork}
            <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="px-9 py-4 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-[16px] text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900"
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
