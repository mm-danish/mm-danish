"use client";

import * as React from "react";
import {
  NOTE_TAGS,
  NOTE_ACCENT_COLORS,
  type LearningCategory,
} from "@/data/learning";
import { cn } from "@/lib/cn";

interface NoteEditorFieldsProps {
  title: string;
  onTitleChange: (value: string) => void;
  category: LearningCategory;
  onCategoryChange: (value: LearningCategory) => void;
  accentColor: string;
  onAccentColorChange: (value: string) => void;
  body: string;
  onBodyChange: (value: string) => void;
  autoFocusTitle?: boolean;
}

export function NoteEditorFields({
  title,
  onTitleChange,
  category,
  onCategoryChange,
  accentColor,
  onAccentColorChange,
  body,
  onBodyChange,
  autoFocusTitle,
}: NoteEditorFieldsProps) {
  const contentRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    const textarea = contentRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [body]);

  return (
    <div className="space-y-3">
      <label className="block space-y-1.5">
        <span className="text-xs font-medium text-muted-foreground">Title</span>
        <input
          required
          autoFocus={autoFocusTitle}
          placeholder="Give your note a clear title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full rounded-xl border border-border/70 bg-transparent px-3.5 py-2.5 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/50"
        />
      </label>

      <fieldset className="space-y-1.5">
        <legend className="text-xs font-medium text-muted-foreground">Category</legend>
        <div className="flex flex-wrap gap-2">
          {NOTE_TAGS.map((tag) => {
            const isSelected = category === tag.category;
            return (
              <button
                key={tag.label}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onCategoryChange(tag.category)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40",
                  isSelected
                    ? "border-primary/50 bg-primary/5 text-primary"
                    : "border-border/70 text-muted-foreground hover:border-border hover:text-foreground",
                )}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="space-y-1.5">
        <legend className="text-xs font-medium text-muted-foreground">Accent color</legend>
        <div className="flex items-center gap-2.5">
          {NOTE_ACCENT_COLORS.map((color) => {
            const isSelected = accentColor === color.hex;
            return (
              <button
                key={color.id}
                type="button"
                aria-label={`Select ${color.id} accent`}
                aria-pressed={isSelected}
                onClick={() => onAccentColorChange(color.hex)}
                className={cn(
                  "h-5 w-5 shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isSelected && "ring-2 ring-foreground ring-offset-2 ring-offset-background",
                )}
                style={{ backgroundColor: color.hex }}
              />
            );
          })}
        </div>
      </fieldset>

      <label className="block space-y-1.5">
        <span className="text-xs font-medium text-muted-foreground">Content</span>
        <textarea
          ref={contentRef}
          required
          rows={3}
          placeholder={
            "Write your note...\n\nUse ``` for code blocks:\n\n```javascript\nfunction example() {}\n```"
          }
          value={body}
          onChange={(e) => onBodyChange(e.target.value)}
          className="min-h-28 w-full resize-none overflow-hidden rounded-xl border border-border/70 bg-transparent px-3.5 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/50 font-mono"
        />
      </label>
    </div>
  );
}
