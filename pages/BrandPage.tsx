
import React, { useEffect } from 'react';
import { useApp } from '../store/AppContext';
import { SunIcon, MoonIcon, LinkIcon, DocumentIcon, ArrowRightIcon } from '../components/Icons';
import { TRANSLATIONS } from '../constants';
import { THEME } from '../theme';

const BrandPage: React.FC = () => {
  const { setView, isDark, toggleDark, lang, isAdminAuthenticated, brandData, galleryItems, setSelectedGalleryItem } = useApp();
  const t = TRANSLATIONS[lang];
  const { colors } = THEME;

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
    alert('Link copied!');
  };

  const onProfileClick = (item: any) => {
    setSelectedGalleryItem(item);
    setView('GALLERY_DETAIL');
  };

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `RGB(${r}, ${g}, ${b})`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans animate-in fade-in duration-700">
      
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between glass-nav">
        <button 
          onClick={() => setView(isAdminAuthenticated ? 'ADMIN' : 'SITE')}
          className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {isAdminAuthenticated ? 'ადმინ პანელი' : 'მთავარი'}
        </button>

        <div className="flex items-center gap-3">
          <button onClick={toggleDark} className="p-3 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-400">
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </nav>

      <header className="max-w-7xl mx-auto px-8 pt-40 pb-20 border-b border-zinc-100 dark:border-zinc-900">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 mb-6 block opacity-70">
          ბრენდის იდენტობა და სტრატეგია
        </span>
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 leading-none">
          {brandData.strategy.brandName || 'Brand Book.'}
        </h1>
        <p className="mt-10 text-xl md:text-2xl text-zinc-500 max-w-2xl font-light italic">
          "{brandData.strategy.slogan}"
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-24 space-y-40">
        
        {/* 📋 Essence Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6">ვინ არის ბრენდი</h2>
              <p className="text-2xl font-light leading-relaxed">{brandData.strategy.whoIsBrand}</p>
            </div>
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6">მისია და დაპირება</h2>
              <p className="text-lg text-zinc-500 leading-relaxed">{brandData.strategy.brandMission}</p>
              <div className="mt-6 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border-l-4 border-zinc-900 dark:border-white">
                <p className="font-bold italic">"{brandData.strategy.brandPromise}"</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <span className="text-[9px] font-black uppercase text-zinc-300">კატეგორია</span>
              <p className="font-bold">{brandData.strategy.brandCategory}</p>
            </div>
            <div className="space-y-2">
              <span className="text-[9px] font-black uppercase text-zinc-300">არქეტიპი</span>
              <p className="font-bold">{brandData.strategy.archetype}</p>
            </div>
            <div className="space-y-2">
              <span className="text-[9px] font-black uppercase text-zinc-300">მამოძრავებელი</span>
              <p className="font-bold">{brandData.strategy.brandDriver}</p>
            </div>
            <div className="space-y-2">
              <span className="text-[9px] font-black uppercase text-zinc-300">ერთადერთობა</span>
              <p className="font-bold">{brandData.strategy.brandUniqueness}</p>
            </div>
          </div>
        </section>

        {/* 🎨 Colors Section */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-16">ფერების სისტემა</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandData.colors?.map(color => (
              <div key={color.id} className="group">
                <div className="aspect-square rounded-[32px] mb-6 shadow-sm border border-zinc-100 dark:border-zinc-800 transition-transform group-hover:scale-[1.02]" style={{ backgroundColor: color.hex }} />
                <h3 className="font-bold mb-1">{color.name}</h3>
                <div className="text-[10px] font-mono uppercase text-zinc-400 space-y-1">
                  <p>{color.hex}</p>
                  <p>{hexToRgb(color.hex)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 📐 Logos & Rules */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-16">ვიზუალური იდენტობა და ლოგო</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {brandData.logos.map(logo => (
                <div key={logo.id} className="p-10 bg-zinc-50 dark:bg-zinc-900 rounded-[32px] flex items-center justify-center aspect-square relative group overflow-hidden">
                  <img src={logo.pngUrl || logo.svgUrl} className="max-w-[70%] max-h-[70%] object-contain group-hover:scale-110 transition-transform duration-700" alt={logo.title} />
                  <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <button onClick={() => copyToClipboard(logo.svgUrl)} className="flex-1 py-2 bg-white dark:bg-zinc-800 rounded-lg text-[8px] font-black uppercase">Copy SVG</button>
                    <button onClick={() => handleDownload(logo.pngUrl, 'logo.png')} className="flex-1 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg text-[8px] font-black uppercase">PNG</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-8">
              <h3 className="text-xl font-bold">გამოყენების წესები</h3>
              <p className="text-zinc-500 leading-relaxed whitespace-pre-line">{brandData.logoRules}</p>
              <div className="pt-8 border-t border-zinc-100 dark:border-zinc-900">
                <h3 className="text-[10px] font-black uppercase text-zinc-400 mb-6">ფასეულობები და პერსონა</h3>
                <p className="text-sm italic text-zinc-400 mb-4">{brandData.strategy.brandValues}</p>
                <p className="text-sm font-bold">{brandData.strategy.brandPersonification}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 👤 Profile/Lifestyle 9:16 Carousel */}
        {profileItems.length > 0 && (
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-16">ბრენდის ვიზუალური სტილი (9:16)</h2>
            <div className="flex gap-6 overflow-x-auto pb-10 snap-x no-scrollbar">
              {profileItems.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => onProfileClick(item)}
                  className="min-w-[200px] md:min-w-[280px] aspect-[9/16] rounded-[32px] overflow-hidden relative group cursor-pointer snap-center shadow-2xl"
                >
                  <img src={item.images[0]} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" alt={item.projectTitle} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <div className="text-white text-[10px] font-black uppercase tracking-widest">
                      {item.projectTitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 🌀 Patterns & Typography */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-20 pb-40">
           <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-12">ორნამენტული დიზაინი</h2>
              <div className="grid grid-cols-2 gap-4">
                {brandData.patterns?.map(p => (
                  <div key={p.id} className="aspect-square rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
                    <img src={p.imageUrl} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
                ))}
              </div>
           </div>
           <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-12">ტიპოგრაფია</h2>
              <div className="space-y-12">
                {brandData.fonts.map(font => (
                  <div key={font.id}>
                    <p className="text-4xl md:text-5xl mb-4" style={{ fontFamily: font.name }}>{font.name}</p>
                    <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{font.sampleText || 'Abcdefghijklmnopqrstuvwxyz 0123456789'}</p>
                    <a href={font.url} target="_blank" className="inline-flex items-center gap-2 text-[8px] font-black uppercase tracking-widest border-b border-zinc-900 dark:border-white pb-1">ჩამოტვირთვა <LinkIcon className="w-3 h-3" /></a>
                  </div>
                ))}
              </div>
           </div>
        </section>

      </main>

      <footer className="py-20 bg-zinc-50 dark:bg-zinc-900 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300">
          ბრენდის იდენტობის სახელმძღვანელო • 2025
        </p>
      </footer>
    </div>
  );
};

export default BrandPage;
