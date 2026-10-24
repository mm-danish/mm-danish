import Link from "next/link";
import {
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Download,
  FileSearch,
  GraduationCap,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CV_DOWNLOAD_URL } from "@/lib/constants";

const researchThemes = [
  {
    title: "LLM Agents and AI-Assisted Software Engineering",
    detail:
      "How can language-model agents support reliable planning, retrieval, and task execution inside real software systems?",
  },
  {
    title: "Trustworthy Intelligent Systems",
    detail:
      "How can we make AI-assisted workflows more transparent, verifiable, and appropriate for consequential decisions?",
  },
  {
    title: "Applied Deep Learning and NLP",
    detail:
      "How can machine learning and language technologies turn unstructured information into useful, accessible services?",
  },
];

const evidence = [
  {
    title: "AI-assisted logistics workflows",
    text: "At Pixako Technologies, I develop and enhance an AI-driven logistics management system, including a ChatOps-style AI support feature for operational queries and tasks.",
  },
  {
    title: "Automated Timetable Management System",
    text: "My undergraduate final-year project processed timetable images, validated relevant inputs, extracted information, and stored it for a university information-management workflow.",
  },
  {
    title: "Applied machine-learning coursework",
    text: "I built a data-classification project during my undergraduate study, applying machine-learning and data-processing concepts to structured data.",
  },
];

export function Research() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="mesh-bg" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-4xl">
          <div className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
            <BrainCircuit className="h-4 w-4" />
            <span>Graduate research profile</span>
          </div>
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-6xl">
            Building reliable{" "}
            <span className="text-gradient">intelligent systems.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
            I am a software engineer applying for master&apos;s study in
            artificial intelligence and machine learning. My background combines
            production software engineering with hands-on work in AI-assisted
            workflows, image processing, and data classification.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={CV_DOWNLOAD_URL} download>
              <Button size="lg" className="w-full rounded-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" /> Download academic CV
              </Button>
            </Link>
            {/* <Link href="/professor-tracker">
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-full sm:w-auto"
              >
                <Workflow className="mr-2 h-4 w-4" /> Open professor tracker
              </Button>
            </Link> */}
          </div>
        </header>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {researchThemes.map((theme) => (
            <article
              key={theme.title}
              className="rounded-2xl border border-border/70 bg-card/50 p-6"
            >
              <FileSearch className="mb-6 h-5 w-5 text-primary" />
              <h2 className="font-heading text-xl font-bold">{theme.title}</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                {theme.detail}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
              Research direction
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              From production systems to research questions.
            </h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              I am especially interested in the gap between a capable AI demo
              and an AI system people can confidently use. In graduate study, I
              want to investigate how language-model agents and retrieval-based
              systems can be designed with clearer evidence, safer behavior, and
              useful human oversight.
            </p>
            <p className="mt-4 leading-8 text-muted-foreground">
              I am seeking supervisors and labs working in machine learning,
              NLP, intelligent information systems, trustworthy AI, AI-assisted
              software engineering, or related applied AI areas.
            </p>
          </div>
          <aside className="rounded-2xl border border-primary/20 bg-primary/[0.04] p-7">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h2 className="mt-5 font-heading text-2xl font-bold">
              Academic snapshot
            </h2>
            <ul className="mt-6 space-y-4 text-sm leading-6 text-muted-foreground">
              <li className="flex gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                BS Computer Science (Software Systems), FUUAST Islamabad
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                CGPA: 3.01 / 4.00
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                Professional experience in AI-integrated product delivery
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                Python, TypeScript, C++, FastAPI, React, Next.js, Node.js,
                PostgreSQL
              </li>
            </ul>
          </aside>
        </div>

        <div className="mt-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
            Evidence of preparation
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
            Relevant work and experiments.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {evidence.map((item) => (
              <article
                key={item.title}
                className="border-t border-border/70 pt-5"
              >
                <h3 className="font-heading text-lg font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-20 flex flex-col justify-between gap-6 rounded-2xl border border-border/70 bg-card/40 p-7 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-heading text-2xl font-bold">
              Interested in a research conversation?
            </h2>
            <p className="mt-2 text-muted-foreground">
              I welcome conversations with supervisors whose work overlaps with
              these directions.
            </p>
          </div>
          <a
            href="mailto:mmdanish.cs@gmail.com?subject=Research%20conversation%20with%20M%20Murtaza%20Danish"
            className="shrink-0"
          >
            <Button className="rounded-full">
              Get in touch <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
