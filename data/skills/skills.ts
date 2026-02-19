import { Skill } from '@/types/skill';

export const skills: Skill[] = [
  // Frontend
  { id: 'nextjs', name: 'Next.js', icon: 'FileCode', category: 'frontend', level: 'expert' },
  { id: 'react', name: 'React.js', icon: 'Code', category: 'frontend', level: 'expert' },
  { id: 'typescript', name: 'TypeScript', icon: 'Code', category: 'frontend', level: 'advanced' },
  { id: 'javascript', name: 'JavaScript ES6+', icon: 'FileCode', category: 'frontend', level: 'expert' },
  { id: 'tailwind', name: 'Tailwind CSS', icon: 'Palette', category: 'frontend', level: 'expert' },
  { id: 'mui', name: 'Material-UI', icon: 'Layout', category: 'frontend', level: 'advanced' },
  
  // Backend
  { id: 'nodejs', name: 'Node.js', icon: 'Server', category: 'backend', level: 'advanced' },
  { id: 'express', name: 'Express.js', icon: 'Network', category: 'backend', level: 'advanced' },
  { id: 'graphql', name: 'GraphQL', icon: 'Workflow', category: 'backend', level: 'advanced' },
  { id: 'rest', name: 'REST APIs', icon: 'Globe', category: 'backend', level: 'expert' },
  
  // Databases
  { id: 'postgresql', name: 'PostgreSQL', icon: 'Database', category: 'database', level: 'advanced' },
  { id: 'mongodb', name: 'MongoDB', icon: 'Database', category: 'database', level: 'advanced' },
  { id: 'redis', name: 'Redis', icon: 'Database', category: 'database', level: 'intermediate' },
  
  // Auth & Payments
  { id: 'auth0', name: 'Auth0', icon: 'Shield', category: 'auth', level: 'advanced' },
  { id: 'jwt', name: 'JWT', icon: 'Key', category: 'auth', level: 'advanced' },
  { id: 'nextauth', name: 'NextAuth', icon: 'ShieldCheck', category: 'auth', level: 'advanced' },
  { id: 'stripe', name: 'Stripe', icon: 'CreditCard', category: 'auth', level: 'intermediate' },
  
  // Cloud & Deployment
  { id: 'vercel', name: 'Vercel', icon: 'Cloud', category: 'cloud', level: 'expert' },
  { id: 'cloudinary', name: 'Cloudinary', icon: 'Image', category: 'cloud', level: 'advanced' },
  { id: 'cicd', name: 'CI/CD', icon: 'GitBranch', category: 'cloud', level: 'intermediate' },
  
  // Testing
  { id: 'jest', name: 'Jest', icon: 'TestTube', category: 'testing', level: 'intermediate' },
  
  // Tools
  { id: 'git', name: 'Git', icon: 'GitBranch', category: 'tools', level: 'advanced' },
  { id: 'bitbucket', name: 'Bitbucket', icon: 'GitBranch', category: 'tools', level: 'advanced' },
  { id: 'agile', name: 'Agile/Scrum', icon: 'Calendar', category: 'tools', level: 'advanced' },
  
  // Languages
  { id: 'english', name: 'English', icon: 'Languages', category: 'language', level: 'expert' },
  { id: 'urdu', name: 'Urdu', icon: 'Languages', category: 'language', level: 'expert' },
  { id: 'shina', name: 'Shina', icon: 'Languages', category: 'language', level: 'intermediate' },
  { id: 'balti', name: 'Balti', icon: 'Languages', category: 'language', level: 'intermediate' },
];

