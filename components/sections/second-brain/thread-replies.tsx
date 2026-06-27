"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Trash2, Loader2, Brain, MessageCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ThreadReply } from "@/data/learning";

interface ThreadRepliesProps {
  noteId: string;
  accentHex: string;
  isAuthorized: boolean;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function authorInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function ThreadReplies({
  noteId,
  accentHex,
  isAuthorized,
}: ThreadRepliesProps) {
  const [replies, setReplies] = React.useState<ThreadReply[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [authorName, setAuthorName] = React.useState("");
  const [content, setContent] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  // Fetch replies on mount
  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/replies?noteId=${noteId}`)
      .then((r) => r.json())
      .then((data: ThreadReply[]) => {
        if (!cancelled) setReplies(data);
      })
      .catch(console.error)
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [noteId]);

  // Auto-resize textarea
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  const handleSend = async () => {
    if (!content.trim() || sending) return;
    setSending(true);

    // Optimistic update
    const optimistic: ThreadReply = {
      id: `optimistic-${Date.now()}`,
      noteId,
      author: authorName.trim() || "Neuron",
      content: content.trim(),
      date: new Date().toISOString(),
    };
    setReplies((prev) => [...prev, optimistic]);
    setContent("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    // Scroll to bottom
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);

    try {
      const res = await fetch("/api/replies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          noteId,
          author: authorName.trim() || "Neuron",
          content: optimistic.content,
        }),
      });
      const data = await res.json();
      if (data.success && data.reply) {
        // Replace optimistic with real reply
        setReplies((prev) =>
          prev.map((r) => (r.id === optimistic.id ? data.reply : r)),
        );
      }
    } catch (err) {
      console.error(err);
      // Rollback on failure
      setReplies((prev) => prev.filter((r) => r.id !== optimistic.id));
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (reply: ThreadReply) => {
    setDeletingId(reply.id);
    const passkey = localStorage.getItem("brain_key") || "";
    try {
      const res = await fetch(
        `/api/replies?id=${reply.id}&noteId=${reply.noteId}`,
        {
          method: "DELETE",
          headers: { "x-admin-passkey": passkey },
        },
      );
      if (res.ok) {
        setReplies((prev) => prev.filter((r) => r.id !== reply.id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="overflow-hidden"
    >
      <div className="mt-2 pb-4">
        {/* Separator */}
        <div
          className="mb-4 h-px w-full rounded-full opacity-20"
          style={{ backgroundColor: accentHex }}
        />

        {/* Reply list */}
        {loading ? (
          <div className="flex items-center gap-2 py-4 text-muted-foreground/40">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span className="text-xs">Loading thread...</span>
          </div>
        ) : replies.length === 0 ? (
          <div className="flex flex-col items-start gap-1 py-2 mb-3">
            <div className="flex items-center gap-2 text-muted-foreground/30">
              <MessageCircle className="h-3.5 w-3.5" />
              <span className="text-xs">No replies yet — start the thread.</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <AnimatePresence initial={false}>
              {replies.map((reply, index) => {
                const isLast = index === replies.length - 1;
                const initials = authorInitials(reply.author);
                return (
                  <motion.div
                    key={reply.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.22 }}
                    className="group/reply flex gap-3"
                  >
                    {/* Thread line column */}
                    <div className="flex flex-col items-center w-7 shrink-0">
                      {/* Avatar dot */}
                      <div
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold shadow-sm ring-1 ring-border/30"
                        style={{
                          backgroundColor: `${accentHex}18`,
                          color: accentHex,
                        }}
                      >
                        {initials || <Brain className="h-3 w-3" />}
                      </div>
                      {/* Vertical connector */}
                      {!isLast && (
                        <div
                          className="mt-1 w-px flex-1 min-h-[16px] opacity-20"
                          style={{ backgroundColor: accentHex }}
                        />
                      )}
                    </div>

                    {/* Reply content */}
                    <div className="min-w-0 flex-1 pb-4">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-[12px] font-semibold text-foreground/80">
                          {reply.author}
                        </span>
                        <span className="text-[10px] text-muted-foreground/40">
                          {timeAgo(reply.date)}
                        </span>
                      </div>
                      <p className="text-[13px] leading-relaxed text-foreground/70 whitespace-pre-wrap break-words">
                        {reply.content}
                      </p>

                      {/* Admin delete */}
                      {isAuthorized && (
                        <button
                          onClick={() => handleDelete(reply)}
                          disabled={deletingId === reply.id}
                          className="mt-1.5 flex items-center gap-1 text-[10px] text-muted-foreground/30 opacity-100 md:opacity-0 md:group-hover/reply:opacity-100 hover:text-red-400 active:scale-90 transition-all duration-200"
                        >
                          {deletingId === reply.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Trash2 className="h-3 w-3" />
                          )}
                          Delete
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        <div ref={bottomRef} />

        {/* Composer */}
        <div className="flex gap-3 mt-2">
          {/* Your avatar */}
          <div className="flex flex-col items-center w-7 shrink-0 pt-0.5">
            <div
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full ring-1 ring-border/30"
              style={{ backgroundColor: `${accentHex}10` }}
            >
              <Brain className="h-3 w-3" style={{ color: accentHex }} />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {/* Author name row */}
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Neuron (your handle)"
              maxLength={40}
              className="mb-1.5 w-full bg-transparent text-[11px] font-semibold text-foreground/60 placeholder:text-muted-foreground/30 focus:outline-none focus:text-foreground/80 transition-colors"
            />

            {/* Content textarea */}
            <textarea
              ref={textareaRef}
              value={content}
              onChange={handleContentChange}
              onKeyDown={handleKeyDown}
              placeholder="Add a thought, correction, or follow-up..."
              rows={1}
              maxLength={500}
              className="w-full resize-none bg-transparent text-[13px] leading-relaxed text-foreground/80 placeholder:text-muted-foreground/30 focus:outline-none transition-colors"
              style={{ overflow: "hidden" }}
            />

            {/* Footer: char count + send */}
            <div className="mt-2 flex items-center justify-between">
              <span
                className={cn(
                  "text-[10px] font-medium transition-colors",
                  content.length > 450
                    ? "text-amber-400"
                    : "text-muted-foreground/25",
                )}
              >
                {content.length > 0 ? (
                  `${content.length}/500`
                ) : (
                  <span className="hidden sm:inline">⌘↵ to send</span>
                )}
              </span>
              <button
                onClick={handleSend}
                disabled={!content.trim() || sending}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold transition-all duration-200 active:scale-95",
                  content.trim() && !sending
                    ? "text-background shadow-sm"
                    : "opacity-40 cursor-not-allowed",
                )}
                style={
                  content.trim() && !sending
                    ? { backgroundColor: accentHex }
                    : { backgroundColor: accentHex }
                }
              >
                {sending ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Send className="h-3 w-3" />
                )}
                {sending ? "Sending" : "Reply"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
