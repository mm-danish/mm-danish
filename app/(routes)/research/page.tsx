import type { Metadata } from "next";
import { Research } from "@/components/research";

export const metadata: Metadata = {
  title: "Research | M Murtaza Danish",
  description:
    "A working collection of technical research, experiments, and engineering notes.",
};

export default function ResearchPage() {
  return <Research />;
}
