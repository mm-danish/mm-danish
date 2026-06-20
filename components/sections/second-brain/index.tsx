"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Search, X, Plus, ChevronDown, Menu } from "lucide-react";
import {
  CATEGORIES,
  getCategoryColor,
  type LearningItem,
  type CategoryMeta,
} from "@/data/learning";
import { ThreadFeed } from "./thread-feed";
import { AddNoteForm } from "./add-note-form";
import { SidebarNav } from "./sidebar-nav";
import { AuthModal } from "./auth-modal";

export function SecondBrain() {
  const [notes, setNotes] = React.useState<LearningItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState<
    string | undefined
  >(undefined);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [editingNote, setEditingNote] = React.useState<LearningItem | null>(
    null,
  );
  const [isAdding, setIsAdding] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Auth state
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [pendingAction, setPendingAction] = React.useState<
    "add" | "edit" | "delete" | null
  >(null);
  const [pendingNote, setPendingNote] = React.useState<LearningItem | null>(
    null,
  );

  // Gamification state
  const [globalStats, setGlobalStats] = React.useState<{
    reveals: Record<string, number>;
    masters: Record<string, number>;
  }>({ reveals: {}, masters: {} });
  const [myMasteredNotes, setMyMasteredNotes] = React.useState<Set<string>>(
    new Set(),
  );
  const [myRevealedNotes, setMyRevealedNotes] = React.useState<Set<string>>(
    new Set(),
  );

  const mainContentRef = React.useRef<HTMLDivElement>(null);

  const readSetFromStorage = React.useCallback(
    (key: string, fallbackKey?: string) => {
      if (typeof window === "undefined") return new Set<string>();
      const raw =
        localStorage.getItem(key) ||
        (fallbackKey ? localStorage.getItem(fallbackKey) : null);
      if (!raw) return new Set<string>();

      try {
        return new Set<string>(JSON.parse(raw));
      } catch {
        return new Set<string>();
      }
    },
    [],
  );

  const writeSetToStorage = React.useCallback(
    (key: string, set: Set<string>) => {
      if (typeof window === "undefined") return;
      localStorage.setItem(key, JSON.stringify(Array.from(set)));
    },
    [],
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    setIsAuthorized(!!localStorage.getItem("brain_key"));
    setMyMasteredNotes(readSetFromStorage("myMasteredNotes", "mastered_notes"));
    setMyRevealedNotes(readSetFromStorage("myRevealedNotes", "revealed_notes"));
  }, [readSetFromStorage]);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();
        setGlobalStats(data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchStats();
  }, []);

  const totalReveals = React.useMemo(
    () =>
      Object.values(globalStats.reveals).reduce(
        (total, value) => total + value,
        0,
      ),
    [globalStats.reveals],
  );
  const totalMasters = React.useMemo(
    () =>
      Object.values(globalStats.masters).reduce(
        (total, value) => total + value,
        0,
      ),
    [globalStats.masters],
  );

  const handleMarkMastered = React.useCallback(
    (noteId: string) => {
      setMyMasteredNotes((prev) => {
        if (prev.has(noteId)) return prev;
        const next = new Set(prev);
        next.add(noteId);
        writeSetToStorage("myMasteredNotes", next);
        return next;
      });

      setMyRevealedNotes((prev) => {
        if (prev.has(noteId)) return prev;
        const next = new Set(prev);
        next.add(noteId);
        writeSetToStorage("myRevealedNotes", next);
        return next;
      });

      setGlobalStats((prev) => ({
        ...prev,
        masters: { ...prev.masters, [noteId]: (prev.masters[noteId] || 0) + 1 },
      }));

      fetch("/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteId, action: "master" }),
      }).catch(console.error);
    },
    [writeSetToStorage],
  );

  const handleReveal = React.useCallback(
    (noteId: string) => {
      setMyRevealedNotes((prev) => {
        if (prev.has(noteId)) return prev;
        const next = new Set(prev);
        next.add(noteId);
        writeSetToStorage("myRevealedNotes", next);
        return next;
      });

      setGlobalStats((prev) => ({
        ...prev,
        reveals: { ...prev.reveals, [noteId]: (prev.reveals[noteId] || 0) + 1 },
      }));

      fetch("/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteId, action: "reveal" }),
      }).catch(console.error);
    },
    [writeSetToStorage],
  );

  const handleAuthSuccess = () => {
    setIsAuthorized(true);
    setIsAuthModalOpen(false);
    if (pendingAction === "add") {
      setIsAdding(true);
    } else if (pendingAction === "edit" && pendingNote) {
      setEditingNote(pendingNote);
    } else if (pendingAction === "delete" && pendingNote) {
      handleDeleteNote(pendingNote, true);
    }
    setPendingAction(null);
    setPendingNote(null);
  };

  const handleEditNote = (note: LearningItem) => {
    if (isAuthorized) {
      setEditingNote(note);
    } else {
      setPendingNote(note);
      setPendingAction("edit");
      setIsAuthModalOpen(true);
    }
  };

  const handleDeleteNote = async (
    note: LearningItem,
    forceAuthorized = false,
  ) => {
    if (!isAuthorized && !forceAuthorized) {
      setPendingNote(note);
      setPendingAction("delete");
      setIsAuthModalOpen(true);
      return;
    }

    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      const passkey = localStorage.getItem("brain_key") || "";
      const res = await fetch(`/api/notes?id=${note.id}`, {
        method: "DELETE",
        headers: { "x-admin-passkey": passkey },
      });
      if (res.ok) {
        setNotes((prev) => prev.filter((n) => n.id !== note.id));
      } else {
        setIsAuthorized(false);
        localStorage.removeItem("brain_key");
        alert("Unauthorized! Your passkey may have expired.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch notes from API
  React.useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("/api/notes");
        const data = await res.json();
        setNotes(data);
        setActiveCategory(
          (current) => current || data[0]?.category || CATEGORIES[0]?.name,
        );
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const allCategories: CategoryMeta[] = React.useMemo(() => {
    const customCategories = new Set(notes.map((n) => n.category));
    const predefinedNames = new Set(CATEGORIES.map((c) => c.name));

    const combined = [...CATEGORIES];

    for (const custom of customCategories) {
      if (!predefinedNames.has(custom)) {
        combined.push({ name: custom });
      }
    }
    return combined;
  }, [notes]);

  const filteredNotes = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return notes;

    return notes.filter((note) =>
      [note.title, note.content, note.category].some((text) =>
        text.toLowerCase().includes(query),
      ),
    );
  }, [notes, searchQuery]);

  const handleNavigate = React.useCallback(
    (categoryName: string, noteId?: string) => {
      setActiveCategory(categoryName);

      // Scroll to the section
      setTimeout(() => {
        if (noteId) {
          const noteElement = document.getElementById(`note-${noteId}`);
          noteElement?.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          const categoryElement = document.getElementById(
            `category-${categoryName}`,
          );
          categoryElement?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 0);
    },
    [],
  );

  // Track active category on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const categories = allCategories.map((c) => c.name);

      for (const category of categories) {
        const element = document.getElementById(`category-${category}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            setActiveCategory(category);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allCategories]);

  return (
    <div className="flex bg-background h-screen overflow-hidden">
      {/* Sidebar Navigation */}
      <SidebarNav
        categories={allCategories}
        notes={notes}
        activeCategory={activeCategory}
        onNavigate={handleNavigate}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <main
        ref={mainContentRef}
        className="flex-1 min-w-0 h-full overflow-y-auto custom-scrollbar"
      >
        <section className="min-h-full bg-background pt-12 pb-28 font-sans md:pt-16 md:pb-32">
          <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
            {/* Sticky Spatial Header */}
            <div className="sticky top-3 sm:top-6 z-40 mb-6 sm:mb-10 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between rounded-[1.25rem] bg-background/60 backdrop-blur-xl border border-border/50 px-3 py-2.5 sm:p-3 shadow-xl shadow-foreground/5 transition-all">
              {/* Left: Brain Icon + Title + Mobile Add Note */}
              <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto">
                <div className="flex items-center gap-2.5 sm:gap-3 pl-1 sm:pl-2">
                  <div className="relative shrink-0">
                    {/* Spatial glow */}
                    <div className="absolute inset-0 rounded-lg bg-primary/20 blur-md" />
                    <div className="relative p-1.5 sm:p-2 rounded-lg bg-card/80 border border-border/50 shadow-sm backdrop-blur-md">
                      <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-foreground/80" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-base sm:text-lg font-bold tracking-tight font-heading leading-none mb-0.5 sm:mb-1">
                      Second Brain
                    </h1>
                    <div className="flex items-center gap-2">
                      <p className="text-muted-foreground text-[9px] sm:text-[10px] font-medium leading-none">
                        Technical notes & recall.
                      </p>
                      {/* Gamification Stats */}
                      <div className="hidden sm:flex items-center gap-2 border-l border-border/50 pl-2">
                        <span
                          className="flex items-center gap-1 text-[10px] font-bold text-green-500/80 bg-green-500/10 px-1.5 py-0.5 rounded-full"
                          title="Mastered Notes"
                        >
                          🧠 {myMasteredNotes.size}/{notes.length}
                        </span>
                        <span
                          className="flex items-center gap-1 text-[10px] font-bold text-blue-500/80 bg-blue-500/10 px-1.5 py-0.5 rounded-full"
                          title="Global Reveals"
                        >
                          👁️ {totalReveals} total
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Actions: Add Note + Hamburger */}
                <div className="flex items-center gap-1.5 sm:hidden shrink-0">
                  <button
                    onClick={() => {
                      if (isAuthorized) setIsAdding(true);
                      else {
                        setPendingAction("add");
                        setIsAuthModalOpen(true);
                      }
                    }}
                    className="group flex items-center gap-1.5 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground border border-primary/20 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                  >
                    <Plus className="h-3 w-3 transition-transform duration-300 group-hover:rotate-90" />
                    <span>New Note</span>
                  </button>
                  <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-muted/40 border border-border/50 text-foreground/70 hover:bg-muted transition-colors"
                  >
                    <Menu className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Right: Search + Desktop Add Note */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* Search Bar */}
                <div className="relative group flex-1 sm:w-55">
                  <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-background/50 backdrop-blur-md border border-border/50 rounded-full pl-3.5 pr-8 py-1.5 sm:py-2 text-[11px] sm:text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all placeholder:text-muted-foreground/40 shadow-inner"
                  />
                  {!searchQuery ? (
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-muted-foreground/40">
                      <Search className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </div>
                  ) : (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-3 flex items-center text-muted-foreground/40 hover:text-foreground transition-colors"
                    >
                      <X className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </button>
                  )}
                </div>

                {/* Add Note Button (Desktop) */}
                <button
                  onClick={() => {
                    if (isAuthorized) setIsAdding(true);
                    else {
                      setPendingAction("add");
                      setIsAuthModalOpen(true);
                    }
                  }}
                  className="hidden sm:flex shrink-0 group items-center gap-1.5 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground border border-primary/20 px-3 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                >
                  <Plus className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-90" />
                  <span className="hidden sm:inline">New Note</span>
                </button>
              </div>
            </div>

            {/* Dedicated Sections */}
            <div className="space-y-14">
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-muted/30 rounded-xl" />
                  ))}
                </div>
              ) : notes.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-muted-foreground text-sm">
                    No notes found. Create your first one!
                  </p>
                </div>
              ) : filteredNotes.length === 0 && searchQuery ? (
                <div className="py-20 text-center">
                  <p className="text-muted-foreground text-sm">
                    No matches found for "{searchQuery}"
                  </p>
                </div>
              ) : (
                allCategories.map((category) => {
                  const categoryNotes = filteredNotes.filter(
                    (n) => n.category === category.name,
                  );
                  if (categoryNotes.length === 0) return null;

                  return (
                    <CategorySection
                      key={category.name}
                      category={category}
                      categoryNotes={categoryNotes}
                      onEdit={handleEditNote}
                      onDelete={handleDeleteNote}
                      myMasteredNotes={myMasteredNotes}
                      myRevealedNotes={myRevealedNotes}
                      globalStats={globalStats}
                      onMarkMastered={handleMarkMastered}
                      onReveal={handleReveal}
                    />
                  );
                })
              )}
            </div>
          </div>

          {/* Floating Add Form */}
          <AddNoteForm
            noteToEdit={editingNote}
            forceOpen={isAdding}
            onClose={() => {
              setEditingNote(null);
              setIsAdding(false);
            }}
          />

          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => {
              setIsAuthModalOpen(false);
              setPendingAction(null);
              setPendingNote(null);
            }}
            onSuccess={handleAuthSuccess}
          />
        </section>
      </main>
    </div>
  );
}

function CategorySection({
  category,
  categoryNotes,
  onEdit,
  onDelete,
  myMasteredNotes,
  myRevealedNotes,
  globalStats,
  onMarkMastered,
  onReveal,
}: {
  category: CategoryMeta;
  categoryNotes: LearningItem[];
  onEdit: (n: LearningItem) => void;
  onDelete: (n: LearningItem) => void;
  myMasteredNotes: Set<string>;
  myRevealedNotes: Set<string>;
  globalStats: {
    reveals: Record<string, number>;
    masters: Record<string, number>;
  };
  onMarkMastered: (id: string) => void;
  onReveal: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = React.useState(true);
  const accent = getCategoryColor(category.name);

  return (
    <div
      id={`category-${category.name}`}
      className="flex scroll-mt-24 flex-col"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-6 flex items-center justify-between pl-3 pr-2 w-full group text-left transition-opacity hover:opacity-80"
      >
        <div className="flex items-center gap-2 truncate">
          <span className="truncate tracking-tight font-bold text-muted-foreground">
            {category.name}
          </span>
          <span className="flex h-3.5 min-w-4 items-center justify-center rounded-full bg-muted/50 px-1 text-[9px] font-bold text-muted-foreground/40">
            {categoryNotes.length}
          </span>
        </div>
        <div
          className={`opacity-40 transition-all duration-300 group-hover:opacity-100 ${isOpen ? "rotate-180" : ""}`}
        >
          <ChevronDown className="h-4 w-4" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-4 ml-1 pb-6">
              {categoryNotes.map((note) => (
                <div
                  key={note.id}
                  id={`note-${note.id}`}
                  className="scroll-mt-24"
                >
                  <ThreadFeed
                    notes={[note]}
                    category={category}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    myMasteredNotes={myMasteredNotes}
                    myRevealedNotes={myRevealedNotes}
                    globalStats={globalStats}
                    onMarkMastered={onMarkMastered}
                    onReveal={onReveal}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
