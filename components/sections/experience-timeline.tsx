'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Briefcase, Sparkles, Milestone } from 'lucide-react';
import { experience } from '@/data/experience';
import { formatDateRange, calculateDuration } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-blue-500/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-[20%] -left-[10%] w-[30%] h-[30%] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
              >
                <Milestone className="h-3 w-3" />
                <span>Career Path</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl font-bold font-heading tracking-tight mb-4"
              >
                Professional <span className="text-gradient">Experience.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground text-lg font-light leading-relaxed"
              >
                Strategic technical contributions within high-growth engineering teams.
              </motion.p>
            </div>
          </header>

          <div className="relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/50 to-transparent hidden md:block" />

            <div className="space-y-16">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}
                >
                  {/* Reduced Node Size */}
                  <div className="absolute left-[-3px] md:left-1/2 md:ml-[-8px] top-0 md:top-10 h-4 w-4 rounded-full border-2 border-background bg-primary shadow-[0_0_15px_rgba(var(--primary),0.3)] z-20 hidden md:block" />

                  {/* Date for Desktop */}
                  <div className="hidden md:flex w-1/2 justify-center items-center">
                    <span className="text-[11px] font-black font-heading text-muted-foreground/40 uppercase tracking-widest">
                      {formatDateRange(exp.startDate, exp.endDate)}
                    </span>
                  </div>

                  <div className="w-full md:w-1/2 relative">
                    <Card className="relative overflow-hidden border-border/40 bg-card/40 backdrop-blur-xl hover:border-primary/40 transition-all duration-500 rounded-[2rem] border-[1px] group">
                      <CardContent className="p-6 md:p-8">
                        <div className="flex items-center justify-between mb-4 md:hidden">
                          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                            {formatDateRange(exp.startDate, exp.endDate)}
                          </span>
                        </div>

                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="space-y-1">
                            <h3 className="text-xl md:text-2xl font-bold font-heading tracking-tight group-hover:text-primary transition-colors">
                              {exp.position}
                            </h3>
                            <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground truncate">
                              <span>{exp.company}</span>
                              {exp.website && (
                                <a href={exp.website} target="_blank" rel="noopener" className="p-1 rounded-md hover:bg-primary/10 text-primary/40 hover:text-primary transition-all">
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              )}
                            </div>
                          </div>

                          <div className="hidden sm:block text-right">
                            {exp.current && (
                              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase border border-emerald-500/20 mb-1">
                                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                Active
                              </div>
                            )}
                            <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/30">
                              {calculateDuration(exp.startDate, exp.endDate)}
                            </div>
                          </div>
                        </div>

                        <ul className="space-y-3 mb-8">
                          {exp.description.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-[13px] leading-relaxed group/item">
                              <div className="mt-1.5 h-1 w-1 rounded-full bg-primary/30 group-hover/item:bg-primary transition-colors shrink-0" />
                              <span className="text-muted-foreground group-hover/item:text-foreground transition-all duration-300 line-clamp-2 hover:line-clamp-none">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-1.5 pt-6 border-t border-border/10">
                          {exp.technologies.map((tech) => (
                            <span key={tech} className="px-2 py-0.5 rounded-lg bg-background/50 border border-border/50 text-[10px] font-bold uppercase tracking-tighter text-muted-foreground/50 hover:text-primary transition-all">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
