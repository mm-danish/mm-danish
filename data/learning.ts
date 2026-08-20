import { 
  Server, 
  Atom, 
  Layers, 
  Code2, 
  Database, 
  Zap, 
  Terminal, 
  Wind, 
  Settings,
  FolderOpen
} from 'lucide-react';
import notesData from './second-brain.json';

export type LearningCategory = string;

export interface LearningItem {
  id: string;
  category: LearningCategory;
  title: string;
  content: string;
  code?: string;
  color?: string;
  date: string;
}

export interface ThreadReply {
  id: string;
  noteId: string;
  author: string;   // display name, defaults to "Neuron"
  content: string;
  date: string;     // ISO timestamp
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
  string,
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

/** Tag pills shown in the note editor — maps display label to stored category. */
export const NOTE_TAGS: { label: string; category: LearningCategory }[] = [
  { label: 'nodejs', category: 'Node.js' },
  { label: 'react', category: 'React.js' },
  { label: 'nextjs', category: 'Next.js' },
  { label: 'typescript', category: 'TypeScript' },
  { label: 'mongodb', category: 'MongoDB' },
  { label: 'express', category: 'Express.js' },
  { label: 'architecture', category: 'Engineering' },
  { label: 'prisma', category: 'Prisma' },
  { label: 'tailwind', category: 'TailwindCSS' },
];

/** Accent colors for the note editor color picker. */
export const NOTE_ACCENT_COLORS = [
  { id: 'gray', hex: '#6b7280' },
  { id: 'red', hex: '#ef4444' },
  { id: 'orange', hex: '#f97316' },
  { id: 'yellow', hex: '#eab308' },
  { id: 'green', hex: '#22c55e' },
  { id: 'cyan', hex: '#06b6d4' },
  { id: 'blue', hex: '#3b82f6' },
  { id: 'purple', hex: '#a855f7' },
  { id: 'pink', hex: '#ec4899' },
] as const;

const fallbackColors = [
  { hex: '#ec4899', text: 'text-[#ec4899]', bg: 'bg-[#ec4899]/10', border: 'border-[#ec4899]/30' }, // Pink
  { hex: '#a855f7', text: 'text-[#a855f7]', bg: 'bg-[#a855f7]/10', border: 'border-[#a855f7]/30' }, // Purple
  { hex: '#14b8a6', text: 'text-[#14b8a6]', bg: 'bg-[#14b8a6]/10', border: 'border-[#14b8a6]/30' }, // Teal
  { hex: '#f97316', text: 'text-[#f97316]', bg: 'bg-[#f97316]/10', border: 'border-[#f97316]/30' }, // Orange
  { hex: '#ef4444', text: 'text-[#ef4444]', bg: 'bg-[#ef4444]/10', border: 'border-[#ef4444]/30' }, // Red
];

export function getCategoryIcon(category: string) {
  const c = category.toLowerCase();
  if (c.includes('node')) return Server;
  if (c.includes('react')) return Atom;
  if (c.includes('next')) return Layers;
  if (c.includes('typescript') || c.includes('ts')) return Code2;
  if (c.includes('mongo')) return Database;
  if (c.includes('prisma')) return Zap;
  if (c.includes('express')) return Terminal;
  if (c.includes('tailwind')) return Wind;
  if (c.includes('engineering') || c.includes('arch')) return Settings;
  return FolderOpen;
}

export function getCategoryColor(category: string) {
  if (CATEGORY_COLORS[category]) {
    return CATEGORY_COLORS[category];
  }
  
  // Deterministic fallback color based on category string
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % fallbackColors.length;
  return fallbackColors[index];
}

export function getNoteAccent(note: Pick<LearningItem, 'category' | 'color'>) {
  if (note.color) {
    return {
      hex: note.color,
      text: '',
      bg: '',
      border: '',
    };
  }
  return getCategoryColor(note.category);
}

/** Merge stored content + code into one editor body (markdown-style). */
export function combineNoteBody(content: string, code?: string) {
  if (!code?.trim()) return content;
  const trimmed = content.trimEnd();
  return trimmed ? `${trimmed}\n\n\`\`\`javascript\n${code.trim()}\n\`\`\`` : `\`\`\`javascript\n${code.trim()}\n\`\`\``;
}

/** Split editor body back into content + optional code block. */
export function splitNoteBody(body: string): { content: string; code?: string } {
  const match = body.match(/```(?:\w+)?\n([\s\S]*?)```/);
  if (!match) return { content: body.trim() };

  const code = match[1]?.trim();
  const content = body.replace(match[0], '').trim();
  return { content, code: code || undefined };
}

export const NOTES = notesData as LearningItem[];
