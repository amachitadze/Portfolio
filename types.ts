
export type Language = 'ENG' | 'GEO' | 'ESP';
export type View = 'SITE' | 'DETAIL' | 'ADMIN' | 'GALLERY' | 'GALLERY_DETAIL';

export interface Project {
  id: number;
  title: string;
  image: string;
  tags: string[];
  year?: string;
  client?: string;
  content: string;
}

export interface GalleryItem {
  id: number;
  projectTitle: string;
  description: string;
  period: string;
  images: string[];
}

export interface Translation {
  title: string;
  subtitle: string;
  description: string;
  location: string;
  status: string;
  viewWork: string;
  getInTouch: string;
  aboutMeTitle: string;
  aboutMeText1: string;
  aboutMeText2: string;
  skillsTitle: string;
  selectedWork: string;
  letsConnectTitle: string;
  letsConnectSubtitle: string;
  connectButton: string;
}

export type TranslationsMap = Record<Language, Translation>;
