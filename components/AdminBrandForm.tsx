
import React, { useState, useRef } from 'react';
import { useApp } from '../store/AppContext';
import { BrandData, LogoAsset, FontAsset, BrandColor, BrandPattern } from '../types';

interface AdminBrandFormProps {
  onClose?: () => void;
}

const AdminBrandForm: React.FC<AdminBrandFormProps> = ({ onClose }) => {
  const { brandData, saveBrandData } = useApp();
  const [data, setData] = useState<BrandData>(brandData);
  const [isSaving, setIsSaving] = useState(false);
  
  const logoInputRef = useRef<HTMLInputElement>(null);
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

  // --- Logos Management ---
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

  // --- Fonts Management ---
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

  // --- Colors Management ---
  const addColor = () => {
    const newColor: BrandColor = { id: Date.now().toString(), name: 'ახალი ფერი', hex: '#000000', description: '' };
    setData({ ...data, colors: [...(data.colors || []), newColor] });
  };

  const updateColor = (id: string, updates: Partial<BrandColor>) => {
    setData({ ...data, colors: data.colors.map(c => c.id === id ? { ...c, ...updates } : c) });
  };

  // --- Patterns Management ---
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
    <div className="space-y-20 pb-40 max-w-5xl mx-auto animate-in fade-in duration-500 font-sans">
      
      {/* 📋 Section 1: Brand Strategy */}
      <section className="space-y-8 bg-zinc-50 dark:bg-zinc-900/50 p-10 rounded-[32px] border border-zinc-100 dark:border-zinc-800">
        <h2 className="text-xl font-black uppercase tracking-widest text-zinc-400">ბრენდის სტრატეგია</h2>
        <p className="text-[10px] text-zinc-400 italic">მინიშნება: გამოიყენეთ Enter ახალი ხაზისთვის (სიებისათვის).</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">1. ბრენდის სახელი და სლოგანი</label>
            <div className="grid grid-cols-2 gap-2">
              <input value={data.strategy.brandName} onChange={e => updateStrategy('brandName', e.target.value)} className="bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm" placeholder="სახელი" />
              <input value={data.strategy.slogan} onChange={e => updateStrategy('slogan', e.target.value)} className="bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm" placeholder="სლოგანი" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">2. ვინ არის ბრენდი</label>
            <textarea value={data.strategy.whoIsBrand} onChange={e => updateStrategy('whoIsBrand', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm min-h-[80px]" placeholder="აღწერეთ ბრენდის არსი" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">3. ბრენდის მამოძრავებელი</label>
            <input value={data.strategy.brandDriver} onChange={e => updateStrategy('brandDriver', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">4. ბრენდის მისია</label>
            <textarea value={data.strategy.brandMission} onChange={e => updateStrategy('brandMission', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm min-h-[80px]" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">5. ბრენდის ფასეულობები</label>
            <textarea value={data.strategy.brandValues} onChange={e => updateStrategy('brandValues', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm min-h-[80px]" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">6. ბრენდის პერსონიფიკაცია</label>
            <textarea value={data.strategy.brandPersonification} onChange={e => updateStrategy('brandPersonification', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm min-h-[80px]" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">7. ბრენდის ერთადერთობა</label>
            <input value={data.strategy.brandUniqueness} onChange={e => updateStrategy('brandUniqueness', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">8. ბრენდის კატეგორია</label>
            <input value={data.strategy.brandCategory} onChange={e => updateStrategy('brandCategory', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">9. ბრენდის არქეტიპი</label>
            <input value={data.strategy.archetype} onChange={e => updateStrategy('archetype', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">10. ბრენდის დაპირება</label>
            <textarea value={data.strategy.brandPromise} onChange={e => updateStrategy('brandPromise', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm min-h-[60px]" />
          </div>
        </div>
      </section>

      {/* 📐 Section 2: Logos */}
      <section className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black uppercase tracking-widest text-zinc-400">ლოგოები</h2>
          <button onClick={addLogo} className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-[10px] font-bold uppercase">+ ლოგოს დამატება</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.logos.map(logo => (
            <div key={logo.id} className="p-8 border border-zinc-100 dark:border-zinc-800 rounded-3xl bg-zinc-50 dark:bg-zinc-900/30 space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                   <input value={logo.title} onChange={e => updateLogo(logo.id, { title: e.target.value })} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm font-bold" placeholder="ლოგოს სათაური" />
                   <input value={logo.pngUrl} onChange={e => updateLogo(logo.id, { pngUrl: e.target.value })} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-xs" placeholder="PNG URL" />
                   <input value={logo.svgUrl} onChange={e => updateLogo(logo.id, { svgUrl: e.target.value })} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-xs" placeholder="SVG URL" />
                </div>
                {logo.pngUrl && <img src={logo.pngUrl} className="w-20 h-20 object-contain bg-white rounded-xl p-2 border" />}
              </div>
              <button onClick={() => removeLogo(logo.id)} className="text-[10px] text-red-500 font-bold uppercase">წაშლა</button>
            </div>
          ))}
        </div>
        <div className="space-y-4 pt-4">
          <label className="text-[10px] font-bold uppercase text-zinc-400">ლოგოს გამოყენების წესები</label>
          <textarea value={data.logoRules} onChange={e => setData({...data, logoRules: e.target.value})} className="w-full bg-zinc-50 dark:bg-zinc-900 p-6 rounded-[24px] outline-none min-h-[150px] border border-zinc-100 dark:border-zinc-800" placeholder="როგორ უნდა და როგორ არ უნდა იქნას გამოყენებული ლოგო..." />
        </div>
      </section>

      {/* 🎨 Section 3: Colors */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black uppercase tracking-widest text-zinc-400">ფერების პალიტრა</h2>
          <button onClick={addColor} className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-[10px] font-bold uppercase">+ ფერის დამატება</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.colors?.map(color => (
            <div key={color.id} className="p-6 border border-zinc-100 dark:border-zinc-800 rounded-2xl flex items-center gap-6 bg-white dark:bg-zinc-900">
              <input type="color" value={color.hex} onChange={e => updateColor(color.id, { hex: e.target.value })} className="w-16 h-16 rounded-xl cursor-pointer bg-transparent border-none" />
              <div className="flex-1 space-y-2">
                <input placeholder="სახელი" value={color.name} onChange={e => updateColor(color.id, { name: e.target.value })} className="w-full bg-zinc-50 dark:bg-zinc-800 p-2 rounded-lg text-sm outline-none font-bold" />
                <textarea placeholder="აღწერა/დანიშნულება" value={color.description} onChange={e => updateColor(color.id, { description: e.target.value })} className="w-full bg-zinc-50 dark:bg-zinc-800 p-2 rounded-lg text-xs outline-none min-h-[50px]" />
                <button onClick={() => setData({ ...data, colors: data.colors.filter(c => c.id !== color.id) })} className="text-[10px] text-red-500 font-bold uppercase">წაშლა</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🖋️ Section 4: Typography (Fonts) */}
      <section className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black uppercase tracking-widest text-zinc-400">ტიპოგრაფია</h2>
          <button onClick={addFont} className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-[10px] font-bold uppercase">+ ფონტის დამატება</button>
        </div>
        <div className="space-y-4">
          {data.fonts.map(font => (
            <div key={font.id} className="p-6 border border-zinc-100 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="text-[8px] uppercase font-bold text-zinc-400 mb-2 block">სახელი</label>
                <input value={font.name} onChange={e => updateFont(font.id, { name: e.target.value })} className="w-full bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl outline-none text-sm" />
              </div>
              <div>
                <label className="text-[8px] uppercase font-bold text-zinc-400 mb-2 block">ჩამოსატვირთი ლინკი</label>
                <input value={font.url} onChange={e => updateFont(font.id, { url: e.target.value })} className="w-full bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl outline-none text-sm" />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-[8px] uppercase font-bold text-zinc-400 mb-2 block">ნიმუში</label>
                  <input value={font.sampleText} onChange={e => updateFont(font.id, { sampleText: e.target.value })} className="w-full bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl outline-none text-sm" />
                </div>
                <button onClick={() => removeFont(font.id)} className="text-red-500 hover:text-red-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🌀 Section 5: Patterns */}
      <section className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black uppercase tracking-widest text-zinc-400">გრაფიკული ნიმუშები (Patterns)</h2>
          <button onClick={() => patternInputRef.current?.click()} className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-[10px] font-bold uppercase">+ ატვირთვა</button>
          <input type="file" multiple ref={patternInputRef} onChange={handlePatternUpload} className="hidden" accept="image/*" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {data.patterns?.map(pattern => (
            <div key={pattern.id} className="relative group aspect-square rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm">
              <img src={pattern.imageUrl} className="w-full h-full object-cover" alt={pattern.title} />
              <button onClick={() => removePattern(pattern.id)} className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center font-bold text-[10px] uppercase">წაშლა</button>
            </div>
          ))}
        </div>
      </section>

      {/* 🚀 Save Action */}
      <div className="sticky bottom-10 z-50">
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="w-full py-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-[28px] font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
        >
          {isSaving ? 'ინახება...' : 'ცვლილებების შენახვა და დახურვა'}
        </button>
      </div>
    </div>
  );
};
export default AdminBrandForm;
