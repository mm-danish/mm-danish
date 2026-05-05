'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Search, X, Plus, ChevronDown } from 'lucide-react';
import { CATEGORIES, getCategoryColor, type LearningItem, type CategoryMeta } from '@/data/learning';
import { ThreadFeed } from './thread-feed';
import { AddNoteForm } from './add-note-form';
import { SidebarNav } from './sidebar-nav';

export function SecondBrain() {
  const [notes, setNotes] = React.useState<LearningItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [editingNote, setEditingNote] = React.useState<LearningItem | null>(null);
  const [isAdding, setIsAdding] = React.useState(false);
  const mainContentRef = React.useRef<HTMLDivElement>(null);

  // Fetch notes from API
  React.useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch('/api/notes');
        const data = await res.json();
        setNotes(data);
        if (data.length > 0 && !activeCategory) {
          const firstCat = data[0]?.category || CATEGORIES[0]?.name;
          setActiveCategory(firstCat);
        } else if (!activeCategory) {
          setActiveCategory(CATEGORIES[0]?.name);
        }
      } catch (err) {
        console.error('Failed to fetch notes:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [activeCategory]);

  const allCategories: CategoryMeta[] = React.useMemo(() => {
    const customCategories = new Set(notes.map(n => n.category));
    const predefinedNames = new Set(CATEGORIES.map(c => c.name));
    
    const combined = [...CATEGORIES];
    
    for (const custom of customCategories) {
      if (!predefinedNames.has(custom)) {
        combined.push({ name: custom });
      }
    }
    return combined;
  }, [notes]);

  const handleNavigate = React.useCallback(
    (categoryName: string, noteId?: string) => {
      setActiveCategory(categoryName);

      // Scroll to the section
      setTimeout(() => {
        if (noteId) {
          const noteElement = document.getElementById(`note-${noteId}`);
          noteElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          const categoryElement = document.getElementById(`category-${categoryName}`);
          categoryElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 0);
    },
    []
  );

  // Track active category on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const categories = allCategories.map(c => c.name);

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [allCategories]);

  return (
    <div className="flex bg-background min-h-screen">
      {/* Sidebar Navigation */}
      <SidebarNav
        categories={allCategories}
        notes={notes}
        activeCategory={activeCategory}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <main ref={mainContentRef} className="flex-1 min-w-0">
        <section className="min-h-screen bg-background pt-32 pb-28 font-sans md:pt-40 md:pb-32">
          <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
            {/* Header with Brain Icon */}
            <div className="mb-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-lg bg-muted/50 border border-border/50">
                  <Brain className="h-6 w-6 text-foreground/70" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight font-heading">
                    Second Brain
                  </h1>
                  <p className="text-muted-foreground text-xs font-medium">Technical notes and learning recall.</p>
                </div>
              </div>

              <button
                onClick={() => setIsAdding(true)}
                className="group flex items-center gap-2 rounded-full bg-muted/40 hover:bg-foreground hover:text-background border border-border/50 p-2 md:px-4 md:py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-500 hover:shadow-xl hover:shadow-foreground/10"
              >
                <Plus className="h-4 w-4 md:h-3.5 md:w-3.5 transition-transform duration-500 group-hover:rotate-90" />
                <span className="hidden md:inline">New Note</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-12 relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search technical notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-muted/30 border border-border/50 rounded-2xl pl-11 pr-11 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/5 focus:border-foreground/10 transition-all placeholder:text-muted-foreground/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-4 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Dedicated Sections */}
            <div className="space-y-14">
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-20 bg-muted/30 rounded-xl" />
                  ))}
                </div>
              ) : notes.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-muted-foreground text-sm">No notes found. Create your first one!</p>
                </div>
              ) : (() => {
                const filteredNotes = notes.filter(n => {
                  const query = searchQuery.toLowerCase();
                  return n.title.toLowerCase().includes(query) ||
                    n.content.toLowerCase().includes(query) ||
                    n.category.toLowerCase().includes(query);
                });

                if (filteredNotes.length === 0 && searchQuery) {
                  return (
                    <div className="py-20 text-center">
                      <p className="text-muted-foreground text-sm">No matches found for "{searchQuery}"</p>
                    </div>
                  );
                }

                return allCategories.map((category) => {
                  const categoryNotes = filteredNotes.filter(n => n.category === category.name);
                  if (categoryNotes.length === 0) return null;

                  return (
                    <CategorySection
                      key={category.name}
                      category={category}
                      categoryNotes={categoryNotes}
                      setEditingNote={setEditingNote}
                    />
                  );
                });
              })()}
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
        </section>
      </main>
    </div>
  );
}

function CategorySection({ 
  category, 
  categoryNotes, 
  setEditingNote 
}: { 
  category: CategoryMeta; 
  categoryNotes: LearningItem[];
  setEditingNote: (n: LearningItem) => void;
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
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold tracking-tight transition-colors" style={{ color: accent.hex }}>
            {category.name}
          </h2>
          <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[10px] font-bold" style={{ backgroundColor: `${accent.hex}20`, color: accent.hex }}>
             {categoryNotes.length}
          </span>
        </div>
        <div className={`opacity-40 transition-all duration-300 group-hover:opacity-100 ${isOpen ? 'rotate-180' : ''}`} style={{ color: accent.hex }}>
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
                <div key={note.id} id={`note-${note.id}`} className="scroll-mt-24">
                  <ThreadFeed notes={[note]} category={category} onEdit={setEditingNote} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
