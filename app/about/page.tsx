'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    GraduationCap,
    MapPin,
    Briefcase,
    Target,
    Zap,
    Award,
    ExternalLink,
    Coffee,
    Heart,
    Code2,
    Globe,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { experience } from '@/data/experience';
import { formatDateRange, calculateDuration } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { CV_DOWNLOAD_URL } from '@/lib/constants';

const values = [
    {
        icon: Target,
        title: 'Precision Engineering',
        desc: 'Every line of code is intentional. I optimize for clarity, performance, and maintainability.',
        color: 'from-blue-600 to-indigo-600',
    },
    {
        icon: Zap,
        title: 'Performance First',
        desc: 'Speed is a feature. I build systems that scale and stay fast under real-world conditions.',
        color: 'from-amber-500 to-orange-600',
    },
    {
        icon: Award,
        title: 'Clean Architecture',
        desc: 'Good software is easy to extend and hard to break. I invest in structure that lasts.',
        color: 'from-emerald-600 to-teal-600',
    },
    {
        icon: Heart,
        title: 'User Empathy',
        desc: 'Technical excellence means nothing if the user experience falls short. I care about both.',
        color: 'from-rose-500 to-pink-600',
    },
];

const interests = [
    { icon: Code2, label: 'Open Source' },
    { icon: Globe, label: 'Web Standards' },
    { icon: Coffee, label: 'Side Projects' },
    { icon: GraduationCap, label: 'Continuous Learning' },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-24">
            {/* Background blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-primary/5 blur-[130px] rounded-full" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

                {/* Back */}
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group">
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </motion.div>

                {/* Hero section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-7 space-y-8"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-primary font-bold tracking-[0.2em] uppercase text-[10px]">
                                <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                                <span>The Engineer</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-heading tracking-tight leading-[1.05]">
                                The story behind<br />
                                <span className="text-gradient">the code.</span>
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed font-light max-w-xl">
                                I'm <span className="text-foreground font-semibold">{siteConfig.name}</span> — a{' '}
                                <span className="text-foreground font-semibold">Software Engineer</span> based in Islamabad, Pakistan.
                                I specialize in architecting high-performance full-stack applications with a focus on clean code,
                                scalable systems, and exceptional user experiences.
                            </p>
                        </div>

                        <div className="flex items-center gap-6 pt-4 border-t border-border/10">
                            {[
                                { label: 'Years Exp.', val: '3+' },
                                { label: 'Projects', val: '20+' },
                                { label: 'Stack', val: 'Full-Stack' },
                            ].map((s) => (
                                <div key={s.label} className="flex flex-col gap-1">
                                    <span className="text-xl font-black font-heading leading-none">{s.val}</span>
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">{s.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <a
                                href={CV_DOWNLOAD_URL}
                                download
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                            >
                                Download CV
                            </a>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card/50 text-sm font-bold hover:border-primary/50 hover:text-primary transition-all"
                            >
                                Let's Talk
                            </Link>
                        </div>
                    </motion.div>

                    {/* Profile image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="lg:col-span-5 flex justify-center lg:justify-end"
                    >
                        <div className="relative w-72 h-72 sm:w-80 sm:h-80">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-[3rem] -rotate-3 scale-105" />
                            <div className="absolute inset-0 bg-card rounded-[3rem] border border-border/50 shadow-2xl overflow-hidden">
                                <Image
                                    src="/main.png"
                                    alt={siteConfig.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
                            </div>
                            {/* Location badge */}
                            <motion.div
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute -top-4 -right-4 flex items-center gap-2 px-3 py-2 rounded-2xl bg-card/80 backdrop-blur-xl border border-primary/20 shadow-xl z-20"
                            >
                                <MapPin className="h-3.5 w-3.5 text-primary" />
                                <span className="text-[10px] font-extrabold tracking-tight">Islamabad, PK</span>
                            </motion.div>
                            {/* Status badge */}
                            <motion.div
                                animate={{ y: [0, 4, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                                className="absolute bottom-4 -left-6 flex items-center gap-2 px-3 py-2 rounded-2xl bg-card/80 backdrop-blur-xl border border-emerald-500/20 shadow-xl z-20"
                            >
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                                <span className="text-[10px] font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400">Available</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* About / Story */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 p-8 sm:p-12 rounded-3xl border border-border/40 bg-card/30 backdrop-blur-xl"
                >
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                            <Target className="h-3 w-3" />
                            <span>My Story</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight mb-6 leading-tight">
                            Engineering products with<br />
                            <span className="text-gradient">precision and purpose.</span>
                        </h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p className="text-lg font-light">
                                I started my journey in software engineering with a passion for solving real-world problems through code.
                                With a <span className="text-foreground font-semibold">BS in Computer Science from FUUAST Islamabad</span>,
                                I built a strong foundation in algorithms, data structures, and software design patterns.
                            </p>
                            <p className="text-base font-light">
                                Over the past{' '}
                                <span className="text-foreground font-semibold">3+ years</span>, I've gone beyond just writing code —
                                I engineer solutions that drive business value. From optimizing React render cycles to designing
                                distributed systems, I bring a meticulous approach to every project.
                            </p>
                            <p className="text-base font-light">
                                Today, I work at <span className="text-foreground font-semibold">Pixako Technologies</span> as a
                                Software Engineer, building scalable full-stack applications using Next.js, TypeScript, Node.js,
                                GraphQL, and modern cloud infrastructure. I'm also open to freelance collaborations and exciting
                                startup opportunities.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Quick facts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {[
                        {
                            icon: Briefcase,
                            label: 'Current Role',
                            value: 'Software Engineer',
                            sub: 'Pixako Technologies',
                            color: 'from-blue-600 to-indigo-600',
                        },
                        {
                            icon: MapPin,
                            label: 'Location',
                            value: 'Islamabad, Pakistan',
                            sub: 'Open to Remote',
                            color: 'from-emerald-600 to-teal-600',
                        },
                        {
                            icon: GraduationCap,
                            label: 'Education',
                            value: 'BS Computer Science',
                            sub: 'FUUAST Islamabad',
                            color: 'from-violet-600 to-purple-600',
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-6 rounded-[2rem] border border-border/40 bg-card/40 backdrop-blur-xl hover:border-primary/40 transition-all duration-500 flex items-center gap-4"
                        >
                            <div className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500`}>
                                <item.icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="min-w-0">
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary block mb-0.5">{item.label}</span>
                                <h3 className="text-base font-black font-heading truncate">{item.value}</h3>
                                <p className="text-[11px] text-muted-foreground/60 font-medium truncate">{item.sub}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Values */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-10"
                    >
                        <div className="flex items-center gap-2 text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-3">
                            <div className="h-1 w-1 rounded-full bg-primary" />
                            <span>What I Believe In</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight">
                            Engineering <span className="text-gradient">Values.</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {values.map((v, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group flex gap-5 p-6 rounded-3xl border border-border/40 bg-card/40 backdrop-blur-xl hover:border-primary/40 transition-all duration-300"
                            >
                                <div className={`flex-shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500`}>
                                    <v.icon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{v.title}</h3>
                                    <p className="text-sm text-muted-foreground/70 font-light leading-relaxed">{v.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Experience Timeline */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-10"
                    >
                        <div className="flex items-center gap-2 text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-3">
                            <div className="h-1 w-1 rounded-full bg-primary" />
                            <span>Career Path</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight">
                            Work <span className="text-gradient">Experience.</span>
                        </h2>
                    </motion.div>

                    <div className="space-y-6">
                        {experience.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <Card className="border-border/40 bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 rounded-[1.5rem] group">
                                    <CardContent className="p-6 md:p-8">
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary flex-wrap">
                                                    <span>{formatDateRange(exp.startDate, exp.endDate)}</span>
                                                    <span className="text-muted-foreground/30">•</span>
                                                    <span className="text-muted-foreground/60">{calculateDuration(exp.startDate, exp.endDate)}</span>
                                                    {exp.current && (
                                                        <span className="flex items-center gap-1 text-emerald-500">
                                                            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                                            Current
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="text-xl md:text-2xl font-bold font-heading group-hover:text-primary transition-colors">
                                                    {exp.position}
                                                </h3>
                                                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                                    <Briefcase className="h-3.5 w-3.5 opacity-40" />
                                                    <span className="font-semibold text-foreground/80">{exp.company}</span>
                                                    {exp.website && (
                                                        <a href={exp.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                                            <ExternalLink className="h-3.5 w-3.5" />
                                                        </a>
                                                    )}
                                                    <span className="opacity-40">·</span>
                                                    <MapPin className="h-3.5 w-3.5 opacity-40" />
                                                    <span className="opacity-60">{exp.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <ul className="space-y-2 mb-5">
                                            {exp.description.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                                                    <div className="mt-2.5 h-1 w-1 rounded-full bg-primary/50 shrink-0" />
                                                    <p className="text-sm leading-relaxed font-light">{item}</p>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex flex-wrap gap-1.5">
                                            {exp.technologies.map((tech) => (
                                                <span key={tech} className="px-2.5 py-1 rounded-lg bg-primary/5 border border-primary/10 text-[10px] font-bold uppercase tracking-tight text-muted-foreground/70">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Interests */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-8 sm:p-10 rounded-3xl border border-border/40 bg-card/30 backdrop-blur-xl mb-12"
                >
                    <h2 className="text-2xl font-bold font-heading mb-6">Beyond the Terminal</h2>
                    <div className="flex flex-wrap gap-3">
                        {interests.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-muted/30 text-sm font-medium text-muted-foreground hover:border-primary/40 hover:text-primary transition-all">
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-4">
                        Let's build something <span className="text-gradient">great together.</span>
                    </h2>
                    <p className="text-muted-foreground mb-8 font-light">Available for freelance work and full-time opportunities.</p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90 shadow-xl shadow-primary/20 transition-all"
                    >
                        Get In Touch
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
