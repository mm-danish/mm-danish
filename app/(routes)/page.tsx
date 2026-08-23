import type { Metadata } from 'next';
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
// import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: 'M Murtaza Danish – Full Stack Developer | Next.js & Node.js Expert',
  description:
    'Hire M Murtaza Danish, a Full Stack Software Engineer from Islamabad, Pakistan. 3+ years building scalable Next.js, React, TypeScript, and Node.js web applications.',
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: 'M Murtaza Danish – Full Stack Developer | Next.js & Node.js Expert',
    description:
      'Hire M Murtaza Danish, a Full Stack Software Engineer from Islamabad, Pakistan. 3+ years building scalable Next.js, React, TypeScript, and Node.js web applications.',
    url: siteConfig.url,
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'M Murtaza Danish – Full Stack Developer',
      },
    ],
  },
};

// ── FAQ JSON-LD ──────────────────────────────────────────────────────────────

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who is M Murtaza Danish?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'M Murtaza Danish is a Full Stack Software Engineer based in Islamabad, Pakistan with 3+ years of professional experience building production-grade web applications using Next.js, React, TypeScript, Node.js, and PostgreSQL.',
      },
    },
    {
      '@type': 'Question',
      name: 'What technologies does M Murtaza Danish specialise in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'M Murtaza Danish specialises in Next.js, React, TypeScript, Node.js, PostgreSQL, REST APIs, GraphQL, Tailwind CSS, and cloud deployments on Vercel and AWS.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is M Murtaza Danish available for freelance or contract work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. M Murtaza Danish is open to freelance projects, contract engagements, and full-time opportunities. You can reach out via the contact form on mmdanish.com or email at mmdanish.cs@gmail.com.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is M Murtaza Danish located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'M Murtaza Danish is based in Islamabad, Pakistan and is available for remote work worldwide.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I hire M Murtaza Danish?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can hire M Murtaza Danish by visiting mmdanish.com/contact and filling out the contact form, or by connecting on LinkedIn at linkedin.com/in/mm-danish.',
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <About />
      <Skills />
      {/* <ExperienceTimeline /> */}
      <Projects />
      <Contact />
    </>
  );
}
