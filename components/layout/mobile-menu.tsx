'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X, Download, Github, Linkedin, Twitter } from 'lucide-react';
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
      {/* Hamburger button — hidden when menu is open to avoid bleeding through backdrop */}
      {!isOpen && (
        <button
          className="md:hidden relative z-[70] flex items-center justify-center h-9 w-9 rounded-lg hover:bg-primary/10 transition-colors"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="absolute top-0 right-0 bottom-0 w-[75%] max-w-[300px] bg-card/95 backdrop-blur-2xl border-l border-border/50 shadow-xl flex flex-col"
            >
              {/* Panel header with close button */}
              <div className="flex items-center justify-between px-4 h-14 border-b border-border/40 shrink-0">
                <ThemeToggle />
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-3 py-3">
                {NAV_LINKS.map((link, index) => {
                  const sectionId = link.href.startsWith('#') ? link.href.substring(1) : 'home';
                  const isActive = activeSection === sectionId;

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + index * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        )}
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="px-4 py-4 border-t border-border/40 space-y-3 shrink-0">
                {/* Social icons */}
                <div className="flex items-center gap-2">
                  {[
                    { icon: Github, href: SOCIAL_LINKS.github, label: 'GitHub' },
                    { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
                    { icon: Twitter, href: SOCIAL_LINKS.twitter, label: 'Twitter' },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex items-center justify-center h-8 w-8 rounded-lg bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>

                {/* CV button */}
                <a href={CV_DOWNLOAD_URL} download className="block">
                  <Button size="sm" className="w-full gap-2 rounded-lg font-semibold">
                    <Download className="h-4 w-4" />
                    Download CV
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
