"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Brain,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { getNoteAccent, type LearningItem } from "@/data/learning";
import { NoteDetail } from "./note-detail";
import { AddNoteForm } from "@/components/sections/second-brain/add-note-form";
import { AuthModal } from "@/components/sections/second-brain/auth-modal";
import { DeleteConfirmationModal } from "@/components/sections/second-brain/delete-confirmation-modal";

function ScrollFadeArea({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [hasContentAbove, setHasContentAbove] = React.useState(false);
  const [hasContentBelow, setHasContentBelow] = React.useState(false);

  React.useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const updateFades = () => {
      setHasContentAbove(element.scrollTop > 2);
      setHasContentBelow(
        element.scrollHeight - element.scrollTop - element.clientHeight > 2,
      );
    };

    updateFades();
    element.addEventListener("scroll", updateFades, { passive: true });
    const resizeObserver = new ResizeObserver(updateFades);
    resizeObserver.observe(element);
    Array.from(element.children).forEach((child) =>
      resizeObserver.observe(child),
    );

    return () => {
      element.removeEventListener("scroll", updateFades);
      resizeObserver.disconnect();
    };
  }, [children]);

  return (
    <div className="relative h-full min-h-0">
      <div
        ref={scrollRef}
        className={`h-full min-h-0 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${className}`}
      >
        {children}
      </div>
      {hasContentAbove && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-background/85 to-transparent"
        />
      )}
      {hasContentBelow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-background/90 to-transparent"
        />
      )}
    </div>
  );
}

