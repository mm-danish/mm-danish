export type LearningCategory = 
  | 'Node.js'
  | 'React.js'
  | 'Next.js'
  | 'TypeScript'
  | 'MongoDB'
  | 'Prisma'
  | 'Express.js'
  | 'TailwindCSS'
  | 'Engineering Architecture'
  | 'All';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface LearningItem {
  id: string;
  title: string;
  category: LearningCategory;
  content: string;
  codeSnippet?: string;
  tags: string[];
  difficulty: Difficulty;
  dateAdded: string;
  isFavorite?: boolean;
}

export const learningCategories: { name: LearningCategory; color: string; darkColor: string; icon: string; description: string }[] = [
  { name: 'All', color: 'from-slate-500 to-slate-600', darkColor: 'bg-white/10 text-white', icon: 'Library', description: 'Everything in your brain' },
  { name: 'Node.js', color: 'from-green-500 to-emerald-600', darkColor: 'bg-green-500/10 text-green-400', icon: 'Server', description: 'Server-side JavaScript runtime' },
  { name: 'React.js', color: 'from-cyan-400 to-blue-500', darkColor: 'bg-cyan-500/10 text-cyan-400', icon: 'Atom', description: 'UI component library' },
  { name: 'Next.js', color: 'from-gray-600 to-gray-800', darkColor: 'bg-gray-100/10 text-gray-200', icon: 'Triangle', description: 'Full-stack React framework' },
  { name: 'TypeScript', color: 'from-blue-500 to-blue-700', darkColor: 'bg-blue-500/10 text-blue-400', icon: 'FileCode2', description: 'Typed JavaScript superset' },
  { name: 'MongoDB', color: 'from-green-500 to-green-700', darkColor: 'bg-green-600/10 text-green-500', icon: 'Database', description: 'NoSQL document database' },
  { name: 'Prisma', color: 'from-indigo-500 to-violet-600', darkColor: 'bg-indigo-500/10 text-indigo-400', icon: 'DatabaseZap', description: 'Type-safe ORM' },
  { name: 'Express.js', color: 'from-gray-500 to-gray-700', darkColor: 'bg-gray-400/10 text-gray-400', icon: 'Cpu', description: 'Minimal Node.js framework' },
  { name: 'TailwindCSS', color: 'from-cyan-400 to-teal-500', darkColor: 'bg-cyan-500/10 text-cyan-400', icon: 'Palette', description: 'Utility-first CSS framework' },
  { name: 'Engineering Architecture', color: 'from-purple-500 to-fuchsia-600', darkColor: 'bg-purple-500/10 text-purple-400', icon: 'Building2', description: 'System design & patterns' },
];

