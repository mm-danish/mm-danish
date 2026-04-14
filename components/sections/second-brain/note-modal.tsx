'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Code2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { LearningItem, Difficulty } from '@/data/learning';
import { CATEGORIES } from '@/data/learning';

const diffLabel: Record<Difficulty, { label: string; color: string }> = {
  beginner:     { label: 'Beginner',     color: 'text-emerald-500 bg-emerald-500/10' },
  intermediate: { label: 'Intermediate', color: 'text-amber-500 bg-amber-500/10'    },
  advanced:     { label: 'Advanced',     color: 'text-rose-500 bg-rose-500/10'      },
};

interface NoteModalProps {
  note: LearningItem | null;
  onClose: () => void;
}

export function NoteModal({ note, onClose }: NoteModalProps) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!note) return;
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', esc);
      document.body.style.overflow = '';
    };
  }, [note, onClose]);

  const copy = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const meta = note ? CATEGORIES.find((c) => c.name === note.category) : null;
  const diff = note ? diffLabel[note.difficulty] : null;

  return (
    <AnimatePresence>
      {note && meta && diff && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Sheet */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed inset-x-4 bottom-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-xl z-50 bg-card border border-border/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Gradient top accent */}
            <div className={cn('h-[3px] bg-gradient-to-r shrink-0', meta.gradient)} />

            {/* Header */}
            <div className="flex items-start gap-3 p-6 pb-4">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0', meta.bg)}>
                {meta.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn('text-xs font-semibold', meta.accent)}>{meta.name}</span>
                  <span className={cn('text-[11px] font-medium px-2 py-0.5 rounded-md', diff.color)}>
                    {diff.label}
                  </span>
                </div>
                <h2 className="text-base font-heading font-bold leading-snug">
                  {note.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-muted transition-colors shrink-0"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-5">
              {/* Divider */}
              <div className="border-t border-border/30" />

              {/* Content */}
              <p className="text-sm text-foreground/90 leading-relaxed">
                {note.content}
              </p>

              {/* Code block */}
              {note.code && (
                <div className="rounded-2xl overflow-hidden border border-border/30">
                  <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border/30">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Code2 className="h-3.5 w-3.5 text-primary" />
                      Code
                    </div>
                    <button
                      onClick={() => copy(note.code!)}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted"
                    >
                      {copied
                        ? <><Check className="h-3.5 w-3.5 text-emerald-500" /><span className="text-emerald-500">Copied</span></>
                        : <><Copy className="h-3.5 w-3.5" />Copy</>
                      }
                    </button>
                  </div>
                  <pre className="p-4 text-xs leading-relaxed overflow-x-auto bg-[#0d1117] text-[#e6edf3]">
                    <code>{note.code}</code>
                  </pre>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
