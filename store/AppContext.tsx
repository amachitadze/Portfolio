
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
  projects: Project[];                      // პროექტების სია
  galleryItems: GalleryItem[];              // პროცესების სია
  isLoading: boolean;                       // დატვირთვის სტატუსი
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
      projects, galleryItems, isLoading
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
