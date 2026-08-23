import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ProjectsClient } from "./projects-client";

// cspell:ignore Murtaza

export const metadata: Metadata = {
  title: "Projects – Full Stack Portfolio | M Murtaza Danish",
  description:
    "Explore production-grade full-stack projects by M Murtaza Danish — Next.js applications, React frontends, Node.js backends, and more. Built with TypeScript, PostgreSQL, and modern cloud infrastructure.",
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
  openGraph: {
    title: "Projects – Full Stack Portfolio | M Murtaza Danish",
    description:
      "Production-grade full-stack applications, client work, and personal builds by M Murtaza Danish.",
    url: `${siteConfig.url}/projects`,
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "M Murtaza Danish – Projects Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects – M Murtaza Danish",
    description:
      "Production-grade full-stack apps built with Next.js, TypeScript, Node.js & PostgreSQL.",
    images: [`${siteConfig.url}/og-image.png`],
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
