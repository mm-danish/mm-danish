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
              { icon: Briefcase, label: 'Experience', value: siteConfig.author.experience, sub: 'Building Products', color: 'from-blue-600 to-indigo-600', shadow: 'shadow-blue-500/20' },
              { icon: MapPin, label: 'Location', value: siteConfig.author.location, sub: 'Operating Globally', color: 'from-emerald-600 to-teal-600', shadow: 'shadow-emerald-500/20' },
              { icon: GraduationCap, label: 'Education', value: 'BS CS', sub: 'FUUAST Islamabad', color: 'from-indigo-600 to-purple-600', shadow: 'shadow-indigo-500/20' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative p-8 rounded-[2rem] border border-border/40 bg-card/40 backdrop-blur-xl hover:border-primary/40 transition-all duration-500 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} ${item.shadow} shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                <h3 className="text-3xl font-bold font-heading mb-1">{item.value}</h3>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{item.label}</p>
                <p className="text-xs text-muted-foreground/60 mt-1">{item.sub}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="lg:col-span-7 space-y-6"
            >
              <h3 className="text-2xl font-bold font-heading flex items-center gap-3">
                <Target className="h-6 w-6 text-primary" />
                My Mission
              </h3>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  I specialize in architecting <span className="text-foreground font-medium">high-performance full-stack applications</span>.
                  My focus is on creating seamless user experiences powered by robust, scalable backends.
                </p>
                <p className="text-lg text-muted-foreground/80 leading-relaxed">
                  With over 3 years in the industry, I've moved beyond just writing code to <span className="text-foreground font-medium">engineering solutions</span> that drive business value.
                  Whether it's optimizing a React render cycle or designing a distributed system, I bring a meticulous approach to every project.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {[
                  { icon: Zap, text: 'Performance-First Design' },
                  { icon: Award, text: 'Clean Architecture' },
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50 border border-border/50">
                    <feature.icon className="h-5 w-5 text-primary" />
                    <span className="font-medium">{feature.text}</span>
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

