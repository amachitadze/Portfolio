
import React, { useState, useRef, useEffect } from 'react';
import { Project } from '../types';
import { useApp } from '../store/AppContext';

interface AdminProjectFormProps {
  project?: Project | null;
  onClose: () => void;
}

const AdminProjectForm: React.FC<AdminProjectFormProps> = ({ project, onClose }) => {
  const { addProject, updateProject } = useApp();
  const editorRef = useRef<HTMLDivElement>(null);
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
  });

  useEffect(() => {
    if (editorRef.current && project?.content) {
      editorRef.current.innerHTML = project.content;
    }
  }, [project]);

  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

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
    for (let i = 0; i < files.length; i++) {
      const result = await uploadToImgBB(files[i]);
      if (result.success) {
        execCommand('insertHTML', `<img src="${result.data.url}" style="width:100%; border-radius:20px; margin:20px 0; display:block;" /> <p><br></p>`);
      }
    }
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
      content: editorRef.current?.innerHTML || '',
    };
    
    // თუ რედაქტირებაა, ID-ს ვტოვებთ, თუ ახალია - ბაზა თავად მიანიჭებს
    if (project) {
      await updateProject({ ...projectData, id: project.id });
    } else {
      await addProject(projectData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-zinc-950 z-[100] overflow-y-auto animate-in slide-in-from-bottom-10 duration-500">
      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-3xl font-normal tracking-tight">{project ? 'რედაქტირება' : 'ახალი პროექტი'}</h2>
          <button onClick={onClose} className="text-zinc-400">დახურვა</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 mb-3 block">პროექტის დასახელება</label>
                <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl px-5 py-3 outline-none" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 mb-3 block">Cover Image</label>
                <div className="flex gap-3">
                  <input required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl px-5 py-3 outline-none" />
                  <input type="file" ref={coverFileInputRef} onChange={handleCoverUpload} className="hidden" accept="image/*" />
                  <button type="button" onClick={() => coverFileInputRef.current?.click()} className="px-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-[10px] uppercase">
                    {isCoverUploading ? '...' : 'ატვირთვა'}
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 mb-3 block">კლიენტი / ტეგები</label>
                <div className="grid grid-cols-2 gap-4">
                  <input value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl px-5 py-3 outline-none" placeholder="კლიენტი" />
                  <input value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl px-5 py-3 outline-none" placeholder="ტეგი1, ტეგი2" />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 mb-3 block">წელი</label>
                <input value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl px-5 py-3 outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 block">Editor</label>
            <div className="flex flex-wrap items-center gap-1 p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-t-2xl">
              <button type="button" onClick={() => execCommand('bold')} className="p-2 hover:bg-white rounded">B</button>
              <button type="button" onClick={() => execCommand('formatBlock', 'h2')} className="p-2 hover:bg-white rounded text-xs">H2</button>
              <input type="file" ref={contentFileInputRef} onChange={handleContentFilesUpload} multiple className="hidden" accept="image/*" />
              <button type="button" onClick={() => contentFileInputRef.current?.click()} className="p-2 hover:bg-white rounded text-xs uppercase">სურათები</button>
            </div>
            <div ref={editorRef} contentEditable className="w-full min-h-[400px] bg-white dark:bg-zinc-900/50 border-x border-b border-zinc-100 dark:border-zinc-800 rounded-b-2xl p-10 outline-none prose dark:prose-invert max-w-none" />
          </div>

          <div className="flex gap-4">
            <button type="submit" className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-2xl text-sm uppercase">შენახვა</button>
            <button type="button" onClick={onClose} className="px-10 py-4 text-zinc-400 text-sm">გაუქმება</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AdminProjectForm;
