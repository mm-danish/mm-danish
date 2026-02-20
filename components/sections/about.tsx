'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Briefcase, Award, Target, Zap } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { TechStack } from './tech-stack';

export function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold font-heading mb-4">The Engineer Behind the Code</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              "Turning complex problems into elegant, performance-driven solutions."
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: Briefcase,
                label: 'Experience',
                value: siteConfig.author.experience,
                sub: 'Building Products',
                color: 'from-blue-600 to-indigo-600',
              },
              {
                icon: MapPin,
                label: 'Location',
                value: siteConfig.author.location,
                sub: 'Operating Globally',
                color: 'from-emerald-600 to-teal-600',
              },
              {
                icon: GraduationCap,
                label: 'Education',
                value: 'BS CS',
                sub: 'FUUAST Islamabad',
                color: 'from-zinc-600 to-zinc-800',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative p-6 rounded-[2rem] border border-border/40 bg-card/40 backdrop-blur-xl hover:border-primary/40 transition-all duration-500 overflow-hidden"
              >
                <div className="relative z-10 flex items-center gap-4">
                  <div className={`flex-shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3`}>
                    <item.icon className="h-5 w-5 text-white" />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary mb-1">
                      {item.label}
                    </span>
                    <h3 className="text-xl font-black font-heading tracking-tight text-foreground leading-none mb-1 truncate">
                      {item.value}
                    </h3>
                    <p className="text-[11px] text-muted-foreground/60 font-medium truncate">
                      {item.sub}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                  <Target className="h-3 w-3" />
                  <span>My Mission</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black font-heading tracking-tight leading-tight">
                  Engineering products with <br />
                  <span className="text-gradient">precision and purpose.</span>
                </h3>
              </div>

              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-xl text-muted-foreground leading-relaxed font-light">
                  I specialize in architecting <span className="text-foreground font-semibold">high-performance full-stack applications</span>.
                  My focus is on creating seamless user experiences powered by robust, scalable backends.
                </p>
                <p className="text-lg text-muted-foreground/70 leading-relaxed font-light">
                  With over 3 years in the industry, I've moved beyond just writing code to <span className="text-foreground font-semibold">engineering solutions</span> that drive business value.
                  Whether it's optimizing a React render cycle or designing a distributed system, I bring a meticulous approach to every project.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  { icon: Zap, text: 'Performance-First Design', desc: 'Optimized for speed and scale' },
                  { icon: Award, text: 'Clean Architecture', desc: 'Maintainable and scalable code' },
                ].map((feature, i) => (
                  <div key={i} className="group flex flex-col gap-3 p-6 rounded-[1.5rem] bg-card/40 border border-border/40 hover:border-primary/40 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{feature.text}</h4>
                      <p className="text-xs text-muted-foreground/60 mt-1">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="lg:col-span-5"
            >
              <div className="p-8 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm">
                <h3 className="text-xl font-bold font-heading text-center mb-8">Core Tech Stack</h3>
                <TechStack />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

