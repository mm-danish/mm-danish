'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Navigation } from './navigation';
import { MobileMenu } from './mobile-menu';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { CV_DOWNLOAD_URL } from '@/lib/constants';

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500
        ${isScrolled ? 'py-4' : 'py-6'}
      `}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`
          flex items-center justify-between h-16 px-6 rounded-full
          transition-all duration-500
          ${isScrolled ? 'glass shadow-lg border-primary/10' : 'bg-transparent'}
        `}>
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="h-8 w-8 rounded-lg overflow-hidden flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <Image
                src="/profile.png"
                alt="Profile"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <span className="text-xl font-bold font-heading tracking-tight">
              MM  <span className="text-primary">Danish</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <Navigation />

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Link href={CV_DOWNLOAD_URL} download className="hidden sm:block">
              <Button
                variant="default"
                size="sm"
                className="rounded-full h-10 px-6 font-bold"
              >
                <Download className="h-4 w-4 mr-2" />
                Resume
              </Button>
            </Link>
            <div className="w-px h-6 bg-border hidden sm:block" />
            <div className="flex items-center space-x-2">
              <ThemeToggle />
            </div>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

