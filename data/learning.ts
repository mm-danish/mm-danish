import notesData from './second-brain.json';

export type LearningCategory =
  | 'Node.js'
  | 'React.js'
  | 'Next.js'
  | 'TypeScript'
  | 'MongoDB'
  | 'Prisma'
  | 'Express.js'
  | 'TailwindCSS'
  | 'Engineering';

export interface LearningItem {
  id: string;
  category: LearningCategory;
  title: string;
  content: string;
  code?: string;
  date: string;
}

export interface CategoryMeta {
  name: LearningCategory;
}

export const CATEGORIES: CategoryMeta[] = [
  { name: 'Node.js' },
  { name: 'React.js' },
  { name: 'Next.js' },
  { name: 'TypeScript' },
  { name: 'MongoDB' },
  { name: 'Prisma' },
  { name: 'Express.js' },
  { name: 'TailwindCSS' },
  { name: 'Engineering' },
];

export const NOTES = notesData as LearningItem[];
