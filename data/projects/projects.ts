import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Fauzz Foundation',
    description: 'Production website built with Next.js App Router, TypeScript, PostgreSQL, Stripe payments, and Cloudinary integration.',
    longDescription: 'A full-stack production application for Fauzz Foundation featuring a modern Next.js 16 App Router architecture, TypeScript for type safety, PostgreSQL database hosted on Neon, Stripe payment integration for donations, and Cloudinary for media management. The site is fully SEO optimized and deployed on Vercel.',
    image: 'https://api.microlink.io/?url=https://fauzzfoundation.org&screenshot=true&meta=false&embed=screenshot.url',
    liveUrl: 'https://fauzzfoundation.org/',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Cloudinary', 'Tailwind CSS', 'Vercel'],
    featured: true,
    category: 'fullstack',
    year: 2024,
    slug: 'fauzz-foundation',
  },
  {
    id: '2',
    title: 'Toolkit.law',
    description: 'Client project delivered using React with focus on quality delivery and improved branding.',
    longDescription: 'A professional legal toolkit platform built with React. Managed multiple client projects ensuring quality delivery, presented solutions to stakeholders, and improved overall branding and user experience.',
    image: 'https://api.microlink.io/?url=https://toolkit.law&screenshot=true&meta=false&embed=screenshot.url',
    liveUrl: 'https://toolkit.law/',
    technologies: ['React', 'JavaScript', 'CSS', 'HTML'],
    featured: true,
    category: 'frontend',
    year: 2023,
    slug: 'toolkit-law',
  },
  {
    id: '3',
    title: 'Sadpara Experts',
    description: 'High-altitude mountaineering and trekking platform built for the legendary Sadpara family.',
    longDescription: 'A premium expedition booking and trekking discovery platform. Features a modern UI/UX for mountaineers, detailed trek information, and is designed to showcase the heritage and expertise of the Sadpara mountain guides.',
    image: 'https://api.microlink.io/?url=https://sadparaexpert.vercel.app&screenshot=true&meta=false&embed=screenshot.url',
    liveUrl: 'https://sadparaexpert.vercel.app/',
    technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript','Postgres','Vercel','Stripe'],
    featured: true,
    category: 'fullstack',
    year: 2024,
    slug: 'sadpara-experts',
  },
];

