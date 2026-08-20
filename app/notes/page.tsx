import type { Metadata } from "next";
import { Suspense } from "react";
import { NotesApp } from "@/components/sections/notes";

export const metadata: Metadata = {
  title: "Notes — MM Danish",
  description:
    "Personal technical notes and code snippets — searchable knowledge vault across Node.js, React, Next.js, TypeScript, and more.",
};

function NotesFallback() {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
    </div>
  );
}

export default function NotesPage() {
  return (
    <Suspense fallback={<NotesFallback />}>
      <NotesApp />
    </Suspense>
  );
}
