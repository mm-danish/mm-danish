"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Search, X } from "lucide-react";
import { getNoteAccent, type LearningItem } from "@/data/learning";
import { NoteDetail } from "./note-detail";
import { AddNoteForm } from "@/components/sections/second-brain/add-note-form";
import { AuthModal } from "@/components/sections/second-brain/auth-modal";
import { DeleteConfirmationModal } from "@/components/sections/second-brain/delete-confirmation-modal";

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

  const filteredNotes = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return notes.filter((note) => {
      const matchesCategory =
        categoryFilter === "All" || note.category === categoryFilter;
      const matchesQuery =
        !query ||
        [note.title, note.content, note.code ?? "", note.category].some((text) =>
          text.toLowerCase().includes(query),
        );
      return matchesCategory && matchesQuery;
    });
  }, [notes, searchQuery, categoryFilter]);

  const showSearchResults = isSearchFocused && !!searchQuery.trim();

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
    <div className="notes-shell flex h-screen flex-col overflow-hidden bg-background">
      <header className="sticky top-0 z-20 mx-auto flex w-full max-w-4xl shrink-0 flex-col px-5 py-4 backdrop-blur-xl sm:px-10 sm:py-5 lg:px-14">
        <div className="flex w-full items-center gap-1 rounded-full bg-card/70 p-1 ring-1 ring-white/[0.07] transition-colors focus-within:ring-white/15 sm:gap-1.5">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setSearchQuery("");
                  setIsSearchFocused(false);
                  event.currentTarget.blur();
                }
                if (
                  event.key === "Enter" &&
                  searchQuery.trim() &&
                  filteredNotes[0]
                ) {
                  selectNote(filteredNotes[0]);
                }
              }}
              placeholder="Search your notes..."
              aria-label="Search notes by title, content, code, or category"
              aria-expanded={showSearchResults}
              className="h-10 w-full rounded-full bg-transparent pl-10 pr-10 text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
            />
            {searchQuery && (
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {showSearchResults && (
              <div
                role="listbox"
                aria-label="Matching notes"
                className="absolute left-0 right-0 top-full mt-2 max-h-[min(60vh,28rem)] overflow-y-auto rounded-2xl bg-card p-2 shadow-2xl shadow-black/40 ring-1 ring-white/10"
              >
                {filteredNotes.length > 0 ? (
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
                        onClick={() => selectNote(note)}
                        className="w-full rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
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
                  <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                    No notes match &ldquo;{searchQuery.trim()}&rdquo;.
                  </p>
                )}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => requireAuth("add")}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-foreground px-4 text-sm font-semibold text-background transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            aria-label="Create a new note"
          >
            <Plus className="h-4 w-4" strokeWidth={1.8} />
            Add
          </button>
        </div>
        <div
          className="flex flex-wrap gap-2 pt-1"
          aria-label="Filter notes by category"
        >
          {categories.map((category) => {
            const isActive = categoryFilter === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setCategoryFilter(category)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar">
        <div className="mx-auto max-w-4xl space-y-5 px-5 py-6 sm:px-10 sm:py-8 lg:px-14">
          {loading ? (
            <p className="py-16 text-center text-sm text-muted-foreground">
              Loading notes...
            </p>
          ) : filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <NoteDetail
                key={note.id}
                note={note}
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
      </div>

      <AddNoteForm
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
