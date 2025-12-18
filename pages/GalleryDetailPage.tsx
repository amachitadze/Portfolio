
import React, { useEffect, useState } from 'react';
import { useApp } from '../store/AppContext';

const GalleryDetailPage: React.FC = () => {
  const { selectedGalleryItem, setView, setSelectedGalleryItem } = useApp();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    setSelectedGalleryItem(null);
    setView('GALLERY');
  };

  if (!selectedGalleryItem) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 animate-in fade-in duration-700">
      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in zoom-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div className="absolute inset-0 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-2xl" />
          <button 
            className="absolute top-8 right-8 z-[110] p-4 bg-zinc-100 dark:bg-zinc-900 rounded-full hover:scale-110 transition-transform"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-6 h-6 text-zinc-900 dark:text-zinc-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img 
            src={selectedImage} 
            className="relative z-[105] max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            alt="Full size view"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <button 
        onClick={handleBack}
        className="fixed top-8 left-8 z-50 px-6 py-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-100 dark:border-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
      >
        Back to Gallery
      </button>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-40">
        <header className="max-w-3xl mb-24">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6 block opacity-70">
            Work Process Detail — {selectedGalleryItem.period}
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 text-zinc-900 dark:text-zinc-50 leading-none">
            {selectedGalleryItem.projectTitle}
          </h1>
          <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed antialiased">
            {selectedGalleryItem.description}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {selectedGalleryItem.images.map((img, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedImage(img)}
              className={`rounded-[32px] overflow-hidden bg-zinc-50 dark:bg-zinc-900 border border-zinc-50 dark:border-zinc-900 cursor-zoom-in group ${idx % 3 === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-square'}`}
            >
              <img 
                src={img} 
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" 
                alt={`Process step ${idx + 1}`} 
              />
            </div>
          ))}
        </div>

        <div className="mt-32 pt-20 border-t border-zinc-100 dark:border-zinc-900 flex flex-col items-center">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300 dark:text-zinc-800 mb-8">
            END OF PROCESS RECORD
          </p>
          <button 
            onClick={handleBack}
            className="px-10 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-black text-[10px] uppercase tracking-widest"
          >
            Return to Gallery
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryDetailPage;
