
import { createContext, useContext, useState, useEffect } from 'react';
import { Language, View, Project, GalleryItem, BrandData } from '../types';
import { supabase } from '../services/supabase';
import { PROJECTS } from '../constants';

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
  galleryItems: GalleryItem[];
  brandData: BrandData;
  setBrandData: (data: BrandData) => void;
  isLoading: boolean;
  addProject: (p: Project) => Promise<void>;
  updateProject: (p: Project) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  addGalleryItem: (item: GalleryItem) => Promise<void>;
  updateGalleryItem: (item: GalleryItem) => Promise<void>;
  deleteGalleryItem: (id: number) => Promise<void>;
  saveBrandData: (data: BrandData) => Promise<void>;
}

const AppContext = createContext<AppState | undefined>(undefined);

const INITIAL_BRAND_DATA: BrandData = {
  logos: [],
  logoRules: '',
  fonts: [],
  colors: [],
  patterns: [],
  strategy: {
    brandName: '',
    slogan: '',
    whoIsBrand: '',
    brandDriver: '',
    brandMission: '',
    brandValues: '',
    brandPersonification: '',
    brandUniqueness: '',
    brandCategory: '',
    brandPromise: '',
    archetype: '',
    purpose: '',
    goal: '',
    detailedManualUrl: ''
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('GEO');
  const [isDark, setIsDark] = useState(false);
  const [view, setView] = useState<View>('SITE');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [brandData, setBrandData] = useState<BrandData>(INITIAL_BRAND_DATA);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isAdminAuthenticated, setAdminAuthenticated] = useState<boolean>(() => localStorage.getItem('isAdmin') === 'true');
  const [isGalleryAuthenticated, setGalleryAuthenticated] = useState<boolean>(() => localStorage.getItem('isGalleryAuth') === 'true');

  useEffect(() => {
    localStorage.setItem('isAdmin', isAdminAuthenticated.toString());
  }, [isAdminAuthenticated]);

  useEffect(() => {
    localStorage.setItem('isGalleryAuth', isGalleryAuthenticated.toString());
  }, [isGalleryAuthenticated]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data: projectsData } = await supabase.from('projects').select('*').order('id', { ascending: false });
        const { data: galleryData } = await supabase.from('gallery_items').select('*').order('id', { ascending: false });
        const { data: brandConfig } = await supabase.from('brand_config').select('data').eq('id', 1).single();
        
        if (projectsData) setProjects(projectsData);
        if (galleryData) setGalleryItems(galleryData);
        if (brandConfig?.data) setBrandData({ ...INITIAL_BRAND_DATA, ...brandConfig.data });
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const addProject = async (p: Project) => {
    const { id, ...projectData } = p;
    const { data, error } = await supabase.from('projects').insert([projectData]).select();
    if (error) alert('Error: ' + error.message);
    else if (data) setProjects([data[0], ...projects]);
  };

  const updateProject = async (p: Project) => {
    const { error } = await supabase.from('projects').update(p).eq('id', p.id);
    if (error) alert('Error: ' + error.message);
    else setProjects(projects.map(proj => proj.id === p.id ? p : proj));
  };

  const deleteProject = async (id: number) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) setProjects(projects.filter(p => p.id !== id));
  };

  const addGalleryItem = async (item: GalleryItem) => {
    const { id, ...payload } = item;
    const { data, error } = await supabase.from('gallery_items').insert([payload]).select();
    if (error) alert('Error: ' + error.message);
    else if (data) setGalleryItems([data[0], ...galleryItems]);
  };

  const updateGalleryItem = async (item: GalleryItem) => {
    const { id, ...payload } = item;
    const { error } = await supabase.from('gallery_items').update(payload).eq('id', item.id);
    if (error) alert('Error: ' + error.message);
    else setGalleryItems(galleryItems.map(gi => gi.id === item.id ? item : gi));
  };

  const deleteGalleryItem = async (id: number) => {
    const { error } = await supabase.from('gallery_items').delete().eq('id', id);
    if (!error) setGalleryItems(galleryItems.filter(gi => gi.id !== id));
  };

  const saveBrandData = async (data: BrandData) => {
    const { error } = await supabase.from('brand_config').upsert({ id: 1, data });
    if (error) alert('Error: ' + error.message);
    else setBrandData(data);
  };

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  return (
    <AppContext.Provider value={{ 
      lang, setLang, isDark, toggleDark: () => setIsDark(!isDark), 
      view, setView, selectedProject, setSelectedProject,
      selectedGalleryItem, setSelectedGalleryItem,
      isAdminAuthenticated, setAdminAuthenticated,
      isGalleryAuthenticated, setGalleryAuthenticated,
      projects, galleryItems, brandData, setBrandData, isLoading,
      addProject, updateProject, deleteProject,
      addGalleryItem, updateGalleryItem, deleteGalleryItem,
      saveBrandData
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
