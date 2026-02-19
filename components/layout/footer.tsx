import Link from 'next/link';
import { Github, Linkedin, Mail, Twitter, Sparkles } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';
import { siteConfig } from '@/config/site';

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
            <Link href="/" className="flex items-center space-x-2 mb-6 group">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold font-heading tracking-tight">
                M M <span className="text-primary">Danish</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Crafting exceptional digital experiences through clean code and innovative engineering. Let's build the future together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-6 font-heading">Sitemap</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="#about" className="text-muted-foreground hover:text-primary transition-all flex items-center gap-2 group">
                  <span className="h-1 w-0 bg-primary group-hover:w-4 transition-all" /> About
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-muted-foreground hover:text-primary transition-all flex items-center gap-2 group">
                  <span className="h-1 w-0 bg-primary group-hover:w-4 transition-all" /> Projects
                </Link>
              </li>
              <li>
                <Link href="#experience" className="text-muted-foreground hover:text-primary transition-all flex items-center gap-2 group">
                  <span className="h-1 w-0 bg-primary group-hover:w-4 transition-all" /> Experience
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-primary transition-all flex items-center gap-2 group">
                  <span className="h-1 w-0 bg-primary group-hover:w-4 transition-all" /> Contact
                </Link>
              </li>
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
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
                    aria-label={key}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="capitalize">{key}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground font-medium">
            © {new Date().getFullYear()} {siteConfig.name}. Designed with passion.
          </p>
          <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
            <span>Next.js 16</span>
            <span>Tailwind CSS 4</span>
            <span>Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

