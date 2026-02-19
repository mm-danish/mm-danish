# Portfolio Architecture & Folder Structure

## Overview
This is a production-ready Next.js 15 App Router portfolio architecture designed for scalability, maintainability, and modern best practices.

---

## 📁 Folder Structure

```
mm-danish/
├── app/                          # Next.js 15 App Router
│   ├── (routes)/                 # Route groups (doesn't affect URL)
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── page.tsx              # Home page
│   ├── projects/
│   │   ├── [slug]/
│   │   │   ├── page.tsx          # Dynamic project detail page
│   │   │   └── loading.tsx       # Loading UI
│   │   ├── page.tsx              # Projects listing page
│   │   └── loading.tsx
│   ├── blog/
│   │   ├── [slug]/
│   │   │   ├── page.tsx          # Dynamic blog post page
│   │   │   └── loading.tsx
│   │   ├── page.tsx              # Blog listing page
│   │   └── loading.tsx
│   ├── api/                      # API routes (if needed)
│   │   └── contact/
│   │       └── route.ts
│   ├── layout.tsx                # Root layout with theme provider
│   ├── page.tsx                  # Redirect or landing
│   ├── globals.css               # Global styles (moved to styles/)
│   ├── sitemap.ts                # Dynamic sitemap generation
│   └── robots.ts                 # Robots.txt generation
│
├── components/                    # React components
│   ├── ui/                       # Reusable UI primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── theme-toggle.tsx
│   │   ├── animated-section.tsx
│   │   └── index.ts              # Barrel exports
│   │
│   ├── layout/                   # Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── navigation.tsx
│   │   ├── mobile-menu.tsx
│   │   └── index.ts
│   │
│   ├── sections/                 # Page sections
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── skills.tsx
│   │   ├── experience.tsx
│   │   ├── projects.tsx
│   │   ├── blog-preview.tsx
│   │   ├── contact.tsx
│   │   └── index.ts
│   │
│   ├── animations/               # Framer Motion animations
│   │   ├── fade-in.tsx
│   │   ├── slide-up.tsx
│   │   ├── stagger-children.tsx
│   │   └── index.ts
│   │
│   └── providers/                # Context providers
│       └── theme-provider.tsx    # Wrapper for next-themes
│
├── lib/                          # Utility functions & configs
│   ├── seo.ts                    # SEO metadata helpers
│   ├── utils.ts                  # General utilities
│   ├── constants.ts              # App constants
│   └── cn.ts                     # Tailwind class merger
│
├── data/                         # Static data & content
│   ├── projects/
│   │   ├── index.ts              # Projects array export
│   │   └── projects.ts           # Project data
│   ├── skills/
│   │   ├── index.ts
│   │   └── skills.ts             # Skills data
│   ├── experience/
│   │   ├── index.ts
│   │   └── experience.ts         # Work experience data
│   └── blog/
│       ├── index.ts
│       └── posts.ts              # Blog posts metadata
│
├── styles/                       # Global styles
│   └── globals.css               # Tailwind imports & custom CSS
│
├── public/                       # Static assets
│   ├── images/
│   │   ├── projects/             # Project screenshots
│   │   ├── blog/                 # Blog post images
│   │   └── profile/              # Profile images
│   ├── icons/                    # SVG icons
│   └── favicon.ico
│
├── types/                        # TypeScript type definitions
│   ├── project.ts
│   ├── blog.ts
│   ├── skill.ts
│   └── experience.ts
│
├── hooks/                        # Custom React hooks
│   ├── use-theme.ts
│   ├── use-scroll.ts
│   └── use-intersection.ts
│
├── config/                       # Configuration files
│   ├── site.ts                   # Site metadata
│   └── seo.ts                    # SEO defaults
│
├── .env.local                    # Environment variables
├── .env.example                  # Example env file
├── next.config.ts                # Next.js config
├── tailwind.config.ts            # Tailwind config
├── tsconfig.json                 # TypeScript config
└── package.json                  # Dependencies
```

---

## 🏗️ Architecture Explanation

### **1. App Router Structure (`app/`)**

#### Route Groups `(routes)/`
- Uses parentheses to group routes without affecting URL structure
- Allows shared layouts and organization
- Home (`/`), About (`/about`), Contact (`/contact`) pages

#### Dynamic Routes
- `projects/[slug]/` - Dynamic project detail pages
- `blog/[slug]/` - Dynamic blog post pages
- Each includes `loading.tsx` for Suspense boundaries

