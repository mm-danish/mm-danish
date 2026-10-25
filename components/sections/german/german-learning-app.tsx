"use client";

import * as React from "react";
import {
  ArrowRight, LockKeyhole, Plus, Search, Send, Trash2,
  Volume2, X,
} from "lucide-react";

type GermanWord = {
  id: string;
  german: string;
  english: string;
  example: string;
  exampleTranslation: string;
};

const STORAGE_KEY = "german-learning-v1";
const starterWords: GermanWord[] = [
  { id: "seed-1", german: "die Gelegenheit", english: "opportunity", example: "Das ist eine gute Gelegenheit.", exampleTranslation: "That is a good opportunity." },
  { id: "seed-2", german: "sich erinnern an", english: "to remember", example: "Ich erinnere mich an den Namen.", exampleTranslation: "I remember the name." },
  { id: "seed-3", german: "die Entscheidung", english: "decision", example: "Die Entscheidung war nicht leicht.", exampleTranslation: "The decision was not easy." },
  { id: "seed-4", german: "verbessern", english: "to improve", example: "Ich möchte mein Deutsch verbessern.", exampleTranslation: "I want to improve my German." },
  { id: "seed-5", german: "allmählich", english: "gradually", example: "Allmählich verstehe ich mehr.", exampleTranslation: "I gradually understand more." },
  { id: "seed-6", german: "die Umgebung", english: "surroundings", example: "Die Umgebung ist sehr ruhig.", exampleTranslation: "The surroundings are very quiet." },
  { id: "seed-7", german: "obwohl", english: "although", example: "Obwohl es regnet, gehen wir spazieren.", exampleTranslation: "Although it is raining, we are going for a walk." },
  { id: "seed-8", german: "sich freuen auf", english: "to look forward to", example: "Ich freue mich auf das Wochenende.", exampleTranslation: "I am looking forward to the weekend." },
];

function speakGerman(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.86;
  window.speechSynthesis.speak(utterance);
}

