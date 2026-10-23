"use client";

import * as React from "react";
import { Copy, Check, Pencil, Trash2, Loader2 } from "lucide-react";
import {
  getNoteAccent,
  getCategoryColor,
  combineNoteBody,
  splitNoteBody,
  NOTE_ACCENT_COLORS,
  type LearningItem,
  type LearningCategory,
} from "@/data/learning";
import { MiniHighlighter } from "@/components/sections/second-brain/mini-highlighter";
import { NoteEditorFields } from "./note-editor-fields";

interface NoteDetailProps {
  note: LearningItem;
  isEditing: boolean;
  onStartEdit: (note: LearningItem) => void;
  onCancelEdit: () => void;
  onDelete: (note: LearningItem) => void;
  onSaved: () => void;
}

const DEFAULT_COLOR = NOTE_ACCENT_COLORS[3].hex;

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
  const [accentColor, setAccentColor] = React.useState<string>(DEFAULT_COLOR);
  const [body, setBody] = React.useState("");

  React.useEffect(() => {
    if (!note || !isEditing) return;
    setTitle(note.title);
    setCategory(note.category);
    setAccentColor(note.color ?? getCategoryColor(note.category).hex);
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
          category,
          title: title.trim(),
          content,
          code: code ?? "",
          color: accentColor,
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
      className="min-w-0 scroll-mt-8 rounded-2xl bg-card/60 p-5 shadow-sm shadow-black/10 sm:p-7"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        {!isEditing && (
          <div className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1">
            <span
              className="rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em]"
              style={{
                color: accent.hex,
                backgroundColor: `${accent.hex}18`,
              }}
            >
              {note.category}
            </span>
            <p className="text-[10px] text-muted-foreground/75">
              {formatLongDate(note.date)}
            </p>
          </div>
        )}
        <div className="flex items-center gap-2">
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
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Edit note"
                title="Edit note"
              >
                <Pencil className="h-3.5 w-3.5" strokeWidth={1.7} />
              </button>
              <button
                onClick={() => onDelete(note)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted hover:text-rose-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Delete note"
                title="Delete note"
              >
                <Trash2 className="h-3.5 w-3.5" strokeWidth={1.7} />
              </button>
            </>
          )}
        </div>
      </div>

      <div>
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
              accentColor={accentColor}
              onAccentColorChange={setAccentColor}
              body={body}
              onBodyChange={setBody}
              autoFocusTitle
            />
          </section>
        ) : (
          <>
            <h2 className="mt-2 text-lg font-semibold tracking-tight font-heading text-foreground leading-snug sm:text-xl">
              {note.title}
            </h2>

            <p className="mt-6 max-w-prose whitespace-pre-wrap text-sm leading-7 text-foreground/80 sm:text-[15px]">
              {note.content}
            </p>

            {note.code && (
              <div className="mt-6 overflow-hidden rounded-xl bg-background/70 shadow-sm shadow-black/10 ring-1 ring-white/[0.05]">
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
