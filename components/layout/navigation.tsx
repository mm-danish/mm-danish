'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/cn';

export function Navigation() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = React.useState<string>('');

  // Scroll spy — only active on the home page for anchor sections
  React.useEffect(() => {
    if (pathname !== '/') return;

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
    if (href.startsWith('/#')) {
      // hash link — active based on scroll spy section
      const id = href.substring(2);
      return activeSection === id;
    }
    // page link — active if pathname starts with href
    return pathname.startsWith(href);
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
