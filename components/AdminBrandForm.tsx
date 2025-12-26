
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { BrandData, BioLink } from '../types';

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

  const updateBioField = (key: 'name' | 'role', value: string) => {
    setData({ ...data, bio: { ...data.bio, [key]: value } });
  };

  const addBioItem = (target: 'socials' | 'links') => {
    const newItem: BioLink = { id: Date.now().toString(), title: '', url: '', icon: 'link' };
    setData({ ...data, bio: { ...data.bio, [target]: [...(data.bio[target] || []), newItem] } });
  };

  const updateBioItem = (target: 'socials' | 'links', id: string, updates: Partial<BioLink>) => {
    setData({ ...data, bio: { ...data.bio, [target]: data.bio[target].map(item => item.id === id ? { ...item, ...updates } : item) } });
  };

  const deleteBioItem = (target: 'socials' | 'links', id: string) => {
    setData({ ...data, bio: { ...data.bio, [target]: data.bio[target].filter(item => item.id !== id) } });
  };

  const IconOption = ({ value, label }: { value: string, label: string }) => (
    <option value={value}>{label}</option>
  );

  return (
    <div className="space-y-12 pb-32 max-w-5xl mx-auto animate-in fade-in duration-500">
      
      {/* 👤 პერსონალური ინფორმაცია */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-[32px] border border-zinc-100 dark:border-zinc-800 space-y-6">
        <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400">1. ბიოგრაფიის ძირითადი მონაცემები</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-400 uppercase">სახელი და გვარი</label>
            <input value={data.bio.name} onChange={e => updateBioField('name', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-4 rounded-xl outline-none font-bold shadow-sm" placeholder="ავთანდილ მაჩიტაძე" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-400 uppercase">პროფესია / როლი</label>
            <input value={data.bio.role} onChange={e => updateBioField('role', e.target.value)} className="w-full bg-white dark:bg-zinc-900 p-4 rounded-xl outline-none shadow-sm" placeholder="Digital Designer" />
          </div>
        </div>
      </section>

      {/* 📱 სოციალური იკონები (მარცხენა მხარისთვის) */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-[32px] border border-zinc-100 dark:border-zinc-800 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400">2. სოციალური ქსელები (მარცხნივ)</h2>
          <button onClick={() => addBioItem('socials')} className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg text-[10px] font-bold uppercase transition-transform active:scale-95">+ დამატება</button>
        </div>
        <div className="grid gap-3">
          {data.bio.socials?.map(item => (
            <div key={item.id} className="flex gap-4 p-4 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-700 items-center">
              <select value={item.icon} onChange={e => updateBioItem('socials', item.id, { icon: e.target.value })} className="bg-zinc-50 dark:bg-zinc-700 p-2.5 rounded-lg text-[10px] font-bold outline-none">
                <IconOption value="instagram" label="Instagram" />
                <IconOption value="linkedin" label="LinkedIn" />
                <IconOption value="behance" label="Behance" />
                <IconOption value="telegram" label="Telegram" />
                <IconOption value="mail" label="Mail" />
                <IconOption value="threads" label="Threads" />
              </select>
              <input value={item.url} onChange={e => updateBioItem('socials', item.id, { url: e.target.value })} className="flex-1 bg-transparent border-b border-zinc-100 dark:border-zinc-700 p-1 text-xs outline-none" placeholder="URL ბმული" />
              <button onClick={() => deleteBioItem('socials', item.id)} className="text-red-400 font-bold px-2">✕</button>
            </div>
          ))}
        </div>
      </section>

      {/* 🔗 Bento ღილაკები (მარჯვენა მხარისთვის) */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-[32px] border border-zinc-100 dark:border-zinc-800 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400">3. Bento ბმულები (მარჯვნივ)</h2>
          <button onClick={() => addBioItem('links')} className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg text-[10px] font-bold uppercase transition-transform active:scale-95">+ დამატება</button>
        </div>
        <div className="grid gap-3">
          {data.bio.links?.map(item => (
            <div key={item.id} className="flex gap-4 p-4 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-700 items-center">
              <select value={item.icon} onChange={e => updateBioItem('links', item.id, { icon: e.target.value })} className="bg-zinc-50 dark:bg-zinc-700 p-2.5 rounded-lg text-[10px] font-bold outline-none">
                <IconOption value="link" label="Portfolio" />
                <IconOption value="substack" label="Substack" />
                <IconOption value="document" label="Resume" />
                <IconOption value="calendar" label="Meeting" />
                <IconOption value="behance" label="Behance" />
              </select>
              <input value={item.title} onChange={e => updateBioItem('links', item.id, { title: e.target.value })} className="flex-1 bg-transparent border-b border-zinc-100 dark:border-zinc-700 p-1 text-sm font-bold outline-none" placeholder="ღილაკის სათაური" />
              <input value={item.url} onChange={e => updateBioItem('links', item.id, { url: e.target.value })} className="flex-1 bg-transparent border-b border-zinc-100 dark:border-zinc-700 p-1 text-xs outline-none text-zinc-400" placeholder="ბმული" />
              <button onClick={() => deleteBioItem('links', item.id)} className="text-red-400 font-bold px-2">✕</button>
            </div>
          ))}
        </div>
      </section>

      <div className="sticky bottom-10">
        <button onClick={handleSave} disabled={isSaving} className="w-full py-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-[28px] font-black uppercase tracking-widest shadow-2xl transition-all hover:scale-[1.01] active:scale-95">
          {isSaving ? 'ინახება...' : 'ცვლილებების შენახვა და დახურვა'}
        </button>
      </div>
    </div>
  );
};
export default AdminBrandForm;
