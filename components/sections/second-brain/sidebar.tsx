'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { CATEGORIES, type LearningCategory } from '@/data/learning';

interface SidebarProps {
  active: LearningCategory;
  onSelect: (cat: LearningCategory) => void;
}

export function Sidebar({ active, onSelect }: SidebarProps) {
  return (
    <aside className="hidden md:flex flex-col w-52 shrink-0 sticky top-28 gap-1">
      {CATEGORIES.map((cat) => {
        const isActive = active === cat.name;
        return (
          <motion.button
            key={cat.name}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(cat.name)}
            className={cn(
              'relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left',
              isActive
                ? 'text-foreground bg-muted/80'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
            )}
          >
            {/* Active indicator bar */}
            {isActive && (
              <motion.span
                layoutId="sidebar-active"
                className={cn(
                  'absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full bg-gradient-to-b',
                  cat.gradient
                )}
              />
            )}

            <span className={cn('text-base leading-none', isActive ? cat.accent : '')}>
              {cat.icon}
            </span>
            <span className="truncate">{cat.name}</span>
          </motion.button>
        );
      })}
    </aside>
  );
}
