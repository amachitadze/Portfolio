
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { BrandData, LogoAsset, FontAsset } from '../types';

const AdminBrandForm: React.FC = () => {
  const { brandData, saveBrandData } = useApp();
  const [data, setData] = useState<BrandData>(brandData);

  const handleSave = async () => {
    await saveBrandData(data);
    alert('ბრენდის კონფიგურაცია წარმატებით შეინახა!');
  };

  const addLogo = () => {
    const newLogo: LogoAsset = { id: Date.now().toString(), title: '', description: '', pngUrl: '', svgUrl: '' };
    setData({ ...data, logos: [...data.logos, newLogo] });
  };

  const updateLogo = (id: string, updates: Partial<LogoAsset>) => {
    setData({ ...data, logos: data.logos.map(l => l.id === id ? { ...l, ...updates } : l) });
  };

  const addFont = () => {
    const newFont: FontAsset = { id: Date.now().toString(), name: '', url: '', sampleText: '' };
    setData({ ...data, fonts: [...data.fonts, newFont] });
  };

  const updateFont = (id: string, updates: Partial<FontAsset>) => {
    setData({ ...data, fonts: data.fonts.map(f => f.id === id ? { ...f, ...updates } : f) });
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Logos Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold uppercase tracking-widest">ლოგოები (PNG/SVG ბმულები)</h2>
          <button onClick={addLogo} className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs font-bold uppercase">ლოგოს დამატება</button>
        </div>
        <div className="grid gap-6">
          {data.logos.map((logo) => (
            <div key={logo.id} className="p-6 border border-zinc-100 dark:border-zinc-800 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <input placeholder="ლოგოს დასახელება" value={logo.title} onChange={e => updateLogo(logo.id, { title: e.target.value })} className="w-full bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl outline-none font-bold" />
                <textarea placeholder="აღწერა (გამოყენების წესები)" value={logo.description} onChange={e => updateLogo(logo.id, { description: e.target.value })} className="w-full bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl outline-none min-h-[80px]" />
              </div>
              <div className="space-y-4">
                <input placeholder="PNG URL" value={logo.pngUrl} onChange={e => updateLogo(logo.id, { pngUrl: e.target.value })} className="w-full bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl outline-none text-xs" />
                <input placeholder="SVG URL" value={logo.svgUrl} onChange={e => updateLogo(logo.id, { svgUrl: e.target.value })} className="w-full bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl outline-none text-xs" />
                <button onClick={() => { if(confirm('წავშალოთ?')) setData({ ...data, logos: data.logos.filter(l => l.id !== logo.id) }) }} className="text-red-500 text-[10px] uppercase font-bold hover:underline">ლოგოს წაშლა</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fonts Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold uppercase tracking-widest">შრიფტები</h2>
          <button onClick={addFont} className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs font-bold uppercase">შრიფტის დამატება</button>
        </div>
        <div className="grid gap-6">
          {data.fonts.map((font) => (
            <div key={font.id} className="p-6 border border-zinc-100 dark:border-zinc-800 rounded-2xl space-y-4">
              <div className="flex gap-4">
                <input placeholder="შრიფტის სახელი (მაგ: Google Sans)" value={font.name} onChange={e => updateFont(font.id, { name: e.target.value })} className="flex-1 bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl outline-none font-bold" />
                <input placeholder="ჩამოსატვირთი ბმული" value={font.url} onChange={e => updateFont(font.id, { url: e.target.value })} className="flex-1 bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl outline-none text-xs" />
              </div>
              <input placeholder="ტექსტის ნიმუში (თუ ცარიელია, იქნება სტანდარტული)" value={font.sampleText} onChange={e => updateFont(font.id, { sampleText: e.target.value })} className="w-full bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm italic" />
              <button onClick={() => { if(confirm('წავშალოთ?')) setData({ ...data, fonts: data.fonts.filter(f => f.id !== font.id) }) }} className="text-red-500 text-[10px] uppercase font-bold hover:underline">შრიფტის წაშლა</button>
            </div>
          ))}
        </div>
      </section>

      {/* Strategy Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold uppercase tracking-widest">სტრატეგია და ბრენდბუქი</h2>
        <div className="grid gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">არქეტიპი</label>
            <input placeholder="მაგ: The Creator" value={data.strategy.archetype} onChange={e => setData({ ...data, strategy: { ...data.strategy, archetype: e.target.value } })} className="w-full bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">მისია (Purpose)</label>
            <textarea placeholder="რა არის ბრენდის არსებობის მთავარი მიზეზი?" value={data.strategy.purpose} onChange={e => setData({ ...data, strategy: { ...data.strategy, purpose: e.target.value } })} className="w-full bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl outline-none min-h-[100px]" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">მიზანი (Goal)</label>
            <textarea placeholder="სად მიდის ეს ბრენდი?" value={data.strategy.goal} onChange={e => setData({ ...data, strategy: { ...data.strategy, goal: e.target.value } })} className="w-full bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl outline-none min-h-[100px]" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">დეტალური მანუალის ბმული (PDF/URL)</label>
            <input placeholder="სრული ბრენდბუქის PDF ბმული" value={data.strategy.detailedManualUrl} onChange={e => setData({ ...data, strategy: { ...data.strategy, detailedManualUrl: e.target.value } })} className="w-full bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl outline-none" />
          </div>
        </div>
      </section>

      <button onClick={handleSave} className="w-full py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-[24px] font-black uppercase tracking-widest shadow-xl hover:scale-[1.01] transition-all">
        ყველა ცვლილების შენახვა
      </button>
    </div>
  );
};
export default AdminBrandForm;
