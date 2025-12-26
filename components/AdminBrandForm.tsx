
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
  const patternInputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    setIsSaving(true);
    await saveBrandData(data);
    setIsSaving(false);
    // შენახვის შემდეგ ფორმა ავტომატურად იკეტება
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

  const addColor = () => {
    const newColor: BrandColor = { id: Date.now().toString(), name: 'ახალი ფერი', hex: '#000000', description: '' };
    setData({ ...data, colors: [...(data.colors || []), newColor] });
  };

  const updateColor = (id: string, updates: Partial<BrandColor>) => {
    setData({ ...data, colors: data.colors.map(c => c.id === id ? { ...c, ...updates } : c) });
  };

  const handlePatternUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadToImgBB(file);
    if (url) {
      const newPattern: BrandPattern = { id: Date.now().toString(), title: file.name, imageUrl: url };
      setData({ ...data, patterns: [...(data.patterns || []), newPattern] });
    }
  };

  return (
    <div className="space-y-16 pb-32 max-w-5xl mx-auto animate-in fade-in duration-500">
      {/* 📋 ბრენდის სტრატეგია (9 ველის სექცია) */}
      <section className="space-y-8 bg-zinc-50 dark:bg-zinc-900/50 p-10 rounded-[32px] border border-zinc-100 dark:border-zinc-800">
        <h2 className="text-xl font-black uppercase tracking-widest text-zinc-400">ბრენდის სტრატეგია</h2>
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
            <input value={data.strategy.whoIsBrand} onChange={e => updateStrategy('whoIsBrand', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm" placeholder="აღწერეთ ბრენდის არსი" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">3. ბრენდის მამოძრავებელი</label>
            <input value={data.strategy.brandDriver} onChange={e => updateStrategy('brandDriver', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">4. ბრენდის მისია</label>
            <input value={data.strategy.brandMission} onChange={e => updateStrategy('brandMission', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">5. ბრენდის ფასეულობები</label>
            <input value={data.strategy.brandValues} onChange={e => updateStrategy('brandValues', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">6. ბრენდის პერსონიფიკაცია</label>
            <input value={data.strategy.brandPersonification} onChange={e => updateStrategy('brandPersonification', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">7. ბრენდის ერთადერთობა</label>
            <input value={data.strategy.brandUniqueness} onChange={e => updateStrategy('brandUniqueness', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">8. ბრენდის კატეგორია</label>
            <input value={data.strategy.brandCategory} onChange={e => updateStrategy('brandCategory', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">9. ბრენდის დაპირება</label>
            <input value={data.strategy.brandPromise} onChange={e => updateStrategy('brandPromise', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm" />
          </div>
        </div>
      </section>

      {/* 🎨 ფერების მართვა */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black uppercase tracking-widest text-zinc-400">ფერების პალიტრა</h2>
          <button onClick={addColor} className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-[10px] font-bold uppercase">ფერის დამატება</button>
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

      {/* 📏 ლოგოს გამოყენების წესები */}
      <section className="space-y-4">
        <h2 className="text-xl font-black uppercase tracking-widest text-zinc-400">ლოგოს გამოყენების წესები</h2>
        <textarea value={data.logoRules} onChange={e => setData({...data, logoRules: e.target.value})} className="w-full bg-zinc-50 dark:bg-zinc-900 p-6 rounded-[24px] outline-none min-h-[150px] border border-zinc-100 dark:border-zinc-800" placeholder="როგორ უნდა და როგორ არ უნდა იქნას გამოყენებული ლოგო..." />
      </section>

      {/* 🚀 შენახვა */}
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
