export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  liveUrl: string;
  githubUrl?: string;
  technologies: string[];
  featured: boolean;
  category: 'fullstack' | 'frontend' | 'backend' | 'other';
  year: number;
  slug: string;
  // Detail page fields
  role?: string;
  highlights?: string[];
  challenge?: string;
  outcome?: string;
}
