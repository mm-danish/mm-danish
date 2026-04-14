'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ChevronDown } from 'lucide-react';
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
    <div className="flex flex-col gap-4">
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

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex gap-5">
      {/* 
         1. FIXED DOT ALIGNMENT: 
         Changed pt-2.5 to pt-[12px] to perfectly center the dot with the 14px text 
      */}
      <div className="flex flex-col items-center w-5 shrink-0 pt-[12px]">
        {/* Mono Dot */}
        <div className={cn(
          "w-1.5 h-1.5 rounded-full border-[1.5px] transition-all duration-500 z-10",
          isOpen
            ? "bg-foreground border-foreground scale-110"
            : "bg-transparent border-border"
        )} />

        {/* Mono Thread connection path */}
        <div className="w-full grow relative">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center"
              >
                <svg
                  className="w-full h-full text-border/40"
                  viewBox="0 0 20 100"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M10 0V84C10 88.4183 13.5817 92 18 92H24"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
          {!isOpen && (
            <div className="w-[1px] h-full bg-border/10 mx-auto" />
          )}
        </div>
      </div>

      {/* Item-level Content Area */}
      <div className="flex-1 min-w-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left group flex items-start justify-between gap-4 py-1.5"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className={cn(
                "text-[14px] font-medium leading-[1.6] transition-all duration-300",
                isOpen ? "text-foreground font-semibold" : "text-foreground/60 group-hover:text-foreground"
              )}>
                {note.title}
              </h3>
              <span className="text-[9px] font-mono uppercase tracking-widest opacity-30 shrink-0">
                {new Date(note.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>

          {/* 
             2. SOFTENED TOGGLE: 
             Removed the heavy black circle, using a simple icon with hover state 
          */}
          <div className={cn(
            "mt-1 p-1 transition-all duration-300 flex items-center justify-center opacity-30 group-hover:opacity-100",
            isOpen ? "rotate-180 opacity-100 text-foreground" : "text-muted-foreground"
          )}>
            <ChevronDown className="h-4 w-4" />
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              {/* 
                 3. HORIZONTAL RHYTHM: 
                 Increased pl-1 to pl-3 to give content more breathing room from the line 
              */}
              <div className="pt-3 pb-8 pl-3 space-y-5">
                <p className="text-[14px] text-foreground/70 leading-[1.7] max-w-[98%]">
                  {note.content}
                </p>

                {note.code && (
                  <div className="rounded-lg overflow-hidden border border-border/10 bg-muted/20">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-muted/30">
                      <span className="text-[8px] font-mono text-muted-foreground/40 uppercase tracking-widest">code</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); copyCode(note.code!); }}
                        className="text-muted-foreground/30 hover:text-foreground transition-colors p-1"
                      >
                        {copied ? <Check className="h-2.5 w-2.5" /> : <Copy className="h-2.5 w-2.5" />}
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
