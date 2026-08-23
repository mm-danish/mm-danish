import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'About – M Murtaza Danish | Full Stack Software Engineer',
  description:
    'Learn about M Murtaza Danish – a Full Stack Software Engineer from Islamabad, Pakistan. 3+ years of experience with Next.js, React, TypeScript, Node.js, and PostgreSQL. Open to freelance and full-time opportunities.',
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: 'About – M Murtaza Danish | Full Stack Software Engineer',
    description:
      'Learn about M Murtaza Danish – a Full Stack Software Engineer from Islamabad, Pakistan with expertise in Next.js, React, TypeScript, and Node.js.',
    url: `${siteConfig.url}/about`,
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'M Murtaza Danish – About',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About – M Murtaza Danish | Full Stack Software Engineer',
    description:
      'Full Stack Software Engineer from Islamabad, Pakistan. Next.js, React, TypeScript, Node.js expert.',
    images: [`${siteConfig.url}/og-image.png`],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
