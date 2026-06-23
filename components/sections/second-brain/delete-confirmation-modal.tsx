'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, AlertTriangle, X, Loader2 } from 'lucide-react';
import { LearningItem } from '@/data/learning';
import { cn } from '@/lib/cn';

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
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!note) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
          role="none"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
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
            className="relative w-full max-w-sm rounded-[2rem] border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-muted-foreground/50 hover:text-foreground transition-colors rounded-full p-1.5 hover:bg-muted/40"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Content area */}
            <div className="flex flex-col items-center text-center mt-3">
              {/* Alert icon with soft red glow */}
              <div className="relative mb-4">
                <div className="absolute inset-0 rounded-2xl bg-destructive/10 blur-md animate-pulse" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/5 text-destructive shadow-inner">
                  <AlertTriangle className="h-5 w-5" />
                </div>
              </div>

              {/* Title */}
              <h2
                id="delete-dialog-title"
                className="text-base font-bold tracking-tight text-foreground font-heading"
              >
                Delete note?
              </h2>

              {/* Description */}
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed px-2">
                Are you sure you want to delete <span className="font-semibold text-foreground">&ldquo;{note.title}&rdquo;</span>? This will permanently remove it from your Second Brain and this action cannot be undone.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                disabled={isDeleting}
                className="flex-1 rounded-2xl border border-border/50 bg-background/50 hover:bg-muted/40 text-xs font-bold text-muted-foreground h-10 transition-all active:scale-98 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isDeleting}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-2xl bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs font-bold h-10 transition-all active:scale-98 disabled:opacity-50 shadow-[0_2px_10px_rgba(239,68,68,0.15)]"
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
