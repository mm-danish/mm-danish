'use client';

import { motion } from 'framer-motion';
import {
  Library,
  Server,
  Atom,
  Triangle,
  FileCode2,
  Database,
  DatabaseZap,
  Cpu,
  Palette,
  Building2,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import type { LearningCategory } from '@/data/learning';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Library,
  Server,
  Atom,
  Triangle,
  FileCode2,
  Database,
  DatabaseZap,
  Cpu,
  Palette,
  Building2,
};

interface CategoryPillProps {
  category: { name: LearningCategory; darkColor: string; icon: string };
  isActive: boolean;
  count: number;
  onClick: () => void;
}

export function CategoryPill({ category, isActive, count, onClick }: CategoryPillProps) {
  const Icon = iconMap[category.icon] ?? Library;

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        'relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300',
        isActive
          ? `${category.darkColor} ring-1 ring-current/20 shadow-lg shadow-current/5`
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/60 bg-muted/30'
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="hidden sm:inline">{category.name}</span>
      <span
        className={cn(
          'ml-0.5 text-[11px] font-bold px-1.5 py-0.5 rounded-md tabular-nums',
          isActive ? 'bg-white/10' : 'bg-muted/60 text-muted-foreground'
        )}
      >
        {count}
      </span>
    </motion.button>
  );
}
