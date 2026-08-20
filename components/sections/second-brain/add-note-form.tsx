"use client";

import * as React from "react";
import { X, Loader2 } from "lucide-react";
import {
  NOTE_ACCENT_COLORS,
  combineNoteBody,
  splitNoteBody,
  type LearningCategory,
  type LearningItem,
} from "@/data/learning";
import { NoteEditorFields } from "@/components/sections/notes/note-editor-fields";

interface AddNoteFormProps {
  noteToEdit?: LearningItem | null;
  forceOpen?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
}

const DEFAULT_COLOR = NOTE_ACCENT_COLORS[3].hex;

export function AddNoteForm({
  noteToEdit,
  forceOpen,
  onClose,
  onSuccess,
}: AddNoteFormProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [noteId, setNoteId] = React.useState<string | undefined>();
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState<LearningCategory>("Node.js");
  const [accentColor, setAccentColor] = React.useState<string>(DEFAULT_COLOR);
  const [body, setBody] = React.useState("");

  const resetForm = React.useCallback(() => {
    setNoteId(undefined);
    setTitle("");
    setCategory("Node.js");
    setAccentColor(DEFAULT_COLOR);
    setBody("");
  }, []);

  React.useEffect(() => {
    if (!noteToEdit) return;
    setNoteId(noteToEdit.id);
    setTitle(noteToEdit.title);
    setCategory(noteToEdit.category);
    setAccentColor(noteToEdit.color ?? DEFAULT_COLOR);
    setBody(combineNoteBody(noteToEdit.content, noteToEdit.code));
    setIsOpen(true);
  }, [noteToEdit]);

  React.useEffect(() => {
    if (forceOpen) setIsOpen(true);
  }, [forceOpen]);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    resetForm();
    onClose?.();
  }, [onClose, resetForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { content, code } = splitNoteBody(body);

    const submissionData = {
      id: noteId,
      category,
      title: title.trim(),
      content,
      code: code ?? "",
      color: accentColor,
    };

    try {
      const passkey = localStorage.getItem("brain_key") || "";
      const res = await fetch("/api/notes", {
        method: noteId ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passkey": passkey,
        },
        body: JSON.stringify(submissionData),
      });

      if (res.status === 401) {
        alert("Unauthorized! Your passkey might have expired.");
        localStorage.removeItem("brain_key");
        return;
      }

      if (res.ok) {
        handleClose();
        onSuccess ? onSuccess() : window.location.reload();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/60"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-note-title"
        className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <h2
            id="new-note-title"
            className="text-sm font-medium text-foreground"
          >
            {noteId ? "Edit Note" : "New Note"}
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-4">
            <NoteEditorFields
              title={title}
              onTitleChange={setTitle}
              category={category}
              onCategoryChange={setCategory}
              accentColor={accentColor}
              onAccentColorChange={setAccentColor}
              body={body}
              onBodyChange={setBody}
              autoFocusTitle
            />
          </div>

          <div className="flex items-center justify-end gap-3 px-4 py-3">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !body.trim()}
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-85 disabled:opacity-40"
            >
              {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
