'use client';

import * as React from 'react';
import { Brain } from 'lucide-react';
import { CATEGORIES, NOTES } from '@/data/learning';
import { ThreadFeed } from './thread-feed';

export function SecondBrain() {
  return (
    <section className="min-h-screen pt-24 pb-32 bg-background text-foreground font-sans">
      <div className="max-w-xl mx-auto px-4">
        {/* Header with Brain Icon restored */}
        <div className="flex items-center gap-3 mb-8 ">
          <div className="p-2.5 rounded-xl bg-muted/50 border border-border/20">
            <Brain className="h-6 w-6 text-foreground/80" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight font-heading">Second Brain</h1>
            <p className="text-muted-foreground text-sm font-medium">Personal knowledge vault.</p>
          </div>
        </div>

        {/* Dedicated Sections */}
        <div className="space-y-16">
          {CATEGORIES.map((category) => {
            const categoryNotes = NOTES.filter(n => n.category === category.name);
            if (categoryNotes.length === 0) return null;

            return (
              <div key={category.name} className="flex flex-col">
                {/* Master Section Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold tracking-tight font-heading text-foreground/90">
                    {category.name}
                  </h2>
                </div>

                {/* Feed for this category */}
                <div className="pl-1">
                  <ThreadFeed
                    notes={categoryNotes}
                    category={category}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