export function NotesApp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const noteParam = searchParams.get("id");

  const [notes, setNotes] = React.useState<LearningItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("All");
  const [selectedId, setSelectedId] = React.useState<string | null>(noteParam);
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);

  const [isAuthorized, setIsAuthorized] = React.useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [pendingAction, setPendingAction] = React.useState<
    "add" | "edit" | "delete" | null
  >(null);
  const [pendingNote, setPendingNote] = React.useState<LearningItem | null>(
    null,
  );
  const [isAdding, setIsAdding] = React.useState(false);
  const [noteToDelete, setNoteToDelete] = React.useState<LearningItem | null>(
    null,
  );
  const [isDeletingNote, setIsDeletingNote] = React.useState(false);
  const [isReviewing, setIsReviewing] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const [reviewIndex, setReviewIndex] = React.useState(0);
  const [isAnswerVisible, setIsAnswerVisible] = React.useState(false);
  const [rememberedIds, setRememberedIds] = React.useState<Set<string>>(
    new Set(),
  );

  const fetchNotes = React.useCallback(async () => {
    try {
      const res = await fetch("/api/notes");
      const data: LearningItem[] = await res.json();
      const sorted = [...data].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      setNotes(sorted);

      setSelectedId((current) => {
        if (current && sorted.some((n) => n.id === current)) return current;
        if (noteParam && sorted.some((n) => n.id === noteParam))
          return noteParam;
        return sorted[0]?.id ?? null;
      });
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    } finally {
      setLoading(false);
    }
  }, [noteParam]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    setIsAuthorized(!!localStorage.getItem("brain_key"));
    try {
      const stored = JSON.parse(
        localStorage.getItem("notes_remembered") || "[]",
      );
      if (Array.isArray(stored))
        setRememberedIds(
          new Set(stored.filter((id): id is string => typeof id === "string")),
        );
    } catch {
      setRememberedIds(new Set());
    }
  }, []);

  React.useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  React.useEffect(() => {
    if (noteParam) {
      setSelectedId(noteParam);
    }
  }, [noteParam]);

  React.useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  React.useEffect(() => {
    if (!noteParam || loading) return;
    requestAnimationFrame(() => {
      document.getElementById(`note-${noteParam}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [loading, noteParam]);

  const categories = React.useMemo(
    () => ["All", ...Array.from(new Set(notes.map((note) => note.category)))],
    [notes],
  );
  const categoryOptions = React.useMemo(
    () => categories.filter((category) => category !== "All"),
    [categories],
  );
  const activeCategoryAccent = React.useMemo(() => {
    const note = notes.find((item) => item.category === categoryFilter);
    return note ? getNoteAccent(note).hex : undefined;
  }, [notes, categoryFilter]);

  const filteredNotes = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return notes.filter((note) => {
      const matchesCategory =
        categoryFilter === "All" || note.category === categoryFilter;
      const matchesQuery =
        !query ||
        [note.title, note.content, note.code ?? "", note.category].some(
          (text) => text.toLowerCase().includes(query),
        );
      return matchesCategory && matchesQuery;
    });
  }, [notes, searchQuery, categoryFilter]);

  const showSearchResults = isSearchFocused && !!searchQuery.trim();
  const reviewNote = filteredNotes.length
    ? filteredNotes[reviewIndex % filteredNotes.length]
    : null;

  const advanceReview = () => {
    setIsAnswerVisible(false);
    setReviewIndex((index) =>
      filteredNotes.length ? (index + 1) % filteredNotes.length : 0,
    );
  };

  const markRemembered = () => {
    if (!reviewNote) return;
    const next = new Set(rememberedIds);
    next.add(reviewNote.id);
    setRememberedIds(next);
    localStorage.setItem("notes_remembered", JSON.stringify([...next]));
    advanceReview();
  };

  const selectNote = (note: LearningItem) => {
    setEditingId(null);
    setSelectedId(note.id);
    setSearchQuery("");
    setIsSearchFocused(false);
    router.replace(`/notes?id=${note.id}`, { scroll: false });
  };

  const requireAuth = (
    action: "add" | "edit" | "delete",
    note?: LearningItem | null,
  ) => {
    if (isAuthorized) {
      if (action === "add") setIsAdding(true);
      if (action === "edit" && note) setEditingId(note.id);
      if (action === "delete" && note) setNoteToDelete(note);
      return;
    }
    setPendingAction(action);
    setPendingNote(note ?? null);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthorized(true);
    setIsAuthModalOpen(false);
    if (pendingAction === "add") setIsAdding(true);
    if (pendingAction === "edit" && pendingNote) setEditingId(pendingNote.id);
    if (pendingAction === "delete" && pendingNote) setNoteToDelete(pendingNote);
    setPendingAction(null);
    setPendingNote(null);
  };

  const handleConfirmDelete = async () => {
    if (!noteToDelete) return;
    setIsDeletingNote(true);

    try {
      const passkey = localStorage.getItem("brain_key") || "";
      const res = await fetch(`/api/notes?id=${noteToDelete.id}`, {
        method: "DELETE",
        headers: { "x-admin-passkey": passkey },
      });

      if (res.ok) {
        const deletedId = noteToDelete.id;
        setNotes((prev) => prev.filter((n) => n.id !== deletedId));
        setNoteToDelete(null);
        setEditingId(null);

        const remaining = notes.filter((n) => n.id !== deletedId);
        const nextSelected = remaining[0]?.id ?? null;
        setSelectedId(nextSelected);
        router.replace(nextSelected ? `/notes?id=${nextSelected}` : "/notes", {
          scroll: false,
        });
      } else {
        setIsAuthorized(false);
        localStorage.removeItem("brain_key");
        alert("Unauthorized! Your passkey may have expired.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeletingNote(false);
    }
  };

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-background text-foreground">
      <header className="pointer-events-none absolute inset-x-0 top-2 z-20 flex w-full justify-end px-4 py-1.5 sm:px-5 lg:px-8 lg:py-3">
        <div className="pointer-events-auto flex max-w-full items-center gap-0.5 rounded-full border border-border/50 bg-background/65 p-1.5 shadow-lg shadow-black/10 backdrop-blur-xl">
          <div
            className={`relative flex h-8 items-center overflow-visible rounded-full transition-[width,background-color] duration-300 ease-out ${isSearchOpen ? "w-[min(calc(100vw-4rem),16rem)] bg-muted/70 sm:w-64" : "w-8"}`}
          >
            {!isSearchOpen ? (
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search notes"
                title="Search notes"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Search className="h-3.5 w-3.5" />
              </button>
            ) : (
              <>
                <Search className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setSearchQuery("");
                      setIsSearchFocused(false);
                      setIsSearchOpen(false);
                    }
                    if (
                      event.key === "Enter" &&
                      searchQuery.trim() &&
                      filteredNotes[0]
                    ) {
                      selectNote(filteredNotes[0]);
                      setIsSearchOpen(false);
                    }
                  }}
                  placeholder="Search notes..."
                  aria-label="Search notes by title, content, code, or category"
                  aria-expanded={showSearchResults}
                  className="h-8 min-w-0 flex-1 bg-transparent pl-8 pr-1 text-base text-foreground outline-none placeholder:text-muted-foreground/70 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearchFocused(false);
                    setIsSearchOpen(false);
                  }}
                  aria-label="Close search"
                  title="Close search"
                  className="mr-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </>
            )}
            {isSearchOpen && showSearchResults && (
              <div
                role="listbox"
                aria-label="Matching notes"
                className="absolute left-0 top-full z-30 mt-2 max-h-[min(60vh,24rem)] w-[min(88vw,24rem)] overflow-y-auto rounded-xl border border-border/70 bg-card p-1.5 shadow-xl shadow-black/20"
              >
                {filteredNotes.length ? (
                  filteredNotes.map((note) => {
                    const accent = getNoteAccent(note);
                    const preview = note.content.replace(/\s+/g, " ").trim();
                    return (
                      <button
                        key={note.id}
                        type="button"
                        role="option"
                        aria-selected={note.id === selectedId}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => {
                          selectNote(note);
                          setIsSearchOpen(false);
                        }}
                        className="w-full rounded-lg px-3 py-2.5 text-left hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ backgroundColor: accent.hex }}
                          />
                          <span className="truncate text-sm font-medium text-foreground">
                            {note.title}
                          </span>
                          <span
                            className="ml-auto shrink-0 text-[11px]"
                            style={{ color: accent.hex }}
                          >
                            {note.category}
                          </span>
                        </span>
                        <span className="mt-1 block truncate pl-4 text-xs text-muted-foreground">
                          {preview || "No preview available"}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <p className="px-3 py-5 text-center text-sm text-muted-foreground">
                    No notes match &ldquo;{searchQuery.trim()}&rdquo;.
                  </p>
                )}
              </div>
            )}
          </div>
          <div className={`group relative flex items-center ${isSearchOpen ? "hidden sm:flex" : ""}`}>
            <button
              type="button"
              onClick={() => setIsCategoryOpen((open) => !open)}
              aria-label="Filter by category"
              aria-expanded={isCategoryOpen}
              title="Filter by category"
              className={`flex h-8 items-center justify-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${categoryFilter !== "All" ? "rounded-l-full border-y border-l border-border/60 bg-muted/70 pl-2.5 pr-1 text-foreground" : "w-8 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"}`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              {categoryFilter !== "All" && (
                <span className="inline-flex max-w-28 items-center gap-1.5 truncate text-xs font-medium">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: activeCategoryAccent ?? "currentColor" }}
                    aria-hidden="true"
                  />
                  <span className="truncate">{categoryFilter}</span>
                </span>
              )}
            </button>
            {categoryFilter !== "All" && (
              <button
                type="button"
                onClick={() => {
                  setCategoryFilter("All");
                  setReviewIndex(0);
                  setIsAnswerVisible(false);
                  setIsCategoryOpen(false);
                }}
                aria-label={`Clear ${categoryFilter} filter`}
                title="Clear category filter"
                className="flex h-8 w-7 items-center justify-center rounded-r-full border-y border-r border-border/60 bg-muted/70 pr-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            <div
              className={`absolute left-1/2 top-full z-30 mt-1.5 w-56 -translate-x-1/2 rounded-xl border border-border/70 bg-card p-1.5 shadow-xl shadow-black/20 ${isCategoryOpen ? "block" : "hidden"}`}
              aria-label="Filter notes by category"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={categoryFilter === category}
                  onClick={() => {
                    setCategoryFilter(category);
                    setReviewIndex(0);
                    setIsAnswerVisible(false);
                    setIsCategoryOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors ${categoryFilter === category ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                >
                  <span>{category}</span>
                  {categoryFilter === category && (
                    <Check className="h-3.5 w-3.5" />
                  )}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsReviewing((value) => !value);
              setIsAnswerVisible(false);
              setReviewIndex(0);
            }}
            aria-pressed={isReviewing}
            aria-label={isReviewing ? "Exit review" : "Review notes"}
            title={isReviewing ? "Exit review" : "Review notes"}
            className={`${isSearchOpen ? "hidden sm:flex" : "flex"} h-8 w-8 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isReviewing ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
          >
            <Brain className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => requireAuth("add")}
            aria-label="Create a new note"
            title="Create a new note"
            className={`${isSearchOpen ? "hidden sm:flex" : "flex"} h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
          >
            <Plus className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-hidden">
        <div className="mx-auto h-full max-w-4xl overflow-hidden px-5 py-4 sm:px-10 sm:py-5 lg:px-14">
          <main className="h-full min-h-0 min-w-0">
            <ScrollFadeArea>
              <div className="mx-auto max-w-4xl space-y-3 pb-4 pt-16 sm:pb-5 sm:pt-20">
                {loading ? (
                  <p className="py-16 text-center text-sm text-muted-foreground">
                    Loading notes...
                  </p>
                ) : isReviewing ? (
                  reviewNote ? (
                    <section
                      className="mx-auto max-w-2xl rounded-3xl border border-border/60 bg-card/60 p-6 shadow-xl shadow-black/10 sm:p-10"
                      aria-label="Note review card"
                    >
                      <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                        <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                          {reviewNote.category}
                        </span>
                        <span>
                          {(reviewIndex % filteredNotes.length) + 1} /{" "}
                          {filteredNotes.length} · {rememberedIds.size}{" "}
                          remembered
                        </span>
                      </div>
                      <h1 className="mt-8 text-2xl font-bold leading-tight tracking-tight font-heading sm:text-3xl">
                        {reviewNote.title}
                      </h1>
                      <div className="mt-7 min-h-36 rounded-2xl border border-border/50 bg-background/50 p-5 sm:p-6">
                        {isAnswerVisible ? (
                          <>
                            <p className="whitespace-pre-wrap text-sm leading-7 text-foreground/85 sm:text-base">
                              {reviewNote.content ||
                                "This note has no written explanation."}
                            </p>
                            {reviewNote.code && (
                              <pre className="mt-5 overflow-x-auto rounded-xl bg-background p-4 text-xs leading-6 text-foreground/85">
                                <code>{reviewNote.code}</code>
                              </pre>
                            )}
                          </>
                        ) : (
                          <div className="flex min-h-24 flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
                            <Eye className="h-5 w-5" />
                            <span>
                              Try to recall the key idea before revealing the
                              note.
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setIsAnswerVisible(false);
                            setReviewIndex(
                              (index) =>
                                (index - 1 + filteredNotes.length) %
                                filteredNotes.length,
                            );
                          }}
                          className="inline-flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </button>
                        {!isAnswerVisible ? (
                          <button
                            type="button"
                            onClick={() => setIsAnswerVisible(true)}
                            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:opacity-85"
                          >
                            <Eye className="h-4 w-4" />
                            Show answer
                          </button>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={advanceReview}
                              className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
                            >
                              Review again{" "}
                              <ChevronRight className="ml-1 inline h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={markRemembered}
                              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
                            >
                              <Check className="h-4 w-4" />
                              Remembered
                            </button>
                          </div>
                        )}
                      </div>
                    </section>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                      No notes match the current search or category. Clear a
                      filter to review your notes.
                    </div>
                  )
                ) : filteredNotes.length > 0 ? (
                  filteredNotes.map((note) => (
                    <NoteDetail
                      key={note.id}
                      note={note}
                      categoryOptions={categoryOptions}
                      isEditing={editingId === note.id}
                      onStartEdit={(item) => requireAuth("edit", item)}
                      onCancelEdit={() => setEditingId(null)}
                      onDelete={(item) => requireAuth("delete", item)}
                      onSaved={fetchNotes}
                    />
                  ))
                ) : (
                  <p className="py-16 text-center text-sm text-muted-foreground">
                    {searchQuery.trim()
                      ? `No notes match "${searchQuery.trim()}".`
                      : "No notes to display."}
                  </p>
                )}
              </div>
            </ScrollFadeArea>
          </main>
        </div>
      </div>

      <AddNoteForm
        categoryOptions={categoryOptions}
        forceOpen={isAdding}
        onClose={() => setIsAdding(false)}
        onSuccess={fetchNotes}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setPendingAction(null);
          setPendingNote(null);
        }}
        onSuccess={handleAuthSuccess}
      />

      <DeleteConfirmationModal
        isOpen={!!noteToDelete}
        note={noteToDelete}
        onClose={() => setNoteToDelete(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeletingNote}
      />
    </div>
  );
}
