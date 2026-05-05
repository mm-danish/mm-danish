'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Trash2, Edit2, ThumbsUp, MessageSquare, User, ChevronDown, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { LearningItem, CategoryMeta } from '@/data/learning';
import { getCategoryColor } from '@/data/learning';
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
  const [showMenu, setShowMenu] = React.useState(false);
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

  const accent = getCategoryColor(note.category);

  return (
    <div className="group/item flex gap-4 md:gap-5">
      {/* Simple Thread Line */}
      <div className="flex w-6 shrink-0 flex-col items-center pt-2">
        <div
          className="z-10 h-2.5 w-2.5 rounded-full border transition-all duration-300 group-hover/item:scale-125"
          style={{ borderColor: accent.hex, backgroundColor: `${accent.hex}20` }}
        />

        <div className="relative w-full grow flex justify-center mt-2">
          <div className="h-full w-px bg-border/20 group-hover/item:bg-border/50 transition-colors duration-300" />
        </div>
      </div>

      {/* Content Area */}
      <div className="min-w-0 flex-1 pb-8">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[11px] font-medium text-muted-foreground/60">
            {new Date(note.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>

          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 hover:bg-muted rounded-md transition-colors text-muted-foreground/30 hover:text-foreground"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            
            <AnimatePresence>
              {showMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 top-full mt-1 z-50 min-w-[100px] bg-card border border-border/50 rounded-lg shadow-xl py-1 overflow-hidden glass-morphism"
                  >
                    <button
                      onClick={() => { onEdit(note); setShowMenu(false); }}
                      className="flex w-full items-center gap-2 px-3 py-1.5 text-[11px] font-bold text-muted-foreground hover:text-blue-500 hover:bg-blue-500/5 transition-all uppercase tracking-wider"
                    >
                      <Edit2 className="h-3 w-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={(e) => { handleDelete(e); setShowMenu(false); }}
                      className="flex w-full items-center gap-2 px-3 py-1.5 text-[11px] font-bold text-muted-foreground hover:text-red-500 hover:bg-red-500/5 transition-all uppercase tracking-wider border-t border-border/10"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Delete</span>
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-2 mt-2">
          <h3 className="font-bold text-[15px] leading-snug text-foreground/90">
            {note.title}
          </h3>
          
          <p className="max-w-[95%] text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap">
            {note.content}
          </p>

          {note.code && (
            <div
              className="mt-3 overflow-hidden rounded-xl border bg-zinc-950 shadow-sm"
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
                  onClick={() => copyCode(note.code!)}
                  className="text-[10px] font-bold text-white/30 hover:text-white transition-colors"
                >
                  {copied ? 'COPIED' : 'COPY'}
                </button>
              </div>
              <MiniHighlighter code={note.code} />
            </div>
          )}
        </div>


      </div>
    </div>
  );
}
