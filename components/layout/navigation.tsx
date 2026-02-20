'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/cn';

export function Navigation() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = React.useState<string>('home');

  React.useEffect(() => {
    // Scroll Spy Logic
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Detect when section is roughly in the middle/upper part of screen
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

    // Observe all sections that have IDs matching our nav links
    NAV_LINKS.forEach((link) => {
      if (link.href.startsWith('#')) {
        const sectionId = link.href.substring(1);
        const element = document.getElementById(sectionId);
        if (element) observer.observe(element);
      } else if (link.href === '/') {
        // Handle home section manually or observe a top element
        const heroSection = document.getElementById('hero') || document.querySelector('section');
        if (heroSection) observer.observe(heroSection);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="hidden md:flex items-center space-x-6">
      {NAV_LINKS.map((link) => {
        const sectionId = link.href.startsWith('#') ? link.href.substring(1) : 'home';
        // Special case for Home link - it might be '/' in href but we track it as 'home' or first section
        const isActive = activeSection === sectionId || (link.href === '/' && activeSection === 'hero');

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'text-sm font-medium transition-all duration-300 relative py-1 px-1',
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
            )}
          >
            {link.name}
            {isActive && (
              <span className="absolute bottom-0 left-1 right-1 h-[2px] bg-primary rounded-full transition-all duration-300" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
