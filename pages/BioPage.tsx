
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

/**
 * ⚙️ BIO გვერდის კონფიგურაცია
 */
const BIO_STYLING = {
  socialGap: 'gap-7',         // დაშორება სოციალურ იკონებს შორის
  socialIconSize: 'w-5 h-5',  // იკონების ზომა
  buttonRadius: 'rounded-[20px]', // ღილაკების მომრგვალება
  avatarSizeDesktop: 'md:w-32 md:h-32', // სურათის ზომა დესკტოპზე
  avatarSizeMobile: 'w-24 h-24', // სურათის ზომა მობილურზე
};

const BioPage: React.FC = () => {
  const { setView, isDark, toggleDark, lang, setLang } = useApp();
  const t = TRANSLATIONS[lang];
  const { colors } = THEME;
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  // 🔘 ბმულები იკონებით (Bento სტილი: ტექსტი მარცხნივ, იკონი მარჯვნივ)
  const links = [
    { title: t.bioLinkPortfolio, type: 'internal', view: 'SITE' as const, icon: <LinkIcon className="w-4 h-4" /> },
    { title: t.bioLinkDribbble, type: 'external', url: 'https://substack.com', icon: <SubstackIcon className="w-4 h-4" /> },
    { title: t.bioLinkInstagram, type: 'external', url: 'https://avma.ge/resume', icon: <DocumentIcon className="w-4 h-4" /> },
    { title: t.bioLinkLastProject, type: 'external', url: 'https://calendly.com', icon: <CalendarIcon className="w-4 h-4" /> },
  ];

  const socials = [
    { id: 'linkedin', icon: <LinkedInIcon className={BIO_STYLING.socialIconSize} />, url: 'https://linkedin.com' },
    { id: 'instagram', icon: <InstagramIcon className={BIO_STYLING.socialIconSize} />, url: 'https://instagram.com' },
    { id: 'threads', icon: <ThreadsIcon className={BIO_STYLING.socialIconSize} />, url: 'https://threads.net' },
    { id: 'behance', icon: <BehanceIcon className={BIO_STYLING.socialIconSize} />, url: 'https://behance.net/avmachitadze' },
    { id: 'telegram', icon: <TelegramIcon className={BIO_STYLING.socialIconSize} />, url: 'https://t.me' },
    { id: 'mail', icon: <MailIcon className={BIO_STYLING.socialIconSize} />, url: 'mailto:avto@avma.ge' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center py-16 px-6 md:px-12 animate-in fade-in duration-700 font-sans">
      
      {/* 🏠 უკან დაბრუნება */}
      <button 
        onClick={() => setView('SITE')}
        className="fixed top-8 left-8 p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all z-50 group shadow-sm"
      >
        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>

      {/* 🛠️ მენიუ: ენა და თემა */}
      <div className="fixed top-8 right-8 z-50 flex items-center gap-3 bg-white/80 dark:bg-zinc-900/80 p-2 rounded-full border border-zinc-200 dark:border-zinc-800 backdrop-blur-md shadow-sm">
        <div className="relative">
          <button 
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all"
          >
            <GlobeIcon className="w-3.5 h-3.5" />
            {lang}
          </button>
          {isLangMenuOpen && (
            <div className="absolute top-full mt-3 right-0 w-32 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden py-2">
              {LANGUAGES.map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l);
                    setIsLangMenuOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3 text-[10px] font-black tracking-wide uppercase transition-colors ${lang === l ? 'text-zinc-900 bg-zinc-50 dark:bg-zinc-800/50' : 'text-zinc-400'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800"></div>
        <button onClick={toggleDark} className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all">
          {isDark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
        </button>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 items-start pt-10 md:pt-0">
        
        {/* ⬅️ მარცხენა სვეტი */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left pr-0 md:pr-10">
          {/* სურათი ჩრდილის გარეშე */}
          <div className={`${BIO_STYLING.avatarSizeMobile} ${BIO_STYLING.avatarSizeDesktop} rounded-full overflow-hidden mb-10 border border-zinc-200 dark:border-zinc-800 shadow-none`}>
            <img 
              src="https://i.postimg.cc/zXY8GJw6/1.jpg" 
              alt={t.bioName} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* სახელი და გვარი - დინამიური ზომით და break-words-ით გადაფარვის თავიდან ასაცილებლად */}
          <h1 className="text-[clamp(1.5rem,7vw,3.25rem)] font-black tracking-tighter mb-4 leading-[1.1] break-words max-w-full" style={{ color: colors.black }}>
            {t.bioName}
          </h1>
          
          <p className="text-[14px] font-medium text-zinc-400 dark:text-zinc-500 mb-12 max-w-[320px] leading-relaxed tracking-tight antialiased">
            {t.bioRole}
          </p>

          <div className={`flex flex-wrap justify-center md:justify-start ${BIO_STYLING.socialGap}`}>
            {socials.map((soc) => (
              <a 
                key={soc.id} 
                href={soc.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-white transition-all hover:scale-125 p-1"
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ➡️ მარჯვენა სვეტი: Bento სტილის ღილაკები */}
        <div className="w-full space-y-4 pt-2">
          {links.map((link, i) => (
            <button
              key={i}
              onClick={() => {
                if (link.type === 'internal') {
                  setView(link.view);
                } else {
                  window.open(link.url, '_blank');
                }
              }}
              className={`w-full py-5 px-8 ${BIO_STYLING.buttonRadius} bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/50 text-[14px] font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 transition-all duration-300 active:scale-[0.98] flex items-center justify-between group shadow-sm`}
            >
              <span className="tracking-tight">{link.title}</span>
              <div className="text-zinc-400 dark:text-zinc-600 group-hover:text-white dark:group-hover:text-zinc-900 transition-colors">
                {link.icon}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-8 text-[8px] font-bold uppercase tracking-[0.5em] text-zinc-300 dark:text-zinc-800 pointer-events-none">
        © 2025 PORTFOLIO • AVTO MA
      </div>
    </div>
  );
};

export default BioPage;
