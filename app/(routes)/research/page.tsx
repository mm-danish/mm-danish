import type { Metadata } from "next";
import { Research } from "@/components/research";

export const metadata: Metadata = {
  title: "AI Research Profile | M Murtaza Danish",
  description:
    "AI research profile of M Murtaza Danish: LLM agents, trustworthy AI, AI-assisted software engineering, applied deep learning, and natural language processing.",
  alternates: { canonical: "/research" },
};

export default function ResearchPage() {
  return <Research />;
}
