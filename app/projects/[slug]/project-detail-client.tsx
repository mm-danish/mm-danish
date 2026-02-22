'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    ExternalLink,
    Github,
    CheckCircle2,
    Lightbulb,
    Trophy,
    Code2,
    Calendar,
    User,
    ArrowRight,
} from 'lucide-react';
import { Project } from '@/types/project';
import { projects } from '@/data/projects';

interface Props {
    project: Project;
}

const categoryColors: Record<Project['category'], string> = {
    fullstack: 'from-blue-600 to-indigo-600',
    frontend: 'from-sky-500 to-cyan-500',
    backend: 'from-emerald-600 to-teal-600',
    other: 'from-slate-500 to-zinc-700',
};

export function ProjectDetailClient({ project }: Props) {
    const relatedProjects = projects
        .filter((p) => p.slug !== project.slug && p.category === project.category)
        .slice(0, 2);

    const otherProjects = relatedProjects.length < 2
        ? [
            ...relatedProjects,
            ...projects.filter(
                (p) => p.slug !== project.slug && !relatedProjects.find((r) => r.slug === p.slug)
            ).slice(0, 2 - relatedProjects.length),
        ]
        : relatedProjects;

    return (
        <div className="min-h-screen bg-background pt-28 pb-24">
            {/* Ambient background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-0 left-0 w-[700px] h-[400px] bg-primary/4 blur-[150px] rounded-full -translate-x-1/4" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-blue-500/4 blur-[130px] rounded-full translate-x-1/4" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

                {/* ── Breadcrumb Navigation ── */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-sm mb-10"
                >
                    <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
                    <span className="text-muted-foreground/30">/</span>
                    <Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</Link>
                    <span className="text-muted-foreground/30">/</span>
                    <span className="text-foreground font-medium truncate max-w-[160px]">{project.title}</span>
                </motion.div>

                {/* ── Hero ── */}
                <div className="mb-12">
                    {/* Category + Year badges pill */}
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 flex-wrap mb-5"
                    >
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-gradient-to-r ${categoryColors[project.category]} text-white shadow-lg`}>
                            <Code2 className="h-3 w-3" />
                            {project.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-card border border-border/50 text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {project.year}
                        </span>
                        {project.role && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-card border border-border/50 text-muted-foreground">
                                <User className="h-3 w-3" />
                                {project.role}
                            </span>
                        )}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-black font-heading tracking-tight leading-[1.05] mb-5"
                    >
                        {project.title}<span className="text-primary">.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl mb-7"
                    >
                        {project.longDescription ?? project.description}
                    </motion.p>

                    {/* Action buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.22 }}
                        className="flex flex-wrap items-center gap-3"
                    >
                        <Link
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all"
                        >
                            <ExternalLink className="h-4 w-4" />
                            View Live Site
                        </Link>
                        {project.githubUrl && (
                            <Link
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card/50 text-sm font-bold hover:border-primary/50 hover:text-primary transition-all"
                            >
                                <Github className="h-4 w-4" />
                                View Source
                            </Link>
                        )}
                    </motion.div>
                </div>

                {/* ── Main Screenshot ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-border/40 shadow-2xl mb-16 bg-card"
                >
                    <Image
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 1024px) 100vw, 900px"
                    />
                    {/* Subtle vignette */}
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-3xl pointer-events-none" />
                </motion.div>

                {/* ── Two-column: Highlights + Challenge/Outcome ── */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">

                    {/* Highlights */}
                    {project.highlights && project.highlights.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="lg:col-span-3 p-7 sm:p-8 rounded-3xl border border-border/40 bg-card/30 backdrop-blur-xl"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 rounded-xl bg-primary/10">
                                    <CheckCircle2 className="h-4.5 w-4.5 text-primary" />
                                </div>
                                <h2 className="text-lg font-bold font-heading">Key Highlights</h2>
                            </div>
                            <ul className="space-y-3.5">
                                {project.highlights.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.07 }}
                                        className="flex items-start gap-3 group"
                                    >
                                        <div className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0 group-hover:bg-primary transition-colors" />
                                        <p className="text-sm text-muted-foreground leading-relaxed font-light group-hover:text-foreground transition-colors">{item}</p>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    )}

                    {/* Challenge + Outcome stacked */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {project.challenge && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex-1 p-6 rounded-3xl border border-border/40 bg-card/30 backdrop-blur-xl"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2.5 rounded-xl bg-amber-500/10">
                                        <Lightbulb className="h-4 w-4 text-amber-500" />
                                    </div>
                                    <h2 className="text-base font-bold font-heading">The Challenge</h2>
                                </div>
                                <p className="text-sm text-muted-foreground font-light leading-relaxed">{project.challenge}</p>
                            </motion.div>
                        )}

                        {project.outcome && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="flex-1 p-6 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-xl"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2.5 rounded-xl bg-emerald-500/15">
                                        <Trophy className="h-4 w-4 text-emerald-500" />
                                    </div>
                                    <h2 className="text-base font-bold font-heading">The Outcome</h2>
                                </div>
                                <p className="text-sm text-muted-foreground font-light leading-relaxed">{project.outcome}</p>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* ── Tech Stack ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-7 sm:p-8 rounded-3xl border border-border/40 bg-card/30 backdrop-blur-xl mb-16"
                >
                    <h2 className="text-lg font-bold font-heading mb-6">Tech Stack</h2>
                    <div className="flex flex-wrap gap-2.5">
                        {project.technologies.map((tech, i) => (
                            <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.04 }}
                                className="px-3.5 py-1.5 rounded-xl bg-background/60 border border-border/50 text-sm font-semibold text-muted-foreground hover:border-primary/50 hover:text-primary transition-all"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* ── More Projects ── */}
                {otherProjects.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-1">Continue Exploring</p>
                                <h2 className="text-2xl font-bold font-heading">More Projects</h2>
                            </div>
                            <Link
                                href="/projects"
                                className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group"
                            >
                                View All
                                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {otherProjects.map((p, i) => (
                                <motion.div
                                    key={p.slug}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group"
                                >
                                    <Link href={`/projects/${p.slug}`} className="block">
                                        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border/40 bg-card mb-4 group-hover:border-primary/30 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500">
                                            <Image
                                                src={p.image}
                                                alt={p.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        </div>
                                        <h3 className="font-bold font-heading text-lg group-hover:text-primary transition-colors mb-1">{p.title}</h3>
                                        <p className="text-sm text-muted-foreground font-light line-clamp-2">{p.description}</p>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-8 flex justify-center sm:hidden">
                            <Link
                                href="/projects"
                                className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
                            >
                                View All Projects <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
