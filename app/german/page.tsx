import type { Metadata } from "next";
import { cookies } from "next/headers";
import { GermanLearningApp } from "@/components/sections/german/german-learning-app";

export const metadata: Metadata = {
  title: "German Learning Studio — MM Danish",
  description: "A private, personal space to build German vocabulary and practice recall.",
  robots: { index: false, follow: false },
};

export default async function GermanPage() {
  const cookieStore = await cookies();
  const isAuthorized = cookieStore.get("german_access")?.value === "granted";
  return <GermanLearningApp initialAuthorized={isAuthorized} />;
}
