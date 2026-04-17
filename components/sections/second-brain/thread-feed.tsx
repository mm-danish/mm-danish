'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ChevronDown, Trash2, Edit2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { LearningItem, CategoryMeta } from '@/data/learning';
import { CATEGORY_COLORS } from '@/data/learning';
import { MiniHighlighter } from './mini-highlighter';

interface ThreadFeedProps {
  notes: LearningItem[];
  category: CategoryMeta;
  onEdit: (note: LearningItem) => void;
}

export function ThreadFeed({ notes, category, onEdit }: ThreadFeedProps) {
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
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

function ThreadItem({ note, category, onEdit }: {
  note: LearningItem;
  category: CategoryMeta;
  onEdit: (note: LearningItem) => void;
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

  const accent = CATEGORY_COLORS[note.category];

  return (
    <div className="group/item flex gap-6 md:gap-8">
      {/* Simple Thread Axis */}
      <div className="flex w-6 shrink-0 flex-col items-center pt-4">
        <div
          className={cn(
            "z-10 h-2 w-2 rounded-full border transition-all duration-300",
            isOpen ? "scale-110" : "border-border bg-background"
          )}
          style={isOpen ? { borderColor: accent.hex, backgroundColor: accent.hex } : undefined}
        />

        <div className="relative w-full grow flex justify-center mt-1">
          {isOpen ? (
            <div className="h-full w-px" style={{ backgroundColor: `${accent.hex}40` }} />
          ) : (
            <div className="h-full w-px bg-border/20 group-hover/item:bg-border/40" />
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="min-w-0 flex-1">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsOpen(!isOpen); } }}
          className="group flex w-full cursor-pointer items-center justify-between gap-4 px-3 -mx-3 py-2 text-left rounded-xl transition-all duration-300 hover:bg-muted/40"
          style={{ 
            backgroundColor: 'transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = `${accent.hex}08`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <p className={cn(
            "text-base md:text-sm leading-tight transition-colors duration-200 font-heading flex-1 min-w-0",
            isOpen ? "font-bold text-foreground whitespace-normal" : "font-semibold text-foreground/60 hover:text-foreground line-clamp-1",
          )}>
            {note.title}
          </p>
 
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Desktop Meta */}
            <div className="hidden sm:flex items-center gap-4">
              <span className="text-[10px] font-bold font-mono text-muted-foreground uppercase tracking-wider">
                {new Date(note.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              <div className="flex items-center gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                <button
                  onClick={(e) => { e.stopPropagation(); onEdit(note); }}
                  className="p-1 text-foreground/20 hover:text-blue-500 transition-colors"
                  title="Edit note"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(e); }}
                  className="p-1 text-foreground/20 hover:text-red-500 transition-colors"
                  title="Delete note"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className={cn(
              "flex items-center justify-center p-1 opacity-20 transition-all group-hover:opacity-100",
              isOpen ? "rotate-180 opacity-100" : ""
            )}>
              <ChevronDown className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>

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
                {/* Mobile Meta Row */}
                <div className="flex sm:hidden items-center justify-between text-muted-foreground/50 pb-2">
                  <span className="text-[10px] font-bold font-mono uppercase tracking-wider">
                    {new Date(note.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); onEdit(note); }}
                      className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-blue-500/5 text-blue-500/50 hover:bg-blue-500/10 transition-colors"
                    >
                      <Edit2 className="h-3 w-3" />
                      <span className="text-[10px] font-bold uppercase">Edit</span>
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-red-500/5 text-red-500/50 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span className="text-[10px] font-bold uppercase">Delete</span>
                    </button>
                  </div>
                </div>

                <p className="max-w-[95%] text-sm md:text-base leading-relaxed text-foreground/80">
                  {note.content}
                </p>

                {note.code && (
                  <div
                    className="overflow-hidden rounded-lg border bg-zinc-950"
                    style={{ borderColor: `${accent.hex}30` }}
                  >
                    <div
                      className="flex items-center justify-between border-b px-4 py-2"
                      style={{ borderColor: `${accent.hex}15` }}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                      </div>
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
    </div >
  );
}
