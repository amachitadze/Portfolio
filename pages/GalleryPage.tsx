
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import AuthGate from '../components/AuthGate';

const GalleryPage: React.FC = () => {
  const { galleryItems, setView, isGalleryAuthenticated, setGalleryAuthenticated, setSelectedGalleryItem, isLoading } = useApp();
  const [columns, setColumns] = useState<1 | 2>(2);
  
  const handleAuth = (password: string) => {
    // Direct access to environment variable for gallery authentication
    const securePassword = process.env.GALLERY_PASSWORD;
    
    if (password === securePassword && securePassword) { 
      setGalleryAuthenticated(true);
    } else {
      alert('არასწორი პაროლი!');
    }
  };

  const handleItemClick = (item: any) => {
    setSelectedGalleryItem(item);
    setView('GALLERY_DETAIL');
  };

  if (!isGalleryAuthenticated) {
    return (
      <AuthGate 
        title="Work Gallery"
        subtitle="Private Collection"
        onSuccess={handleAuth}
        onBack={() => setView('SITE')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0c0d0f] p-6 md:p-12 lg:p-20">
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
        <div>
          <h2 className="text-[11px] font-black tracking-[0.4em] uppercase text-zinc-400 mb-6 opacity-60">04 — Work Process Gallery</h2>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-zinc-900 dark:text-zinc-50">Behind the Scenes</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-2xl">
            <button onClick={() => setColumns(1)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${columns === 1 ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-400'}`}>1 Col</button>
            <button onClick={() => setColumns(2)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${columns === 2 ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-400'}`}>2 Col</button>
          </div>
          <button onClick={() => setView('SITE')} className="px-8 py-3.5 bg-zinc-50 dark:bg-zinc-900 rounded-full border border-zinc-100 dark:border-zinc-800 font-bold text-[10px] uppercase tracking-widest hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">Home</button>
        </div>
      </header>

      {isLoading ? (
        <div className="flex justify-center py-40">
           <div className="w-10 h-10 border-4 border-zinc-100 border-t-zinc-900 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className={`max-w-7xl mx-auto grid gap-x-12 gap-y-24 pb-40 ${columns === 1 ? 'grid-cols-1 max-w-4xl' : 'grid-cols-1 lg:grid-cols-2'}`}>
          {galleryItems.map(item => (
            <div key={item.id} className="group animate-in fade-in slide-in-from-bottom-8 duration-1000 cursor-pointer" onClick={() => handleItemClick(item)}>
              <div className={`aspect-[16/10] bg-zinc-50 dark:bg-zinc-900 rounded-[32px] overflow-hidden mb-10 relative border border-zinc-50 dark:border-zinc-900`}>
                <img src={item.images[0]} className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out" alt={item.projectTitle} />
                <div className="absolute top-8 right-8 px-4 py-2 bg-black/20 backdrop-blur-xl rounded-full text-[10px] font-black text-white border border-white/20 uppercase tracking-widest">
                  {item.images.length} Photos
                </div>
              </div>
              <div className="px-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">{item.projectTitle}</h3>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300 dark:text-zinc-700 pt-2">{item.period}</span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg font-light leading-relaxed max-w-2xl line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
          {galleryItems.length === 0 && (
            <div className="col-span-full py-32 text-center">
              <p className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-200">No entries yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
