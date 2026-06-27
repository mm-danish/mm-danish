"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Trash2, Edit2, Eye, EyeOff, Trophy } from "lucide-react";
import { cn } from "@/lib/cn";
import type { LearningItem, CategoryMeta } from "@/data/learning";
import { getCategoryColor } from "@/data/learning";
import { MiniHighlighter } from "./mini-highlighter";

/* ── Spatial 3D tilt on hover ─────────────────────────────────── */
function useTilt() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = React.useState<React.CSSProperties>({});

  const onMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTiltStyle({
        transform: `perspective(800px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg) translateZ(4px)`,
        transition: "transform 0.1s ease-out",
      });
    },
    [],
  );

  const onMouseLeave = React.useCallback(() => {
    setTiltStyle({
      transform:
        "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
      transition: "transform 0.45s ease-out",
    });
  }, []);

  return { ref, tiltStyle, onMouseMove, onMouseLeave };
}

interface ThreadFeedProps {
  notes: LearningItem[];
  category: CategoryMeta;
  onEdit: (note: LearningItem) => void;
  onDelete: (note: LearningItem) => void;
  myMasteredNotes: Set<string>;
  myRevealedNotes: Set<string>;
  globalStats: {
    reveals: Record<string, number>;
    masters: Record<string, number>;
  };
  onReveal: (id: string) => void;
  onMarkMastered: (id: string) => void;
}

