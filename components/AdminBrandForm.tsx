
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { BrandData, BrandColor, BioLink } from '../types';

interface AdminBrandFormProps {
  onClose?: () => void;
}

const AdminBrandForm: React.FC<AdminBrandFormProps> = ({ onClose }) => {
  const { brandData, saveBrandData } = useApp();
  const [data, setData] = useState<BrandData>(brandData);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await saveBrandData(data);
    setIsSaving(false);
    if (onClose) onClose();
  };

  const updateStrategy = (key: keyof typeof data.strategy, value: string) => {
    setData({ ...data, strategy: { ...data.strategy, [key]: value } });
  };

  const updateBioField = (key: 'name' | 'role', value: string) => {
    setData({ ...data, bio: { ...data.bio, [key]: value } });
  };

  const addBioLink = () => {
    const newLink: BioLink = { id: Date.now().toString(), title: 'ახალი ბმული', url: '', icon: 'link' };
    setData({ ...data, bio: { ...data.bio, links: [...(data.bio.links || []), newLink] } });
  };

  const updateBioLink = (id: string, updates: Partial<BioLink>) => {
    setData({ ...data, bio: { ...data.bio, links: data.bio.links.map(l => l.id === id ? { ...l, ...updates } : l) } });
  };

  const deleteBioLink = (id: string) => {
    setData({ ...data, bio: { ...data.bio, links: data.bio.links.filter(l => l.id !== id) } });
  };

  const updateColor = (id: string, updates: Partial<BrandColor>) => {
    setData({ ...data, colors: data.colors.map(c => c.id === id ? { ...c, ...updates } : c) });
  };

  return (
    <div className="space-y-16 pb-32 max-w-5xl mx-auto animate-in fade-in duration-500">
      
      {/* 👤 BIO მართვის სექცია */}
      <section className="space-y-8 bg-zinc-50 dark:bg-zinc-900/50 p-10 rounded-[32px] border border-zinc-100 dark:border-zinc-800">
        <h2 className="text-xl font-black uppercase tracking-widest text-zinc-400">პერსონალური ინფორმაცია</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">სახელი და გვარი</label>
            <input 
              value={data.bio?.name || ''} 
              onChange={e => updateBioField('name', e.target.value)} 
              className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm font-bold shadow-sm" 
              placeholder="მაგ: ავთანდილ მაჩიტაძე" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">პროფესია / როლი</label>
            <input 
              value={data.bio?.role || ''} 
              onChange={e => updateBioField('role', e.target.value)} 
              className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm shadow-sm" 
              placeholder="მაგ: Digital Product Designer" 
            />
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold uppercase text-zinc-400">ბიო ბმულები (Bento Cards)</label>
            <button onClick={addBioLink} className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg text-[10px] font-black uppercase transition-transform active:scale-95">ბმულის დამატება</button>
          </div>
          
          <div className="grid gap-3">
            {data.bio?.links?.map((link) => (
              <div key={link.id} className="p-4 bg-white dark:bg-zinc-800/50 rounded-2xl flex items-center gap-4 border border-zinc-100 dark:border-zinc-700 shadow-sm animate-in slide-in-from-left-4">
                <select 
                  value={link.icon} 
                  onChange={e => updateBioLink(link.id, { icon: e.target.value })}
                  className="bg-zinc-100 dark:bg-zinc-700 p-2.5 rounded-lg text-xs font-bold outline-none"
                >
                  <option value="link">Link</option>
                  <option value="portfolio">Portfolio</option>
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="behance">Behance</option>
                  <option value="dribbble">Dribbble</option>
                  <option value="document">Resume</option>
                  <option value="calendar">Meeting</option>
                  <option value="substack">Substack</option>
                </select>
                <input placeholder="სათაური" value={link.title} onChange={e => updateBioLink(link.id, { title: e.target.value })} className="flex-1 bg-transparent border-b border-zinc-100 dark:border-zinc-700 p-1 text-sm outline-none font-bold" />
                <input placeholder="URL" value={link.url} onChange={e => updateBioLink(link.id, { url: e.target.value })} className="flex-1 bg-transparent border-b border-zinc-100 dark:border-zinc-700 p-1 text-xs outline-none text-zinc-400" />
                <button onClick={() => deleteBioLink(link.id)} className="text-red-400 hover:text-red-600 transition-colors p-2 text-sm font-bold">✕</button>
              </div>
            ))}
            {(!data.bio?.links || data.bio.links.length === 0) && (
              <p className="text-center text-[10px] text-zinc-300 py-4 uppercase font-bold tracking-widest">ბმულები არ არის</p>
            )}
          </div>
        </div>
      </section>

      {/* 📋 ბრენდის სტრატეგია (9 ველის სექცია) */}
      <section className="space-y-8 bg-zinc-50 dark:bg-zinc-900/50 p-10 rounded-[32px] border border-zinc-100 dark:border-zinc-800">
        <h2 className="text-xl font-black uppercase tracking-widest text-zinc-400">ბრენდის სტრატეგია</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">ბრენდის სახელი და სლოგანი</label>
            <div className="grid grid-cols-2 gap-2">
              <input value={data.strategy.brandName} onChange={e => updateStrategy('brandName', e.target.value)} className="bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm" placeholder="სახელი" />
              <input value={data.strategy.slogan} onChange={e => updateStrategy('slogan', e.target.value)} className="bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm" placeholder="სლოგანი" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">ვინ არის ბრენდი</label>
            <input value={data.strategy.whoIsBrand} onChange={e => updateStrategy('whoIsBrand', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm" placeholder="აღწერეთ ბრენდის არსი" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">ბრენდის მამოძრავებელი</label>
            <input value={data.strategy.brandDriver} onChange={e => updateStrategy('brandDriver', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">ბრენდის მისია</label>
            <input value={data.strategy.brandMission} onChange={e => updateStrategy('brandMission', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">ფასეულობები</label>
            <input value={data.strategy.brandValues} onChange={e => updateStrategy('brandValues', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">პერსონიფიკაცია</label>
            <input value={data.strategy.brandPersonification} onChange={e => updateStrategy('brandPersonification', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">ერთადერთობა</label>
            <input value={data.strategy.brandUniqueness} onChange={e => updateStrategy('brandUniqueness', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">კატეგორია</label>
            <input value={data.strategy.brandCategory} onChange={e => updateStrategy('brandCategory', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400">ბრენდის დაპირება</label>
            <input value={data.strategy.brandPromise} onChange={e => updateStrategy('brandPromise', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-3 rounded-xl outline-none text-sm" />
          </div>
        </div>
      </section>

      {/* 🎨 ფერების მართვა */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black uppercase tracking-widest text-zinc-400">ფერების პალიტრა</h2>
          <button onClick={() => setData({ ...data, colors: [...data.colors, { id: Date.now().toString(), name: 'ახალი ფერი', hex: '#000000', description: '' }] })} className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-[10px] font-bold uppercase transition-transform active:scale-95">დამატება</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.colors?.map(color => (
            <div key={color.id} className="p-6 border border-zinc-100 dark:border-zinc-800 rounded-2xl flex items-center gap-6 bg-white dark:bg-zinc-900 shadow-sm">
              <input type="color" value={color.hex} onChange={e => updateColor(color.id, { hex: e.target.value })} className="w-16 h-16 rounded-xl cursor-pointer bg-transparent border-none p-0" />
              <div className="flex-1 space-y-2">
                <input placeholder="სახელი" value={color.name} onChange={e => updateColor(color.id, { name: e.target.value })} className="w-full bg-zinc-50 dark:bg-zinc-800 p-2 rounded-lg text-sm outline-none font-bold" />
                <textarea placeholder="აღწერა/დანიშნულება" value={color.description} onChange={e => updateColor(color.id, { description: e.target.value })} className="w-full bg-zinc-50 dark:bg-zinc-800 p-2 rounded-lg text-xs outline-none min-h-[50px] resize-none" />
                <button onClick={() => setData({ ...data, colors: data.colors.filter(c => c.id !== color.id) })} className="text-[10px] text-red-500 font-bold uppercase hover:underline">ფერის წაშლა</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="sticky bottom-10 z-50">
        <button 
          onClick={handleSave} 
          disabled={isSaving} 
          className="w-full py-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-[28px] font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
        >
          {isSaving ? 'ინახება...' : 'ყველა ცვლილების შენახვა და დახურვა'}
        </button>
      </div>
    </div>
  );
};
export default AdminBrandForm;
