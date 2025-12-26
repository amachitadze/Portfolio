
/**
 * 🌍 ხელმისაწვდომი ენები
 */
export type Language = 'ENG' | 'GEO' | 'ESP';

/**
 * 🗺 აპლიკაციის ხედები (გვერდები)
 */
export type View = 'SITE' | 'DETAIL' | 'ADMIN' | 'GALLERY' | 'GALLERY_DETAIL' | 'BIO';

/**
 * 💼 პროექტის ინტერფეისი
 */
export interface Project {
  id: number;
  title: string;
  image: string;
  tags: string[];
  year?: string;
  client?: string;
  content: string;
}

/**
 * 📸 სამუშაო პროცესის გალერეის ელემენტი
 */
export interface GalleryItem {
  id: number;
  projectTitle: string;
  description: string;
  period: string;
  images: string[];
}

/**
 * 🗣 ლოკალიზაციის (თარგმანების) სტრუქტურა
 */
export interface Translation {
  // Hero
  titles: string[];
  subtitle: string;
  description: string;
  location: string;
  status: string;
  viewWork: string;
  getInTouch: string;
  
  // About
  aboutMeTitle: string; 
  aboutMeText1: string;
  aboutMeText2: string;
  skillsTitle: string;
  
  // Projects
  selectedWork: string;
  
  // Footer
  letsConnectTitle: string;
  letsConnectSubtitle: string;
  connectButton: string;

  // Bio Page (ახალი)
  bioName: string;
  bioRole: string;
  bioLinkPortfolio: string;
  bioLinkBehance: string;
  bioLinkDribbble: string;
  bioLinkInstagram: string;
  bioLinkLastProject: string;
}

export type TranslationsMap = Record<Language, Translation>;