export function ThreadFeed({
  notes,
  category,
  onEdit,
  onDelete,
  myMasteredNotes,
  myRevealedNotes,
  globalStats,
  onReveal,
  onMarkMastered,
}: ThreadFeedProps) {
  if (notes.length === 0) {
    return (
      <p className="text-muted-foreground text-sm py-10">
        No notes in {category.name} yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {notes.map((note) => (
        <ThreadItem
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          myMasteredNotes={myMasteredNotes}
          myRevealedNotes={myRevealedNotes}
          globalStats={globalStats}
          onReveal={onReveal}
          onMarkMastered={onMarkMastered}
        />
      ))}
    </div>
  );
}

function ThreadItem({
  note,
  onEdit,
  onDelete,
  myMasteredNotes,
  myRevealedNotes,
  globalStats,
  onReveal,
  onMarkMastered,
}: {
  note: LearningItem;
  onEdit: (note: LearningItem) => void;
  onDelete: (note: LearningItem) => void;
  myMasteredNotes: Set<string>;
  myRevealedNotes: Set<string>;
  globalStats: {
    reveals: Record<string, number>;
    masters: Record<string, number>;
  };
  onReveal: (id: string) => void;
  onMarkMastered: (id: string) => void;
}) {
  const [copied, setCopied] = React.useState(false);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(note);
  };

  const accent = getCategoryColor(note.category);
  const isMastered = myMasteredNotes.has(note.id);
  const isRevealed = isMastered || myRevealedNotes.has(note.id);
  const revealCount = globalStats.reveals[note.id] || 0;
  const masterCount = globalStats.masters[note.id] || 0;

  const { ref, tiltStyle, onMouseMove, onMouseLeave } = useTilt();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      ref={ref}
      style={{ ...tiltStyle, willChange: "transform" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group/item flex gap-4 md:gap-5 overflow-hidden rounded-3xl bg-card/70 p-4 transition-transform duration-300 hover:-translate-y-0.5"
    >
      {/* Simple Thread Line */}
      <div className="flex w-6 shrink-0 flex-col items-center pt-2">
        <div
          className="z-10 h-2.5 w-2.5 rounded-full border transition-all duration-300 group-hover/item:scale-125"
          style={{
            borderColor: accent.hex,
            backgroundColor: `${accent.hex}20`,
          }}
        />

        <div className="relative w-full grow flex justify-center mt-2">
          <div className="h-full w-px bg-border/20 group-hover/item:bg-border/50 transition-colors duration-300" />
        </div>
      </div>

      {/* Content Area */}
      <div className="min-w-0 flex-1 pb-8">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[11px] font-medium text-muted-foreground/60">
            {new Date(note.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>

          <div className="flex items-center gap-0.5">
            {/* Reveal icon + count */}
            <button
              onClick={() => !isRevealed && onReveal(note.id)}
              title={isRevealed ? "Answer revealed" : "Reveal answer"}
              className={cn(
                "inline-flex items-center gap-1 rounded-lg px-1.5 py-1 transition-all duration-200",
                isRevealed
                  ? "text-sky-400 bg-sky-500/10 cursor-default"
                  : "text-muted-foreground/40 hover:text-sky-400 hover:bg-sky-500/10",
              )}
            >
              {isRevealed ? (
                <Eye className="h-3.5 w-3.5" />
              ) : (
                <EyeOff className="h-3.5 w-3.5" />
              )}
              {revealCount > 0 && (
                <span className="text-[10px] font-semibold leading-none">{revealCount}</span>
              )}
            </button>
            {/* Master icon + count */}
            <button
              onClick={() => !isMastered && onMarkMastered(note.id)}
              title={isMastered ? "Marked as mastered" : "Mark as mastered"}
              className={cn(
                "inline-flex items-center gap-1 rounded-lg px-1.5 py-1 transition-all duration-200",
                isMastered
                  ? "text-emerald-400 bg-emerald-500/10 cursor-default"
                  : "text-muted-foreground/40 hover:text-emerald-400 hover:bg-emerald-500/10",
              )}
            >
              <Trophy className="h-3.5 w-3.5" />
              {masterCount > 0 && (
                <span className="text-[10px] font-semibold leading-none">{masterCount}</span>
              )}
            </button>

            {/* Divider */}
            <span className="mx-1 h-3.5 w-px bg-border/40" />

            {/* Edit */}
            <button
              onClick={() => onEdit(note)}
              title="Edit"
              className="p-1.5 rounded-lg text-muted-foreground/40 opacity-0 group-hover/item:opacity-100 hover:text-foreground hover:bg-muted/60 transition-all duration-200"
            >
              <Edit2 className="h-3.5 w-3.5" />
            </button>
            {/* Delete */}
            <button
              onClick={handleDelete}
              title="Delete"
              className="p-1.5 rounded-lg text-muted-foreground/40 opacity-0 group-hover/item:opacity-100 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="space-y-3 mt-2">
          <div>
            <h3 className="font-bold text-[15px] leading-snug text-foreground/90">
              {note.title}
            </h3>
          </div>

          <div
            className={cn(
              "transition-all duration-300 rounded-3xl",
              !isRevealed ? "blur-sm opacity-75" : "",
            )}
          >
            <p className="max-w-[95%] text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap">
              {note.content}
            </p>

            {note.code && (
              <div
                className="mt-4 overflow-hidden rounded-2xl shadow-lg"
                style={{
                  border: `1px solid ${accent.hex}25`,
                  boxShadow: `0 0 0 1px ${accent.hex}10, 0 8px 32px -8px ${accent.hex}20, inset 0 1px 0 ${accent.hex}15`,
                }}
              >
                {/* Title bar */}
                <div
                  className="flex items-center justify-between px-4 py-2.5"
                  style={{
                    background: `linear-gradient(135deg, ${accent.hex}12 0%, transparent 100%)`,
                    borderBottom: `1px solid ${accent.hex}15`,
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] shadow-[0_0_4px_#ff5f5780]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] shadow-[0_0_4px_#febc2e80]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] shadow-[0_0_4px_#28c84080]" />
                  </div>
                  <button
                    onClick={() => copyCode(note.code!)}
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-widest transition-all duration-200 border",
                      copied
                        ? "border-transparent"
                        : "text-muted-foreground/60 hover:text-muted-foreground bg-muted/40 border-border/30",
                    )}
                    style={
                      copied
                        ? {
                            color: accent.hex,
                            background: `${accent.hex}18`,
                            border: `1px solid ${accent.hex}40`,
                          }
                        : undefined
                    }
                  >
                    {copied ? "✓ COPIED" : "COPY"}
                  </button>
                </div>
                {/* Code body */}
                <div className="bg-zinc-950/90 backdrop-blur-sm">
                  <MiniHighlighter code={note.code} />
                </div>
              </div>
            )}
          </div>


        </div>


      </div>
    </motion.div>
  );
}
