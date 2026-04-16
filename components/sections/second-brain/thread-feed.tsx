'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ChevronDown, Trash2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { LearningItem, CategoryMeta } from '@/data/learning';
import { MiniHighlighter } from './mini-highlighter';

interface ThreadFeedProps {
  notes: LearningItem[];
  category: CategoryMeta;
}

export function ThreadFeed({ notes, category }: ThreadFeedProps) {
  if (notes.length === 0) {
    return <p className="text-muted-foreground text-sm py-10">No notes here yet.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      {notes.map((note) => (
        <ThreadItem
          key={note.id}
          note={note}
          category={category}
        />
      ))}
    </div>
  );
}

function ThreadItem({ note, category }: {
  note: LearningItem;
  category: CategoryMeta;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this note?')) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/notes?id=${note.id}`, { method: 'DELETE' });
      if (res.ok) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isDeleting) {
    return (
      <div className="py-4 animate-pulse opacity-50 flex items-center gap-2">
        <Trash2 className="h-4 w-4" />
        <span className="text-[12px] font-medium italic">Removing note...</span>
      </div>
    );
  }

  return (
    <div className="group/item flex gap-6 md:gap-8">
      {/* Simple Thread Axis */}
      <div className="flex w-6 shrink-0 flex-col items-center pt-4">
        <div className={cn(
          "z-10 h-2 w-2 rounded-full border transition-all duration-300",
          isOpen
            ? "border-foreground bg-foreground scale-110"
            : "border-border bg-background"
        )} />

        <div className="relative w-full grow flex justify-center mt-1">
          {isOpen ? (
            <div className="h-full w-px bg-border/60" />
          ) : (
            <div className="h-full w-px bg-border/20 group-hover/item:bg-border/40" />
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="min-w-0 flex-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex w-full items-center justify-between gap-4 py-2 text-left"
        >
          <p className={cn(
            "text-base md:text-sm leading-tight transition-colors duration-200 font-heading flex-1 min-w-0 truncate",
            isOpen ? "font-bold text-foreground" : "font-semibold text-foreground/60 hover:text-foreground"
          )}>
            {note.title}
          </p>

          <div className="flex items-center gap-4 shrink-0">
            <span className="text-[10px] font-bold font-mono text-muted-foreground uppercase tracking-wider">
              {new Date(note.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <span
              onClick={handleDelete}
              className="p-1 text-foreground/20 hover:text-red-500 transition-colors opacity-0 group-hover/item:opacity-100"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </span>
            <div className={cn(
              "flex items-center justify-center p-1 opacity-20 transition-all group-hover:opacity-100",
              isOpen ? "rotate-180 opacity-100" : ""
            )}>
              <ChevronDown className="h-3.5 w-3.5" />
            </div>
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pb-1 pt-1">
                <p className="max-w-[95%] text-sm md:text-base leading-relaxed text-foreground/80">
                  {note.content}
                </p>

                {note.code && (
                  <div className="overflow-hidden rounded-lg border border-border/40 bg-zinc-950">
                    <div className="flex items-center justify-between border-b border-white/5 px-4 py-2">
                      <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">code</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); copyCode(note.code!); }}
                        className="text-[10px] font-bold text-white/30 hover:text-white transition-colors"
                      >
                        {copied ? 'COPIED' : 'COPY'}
                      </button>
                    </div>
                    <MiniHighlighter code={note.code} />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
