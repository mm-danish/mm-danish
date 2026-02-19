# 📁 Folder Structure Reference

## Complete Directory Tree

```
mm-danish/
│
├── 📁 app/                          # Next.js 15 App Router
│   ├── 📁 (routes)/                 # Route group (no URL segment)
│   │   ├── 📁 about/
│   │   │   └── page.tsx
│   │   ├── 📁 contact/
│   │   │   └── page.tsx
│   │   └── page.tsx                 # Home page (/)
│   │
│   ├── 📁 projects/                 # Projects section
│   │   ├── 📁 [slug]/               # Dynamic route
│   │   │   ├── page.tsx
│   │   │   └── loading.tsx
│   │   ├── page.tsx                 # Projects listing (/projects)
│   │   └── loading.tsx
│   │
│   ├── 📁 blog/                     # Blog section
│   │   ├── 📁 [slug]/               # Dynamic route
│   │   │   ├── page.tsx
│   │   │   └── loading.tsx
│   │   ├── page.tsx                 # Blog listing (/blog)
│   │   └── loading.tsx
│   │
│   ├── 📁 api/                      # API routes (optional)
│   │   └── 📁 contact/
│   │       └── route.ts
│   │
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Landing/redirect
│   ├── sitemap.ts                   # Dynamic sitemap
│   └── robots.ts                    # SEO robots.txt
│
├── 📁 components/                    # React components
│   ├── 📁 ui/                       # UI primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── theme-toggle.tsx
│   │   ├── animated-section.tsx
│   │   └── index.ts                # Barrel exports
│   │
│   ├── 📁 layout/                   # Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── navigation.tsx
│   │   ├── mobile-menu.tsx
│   │   └── index.ts
│   │
│   ├── 📁 sections/                 # Page sections
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── skills.tsx
│   │   ├── experience.tsx
│   │   ├── projects.tsx
│   │   ├── blog-preview.tsx
│   │   ├── contact.tsx
│   │   └── index.ts
│   │
│   ├── 📁 animations/               # Framer Motion
│   │   ├── fade-in.tsx
│   │   ├── slide-up.tsx
│   │   ├── stagger-children.tsx
│   │   └── index.ts
│   │
│   └── 📁 providers/                # Context providers
│       └── theme-provider.tsx
│
├── 📁 lib/                          # Utilities
│   ├── seo.ts                       # SEO helpers
│   ├── utils.ts                     # General utilities
│   ├── constants.ts                 # App constants
│   └── cn.ts                        # Class name merger
│
├── 📁 data/                         # Static data
│   ├── 📁 projects/
│   │   ├── index.ts
│   │   └── projects.ts
│   ├── 📁 skills/
│   │   ├── index.ts
│   │   └── skills.ts
│   ├── 📁 experience/
│   │   ├── index.ts
│   │   └── experience.ts
│   └── 📁 blog/
│       ├── index.ts
│       └── posts.ts
│
├── 📁 styles/                       # Global styles
│   └── globals.css                  # Tailwind + custom CSS
│
├── 📁 public/                       # Static assets
│   ├── 📁 images/
│   │   ├── 📁 projects/
│   │   ├── 📁 blog/
│   │   └── 📁 profile/
│   ├── 📁 icons/
│   └── favicon.ico
│
├── 📁 types/                        # TypeScript types
│   ├── project.ts
│   ├── blog.ts
│   ├── skill.ts
│   └── experience.ts
│
├── 📁 hooks/                        # Custom hooks
│   ├── use-theme.ts
│   ├── use-scroll.ts
│   └── use-intersection.ts
│
├── 📁 config/                       # Configuration
│   ├── site.ts                      # Site metadata
│   └── seo.ts                       # SEO defaults
│
├── .env.local                       # Environment variables
├── .env.example                     # Example env
├── next.config.ts                   # Next.js config
├── tailwind.config.ts               # Tailwind config
├── tsconfig.json                    # TypeScript config
└── package.json                     # Dependencies
```

---

## 🎯 Quick Reference

### **App Router Pages**
- `/` → `app/(routes)/page.tsx`
- `/about` → `app/(routes)/about/page.tsx`
- `/contact` → `app/(routes)/contact/page.tsx`
- `/projects` → `app/projects/page.tsx`
- `/projects/[slug]` → `app/projects/[slug]/page.tsx`
- `/blog` → `app/blog/page.tsx`
- `/blog/[slug]` → `app/blog/[slug]/page.tsx`

### **Component Imports**
```typescript
// UI Components
import { Button, Card, Badge } from '@/components/ui'

// Layout Components
import { Header, Footer } from '@/components/layout'

// Sections
import { Hero, About, Skills } from '@/components/sections'

// Animations
import { FadeIn, SlideUp } from '@/components/animations'
```

### **Data Imports**
```typescript
import { projects } from '@/data/projects'
import { skills } from '@/data/skills'
import { experience } from '@/data/experience'
import { blogPosts } from '@/data/blog'
```

### **Utility Imports**
```typescript
import { generateMetadata } from '@/lib/seo'
import { cn } from '@/lib/cn'
import { formatDate } from '@/lib/utils'
```

---

## 📋 File Naming Conventions

- **Components**: PascalCase (`Button.tsx`, `Hero.tsx`)
- **Utilities**: camelCase (`utils.ts`, `seo.ts`)
- **Types**: camelCase (`project.ts`, `blog.ts`)
- **Hooks**: camelCase with `use-` prefix (`use-theme.ts`)
- **Pages**: `page.tsx`, `layout.tsx`, `loading.tsx`
- **Barrel Exports**: `index.ts` in each folder

---

## 🔗 Path Aliases (tsconfig.json)

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/data/*": ["./data/*"],
      "@/types/*": ["./types/*"],
      "@/hooks/*": ["./hooks/*"],
      "@/config/*": ["./config/*"]
    }
  }
}
```

---

This structure is ready for production and follows Next.js 15 App Router best practices!