#### Special Files
- `layout.tsx` - Root layout with theme provider, metadata, fonts
- `sitemap.ts` - Dynamic sitemap generation
- `robots.ts` - SEO robots.txt configuration

---

### **2. Components Architecture (`components/`)**

#### **`ui/`** - Reusable UI Primitives
- Small, composable components (Button, Card, Badge)
- Theme-aware components (ThemeToggle)
- Animation wrappers (AnimatedSection)
- Barrel exports (`index.ts`) for clean imports

#### **`layout/`** - Layout Components
- Header with navigation
- Footer with links/socials
- Mobile-responsive menu
- Shared across multiple pages

#### **`sections/`** - Page Sections
- Hero section
- About, Skills, Experience sections
- Projects grid/list
- Blog preview
- Contact form
- Each section is self-contained and reusable

#### **`animations/`** - Framer Motion Wrappers
- Reusable animation components
- FadeIn, SlideUp, StaggerChildren
- Consistent animation patterns

---

### **3. Data Layer (`data/`)**

#### Separation of Concerns
- Content separated from components
- Easy to update without touching code
- Can be migrated to CMS later

#### Structure
- Each data type has its own folder
- `index.ts` exports for clean imports
- TypeScript interfaces for type safety

---

### **4. Utilities (`lib/`)**

#### **`seo.ts`**
- Helper functions for metadata generation
- Open Graph, Twitter Cards
- Dynamic metadata for pages

#### **`utils.ts`**
- General utility functions
- Date formatting, string helpers
- Data transformation functions

#### **`constants.ts`**
- App-wide constants
- Social links, contact info
- Configuration values

#### **`cn.ts`**
- Tailwind class name merger (clsx + tailwind-merge)

---

### **5. Styles (`styles/`)**

#### **`globals.css`**
- Tailwind directives (`@tailwind base/components/utilities`)
- Custom CSS variables for theming
- Dark mode color definitions
- Custom animations

---

### **6. Type Safety (`types/`)**

- TypeScript interfaces for all data structures
- Ensures type safety across the app
- Better IDE autocomplete and error catching

---

### **7. Custom Hooks (`hooks/`)**

- Reusable React hooks
- Theme management
- Scroll detection
- Intersection Observer for animations

---

### **8. Configuration (`config/`)**

- Site metadata (name, description, URL)
- SEO defaults
- Centralized configuration

---

## 🎯 Key Design Decisions

### **1. Scalability**
- Modular component structure
- Separation of data and presentation
- Easy to add new pages/sections

### **2. SEO Optimization**
- Dynamic metadata generation
- Sitemap and robots.txt
- Semantic HTML structure
- Open Graph tags

### **3. Performance**
- Code splitting via App Router
- Loading states with Suspense
- Optimized images (next/image)
- Lazy loading animations

### **4. Developer Experience**
- TypeScript throughout
- Barrel exports for clean imports
- Consistent naming conventions
- Clear folder organization

### **5. Theme Support**
- next-themes integration
- CSS variables for colors
- Smooth theme transitions
- System preference detection

---

## 📦 Dependencies Overview

```json
{
  "next": "^15.0.0",
  "react": "^18.3.0",
  "react-dom": "^18.3.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.4.0",
  "framer-motion": "^11.0.0",
  "lucide-react": "^0.400.0",
  "next-themes": "^0.3.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.2.0"
}
```

---

## 🚀 Next Steps

1. **Create base components** in `components/ui/`
2. **Set up theme provider** in `app/layout.tsx`
3. **Add data structures** in `data/` folders
4. **Implement sections** in `components/sections/`
5. **Create pages** in `app/(routes)/`
6. **Add animations** using Framer Motion
7. **Configure SEO** metadata helpers
8. **Test dark/light mode** transitions

---

## 📝 Best Practices Followed

✅ **App Router** - Using Next.js 15 App Router conventions  
✅ **TypeScript** - Full type safety  
✅ **Component Composition** - Small, reusable components  
✅ **Separation of Concerns** - Data, UI, and logic separated  
✅ **SEO First** - Metadata, sitemap, robots.txt  
✅ **Performance** - Code splitting, lazy loading  
✅ **Accessibility** - Semantic HTML, ARIA labels  
✅ **Scalability** - Easy to extend and maintain  

---

This architecture is production-ready and follows modern Next.js 15 best practices for building scalable, maintainable applications.

