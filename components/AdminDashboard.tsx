
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { Project, GalleryItem } from '../types';
import AdminProjectForm from './AdminProjectForm';
import AdminGalleryForm from './AdminGalleryForm';

const AdminDashboard: React.FC = () => {
  const { setAdminAuthenticated, setView, projects, deleteProject, galleryItems, deleteGalleryItem } = useApp();
  const [activeTab, setActiveTab] = useState<'projects' | 'gallery'>('projects');
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
    return activeTab === 'projects' ? (
      <AdminProjectForm project={editingItem} onClose={() => setIsFormOpen(false)} />
    ) : (
      <AdminGalleryForm item={editingItem} onClose={() => setIsFormOpen(false)} />
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans">
      <header className="border-b border-zinc-100 dark:border-zinc-900 px-8 py-6 sticky top-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div>
              <h1 className="text-[22px] font-bold tracking-tight">Admin CMS</h1>
              <p className="text-[12px] text-zinc-400 font-bold uppercase tracking-widest mt-0.5">Control Center</p>
            </div>
            
            <nav className="flex items-center bg-zinc-50 dark:bg-zinc-900 p-1.5 rounded-2xl">
              <button 
                onClick={() => setActiveTab('projects')}
                className={`px-6 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${activeTab === 'projects' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
              >
                Projects
              </button>
              <button 
                onClick={() => setActiveTab('gallery')}
                className={`px-6 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${activeTab === 'gallery' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
              >
                Work Process
              </button>
            </nav>
          </div>
          
          <div className="flex items-center gap-6">
            <button onClick={handleLogout} className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest hover:text-zinc-900">Logout</button>
            <button onClick={openAddForm} className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
              Add {activeTab === 'projects' ? 'Project' : 'Process'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-10">
        {activeTab === 'projects' ? (
          <div className="space-y-4">
            {projects.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-5 bg-white border border-zinc-100 dark:border-zinc-900 rounded-[24px]">
                <div className="flex items-center gap-6">
                  <img src={p.image} className="w-20 h-14 object-cover rounded-xl bg-zinc-100" />
                  <div>
                    <h3 className="font-bold">{p.title}</h3>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">{p.year} • {p.client}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingItem(p); setIsFormOpen(true); }} className="p-3 text-zinc-400 hover:text-zinc-900">Edit</button>
                  <button onClick={() => deleteProject(p.id)} className="p-3 text-red-300 hover:text-red-500">Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {galleryItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-5 bg-white border border-zinc-100 dark:border-zinc-900 rounded-[24px]">
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-4">
                    {item.images.slice(0, 3).map((img, i) => (
                      <img key={i} src={img} className="w-12 h-12 rounded-full border-4 border-white object-cover" />
                    ))}
                  </div>
                  <div>
                    <h3 className="font-bold">{item.projectTitle}</h3>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">{item.period}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingItem(item); setIsFormOpen(true); }} className="p-3 text-zinc-400 hover:text-zinc-900">Edit</button>
                  <button onClick={() => deleteGalleryItem(item.id)} className="p-3 text-red-300 hover:text-red-500">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
export default AdminDashboard;
