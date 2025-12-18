import React from 'react';
import { Translation } from '../types';
import { MailIcon, GithubIcon, LinkedInIcon } from './Icons';

interface FooterProps {
  t: Translation;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="snap-start min-h-screen flex flex-col items-center justify-center px-6 relative bg-white dark:bg-zinc-950 overflow-hidden">
      {/* Decorative arrow flourishes from screen */}
      <div className="absolute left-20 top-1/2 -translate-y-1/2 text-zinc-200 dark:text-zinc-800 pointer-events-none hidden xl:block opacity-40">
         <svg className="w-32 h-32 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
         </svg>
      </div>
      <div className="absolute right-20 top-1/2 -translate-y-1/2 text-zinc-200 dark:text-zinc-800 pointer-events-none hidden xl:block opacity-40">
         <svg className="w-32 h-32 rotate-[135deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
         </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-6xl md:text-9xl font-black mb-10 tracking-tighter text-brand-black dark:text-zinc-100 leading-[1]">
          {t.letsConnectTitle}
        </h2>
        <p className="text-zinc-400 dark:text-zinc-500 text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
          {t.letsConnectSubtitle}
        </p>
        <button className="px-10 py-5 bg-brand-black dark:bg-zinc-50 text-white dark:text-brand-black rounded-[18px] text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-3 mx-auto">
           <MailIcon className="w-4 h-4" />
           {t.connectButton}
        </button>
      </div>

      <div className="absolute bottom-16 w-full max-w-7xl px-8 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex gap-10 text-zinc-300 dark:text-zinc-700">
          <a href="#" className="hover:text-brand-black dark:hover:text-zinc-100 transition-colors">
            <GithubIcon className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-brand-black dark:hover:text-zinc-100 transition-colors">
             <LinkedInIcon className="w-6 h-6" />
          </a>
        </div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-300 dark:text-zinc-700 font-bold">
          © 2025 PORTFOLIO. MADE WITH CARE.
        </p>
      </div>
    </footer>
  );
};

export default Footer;