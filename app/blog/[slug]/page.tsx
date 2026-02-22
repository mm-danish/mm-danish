'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2, Mail, Twitter, Linkedin, Github } from 'lucide-react';
import { blogPosts } from '@/data/blog/posts';

interface Props {
    params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: Props) {
    const { slug } = React.use(params);
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) notFound();

    return (
        <article className="min-h-screen bg-background pt-32 pb-24">
            {/* Background blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                {/* Navigation */}
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-12 flex items-center justify-between">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group">
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Blog
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">Share</span>
                        <div className="flex gap-2">
                            <button className="p-2 rounded-full border border-border/40 hover:border-primary/40 hover:text-primary transition-all"><Twitter className="h-3.5 w-3.5" /></button>
                            <button className="p-2 rounded-full border border-border/40 hover:border-primary/40 hover:text-primary transition-all"><Linkedin className="h-3.5 w-3.5" /></button>
                            <button className="p-2 rounded-full border border-border/40 hover:border-primary/40 hover:text-primary transition-all"><Mail className="h-3.5 w-3.5" /></button>
                        </div>
                    </div>
                </motion.div>

                {/* Post Header */}
                <div className="mb-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-primary mb-6"
                    >
                        <span>{post.category}</span>
                        <span className="h-1 w-1 rounded-full bg-primary/40" />
                        <span className="flex items-center gap-1.5 text-muted-foreground/60"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
                        <span className="h-1 w-1 rounded-full bg-primary/40" />
                        <span className="flex items-center gap-1.5 text-muted-foreground/60"><Clock className="h-3.5 w-3.5" /> {post.readingTime}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-black font-heading tracking-tight mb-8 leading-[1.1]"
                    >
                        {post.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-muted-foreground font-light leading-relaxed mb-12 italic border-l-4 border-primary/20 pl-6"
                    >
                        {post.excerpt}
                    </motion.p>
                </div>

                {/* Featured Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="relative aspect-[21/9] rounded-3xl overflow-hidden border border-border/40 shadow-2xl mb-16"
                >
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                {/* Content Placeholder */}
                <div className="prose prose-invert prose-lg max-w-none mb-20 space-y-8 text-neutral-300 font-light leading-loose">
                    <p>
                        Building high-performance applications in 2026 requires more than just picking a framework.
                        It requires a deep understanding of how state transitions, network latency, and user psychology intersect.
                        In this article, we'll explore the patterns that define the modern "production-grade" web.
                    </p>

                    <h2 className="text-2xl font-bold font-heading text-foreground pt-4">Clean Architecture as a Foundation</h2>
                    <p>
                        Clean architecture isn't just a buzzword; it's a way of decoupling your business logic from external frameworks.
                        By maintaining strict boundaries, we can ensure that our applications remain testable and maintainable as the codebase scales.
                    </p>

                    <div className="bg-card/40 border border-border/40 rounded-3xl p-8 my-12">
                        <h3 className="font-bold font-heading text-lg mb-4 text-primary">Pro Tip: Component Localization</h3>
                        <p className="text-sm m-0">
                            Always keep your types and data as close to the components that use them as possible.
                            Global state should be the absolute last resort, not the default choice.
                        </p>
                    </div>

                    <p>
                        As we move forward into the era of AI-native engineering, the role of the developer is shifting from
                        "writer of code" to "architect of systems". This shift demands a higher level of precision and a
                        closer eye on performance budgets.
                    </p>
                </div>

                {/* Footer info */}
                <div className="pt-12 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 bg-muted">
                            <Image
                                src="https://github.com/mm-danish.png"
                                alt="M Murtaza Danish"
                                width={48}
                                height={48}
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-foreground">Written by M Murtaza Danish</p>
                            <p className="text-xs text-muted-foreground">Full-Stack Production Engineer</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link href="https://github.com/mm-danish" target="_blank" className="text-muted-foreground hover:text-primary transition-colors"><Github className="h-5 w-5" /></Link>
                        <Link href="https://twitter.com/mmdanishdev" target="_blank" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></Link>
                        <Link href="https://linkedin.com/in/mm-danish" target="_blank" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
