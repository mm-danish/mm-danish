"use client";

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
  return (
    <div className="space-y-4">
      <input
        required
        autoFocus={autoFocusTitle}
        placeholder="Note title..."
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="w-full bg-transparent text-2xl sm:text-3xl font-bold text-foreground placeholder:text-muted-foreground/40 focus:outline-none tracking-tight"
      />

      <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
        {NOTE_TAGS.map((tag) => {
          const isSelected = category === tag.category;
          return (
            <button
              key={tag.label}
              type="button"
              onClick={() => onCategoryChange(tag.category)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                isSelected
                  ? "border-border bg-muted text-foreground"
                  : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/60 hover:text-foreground",
              )}
            >
              {tag.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2.5">
        {NOTE_ACCENT_COLORS.map((color) => {
          const isSelected = accentColor === color.hex;
          return (
            <button
              key={color.id}
              type="button"
              aria-label={`Select ${color.id} accent`}
              onClick={() => onAccentColorChange(color.hex)}
              className={cn(
                "h-4 w-4 shrink-0 rounded-full",
                isSelected &&
                  "ring-2 ring-foreground ring-offset-2 ring-offset-background",
              )}
              style={{ backgroundColor: color.hex }}
            />
          );
        })}
      </div>

      <textarea
        required
        rows={14}
        placeholder={
          "Write your note...\n\nUse ``` for code blocks:\n\n```javascript\nfunction example() {}\n```"
        }
        value={body}
        onChange={(e) => onBodyChange(e.target.value)}
        className="w-full min-h-60 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/40 focus:border-foreground/40 focus:outline-none resize-y font-mono"
      />
    </div>
  );
}
