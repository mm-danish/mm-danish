import Link from 'next/link';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { SOCIAL_LINKS, NAV_LINKS } from '@/lib/constants';
import { siteConfig } from '@/config/site';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="h-8 w-8 rounded-lg overflow-hidden flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 ring-1 ring-primary/20 bg-background/50">
                <Image
                  src="/profile.png"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold font-heading tracking-tight">
                  MM <span className="text-primary">Danish</span>
                </span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 uppercase tracking-wider font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 select-none">
                  Beta
                </Badge>
              </div>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Crafting exceptional digital experiences through clean code and innovative engineering. Let's build the future together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-6 font-heading">Sitemap</h3>
            <ul className="space-y-4 text-sm font-medium">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-all flex items-center gap-2 group"
                  >
                    <span className="h-1 w-0 bg-primary group-hover:w-4 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-6 font-heading">Social</h3>
            <div className="flex flex-col space-y-4">
              {Object.entries(SOCIAL_LINKS).map(([key, url]) => {
                const Icon = socialIcons[key as keyof typeof socialIcons];
                if (!Icon) return null;
                return (
                  <Link
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
                    aria-label={key}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="capitalize">{key}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. Designed with passion.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-medium">
            <span>Next.js 16</span>
            <span className="w-1 h-1 rounded-full bg-border/50" />
            <span>Tailwind CSS 4</span>
            <span className="w-1 h-1 rounded-full bg-border/50" />
            <span>Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

