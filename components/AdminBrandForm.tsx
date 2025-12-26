
import React, { useState, useRef } from 'react';
import { useApp } from '../store/AppContext';
import { BrandData, LogoAsset, FontAsset, BrandColor, BrandPattern } from '../types';
import RichTextEditor from './RichTextEditor';

interface AdminBrandFormProps {
  onClose?: () => void;
}

const AdminBrandForm: React.FC<AdminBrandFormProps> = ({ onClose }) => {
  const { brandData, saveBrandData } = useApp();
  const [data, setData] = useState<BrandData>(brandData);
  const [isSaving, setIsSaving] = useState(false);
  
  const patternInputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    setIsSaving(true);
    await saveBrandData(data);
    setIsSaving(false);
    if (onClose) onClose();
  };

  const uploadToImgBB = async (file: File) => {
    const key = (import.meta as any).env?.VITE_IMGBB_API_KEY;
    if (!key) return null;
    const uploadData = new FormData();
    uploadData.append('image', file);
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
        method: 'POST',
        body: uploadData,
      });
      const res = await response.json();
      return res.success ? res.data.url : null;
    } catch (err) {
      return null;
    }
  };

  const updateStrategy = (key: keyof typeof data.strategy, value: string) => {
    setData({ ...data, strategy: { ...data.strategy, [key]: value } });
  };

  const addLogo = () => {
    const newLogo: LogoAsset = { id: Date.now().toString(), title: '', description: '', pngUrl: '', svgUrl: '' };
    setData({ ...data, logos: [...(data.logos || []), newLogo] });
  };

  const updateLogo = (id: string, updates: Partial<LogoAsset>) => {
    setData({ ...data, logos: data.logos.map(l => l.id === id ? { ...l, ...updates } : l) });
  };

  const removeLogo = (id: string) => {
    setData({ ...data, logos: data.logos.filter(l => l.id !== id) });
  };

  const addFont = () => {
    const newFont: FontAsset = { id: Date.now().toString(), name: '', url: '', sampleText: '' };
    setData({ ...data, fonts: [...(data.fonts || []), newFont] });
  };

  const updateFont = (id: string, updates: Partial<FontAsset>) => {
    setData({ ...data, fonts: data.fonts.map(f => f.id === id ? { ...f, ...updates } : f) });
  };

  const removeFont = (id: string) => {
    setData({ ...data, fonts: data.fonts.filter(f => f.id !== id) });
  };

  const addColor = () => {
    const newColor: BrandColor = { id: Date.now().toString(), name: 'ახალი ფერი', hex: '#000000', description: '' };
    setData({ ...data, colors: [...(data.colors || []), newColor] });
  };

  const updateColor = (id: string, updates: Partial<BrandColor>) => {
    setData({ ...data, colors: data.colors.map(c => c.id === id ? { ...c, ...updates } : c) });
  };

  const handlePatternUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      const url = await uploadToImgBB(files[i]);
      if (url) {
        const newPattern: BrandPattern = { id: (Date.now() + i).toString(), title: files[i].name, imageUrl: url };
        setData(prev => ({ ...prev, patterns: [...(prev.patterns || []), newPattern] }));
      }
    }
  };

  const removePattern = (id: string) => {
    setData({ ...data, patterns: data.patterns.filter(p => p.id !== id) });
  };

  return (
    <div className="space-y-12 md:space-y-20 pb-40 max-w-4xl mx-auto animate-in fade-in duration-500 font-sans">
      
      {/* 📋 Section 1: Brand Strategy */}
      <section className="space-y-8 md:space-y-12 bg-zinc-50 dark:bg-zinc-900/50 p-4 md:p-12 rounded-[24px] md:rounded-[32px] border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <header>
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-100 mb-2">ბრენდის სტრატეგია</h2>
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">ბრენდის ფილოსოფია და არსი</p>
        </header>

        <div className="flex flex-col gap-8 md:gap-10">
          {[
            { label: '1. ბრენდის სახელი', key: 'brandName' },
            { label: '2. ბრენდის სლოგანი', key: 'slogan' },
            { label: '3. ვინ არის ბრენდი', key: 'whoIsBrand', h: 'h-48' },
            { label: '4. ბრენდის მამოძრავებელი', key: 'brandDriver' },
            { label: '5. ბრენდის მისია', key: 'brandMission', h: 'h-48' },
            { label: '6. ბრენდის ფასეულობები', key: 'brandValues', h: 'h-48' },
            { label: '7. ბრენდის პერსონიფიკაცია', key: 'brandPersonification', h: 'h-48' },
            { label: '8. ბრენდის ერთადერთობა', key: 'brandUniqueness' },
            { label: '9. ბრენდის კატეგორია', key: 'brandCategory' },
            { label: '10. ბრენდის არქეტიპი', key: 'archetype' },
            { label: '11. ბრენდის დაპირება', key: 'brandPromise', h: 'h-40' }
          ].map(field => (
            <div key={field.key} className="space-y-3">
              <label className="text-[11px] font-black uppercase text-zinc-400 tracking-widest block">{field.label}</label>
              <RichTextEditor initialValue={(data.strategy as any)[field.key]} onChange={val => updateStrategy(field.key as any, val)} className={field.h || 'h-32'} />
            </div>
          ))}
        </div>
      </section>

      {/* 📐 Section 2: Logos */}
      <section className="space-y-8 md:space-y-12 px-2 md:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest">ლოგოები</h2>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">ბრენდის ვიზუალური ნიშნები</p>
          </div>
          <button onClick={addLogo} className="w-full sm:w-auto px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg">+ ლოგოს დამატება</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {data.logos.map(logo => (
            <div key={logo.id} className="p-6 md:p-8 border border-zinc-100 dark:border-zinc-800 rounded-[24px] md:rounded-3xl bg-zinc-50 dark:bg-zinc-900/30 space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 space-y-3">
                   <input value={logo.title} onChange={e => updateLogo(logo.id, { title: e.target.value })} className="w-full bg-white dark:bg-zinc-900 p-4 rounded-xl outline-none text-sm font-bold border border-zinc-100 dark:border-zinc-800" placeholder="ლოგოს სათაური" />
                   <input value={logo.pngUrl} onChange={e => updateLogo(logo.id, { pngUrl: e.target.value })} className="w-full bg-white dark:bg-zinc-900 p-4 rounded-xl outline-none text-[10px] border border-zinc-100 dark:border-zinc-800" placeholder="PNG URL" />
                   <input value={logo.svgUrl} onChange={e => updateLogo(logo.id, { svgUrl: e.target.value })} className="w-full bg-white dark:bg-zinc-900 p-4 rounded-xl outline-none text-[10px] border border-zinc-100 dark:border-zinc-800" placeholder="SVG URL" />
                </div>
                {logo.pngUrl && (
                  <div className="w-full sm:w-24 h-24 bg-white rounded-2xl p-4 border flex items-center justify-center shadow-inner shrink-0">
                    <img src={logo.pngUrl} className="max-w-full max-h-full object-contain" />
                  </div>
                )}
              </div>
              <button onClick={() => removeLogo(logo.id)} className="text-[10px] text-red-500 font-black uppercase tracking-widest hover:underline pt-2">წაშლა</button>
            </div>
          ))}
        </div>
        <div className="space-y-4 pt-6">
          <label className="text-[11px] font-black uppercase text-zinc-400 tracking-widest block">ლოგოს გამოყენების წესები</label>
          <RichTextEditor 
            initialValue={data.logoRules}
            onChange={val => setData({...data, logoRules: val})}
            className="h-60"
          />
        </div>
      </section>

      {/* 🎨 Section 3: Colors */}
      <section className="space-y-8 md:space-y-12 px-2 md:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest">ფერების პალიტრა</h2>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">ბრენდის კოლორისტიკა</p>
          </div>
          <button onClick={addColor} className="w-full sm:w-auto px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg">+ ფერის დამატება</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {data.colors?.map(color => (
            <div key={color.id} className="p-6 md:p-8 border border-zinc-100 dark:border-zinc-800 rounded-[24px] md:rounded-3xl flex flex-col gap-6 bg-white dark:bg-zinc-900/50 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-4 md:gap-6">
                <input type="color" value={color.hex} onChange={e => updateColor(color.id, { hex: e.target.value })} className="w-12 h-12 md:w-16 md:h-16 rounded-xl cursor-pointer bg-transparent border-none p-0 overflow-hidden shadow-sm shrink-0" />
                <input placeholder="ფერის სახელი" value={color.name} onChange={e => updateColor(color.id, { name: e.target.value })} className="flex-1 bg-zinc-50 dark:bg-zinc-800 p-3 md:p-4 rounded-xl text-sm outline-none font-bold border border-zinc-100 dark:border-zinc-800 min-w-0" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">აღწერა</label>
                <RichTextEditor 
                  initialValue={color.description}
                  onChange={val => updateColor(color.id, { description: val })}
                  className="h-32"
                />
              </div>
              <button onClick={() => setData({ ...data, colors: data.colors.filter(c => c.id !== color.id) })} className="text-[10px] text-red-500 font-black uppercase tracking-widest hover:underline self-end">წაშლა</button>
            </div>
          ))}
        </div>
      </section>

      {/* 🚀 Save Action */}
      <div className="sticky bottom-6 md:bottom-10 z-50 px-4 md:px-6">
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="w-full py-5 md:py-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-[20px] md:rounded-[32px] font-black uppercase tracking-[0.25em] text-[10px] md:text-[12px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:scale-[1.02] active:scale-95 transition-all"
        >
          {isSaving ? 'ინახება...' : 'ცვლილებების შენახვა და დახურვა'}
        </button>
      </div>
    </div>
  );
};
export default AdminBrandForm;
