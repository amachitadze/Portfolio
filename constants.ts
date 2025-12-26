
import { Language, TranslationsMap, Project, GalleryItem } from './types';
import { en } from './locales/en';
import { ka } from './locales/ka';
import { es } from './locales/es';

export const LANGUAGES: Language[] = ['GEO', 'ENG', 'ESP'];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Mobile Banking App',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop',
    tags: ['UI/UX', 'Mobile', 'Fintech'],
    year: '2024',
    client: 'Digital Bank Inc.',
    content: `<h2>The Challenge</h2><p>Modern banking needs to be simpler.</p>`
  },
  {
    id: 2,
    title: 'Minimalist Commerce',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470&auto=format&fit=crop',
    tags: ['E-Commerce', 'Next.js'],
    year: '2023',
    client: 'EcoStyle Ltd.',
    content: '<h2>Project Overview</h2><p>A seamless shopping experience.</p>'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [];

export const TRANSLATIONS: TranslationsMap = {
  GEO: ka,
  ENG: en,
  ESP: es
};

/**
 * 🛠️ უნარების ჩამონათვალი, რომელიც ჩანს About სექციაში.
 */
export const SKILLS = [
  'UI/UX Design',
  'Frontend Development',
  'Product Strategy',
  'Visual Identity',
  'CRM Integration',
  'Digital Transformation'
];
