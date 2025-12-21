
import React, { useState, useEffect } from 'react';
import { Translation } from '../../types';
import { LocationIcon, ArrowRightIcon } from '../Icons';
import { THEME } from '../../theme';

/**
 * ⚙️ კონფიგურაცია
 * USE_ANIMATION: true - ჩართავს ბეჭდვის ეფექტს
 * USE_ANIMATION: false - ტექსტი იქნება სტატიკური (მხოლოდ პირველი ფრაზა)
 */
const USE_ANIMATION = false; 

const TYPEWRITER_CONFIG = {
  typingSpeed: 60,
  deletingSpeed: 30,
  pauseBeforeDelete: 3000,
  pauseBeforeNext: 800
};

const Hero: React.FC<{ t: Translation }> = ({ t }) => {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const { typography, colors } = THEME;

  useEffect(() => {
    // თუ ანიმაცია გამორთულია, პირდაპირ ვაყენებთ პირველ სათაურს
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
          setTimeout(() => setIsDeleting(true), TYPEWRITER_CONFIG.pauseBeforeDelete);
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

    let currentSpeed = isDeleting ? TYPEWRITER_CONFIG.deletingSpeed : TYPEWRITER_CONFIG.typingSpeed;
    if (!isDeleting && displayText === '') currentSpeed = TYPEWRITER_CONFIG.pauseBeforeNext;

    const timer = setTimeout(handleTyping, currentSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, t.titles]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="snap-start min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden bg-white dark:bg-zinc-950">
      <div className="relative z-10 max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* ზედა მცირე წარწერა - დახვეწილი დაშორებით */}
        <span className={`${typography.label.size} ${typography.label.weight} ${typography.label.tracking} uppercase text-zinc-400 mb-8 block antialiased`}>
          {t.subtitle}
        </span>
        
        {/* მთავარი სათაური */}
        <h1 
          className={`${typography.heroTitle.size} ${typography.heroTitle.weight} ${typography.heroTitle.tracking} ${typography.heroTitle.leading} mb-12 min-h-[1.1em] transition-colors`}
          style={{ color: colors.black }}
        >
          {displayText}
          {USE_ANIMATION && (
            <span className="typewriter-cursor" style={{ backgroundColor: colors.accent }}></span>
          )}
        </h1>

        {/* აღწერა */}
        <p className="max-w-2xl text-zinc-400 dark:text-zinc-500 mb-14 text-base md:text-lg font-light leading-relaxed mx-auto antialiased">
          {t.description}
        </p>

        {/* სტატუსი და მდებარეობა - შემცირებული tracking */}
        <div className="flex flex-wrap items-center justify-center gap-10 mb-16 text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-300">
           <div className="flex items-center gap-2.5">
             <LocationIcon className="w-3.5 h-3.5" /> {t.location}
           </div>
           <div className="flex items-center gap-2.5">
             <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.accent }}></span>
             {t.status}
           </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <button 
            onClick={() => scrollToSection('work')}
            className="group px-9 py-4 text-white rounded-[16px] text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-lg"
            style={{ backgroundColor: colors.black }}
          >
            {t.viewWork}
            <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="px-9 py-4 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-[16px] text-[10px] font-black uppercase tracking-widest transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900"
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