function GermanGate({ onUnlock }: { onUnlock: () => void }) {
  const [passkey, setPasskey] = React.useState("");
  const [error, setError] = React.useState(false);
  const [checking, setChecking] = React.useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setChecking(true);
    setError(false);
    try {
      const response = await fetch("/api/german/verify", {
        method: "POST",
        headers: { "x-german-passkey": passkey },
      });
      if (!response.ok) throw new Error("Incorrect passkey");
      onUnlock();
    } catch {
      setError(true);
      setPasskey("");
    } finally {
      setChecking(false);
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center overflow-hidden bg-background px-5 py-12 text-foreground">
      <section className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl shadow-black/5 sm:p-8">
        <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-600/15 dark:text-emerald-200 dark:ring-emerald-200/15">
          <LockKeyhole className="h-5 w-5" />
        </div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">German playground</h1>
        <form onSubmit={submit} className="mt-6 space-y-3">
          <label htmlFor="german-passkey" className="sr-only">Access key</label>
          <input
            id="german-passkey"
            type="password"
            inputMode="numeric"
            autoComplete="current-password"
            autoFocus
            value={passkey}
            onChange={(event) => setPasskey(event.target.value)}
            placeholder="Access key"
            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-emerald-600/50 focus:ring-2 focus:ring-emerald-600/10 dark:focus:border-emerald-200/50 dark:focus:ring-emerald-200/10"
          />
          {error && <p role="alert" className="text-sm text-rose-600 dark:text-rose-300">That key didn’t open the room. Try again.</p>}
          <button disabled={!passkey || checking} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 font-semibold text-white transition hover:bg-emerald-700 dark:bg-emerald-200 dark:text-[#14211a] dark:hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50">
            {checking ? "Opening…" : "Enter"}<ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </section>
    </main>
  );
}

export function GermanLearningApp({ initialAuthorized }: { initialAuthorized: boolean }) {
  const [authorized, setAuthorized] = React.useState(initialAuthorized);
  const [words, setWords] = React.useState<GermanWord[]>(starterWords);
  const [search, setSearch] = React.useState("");
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [newWord, setNewWord] = React.useState({ german: "", english: "" });
  const [translationStatus, setTranslationStatus] = React.useState<"idle" | "loading" | "ready" | "missing">("idle");
  const englishEdited = React.useRef(false);
  const germanInputRef = React.useRef<HTMLTextAreaElement>(null);
  const englishInputRef = React.useRef<HTMLTextAreaElement>(null);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    if (!authorized) return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved) as { words?: Array<GermanWord & { topic?: string }> };
        if (Array.isArray(data.words)) setWords(data.words.map((word) => ({
          id: word.id,
          german: word.german,
          english: word.english,
          example: word.example,
          exampleTranslation: word.exampleTranslation,
        })));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setHydrated(true);
  }, [authorized]);

  React.useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ words }));
  }, [words, hydrated]);

  React.useEffect(() => {
    const german = newWord.german.trim();
    if (german.length < 2) {
      setTranslationStatus("idle");
      return;
    }
    const controller = new AbortController();
    setTranslationStatus("loading");
    const timeout = window.setTimeout(async () => {
      try {
        const response = await fetch(`/api/german/translate?q=${encodeURIComponent(german)}`, { signal: controller.signal });
        const data = await response.json() as { translation?: string };
        if (!response.ok || !data.translation) {
          setTranslationStatus("missing");
          return;
        }
        if (!englishEdited.current) setNewWord((current) => ({ ...current, english: data.translation ?? "" }));
        setTranslationStatus("ready");
      } catch {
        if (!controller.signal.aborted) setTranslationStatus("missing");
      }
    }, 450);
    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [newWord.german]);

  React.useEffect(() => {
    const input = germanInputRef.current;
    if (!input) return;
    input.style.height = "auto";
    input.style.height = `${Math.min(input.scrollHeight, 96)}px`;
  }, [newWord.german]);

  React.useEffect(() => {
    const input = englishInputRef.current;
    if (!input) return;
    input.style.height = "auto";
    input.style.height = `${Math.min(input.scrollHeight, 80)}px`;
  }, [newWord.english]);

  const visibleWords = React.useMemo(() => words.filter((word) => {
    const query = search.trim().toLowerCase();
    return !query || `${word.german} ${word.english} ${word.example}`.toLowerCase().includes(query);
  }), [words, search]);
  function removeWord(id: string) {
    setWords((current) => current.filter((word) => word.id !== id));
  }

  function addWord(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newWord.german.trim() || !newWord.english.trim() || translationStatus === "loading") return;
    const word: GermanWord = { id: crypto.randomUUID(), ...newWord, example: "", exampleTranslation: "" };
    setWords((current) => [word, ...current]);
    setNewWord({ german: "", english: "" });
    englishEdited.current = false;
    setTranslationStatus("idle");
    setSearch("");
  }

  if (!authorized) return <GermanGate onUnlock={() => setAuthorized(true)} />;

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto min-h-dvh w-full max-w-7xl px-5 pb-36 pt-16 sm:px-8 sm:pt-20 lg:px-12">
        <div className="fixed right-4 top-3 z-30 flex max-w-[calc(100vw-2rem)] items-center gap-0.5 rounded-full border border-border/60 bg-background/90 p-1 shadow-sm backdrop-blur-xl sm:right-6 sm:top-5">
          <div className={`relative flex h-8 items-center overflow-visible rounded-full transition-[width,background-color] duration-300 ${isSearchOpen ? "w-[min(calc(100vw-4rem),16rem)] bg-muted/70 sm:w-64" : "w-8"}`}>
            {isSearchOpen ? <>
              <Search className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape") { setSearch(""); setIsSearchOpen(false); } }} placeholder="Search German words" aria-label="Search German words" className="h-8 min-w-0 flex-1 bg-transparent pl-8 pr-1 text-base text-foreground outline-none placeholder:text-muted-foreground/70 sm:text-sm" />
              <button onClick={() => { setSearch(""); setIsSearchOpen(false); }} aria-label="Close search" className="mr-1 flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:bg-background hover:text-foreground"><X className="h-3.5 w-3.5" /></button>
            </> : <button onClick={() => setIsSearchOpen(true)} aria-label="Search German words" className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"><Search className="h-3.5 w-3.5" /></button>}
            {isSearchOpen && <div className="absolute left-auto right-0 top-full z-40 mt-2 max-h-64 w-[calc(100vw-2rem)] max-w-sm overflow-y-auto rounded-xl border border-border bg-card p-1.5 shadow-xl shadow-black/15">
              {visibleWords.length ? visibleWords.map((word) => <div key={word.id} className="flex items-center rounded-lg transition hover:bg-muted"><button onClick={() => { setSearch(word.german); setIsSearchOpen(false); }} className="flex min-w-0 flex-1 items-center gap-2 px-2.5 py-1.5 text-left"><span className="min-w-0"><span className="block truncate text-sm font-medium text-foreground">{word.german}</span><span className="block truncate text-xs text-muted-foreground">{word.english}</span></span></button><button onClick={() => removeWord(word.id)} aria-label={`Remove ${word.german}`} title="Remove word" className="mr-1 rounded-full p-1.5 text-muted-foreground/60 transition hover:bg-background hover:text-rose-600 dark:hover:text-rose-300"><Trash2 className="h-3.5 w-3.5" /></button></div>) : <p className="px-3 py-5 text-center text-sm text-muted-foreground">No words found</p>}
            </div>}
          </div>
          <button onClick={() => germanInputRef.current?.focus()} aria-label="Add word" title="Add word" className={`${isSearchOpen ? "hidden sm:flex" : "flex"} h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground`}><Plus className="h-4 w-4" /></button>
        </div>

        <section className="mx-auto max-w-3xl">
          <div className="space-y-6">
            {visibleWords.length ? [...visibleWords].reverse().map((word) => <article key={word.id} className="space-y-2.5">
              <div className="ml-auto w-fit max-w-[88%] rounded-xl rounded-br-sm bg-muted/60 px-3.5 py-2.5 text-foreground/85"><p className="break-words text-sm sm:text-base">{word.english}</p></div>
              <div className="flex items-end gap-2.5">
                <span aria-hidden="true" className="mb-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-[10px] font-semibold text-emerald-700 dark:text-emerald-200">D</span>
                <div className="max-w-[88%] rounded-xl rounded-bl-sm bg-emerald-500/10 px-3.5 py-3 dark:bg-emerald-200/[0.06]">
                  <div className="flex items-center gap-2"><p className="break-words font-heading text-lg font-semibold text-emerald-800 dark:text-emerald-100 sm:text-xl">{word.german}</p><button onClick={() => speakGerman(word.german)} aria-label={`Listen to ${word.german}`} className="shrink-0 rounded-full p-1.5 text-emerald-700/70 transition hover:bg-emerald-500/10 hover:text-emerald-800 dark:text-emerald-200/65 dark:hover:bg-emerald-200/10 dark:hover:text-emerald-100"><Volume2 className="h-4 w-4" /></button></div>
                  {word.example && <><p className="mt-2.5 break-words text-sm text-foreground/80">{word.example}</p><p className="mt-1 break-words text-xs text-muted-foreground">{word.exampleTranslation}</p></>}
                </div>
              </div>
            </article>) : <div className="py-10 text-sm text-muted-foreground">{search.trim() ? "No matching words. Try another search." : "Add your first German word below."}</div>}
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 bg-gradient-to-t from-background via-background/95 to-transparent px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-5 sm:px-8">
        <form onSubmit={addWord} className="mx-auto max-w-2xl rounded-[1.5rem] border border-border/70 bg-background/95 px-1.5 py-1 shadow-sm backdrop-blur-xl sm:rounded-full">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 gap-y-1 sm:flex sm:flex-nowrap">
            <textarea ref={germanInputRef} rows={1} wrap="soft" required value={newWord.german} onChange={(event) => { englishEdited.current = false; setNewWord({ german: event.target.value, english: "" }); }} placeholder="German word or phrase…" aria-label="German word or phrase" className="col-span-2 min-h-6 min-w-0 resize-none overflow-y-auto whitespace-pre-wrap break-words bg-transparent px-3 py-2 text-base leading-5 text-foreground outline-none placeholder:text-muted-foreground/60 sm:col-span-1 sm:min-w-0 sm:flex-[1_1_9rem]" />
            {newWord.german.trim().length >= 2 && translationStatus !== "loading" && <div className="col-span-1 w-full min-w-0 justify-self-start rounded-2xl bg-muted/70 px-2.5 py-1.5 sm:w-64 sm:max-w-[42%] sm:shrink-0">
              <textarea ref={englishInputRef} rows={1} aria-label="English meaning (editable)" placeholder="English" value={newWord.english} onChange={(event) => { englishEdited.current = true; setNewWord((current) => ({ ...current, english: event.target.value })); }} className="block max-h-20 min-h-4 w-full resize-none overflow-y-auto bg-transparent text-xs leading-4 text-muted-foreground outline-none placeholder:text-muted-foreground/60" />
            </div>}
            <button type="submit" disabled={!newWord.german.trim() || !newWord.english.trim() || translationStatus === "loading"} aria-label="Save word" title="Save word" className={`${newWord.german.trim().length >= 2 && translationStatus !== "loading" ? "col-start-2 row-start-2" : "col-start-2 row-start-1"} flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-emerald-200 dark:text-[#14211a] dark:hover:bg-emerald-100 sm:col-auto sm:row-auto`}><Send className="h-3.5 w-3.5" /></button>
          </div>
        </form>
      </div>
    </main>
  );
}
