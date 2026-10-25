"use client";

import * as React from "react";
import { ChevronDown, Plus } from "lucide-react";
import {
  CATEGORIES,
  type LearningCategory,
} from "@/data/learning";

interface NoteEditorFieldsProps {
  title: string;
  onTitleChange: (value: string) => void;
  category: LearningCategory;
  onCategoryChange: (value: LearningCategory) => void;
  categoryOptions?: string[];
  body: string;
  onBodyChange: (value: string) => void;
  autoFocusTitle?: boolean;
}

export function NoteEditorFields({
  title,
  onTitleChange,
  category,
  onCategoryChange,
  categoryOptions = [],
  body,
  onBodyChange,
  autoFocusTitle,
}: NoteEditorFieldsProps) {
  const contentRef = React.useRef<HTMLTextAreaElement>(null);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = React.useState(false);
  const categorySuggestions = Array.from(
    new Set([...CATEGORIES.map((item) => item.name), ...categoryOptions]),
  ).filter((option) => option.toLowerCase().includes(category.trim().toLowerCase()));
  const isExistingCategory = [...CATEGORIES.map((item) => item.name), ...categoryOptions]
    .some((option) => option.toLowerCase() === category.trim().toLowerCase());

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
        <div className="relative">
          <input
            required
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={isCategoryMenuOpen}
            aria-controls="note-category-options"
            value={category}
            onFocus={() => setIsCategoryMenuOpen(true)}
            onBlur={() => setIsCategoryMenuOpen(false)}
            onChange={(event) => {
              onCategoryChange(event.target.value);
              setIsCategoryMenuOpen(true);
            }}
            placeholder="Choose or add a category"
            className="w-full rounded-xl border border-border/70 bg-transparent px-3.5 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/50"
          />
          <ChevronDown className={`pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-transform ${isCategoryMenuOpen ? "rotate-180" : ""}`} />
          {isCategoryMenuOpen && (categorySuggestions.length > 0 || category.trim()) && (
            <div id="note-category-options" role="listbox" className="absolute left-0 right-0 top-full z-30 mt-1.5 max-h-52 overflow-y-auto rounded-xl border border-border/70 bg-card p-1.5 shadow-xl shadow-black/20">
              {categorySuggestions.map((option) => (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={option === category}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    onCategoryChange(option);
                    setIsCategoryMenuOpen(false);
                  }}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                >
                  {option}
                </button>
              ))}
              {category.trim() && !isExistingCategory && (
                <button
                  type="button"
                  role="option"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    onCategoryChange(category.trim());
                    setIsCategoryMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-primary transition-colors hover:bg-primary/5 focus-visible:bg-primary/5 focus-visible:outline-none"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add “{category.trim()}”
                </button>
              )}
            </div>
          )}
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
