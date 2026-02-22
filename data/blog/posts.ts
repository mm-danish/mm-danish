export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  readingTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: 'Building Scalable Full-Stack Apps with Next.js 16',
    slug: 'scalable-nextjs-16',
    date: '2026-02-15',
    excerpt: 'Explore the latest features of Next.js 16, including advanced parallel routing and server actions for high-performance applications.',
    content: 'Full content for the blog post...',
    image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=800',
    category: 'Engineering',
    readingTime: '6 min read',
  },
  {
    title: 'The Future of Web Development: AI-Powered Coding',
    slug: 'ai-powered-coding',
    date: '2026-02-10',
    excerpt: 'How AI agents are transforming the way engineers build software and why collaborative AI is the new standard.',
    content: 'Full content for the blog post...',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    category: 'Future Tech',
    readingTime: '5 min read',
  },
];
