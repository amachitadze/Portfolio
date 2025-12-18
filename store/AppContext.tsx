
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, View, Project, GalleryItem } from '../types';
import { THEME } from '../theme';
import { supabase } from '../services/supabase';
import { PROJECTS, INITIAL_GALLERY_ITEMS } from '../constants';

interface AppState {
  lang: Language;
  setLang: (lang: Language) => void;
  isDark: boolean;
  toggleDark: () => void;
  view: View;
  setView: (view: View) => void;
  selectedProject: Project | null;
  setSelectedProject: (p: Project | null) => void;
  selectedGalleryItem: GalleryItem | null;
  setSelectedGalleryItem: (item: GalleryItem | null) => void;
  isAdminAuthenticated: boolean;
  setAdminAuthenticated: (val: boolean) => void;
  isGalleryAuthenticated: boolean;
  setGalleryAuthenticated: (val: boolean) => void;
  projects: Project[];
  addProject: (p: Project) => Promise<void>;
  updateProject: (p: Project) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  galleryItems: GalleryItem[];
  addGalleryItem: (item: GalleryItem) => Promise<void>;
  updateGalleryItem: (item: GalleryItem) => Promise<void>;
  deleteGalleryItem: (id: number) => Promise<void>;
  isLoading: boolean;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('GEO');
  const [isDark, setIsDark] = useState(false);
  const [view, setView] = useState<View>('SITE');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  
  // ვიწყებთ საწყისი მონაცემებით (PROJECTS), რომ სექციები არ გაქრეს
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY_ITEMS);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isAdminAuthenticated, setAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  const [isGalleryAuthenticated, setGalleryAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('isGalleryAuth') === 'true';
  });

  // მონაცემების ჩატვირთვა Supabase-დან
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data: projectsData } = await supabase.from('projects').select('*').order('id', { ascending: false });
        const { data: galleryData } = await supabase.from('gallery_items').select('*').order('id', { ascending: false });
        
        // მხოლოდ იმ შემთხვევაში ვანაცვლებთ, თუ ბაზაში რამე დევს
        if (projectsData && projectsData.length > 0) setProjects(projectsData);
        if (galleryData && galleryData.length > 0) setGalleryItems(galleryData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('isAdmin', isAdminAuthenticated.toString());
  }, [isAdminAuthenticated]);

  useEffect(() => {
    sessionStorage.setItem('isGalleryAuth', isGalleryAuthenticated.toString());
  }, [isGalleryAuthenticated]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = THEME.colors.dark.background;
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = THEME.colors.background;
    }
  }, [isDark]);

  const addProject = async (p: Project) => {
    const { error } = await supabase.from('projects').insert([p]);
    if (!error) setProjects([p, ...projects]);
  };

  const updateProject = async (p: Project) => {
    const { error } = await supabase.from('projects').update(p).eq('id', p.id);
    if (!error) setProjects(projects.map(item => item.id === p.id ? p : item));
  };

  const deleteProject = async (id: number) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) setProjects(projects.filter(p => p.id !== id));
  };

  const addGalleryItem = async (item: GalleryItem) => {
    const { error } = await supabase.from('gallery_items').insert([item]);
    if (!error) setGalleryItems([item, ...galleryItems]);
  };

  const updateGalleryItem = async (item: GalleryItem) => {
    const { error } = await supabase.from('gallery_items').update(item).eq('id', item.id);
    if (!error) setGalleryItems(galleryItems.map(i => i.id === item.id ? item : i));
  };

  const deleteGalleryItem = async (id: number) => {
    const { error } = await supabase.from('gallery_items').delete().eq('id', id);
    if (!error) setGalleryItems(galleryItems.filter(i => i.id !== id));
  };

  return (
    <AppContext.Provider value={{ 
      lang, setLang, isDark, toggleDark: () => setIsDark(!isDark), 
      view, setView, selectedProject, setSelectedProject,
      selectedGalleryItem, setSelectedGalleryItem,
      isAdminAuthenticated, setAdminAuthenticated,
      isGalleryAuthenticated, setGalleryAuthenticated,
      projects, addProject, updateProject, deleteProject,
      galleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem,
      isLoading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
