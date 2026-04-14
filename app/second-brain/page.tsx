import type { Metadata } from 'next';
import { SecondBrain } from '@/components/sections/second-brain';

export const metadata: Metadata = {
  title: 'Second Brain — MM Danish',
  description:
    'My personal knowledge vault — curated notes, code snippets, and learnings across Node.js, React, Next.js, TypeScript, MongoDB, Prisma, Express, TailwindCSS, and system architecture.',
};

export default function SecondBrainPage() {
  return <SecondBrain />;
}
