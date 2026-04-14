'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Tag, BookOpen, Zap, Flame, Copy, Check, Code2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { LearningItem, Difficulty } from '@/data/learning';
import { learningCategories } from '@/data/learning';

const difficultyConfig: Record<Difficulty, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  beginner: { label: 'Beginner', icon: BookOpen, color: 'text-emerald-500 bg-emerald-500/10' },
  intermediate: { label: 'Intermediate', icon: Zap, color: 'text-amber-500 bg-amber-500/10' },
  advanced: { label: 'Advanced', icon: Flame, color: 'text-rose-500 bg-rose-500/10' },
};

interface NoteDetailProps {
  note: LearningItem | null;
  onClose: () => void;
}

export function NoteDetail({ note, onClose }: NoteDetailProps) {
  const [copied, setCopied] = React.useState(false);

  // Close on escape
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (note) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [note, onClose]);

  const handleCopy = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const catMeta = note ? learningCategories.find((c) => c.name === note.category) : null;
  const diff = note ? difficultyConfig[note.difficulty] : null;

  return (
    <AnimatePresence>
      {note && diff && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 sm:w-full sm:max-w-2xl sm:max-h-[85vh] bg-card border border-border/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* ── Header ── */}
            <div className="relative p-6 pb-4 border-b border-border/40">
              {/* Top accent gradient */}
              <div className={cn('absolute top-0 left-0 right-0 h-1 bg-gradient-to-r', catMeta?.color)} />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-xl hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Badges */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className={cn('text-xs font-semibold px-3 py-1 rounded-lg', catMeta?.darkColor)}>
                  {note.category}
                </span>
                <span className={cn('text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1', diff.color)}>
                  <diff.icon className="h-3.5 w-3.5" />
                  {diff.label}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-heading font-bold tracking-tight pr-10 leading-tight">
                {note.title}
              </h2>

              {/* Date */}
              <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                Added {new Date(note.dateAdded).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>

            {/* ── Content ── */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Main content */}
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-foreground/90 leading-relaxed whitespace-pre-line text-[15px]">
                  {note.content}
                </p>
              </div>

              {/* Code Snippet */}
              {note.codeSnippet && (
                <div className="rounded-2xl overflow-hidden border border-border/40">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-muted/60">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                      <Code2 className="h-3.5 w-3.5 text-primary" />
                      Code Snippet
                    </div>
                    <button
                      onClick={() => handleCopy(note.codeSnippet!)}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                          <span className="text-emerald-500">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 bg-[#0d1117] text-[#e6edf3] overflow-x-auto text-sm leading-relaxed">
                    <code>{note.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Tags */}
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-xl bg-muted/60 text-muted-foreground text-xs font-medium border border-border/30 hover:border-primary/30 hover:text-primary transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
