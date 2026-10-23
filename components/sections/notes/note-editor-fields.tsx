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
    <div className="space-y-5">
      <label className="block space-y-2">
        <span className="text-xs font-medium text-muted-foreground">Title</span>
        <input
          required
          autoFocus={autoFocusTitle}
          placeholder="Give your note a clear title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full rounded-full border border-border bg-background/60 px-5 py-2.5 text-base font-semibold tracking-tight text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-ring/20"
        />
      </label>

      <fieldset className="space-y-2">
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
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isSelected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-foreground hover:bg-muted",
                )}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-muted-foreground">Accent color</legend>
        <div className="flex items-center gap-3">
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

      <label className="block space-y-2">
        <span className="text-xs font-medium text-muted-foreground">Content</span>
        <textarea
          required
          rows={14}
          placeholder={
            "Write your note...\n\nUse ``` for code blocks:\n\n```javascript\nfunction example() {}\n```"
          }
          value={body}
          onChange={(e) => onBodyChange(e.target.value)}
          className="min-h-60 w-full resize-y rounded-2xl border border-border bg-background/60 px-3.5 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-ring/20 font-mono"
        />
      </label>
    </div>
  );
}
