'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Send, ArrowRight } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const contactMethods = [
  {
    name: 'Email',
    value: 'mmdanish.cs@gmail.com',
    icon: Mail,
    href: SOCIAL_LINKS.email,
    color: 'from-rose-500 to-rose-600',
    shadow: 'shadow-rose-500/20',
  },
  {
    name: 'LinkedIn',
    value: 'linkedin.com/in/mm-danish',
    icon: Linkedin,
    href: SOCIAL_LINKS.linkedin,
    color: 'from-blue-600 to-indigo-600',
    shadow: 'shadow-blue-500/20',
  },
  {
    name: 'GitHub',
    value: 'github.com/mm-danish',
    icon: Github,
    href: SOCIAL_LINKS.github,
    color: 'from-slate-700 to-slate-900 dark:from-slate-400 dark:to-slate-200',
    shadow: 'shadow-slate-500/20',
  },
  {
    name: 'Twitter',
    value: '@mm-danish',
    icon: Twitter,
    href: SOCIAL_LINKS.twitter,
    color: 'from-sky-500 to-blue-400',
    shadow: 'shadow-sky-500/20',
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl sm:text-6xl font-black font-heading tracking-tight mb-6 leading-tight">
                  Ready to <span className="text-gradient">innovate?</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-md font-light">
                  I'm currently opening for freelance opportunities or full-time roles.
                  Let's engineer the future together.
                </p>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/20 w-fit">
                  <div className="relative flex h-2 w-2">
                    <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></div>
                    <div className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Open to collaboration</span>
                </div>

                <Link href={SOCIAL_LINKS.email} className="w-fit">
                  <Button size="lg" className="rounded-full h-14 px-8 text-sm shadow-xl hover:shadow-primary/20 transition-all font-bold group">
                    Start a Conversation <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-fr">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <motion.div
                    key={method.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <Card className="h-full border border-border/40 bg-card/40 backdrop-blur-xl hover:border-primary/40 transition-all duration-300 group rounded-[1.5rem] overflow-hidden">
                      <CardContent className="p-6 flex flex-col items-start gap-4 h-full">
                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${method.color} ${method.shadow} shadow-lg transition-transform duration-500 group-hover:scale-110`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>

                        <div className="space-y-1 mt-auto">
                          <h3 className="font-bold font-heading text-lg tracking-tight group-hover:text-primary transition-colors">{method.name}</h3>
                          <p className="text-[11px] text-muted-foreground/60 truncate max-w-[140px] font-medium">{method.value}</p>
                        </div>

                        <Link
                          href={method.href}
                          target="_blank"
                          rel="noopener"
                          className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:text-primary/80 group/link"
                        >
                          Reach Out <Send className="h-3 w-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
