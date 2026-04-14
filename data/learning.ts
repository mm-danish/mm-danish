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

export const NOTES: LearningItem[] = [
  {
    id: 'node-1',
    category: 'Node.js',
    title: 'The Event Loop',
    content: 'Node.js is single-threaded but non-blocking because of the event loop. It has 6 phases — timers, pending callbacks, idle/prepare, poll, check, close callbacks. I/O is offloaded to the OS; the loop processes callbacks when they\'re ready.',
    date: '2026-04-11',
  },
  {
    id: 'node-2',
    category: 'Node.js',
    title: 'Streams vs Buffers',
    content: 'Buffer loads the whole thing into memory. Streams process data chunk-by-chunk — essential for large files or HTTP bodies. Always prefer streams for I/O-heavy work.',
    code: `const fs = require('fs');
fs.createReadStream('big.csv').pipe(fs.createWriteStream('out.csv'));`,
    date: '2026-04-12',
  },
  {
    id: 'react-1',
    category: 'React.js',
    title: 'React.memo usage',
    content: 'React.memo skips re-rendering a component if its props are the same. Use it on pure components that render often with the same props.',
    date: '2026-04-10',
  },
  {
    id: 'next-1',
    category: 'Next.js',
    title: 'Server Actions',
    content: 'Server Actions are async server functions called from client components. They run only on the server, auto-invalidate cache, and eliminate the need for separate API route handlers.',
    code: `'use server';
export async function update(data) {
  await db.save(data);
  revalidatePath('/');
}`,
    date: '2026-04-11',
  },
];
