export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null; // null for current position
  description: string[];
  technologies: string[];
  website?: string;
  current: boolean;
}

