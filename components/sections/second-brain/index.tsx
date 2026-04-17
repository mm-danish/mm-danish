'use client';

import * as React from 'react';
import { Brain, Search, X } from 'lucide-react';
import { CATEGORIES, CATEGORY_COLORS, type LearningItem } from '@/data/learning';
import { ThreadFeed } from './thread-feed';
import { AddNoteForm } from './add-note-form';
import { SidebarNav } from './sidebar-nav';

export function SecondBrain() {
  const [notes, setNotes] = React.useState<LearningItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState<string | undefined>(
    CATEGORIES[0]?.name
  );
  const [searchQuery, setSearchQuery] = React.useState('');
  const [editingNote, setEditingNote] = React.useState<LearningItem | null>(null);
  const mainContentRef = React.useRef<HTMLDivElement>(null);

  // Fetch notes from API
  React.useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch('/api/notes');
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        console.error('Failed to fetch notes:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

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
      const categories = CATEGORIES.map(c => c.name);

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
  }, []);

  return (
    <div className="flex bg-background min-h-screen">
      {/* Sidebar Navigation */}
      <SidebarNav
        categories={CATEGORIES}
        notes={notes}
        activeCategory={activeCategory}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <main ref={mainContentRef} className="flex-1 min-w-0">
        <section className="min-h-screen bg-background pt-32 pb-28 font-sans md:pt-40 md:pb-32">
          <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
            {/* Header with Brain Icon */}
            <div className="mb-10 flex items-center gap-4">
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

                return CATEGORIES.map((category) => {
                  const categoryNotes = filteredNotes.filter(n => n.category === category.name);
                  if (categoryNotes.length === 0) return null;

                  return (
                    <div
                      key={category.name}
                      id={`category-${category.name}`}
                      className="flex scroll-mt-24 flex-col"
                    >
                      {/* Master Section Header */}
                      {(() => {
                        const accent = CATEGORY_COLORS[category.name];
                        return (
                          <div
                            className="mb-6 flex items-center gap-3 pl-3"
                            style={{ borderColor: accent.hex }}
                          >
                            <h2
                              className="text-lg font-bold tracking-tight"
                              style={{ color: accent.hex }}
                            >
                              {category.name}
                            </h2>
                          </div>
                        );
                      })()}

                      {/* Feed for this category */}
                      <div className="space-y-4 ml-1">
                        {categoryNotes.map((note) => (
                          <div
                            key={note.id}
                            id={`note-${note.id}`}
                            className="scroll-mt-24"
                          >
                            <ThreadFeed
                              notes={[note]}
                              category={category}
                              onEdit={(n) => setEditingNote(n)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>

          {/* Floating Add Form */}
          <AddNoteForm 
            noteToEdit={editingNote} 
            onClose={() => setEditingNote(null)} 
          />
        </section>
      </main>
    </div>
  );
}
