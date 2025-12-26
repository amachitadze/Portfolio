
import React from 'react';

export type Language = 'ENG' | 'GEO' | 'ESP';
export type View = 'SITE' | 'DETAIL' | 'ADMIN' | 'GALLERY' | 'GALLERY_DETAIL' | 'BIO' | 'BRAND';

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
  tags?: string[];
}

export interface BioLink {
  id: string;
  title: string;
  url: string;
  icon: string;
}

export interface BrandData {
  logos: any[];
  logoRules: string;
  fonts: any[];
  colors: any[];
  patterns: any[];
  strategy: {
    brandName: string;
    slogan: string;
    whoIsBrand: string;
    brandDriver: string;
    brandMission: string;
    brandValues: string;
    brandPersonification: string;
    brandUniqueness: string;
    brandCategory: string;
    brandPromise: string;
    archetype?: string;
    purpose?: string;
    goal?: string;
    detailedManualUrl?: string;
  };
  bio: {
    name: string;
    role: string;
    socials: BioLink[]; // პატარა იკონები (მარცხნივ)
    links: BioLink[];   // დიდი Bento ღილაკები (მარჯვნივ)
  };
}

export interface Translation {
  titles: string[];
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
  bioName: string;
  bioRole: string;
  bioLinkPortfolio: string;
  bioLinkBehance: string;
  bioLinkDribbble: string;
  bioLinkInstagram: string;
  bioLinkLastProject: string;
  brandTitle: string;
}

export type TranslationsMap = Record<Language, Translation>;
