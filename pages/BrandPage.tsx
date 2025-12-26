
import React, { useState, useEffect } from 'react';
import { useApp } from '../store/AppContext';
import { GlobeIcon, SunIcon, MoonIcon, LinkIcon, DocumentIcon, ArrowRightIcon } from '../components/Icons';
import { TRANSLATIONS, LANGUAGES } from '../constants';
import { THEME } from '../theme';

const BrandPage: React.FC = () => {
  const { setView, isDark, toggleDark, lang, isAdminAuthenticated, brandData, galleryItems, setSelectedGalleryItem } = useApp();
  const t = TRANSLATIONS[lang];
  const { colors } = THEME;

  // Noindex metadata for privacy
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  // Filter gallery items with 'profile' tag
  const profileItems = galleryItems.filter(item => item.tags?.includes('profile'));

  const handleDownload = (url: string, filename: string) => {
    if (!url) return;
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = (url: string) => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  const onProfileClick = (item: any) => {
    setSelectedGalleryItem(item);
    setView('GALLERY_DETAIL');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans animate-in fade-in duration-700">
      
      {/* 🧭 Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between glass-nav">
        <button 
          onClick={() => setView(isAdminAuthenticated ? 'ADMIN' : 'SITE')}
          className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {isAdminAuthenticated ? 'Back to Admin' : 'Back Home'}
        </button>

        <div className="flex items-center gap-3">
          <button onClick={toggleDark} className="p-3 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-400">
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </nav>

      <header className="max-w-7xl mx-auto px-8 pt-40 pb-20 border-b border-zinc-100 dark:border-zinc-900">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 mb-6 block opacity-70">
          Visual Identity System & Strategy
        </span>
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 leading-none">
          Brand Book.
        </h1>
        <p className="mt-10 text-xl md:text-2xl text-zinc-500 max-w-2xl font-light leading-relaxed">
          ეს არის ჩემი პერსონალური ბრენდის სრული ვიზუალური და სტრატეგიული სტანდარტები.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-24 space-y-40">
        
        {/* 📐 Strategy Section */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-16">01 — Strategy & Manual</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Archetype</span>
              <p className="text-2xl font-bold">{brandData.strategy.archetype || 'Not defined'}</p>
            </div>
            <div className="md:col-span-2 space-y-12">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Purpose</span>
                <p className="text-lg text-zinc-500 leading-relaxed mt-4">{brandData.strategy.purpose || 'Not defined'}</p>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Brand Goal</span>
                <p className="text-lg text-zinc-500 leading-relaxed mt-4">{brandData.strategy.goal || 'Not defined'}</p>
              </div>
              {brandData.strategy.detailedManualUrl && (
                <a 
                  href={brandData.strategy.detailedManualUrl} 
                  target="_blank" 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl text-[10px] font-black uppercase tracking-widest"
                >
                  <DocumentIcon className="w-4 h-4" /> View Detailed Manual
                </a>
              )}
            </div>
          </div>
        </section>

        {/* 📐 Logos Section */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-16">02 — Logos & Marks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {brandData.logos.map((logo) => (
              <div key={logo.id} className="group flex flex-col h-full">
                <div className="aspect-square rounded-[32px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center p-12 mb-8 relative overflow-hidden">
                  <img src={logo.pngUrl || logo.svgUrl} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700" alt={logo.title} />
                </div>
                <h3 className="text-xl font-bold mb-2">{logo.title}</h3>
                <p className="text-sm text-zinc-400 mb-8 leading-relaxed flex-grow">{logo.description}</p>
                
                <div className="space-y-3">
                  {/* PNG Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => handleDownload(logo.pngUrl, `${logo.title}.png`)} className="px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-[8px] font-black uppercase flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all">
                      PNG Download
                    </button>
                    <button onClick={() => copyToClipboard(logo.pngUrl)} className="px-4 py-3 border border-zinc-100 dark:border-zinc-800 rounded-xl text-[8px] font-black uppercase flex items-center justify-center gap-2 hover:bg-zinc-50 transition-all">
                      PNG Link
                    </button>
                  </div>
                  {/* SVG Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => handleDownload(logo.svgUrl, `${logo.title}.svg`)} className="px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-[8px] font-black uppercase flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all">
                      SVG Download
                    </button>
                    <button onClick={() => copyToClipboard(logo.svgUrl)} className="px-4 py-3 border border-zinc-100 dark:border-zinc-800 rounded-xl text-[8px] font-black uppercase flex items-center justify-center gap-2 hover:bg-zinc-50 transition-all">
                      SVG Link
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 👤 Profile/Lifestyle Section */}
        {profileItems.length > 0 && (
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-16">03 — Profile & Lifestyle</h2>
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
              {profileItems.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => onProfileClick(item)}
                  className="min-w-[300px] md:min-w-[450px] aspect-[16/10] rounded-[32px] overflow-hidden relative group cursor-pointer snap-center"
                >
                  <img src={item.images[0]} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" alt={item.projectTitle} />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                      View Process <ArrowRightIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ✍️ Typography Section */}
        <section className="pb-40">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-16">04 — Typography</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {brandData.fonts.map(font => (
              <div key={font.id} className="p-8 bg-zinc-50 dark:bg-zinc-900 rounded-[32px] border border-zinc-100 dark:border-zinc-800 flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-bold mb-6">{font.name}</h3>
                  <p className="text-zinc-400 font-light text-xl mb-10 leading-snug">
                    {font.sampleText || 'The quick brown fox jumps over the lazy dog. 0123456789'}
                  </p>
                </div>
                <a href={font.url} target="_blank" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white border-b-2 border-zinc-900 dark:border-white w-fit pb-1">
                  Download Font <LinkIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </section>

      </main>

      <footer className="py-20 bg-zinc-50 dark:bg-zinc-900 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300">
          © 2025 BRAND IDENTITY GUIDELINES • PRIVATE DOCUMENT
        </p>
      </footer>
    </div>
  );
};

export default BrandPage;
