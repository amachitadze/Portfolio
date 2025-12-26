
import React, { useState, useRef } from 'react';
import { GalleryItem } from '../types';
import { useApp } from '../store/AppContext';
import RichTextEditor from './RichTextEditor';

interface AdminGalleryFormProps {
  item?: GalleryItem | null;
  onClose: () => void;
}

const AdminGalleryForm: React.FC<AdminGalleryFormProps> = ({ item, onClose }) => {
  const { addGalleryItem, updateGalleryItem } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    projectTitle: item?.projectTitle || '',
    description: item?.description || '',
    period: item?.period || '',
    images: item?.images || [] as string[],
    tags: item?.tags?.join(', ') || ''
  });

  const uploadToImgBB = async (file: File) => {
    const key = (import.meta as any).env.VITE_IMGBB_API_KEY;
    if (!key) return { success: false };
    const uploadData = new FormData();
    uploadData.append('image', file);
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
        method: 'POST',
        body: uploadData,
      });
      return await response.json();
    } catch (err) {
      return { success: false };
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setIsUploading(true);
    const newImages = [...formData.images];
    for (let i = 0; i < files.length; i++) {
      const result = await uploadToImgBB(files[i]);
      if (result.success) newImages.push(result.data.url);
    }
    setFormData({ ...formData, images: newImages });
    setIsUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const itemData: any = {
      projectTitle: formData.projectTitle,
      description: formData.description,
      period: formData.period,
      images: formData.images,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t !== '')
    };
    
    if (item) {
      await updateGalleryItem({ ...itemData, id: item.id });
    } else {
      await addGalleryItem(itemData);
    }
    onClose();
  };

  const removeImage = (index: number) => {
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-zinc-950 z-[100] overflow-y-auto p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-3xl font-black uppercase tracking-tight">{item ? 'პროცესის რედაქტირება' : 'ახალი სამუშაო პროცესი'}</h2>
          <button onClick={onClose} className="text-[10px] font-black uppercase tracking-widest text-zinc-400">დახურვა</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest">პროექტის დასახელება</label>
              <input required value={formData.projectTitle} onChange={e => setFormData({...formData, projectTitle: e.target.value})} className="w-full bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl outline-none" placeholder="მაგ: Mobile App Design" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest">პერიოდი</label>
              <input required value={formData.period} onChange={e => setFormData({...formData, period: e.target.value})} className="w-full bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl outline-none" placeholder="მაგ: იან - მარ 2024" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest">ტეგები (გამოყავით მძიმით)</label>
            <input value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl outline-none" placeholder="profile, mobile, design" />
            <p className="text-[10px] text-zinc-400">ბრენდბუქში გამოსაჩენად ჩაწერეთ ტეგი: profile</p>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest block mb-3">მოკლე აღწერა</label>
            <RichTextEditor 
              initialValue={formData.description}
              onChange={(val) => setFormData(prev => ({ ...prev, description: val }))}
              placeholder="აღწერეთ სამუშაო პროცესის ეს ეტაპი..."
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest block">გალერეა</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {formData.images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group border border-zinc-100 dark:border-zinc-800 shadow-sm">
                  <img src={img} className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeImage(i)} className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center font-bold text-[10px] uppercase tracking-widest">წაშლა</button>
                </div>
              ))}
              <button type="button" onClick={() => fileInputRef.current?.click()} className="aspect-square border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-300 hover:text-zinc-900 hover:border-zinc-900 transition-all">
                {isUploading ? '...' : <><span className="text-2xl mb-1">+</span><span className="text-[8px] font-black uppercase tracking-widest">ატვირთვა</span></>}
              </button>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} multiple className="hidden" accept="image/*" />
          </div>

          <div className="flex gap-4 pt-10">
            <button type="submit" className="flex-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-5 rounded-[20px] font-black uppercase tracking-[0.2em] text-[11px] shadow-xl">შენახვა</button>
            <button type="button" onClick={onClose} className="px-10 py-5 text-zinc-400 font-black uppercase tracking-widest text-[11px]">გაუქმება</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AdminGalleryForm;
