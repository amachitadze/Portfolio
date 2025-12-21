
export type Language = 'ENG' | 'GEO' | 'ESP';
export type View = 'SITE' | 'DETAIL' | 'ADMIN';

export interface Project {
  id: number;
  title: string;
  image: string;
  tags: string[];
  year?: string;
  client?: string;
  solution?: string;
  results?: string;
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
}
