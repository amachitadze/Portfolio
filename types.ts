
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
  demoUrl?: string; // დემო ლინკის ველი
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

export interface LogoAsset {
  id: string;
  title: string;
  description: string;
  pngUrl: string;
  svgUrl: string;
}

export interface FontAsset {
  id: string;
  name: string;
  url: string;
  sampleText?: string;
}

export interface BrandColor {
  id: string;
  name: string;
  hex: string;
  rgb?: string;
  description: string;
}

export interface BrandPattern {
  id: string;
  title: string;
  imageUrl: string;
}

export interface BrandStrategy {
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
  archetype: string;
  purpose: string;
  goal: string;
  detailedManualUrl: string;
}

export interface BrandData {
  logos: LogoAsset[];
  logoRules: string;
  fonts: FontAsset[];
  colors: BrandColor[];
  patterns: BrandPattern[];
  strategy: BrandStrategy;
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
