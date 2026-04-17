'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Loader2 } from 'lucide-react';
import { CATEGORIES, CATEGORY_COLORS, type LearningCategory } from '@/data/learning';

interface AddNoteFormProps {
  noteToEdit?: LearningItem | null;
  onClose?: () => void;
}

export function AddNoteForm({ noteToEdit, onClose }: AddNoteFormProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState({
    id: undefined as string | undefined,
    category: 'Node.js' as LearningCategory,
    title: '',
    content: '',
    code: ''
  });

  // Sync with noteToEdit prop
  React.useEffect(() => {
    if (noteToEdit) {
      setFormData({
        id: noteToEdit.id,
        category: noteToEdit.category,
        title: noteToEdit.title,
        content: noteToEdit.content,
        code: noteToEdit.code || ''
      });
      setIsOpen(true);
    }
  }, [noteToEdit]);

  // Reset form when closed
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setFormData({ id: undefined, category: 'Node.js', title: '', content: '', code: '' });
      onClose?.();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isEditing = !!formData.id;

    try {
      const res = await fetch('/api/notes', {
        method: isEditing ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        handleOpenChange(false);
        // Refresh page to show new note
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Escape key to close modal
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        id="add-note-trigger"
        aria-label="Create new note"
        aria-expanded={isOpen}
        aria-controls="add-note-dialog"
        onClick={() => handleOpenChange(!isOpen)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className={`fixed bottom-8 right-8 z-50 flex items-center gap-2.5 rounded-full px-4 py-3 shadow-2xl transition-colors duration-300 border ${
          isOpen
            ? 'bg-muted text-foreground border-border/60'
            : 'bg-foreground text-background border-transparent hover:shadow-foreground/20'
        }`}
        style={{ boxShadow: isOpen ? undefined : '0 8px 32px rgba(0,0,0,0.35)' }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <Plus className="h-4 w-4 shrink-0" />
        </motion.div>
        <AnimatePresence mode="wait" initial={false}>
          {!isOpen && (
            <motion.span
              key="label"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.18 }}
              className="overflow-hidden text-[12px] font-bold tracking-wide whitespace-nowrap"
            >
              New Note
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            role="none"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => handleOpenChange(false)}
              className="absolute inset-0 bg-background/60 backdrop-blur-md"
              aria-hidden="true"
            />

            <motion.div
              id="add-note-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="dialog-title"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-md bg-card border border-border/50 rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden max-h-[85vh] flex flex-col glass-morphism"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-border/50 flex items-center justify-between bg-muted/30">
                <div className="flex flex-col">
                  <h2 id="dialog-title" className="text-base font-bold tracking-tight">
                    {formData.id ? 'Edit Note' : 'New Note'}
                  </h2>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                    {formData.id ? 'Update technical insight' : 'Technical recall entry'}
                  </p>
                </div>
                <button
                  aria-label="Close dialog"
                  onClick={() => handleOpenChange(false)}
                  className="p-2 hover:bg-muted/80 rounded-full transition-colors group"
                >
                  <X className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
                <div className="space-y-2">
                  <label htmlFor="note-title" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 ml-1">
                    Question / Title
                  </label>
                  <input
                    id="note-title"
                    required
                    autoFocus
                    placeholder="What did you learn today?"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-muted/40 border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/20 transition-all placeholder:text-muted-foreground/40"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="note-content" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 ml-1">
                    Context / Answer
                  </label>
                  <textarea
                    id="note-content"
                    required
                    rows={4}
                    placeholder="Summarize the key concept in your own words..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full bg-muted/40 border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/20 transition-all resize-none placeholder:text-muted-foreground/40"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="note-code" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 ml-1">
                    Snippet (Optional)
                  </label>
                  <div className="relative group">
                    <textarea
                      id="note-code"
                      rows={3}
                      placeholder="Paste implementation details..."
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      className="w-full bg-[#0d1117] border border-white/5 rounded-xl px-4 py-3 text-[12px] font-mono focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/20 transition-all resize-none placeholder:text-white/10 text-neutral-300"
                    />
                    <div className="absolute right-3 top-3 opacity-20 pointer-events-none">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 ml-1">
                    Select Category
                  </label>
                  <div 
                    role="radiogroup" 
                    aria-label="Category selection"
                    className="flex flex-wrap gap-2"
                  >
                    {CATEGORIES.map((cat) => {
                      const accent = CATEGORY_COLORS[cat.name];
                      const isSelected = formData.category === cat.name;
                      return (
                        <button
                          key={cat.name}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => setFormData({ ...formData, category: cat.name })}
                          className="rounded-lg px-3 py-1.5 text-[11px] font-bold tracking-wide border transition-all duration-200 hover:brightness-110 active:scale-95"
                          style={{
                            borderColor: isSelected ? accent.hex : 'rgba(255,255,255,0.05)',
                            backgroundColor: isSelected ? `${accent.hex}25` : 'rgba(255,255,255,0.03)',
                            color: isSelected ? accent.hex : 'rgba(255,255,255,0.4)',
                          }}
                        >
                          {cat.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 pb-2">
                  <button
                    disabled={isSubmitting}
                    className="w-full bg-foreground text-background font-bold h-12 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Saving Recall...</span>
                      </>
                    ) : (
                      'Save to Brain'
                    )}
                  </button>
                  <p className="text-[9px] text-center mt-3 text-muted-foreground/40 font-medium uppercase tracking-[0.2em]">Press Esc to cancel</p>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
