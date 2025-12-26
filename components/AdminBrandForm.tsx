
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
    <div className="space-y-20 pb-40 max-w-4xl mx-auto animate-in fade-in duration-500 font-sans">
      
      {/* 📋 Section 1: Brand Strategy */}
      <section className="space-y-12 bg-zinc-50 dark:bg-zinc-900/50 p-6 md:p-12 rounded-[32px] border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <header>
          <h2 className="text-2xl font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-100 mb-2">ბრენდის სტრატეგია</h2>
          <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">ბრენდის ფილოსოფია და არსი</p>
        </header>

        <div className="flex flex-col gap-10">
          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase text-zinc-400 tracking-widest block">1. ბრენდის სახელი</label>
            <RichTextEditor initialValue={data.strategy.brandName} onChange={val => updateStrategy('brandName', val)} className="h-32" />
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase text-zinc-400 tracking-widest block">2. ბრენდის სლოგანი</label>
            <RichTextEditor initialValue={data.strategy.slogan} onChange={val => updateStrategy('slogan', val)} className="h-32" />
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase text-zinc-400 tracking-widest block">3. ვინ არის ბრენდი</label>
            <RichTextEditor initialValue={data.strategy.whoIsBrand} onChange={val => updateStrategy('whoIsBrand', val)} className="h-48" />
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase text-zinc-400 tracking-widest block">4. ბრენდის მამოძრავებელი</label>
            <RichTextEditor initialValue={data.strategy.brandDriver} onChange={val => updateStrategy('brandDriver', val)} className="h-32" />
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase text-zinc-400 tracking-widest block">5. ბრენდის მისია</label>
            <RichTextEditor initialValue={data.strategy.brandMission} onChange={val => updateStrategy('brandMission', val)} className="h-48" />
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase text-zinc-400 tracking-widest block">6. ბრენდის ფასეულობები</label>
            <RichTextEditor initialValue={data.strategy.brandValues} onChange={val => updateStrategy('brandValues', val)} className="h-48" />
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase text-zinc-400 tracking-widest block">7. ბრენდის პერსონიფიკაცია</label>
            <RichTextEditor initialValue={data.strategy.brandPersonification} onChange={val => updateStrategy('brandPersonification', val)} className="h-48" />
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase text-zinc-400 tracking-widest block">8. ბრენდის ერთადერთობა</label>
            <RichTextEditor initialValue={data.strategy.brandUniqueness} onChange={val => updateStrategy('brandUniqueness', val)} className="h-32" />
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase text-zinc-400 tracking-widest block">9. ბრენდის კატეგორია</label>
            <RichTextEditor initialValue={data.strategy.brandCategory} onChange={val => updateStrategy('brandCategory', val)} className="h-32" />
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase text-zinc-400 tracking-widest block">10. ბრენდის არქეტიპი</label>
            <RichTextEditor initialValue={data.strategy.archetype} onChange={val => updateStrategy('archetype', val)} className="h-32" />
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase text-zinc-400 tracking-widest block">11. ბრენდის დაპირება</label>
            <RichTextEditor initialValue={data.strategy.brandPromise} onChange={val => updateStrategy('brandPromise', val)} className="h-40" />
          </div>
        </div>
      </section>

      {/* 📐 Section 2: Logos */}
      <section className="space-y-12 px-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-widest">ლოგოები</h2>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">ბრენდის ვიზუალური ნიშნები</p>
          </div>
          <button onClick={addLogo} className="px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg">+ ლოგოს დამატება</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.logos.map(logo => (
            <div key={logo.id} className="p-8 border border-zinc-100 dark:border-zinc-800 rounded-3xl bg-zinc-50 dark:bg-zinc-900/30 space-y-4 shadow-sm">
              <div className="flex gap-4">
                <div className="flex-1 space-y-3">
                   <input value={logo.title} onChange={e => updateLogo(logo.id, { title: e.target.value })} className="w-full bg-white dark:bg-zinc-900 p-4 rounded-xl outline-none text-sm font-bold border border-zinc-100 dark:border-zinc-800" placeholder="ლოგოს სათაური" />
                   <input value={logo.pngUrl} onChange={e => updateLogo(logo.id, { pngUrl: e.target.value })} className="w-full bg-white dark:bg-zinc-900 p-4 rounded-xl outline-none text-[10px] border border-zinc-100 dark:border-zinc-800" placeholder="PNG URL" />
                   <input value={logo.svgUrl} onChange={e => updateLogo(logo.id, { svgUrl: e.target.value })} className="w-full bg-white dark:bg-zinc-900 p-4 rounded-xl outline-none text-[10px] border border-zinc-100 dark:border-zinc-800" placeholder="SVG URL" />
                </div>
                {logo.pngUrl && (
                  <div className="w-24 h-24 bg-white rounded-2xl p-4 border flex items-center justify-center shadow-inner">
                    <img src={logo.pngUrl} className="max-w-full max-h-full object-contain" />
                  </div>
                )}
              </div>
              <button onClick={() => removeLogo(logo.id)} className="text-[10px] text-red-500 font-black uppercase tracking-widest hover:underline px-2">წაშლა</button>
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
      <section className="space-y-12 px-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-widest">ფერების პალიტრა</h2>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">ბრენდის კოლორისტიკა</p>
          </div>
          <button onClick={addColor} className="px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg">+ ფერის დამატება</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.colors?.map(color => (
            <div key={color.id} className="p-8 border border-zinc-100 dark:border-zinc-800 rounded-3xl flex flex-col gap-6 bg-white dark:bg-zinc-900/50 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-6">
                <input type="color" value={color.hex} onChange={e => updateColor(color.id, { hex: e.target.value })} className="w-16 h-16 rounded-2xl cursor-pointer bg-transparent border-none p-0 overflow-hidden shadow-sm" />
                <input placeholder="ფერის სახელი" value={color.name} onChange={e => updateColor(color.id, { name: e.target.value })} className="flex-1 bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl text-sm outline-none font-bold border border-zinc-100 dark:border-zinc-800" />
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

      {/* 🖋️ Section 4: Typography (Fonts) */}
      <section className="space-y-12 px-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-widest">ტიპოგრაფია</h2>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">შრიფტების სისტემა</p>
          </div>
          <button onClick={addFont} className="px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg">+ ფონტის დამატება</button>
        </div>
        <div className="space-y-6">
          {data.fonts.map(font => (
            <div key={font.id} className="p-8 border border-zinc-100 dark:border-zinc-800 rounded-3xl bg-white dark:bg-zinc-900/50 grid grid-cols-1 md:grid-cols-3 gap-6 items-end shadow-sm">
              <div className="space-y-2">
                <label className="text-[9px] uppercase font-black text-zinc-400 tracking-widest">ფონტის სახელი</label>
                <input value={font.name} onChange={e => updateFont(font.id, { name: e.target.value })} className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl outline-none text-sm font-bold border border-zinc-100 dark:border-zinc-800" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase font-black text-zinc-400 tracking-widest">ჩამოსატვირთი ლინკი</label>
                <input value={font.url} onChange={e => updateFont(font.id, { url: e.target.value })} className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl outline-none text-xs border border-zinc-100 dark:border-zinc-800" />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-2">
                  <label className="text-[9px] uppercase font-black text-zinc-400 tracking-widest">ნიმუში</label>
                  <input value={font.sampleText} onChange={e => updateFont(font.id, { sampleText: e.target.value })} className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl outline-none text-sm border border-zinc-100 dark:border-zinc-800" />
                </div>
                <button onClick={() => removeFont(font.id)} className="text-red-500 hover:text-red-700 p-3 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🌀 Section 5: Patterns */}
      <section className="space-y-12 px-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-widest">გრაფიკული ნიმუშები</h2>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Patterns & Texture</p>
          </div>
          <button onClick={() => patternInputRef.current?.click()} className="px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg">+ ატვირთვა</button>
          <input type="file" multiple ref={patternInputRef} onChange={handlePatternUpload} className="hidden" accept="image/*" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {data.patterns?.map(pattern => (
            <div key={pattern.id} className="relative group aspect-square rounded-[32px] overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm transition-all hover:shadow-xl">
              <img src={pattern.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={pattern.title} />
              <button onClick={() => removePattern(pattern.id)} className="absolute inset-0 bg-red-500/90 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center font-black text-[10px] uppercase tracking-widest transition-all backdrop-blur-sm">წაშლა</button>
            </div>
          ))}
        </div>
      </section>

      {/* 🚀 Save Action */}
      <div className="sticky bottom-10 z-50 px-6">
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="w-full py-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-[32px] font-black uppercase tracking-[0.25em] text-[12px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:scale-[1.02] active:scale-95 transition-all"
        >
          {isSaving ? 'ინახება...' : 'ცვლილებების შენახვა და დახურვა'}
        </button>
      </div>
    </div>
  );
};
export default AdminBrandForm;
