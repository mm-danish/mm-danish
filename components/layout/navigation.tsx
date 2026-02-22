'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/cn';

export function Navigation() {
  const pathname = usePathname();
  // Empty string = top of page (hero), no section in view yet
  const [activeSection, setActiveSection] = React.useState<string>('');

  // Scroll spy — only runs on the home page
  React.useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('');
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-15% 0px -75% 0px',
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

    // Observe the hero section for "Home" active state
    const heroEl = document.getElementById('home') ?? document.getElementById('hero');
    if (heroEl) observer.observe(heroEl);

    // Observe all hash-linked sections
    NAV_LINKS.forEach((link) => {
      const id = link.href.startsWith('/#') ? link.href.substring(2) : null;
      if (id) {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (href: string): boolean => {
    // ── Non-home pages: match by exact pathname ──
    if (pathname !== '/') {
      if (href === '/' || href.startsWith('/#')) return false;
      // Exact match OR child routes (e.g. /projects/toolkit-law still highlights Projects)
      return pathname === href || pathname.startsWith(href + '/');
    }

    // ── Home page ──
    if (href === '/') {
      // "Home" is active only when the hero/home section is in view
      // (i.e. no deeper section has been scrolled into)
      return activeSection === '' || activeSection === 'home' || activeSection === 'hero';
    }

    if (href.startsWith('/#')) {
      return activeSection === href.substring(2);
    }

    // Page links (e.g. /about) — not active when on home
    return false;
  };

  return (
    <nav className="hidden md:flex items-center space-x-6">
      {NAV_LINKS.map((link) => {
        const active = isActive(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'text-sm font-medium transition-all duration-300 relative py-1 px-1',
              active ? 'text-primary' : 'text-muted-foreground hover:text-primary'
            )}
          >
            {link.name}
            {active && (
              <span className="absolute bottom-0 left-1 right-1 h-[2px] bg-primary rounded-full transition-all duration-300" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
