export type LearningCategory =
  | 'Node.js'
  | 'React.js'
  | 'Next.js'
  | 'TypeScript'
  | 'MongoDB'
  | 'Prisma'
  | 'Express.js'
  | 'TailwindCSS'
  | 'Engineering';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface LearningItem {
  id: string;
  category: LearningCategory;
  title: string;
  content: string;
  code?: string;
  difficulty: Difficulty;
  date: string;
}

export interface CategoryMeta {
  name: LearningCategory;
  icon: string;
  accent: string;        // tailwind text color
  bg: string;            // tailwind bg color for pill
  gradient: string;      // for the side bar highlight
}

export const CATEGORIES: CategoryMeta[] = [
  { name: 'Node.js',         icon: '⬡',  accent: 'text-emerald-400', bg: 'bg-emerald-500/10',  gradient: 'from-emerald-500 to-green-400' },
  { name: 'React.js',        icon: '⚛',  accent: 'text-cyan-400',    bg: 'bg-cyan-500/10',     gradient: 'from-cyan-400 to-blue-500' },
  { name: 'Next.js',         icon: '▲',  accent: 'text-white',       bg: 'bg-white/10',        gradient: 'from-gray-300 to-white' },
  { name: 'TypeScript',      icon: 'TS', accent: 'text-blue-400',    bg: 'bg-blue-500/10',     gradient: 'from-blue-500 to-blue-400' },
  { name: 'MongoDB',         icon: '🍃', accent: 'text-green-400',   bg: 'bg-green-500/10',    gradient: 'from-green-500 to-emerald-400' },
  { name: 'Prisma',          icon: '◆',  accent: 'text-indigo-400',  bg: 'bg-indigo-500/10',   gradient: 'from-indigo-500 to-violet-400' },
  { name: 'Express.js',      icon: '⚡', accent: 'text-gray-300',   bg: 'bg-gray-400/10',     gradient: 'from-gray-400 to-gray-300' },
  { name: 'TailwindCSS',     icon: '🎨', accent: 'text-teal-400',   bg: 'bg-teal-500/10',     gradient: 'from-teal-400 to-cyan-400' },
  { name: 'Engineering',     icon: '🏗', accent: 'text-purple-400', bg: 'bg-purple-500/10',   gradient: 'from-purple-500 to-fuchsia-500' },
];

