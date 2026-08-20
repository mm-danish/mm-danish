"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { LearningItem } from "@/data/learning";
import { NoteSidebar } from "./note-sidebar";
import { NoteDetail } from "./note-detail";
import { AddNoteForm } from "@/components/sections/second-brain/add-note-form";
import { AuthModal } from "@/components/sections/second-brain/auth-modal";
import { DeleteConfirmationModal } from "@/components/sections/second-brain/delete-confirmation-modal";
import { cn } from "@/lib/cn";

export function NotesApp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const noteParam = searchParams.get("id");

  const [notes, setNotes] = React.useState<LearningItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedId, setSelectedId] = React.useState<string | null>(noteParam);
  const [mobileShowDetail, setMobileShowDetail] = React.useState(!!noteParam);
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
      setMobileShowDetail(true);
    }
  }, [noteParam]);

  const filteredNotes = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return notes;

    return notes.filter((note) =>
      [note.title, note.content, note.category].some((text) =>
        text.toLowerCase().includes(query),
      ),
    );
  }, [notes, searchQuery]);

  const selectedNote =
    filteredNotes.find((n) => n.id === selectedId) ??
    notes.find((n) => n.id === selectedId) ??
    null;

  const selectNote = (note: LearningItem) => {
    setEditingId(null);
    setSelectedId(note.id);
    setMobileShowDetail(true);
    router.replace(`/notes?id=${note.id}`, { scroll: false });
  };

  const handleBack = () => {
    setEditingId(null);
    setMobileShowDetail(false);
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
        setMobileShowDetail(false);

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
    <div className="notes-shell flex h-screen overflow-hidden bg-background">
      <div
        className={cn(
          "h-full w-full md:w-auto md:block",
          mobileShowDetail ? "hidden md:block" : "block",
        )}
      >
        <NoteSidebar
          notes={filteredNotes}
          selectedId={selectedId}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelect={selectNote}
          onNewNote={() => requireAuth("add")}
          loading={loading}
        />
      </div>

      <div
        className={cn(
          "h-full flex-1 min-w-0",
          mobileShowDetail ? "block" : "hidden md:block",
        )}
      >
        <NoteDetail
          note={selectedNote}
          isEditing={!!selectedNote && editingId === selectedNote.id}
          onBack={handleBack}
          onStartEdit={(note) => requireAuth("edit", note)}
          onCancelEdit={() => setEditingId(null)}
          onDelete={(note) => requireAuth("delete", note)}
          onSaved={fetchNotes}
          showBack={mobileShowDetail}
        />
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
