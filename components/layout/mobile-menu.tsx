'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, CV_DOWNLOAD_URL } from '@/lib/constants';
import { cn } from '@/lib/cn';

export function MobileMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>('');
  const pathname = usePathname();
  const ref = React.useRef<HTMLDivElement>(null);

  // Close on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  // Scroll spy — only on homepage
  React.useEffect(() => {
    if (pathname !== '/') return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    NAV_LINKS.forEach((link) => {
      const id = link.href.startsWith('/#') ? link.href.substring(2) : null;
      if (id) {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return activeSection === href.substring(2);
    return pathname.startsWith(href);
  };

  return (
    <div ref={ref} className="relative md:hidden">
      {/* Toggle button */}
      <button
        className="flex items-center justify-center h-9 w-9 rounded-lg hover:bg-primary/10 transition-colors"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Menu className="h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-xl overflow-hidden z-[70]"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors',
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  )}
                  <span className={cn(!active && 'pl-4')}>{link.name}</span>
                </Link>
              );
            })}

            {/* Divider + Resume button */}
            <div className="border-t border-border/40" />
            <div className="p-2">
              <a
                href={CV_DOWNLOAD_URL}
                download
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
              >
                <Download className="h-3.5 w-3.5 shrink-0" />
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
