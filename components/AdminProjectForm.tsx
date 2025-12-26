
import React, { useState, useRef } from 'react';
import { Project } from '../types';
import { useApp } from '../store/AppContext';
import RichTextEditor from './RichTextEditor';

interface AdminProjectFormProps {
  project?: Project | null;
  onClose: () => void;
}

const AdminProjectForm: React.FC<AdminProjectFormProps> = ({ project, onClose }) => {
  const { addProject, updateProject } = useApp();
  const contentFileInputRef = useRef<HTMLInputElement>(null);
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  
  const [isUploading, setIsUploading] = useState(false);
  const [isCoverUploading, setIsCoverUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: project?.title || '',
    image: project?.image || '',
    tags: project?.tags.join(', ') || '',
    year: project?.year || '2025',
    client: project?.client || '',
    demoUrl: project?.demoUrl || '',
    content: project?.content || ''
  });

  const uploadToImgBB = async (file: File) => {
    const key = (import.meta as any).env.VITE_IMGBB_API_KEY;
    if (!key) {
      alert('VITE_IMGBB_API_KEY ვერ მოიძებნა Vercel-ის ცვლადებში!');
      return { success: false };
    }
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

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsCoverUploading(true);
    const result = await uploadToImgBB(file);
    if (result.success) {
      setFormData({ ...formData, image: result.data.url });
    }
    setIsCoverUploading(false);
  };

  const handleContentFilesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploading(true);
    let newContent = formData.content;
    for (let i = 0; i < files.length; i++) {
      const result = await uploadToImgBB(files[i]);
      if (result.success) {
        newContent += `<img src="${result.data.url}" style="width:100%; border-radius:20px; margin:20px 0; display:block;" /> <p><br></p>`;
      }
    }
    setFormData(prev => ({ ...prev, content: newContent }));
    setIsUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const projectData: any = {
      title: formData.title,
      image: formData.image,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(t => t !== ''),
      year: formData.year,
      client: formData.client,
      demoUrl: formData.demoUrl,
      content: formData.content,
    };
    
    if (project) {
      await updateProject({ ...projectData, id: project.id });
    } else {
      await addProject(projectData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-zinc-950 z-[100] overflow-y-auto animate-in slide-in-from-bottom-10 duration-500 font-sans">
      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-3xl font-black tracking-tight uppercase">{project ? 'რედაქტირება' : 'ახალი პროექტი'}</h2>
          <button onClick={onClose} className="text-[10px] font-black uppercase tracking-widest text-zinc-400">დახურვა</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 mb-3 block font-bold">პროექტის დასახელება</label>
                <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl px-5 py-3 outline-none" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 mb-3 block font-bold">Cover Image</label>
                <div className="flex gap-3">
                  <input required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl px-5 py-3 outline-none text-xs" />
                  <input type="file" ref={coverFileInputRef} onChange={handleCoverUpload} className="hidden" accept="image/*" />
                  <button type="button" onClick={() => coverFileInputRef.current?.click()} className="px-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-[10px] font-bold uppercase tracking-widest">
                    {isCoverUploading ? '...' : 'ატვირთვა'}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 mb-3 block font-bold">Live დემო ლინკი</label>
                <input value={formData.demoUrl} onChange={e => setFormData({...formData, demoUrl: e.target.value})} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl px-5 py-3 outline-none text-xs" placeholder="https://..." />
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 mb-3 block font-bold">კლიენტი / ტეგები</label>
                <div className="grid grid-cols-2 gap-4">
                  <input value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl px-5 py-3 outline-none" placeholder="კლიენტი" />
                  <input value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl px-5 py-3 outline-none" placeholder="ტეგი1, ტეგი2" />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 mb-3 block font-bold">წელი</label>
                <input value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl px-5 py-3 outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[10px] uppercase tracking-widest text-zinc-400 block font-bold">პროექტის დეტალური აღწერა</label>
              <button type="button" onClick={() => contentFileInputRef.current?.click()} className="text-[10px] font-black uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-lg">
                + სურათების დამატება
              </button>
              <input type="file" ref={contentFileInputRef} onChange={handleContentFilesUpload} multiple className="hidden" accept="image/*" />
            </div>
            <RichTextEditor 
              initialValue={formData.content} 
              onChange={(val) => setFormData(prev => ({ ...prev, content: val }))}
              placeholder="დაიწყეთ წერა..."
            />
          </div>

          <div className="flex gap-4 pt-10 sticky bottom-0 bg-white dark:bg-zinc-950 py-6 border-t border-zinc-100 dark:border-zinc-900">
            <button type="submit" className="flex-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-5 rounded-[20px] text-[11px] font-black uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all">შენახვა</button>
            <button type="button" onClick={onClose} className="px-10 py-5 text-zinc-400 text-[11px] font-black uppercase tracking-widest">გაუქმება</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AdminProjectForm;
