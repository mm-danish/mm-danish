'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { LearningItem, CategoryMeta } from '@/data/learning';
import { getCategoryColor } from '@/data/learning';

interface SidebarNavProps {
  categories: CategoryMeta[];
  notes: LearningItem[];
  activeCategory?: string;
  onNavigate: (categoryName: string, noteId?: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export function SidebarNav({
  categories,
  notes,
  activeCategory,
  onNavigate,
  isOpenMobile,
  onCloseMobile
}: SidebarNavProps) {
  const [expandedCategories, setExpandedCategories] = React.useState<Set<string>>(
    new Set(categories.map(c => c.name))
  );
  const [isCollapsed, setIsCollapsed] = React.useState(false);

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
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpenMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseMobile}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={cn(
        "h-screen flex-col border-r border-border/40 bg-background/95 md:bg-muted/5 backdrop-blur-sm transition-all duration-300",
        // Desktop styles
        "md:sticky md:top-0 md:flex md:relative md:group/sidebar",
        isCollapsed ? "md:w-4" : "md:w-64",
        // Mobile styles (fixed drawer)
        "fixed inset-y-0 left-0 z-50 w-64 shadow-2xl md:shadow-none transform",
        isOpenMobile ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
      <AnimatePresence mode="wait">
        {!isCollapsed && (
          <motion.div
            key="sidebar-content"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-full overflow-hidden"
          >
            {/* Navigation Items */}
            <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6 custom-scrollbar">
              {categories.map((category) => {
                const categoryNotes = notes.filter(n => n.category === category.name);
                if (categoryNotes.length === 0) return null;

                const isExpanded = expandedCategories.has(category.name);
                const isActive = activeCategory === category.name;
                const accent = getCategoryColor(category.name);

                return (
                  <div key={category.name} className="space-y-1.5">
                    {/* Category Header */}
                    <button
                      onClick={() => {
                        toggleCategory(category.name);
                        onNavigate(category.name);
                        onCloseMobile?.();
                      }}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm transition-all duration-200",
                        isActive
                          ? "text-foreground font-bold bg-muted/80 shadow-sm"
                          : "text-foreground/50 font-medium hover:text-foreground hover:bg-muted/30"
                      )}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {/* Spatial: glowing category-color dot on active */}
                        {isActive && (
                          <span
                            className="shrink-0 h-1.5 w-1.5 rounded-full"
                            style={{
                              backgroundColor: accent.hex,
                              boxShadow: `0 0 6px 2px ${accent.hex}70`,
                            }}
                          />
                        )}
                        <span className="truncate tracking-tight">{category.name}</span>
                        <span className="flex h-3.5 min-w-[1rem] items-center justify-center rounded-full bg-muted/50 px-1 text-[9px] font-bold text-muted-foreground/40">
                          {categoryNotes.length}
                        </span>
                      </div>
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
                            onClick={() => {
                              onNavigate(category.name, note.id);
                              onCloseMobile?.();
                            }}
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          "absolute -right-3 bottom-12 z-50 h-6 w-6 rounded-full border border-border bg-background flex items-center justify-center hover:bg-muted transition-all shadow-sm group-hover/sidebar:opacity-100",
          isCollapsed ? "opacity-100 -right-3" : "opacity-0"
        )}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>
    </aside>
    </>
  );
}
