'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, FolderCode } from 'lucide-react';
import { Project } from '@/types/project';
import { Card, CardContent } from '@/components/ui/card';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group"
    >
      <Card className="h-full border-border/40 bg-card/40 backdrop-blur-2xl hover:border-primary/40 transition-all duration-500 overflow-hidden relative rounded-[2.5rem] border-[1px] shadow-lg group-hover:-translate-y-2">
        {/* Project Image Container */}
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.9] group-hover:brightness-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* OverlayHUD */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

          {/* Floating Actions */}
          <div className="absolute top-6 right-6 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" onClick={(e) => e.stopPropagation()}>
            {project.githubUrl && (
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl bg-background/80 backdrop-blur-md text-foreground hover:bg-primary hover:text-white transition-all shadow-xl">
                <Github className="h-5 w-5" />
              </Link>
            )}
            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl bg-background/80 backdrop-blur-md text-foreground hover:bg-primary hover:text-white transition-all shadow-xl">
              <ExternalLink className="h-5 w-5" />
            </Link>
          </div>

          {/* Type Badge */}
          <div className="absolute bottom-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/60 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white">
            <FolderCode className="h-3 w-3" />
            <span>Deployment Active</span>
          </div>
        </div>

        <CardContent className="p-8 pb-10 flex flex-col h-[calc(100%-auto)]">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="text-2xl md:text-3xl font-bold font-heading tracking-tight group-hover:text-primary transition-colors">
              {project.title}
            </h3>
          </div>

          <p className="text-muted-foreground text-[15px] leading-relaxed mb-8 flex-1">
            {project.description}
          </p>

          <div className="space-y-6 mt-auto">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-lg bg-background/50 border border-border/50 text-[11px] font-bold uppercase tracking-tighter text-muted-foreground/60">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="text-[11px] font-bold uppercase tracking-tighter text-muted-foreground/30 flex items-center">
                  +{project.technologies.length - 4} More
                </span>
              )}
            </div>

            <div className="pt-6 border-t border-border/10">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-primary group/link"
              >
                <span>Deep Dive Analysis</span>
                <div className="relative overflow-hidden w-8 h-px bg-primary/30 group-hover/link:w-12 transition-all duration-500">
                  <div className="absolute inset-0 bg-primary translate-x-[-100%] group-hover/link:translate-x-0 transition-transform duration-500" />
                </div>
              </Link>
            </div>
          </div>
        </CardContent>

        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      </Card>
    </motion.div>
  );
}
