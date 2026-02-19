# M Murtaza Danish - Portfolio Website

A premium personal portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern Stack**: Next.js 15 App Router with TypeScript
- **Dark/Light Mode**: Seamless theme switching with next-themes
- **Smooth Animations**: Framer Motion for engaging interactions
- **SEO Optimized**: Complete metadata and Open Graph tags
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Production Ready**: Scalable architecture following best practices

## 📋 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes
- **Deployment**: Vercel (recommended)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd mm-danish
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
mm-danish/
├── app/                    # Next.js App Router
│   ├── (routes)/           # Route group
│   ├── projects/          # Dynamic project pages
│   ├── blog/              # Dynamic blog pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   ├── sections/         # Page sections
│   └── providers/        # Context providers
├── data/                 # Static data
│   ├── projects/         # Project data
│   ├── skills/           # Skills data
│   └── experience/       # Experience data
├── lib/                  # Utilities
│   ├── seo.ts           # SEO helpers
│   ├── utils.ts         # General utilities
│   └── cn.ts            # Class name merger
├── config/              # Configuration
│   ├── site.ts          # Site metadata
│   └── seo.ts           # SEO defaults
└── types/               # TypeScript types
```

## 🎨 Customization

### Update Personal Information

1. **Site Config**: Edit `config/site.ts` with your details
2. **Experience**: Update `data/experience/experience.ts`
3. **Projects**: Modify `data/projects/projects.ts`
4. **Skills**: Edit `data/skills/skills.ts`

### Styling

- Global styles: `app/globals.css`
- Tailwind config: Uses CSS-based configuration in `globals.css`
- Theme colors: Defined in CSS variables

### SEO

- Default metadata: `config/seo.ts`
- Page-specific: Use `generateMetadata` from `lib/seo.ts`

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Vercel will auto-detect Next.js and deploy

## 📝 Content Management

### Adding a New Project

1. Add project data to `data/projects/projects.ts`
2. Add project image to `public/images/projects/`
3. Create dynamic page at `app/projects/[slug]/page.tsx` (optional)

### Adding Experience

Edit `data/experience/experience.ts` with your work history.

### Updating Skills

Modify `data/skills/skills.ts` with your technical skills.

## 🔧 Configuration

### Environment Variables

Create `.env.local` for environment-specific variables:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### CV Download

1. Place your CV PDF in `public/cv/`
2. Update `CV_DOWNLOAD_URL` in `lib/constants.ts`

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**M Murtaza Danish**
- Portfolio: [Your Portfolio URL]
- GitHub: [@mm-danish](https://github.com/mm-danish)
- LinkedIn: [Your LinkedIn]
- Email: murtazadanish@gmail.com

---

Built with ❤️ using Next.js 15
