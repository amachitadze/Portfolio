
import React from 'react';
import { Translation } from '../../types';
import { MailIcon, GithubIcon, LinkedInIcon } from '../Icons';
import { THEME } from '../../theme';

interface FooterProps {
  t: Translation;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  const { typography } = THEME;

  return (
    <footer id="contact" className="snap-start min-h-screen flex flex-col items-center justify-center px-6 relative bg-white dark:bg-zinc-950 overflow-hidden">
      {/* დეკორატიული ელემენტი */}
      <div className="absolute left-10 md:left-20 top-1/2 -translate-y-1/2 text-zinc-100 dark:text-zinc-900 pointer-events-none hidden lg:block opacity-60">
         <svg className="w-48 h-48 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
         </svg>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
        {/* სათაურის ზომა ახლა ზუსტად ემთხვევა Hero სექციას (typography.heroTitle.size) */}
        <h2 className={`${typography.heroTitle.size} ${typography.heroTitle.weight} ${typography.heroTitle.tracking} mb-12 text-brand-black dark:text-zinc-100 leading-[1.1] antialiased`}>
          {t.letsConnectTitle}
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-base md:text-lg mb-12 max-w-lg mx-auto font-light leading-relaxed antialiased">
          {t.letsConnectSubtitle}
        </p>
        <button 
          onClick={() => window.location.href = 'mailto:your@email.com'}
          className="px-10 py-5 bg-brand-black dark:bg-zinc-50 text-white dark:text-brand-black rounded-[18px] text-[11px] font-bold uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-2xl flex items-center gap-3 mx-auto border border-transparent dark:border-zinc-200"
        >
           <MailIcon className="w-4 h-4" />
           {t.connectButton}
        </button>
      </div>

      <div className="absolute bottom-12 w-full max-w-7xl px-8 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex gap-8 text-zinc-400 dark:text-zinc-600">
          <a href="#" className="hover:text-brand-black dark:hover:text-zinc-100 transition-colors duration-300">
            <GithubIcon />
          </a>
          <a href="#" className="hover:text-brand-black dark:hover:text-zinc-100 transition-colors duration-300">
             <LinkedInIcon />
          </a>
        </div>
        <p className="text-[9px] uppercase tracking-[0.5em] text-zinc-300 dark:text-zinc-800 font-black antialiased">
          © 2025 PORTFOLIO. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
