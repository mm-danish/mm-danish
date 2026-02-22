'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    ExternalLink,
    Github,
    CheckCircle2,
    Lightbulb,
    Trophy,
    Code2,
    Calendar,
    User,
    ArrowUpRight,
} from 'lucide-react';
import { Project } from '@/types/project';

interface Props {
    project: Project;
}

const categoryColors: Record<Project['category'], string> = {
    fullstack: 'from-blue-600 to-indigo-600',
    frontend: 'from-sky-500 to-cyan-500',
    backend: 'from-emerald-600 to-teal-600',
    other: 'from-slate-500 to-zinc-700',
};

export function ProjectModal({ project }: Props) {
    const router = useRouter();

    // Close on Escape key
    React.useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') router.back();
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [router]);

    // Prevent body scroll when modal is open
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    return (
        <AnimatePresence>
            {/* Backdrop */}
            <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[200] bg-background/60 backdrop-blur-md"
                onClick={() => router.back()}
                aria-label="Close modal"
            />

            {/* Drawer panel — slides up from bottom */}
            <motion.div
                key="panel"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 36, mass: 1 }}
                className="fixed bottom-0 left-0 right-0 z-[201] max-h-[92dvh] flex flex-col rounded-t-[2rem] border-t border-l border-r border-border/50 bg-background shadow-2xl overflow-hidden"
                role="dialog"
                aria-modal="true"
                aria-label={project.title}
            >
                {/* Drag handle */}
                <div className="flex justify-center pt-3 pb-1 shrink-0">
                    <div className="h-1 w-10 rounded-full bg-border/60" />
                </div>

                {/* Scrollable content */}
                <div className="overflow-y-auto overscroll-contain flex-1">
                    <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-10">

                        {/* Header row */}
                        <div className="flex items-start justify-between gap-4 pt-4 pb-6 sticky top-0 bg-background/95 backdrop-blur-sm z-10 border-b border-border/20 mb-6">
                            <div className="space-y-2 min-w-0">
                                {/* Badges */}
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-gradient-to-r ${categoryColors[project.category]} text-white`}>
                                        <Code2 className="h-2.5 w-2.5" />
                                        {project.category}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-card border border-border/50 text-muted-foreground">
                                        <Calendar className="h-2.5 w-2.5" />
                                        {project.year}
                                    </span>
                                    {project.role && (
                                        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-card border border-border/50 text-muted-foreground">
                                            <User className="h-2.5 w-2.5" />
                                            {project.role}
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight truncate">
                                    {project.title}
                                </h2>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 shrink-0">
                                <Link
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
                                >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                    Live Site
                                </Link>
                                <Link
                                    href={`/projects/${project.slug}`}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-card/50 text-xs font-bold hover:border-primary/50 hover:text-primary transition-all"
                                    onClick={() => router.back()}
                                >
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                    Full Page
                                </Link>
                                <button
                                    onClick={() => router.back()}
                                    className="flex items-center justify-center h-9 w-9 rounded-full border border-border/60 bg-card/50 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                                    aria-label="Close"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Screenshot */}
                        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border/40 bg-card mb-8 shadow-xl">
                            <Image
                                src={project.image}
                                alt={`${project.title} screenshot`}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1024px) 100vw, 900px"
                            />
                        </div>

                        {/* Description */}
                        <p className="text-base text-muted-foreground font-light leading-relaxed mb-8">
                            {project.longDescription ?? project.description}
                        </p>

                        {/* Two-col: Highlights + Challenge/Outcome */}
                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-5 mb-8">
                            {project.highlights && project.highlights.length > 0 && (
                                <div className="sm:col-span-3 p-6 rounded-2xl border border-border/40 bg-card/30">
                                    <div className="flex items-center gap-2.5 mb-5">
                                        <div className="p-2 rounded-xl bg-primary/10">
                                            <CheckCircle2 className="h-4 w-4 text-primary" />
                                        </div>
                                        <h3 className="font-bold font-heading text-sm">Key Highlights</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {project.highlights.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <div className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/50 shrink-0" />
                                                <p className="text-sm text-muted-foreground font-light leading-relaxed">{item}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="sm:col-span-2 flex flex-col gap-4">
                                {project.challenge && (
                                    <div className="flex-1 p-5 rounded-2xl border border-border/40 bg-card/30">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="p-2 rounded-xl bg-amber-500/10">
                                                <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                                            </div>
                                            <h3 className="font-bold font-heading text-sm">Challenge</h3>
                                        </div>
                                        <p className="text-xs text-muted-foreground font-light leading-relaxed">{project.challenge}</p>
                                    </div>
                                )}
                                {project.outcome && (
                                    <div className="flex-1 p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="p-2 rounded-xl bg-emerald-500/15">
                                                <Trophy className="h-3.5 w-3.5 text-emerald-500" />
                                            </div>
                                            <h3 className="font-bold font-heading text-sm">Outcome</h3>
                                        </div>
                                        <p className="text-xs text-muted-foreground font-light leading-relaxed">{project.outcome}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tech stack */}
                        <div className="p-5 rounded-2xl border border-border/40 bg-card/30">
                            <h3 className="font-bold font-heading text-sm mb-4">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1.5 rounded-xl bg-background/60 border border-border/50 text-xs font-semibold text-muted-foreground hover:border-primary/50 hover:text-primary transition-all"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Mobile live site button */}
                        <div className="mt-6 sm:hidden">
                            <Link
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
                            >
                                <ExternalLink className="h-4 w-4" />
                                View Live Site
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
