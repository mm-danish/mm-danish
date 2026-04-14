'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Search,
  Sparkles,
  BookOpen,
  X,
  Filter,
  LayoutGrid,
  List,
} from 'lucide-react';
import { learningData, learningCategories, type LearningCategory, type LearningItem, type Difficulty } from '@/data/learning';
import { CategoryPill } from './category-pill';
import { NoteCard } from './note-card';
import { NoteDetail } from './note-detail';
import { cn } from '@/lib/cn';

export function SecondBrain() {
  const [activeCategory, setActiveCategory] = React.useState<LearningCategory>('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedNote, setSelectedNote] = React.useState<LearningItem | null>(null);
  const [activeDifficulty, setActiveDifficulty] = React.useState<Difficulty | 'all'>('all');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  // Filter data
  const filtered = React.useMemo(() => {
    return learningData.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesDifficulty = activeDifficulty === 'all' || item.difficulty === activeDifficulty;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.content.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [activeCategory, activeDifficulty, searchQuery]);

  // Stats
  const totalNotes = learningData.length;
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    learningData.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  const difficulties: { label: string; value: Difficulty | 'all'; color: string }[] = [
    { label: 'All Levels', value: 'all', color: 'bg-white/10 text-foreground' },
    { label: 'Beginner', value: 'beginner', color: 'bg-emerald-500/10 text-emerald-500' },
    { label: 'Intermediate', value: 'intermediate', color: 'bg-amber-500/10 text-amber-500' },
    { label: 'Advanced', value: 'advanced', color: 'bg-rose-500/10 text-rose-500' },
  ];

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* ── Background decorations ── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Hero Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            <Brain className="h-4 w-4" />
            Knowledge Vault
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-4">
            My <span className="text-gradient">Second Brain</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated gallery of learnings, notes, and code snippets — everything I need
            to recall, right at my fingertips.
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">{totalNotes}</span> notes
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span className="font-semibold text-foreground">{learningCategories.length - 1}</span> categories
            </div>
          </div>
        </motion.div>

        {/* ── Search & Filters Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8"
        >
          {/* Search input */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              id="second-brain-search"
              type="text"
              placeholder="Search notes, tags, concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {learningCategories.map((cat) => (
              <CategoryPill
                key={cat.name}
                category={cat}
                isActive={activeCategory === cat.name}
                count={cat.name === 'All' ? totalNotes : categoryCounts[cat.name] || 0}
                onClick={() => setActiveCategory(cat.name)}
              />
            ))}
          </div>

          {/* Difficulty + View toggle row */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-1.5">
              <Filter className="h-3.5 w-3.5 text-muted-foreground" />
              {difficulties.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setActiveDifficulty(d.value)}
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200',
                    activeDifficulty === d.value
                      ? `${d.color} ring-1 ring-current/20`
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>
            <div className="w-px h-4 bg-border hidden sm:block" />
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-muted/50">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-1.5 rounded-md transition-all',
                  viewMode === 'grid'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                aria-label="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-1.5 rounded-md transition-all',
                  viewMode === 'list'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Results Count ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-muted-foreground mb-6 text-center"
        >
          Showing <span className="font-semibold text-foreground">{filtered.length}</span>{' '}
          {filtered.length === 1 ? 'note' : 'notes'}
          {activeCategory !== 'All' && (
            <> in <span className="font-semibold text-foreground">{activeCategory}</span></>
          )}
        </motion.p>

        {/* ── Notes Grid / List ── */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No notes found</h3>
              <p className="text-muted-foreground text-sm max-w-md">
                Try adjusting your search or filters. Your second brain is always growing!
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={`${activeCategory}-${activeDifficulty}-${viewMode}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={cn(
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
                  : 'flex flex-col gap-3 max-w-4xl mx-auto'
              )}
            >
              {filtered.map((item, idx) => (
                <NoteCard
                  key={item.id}
                  item={item}
                  index={idx}
                  viewMode={viewMode}
                  onClick={() => setSelectedNote(item)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Note Detail Modal ── */}
      <NoteDetail note={selectedNote} onClose={() => setSelectedNote(null)} />
    </section>
  );
}
