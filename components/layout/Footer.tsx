
import React, { useState } from 'react';
import { Translation } from '../../types';
import { MailIcon, GithubIcon, LinkedInIcon, GlobeIcon, SunIcon, MoonIcon } from '../Icons';
import { THEME } from '../../theme';
import { useApp } from '../../store/AppContext';
import { LANGUAGES } from '../../constants';

interface FooterProps {
  t: Translation;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  const { typography } = THEME;
  const { lang, setLang, isDark, toggleDark } = useApp();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  return (
    <footer id="contact" className="snap-start min-h-screen flex flex-col items-center justify-center px-6 relative bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="absolute left-10 md:left-20 top-1/2 -translate-y-1/2 text-zinc-100 dark:text-zinc-900 pointer-events-none hidden xl:block opacity-60">
         <svg className="w-48 h-48 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
         </svg>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
        <h2 className={`text-4xl sm:text-6xl md:text-8xl lg:text-[110px] ${typography.heroTitle.weight} ${typography.heroTitle.tracking} mb-8 md:mb-12 text-brand-black dark:text-zinc-100 leading-[1.1] antialiased`}>
          {t.letsConnectTitle}
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-base md:text-xl mb-10 md:mb-12 max-w-lg mx-auto font-light leading-relaxed antialiased">
          {t.letsConnectSubtitle}
        </p>
        
        <div className="flex flex-col items-center gap-8">
          <button 
            onClick={() => window.location.href = 'mailto:your@email.com'}
            className="px-8 md:px-10 py-4 md:py-5 bg-brand-black dark:bg-zinc-50 text-white dark:text-brand-black rounded-[16px] md:rounded-[18px] text-[10px] md:text-[11px] font-bold uppercase tracking-wide hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-2xl flex items-center gap-3 border border-transparent dark:border-zinc-200"
          >
             <MailIcon className="w-4 h-4" />
             {t.connectButton}
          </button>

          <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900/50 p-2 rounded-full border border-zinc-100 dark:border-zinc-800">
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-wide text-zinc-500 hover:text-brand-black dark:hover:text-white transition-all"
              >
                <GlobeIcon className="w-3.5 h-3.5" />
                {lang}
              </button>

              {isLangMenuOpen && (
                <div className="absolute bottom-full mb-3 right-0 w-32 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden py-2">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setLang(l);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 text-[10px] font-black tracking-wide uppercase transition-colors ${lang === l ? 'text-brand-black dark:text-white bg-zinc-50 dark:bg-zinc-800/50' : 'text-zinc-400 hover:text-brand-black dark:hover:text-white'}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800"></div>

            <button onClick={toggleDark} className="p-2 text-zinc-500 hover:text-brand-black dark:hover:text-white transition-all">
              {isDark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 md:bottom-12 w-full max-w-7xl px-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
        <div className="flex gap-8 text-zinc-400 dark:text-zinc-600">
          <a href="#" className="hover:text-brand-black dark:hover:text-zinc-100 transition-colors duration-300">
            <GithubIcon className="w-5 md:w-6 h-5 md:h-6" />
          </a>
          <a href="#" className="hover:text-brand-black dark:hover:text-zinc-100 transition-colors duration-300">
             <LinkedInIcon className="w-5 md:w-6 h-5 md:h-6" />
          </a>
        </div>
        <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-zinc-300 dark:text-zinc-800 font-black antialiased text-center">
          © 2025 PORTFOLIO. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
