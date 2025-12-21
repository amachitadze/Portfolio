
/**
 * 🌍 ხელმისაწვდომი ენები
 */
export type Language = 'ENG' | 'GEO' | 'ESP';

/**
 * 🗺 აპლიკაციის ხედები (გვერდები)
 */
export type View = 'SITE' | 'DETAIL' | 'ADMIN' | 'GALLERY' | 'GALLERY_DETAIL';

/**
 * 💼 პროექტის ინტერფეისი
 */
export interface Project {
  id: number;
  title: string;      // დასახელება
  image: string;      // სურათის ლინკი
  tags: string[];     // ტეგები (UI/UX, Frontend და ა.შ.)
  year?: string;      // წელი
  client?: string;    // კლიენტი
  content: string;    // დეტალური აღწერა (HTML ფორმატში)
}

/**
 * 📸 სამუშაო პროცესის გალერეის ელემენტი
 */
export interface GalleryItem {
  id: number;
  projectTitle: string; // პროექტის სახელი
  description: string;  // მოკლე აღწერა
  period: string;       // პერიოდი
  images: string[];     // სურათების მასივი
}

/**
 * 🗣 ლოკალიზაციის (თარგმანების) სტრუქტურა
 */
export interface Translation {
  titles: string[];     // სათაურები ბეჭდვის ეფექტისთვის
  subtitle: string;     // ქვესათაური
  description: string;  // აღწერა
  location: string;     // მდებარეობა
  status: string;       // სტატუსი (მაგ: ხელმისაწვდომია)
  viewWork: string;     // ღილაკი: ნამუშევრების ნახვა
  getInTouch: string;   // ღილაკი: კონტაქტი
  aboutMeTitle: string; 
  aboutMeText1: string;
  aboutMeText2: string;
  skillsTitle: string;
  selectedWork: string;
  letsConnectTitle: string;
  letsConnectSubtitle: string;
  connectButton: string;
}

/**
 * 📚 ენების რუკა
 */
export type TranslationsMap = Record<Language, Translation>;
