"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Edit2, MoreVertical } from "lucide-react";
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
      <p className="text-muted-foreground text-sm py-10">No notes here yet.</p>
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
  const [showMenu, setShowMenu] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(note);
    setShowMenu(false);
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
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowMenu(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 top-full mt-2 z-50 min-w-25 rounded-2xl border border-border/40 bg-background/95 p-2 shadow-xl shadow-black/10 backdrop-blur-xl"
                  >
                    <button
                      onClick={() => {
                        onEdit(note);
                        setShowMenu(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-1xl px-3 py-2 text-[11px] font-semibold text-muted-foreground transition-colors hover:bg-muted/20 hover:text-foreground"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e);
                        setShowMenu(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-1xl px-3 py-2 text-[11px] font-semibold text-muted-foreground transition-colors hover:bg-muted/20 hover:text-foreground border-t border-border/20"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete</span>
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-3 mt-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-[15px] leading-snug text-foreground/90">
              {note.title}
            </h3>
            <span
              className={cn(
                "inline-flex rounded-full px-2 py-1 text-[11px] font-semibold",
                isMastered
                  ? "bg-emerald-500/10 text-emerald-300"
                  : isRevealed
                    ? "bg-sky-500/10 text-sky-300"
                    : "bg-muted/10 text-muted-foreground",
              )}
            >
              {isMastered ? "Mastered" : isRevealed ? "Revealed" : "Locked"}
            </span>
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
                    {copied ? "COPIED" : "COPY"}
                  </button>
                </div>
                <MiniHighlighter code={note.code} />
              </div>
            )}
          </div>

          {!isRevealed && (
            <div className="flex flex-col gap-3 rounded-3xl border border-border/50 bg-muted/10 p-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <span className="text-[12px] leading-tight">
                Reveal the answer or mark it as mastered to keep it unlocked.
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onReveal(note.id)}
                  className="rounded-full bg-slate-950/95 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-slate-800"
                >
                  Reveal
                </button>
                <button
                  onClick={() => onMarkMastered(note.id)}
                  className="rounded-full bg-emerald-500 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-emerald-600"
                >
                  Mastered
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1 rounded-full bg-muted/70 px-2 py-1">
            <span>👁️</span> {revealCount} reveals
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-muted/70 px-2 py-1">
            <span>🧠</span> {masterCount} mastered
          </span>
        </div>
      </div>
    </motion.div>
  );
}
