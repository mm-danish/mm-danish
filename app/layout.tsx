import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ConditionalNavigation } from "@/components/layout/conditional-navigation";
import { defaultMetadata } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

// ── JSON-LD Structured Data ───────────────────────────────────────────────────

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "M Murtaza Danish",
  url: siteConfig.url,
  image: `${siteConfig.url}/profile.png`,
  jobTitle: "Full Stack Software Engineer",
  description: siteConfig.description,
  email: "mmdanish.cs@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Islamabad",
    addressCountry: "PK",
  },
  sameAs: [
    siteConfig.links.github,
    siteConfig.links.linkedin,
    siteConfig.links.twitter,
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "GraphQL",
    "REST APIs",
    "Tailwind CSS",
    "Redis",
    "Full Stack Web Development",
    "Software Engineering",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  author: {
    "@type": "Person",
    name: "M Murtaza Danish",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// ─────────────────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  // @modal parallel slot — renders project detail modals
  // when navigating client-side to /projects/[slug]
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${plusJakarta.variable}`}
    >
      <head>
        {/* JSON-LD: Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {/* JSON-LD: WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <ConditionalNavigation header={<Header />} footer={<Footer />}>
              <main className="flex-1">{children}</main>
            </ConditionalNavigation>
          </div>

          {/* Parallel route slot — mounts modal on top of current page */}
          {modal}

          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
