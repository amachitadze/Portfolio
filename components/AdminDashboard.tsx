
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { Project, GalleryItem } from '../types';
import AdminProjectForm from './AdminProjectForm';
import AdminGalleryForm from './AdminGalleryForm';
import AdminBrandForm from './AdminBrandForm';

const AdminDashboard: React.FC = () => {
  const { setAdminAuthenticated, setView, projects, deleteProject, galleryItems, deleteGalleryItem } = useApp();
  const [activeTab, setActiveTab] = useState<'projects' | 'gallery' | 'brand'>('projects');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setView('SITE');
  };

  const openAddForm = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  if (isFormOpen) {
    if (activeTab === 'projects') return <AdminProjectForm project={editingItem} onClose={() => setIsFormOpen(false)} />;
    if (activeTab === 'gallery') return <AdminGalleryForm item={editingItem} onClose={() => setIsFormOpen(false)} />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans pb-20">
      <header className="border-b border-zinc-100 dark:border-zinc-900 px-4 md:px-8 py-4 md:py-6 sticky top-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md z-30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 w-full md:w-auto">
            <div className="text-center md:text-left">
              <h1 className="text-[18px] md:text-[22px] font-bold tracking-tight">მართვის პანელი</h1>
              <p className="text-[10px] md:text-[12px] text-zinc-400 font-bold uppercase tracking-widest mt-0.5">ცენტრალური ადმინისტრირება</p>
            </div>
            
            <nav className="flex items-center bg-zinc-50 dark:bg-zinc-900 p-1 rounded-2xl w-full md:w-auto overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setActiveTab('projects')}
                className={`flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-[10px] md:text-[11px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'projects' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
              >
                პროექტები
              </button>
              <button 
                onClick={() => setActiveTab('gallery')}
                className={`flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-[10px] md:text-[11px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'gallery' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
              >
                პროცესი
              </button>
              <button 
                onClick={() => setActiveTab('brand')}
                className={`flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-[10px] md:text-[11px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'brand' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
              >
                ბრენდი
              </button>
            </nav>
          </div>
          
          <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t md:border-none pt-4 md:pt-0">
            <button onClick={handleLogout} className="text-[10px] md:text-[11px] font-bold text-zinc-400 uppercase tracking-widest hover:text-zinc-900">გამოსვლა</button>
            {activeTab !== 'brand' && (
              <button onClick={openAddForm} className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-5 md:px-6 py-2.5 md:py-3 rounded-xl text-[10px] md:text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
                დამატება
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-10">
        {activeTab === 'projects' && (
          <div className="space-y-3 md:space-y-4">
            {projects.map((p) => (
              <div key={p.id} className="flex flex-col sm:flex-row items-center sm:justify-between p-4 md:p-5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[20px] md:rounded-[24px] gap-4">
                <div className="flex items-center gap-4 md:gap-6 w-full sm:w-auto">
                  <img src={p.image} className="w-16 h-12 md:w-20 md:h-14 object-cover rounded-lg md:rounded-xl bg-zinc-100 shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm md:text-base truncate">{p.title}</h3>
                    <p className="text-[9px] md:text-[10px] text-zinc-400 uppercase tracking-widest font-bold truncate">{p.year} • {p.client}</p>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto justify-end border-t sm:border-none pt-2 sm:pt-0">
                  <button onClick={() => { setEditingItem(p); setIsFormOpen(true); }} className="text-[10px] md:text-[11px] font-bold text-zinc-400 hover:text-zinc-900 px-3 py-2">რედაქტირება</button>
                  <button onClick={() => { if(confirm('დარწმუნებული ხართ?')) deleteProject(p.id) }} className="text-[10px] md:text-[11px] font-bold text-red-300 hover:text-red-500 px-3 py-2">წაშლა</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'gallery' && (
          <div className="space-y-3 md:space-y-4">
            {galleryItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center sm:justify-between p-4 md:p-5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[20px] md:rounded-[24px] gap-4">
                <div className="flex items-center gap-4 md:gap-6 w-full sm:w-auto">
                  <div className="flex -space-x-3 md:-space-x-4 shrink-0">
                    {item.images.slice(0, 3).map((img, i) => (
                      <img key={i} src={img} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 md:border-4 border-white dark:border-zinc-800 object-cover" />
                    ))}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm md:text-base truncate">{item.projectTitle}</h3>
                    <p className="text-[9px] md:text-[10px] text-zinc-400 uppercase tracking-widest font-bold truncate">{item.period} {item.tags?.includes('profile') && '• პროფილი'}</p>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto justify-end border-t sm:border-none pt-2 sm:pt-0">
                  <button onClick={() => { setEditingItem(item); setIsFormOpen(true); }} className="text-[10px] md:text-[11px] font-bold text-zinc-400 hover:text-zinc-900 px-3 py-2">რედაქტირება</button>
                  <button onClick={() => { if(confirm('დარწმუნებული ხართ?')) deleteGalleryItem(item.id) }} className="text-[10px] md:text-[11px] font-bold text-red-300 hover:text-red-500 px-3 py-2">წაშლა</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'brand' && <AdminBrandForm onClose={() => setActiveTab('projects')} />}
      </main>
    </div>
  );
};
export default AdminDashboard;
