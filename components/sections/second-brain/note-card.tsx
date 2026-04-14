'use client';

import { motion } from 'framer-motion';
import { Code2, Calendar, ArrowRight, Zap, BookOpen, Flame } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { LearningItem, Difficulty } from '@/data/learning';
import { learningCategories } from '@/data/learning';

const difficultyConfig: Record<Difficulty, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  beginner: { label: 'Beginner', icon: BookOpen, color: 'text-emerald-500 bg-emerald-500/10' },
  intermediate: { label: 'Intermediate', icon: Zap, color: 'text-amber-500 bg-amber-500/10' },
  advanced: { label: 'Advanced', icon: Flame, color: 'text-rose-500 bg-rose-500/10' },
};

interface NoteCardProps {
  item: LearningItem;
  index: number;
  viewMode: 'grid' | 'list';
  onClick: () => void;
}

export function NoteCard({ item, index, viewMode, onClick }: NoteCardProps) {
  const catMeta = learningCategories.find((c) => c.name === item.category);
  const diff = difficultyConfig[item.difficulty];
  const DiffIcon = diff.icon;

  if (viewMode === 'list') {
    return (
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.04 }}
        onClick={onClick}
        className="group flex items-center gap-4 p-4 rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm hover:bg-card/90 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 text-left w-full"
      >
        {/* Category color bar */}
        <div className={cn('w-1 h-12 rounded-full bg-gradient-to-b shrink-0', catMeta?.color)} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded-md', catMeta?.darkColor)}>
              {item.category}
            </span>
            <span className={cn('text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1', diff.color)}>
              <DiffIcon className="h-3 w-3" />
              {diff.label}
            </span>
          </div>
          <h3 className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
            {item.title}
          </h3>
        </div>

        {/* Tags */}
        <div className="hidden lg:flex items-center gap-1.5 shrink-0">
          {item.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground text-[11px]">
              {tag}
            </span>
          ))}
        </div>

        {item.codeSnippet && <Code2 className="h-4 w-4 text-primary/60 shrink-0" />}

        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
      </motion.button>
    );
  }

  // Grid mode
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      onClick={onClick}
      className="group relative flex flex-col p-5 rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm hover:bg-card/90 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 text-left"
    >
      {/* Top gradient line */}
      <div className={cn('absolute top-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity', catMeta?.color)} />

      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className={cn('text-[11px] font-semibold px-2.5 py-1 rounded-lg', catMeta?.darkColor)}>
          {item.category}
        </span>
        <span className={cn('text-[11px] font-medium px-2 py-1 rounded-lg flex items-center gap-1', diff.color)}>
          <DiffIcon className="h-3 w-3" />
          {diff.label}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
        {item.title}
      </h3>

      {/* Content preview */}
      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4 flex-1">
        {item.content}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border/30">
        <div className="flex items-center gap-1.5 flex-wrap">
          {item.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground text-[11px] font-medium"
            >
              {tag}
            </span>
          ))}
          {item.tags.length > 2 && (
            <span className="text-[11px] text-muted-foreground">+{item.tags.length - 2}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {item.codeSnippet && (
            <div className="p-1 rounded-md bg-primary/10">
              <Code2 className="h-3 w-3 text-primary" />
            </div>
          )}
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {new Date(item.dateAdded).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>
    </motion.button>
  );
}
