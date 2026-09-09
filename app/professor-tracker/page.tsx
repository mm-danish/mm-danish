import type { Metadata } from "next";
import { ProfessorTracker } from "@/components/professor-tracker";

export const metadata: Metadata = {
  title: "Professor Outreach Tracker | M Murtaza Danish",
  description: "A privacy-first workspace for researching graduate supervisors, recording research fit, and managing thoughtful outreach.",
  alternates: { canonical: "/professor-tracker" },
};

export default function ProfessorTrackerPage() { return <ProfessorTracker />; }
