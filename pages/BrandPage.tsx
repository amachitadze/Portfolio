
import React, { useEffect, useState } from 'react';
import { useApp } from '../store/AppContext';
import { SunIcon, MoonIcon, LinkIcon, DocumentIcon, ArrowRightIcon } from '../components/Icons';
import { TRANSLATIONS } from '../constants';
import { THEME } from '../theme';

// ColorCard კომპონენტის პროპსების ტიპების განსაზღვრა
interface ColorCardProps {
  color: any;
}

// ColorCard კომპონენტი, რომელიც იყენებს React.FC-ს 'key' პროპსის მხარდასაჭერად
const ColorCard: React.FC<ColorCardProps> = ({ color }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `RGB(${r}, ${g}, ${b})`;
  };

  const hexToCss = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, 1)`;
  };

  const hexToHsl = (hex: string) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return `HSL ${Math.round(h * 360)} ${Math.round(s * 100)} ${Math.round(l * 100)} / 100%`;
  };

  return (
    <div className="group font-sans">
      <div className="aspect-square rounded-[32px] mb-6 shadow-sm border border-zinc-100 dark:border-zinc-800 transition-transform group-hover:scale-[1.02]" style={{ backgroundColor: color.hex }} />
      <h3 className="font-bold mb-2 text-lg">{color.name}</h3>
      
      <div className="space-y-1.5 mb-4">
        <div className="flex justify-between text-[10px] font-mono text-zinc-400">
          <span>HEX</span> <span>{color.hex.toUpperCase()}</span>
        </div>
        <div className="flex justify-between text-[10px] font-mono text-zinc-400">
          <span>RGB</span> <span>{hexToRgb(color.hex)}</span>
        </div>
        <div className="flex justify-between text-[10px] font-mono text-zinc-400">
          <span>CSS</span> <span>{hexToCss(color.hex)}</span>
        </div>
        <div className="flex justify-between text-[10px] font-mono text-zinc-400">
          <span>HSL</span> <span>{hexToHsl(color.hex)}</span>
        </div>
      </div>

      <div className="relative">
        <div 
          className={`text-xs text-zinc-500 leading-relaxed prose prose-sm dark:prose-invert ${!isExpanded ? 'line-clamp-2' : ''}`}
          dangerouslySetInnerHTML={{ __html: color.description }}
        />
        {color.description?.length > 100 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="text-[10px] font-black text-zinc-900 dark:text-zinc-100 uppercase mt-2 hover:underline tracking-widest"
          >
            {isExpanded ? 'ნაკლების ნახვა' : 'დეტალურად'}
          </button>
        )}
      </div>
    </div>
  );
};

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

  const profileItems = galleryItems.filter(item => item.tags?.includes('profile'));

  const handleDownload = async (url: string, filename: string) => {
    if (!url) return;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (e) {
      window.open(url, '_blank');
    }
  };

  const copyToClipboard = (url: string) => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    alert('ლინკი კოპირებულია!');
  };

  const onProfileClick = (item: any) => {
    setSelectedGalleryItem(item);
    setView('GALLERY_DETAIL');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans animate-in fade-in duration-700">
      
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between glass-nav">
        <button 
          onClick={() => setView(isAdminAuthenticated ? 'ADMIN' : 'SITE')}
          className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
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
        <p className="mt-10 text-xl md:text-2xl text-zinc-500 max-w-2xl font-light italic antialiased">
          "{brandData.strategy.slogan}"
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-24 space-y-40">
        
        {/* 📋 Essence Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6 opacity-60">ვინ არის ბრენდი</h2>
              <div 
                className="text-2xl font-light leading-relaxed prose prose-xl dark:prose-invert max-w-none antialiased"
                dangerouslySetInnerHTML={{ __html: brandData.strategy.whoIsBrand }}
              />
            </div>
            <div className="grid grid-cols-2 gap-8 py-10 border-y border-zinc-100 dark:border-zinc-900">
              <div className="space-y-2">
                <span className="text-[9px] font-black uppercase text-zinc-300 tracking-widest">არქეტიპი</span>
                <p className="text-xl font-bold">{brandData.strategy.archetype}</p>
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-black uppercase text-zinc-300 tracking-widest">პერსონა</span>
                <p className="text-xl font-bold">{brandData.strategy.brandPersonification}</p>
              </div>
            </div>
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6 opacity-60">მისია და დაპირება</h2>
              <div 
                className="text-lg text-zinc-500 leading-relaxed prose prose-lg dark:prose-invert max-w-none antialiased"
                dangerouslySetInnerHTML={{ __html: brandData.strategy.brandMission }}
              />
              <div className="mt-10 p-10 bg-zinc-50 dark:bg-zinc-900 rounded-[32px] border-l-8 border-zinc-900 dark:border-white shadow-sm">
                <div 
                  className="font-bold italic prose dark:prose-invert max-w-none text-lg"
                  dangerouslySetInnerHTML={{ __html: brandData.strategy.brandPromise }}
                />
              </div>
            </div>
          </div>
          <div className="space-y-12">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <span className="text-[9px] font-black uppercase text-zinc-300 tracking-widest">კატეგორია</span>
                <p className="text-xl font-bold">{brandData.strategy.brandCategory}</p>
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-black uppercase text-zinc-300 tracking-widest">მამოძრავებელი</span>
                <p className="text-xl font-bold">{brandData.strategy.brandDriver}</p>
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-black uppercase text-zinc-300 tracking-widest">ერთადერთობა</span>
                <p className="text-xl font-bold">{brandData.strategy.brandUniqueness}</p>
              </div>
            </div>
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6 opacity-60">ფასეულობები</h2>
              <div 
                className="text-lg text-zinc-500 leading-relaxed prose prose-lg dark:prose-invert max-w-none antialiased"
                dangerouslySetInnerHTML={{ __html: brandData.strategy.brandValues }}
              />
            </div>
          </div>
        </section>

        {/* 🎨 Colors Section */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-16 opacity-60">ფერების სისტემა</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
            {brandData.colors?.map(color => (
              <ColorCard key={color.id} color={color} />
            ))}
          </div>
        </section>

        {/* 📐 Logos & Rules */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-16 opacity-60">ვიზუალური იდენტობა და ლოგო</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {brandData.logos.map(logo => (
                <div key={logo.id} className="p-10 bg-zinc-50 dark:bg-zinc-900 rounded-[32px] flex items-center justify-center aspect-square relative group overflow-hidden border border-zinc-50 dark:border-zinc-900 shadow-sm transition-all duration-500">
                  <img src={logo.pngUrl || logo.svgUrl} className="max-w-[70%] max-h-[70%] object-contain group-hover:scale-110 transition-transform duration-700" alt={logo.title} />
                  
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleDownload(logo.pngUrl, 'logo.png')} className="px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">PNG Download</button>
                      <button onClick={() => copyToClipboard(logo.pngUrl)} className="px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">PNG Copy</button>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleDownload(logo.svgUrl, 'logo.svg')} className="px-5 py-2.5 bg-white text-zinc-900 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all">SVG Download</button>
                      <button onClick={() => copyToClipboard(logo.svgUrl)} className="px-5 py-2.5 bg-white text-zinc-900 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all">SVG Copy</button>
                    </div>
                  </div>
                  <div className="absolute top-8 left-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-300">
                    {logo.title}
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-8">
              <h3 className="text-2xl font-black uppercase tracking-tight">გამოყენების წესები</h3>
              <div 
                className="text-zinc-500 leading-relaxed prose dark:prose-invert max-w-none antialiased"
                dangerouslySetInnerHTML={{ __html: brandData.logoRules }}
              />
            </div>
          </div>
        </section>

        {/* 👤 Profile/Lifestyle 9:16 Carousel */}
        {profileItems.length > 0 && (
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-16 opacity-60">ბრენდის ვიზუალური სტილი</h2>
            <div className="flex gap-6 overflow-x-auto pb-10 snap-x no-scrollbar">
              {profileItems.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => onProfileClick(item)}
                  className="h-[380px] w-auto aspect-[9/16] rounded-[32px] overflow-hidden relative group cursor-pointer snap-center shadow-2xl flex-shrink-0"
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
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-12 opacity-60">ორნამენტული დიზაინი</h2>
              <div className="grid grid-cols-2 gap-4">
                {brandData.patterns?.map(p => (
                  <div key={p.id} className="aspect-square rounded-[32px] overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm">
                    <img src={p.imageUrl} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
                ))}
              </div>
           </div>
           <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-12 opacity-60">ტიპოგრაფია</h2>
              <div className="space-y-16">
                {brandData.fonts.map(font => (
                  <div key={font.id} className="group">
                    <p className="text-5xl md:text-7xl mb-6 tracking-tight leading-none antialiased group-hover:tracking-tighter transition-all duration-500" style={{ fontFamily: "'Google Sans', sans-serif" }}>{font.name}</p>
                    <p className="text-zinc-400 text-lg mb-8 leading-relaxed font-light">{font.sampleText || 'Abcdefghijklmnopqrstuvwxyz 0123456789'}</p>
                    <a href={font.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border-b-2 border-zinc-900 dark:border-white pb-1.5 transition-all hover:gap-4">ჩამოტვირთვა <LinkIcon className="w-4 h-4" /></a>
                  </div>
                ))}
              </div>
           </div>
        </section>

      </main>

      <footer className="py-20 bg-zinc-50 dark:bg-zinc-900 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300 antialiased">
          ბრენდის იდენტობის სახელმძღვანელო • 2025
        </p>
      </footer>
    </div>
  );
};

export default BrandPage;
