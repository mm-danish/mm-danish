'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import type { LearningItem, CategoryMeta } from '@/data/learning';

interface SidebarNavProps {
  categories: CategoryMeta[];
  notes: LearningItem[];
  activeCategory?: string;
  onNavigate: (categoryName: string, noteId?: string) => void;
}

export function SidebarNav({
  categories,
  notes,
  activeCategory,
  onNavigate
}: SidebarNavProps) {
  const [expandedCategories, setExpandedCategories] = React.useState<Set<string>>(
    new Set(categories.map(c => c.name))
  );

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <aside className="sticky top-24 hidden h-[calc(100vh-8rem)] w-64 flex-col overflow-y-auto border-r border-border/40 bg-background md:flex">
      <div className="flex flex-col h-full">
        {/* Navigation Items */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-4">
          {categories.map((category) => {
            const categoryNotes = notes.filter(n => n.category === category.name);
            if (categoryNotes.length === 0) return null;

            const isExpanded = expandedCategories.has(category.name);
            const isActive = activeCategory === category.name;

            return (
              <div key={category.name} className="space-y-1.5">
                {/* Category Header */}
                <button
                  onClick={() => {
                    toggleCategory(category.name);
                    onNavigate(category.name);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm transition-all duration-200",
                    isActive
                      ? "text-foreground font-bold bg-muted/80 shadow-sm"
                      : "text-foreground/50 font-medium hover:text-foreground hover:bg-muted/30"
                  )}
                >
                  <span className="truncate tracking-tight">{category.name}</span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    className="ml-2 shrink-0 opacity-20"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </button>

                {/* Notes List */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mx-2 mt-1 space-y-0.5"
                  >
                    {categoryNotes.map((note) => (
                      <button
                        key={note.id}
                        onClick={() => onNavigate(category.name, note.id)}
                        className="flex w-full rounded-md px-3 py-1.5 text-left text-xs transition-all duration-150"
                      >
                        <span className="line-clamp-1 text-foreground/40 hover:text-foreground/80 font-medium">
                          {note.title}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}

      </div>
    </aside>
  );
}
