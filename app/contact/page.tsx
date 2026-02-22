'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Mail,
    Github,
    Linkedin,
    Twitter,
    Send,
    ArrowLeft,
    MessageSquare,
    Clock,
    CheckCircle2,
} from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';
import { Card, CardContent } from '@/components/ui/card';

const contactMethods = [
    {
        name: 'Email',
        value: 'mmdanish.cs@gmail.com',
        desc: 'Best for project inquiries and detailed discussions.',
        icon: Mail,
        href: SOCIAL_LINKS.email,
        color: 'from-rose-500 to-rose-600',
        cta: 'Send Email',
    },
    {
        name: 'LinkedIn',
        value: 'linkedin.com/in/mm-danish',
        desc: 'Connect professionally and see my work history.',
        icon: Linkedin,
        href: SOCIAL_LINKS.linkedin,
        color: 'from-blue-600 to-indigo-600',
        cta: 'Connect',
    },
    {
        name: 'GitHub',
        value: 'github.com/mm-danish',
        desc: 'Explore my code, open source contributions, and repos.',
        icon: Github,
        href: SOCIAL_LINKS.github,
        color: 'from-slate-700 to-slate-900 dark:from-slate-400 dark:to-slate-200',
        cta: 'View Profile',
    },
    {
        name: 'Twitter (X)',
        value: '@mmdanishdev',
        desc: 'Follow my dev thoughts, tips, and updates.',
        icon: Twitter,
        href: SOCIAL_LINKS.twitter,
        color: 'from-sky-500 to-blue-400',
        cta: 'Follow',
    },
];

const faqs = [
    {
        q: 'Are you available for freelance projects?',
        a: 'Yes! I\'m open to freelance work, especially full-stack web apps and complex engineering problems.',
    },
    {
        q: 'What is your typical response time?',
        a: 'I aim to respond to all messages within 24-48 hours. For urgent matters, email works best.',
    },
    {
        q: 'Do you work with international clients?',
        a: 'Absolutely. I work remotely with clients globally. Time zone overlap is helpful but not a blocker.',
    },
    {
        q: 'What project sizes do you take on?',
        a: "From MVPs and quick fixes to large-scale production systems — I adapt to the project's needs.",
    },
];

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-24">
            {/* Background blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-1/4 -left-20 w-[500px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

                {/* Back */}
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group">
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </motion.div>

                {/* Hero */}
                <div className="mb-16 max-w-3xl">
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-4">
                        <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                        <span>Let's Connect</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-black font-heading tracking-tight mb-6 leading-[1.05]"
                    >
                        Ready to <span className="text-gradient">innovate?</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-muted-foreground font-light leading-relaxed"
                    >
                        I'm open to freelance opportunities, full-time roles, and exciting collaborations.
                        Pick the channel that works best for you — I'll get back to you quickly.
                    </motion.p>
                </div>

                {/* Availability badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-4 mb-16"
                >
                    <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/20 w-fit">
                        <div className="relative flex h-2 w-2">
                            <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <div className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                            Open to collaboration
                        </span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/40 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Responds within 24h
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/40 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                        Remote friendly
                    </div>
                </motion.div>

                {/* Contact cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-20">
                    {contactMethods.map((method, index) => {
                        const Icon = method.icon;
                        return (
                            <motion.div
                                key={method.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + index * 0.08 }}
                            >
                                <Card className="h-full border border-border/40 bg-card/40 backdrop-blur-xl hover:border-primary/40 transition-all duration-300 group rounded-3xl overflow-hidden">
                                    <CardContent className="p-7 flex flex-col gap-5 h-full">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${method.color} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}>
                                                <Icon className="h-5 w-5 text-white" />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <h2 className="font-bold font-heading text-xl tracking-tight group-hover:text-primary transition-colors">{method.name}</h2>
                                            <p className="text-[12px] text-muted-foreground/60 font-mono">{method.value}</p>
                                            <p className="text-sm text-muted-foreground font-light leading-relaxed">{method.desc}</p>
                                        </div>

                                        <Link
                                            href={method.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-auto inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-primary hover:text-primary/70 group/link"
                                        >
                                            {method.cta}
                                            <Send className="h-3 w-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                        </Link>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                {/* FAQ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <div className="flex items-center gap-2 text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-4">
                        <div className="h-1 w-1 rounded-full bg-primary" />
                        <span>FAQ</span>
                    </div>
                    <h2 className="text-3xl font-bold font-heading tracking-tight mb-10">
                        Common <span className="text-gradient">Questions.</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="p-6 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-xl hover:border-primary/30 transition-all"
                            >
                                <div className="flex items-start gap-3 mb-3">
                                    <MessageSquare className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                    <h3 className="font-bold text-foreground text-[15px] leading-snug">{faq.q}</h3>
                                </div>
                                <p className="text-sm text-muted-foreground font-light leading-relaxed pl-7">{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center p-10 rounded-3xl border border-border/40 bg-card/30 backdrop-blur-xl"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-3">
                        Prefer a direct line?
                    </h2>
                    <p className="text-muted-foreground mb-8 font-light max-w-md mx-auto">
                        Drop me an email and I'll respond within 24 hours.
                    </p>
                    <Link
                        href={SOCIAL_LINKS.email}
                        className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-xl shadow-primary/25 hover:opacity-90 active:scale-95 transition-all"
                    >
                        <Mail className="h-4 w-4" />
                        mmdanish.cs@gmail.com
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
