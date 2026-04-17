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

/** Brand-accurate accent colors per category. Each entry contains:
 * - `hex`  : raw hex used for inline styles / CSS variables
 * - `text` : Tailwind text utility class
 * - `bg`   : Tailwind bg utility class (low opacity variant)
 * - `border`: Tailwind border utility class
 */
export const CATEGORY_COLORS: Record<
  LearningCategory,
  { hex: string; text: string; bg: string; border: string }
> = {
  'Node.js':     { hex: '#68a063', text: 'text-[#68a063]', bg: 'bg-[#68a063]/10', border: 'border-[#68a063]/30' },
  'React.js':    { hex: '#61dafb', text: 'text-[#61dafb]', bg: 'bg-[#61dafb]/10', border: 'border-[#61dafb]/30' },
  'Next.js':     { hex: '#e2e8f0', text: 'text-[#e2e8f0]', bg: 'bg-[#e2e8f0]/8',  border: 'border-[#e2e8f0]/20' },
  'TypeScript':  { hex: '#3178c6', text: 'text-[#3178c6]', bg: 'bg-[#3178c6]/10', border: 'border-[#3178c6]/30' },
  'MongoDB':     { hex: '#00ed64', text: 'text-[#00ed64]', bg: 'bg-[#00ed64]/10', border: 'border-[#00ed64]/30' },
  'Prisma':      { hex: '#5a67d8', text: 'text-[#5a67d8]', bg: 'bg-[#5a67d8]/10', border: 'border-[#5a67d8]/30' },
  'Express.js':  { hex: '#c0c0c0', text: 'text-[#c0c0c0]', bg: 'bg-[#c0c0c0]/8',  border: 'border-[#c0c0c0]/20' },
  'TailwindCSS': { hex: '#38bdf8', text: 'text-[#38bdf8]', bg: 'bg-[#38bdf8]/10', border: 'border-[#38bdf8]/30' },
  'Engineering': { hex: '#f59e0b', text: 'text-[#f59e0b]', bg: 'bg-[#f59e0b]/10', border: 'border-[#f59e0b]/30' },
};

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
