import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { BlogClient } from './blog-client';

export const metadata: Metadata = {
  title: 'Blog – Engineering Articles & Insights | M Murtaza Danish',
  description:
    'Read articles by M Murtaza Danish on full-stack engineering, Next.js, TypeScript, clean architecture, Node.js, and the future of web development.',
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  openGraph: {
    title: 'Blog – Engineering Articles & Insights | M Murtaza Danish',
    description:
      'Thoughts on building production-grade software, clean architecture, and the future of the web — by M Murtaza Danish.',
    url: `${siteConfig.url}/blog`,
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'M Murtaza Danish Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog – M Murtaza Danish',
    description:
      'Engineering articles on Next.js, TypeScript, Node.js, and production-grade software.',
    images: [`${siteConfig.url}/og-image.png`],
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