export const learningData: LearningItem[] = [
  // ── Node.js ──────────────────────────────────────────────
  {
    id: 'node-1',
    title: 'What is the Event Loop in Node.js?',
    category: 'Node.js',
    content: 'The event loop is what allows Node.js to perform non-blocking I/O operations despite the fact that JavaScript is single-threaded, by offloading operations to the system kernel whenever possible. It has 6 phases: timers, pending callbacks, idle/prepare, poll, check, and close callbacks.',
    tags: ['Event Loop', 'Asynchronous', 'Core'],
    difficulty: 'intermediate',
    dateAdded: '2026-04-11',
  },
  {
    id: 'node-2',
    title: 'Streams in Node.js — when & why?',
    category: 'Node.js',
    content: 'Streams let you process data piece-by-piece instead of loading everything into memory. There are 4 types: Readable, Writable, Duplex, and Transform. Use them for large files, HTTP responses, or any I/O-bound task.',
    codeSnippet: `const fs = require('fs');
const readStream = fs.createReadStream('bigfile.txt');
readStream.on('data', (chunk) => {
  console.log('Received', chunk.length, 'bytes');
});
readStream.on('end', () => console.log('Done'));`,
    tags: ['Streams', 'Performance', 'I/O'],
    difficulty: 'intermediate',
    dateAdded: '2026-04-12',
  },
  {
    id: 'node-3',
    title: 'Worker Threads vs Child Process',
    category: 'Node.js',
    content: 'Worker Threads share memory and are lighter — best for CPU-heavy JS tasks. Child Processes spawn a new V8 instance — better for running external programs or full isolation. Use worker_threads for parallel computation within the same process.',
    tags: ['Concurrency', 'Performance', 'Multi-threading'],
    difficulty: 'advanced',
    dateAdded: '2026-04-13',
  },

  // ── React.js ─────────────────────────────────────────────
  {
    id: 'react-1',
    title: 'Intersection Observer for Scroll Animations',
    category: 'React.js',
    content: 'You can use the Intersection Observer API in a custom React hook (e.g., `useInView`) to trigger Framer Motion animations only when an element scrolls into the viewport. This vastly improves performance over listening to raw scroll events.',
    codeSnippet: `function useInView(ref, options) {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      options
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);
  return isInView;
}`,
    tags: ['Hooks', 'Animation', 'Performance'],
    difficulty: 'intermediate',
    dateAdded: '2026-04-14',
  },
  {
    id: 'react-2',
    title: 'React.memo vs useMemo vs useCallback',
    category: 'React.js',
    content: 'React.memo wraps a component to skip re-renders if props haven\'t changed. useMemo memoizes a computed value. useCallback memoizes a function reference. Use React.memo on pure components, useMemo for expensive calculations, and useCallback for stable function refs passed to memoized children.',
    tags: ['Optimization', 'Memoization', 'Core'],
    difficulty: 'intermediate',
    dateAdded: '2026-04-10',
  },
  {
    id: 'react-3',
    title: 'Why keys matter in lists',
    category: 'React.js',
    content: 'Keys help React identify which items have changed, added, or removed. Using index as key is fine for static lists, but causes bugs with dynamic lists (reordering, deleting). Always use unique stable IDs as keys when the list can change.',
    tags: ['Lists', 'Reconciliation', 'Core'],
    difficulty: 'beginner',
    dateAdded: '2026-04-09',
  },

  // ── Next.js ──────────────────────────────────────────────
  {
    id: 'next-1',
    title: 'How does Next.js App Router handle SSG?',
    category: 'Next.js',
    content: 'Next.js automatically statically generates your pages if they do not feature dynamic functions (like cookies, headers) or uncached data requests. You can explicitly cache data requests using the `fetch` API options `cache: "force-cache"`.',
    tags: ['SSG', 'App Router', 'Rendering'],
    difficulty: 'intermediate',
    dateAdded: '2026-04-10',
  },
  {
    id: 'next-2',
    title: 'Server Actions — Mutate data without API routes',
    category: 'Next.js',
    content: 'Server Actions let you define async server functions that can be called directly from client components using form actions or `startTransition`. They run only on the server, auto-revalidate, and eliminate the need for separate API route handlers for mutations.',
    codeSnippet: `// app/actions.ts
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  await db.post.create({ data: { title } });
  revalidatePath('/posts');
}`,
    tags: ['Server Actions', 'Mutations', 'App Router'],
    difficulty: 'intermediate',
    dateAdded: '2026-04-11',
  },
  {
    id: 'next-3',
    title: 'Parallel Routes & Intercepting Routes',
    category: 'Next.js',
    content: 'Parallel routes (@folder) let you render multiple pages simultaneously in the same layout — great for modals, dashboards, split views. Intercepting routes ((..) convention) let you show a route in context (e.g., photo modal) while keeping the URL updated.',
    tags: ['Routing', 'Advanced', 'App Router'],
    difficulty: 'advanced',
    dateAdded: '2026-04-12',
  },

  // ── TypeScript ───────────────────────────────────────────
  {
    id: 'ts-1',
    title: 'Utility Types: Pick, Omit, Partial, Required',
    category: 'TypeScript',
    content: 'Pick<T, K> creates a type with only selected keys. Omit<T, K> excludes keys. Partial<T> makes all props optional. Required<T> makes them all required. These compose beautifully for API response typing.',
    codeSnippet: `type User = { id: string; name: string; email: string; role: string };

type UserPreview = Pick<User, 'id' | 'name'>;
type UserUpdate = Partial<Omit<User, 'id'>>;
// UserUpdate = { name?: string; email?: string; role?: string }`,
    tags: ['Utility Types', 'Generics', 'Core'],
    difficulty: 'intermediate',
    dateAdded: '2026-04-09',
  },
  {
    id: 'ts-2',
    title: 'Discriminated Unions for type-safe state',
    category: 'TypeScript',
    content: 'A discriminated union uses a common literal property (the discriminant) so TypeScript can narrow the type in conditionals. Perfect for modeling API states (loading, success, error) or finite state machines.',
    codeSnippet: `type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

function render(state: AsyncState<User[]>) {
  switch (state.status) {
    case 'loading': return <Spinner />;
    case 'success': return <List data={state.data} />;
    case 'error':   return <Error msg={state.error.message} />;
  }
}`,
    tags: ['Unions', 'Type Safety', 'Patterns'],
    difficulty: 'advanced',
    dateAdded: '2026-04-10',
  },

  // ── MongoDB ──────────────────────────────────────────────
  {
    id: 'mongo-1',
    title: 'Indexing strategies for MongoDB',
    category: 'MongoDB',
    content: 'Indexes speed up queries but slow down writes. Use compound indexes for multi-field queries (field order matters!). Use `explain()` to profile queries. Partial indexes save space by indexing only matching documents.',
    tags: ['Indexes', 'Performance', 'Query'],
    difficulty: 'intermediate',
    dateAdded: '2026-04-10',
  },
  {
    id: 'mongo-2',
    title: 'Aggregation Pipeline essentials',
    category: 'MongoDB',
    content: 'The aggregation pipeline processes documents in stages: $match (filter), $group (aggregate), $project (reshape), $sort, $lookup (join), $unwind (flatten arrays). Each stage passes results to the next. Put $match early to reduce data flowing through.',
    codeSnippet: `db.orders.aggregate([
  { $match: { status: 'completed' } },
  { $group: { _id: '$customerId', total: { $sum: '$amount' } } },
  { $sort: { total: -1 } },
  { $limit: 10 }
]);`,
    tags: ['Aggregation', 'Pipeline', 'Query'],
    difficulty: 'advanced',
    dateAdded: '2026-04-11',
  },

  // ── Prisma ───────────────────────────────────────────────
  {
    id: 'prisma-1',
    title: 'Why use Prisma over Mongoose?',
    category: 'Prisma',
    content: 'Prisma is a type-safe ORM that generates a fully typed Prisma Client based on your database schema. Mongoose relies on manual schema definitions in JavaScript, making it more prone to runtime type errors, whereas Prisma catches them at compile time.',
    tags: ['ORM', 'Database', 'TypeScript'],
    difficulty: 'beginner',
    dateAdded: '2026-04-12',
  },
  {
    id: 'prisma-2',
    title: 'Prisma Transactions — interactive vs sequential',
    category: 'Prisma',
    content: 'Sequential transactions ($transaction([...])) run an array of operations. Interactive transactions ($transaction(async (tx) => {...})) give you a transaction client for complex logic with conditional queries. Interactive is more flexible but holds a DB connection longer.',
    codeSnippet: `// Interactive transaction
await prisma.$transaction(async (tx) => {
  const user = await tx.user.findUnique({ where: { id } });
  if (user.balance < amount) throw new Error('Insufficient');
  await tx.user.update({
    where: { id },
    data: { balance: { decrement: amount } },
  });
});`,
    tags: ['Transactions', 'Database', 'Advanced'],
    difficulty: 'advanced',
    dateAdded: '2026-04-13',
  },

  // ── Express.js ───────────────────────────────────────────
  {
    id: 'express-1',
    title: 'Middleware execution order matters',
    category: 'Express.js',
    content: 'Express middleware runs top-to-bottom. Error-handling middleware must have 4 parameters (err, req, res, next) and be registered AFTER routes. Use `express.json()` before route handlers. Order: cors → helmet → bodyParser → auth → routes → errorHandler.',
    tags: ['Middleware', 'Architecture', 'Core'],
    difficulty: 'beginner',
    dateAdded: '2026-04-09',
  },
  {
    id: 'express-2',
    title: 'Global error handler pattern',
    category: 'Express.js',
    content: 'Wrap async route handlers in a function that catches errors and passes them to `next()`. Then use a single global error-handling middleware to format and send error responses consistently.',
    codeSnippet: `const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Usage
app.get('/users', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
}));

// Global error handler (must be last)
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});`,
    tags: ['Error Handling', 'Patterns', 'Middleware'],
    difficulty: 'intermediate',
    dateAdded: '2026-04-10',
  },

  // ── TailwindCSS ──────────────────────────────────────────
  {
    id: 'tw-1',
    title: 'Dark mode with class strategy',
    category: 'TailwindCSS',
    content: 'Set `darkMode: "class"` in tailwind.config. Then use `dark:` prefix variants. Pair with next-themes for SSR-safe toggling. The class strategy gives you full control vs the media strategy which follows system preference.',
    tags: ['Dark Mode', 'Theming', 'Config'],
    difficulty: 'beginner',
    dateAdded: '2026-04-09',
  },
  {
    id: 'tw-2',
    title: 'Creating reusable component classes with @apply',
    category: 'TailwindCSS',
    content: 'Use @apply in a CSS file to compose utility classes into reusable component styles. Great for buttons, cards, inputs. But don\'t overuse it — the point of Tailwind is utility-first. Reserve @apply for truly repeated patterns.',
    codeSnippet: `/* globals.css */
@layer components {
  .btn-primary {
    @apply px-6 py-2 rounded-lg bg-blue-600 text-white
           font-semibold hover:bg-blue-700 transition-colors
           focus:outline-none focus:ring-2 focus:ring-blue-500;
  }
}`,
    tags: ['Components', 'CSS', 'Patterns'],
    difficulty: 'beginner',
    dateAdded: '2026-04-10',
  },

  // ── Engineering Architecture ─────────────────────────────
  {
    id: 'arch-1',
    title: 'Microservices vs Monolith Architecture',
    category: 'Engineering Architecture',
    content: 'Monoliths bundle all functionality into a single application, which makes them easier to deploy initially but harder to scale. Microservices break the app down into independent services, improving scalability and enabling polyglot persistence, but adding operational complexity.',
    tags: ['Architecture', 'Scale', 'System Design'],
    difficulty: 'intermediate',
    dateAdded: '2026-04-13',
  },
  {
    id: 'arch-2',
    title: 'CQRS — Command Query Responsibility Segregation',
    category: 'Engineering Architecture',
    content: 'CQRS splits your data model into a write model (commands) and a read model (queries). Write side handles business logic and validation. Read side is optimized for fast queries with denormalized views. Pairs well with Event Sourcing.',
    tags: ['CQRS', 'Patterns', 'Scale'],
    difficulty: 'advanced',
    dateAdded: '2026-04-14',
  },
  {
    id: 'arch-3',
    title: 'The 12-Factor App methodology',
    category: 'Engineering Architecture',
    content: 'A set of 12 best practices for building SaaS apps: codebase in version control, explicit dependencies, config in env vars, backing services as attached resources, strict build/run separation, stateless processes, port binding, concurrency via process model, disposability, dev/prod parity, logs as event streams, admin processes.',
    tags: ['Best Practices', 'DevOps', 'Cloud'],
    difficulty: 'intermediate',
    dateAdded: '2026-04-11',
  },
];
