
import { Language, TranslationsMap, Project, GalleryItem } from './types';
import { en } from './locales/en';
import { ka } from './locales/ka';
import { es } from './locales/es';

export const LANGUAGES: Language[] = ['GEO', 'ENG', 'ESP'];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Mobile Banking App',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop',
    tags: ['UI/UX', 'Mobile', 'Fintech'],
    year: '2024',
    client: 'Digital Bank Inc.',
    content: `<h2>The Challenge</h2><p>Modern banking needs to be simpler. We focused on reducing cognitive load for daily tasks.</p><ul><li>Instant transfers</li><li>Biometric security</li><li>Smart spending analytics</li></ul><img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop" style="width:100%; border-radius:20px; margin:20px 0;" /><p>The results were outstanding, with a 40% increase in daily active users.</p>`
  },
  {
    id: 2,
    title: 'Minimalist Commerce',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470&auto=format&fit=crop',
    tags: ['E-Commerce', 'Next.js'],
    year: '2023',
    client: 'EcoStyle Ltd.',
    content: '<h2>Project Overview</h2><p>A seamless shopping experience for a luxury sustainable brand.</p>'
  }
];

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 101,
    projectTitle: 'Brand Identity Evolution',
    description: 'This post documents the transition from a traditional corporate aesthetic to a modern, dynamic brand system. We explored typography variations, color psychology, and responsive logo behaviors over 3 months of iterations.',
    period: 'Apr - Jun 2024',
    images: [
      'https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513346940221-6f673d962e97?q=80&w=1470&auto=format&fit=crop'
    ]
  },
  {
    id: 102,
    projectTitle: 'Design System Documentation',
    description: 'A deep dive into building a scalable component library. We focused on atomic design principles, ensuring every button, input, and card was accessible and consistent across multiple products. Included are the early wireframes and the final documentation site.',
    period: 'Jan - Mar 2024',
    images: [
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542744095-2ad48c04bdf0?q=80&w=1470&auto=format&fit=crop'
    ]
  }
];

export const PROJECTS = INITIAL_PROJECTS;

export const TRANSLATIONS: TranslationsMap = {
  GEO: ka,
  ENG: en,
  ESP: es
};

export const SKILLS = [
  'UI/UX Design',
  'Frontend Development',
  'Product Strategy',
  'Motion Graphics',
  'Visual Identity',
  'Interactive Prototyping'
];
