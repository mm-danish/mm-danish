'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blog/posts';

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-24">
            {/* Background blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-1/4 -left-20 w-[500px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                {/* Back link */}
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group">
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </motion.div>

                {/* Header */}
                <div className="mb-20 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-4"
                    >
                        <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                        <span>Articles & Insights</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-black font-heading tracking-tight mb-8"
                    >
                        Engineering <span className="text-gradient">Blog.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-muted-foreground font-light leading-relaxed"
                    >
                        thoughts on building production-grade software, clean architecture, and the future of the web.
                    </motion.p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={post.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.1 }}
                            className="group flex flex-col"
                        >
                            <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/9] rounded-3xl overflow-hidden border border-border/40 bg-card mb-6 mb-8">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                    <span className="text-white text-sm font-bold flex items-center gap-2">
                                        Read Article <ArrowRight className="h-4 w-4" />
                                    </span>
                                </div>
                            </Link>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                                    <span className="text-primary">{post.category}</span>
                                    <span className="h-1 w-1 rounded-full bg-border" />
                                    <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {post.date}</span>
                                    <span className="h-1 w-1 rounded-full bg-border" />
                                    <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {post.readingTime}</span>
                                </div>

                                <Link href={`/blog/${post.slug}`}>
                                    <h2 className="text-2xl font-bold font-heading group-hover:text-primary transition-colors leading-tight">
                                        {post.title}
                                    </h2>
                                </Link>

                                <p className="text-muted-foreground font-light leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/70 transition-colors">
                                    Continue Reading <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );
}
