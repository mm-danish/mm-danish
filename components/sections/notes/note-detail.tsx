"use client";

import * as React from "react";
import { Copy, Check, Pencil, Trash2, Loader2 } from "lucide-react";
import {
  getNoteAccent,
  combineNoteBody,
  splitNoteBody,
  type LearningItem,
  type LearningCategory,
} from "@/data/learning";
import { MiniHighlighter } from "@/components/sections/second-brain/mini-highlighter";
import { NoteEditorFields } from "./note-editor-fields";

interface NoteDetailProps {
  note: LearningItem;
  categoryOptions?: string[];
  isEditing: boolean;
  onStartEdit: (note: LearningItem) => void;
  onCancelEdit: () => void;
  onDelete: (note: LearningItem) => void;
  onSaved: () => void;
}

function formatLongDate(date: string) {
  return new Date(date)
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    })
    .replaceAll(" ", "/");
}

export function NoteDetail({
  note,
  categoryOptions,
  isEditing,
  onStartEdit,
  onCancelEdit,
  onDelete,
  onSaved,
}: NoteDetailProps) {
  const [copied, setCopied] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState<LearningCategory>("Node.js");
  const [body, setBody] = React.useState("");

  React.useEffect(() => {
    if (!note || !isEditing) return;
    setTitle(note.title);
    setCategory(note.category);
    setBody(combineNoteBody(note.content, note.code));
  }, [note, isEditing]);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    if (!note) return;
    setIsSaving(true);

    const { content, code } = splitNoteBody(body);

    try {
      const passkey = localStorage.getItem("brain_key") || "";
      const res = await fetch("/api/notes", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passkey": passkey,
        },
        body: JSON.stringify({
          id: note.id,
          category: category.trim(),
          title: title.trim(),
          content,
          code: code ?? "",
        }),
      });

      if (res.status === 401) {
        alert("Unauthorized! Your passkey might have expired.");
        localStorage.removeItem("brain_key");
        return;
      }

      if (res.ok) {
        onCancelEdit();
        onSaved();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const accent = getNoteAccent(note);

  return (
    <article
      id={`note-${note.id}`}
      className="flex min-w-0 scroll-mt-6 flex-col py-4"
    >
      <div className="order-2 mt-3 flex items-center justify-start gap-2">
        {!isEditing && (
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent.hex }} aria-hidden="true" />
              {note.category}
            </span>
            <p className="text-muted-foreground/65">
              {formatLongDate(note.date)}
            </p>
          </div>
        )}
        <div className="flex items-center gap-0">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={onCancelEdit}
                className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving || !title.trim() || !body.trim()}
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-85 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {isSaving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                {isSaving ? "Saving…" : "Save changes"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onStartEdit(note)}
                className="inline-flex h-6 w-6 items-center justify-center text-muted-foreground/60 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                aria-label="Edit note"
                title="Edit note"
              >
                <Pencil className="h-3 w-3" strokeWidth={1.7} />
              </button>
              <button
                onClick={() => onDelete(note)}
                className="inline-flex h-6 w-6 items-center justify-center text-muted-foreground/60 transition-colors hover:text-rose-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                aria-label="Delete note"
                title="Delete note"
              >
                <Trash2 className="h-3 w-3" strokeWidth={1.7} />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="order-1">
        {isEditing ? (
          <section className="rounded-2xl bg-card/35 p-4 sm:p-6">
            <div className="mb-5">
              <h2 className="text-sm font-semibold text-foreground">Edit note</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Update the title, category, and content below.
              </p>
            </div>
            <NoteEditorFields
              title={title}
              onTitleChange={setTitle}
              category={category}
              onCategoryChange={setCategory}
              categoryOptions={categoryOptions}
              body={body}
              onBodyChange={setBody}
              autoFocusTitle
            />
          </section>
        ) : (
          <>
            <h2 className="text-2xl font-bold tracking-tight font-heading text-foreground leading-snug sm:text-3xl">
              {note.title}
            </h2>

            <p className="mt-2 max-w-3xl whitespace-pre-wrap text-sm leading-6 text-foreground/80 sm:text-[15px]">
              {note.content}
            </p>

            {note.code && (
              <div className="mt-4 overflow-hidden rounded-lg border border-border/50 bg-background/50">
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex gap-1.5" aria-hidden="true">
                      <span className="h-2 w-2 rounded-full bg-rose-400/80" />
                      <span className="h-2 w-2 rounded-full bg-amber-300/80" />
                      <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                    </span>
                    <span className="rounded-md bg-white/[0.06] px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      JavaScript
                    </span>
                  </div>
                  <button
                    onClick={() => copyCode(note.code!)}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:bg-white/[0.08] hover:text-white"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-transparent">
                  <MiniHighlighter code={note.code} />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </article>
  );
}
