'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Download, Mail, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CV_DOWNLOAD_URL } from '@/lib/constants';
import { siteConfig } from '@/config/site';

export function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden pt-24 pb-16 bg-background">
      {/* Refined Background Architecture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            {/* Left side - Precision Content */}
            <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-8"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span>Available for new projects</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight mb-8 leading-[1.05]"
              >
                Building digital <br />
                <span className="text-gradient">products with purpose.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
              >
                I'm <span className="text-foreground font-medium">{siteConfig.name}</span>, a senior software engineer specialized in architecting high-performance systems and cinematic user experiences.
              </motion.p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-16">
                <a href="#contact" className="w-full sm:w-fit">
                  <Button size="lg" className="rounded-full px-8 h-12 text-sm shadow-xl hover:shadow-primary/20 transition-all w-full font-bold group">
                    <Mail className="h-4 w-4 mr-2" />
                    Get In Touch
                  </Button>
                </a>
                <a href={CV_DOWNLOAD_URL} download className="w-full sm:w-fit">
                  <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-sm border border-border hover:bg-muted transition-all w-full font-bold">
                    <Download className="h-4 w-4 mr-2" />
                    Download CV
                  </Button>
                </a>
              </div>

              {/* Tighter Social Proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex items-center justify-center lg:justify-start gap-8 pt-8 border-t border-border/10"
              >
                {[
                  { label: 'Experience', val: '3+ Years' },
                  { label: 'Projects', val: '20+ Built' },
                  { label: 'Expertise', val: 'Full-Stack' }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="text-lg font-bold font-heading leading-none">{stat.val}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right side - Refined Image Profile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-shrink-0 relative order-1 lg:order-2"
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px]">
                {/* Minimalist Aesthetic Frames */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-[3rem] -rotate-3 scale-105" />
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

                {/* Micro-Badges */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 p-3 rounded-2xl bg-card border border-border/50 shadow-xl z-20"
                >
                  <MapPin className="h-5 w-5 text-primary" />
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Explore Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="flex flex-col items-center gap-3 text-muted-foreground/30">
          <span className="text-[9px] font-black uppercase tracking-[0.3em]">Explore</span>
          <div className="w-px h-10 bg-gradient-to-b from-border/50 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
