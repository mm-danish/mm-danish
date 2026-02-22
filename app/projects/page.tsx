'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Code2, ArrowLeft, Filter } from 'lucide-react';
import { projects } from '@/data/projects';
import Link from 'next/link';

const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
] as const;

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = React.useState<string>('all');

    const filtered = React.useMemo(() => {
        if (activeCategory === 'all') return projects;
        return projects.filter((p) => p.category === activeCategory);
    }, [activeCategory]);

    return (
        <div className="min-h-screen bg-background pt-32 pb-24">
            {/* Background blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                {/* Back link */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-12"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </motion.div>

                {/* Header */}
                <div className="mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-primary font-bold tracking-[0.2em] uppercase text-[10px]"
                    >
                        <div className="h-1 w-1 rounded-full bg-primary" />
                        <span>Production Showcase</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-black font-heading tracking-tight"
                    >
                        All <span className="text-gradient">Projects.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-lg font-light max-w-2xl leading-relaxed"
                    >
                        A collection of production-grade applications, client work, and personal builds — each crafted with precision and purpose.
                    </motion.p>
                </div>

                {/* Filter tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="flex items-center gap-2 mb-12 flex-wrap"
                >
                    <Filter className="h-4 w-4 text-muted-foreground/40 mr-1" />
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wider transition-all duration-200 border ${activeCategory === cat.id
                                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                                    : 'bg-card/40 text-muted-foreground border-border/40 hover:border-primary/40 hover:text-primary'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                    <span className="ml-auto text-[11px] font-semibold text-muted-foreground/40 uppercase tracking-widest">
                        {filtered.length} project{filtered.length !== 1 ? 's' : ''}
                    </span>
                </motion.div>

                {/* Projects Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                    >
                        {filtered.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.06, duration: 0.4 }}
                                className="group flex flex-col h-full"
                            >
                                {/* Image */}
                                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-border/40 bg-card transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] mb-5">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />

                                    {/* HUD badge */}
                                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="px-2 py-1 rounded-lg bg-background/80 backdrop-blur-md border border-white/10 text-[8px] font-black uppercase tracking-widest text-primary flex items-center gap-1.5">
                                            <Code2 className="h-2.5 w-2.5" />
                                            <span>0{index + 1} _ Node</span>
                                        </div>
                                    </div>

                                    {/* Category badge */}
                                    <div className="absolute bottom-3 left-3">
                                        <span className="px-2 py-1 rounded-md bg-background/80 backdrop-blur-md border border-white/10 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Floating action icons */}
                                    <div className="absolute top-3 right-3 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-xl bg-background/90 backdrop-blur-md border border-border/50 text-muted-foreground hover:text-primary transition-colors hover:shadow-lg"
                                            >
                                                <Github className="h-4 w-4" />
                                            </a>
                                        )}
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-xl bg-background/90 backdrop-blur-md border border-border/50 text-muted-foreground hover:text-primary transition-colors hover:shadow-lg"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="px-1 space-y-3 flex-1 flex flex-col">
                                    <div className="flex items-start justify-between gap-4">
                                        <h2 className="text-lg font-bold font-heading tracking-tight leading-snug group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h2>
                                        <span className="text-[10px] text-muted-foreground/40 font-mono shrink-0 mt-1">{project.year}</span>
                                    </div>

                                    <p className="text-muted-foreground text-[13px] font-light leading-relaxed">
                                        {project.longDescription || project.description}
                                    </p>

                                    <div className="pt-4 mt-auto flex flex-wrap gap-1.5">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-0.5 rounded-md bg-muted text-[9px] font-bold uppercase tracking-tight text-muted-foreground border border-border/50 hover:border-primary/40 hover:text-primary transition-all"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="pt-3 flex items-center gap-4">
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[11px] font-bold uppercase tracking-widest text-primary hover:text-primary/70 transition-colors flex items-center gap-1.5 group/link"
                                        >
                                            Live Site
                                            <ExternalLink className="h-3 w-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                        </a>
                                        {project.githubUrl && (
                                            <>
                                                <span className="h-3 w-px bg-border/50" />
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
                                                >
                                                    Source
                                                    <Github className="h-3 w-3" />
                                                </a>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Bottom divider */}
                <div className="mt-24 flex justify-center">
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
                </div>
            </div>
        </div>
    );
}
