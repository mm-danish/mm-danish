'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, CV_DOWNLOAD_URL } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/cn';

export function MobileMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>('home');

  // Prevent scrolling when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    NAV_LINKS.forEach((link) => {
      const sectionId = link.href.startsWith('#') ? link.href.substring(1) : 'home';
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden relative z-[60] h-10 w-10 rounded-full hover:bg-primary/10 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6 text-primary" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            {/* Backdrop with strong blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/90 backdrop-blur-2xl"
              onClick={() => setIsOpen(false)}
            />

            {/* Decorative Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/5 blur-[120px] rounded-full" />
              <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full" />
            </div>

            <div className="relative h-full flex flex-col items-center justify-center px-6">
              <nav className="w-full max-w-sm space-y-8">
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/50 text-center mb-10">Navigation</p>
                  <div className="flex flex-col space-y-2">
                    {NAV_LINKS.map((link, index) => {
                      const sectionId = link.href.startsWith('#') ? link.href.substring(1) : 'home';
                      const isActive = activeSection === sectionId;

                      return (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + index * 0.05 }}
                        >
                          <Link
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "group flex items-center justify-between p-4 rounded-2xl transition-all duration-300",
                              isActive ? "bg-primary/10 text-primary" : "hover:bg-primary/5 text-foreground"
                            )}
                          >
                            <span className={cn(
                              "text-3xl font-bold font-heading tracking-tight transition-all duration-300",
                              isActive ? "translate-x-2" : "group-hover:translate-x-2"
                            )}>
                              {link.name}
                            </span>
                            <ArrowRight className={cn(
                              "h-6 w-6 transition-all duration-300 text-primary",
                              isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"
                            )} />
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + NAV_LINKS.length * 0.05 + 0.1 }}
                  className="pt-10 border-t border-primary/10 flex flex-col items-center space-y-6"
                >
                  <div className="flex items-center gap-6">
                    <ThemeToggle />
                    <span className="text-muted-foreground/30">|</span>
                    <a
                      href={CV_DOWNLOAD_URL}
                      download
                      className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary/80 hover:text-primary transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      Get CV
                    </a>
                  </div>

                  <p className="text-[10px] text-muted-foreground/40 font-medium lowercase tracking-tighter">
                    Ready to build something amazing together?
                  </p>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
