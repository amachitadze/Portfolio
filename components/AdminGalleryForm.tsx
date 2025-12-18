
import React, { useState, useRef } from 'react';
import { GalleryItem } from '../types';
import { useApp } from '../store/AppContext';

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
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const apiKey = typeof process !== 'undefined' ? process.env.IMGBB_API_KEY : '';
    if (!files || !apiKey) return;
    setIsUploading(true);
    const newImages = [...formData.images];
    for (let i = 0; i < files.length; i++) {
      const uploadData = new FormData();
      uploadData.append('image', files[i]);
      try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
          method: 'POST',
          body: uploadData,
        });
        const result = await response.json();
        if (result.success) newImages.push(result.data.url);
      } catch (err) { console.error(err); }
    }
    setFormData({ ...formData, images: newImages });
    setIsUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: GalleryItem = {
      id: item?.id || Date.now(),
      ...formData
    };
    item ? await updateGalleryItem(newItem) : await addGalleryItem(newItem);
    onClose();
  };

  const removeImage = (index: number) => {
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-zinc-950 z-[100] overflow-y-auto p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-3xl font-black">{item ? 'Edit Process' : 'New Work Process'}</h2>
          <button onClick={onClose} className="text-zinc-400">Close</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest">Project Reference</label>
              <input required value={formData.projectTitle} onChange={e => setFormData({...formData, projectTitle: e.target.value})} className="w-full bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl outline-none" placeholder="Project Name" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest">Period</label>
              <input required value={formData.period} onChange={e => setFormData({...formData, period: e.target.value})} className="w-full bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl outline-none" placeholder="Jan - Mar 2024" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest">Short Description</label>
            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl outline-none min-h-[100px]" placeholder="Brief context about this work phase..." />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest block">Process Gallery</label>
            <div className="grid grid-cols-4 gap-4">
              {formData.images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                  <img src={img} className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeImage(i)} className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center font-bold">Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => fileInputRef.current?.click()} className="aspect-square border-2 border-dashed border-zinc-200 rounded-xl flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:border-zinc-900">
                {isUploading ? '...' : '+ Add Photos'}
              </button>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} multiple className="hidden" accept="image/*" />
          </div>

          <div className="flex gap-4 pt-10">
            <button type="submit" className="bg-zinc-900 text-white px-10 py-4 rounded-2xl font-bold">Save Process</button>
            <button type="button" onClick={onClose} className="px-10 py-4 text-zinc-400 font-bold">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AdminGalleryForm;
