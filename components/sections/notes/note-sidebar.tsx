"use client";

import * as React from "react";
import { Plus, Search, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { getNoteAccent, type LearningItem } from "@/data/learning";

interface NoteSidebarProps {
  notes: LearningItem[];
  selectedId: string | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelect: (note: LearningItem) => void;
  onNewNote: () => void;
  loading?: boolean;
}

function formatShortDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function previewText(content: string, max = 72) {
  const cleaned = content.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max).trimEnd()}…`;
}

export function NoteSidebar({
  notes,
  selectedId,
  searchQuery,
  onSearchChange,
  onSelect,
  onNewNote,
  loading,
}: NoteSidebarProps) {
  const [isHeaderCollapsed, setIsHeaderCollapsed] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const openSearch = () => {
    setIsSearchOpen(true);
    setIsHeaderCollapsed(false);
    requestAnimationFrame(() => searchInputRef.current?.focus());
  };

  return (
    <aside className="flex h-full w-full flex-col bg-background md:w-[320px] lg:w-90 shrink-0">
      <header
        className={cn(
          "shrink-0 overflow-hidden  px-5 transition-[max-height] duration-300 ease-out",
          isHeaderCollapsed ? "max-h-16" : "max-h-40",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between gap-3 transition-[padding] duration-300",
            isHeaderCollapsed ? "py-2.5" : "pt-5 pb-4",
          )}
        >
          <div>
            <p
              className={cn(
                "text-xs text-muted-foreground transition-opacity duration-200",
                isHeaderCollapsed && "opacity-0",
              )}
            >
              {notes.length} {notes.length === 1 ? "note" : "notes"}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={openSearch}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Open search"
            >
              <Search className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={onNewNote}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted",
                isHeaderCollapsed && "px-2.5",
              )}
              aria-label="Create a new note"
            >
              <Plus className="h-3.5 w-3.5" />
              <span className={cn(isHeaderCollapsed && "sr-only")}>New</span>
            </button>
          </div>
        </div>

        <div
          className={cn(
            "relative overflow-hidden transition-[max-height,opacity,padding] duration-300",
            isSearchOpen && !isHeaderCollapsed
              ? "max-h-16 pb-4 opacity-100"
              : "max-h-0 pb-0 opacity-0",
          )}
        >
          <Search className="pointer-events-none absolute left-3  top-5 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/50" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search notes..."
            tabIndex={isSearchOpen && !isHeaderCollapsed ? 0 : -1}
            className="w-full rounded-full border border-border bg-secondary/60 py-2.5 pl-9 pr-8 text-sm placeholder:text-muted-foreground/50 focus:border-foreground/40 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-5 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </header>

      <div
        className="flex-1 overflow-y-auto custom-scrollbar px-2 pb-4"
        onScroll={(event) =>
          setIsHeaderCollapsed(event.currentTarget.scrollTop > 12)
        }
      >
        {loading ? (
          <div className="space-y-1 px-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-16 animate-pulse rounded-md bg-muted/30"
              />
            ))}
          </div>
        ) : notes.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <p className="text-sm text-muted-foreground">
              {searchQuery
                ? `No matches for "${searchQuery}"`
                : "No notes yet."}
            </p>
          </div>
        ) : (
          <ul className="space-y-1 mt-1">
            {notes.map((note) => {
              const accent = getNoteAccent(note);
              const isActive = note.id === selectedId;

              return (
                <li key={note.id}>
                  <button
                    onClick={() => onSelect(note)}
                    className={cn(
                      "w-full rounded-xl border px-3 py-3 text-left transition-colors",
                      isActive
                        ? "border-border bg-muted"
                        : "border-transparent hover:border-border/70 hover:bg-muted/60",
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: accent.hex }}
                      />
                      <div className="min-w-0 flex-1">
                        <h2 className="truncate text-sm font-medium text-foreground">
                          {note.title}
                        </h2>
                        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                          {previewText(note.content)}
                        </p>
                        <div className="mt-1.5 flex items-center gap-2 text-[11px] text-muted-foreground/60">
                          <span>{formatShortDate(note.date)}</span>
                          <span style={{ color: accent.hex }}>
                            #{note.category.toLowerCase().replace(/\s+/g, "")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}
