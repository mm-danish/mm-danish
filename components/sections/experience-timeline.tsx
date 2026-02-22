'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, ExternalLink, Briefcase, Milestone } from 'lucide-react';
import { experience } from '@/data/experience';
import { formatDateRange, calculateDuration } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-background">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-primary/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-[20%] -left-[10%] w-[30%] h-[30%] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <header className="mb-16">
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
              Building scalable solutions and leading technical initiatives.
            </motion.p>
          </header>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden border-border/40 bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 rounded-[1.5rem] border-[1px] group">
                  <CardContent className="p-6 md:p-10">
                    <div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                          <span>{formatDateRange(exp.startDate, exp.endDate)}</span>
                          <span className="text-muted-foreground/30">•</span>
                          <span className="text-muted-foreground/60">{calculateDuration(exp.startDate, exp.endDate)}</span>
                          {exp.current && (
                            <>
                              <span className="text-muted-foreground/30">•</span>
                              <span className="flex items-center gap-1 text-emerald-500">
                                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                Current
                              </span>
                            </>
                          )}
                        </div>

                        <div className="space-y-1">
                          <h3 className="text-2xl md:text-3xl font-bold font-heading tracking-tight group-hover:text-primary transition-colors">
                            {exp.position}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground text-base">
                            <div className="flex items-center gap-1.5">
                              <Briefcase className="h-4 w-4 opacity-40" />
                              <span className="font-semibold text-foreground/80">{exp.company}</span>
                              {exp.website && (
                                <Link
                                  href={exp.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 hover:text-primary transition-colors"
                                >
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </Link>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 opacity-60">
                              <MapPin className="h-4 w-4" />
                              <span>{exp.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <ul className="grid gap-3">
                        {exp.description.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-4 text-muted-foreground group/item">
                            <div className="mt-2.5 h-1 w-1 rounded-full bg-primary/40 group-hover/item:bg-primary transition-colors shrink-0" />
                            <p className="text-sm md:text-[15px] leading-relaxed font-light group-hover/item:text-foreground transition-colors">
                              {item}
                            </p>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 pt-4">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg bg-primary/5 border border-primary/10 text-[10px] md:text-[11px] font-bold uppercase tracking-tight text-muted-foreground/70 group-hover:border-primary/20 transition-all"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
