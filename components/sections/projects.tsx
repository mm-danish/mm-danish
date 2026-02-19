'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight, Code2 } from 'lucide-react';
import { projects } from '@/data/projects';

export function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="py-24 relative bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-2">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-primary font-bold tracking-[0.2em] uppercase text-[9px]"
            >
              <div className="h-1 w-1 rounded-full bg-primary" />
              <span>Production Showcase</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold font-heading tracking-tight"
            >
              Selected Projects<span className="text-primary">.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-sm font-light max-w-xs leading-relaxed"
          >
            A curated list of high-performance builds focused on scalability and precision.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="group flex flex-col h-full"
            >
              {/* Tight, Clean Card Container */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-border/40 bg-card transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-5">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Minimalist Tech HUD */}
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="px-2 py-1 rounded-lg bg-background/80 backdrop-blur-md border border-white/10 text-[8px] font-black uppercase tracking-widest text-primary flex items-center gap-1.5">
                    <Code2 className="h-2.5 w-2.5" />
                    <span>0{index + 1} _ Node</span>
                  </div>
                </div>

                {/* Floating Actions */}
                <div className="absolute top-3 right-3 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener" className="p-2 rounded-xl bg-background/90 backdrop-blur-md border border-border/50 text-muted-foreground hover:text-primary transition-colors hover:shadow-lg">
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  <a href={project.liveUrl} target="_blank" rel="noopener" className="p-2 rounded-xl bg-background/90 backdrop-blur-md border border-border/50 text-muted-foreground hover:text-primary transition-colors hover:shadow-lg">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Tighter Content Alignment */}
              <div className="px-1 space-y-3 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold font-heading tracking-tight leading-snug group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <Link href={`/projects/${project.slug}`} className="text-muted-foreground/30 hover:text-primary transition-colors">
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                <p className="text-muted-foreground text-[13px] font-light leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                <div className="pt-4 mt-auto flex flex-wrap gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded-md bg-muted text-[9px] font-bold uppercase tracking-tight text-muted-foreground border border-border/50">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-[9px] font-bold text-muted-foreground/30 self-center ml-1">+{project.technologies.length - 3}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tight Bottom Divider */}
        <div className="mt-20 flex justify-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      </div>
    </section>
  );
}
