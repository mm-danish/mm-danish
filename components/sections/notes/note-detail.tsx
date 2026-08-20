"use client";

import * as React from "react";
import { ArrowLeft, Copy, Check, Pencil, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
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
  note: LearningItem | null;
  isEditing: boolean;
  onBack: () => void;
  onStartEdit: (note: LearningItem) => void;
  onCancelEdit: () => void;
  onDelete: (note: LearningItem) => void;
  onSaved: () => void;
  showBack?: boolean;
}

const DEFAULT_COLOR = NOTE_ACCENT_COLORS[3].hex;

function formatLongDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function NoteDetail({
  note,
  isEditing,
  onBack,
  onStartEdit,
  onCancelEdit,
  onDelete,
  onSaved,
  showBack = false,
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

  if (!note) {
    return (
      <div className="hidden md:flex h-full flex-1 items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">
          Select a note to read it here.
        </p>
      </div>
    );
  }

  const accent = getNoteAccent(note);

  return (
    <div className="flex h-full flex-1 flex-col bg-background min-w-0">
      <div className="flex items-center justify-between px-4 sm:px-10 pt-5 sm:pt-7 pb-3">
        <button
          onClick={onBack}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
            !showBack && "invisible",
          )}
          aria-label="Back to notes"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-1">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={onCancelEdit}
                className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving || !title.trim() || !body.trim()}
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-85 disabled:opacity-40"
              >
                {isSaving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Save
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onStartEdit(note)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Edit note"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(note)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-red-500/15 hover:text-red-400"
                aria-label="Delete note"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-5 sm:px-10 lg:px-14 pb-16">
        <div className="mx-auto max-w-2xl pt-2 sm:pt-4">
          {isEditing ? (
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
          ) : (
            <>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading text-foreground leading-tight">
                {note.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2.5">
                <p className="text-sm text-muted-foreground">
                  {formatLongDate(note.date)}
                </p>
                <span
                  className="text-xs text-muted-foreground"
                  style={{ color: accent.hex }}
                >
                  #{note.category.toLowerCase().replace(/\s+/g, "")}
                </span>
              </div>

              <p className="mt-8 text-[15px] sm:text-base leading-relaxed text-foreground/85 whitespace-pre-wrap">
                {note.content}
              </p>

              {note.code && (
                <div className="mt-8 overflow-hidden rounded-lg border border-border">
                  <div className="flex items-center justify-between px-3 py-2 bg-zinc-900 border-b border-white/5">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                      <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                      <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                    </div>
                    <button
                      onClick={() => copyCode(note.code!)}
                      className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-zinc-950">
                    <MiniHighlighter code={note.code} />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
