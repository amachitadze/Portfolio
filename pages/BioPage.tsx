
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { 
  LinkedInIcon, MailIcon, GlobeIcon, 
  SunIcon, MoonIcon, InstagramIcon, TelegramIcon, 
  ThreadsIcon, BehanceIcon, DribbbleIcon,
  SubstackIcon, DocumentIcon, CalendarIcon, LinkIcon
} from '../components/Icons';
import { THEME } from '../theme';
import { TRANSLATIONS, LANGUAGES } from '../constants';

const BioPage: React.FC = () => {
  const { setView, isDark, toggleDark, lang, setLang, brandData } = useApp();
  const t = TRANSLATIONS[lang];
  const { colors } = THEME;
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  // იკონების რუკა
  const iconMap: Record<string, React.ReactNode> = {
    instagram: <InstagramIcon className="w-5 h-5" />,
    linkedin: <LinkedInIcon className="w-5 h-5" />,
    behance: <BehanceIcon className="w-5 h-5" />,
    dribbble: <DribbbleIcon className="w-5 h-5" />,
    mail: <MailIcon className="w-5 h-5" />,
    telegram: <TelegramIcon className="w-5 h-5" />,
    substack: <SubstackIcon className="w-5 h-5" />,
    document: <DocumentIcon className="w-5 h-5" />,
    calendar: <CalendarIcon className="w-5 h-5" />,
    link: <LinkIcon className="w-5 h-5" />,
    portfolio: <GlobeIcon className="w-5 h-5" />,
    threads: <ThreadsIcon className="w-5 h-5" />
  };

  const getIcon = (name: string) => iconMap[name] || iconMap.link;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center py-16 px-6 md:px-12 animate-in fade-in duration-700">
      
      {/* 🔙 BACK */}
      <button 
        onClick={() => setView('SITE')}
        className="fixed top-8 left-8 p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all z-50 group shadow-sm hover:scale-105"
      >
        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>

      {/* 🌍 NAV */}
      <div className="fixed top-8 right-8 z-50 flex items-center gap-3 bg-white/80 dark:bg-zinc-900/80 p-2 rounded-full border border-zinc-200 dark:border-zinc-800 backdrop-blur-md shadow-sm">
        <div className="relative">
          <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all">
            <GlobeIcon className="w-3.5 h-3.5" />
            {lang}
          </button>
          {isLangMenuOpen && (
            <div className="absolute top-full mt-3 right-0 w-32 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden py-2 animate-in slide-in-from-top-2">
              {LANGUAGES.map((l) => (
                <button key={l} onClick={() => { setLang(l); setIsLangMenuOpen(false); }} className={`w-full text-left px-5 py-3 text-[10px] font-black tracking-wide uppercase transition-colors ${lang === l ? 'text-zinc-900 bg-zinc-50 dark:bg-zinc-800/50' : 'text-zinc-400'}`}>{l}</button>
              ))}
            </div>
          )}
        </div>
        <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800"></div>
        <button onClick={toggleDark} className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all hover:scale-110">
          {isDark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
        </button>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-40 items-start pt-10 md:pt-0">
        
        {/* 👤 LEFT: PROFILE */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left pr-0 md:pr-10">
          <div className="w-32 h-32 md:w-44 md:h-44 rounded-[54px] overflow-hidden mb-12 border border-zinc-100 dark:border-zinc-800 shadow-2xl group">
            <img src="https://i.postimg.cc/zXY8GJw6/1.jpg" alt={brandData.bio.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
          </div>

          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 leading-[1.05] text-zinc-900 dark:text-zinc-50">
            {brandData.bio.name || 'ავთანდილ მაჩიტაძე'}
          </h1>
          
          <p className="text-base md:text-lg font-medium text-zinc-400 dark:text-zinc-500 mb-14 max-w-[360px] leading-relaxed tracking-tight antialiased">
            {brandData.bio.role || 'ციფრული პროდუქტების დანერგვისა და განვითარების კონსულტანტი'}
          </p>
          
          {/* 📱 SOCIALS (LEFT SIDE ICONS) */}
          <div className="flex flex-wrap justify-center md:justify-start gap-7">
            {brandData.bio.socials?.map((social) => (
              <a 
                key={social.id} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-300 dark:text-zinc-700 hover:text-zinc-900 dark:hover:text-white transition-all transform hover:scale-125"
              >
                {getIcon(social.icon)}
              </a>
            ))}
            {(!brandData.bio.socials || brandData.bio.socials.length === 0) && (
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-100 dark:text-zinc-900 pointer-events-none">
                PERSONAL BRAND SPACE
              </span>
            )}
          </div>
        </div>

        {/* 🔗 RIGHT: BENTO LINKS */}
        <div className="w-full space-y-4 pt-4">
          {brandData.bio.links?.map((link) => (
            <button
              key={link.id}
              onClick={() => window.open(link.url, '_blank')}
              className="w-full py-7 px-10 rounded-[28px] bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/50 text-base font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 transition-all duration-300 active:scale-[0.98] flex items-center justify-between group shadow-[0_4px_12px_rgba(0,0,0,0.02)]"
            >
              <div className="flex items-center gap-5">
                <div className="text-zinc-300 dark:text-zinc-600 group-hover:text-brand-accent transition-colors">
                  {getIcon(link.icon)}
                </div>
                <span className="tracking-tight">{link.title}</span>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </button>
          ))}
          {(!brandData.bio.links || brandData.bio.links.length === 0) && (
            <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-zinc-100 dark:border-zinc-900 rounded-[40px] animate-pulse">
              <p className="text-zinc-200 dark:text-zinc-800 text-[10px] font-black uppercase tracking-widest">ბმულები ჯერ არ არის დამატებული</p>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-8 text-[8px] font-black uppercase tracking-[0.5em] text-zinc-200 dark:text-zinc-800 pointer-events-none">
        © 2025 PORTFOLIO • {brandData.bio.name?.toUpperCase() || 'AVTO MA'}
      </div>
    </div>
  );
};

export default BioPage;
