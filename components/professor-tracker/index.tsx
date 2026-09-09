"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { ExternalLink, Plus, Search, ShieldCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Status = "Researching" | "Shortlisted" | "Draft ready" | "Emailed" | "Replied" | "Closed";
type Professor = { id: string; name: string; university: string; email: string; topics: string; fit: string; status: Status; nextStep: string; };
const statuses: Status[] = ["Researching", "Shortlisted", "Draft ready", "Emailed", "Replied", "Closed"];
const storageKey = "mmdanish-professor-outreach-v1";
const initialDraft = { name: "", university: "", email: "", topics: "", fit: "", nextStep: "" };

export function ProfessorTracker() {
  const [records, setRecords] = useState<Professor[]>([]);
  const [draft, setDraft] = useState(initialDraft);
  const [query, setQuery] = useState("LLM agents trustworthy AI NLP");
  const [filter, setFilter] = useState<Status | "All">("All");

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) { try { setRecords(JSON.parse(saved)); } catch { window.localStorage.removeItem(storageKey); } }
  }, []);
  useEffect(() => { window.localStorage.setItem(storageKey, JSON.stringify(records)); }, [records]);

  const visibleRecords = useMemo(() => filter === "All" ? records : records.filter((record) => record.status === filter), [filter, records]);
  const searchQuery = encodeURIComponent(`${query} professor university lab`);

  function addProfessor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.name.trim() || !draft.university.trim()) return;
    setRecords((current) => [{ id: crypto.randomUUID(), ...draft, status: "Researching" }, ...current]);
    setDraft(initialDraft);
  }
  function updateStatus(id: string, status: Status) { setRecords((current) => current.map((record) => record.id === id ? { ...record, status } : record)); }
  function removeRecord(id: string) { setRecords((current) => current.filter((record) => record.id !== id)); }

  return (
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden py-20 sm:py-28">
      <div className="mesh-bg" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-4xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Personal graduate-application workspace</p>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-6xl">Professor Outreach <span className="text-gradient">Tracker.</span></h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">Research potential supervisors, capture genuine fit, and manage thoughtful outreach. This tracker stores your entries only in this browser; it does not send emails or collect your contact data.</p>
        </header>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-border/70 bg-card/50 p-6"><label htmlFor="research-query" className="text-sm font-semibold">Find potential supervisors</label><div className="mt-3 flex flex-col gap-3 sm:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input id="research-query" value={query} onChange={(event) => setQuery(event.target.value)} className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-3 text-sm outline-none ring-primary transition focus:ring-2" /></div><a href={`https://www.google.com/search?q=${searchQuery}`} target="_blank" rel="noreferrer"><Button type="button" className="h-11 w-full rounded-lg sm:w-auto">Search web <ExternalLink className="ml-2 h-4 w-4" /></Button></a></div><p className="mt-3 text-xs leading-5 text-muted-foreground">Use this to discover labs, then verify each professor&apos;s current work and admissions guidance on their university page before adding them.</p></div>
          <div className="rounded-2xl border border-primary/20 bg-primary/[0.04] p-6"><div className="flex gap-3"><ShieldCheck className="h-5 w-5 shrink-0 text-primary" /><div><h2 className="font-heading font-bold">Personalization, not mass outreach</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Record one specific paper, project, or research question before you write. A strong email is short, accurate, and personally relevant.</p></div></div></div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[360px_1fr]">
          <form onSubmit={addProfessor} className="h-fit rounded-2xl border border-border/70 bg-card/50 p-6"><h2 className="font-heading text-xl font-bold">Add a professor</h2><p className="mt-2 text-sm text-muted-foreground">Capture the evidence before drafting an email.</p><div className="mt-6 space-y-4"><Field label="Professor name" value={draft.name} onChange={(value) => setDraft({ ...draft, name: value })} required /><Field label="University" value={draft.university} onChange={(value) => setDraft({ ...draft, university: value })} required /><Field label="Email (optional)" type="email" value={draft.email} onChange={(value) => setDraft({ ...draft, email: value })} /><Field label="Research topics / paper" value={draft.topics} onChange={(value) => setDraft({ ...draft, topics: value })} textarea /><Field label="Why the fit is genuine" value={draft.fit} onChange={(value) => setDraft({ ...draft, fit: value })} textarea /><Field label="Next step or follow-up date" value={draft.nextStep} onChange={(value) => setDraft({ ...draft, nextStep: value })} /></div><Button type="submit" className="mt-6 w-full rounded-lg"><Plus className="mr-2 h-4 w-4" /> Add to tracker</Button></form>
          <div><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 className="font-heading text-2xl font-bold">Outreach pipeline</h2><p className="mt-1 text-sm text-muted-foreground">{records.length} professor{records.length === 1 ? "" : "s"} saved in this browser.</p></div><select value={filter} onChange={(event) => setFilter(event.target.value as Status | "All")} className="h-10 rounded-lg border border-border bg-background px-3 text-sm"><option>All</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select></div>
            <div className="mt-5 space-y-4">{visibleRecords.length === 0 ? <div className="rounded-2xl border border-dashed border-border p-10 text-center"><p className="font-medium">Your tracker is ready.</p><p className="mt-2 text-sm text-muted-foreground">Start with a lab&apos;s current research, then add a supervisor you can contact thoughtfully.</p></div> : visibleRecords.map((record) => <article key={record.id} className="rounded-2xl border border-border/70 bg-card/50 p-5"><div className="flex flex-col justify-between gap-4 sm:flex-row"><div><h3 className="font-heading text-lg font-bold">{record.name}</h3><p className="text-sm text-primary">{record.university}</p></div><div className="flex items-center gap-2"><select aria-label={`Status for ${record.name}`} value={record.status} onChange={(event) => updateStatus(record.id, event.target.value as Status)} className="h-9 rounded-md border border-border bg-background px-2 text-xs">{statuses.map((status) => <option key={status}>{status}</option>)}</select><button type="button" onClick={() => removeRecord(record.id)} aria-label={`Remove ${record.name}`} className="rounded-md p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="h-4 w-4" /></button></div></div>{record.topics && <p className="mt-4 text-sm"><span className="font-semibold">Research evidence: </span>{record.topics}</p>}{record.fit && <p className="mt-2 text-sm text-muted-foreground"><span className="font-semibold text-foreground">Fit note: </span>{record.fit}</p>}<div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">{record.email && <a href={`mailto:${record.email}`} className="text-primary hover:underline">Email draft</a>}{record.nextStep && <span>Next: {record.nextStep}</span>}</div></article>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, required, textarea, type = "text" }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; textarea?: boolean; type?: string; }) {
  const fieldClass = "mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary transition focus:ring-2";
  return <label className="block text-sm font-medium">{label}{textarea ? <textarea value={value} onChange={(event) => onChange(event.target.value)} className={`${fieldClass} min-h-20 resize-y`} /> : <input type={type} required={required} value={value} onChange={(event) => onChange(event.target.value)} className={fieldClass} />}</label>;
}