export const NOTES: LearningItem[] = [
  // ── Node.js ─────────────────────────────────────────────────────────────
  {
    id: 'node-1',
    category: 'Node.js',
    title: 'The Event Loop',
    content: 'Node.js is single-threaded but non-blocking because of the event loop. It has 6 phases — timers, pending callbacks, idle/prepare, poll, check, close callbacks. I/O is offloaded to the OS; the loop processes callbacks when they\'re ready.',
    difficulty: 'intermediate',
    date: '2026-04-11',
  },
  {
    id: 'node-2',
    category: 'Node.js',
    title: 'Streams vs Buffers',
    content: 'Buffer loads the whole thing into memory. Streams process data chunk-by-chunk — essential for large files or HTTP bodies. There are 4 stream types: Readable, Writable, Duplex, Transform. Always prefer streams for I/O-heavy work.',
    code: `const fs = require('fs');
fs.createReadStream('big.csv')
  .pipe(processLine())
  .pipe(fs.createWriteStream('out.csv'));`,
    difficulty: 'intermediate',
    date: '2026-04-12',
  },
  {
    id: 'node-3',
    category: 'Node.js',
    title: 'Worker Threads vs Child Process',
    content: 'Worker Threads share memory, great for CPU-heavy JS. Child Process spawns a fresh V8 instance — better for isolation or running binaries. Rule of thumb: computation → Worker Threads, external programs → Child Process.',
    difficulty: 'advanced',
    date: '2026-04-13',
  },
  {
    id: 'node-4',
    category: 'Node.js',
    title: 'process.nextTick vs setImmediate',
    content: 'process.nextTick fires before the next event loop iteration — before any I/O. setImmediate fires in the check phase, after I/O. Overusing nextTick can starve the event loop. Use it for errors and cleanup, not heavy logic.',
    difficulty: 'advanced',
    date: '2026-04-14',
  },

  // ── React.js ─────────────────────────────────────────────────────────────
  {
    id: 'react-1',
    category: 'React.js',
    title: 'React.memo vs useMemo vs useCallback',
    content: 'React.memo skips re-rendering a component if its props are the same. useMemo memoizes an expensive computed value. useCallback memoizes a function reference so memoized children don\'t re-render unnecessarily. Don\'t sprinkle these everywhere — profile first.',
    difficulty: 'intermediate',
    date: '2026-04-10',
  },
  {
    id: 'react-2',
    category: 'React.js',
    title: 'Intersection Observer for lazy animations',
    content: 'Rather than listening to raw scroll events (expensive), use IntersectionObserver to fire callbacks when elements enter the viewport. Wrap it in a useInView hook and combine with Framer Motion for buttery animations.',
    code: `function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) =>
      setVisible(e.isIntersecting)
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}`,
    difficulty: 'intermediate',
    date: '2026-04-12',
  },
  {
    id: 'react-3',
    category: 'React.js',
    title: 'Why index as key is dangerous',
    content: 'When you reorder or delete list items, React uses keys to reconcile. Index-as-key means the same index now maps to a different item, so React reuses wrong DOM nodes. Always use stable, unique IDs as keys for dynamic lists.',
    difficulty: 'beginner',
    date: '2026-04-09',
  },
  {
    id: 'react-4',
    category: 'React.js',
    title: 'Controlled vs Uncontrolled components',
    content: 'Controlled: React owns the value, you drive it via state + onChange. Uncontrolled: the DOM owns the value, you read via ref. Prefer controlled for validation/derived logic. Use uncontrolled (useRef) for file inputs or perf-critical forms.',
    difficulty: 'beginner',
    date: '2026-04-08',
  },

  // ── Next.js ──────────────────────────────────────────────────────────────
  {
    id: 'next-1',
    category: 'Next.js',
    title: 'App Router rendering modes at a glance',
    content: 'No dynamic functions + no uncached fetches = static (SSG). Add cookies()/headers() = dynamic (SSR). fetch with { next: { revalidate: N } } = ISR. Server Components are the default — mark a component "use client" only when you need browser APIs or state.',
    difficulty: 'intermediate',
    date: '2026-04-10',
  },
  {
    id: 'next-2',
    category: 'Next.js',
    title: 'Server Actions replace most API routes',
    content: 'Server Actions are async server functions called from Client Components. They run only on the server, auto-invalidate the Next.js cache, and need no separate API route. Use them for mutations: form submissions, DB writes, auth actions.',
    code: `'use server'
export async function createPost(fd: FormData) {
  await db.post.create({ data: { title: fd.get('title') } });
  revalidatePath('/posts');
}`,
    difficulty: 'intermediate',
    date: '2026-04-11',
  },
  {
    id: 'next-3',
    category: 'Next.js',
    title: 'Parallel Routes and Intercepting Routes',
    content: 'Parallel routes (@folder) render multiple pages in the same layout simultaneously — modal pattern, split dashboards. Intercepting routes (..(folder)) let you show /photo/1 as a modal while URL updates, and visit it directly as a full page.',
    difficulty: 'advanced',
    date: '2026-04-12',
  },

  // ── TypeScript ────────────────────────────────────────────────────────────
  {
    id: 'ts-1',
    category: 'TypeScript',
    title: 'Utility types I actually use',
    content: 'Pick<T,K> / Omit<T,K> for sub-shapes. Partial<T> makes everything optional — great for PATCH payloads. Required<T> inverse. ReturnType<typeof fn> extracts a function\'s return type without re-declaring it. These compose beautifully.',
    code: `type User = { id: string; name: string; email: string };
type UserPatch = Partial<Omit<User, 'id'>>;
// { name?: string; email?: string }`,
    difficulty: 'intermediate',
    date: '2026-04-09',
  },
  {
    id: 'ts-2',
    category: 'TypeScript',
    title: 'Discriminated unions for state machines',
    content: 'A shared literal discriminant lets TypeScript narrow types in switch statements. Ideal for async state: idle → loading → success | error. Beats boolean flags like isLoading + isError which can be true simultaneously.',
    code: `type State<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };`,
    difficulty: 'advanced',
    date: '2026-04-10',
  },
  {
    id: 'ts-3',
    category: 'TypeScript',
    title: 'satisfies operator',
    content: 'satisfies validates a value matches a type without widening it. Unlike a type annotation the inferred type stays narrow, so you keep autocomplete on specific values. Perfect for config objects and lookup maps.',
    code: `const routes = {
  home: '/',
  about: '/about',
} satisfies Record<string, string>;
// routes.home is still type '/', not string`,
    difficulty: 'intermediate',
    date: '2026-04-11',
  },

  // ── MongoDB ───────────────────────────────────────────────────────────────
  {
    id: 'mongo-1',
    category: 'MongoDB',
    title: 'Indexing strategy basics',
    content: 'Every index speeds reads but slows writes. Compound index field order matters — equality fields first, then range, then sort. Run explain("executionStats") to see if your query does a COLLSCAN (bad) or IXSCAN (good). Drop unused indexes.',
    difficulty: 'intermediate',
    date: '2026-04-10',
  },
  {
    id: 'mongo-2',
    category: 'MongoDB',
    title: 'Aggregation pipeline mental model',
    content: '$match early to reduce documents flowing through. $group to aggregate. $project to reshape (rename, compute). $lookup for joins. $unwind to flatten arrays. Think of it as a Unix pipe — small, composable stages.',
    code: `db.orders.aggregate([
  { $match: { status: 'paid' } },
  { $group: { _id: '$userId', total: { $sum: '$amount' } } },
  { $sort: { total: -1 } },
  { $limit: 10 },
]);`,
    difficulty: 'advanced',
    date: '2026-04-11',
  },

  // ── Prisma ────────────────────────────────────────────────────────────────
  {
    id: 'prisma-1',
    category: 'Prisma',
    title: 'Why Prisma over Mongoose',
    content: 'Prisma generates a fully-typed client from your schema — no manual interface duplication. Mongoose is schema-in-JS, so type errors surface at runtime. With Prisma, the database schema is the source of truth and TypeScript keeps you honest.',
    difficulty: 'beginner',
    date: '2026-04-12',
  },
  {
    id: 'prisma-2',
    category: 'Prisma',
    title: 'Interactive transactions',
    content: 'Sequential $transaction([ops]) is simple but inflexible. Interactive $transaction(async tx => {}) gives you a transaction-scoped client for conditional logic — validate, then write. It holds the connection longer so keep it short.',
    code: `await prisma.$transaction(async (tx) => {
  const wallet = await tx.wallet.findUniqueOrThrow({ where: { id } });
  if (wallet.balance < amount) throw new Error('insufficient');
  await tx.wallet.update({ where: { id }, data: { balance: { decrement: amount } } });
});`,
    difficulty: 'advanced',
    date: '2026-04-13',
  },

  // ── Express.js ────────────────────────────────────────────────────────────
  {
    id: 'express-1',
    category: 'Express.js',
    title: 'Middleware order is everything',
    content: 'Express runs top-to-bottom. Order: cors → helmet → express.json() → auth middleware → route handlers → 404 handler → error handler. Error middleware must have 4 params (err, req, res, next) and must be last.',
    difficulty: 'beginner',
    date: '2026-04-09',
  },
  {
    id: 'express-2',
    category: 'Express.js',
    title: 'asyncHandler to avoid try/catch in every route',
    content: 'Wrap async route handlers in a small utility that catches rejected promises and forwards them to next(). Then one global error handler formats all errors consistently. Clean, DRY, impossible to forget error handling.',
    code: `const wrap = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.get('/users', wrap(async (req, res) => {
  res.json(await db.user.findMany());
}));

app.use((err, req, res, next) => {
  res.status(err.status ?? 500).json({ error: err.message });
});`,
    difficulty: 'intermediate',
    date: '2026-04-10',
  },

  // ── TailwindCSS ───────────────────────────────────────────────────────────
  {
    id: 'tw-1',
    category: 'TailwindCSS',
    title: 'Dark mode with class strategy',
    content: 'Set darkMode: "class" in config. Use dark: variants. Pair with next-themes for SSR-safe toggling — it adds the class on <html> before the page paints, avoiding flash. The class strategy beats media because you control when to switch.',
    difficulty: 'beginner',
    date: '2026-04-09',
  },
  {
    id: 'tw-2',
    category: 'TailwindCSS',
    title: 'When to use @apply',
    content: 'Reserve @apply for patterns you repeat across many files — buttons, inputs, badges. Don\'t use it just to shorten a one-off element. Overusing @apply defeats the point of utility-first and makes the CSS bundle harder to purge.',
    code: `@layer components {
  .btn {
    @apply inline-flex items-center gap-2 px-5 py-2
           rounded-xl font-semibold transition-all;
  }
}`,
    difficulty: 'beginner',
    date: '2026-04-10',
  },

  // ── Engineering ───────────────────────────────────────────────────────────
  {
    id: 'eng-1',
    category: 'Engineering',
    title: 'Monolith first, microservices when it hurts',
    content: 'Microservices make sense at scale but add massive operational overhead early on. Start with a well-structured monolith. Extract services only when you hit real pain: a module that needs independent deployments, different scaling needs, or a different tech stack.',
    difficulty: 'intermediate',
    date: '2026-04-13',
  },
  {
    id: 'eng-2',
    category: 'Engineering',
    title: 'CQRS in plain English',
    content: 'Command Query Responsibility Segregation splits reads and writes into separate models. Write side enforces business rules and emits events. Read side builds denormalized views optimized for queries. Result: each side scales and evolves independently.',
    difficulty: 'advanced',
    date: '2026-04-14',
  },
  {
    id: 'eng-3',
    category: 'Engineering',
    title: 'The 12-Factor App',
    content: 'Core rules: one codebase, explicit dependency declaration, config in env vars, stateless processes, port binding, disposable processes (fast start/stop), dev/prod parity, logs as stdout streams. These principles make apps portable, scalable, cloud-native.',
    difficulty: 'intermediate',
    date: '2026-04-11',
  },
  {
    id: 'eng-4',
    category: 'Engineering',
    title: 'CAP Theorem',
    content: 'A distributed system can only guarantee two of three: Consistency (every read sees the latest write), Availability (every request gets a response), Partition tolerance (system works despite network splits). Since partitions happen, you choose CA vs CP.',
    difficulty: 'advanced',
    date: '2026-04-12',
  },
];
