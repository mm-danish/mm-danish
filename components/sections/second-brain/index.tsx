'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain } from 'lucide-react';
import { CATEGORIES, NOTES, type LearningCategory } from '@/data/learning';
import { Sidebar } from './sidebar';
import { Feed } from './feed';
import { NoteModal } from './note-modal';
import type { LearningItem } from '@/data/learning';

export function SecondBrain() {
  const [active, setActive] = React.useState<LearningCategory>('Node.js');
  const [selected, setSelected] = React.useState<LearningItem | null>(null);

  const notes = NOTES.filter((n) => n.category === active);
  const catMeta = CATEGORIES.find((c) => c.name === active)!;

  return (
    <section className="min-h-screen pt-24 pb-16">
      {/* ── Page heading ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="p-2.5 rounded-xl bg-primary/10">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold tracking-tight">
              Second Brain
            </h1>
            <p className="text-sm text-muted-foreground">
              My personal knowledge feed — pick a topic and scroll.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Layout ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 items-start">
          {/* Sidebar */}
          <Sidebar active={active} onSelect={setActive} />

          {/* Thread feed */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              className="flex-1 min-w-0"
            >
              <Feed
                notes={notes}
                meta={catMeta}
                onSelect={setSelected}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <NoteModal note={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
