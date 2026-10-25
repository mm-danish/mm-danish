"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, X, Loader2 } from "lucide-react";
import { LearningItem } from "@/data/learning";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  note: LearningItem | null;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export function DeleteConfirmationModal({
  isOpen,
  note,
  onClose,
  onConfirm,
  isDeleting = false,
}: DeleteConfirmationModalProps) {
  // Handle Escape key to close modal
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!note) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-110 flex items-center justify-center p-4 sm:p-6"
          role="none"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/45 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          {/* Modal Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex w-full max-w-md flex-col overflow-hidden rounded-2xl border border-border/70 bg-background p-4 shadow-2xl shadow-black/25"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Content area */}
            <div className="pr-8 text-left">
              <h2
                id="delete-dialog-title"
                className="font-heading text-lg font-semibold tracking-tight text-foreground"
              >
                Delete note?
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                This will permanently delete{" "}
                <span className="font-medium text-foreground">
                  &ldquo;{note.title}&rdquo;
                </span>
                . This action cannot be undone.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isDeleting}
                className="h-10 rounded-full border border-border/70 px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isDeleting}
                className="flex h-10 items-center justify-center gap-1.5 rounded-full bg-red-600 px-5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
