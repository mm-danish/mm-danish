import { Experience } from '@/types/experience';

export const experience: Experience[] = [
  {
    id: '1',
    company: 'Pixako Technologies',
    position: 'Software Engineer',
    location: 'Remote',
    startDate: '2023-02-01',
    endDate: null,
    current: true,
    description: [
      'Built scalable full-stack applications using Next.js, TypeScript, Node.js, GraphQL, REST APIs, MongoDB, and Redis.',
      'Optimized SEO and performance using SSR/SSG and Redis caching strategies.',
      'Built secure APIs using Auth0, JWT, and NextAuth for authentication.',
      'Worked in Agile/Scrum environment with Git version control and CI/CD pipelines.',
      'Collaborated with cross-functional teams to deliver high-quality software solutions.',
    ],
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'GraphQL', 'REST APIs', 'MongoDB', 'Redis', 'Auth0', 'JWT', 'NextAuth', 'Git', 'CI/CD'],
  },
  {
    id: '2',
    company: 'Fauzz Foundation',
    position: 'Software Engineer',
    location: 'Remote',
    startDate: '2024-01-01',
    endDate: '2024-06-01',
    current: false,
    website: 'https://fauzzfoundation.org',
    description: [
      'Built production website using Next.js App Router with TypeScript.',
      'Designed and implemented PostgreSQL (Neon) database schema.',
      'Integrated Stripe payment gateway for donation processing.',
      'Implemented Cloudinary for media management and optimization.',
      'Optimized SEO and deployed on Vercel with CI/CD.',
    ],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Cloudinary', 'Vercel', 'Tailwind CSS'],
  },
  {
    id: '3',
    company: 'Toolkit.law',
    position: 'React Developer',
    location: 'Remote',
    startDate: '2023-06-01',
    endDate: '2023-12-01',
    current: false,
    website: 'https://toolkit.law',
    description: [
      'Delivered client projects using React.js framework.',
      'Managed multiple projects simultaneously ensuring quality delivery.',
      'Presented solutions to stakeholders and improved overall branding.',
      'Collaborated with design and backend teams to implement features.',
    ],
    technologies: ['React', 'JavaScript', 'CSS', 'HTML', 'Git'],
  },
];

