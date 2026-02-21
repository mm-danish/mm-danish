'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, Download, Github, Linkedin, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, CV_DOWNLOAD_URL, SOCIAL_LINKS } from '@/lib/constants';
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

  // Scroll spy logic
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
        className="md:hidden relative z-[70] h-10 w-10 rounded-full hover:bg-primary/10 transition-colors"
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
          <div className="fixed inset-0 z-[60] md:hidden">
            {/* Backdrop with elegant blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-[85%] max-w-[400px] bg-card/95 backdrop-blur-3xl border-l border-primary/10 shadow-2xl flex flex-col"
            >
              {/* Top section with background pattern */}
              <div className="absolute top-0 right-0 w-full h-40 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none -z-10" />

              <div className="flex-1 overflow-y-auto px-8 pt-24 pb-12">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/40 mb-12">Navigation</p>

                <nav className="space-y-2">
                  {NAV_LINKS.map((link, index) => {
                    const sectionId = link.href.startsWith('#') ? link.href.substring(1) : 'home';
                    const isActive = activeSection === sectionId;

                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "group flex items-center justify-between py-4 transition-all duration-300 border-b border-primary/5",
                            isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <span className="text-xl font-bold font-heading tracking-tight">
                            {link.name}
                          </span>
                          <motion.div
                            animate={isActive ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </motion.div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <div className="mt-16 space-y-8">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/40 mb-6">Socials</p>
                    <div className="flex items-center gap-6">
                      {[
                        { icon: Github, href: SOCIAL_LINKS.github },
                        { icon: Linkedin, href: SOCIAL_LINKS.linkedin },
                        { icon: Twitter, href: SOCIAL_LINKS.twitter }
                      ].map((social, i) => (
                        <motion.a
                          key={i}
                          href={social.href}
                          target="_blank"
                          rel="noopener"
                          whileHover={{ y: -2 }}
                          className="p-3 rounded-2xl bg-primary/5 text-muted-foreground hover:text-primary transition-colors hover:bg-primary/10"
                        >
                          <social.icon className="h-5 w-5" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom footer for menu */}
              <div className="p-8 border-t border-primary/5 bg-primary/[0.02]">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">Theme</span>
                    <span className="text-xs font-medium">Toggle Appearance</span>
                  </div>
                  <ThemeToggle />
                </div>

                <a
                  href={CV_DOWNLOAD_URL}
                  download
                  className="w-full"
                >
                  <Button className="w-full rounded-2xl h-14 font-bold tracking-tight shadow-xl shadow-primary/10 group flex items-center justify-center gap-2">
                    <Download className="h-4 w-4 group-hover:animate-bounce" />
                    Download Resume
                  </Button>
                </a>

                <p className="text-center mt-6 text-[10px] text-muted-foreground/30 font-medium">
                  © 2024 MM Danish • Built with precision
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
