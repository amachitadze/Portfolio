
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, View, Project, GalleryItem } from '../types';
import { supabase } from '../services/supabase';
import { PROJECTS, INITIAL_GALLERY_ITEMS } from '../constants';

/**
 * 🧠 აპლიკაციის გლობალური მდგომარეობის (State) ინტერფეისი
 */
interface AppState {
  lang: Language;                           // მიმდინარე ენა
  setLang: (lang: Language) => void;
  isDark: boolean;                         // მუქი თემა
  toggleDark: () => void;
  view: View;                               // მიმდინარე გვერდი
  setView: (view: View) => void;
  selectedProject: Project | null;          // არჩეული პროექტი დეტალებისთვის
  setSelectedProject: (p: Project | null) => void;
  selectedGalleryItem: GalleryItem | null;
  setSelectedGalleryItem: (item: GalleryItem | null) => void;
  isAdminAuthenticated: boolean;            // ადმინის ავტორიზაცია
  setAdminAuthenticated: (val: boolean) => void;
  isGalleryAuthenticated: boolean;          // გალერეის ავტორიზაცია
  setGalleryAuthenticated: (val: boolean) => void;
  projects: Project[];                      // პროექტების სია
  galleryItems: GalleryItem[];              // პროცესების სია
  isLoading: boolean;                       // დატვირთვის სტატუსი
  addProject: (p: Project) => Promise<void>;
  updateProject: (p: Project) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  addGalleryItem: (item: GalleryItem) => Promise<void>;
  updateGalleryItem: (item: GalleryItem) => Promise<void>;
  deleteGalleryItem: (id: number) => Promise<void>;
}

const AppContext = createContext<AppState | undefined>(undefined);

/**
 * 🏗 AppProvider - აწვდის მონაცემებს მთელ აპლიკაციას
 */
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('GEO');
  const [isDark, setIsDark] = useState(false);
  const [view, setView] = useState<View>('SITE');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY_ITEMS);
  const [isLoading, setIsLoading] = useState(true);
  
  // ავტორიზაციის შემოწმება localStorage-დან
  const [isAdminAuthenticated, setAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  const [isGalleryAuthenticated, setGalleryAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isGalleryAuth') === 'true';
  });

  // სინქრონიზაცია localStorage-თან
  useEffect(() => {
    localStorage.setItem('isAdmin', isAdminAuthenticated.toString());
  }, [isAdminAuthenticated]);

  useEffect(() => {
    localStorage.setItem('isGalleryAuth', isGalleryAuthenticated.toString());
  }, [isGalleryAuthenticated]);

  /**
   * 🔄 მონაცემების წამოღება Supabase-დან
   */
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data: projectsData } = await supabase.from('projects').select('*').order('id', { ascending: false });
        const { data: galleryData } = await supabase.from('gallery_items').select('*').order('id', { ascending: false });
        
        if (projectsData?.length) setProjects(projectsData);
        if (galleryData?.length) setGalleryItems(galleryData);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // CRUD ფუნქციები
  const addProject = async (p: Project) => {
    const { data, error } = await supabase.from('projects').insert(p).select();
    if (!error && data) setProjects([data[0], ...projects]);
  };

  const updateProject = async (p: Project) => {
    const { error } = await supabase.from('projects').update(p).eq('id', p.id);
    if (!error) setProjects(projects.map(proj => proj.id === p.id ? p : proj));
  };

  const deleteProject = async (id: number) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) setProjects(projects.filter(p => p.id !== id));
  };

  const addGalleryItem = async (item: GalleryItem) => {
    const { data, error } = await supabase.from('gallery_items').insert(item).select();
    if (!error && data) setGalleryItems([data[0], ...galleryItems]);
  };

  const updateGalleryItem = async (item: GalleryItem) => {
    const { error } = await supabase.from('gallery_items').update(item).eq('id', item.id);
    if (!error) setGalleryItems(galleryItems.map(gi => gi.id === item.id ? item : gi));
  };

  const deleteGalleryItem = async (id: number) => {
    const { error } = await supabase.from('gallery_items').delete().eq('id', id);
    if (!error) setGalleryItems(galleryItems.filter(gi => gi.id !== id));
  };

  // თემის ცვლილების ასახვა HTML კლასზე
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <AppContext.Provider value={{ 
      lang, setLang, isDark, toggleDark: () => setIsDark(!isDark), 
      view, setView, selectedProject, setSelectedProject,
      selectedGalleryItem, setSelectedGalleryItem,
      isAdminAuthenticated, setAdminAuthenticated,
      isGalleryAuthenticated, setGalleryAuthenticated,
      projects, galleryItems, isLoading,
      addProject, updateProject, deleteProject,
      addGalleryItem, updateGalleryItem, deleteGalleryItem
    }}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * 🎣 Custom Hook აპლიკაციის მდგომარეობის გამოსაყენებლად
 */
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
