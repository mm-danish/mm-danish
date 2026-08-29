import { BrainCircuit, Sparkles } from "lucide-react";

const researchInterests = [
  "Artificial Intelligence",
  "Machine Learning",
  "Generative AI",
  "Retrieval-Augmented Generation",
  "AI-powered Knowledge Systems",
  "Intelligent Information Retrieval",
  "Human-AI Interaction",
];

export function Research() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden py-20 sm:py-28">
      <div className="mesh-bg" aria-hidden="true" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <div className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
            <BrainCircuit className="h-4 w-4" />
            <span>Research interests</span>
          </div>
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-6xl">
            Research <span className="text-gradient">Interests.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Exploring how intelligent systems can help people find, understand,
            and create knowledge.
          </p>
        </header>

        <div className="mt-14 border-y border-border/60 py-8 sm:mt-16 sm:py-10">
          <blockquote className="border-l-2 border-primary/60 pl-5 sm:pl-8">
            <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {researchInterests.map((interest) => (
                <div
                  key={interest}
                  className="flex items-start gap-3 text-base font-medium text-foreground sm:text-lg"
                >
                  <Sparkles className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <span>{interest}</span>
                </div>
              ))}
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
