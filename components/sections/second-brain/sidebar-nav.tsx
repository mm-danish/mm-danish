"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/cn";
import type { LearningItem, CategoryMeta } from "@/data/learning";
import { getCategoryColor } from "@/data/learning";

interface SidebarNavProps {
  categories: CategoryMeta[];
  notes: LearningItem[];
  activeCategory?: string;
  onNavigate: (categoryName: string, noteId?: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
}

export function SidebarNav({
  categories,
  notes,
  activeCategory,
  onNavigate,
  isOpenMobile,
  onCloseMobile,
  isCollapsed = false,
  onToggleCollapse,
}: SidebarNavProps) {
  const [expandedCategories, setExpandedCategories] = React.useState<
    Set<string>
  >(new Set(categories.map((c) => c.name)));

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

      {/* Sidebar - Hidden on desktop when collapsed, always hidden on mobile when not open */}
      <aside
        className={cn(
          "h-screen flex-col bg-background/50 backdrop-blur-md transition-all duration-300",
          // Desktop styles - card appearance
          "md:sticky md:top-0 md:flex md:group/sidebar md:m-3 md:my-4 md:rounded-xl md:border md:border-border/40 md:shadow-sm md:h-[calc(100vh-2rem)] md:w-64",
          // Hide when collapsed on desktop
          isCollapsed && "md:hidden",
          // Mobile styles (fixed drawer)
          "fixed inset-y-0 left-0 z-50 w-64 rounded-r-xl shadow-lg md:shadow-none transform",
          isOpenMobile ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Top collapse button */}
          <div className="absolute top-3 right-3 z-40">
            <button
              onClick={() => onToggleCollapse?.(true)}
              className="h-8 w-8 rounded-full border border-border/50 bg-background/80 backdrop-blur flex items-center justify-center hover:bg-muted/70 transition-shadow shadow-sm"
              aria-label="Collapse sidebar"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6 custom-scrollbar">
            {categories.map((category) => {
              const categoryNotes = notes.filter(
                (n) => n.category === category.name,
              );
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
                      "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                      isActive
                        ? "text-foreground font-semibold bg-accent/10 hover:bg-accent/15 shadow-none"
                        : "text-foreground/60 font-medium hover:text-foreground hover:bg-muted/40",
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
                      <span className="truncate tracking-tight">
                        {category.name}
                      </span>
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-muted/60 px-1.5 text-[10px] font-semibold text-muted-foreground/60">
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
                          className="flex w-full rounded-lg px-3 py-2 text-left text-xs transition-all duration-150 hover:bg-muted/50 hover:shadow-sm"
                        >
                          <span className="line-clamp-1 text-foreground/50 hover:text-foreground font-medium">
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
        </div>
      </aside>

      {/* Expand button - fixed position when collapsed */}
      {isCollapsed && (
        <div className="fixed top-4 left-4 z-60">
          <button
            onClick={() => onToggleCollapse?.(false)}
            className="h-10 w-10 rounded-full border border-border/60 bg-background/90 backdrop-blur flex items-center justify-center hover:bg-muted/80 shadow-lg"
            aria-label="Expand sidebar"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  );
}
