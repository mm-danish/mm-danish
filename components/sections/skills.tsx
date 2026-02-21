'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { skills } from '@/data/skills';
import { Skill } from '@/types/skill';
import {
  Code2,
  Server,
  Database,
  ShieldCheck,
  Cloud,
  TestTube2,
  Terminal,
  Wrench,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const categoryConfig: Record<Skill['category'], { label: string; icon: any; color: string; shadow: string }> = {
  frontend: { label: 'Frontend', icon: Code2, color: 'from-blue-600 to-indigo-600', shadow: 'shadow-blue-500/20' },
  backend: { label: 'Backend', icon: Server, color: 'from-blue-700 to-cyan-600', shadow: 'shadow-blue-500/20' },
  database: { label: 'Databases', icon: Database, color: 'from-emerald-600 to-teal-600', shadow: 'shadow-emerald-500/20' },
  auth: { label: 'Security', icon: ShieldCheck, color: 'from-rose-600 to-pink-600', shadow: 'shadow-rose-500/20' },
  cloud: { label: 'Cloud', icon: Cloud, color: 'from-sky-500 to-blue-600', shadow: 'shadow-sky-500/20' },
  testing: { label: 'Testing', icon: TestTube2, color: 'from-amber-500 to-orange-600', shadow: 'shadow-amber-500/20' },
  tools: { label: 'DevTools', icon: Wrench, color: 'from-slate-500 to-zinc-700', shadow: 'shadow-slate-500/20' },
  language: { label: 'Core', icon: Terminal, color: 'from-orange-600 to-red-600', shadow: 'shadow-orange-500/20' },
};

export function Skills() {
  const categories = React.useMemo(() => {
    return skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<Skill['category'], Skill[]>);
  }, []);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-background">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent opacity-30" />
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 mb-4"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px]">Technical Arsenal</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl font-bold font-heading tracking-tight mb-4"
              >
                Engineering <span className="text-gradient">Prowess.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground text-lg leading-relaxed font-light"
              >
                A high-performance toolkit for building enterprise-grade digital experiences.
              </motion.p>
            </div>
          </header>

          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {Object.entries(categories).map(([category, categorySkills], idx) => {
              const config = categoryConfig[category as Skill['category']];
              const Icon = config.icon;

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  className="break-inside-avoid mb-6"
                >
                  <Card className="h-full border-border/40 bg-card/40 backdrop-blur-xl hover:border-primary/40 transition-all duration-500 overflow-hidden relative rounded-3xl border-[1px] group">
                    <CardContent className="p-6 h-full flex flex-col relative z-20">
                      {/* Category Header */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${config.color} ${config.shadow} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}>
                          <Icon className="h-4.5 w-4.5 text-white" />
                        </div>
                        <h3 className="text-lg font-bold font-heading flex items-center gap-2 group-hover:text-primary transition-colors">
                          {config.label}
                        </h3>
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2">
                          {categorySkills.map((skill) => (
                            <div
                              key={skill.id}
                              className="px-3 py-1.5 rounded-lg bg-background/50 border border-border/40 text-[12px] font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
                            >
                              {skill.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
