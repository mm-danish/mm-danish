'use client';

import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { LearningItem, CategoryMeta, Difficulty } from '@/data/learning';

const diffColor: Record<Difficulty, string> = {
  beginner:     'text-emerald-500',
  intermediate: 'text-amber-500',
  advanced:     'text-rose-500',
};

interface FeedProps {
  notes: LearningItem[];
  meta: CategoryMeta;
  onSelect: (note: LearningItem) => void;
}

export function Feed({ notes, meta, onSelect }: FeedProps) {
  return (
    <div className="flex flex-col">
      {/* Section header */}
      <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-border/40">
        <span className={cn('text-2xl leading-none', meta.accent)}>{meta.icon}</span>
        <h2 className="text-lg font-heading font-bold">{meta.name}</h2>
        <span className="ml-auto text-xs text-muted-foreground tabular-nums">
          {notes.length} {notes.length === 1 ? 'note' : 'notes'}
        </span>
      </div>

      {/* Thread list */}
      <div className="flex flex-col divide-y divide-border/30">
        {notes.map((note, idx) => (
          <ThreadPost
            key={note.id}
            note={note}
            meta={meta}
            index={idx}
            isLast={idx === notes.length - 1}
            onClick={() => onSelect(note)}
          />
        ))}
      </div>
    </div>
  );
}

interface ThreadPostProps {
  note: LearningItem;
  meta: CategoryMeta;
  index: number;
  isLast: boolean;
  onClick: () => void;
}

function ThreadPost({ note, meta, index, isLast, onClick }: ThreadPostProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onClick}
      className="group relative flex gap-4 py-5 cursor-pointer hover:bg-muted/20 -mx-4 px-4 rounded-xl transition-colors duration-200"
    >
      {/* Left column — avatar + thread line */}
      <div className="flex flex-col items-center shrink-0">
        {/* Avatar dot */}
        <div
          className={cn(
            'w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
            meta.bg,
            meta.accent
          )}
        >
          {meta.icon}
        </div>
        {/* Thread connector */}
        {!isLast && (
          <div className="w-[2px] flex-1 mt-2 bg-border/40 rounded-full min-h-[1.5rem]" />
        )}
      </div>

      {/* Right column — content */}
      <div className="flex-1 min-w-0 pb-1">
        {/* Meta row */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className={cn('text-xs font-semibold', meta.accent)}>
            {meta.name}
          </span>
          <span className="text-muted-foreground/40 text-xs">·</span>
          <span className={cn('text-xs font-medium capitalize', diffColor[note.difficulty])}>
            {note.difficulty}
          </span>
          <span className="ml-auto text-[11px] text-muted-foreground/60">
            {new Date(note.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-sm text-foreground mb-1.5 group-hover:text-primary transition-colors leading-snug">
          {note.title}
        </h3>

        {/* Content preview */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {note.content}
        </p>

        {/* Code badge */}
        {note.code && (
          <div className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground/70 bg-muted/50 px-2.5 py-1 rounded-lg">
            <Code2 className="h-3 w-3" />
            Has code snippet
          </div>
        )}
      </div>
    </motion.article>
  );
}
