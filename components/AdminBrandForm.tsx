
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    setIsSaving(true);
    await saveBrandData(data);
    setIsSaving(false);
    if (onClose) onClose();
  };

  const uploadToImgBB = async (file: File) => {
    const key = (import.meta as any).env.VITE_IMGBB_API_KEY;
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

  const addLogo = () => {
    const newLogo: LogoAsset = { id: Date.now().toString(), title: '', description: '', pngUrl: '', svgUrl: '' };
    setData({ ...data, logos: [...data.logos, newLogo] });
  };

  const updateLogo = (id: string, updates: Partial<LogoAsset>) => {
    setData({ ...data, logos: data.logos.map(l => l.id === id ? { ...l, ...updates } : l) });
  };

  const addColor = () => {
    const newColor: BrandColor = { id: Date.now().toString(), name: '', hex: '#000000', description: '' };
    setData({ ...data, colors: [...(data.colors || []), newColor] });
  };

  const updateColor = (id: string, updates: Partial<BrandColor>) => {
    setData({ ...data, colors: data.colors.map(c => c.id === id ? { ...c, ...updates } : c) });
  };

  const addPattern = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadToImgBB(file);
    if (url) {
      const newPattern: BrandPattern = { id: Date.now().toString(), title: '', imageUrl: url };
      setData({ ...data, patterns: [...(data.patterns || []), newPattern] });
    }
  };

  const addFont = () => {
    const newFont: FontAsset = { id: Date.now().toString(), name: '', url: '', sampleText: '' };
    setData({ ...data, fonts: [...data.fonts, newFont] });
  };

  const updateFont = (id: string, updates: Partial<FontAsset>) => {
    setData({ ...data, fonts: data.fonts.map(f => f.id === id ? { ...f, ...updates } : f) });
  };

  const updateStrategy = (key: keyof typeof data.strategy, value: string) => {
    setData({ ...data, strategy: { ...data.strategy, [key]: value } });
  };

  return (
    <div className="space-y-16 pb-32 max-w-5xl mx-auto">
      {/* 📋 Strategy Section */}
      <section className="space-y-8 bg-zinc-50 dark:bg-zinc-900/50 p-10 rounded-[32px] border border-zinc-100 dark:border-zinc-800">
        <h2 className="text-xl font-black uppercase tracking-widest text-zinc-400">ბრენდის სტრატეგია</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">ბრენდის სახელი</label>
            <input value={data.strategy.brandName} onChange={e => updateStrategy('brandName', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-4 rounded-xl outline-none border border-zinc-100 dark:border-zinc-800" placeholder="მაგ: Apple" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">სლოგანი</label>
            <input value={data.strategy.slogan} onChange={e => updateStrategy('slogan', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-4 rounded-xl outline-none border border-zinc-100 dark:border-zinc-800" placeholder="მაგ: Think Different" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">ვინ არის ბრენდი (ბიო)</label>
            <textarea value={data.strategy.whoIsBrand} onChange={e => updateStrategy('whoIsBrand', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-4 rounded-xl outline-none border border-zinc-100 dark:border-zinc-800 min-h-[100px]" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">მამოძრავებელი ძალა</label>
            <input value={data.strategy.brandDriver} onChange={e => updateStrategy('brandDriver', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-4 rounded-xl outline-none border border-zinc-100 dark:border-zinc-800" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">მისია</label>
            <input value={data.strategy.brandMission} onChange={e => updateStrategy('brandMission', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-4 rounded-xl outline-none border border-zinc-100 dark:border-zinc-800" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">ფასეულობები</label>
            <input value={data.strategy.brandValues} onChange={e => updateStrategy('brandValues', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-4 rounded-xl outline-none border border-zinc-100 dark:border-zinc-800" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">პერსონიფიკაცია</label>
            <input value={data.strategy.brandPersonification} onChange={e => updateStrategy('brandPersonification', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-4 rounded-xl outline-none border border-zinc-100 dark:border-zinc-800" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">ერთადერთობა</label>
            <input value={data.strategy.brandUniqueness} onChange={e => updateStrategy('brandUniqueness', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-4 rounded-xl outline-none border border-zinc-100 dark:border-zinc-800" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">კატეგორია</label>
            <input value={data.strategy.brandCategory} onChange={e => updateStrategy('brandCategory', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-4 rounded-xl outline-none border border-zinc-100 dark:border-zinc-800" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">ბრენდის დაპირება</label>
            <input value={data.strategy.brandPromise} onChange={e => updateStrategy('brandPromise', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-4 rounded-xl outline-none border border-zinc-100 dark:border-zinc-800" />
          </div>
        </div>
      </section>

      {/* 🎨 Colors Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black uppercase tracking-widest text-zinc-400">ფერების პალიტრა</h2>
          <button onClick={addColor} className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-[10px] font-bold uppercase">ფერის დამატება</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.colors?.map(color => (
            <div key={color.id} className="p-6 border border-zinc-100 dark:border-zinc-800 rounded-2xl flex items-center gap-6">
              <input type="color" value={color.hex} onChange={e => updateColor(color.id, { hex: e.target.value })} className="w-16 h-16 rounded-xl cursor-pointer bg-transparent border-none" />
              <div className="flex-1 space-y-2">
                <input placeholder="სახელი" value={color.name} onChange={e => updateColor(color.id, { name: e.target.value })} className="w-full bg-zinc-50 dark:bg-zinc-900 p-2 rounded-lg text-sm outline-none font-bold" />
                <input placeholder="HEX კოდი" value={color.hex} onChange={e => updateColor(color.id, { hex: e.target.value })} className="w-full bg-zinc-50 dark:bg-zinc-900 p-2 rounded-lg text-xs outline-none uppercase" />
                <button onClick={() => setData({ ...data, colors: data.colors.filter(c => c.id !== color.id) })} className="text-[10px] text-red-500 font-bold uppercase">წაშლა</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🌀 Patterns Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black uppercase tracking-widest text-zinc-400">ორნამენტები (Patterns)</h2>
          <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-[10px] font-bold uppercase">ატვირთვა</button>
          <input type="file" ref={fileInputRef} onChange={addPattern} className="hidden" accept="image/*" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {data.patterns?.map(pattern => (
            <div key={pattern.id} className="relative group aspect-square rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
              <img src={pattern.imageUrl} className="w-full h-full object-cover" />
              <button onClick={() => setData({ ...data, patterns: data.patterns.filter(p => p.id !== pattern.id) })} className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center font-bold">წაშლა</button>
            </div>
          ))}
        </div>
      </section>

      {/* 📏 Logo Rules Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-black uppercase tracking-widest text-zinc-400">ლოგოს გამოყენების წესები</h2>
        <textarea value={data.logoRules} onChange={e => setData({...data, logoRules: e.target.value})} className="w-full bg-zinc-50 dark:bg-zinc-900 p-6 rounded-[24px] outline-none min-h-[150px] border border-zinc-100 dark:border-zinc-800" placeholder="აღწერეთ როგორ უნდა და როგორ არ უნდა იქნას გამოყენებული ლოგო..." />
      </section>

      {/* 🚀 Save Action */}
      <div className="sticky bottom-10 z-50 px-10">
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="w-full py-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-[28px] font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4"
        >
          {isSaving ? 'ინახება...' : 'ყველა ცვლილების შენახვა'}
        </button>
      </div>
    </div>
  );
};
export default AdminBrandForm;
