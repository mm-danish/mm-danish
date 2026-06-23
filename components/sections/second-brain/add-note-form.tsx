'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Loader2 } from 'lucide-react';
import { CATEGORIES, getCategoryColor, LearningItem, type LearningCategory } from '@/data/learning';

interface AddNoteFormProps {
  noteToEdit?: LearningItem | null;
  forceOpen?: boolean;
  onClose?: () => void;
}

export function AddNoteForm({ noteToEdit, forceOpen, onClose }: AddNoteFormProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState({
    id: undefined as string | undefined,
    category: 'Node.js' as LearningCategory,
    title: '',
    content: '',
    code: ''
  });
  const [isCustomCategory, setIsCustomCategory] = React.useState(false);
  const [customCategoryName, setCustomCategoryName] = React.useState('');

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
      
      const isCustom = !CATEGORIES.some(cat => cat.name === noteToEdit.category);
      if (isCustom) {
        setIsCustomCategory(true);
        setCustomCategoryName(noteToEdit.category);
      } else {
        setIsCustomCategory(false);
        setCustomCategoryName('');
      }
      
      setIsOpen(true);
    }
  }, [noteToEdit]);

  // Sync with forceOpen prop
  React.useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
    }
  }, [forceOpen]);

  // Reset form when closed
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setFormData({ id: undefined, category: 'Node.js', title: '', content: '', code: '' });
      setIsCustomCategory(false);
      setCustomCategoryName('');
      onClose?.();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isEditing = !!formData.id;

    const submissionData = {
      ...formData,
      category: isCustomCategory && customCategoryName.trim() ? customCategoryName.trim() : formData.category
    };

    try {
      const passkey = localStorage.getItem('brain_key') || '';
      const res = await fetch('/api/notes', {
        method: isEditing ? 'PATCH' : 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-passkey': passkey
        },
        body: JSON.stringify(submissionData)
      });

      if (res.status === 401) {
        alert("Unauthorized! Your passkey might have expired.");
        localStorage.removeItem('brain_key');
        return;
      }

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
      if (e.key === 'Escape') handleOpenChange(false);
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            role="none"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => handleOpenChange(false)}
              className="absolute inset-0 bg-background/70 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Modal */}
            <motion.div
              id="add-note-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="dialog-title"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-md rounded-3xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/40 bg-muted/20">
                <div>
                  <h2 id="dialog-title" className="text-sm font-bold tracking-tight text-foreground">
                    {formData.id ? 'Edit Note' : 'New Note'}
                  </h2>
                  <p className="text-[10px] text-muted-foreground/60 font-medium mt-0.5 uppercase tracking-wider">
                    {formData.id ? 'Update technical insight' : 'Technical recall entry'}
                  </p>
                </div>
                <button
                  aria-label="Close dialog"
                  onClick={() => handleOpenChange(false)}
                  className="p-1.5 rounded-xl text-muted-foreground/50 hover:text-foreground hover:bg-muted/60 transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1 custom-scrollbar">

                {/* Title */}
                <div className="space-y-1.5">
                  <label htmlFor="note-title" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-0.5">
                    Question / Title
                  </label>
                  <input
                    id="note-title"
                    required
                    autoFocus
                    placeholder="What did you learn today?"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-muted/30 border border-border/50 rounded-2xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/15 focus:border-foreground/25 transition-all duration-200"
                  />
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <label htmlFor="note-content" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-0.5">
                    Context / Answer
                  </label>
                  <textarea
                    id="note-content"
                    required
                    rows={4}
                    placeholder="Summarize the key concept in your own words..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full bg-muted/30 border border-border/50 rounded-2xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/15 focus:border-foreground/25 transition-all duration-200 resize-none"
                  />
                </div>

                {/* Code snippet */}
                <div className="space-y-1.5">
                  <label htmlFor="note-code" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-0.5">
                    Code Snippet <span className="normal-case tracking-normal font-normal opacity-60">(optional)</span>
                  </label>
                  <div className="overflow-hidden rounded-2xl border border-border/40 shadow-sm">
                    {/* Mini terminal bar */}
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-zinc-900 border-b border-white/5">
                      <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                      <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                      <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                    </div>
                    <textarea
                      id="note-code"
                      rows={4}
                      placeholder="// Paste your code here..."
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      className="w-full bg-zinc-950 px-4 py-3 text-[12px] font-mono text-neutral-300 placeholder:text-white/20 focus:outline-none resize-none block"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-0.5">
                      Category
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsCustomCategory(!isCustomCategory)}
                      className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 hover:text-foreground transition-colors"
                    >
                      {isCustomCategory ? '← Existing' : '+ Custom'}
                    </button>
                  </div>

                  {isCustomCategory ? (
                    <input
                      type="text"
                      placeholder="Enter category name..."
                      value={customCategoryName}
                      onChange={(e) => setCustomCategoryName(e.target.value)}
                      className="w-full bg-muted/30 border border-border/50 rounded-2xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/15 focus:border-foreground/25 transition-all duration-200"
                    />
                  ) : (
                    <div role="radiogroup" aria-label="Category selection" className="flex flex-wrap gap-1.5">
                      {CATEGORIES.map((cat) => {
                        const accent = getCategoryColor(cat.name);
                        const isSelected = formData.category === cat.name;
                        return (
                          <button
                            key={cat.name}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => setFormData({ ...formData, category: cat.name })}
                            className={`rounded-full px-3 py-1 text-[11px] font-semibold border transition-all duration-200 active:scale-95 ${
                              isSelected
                                ? ''
                                : 'border-border/40 bg-muted/30 text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                            }`}
                            style={{
                              borderColor: isSelected ? accent.hex : undefined,
                              backgroundColor: isSelected ? `${accent.hex}18` : undefined,
                              color: isSelected ? accent.hex : undefined,
                            }}
                          >
                            {cat.name}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <div className="pt-2 pb-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-foreground text-background font-bold h-11 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      formData.id ? 'Save Changes' : 'Save to Brain'
                    )}
                  </button>
                  <p className="text-[9px] text-center mt-3 text-muted-foreground/30 uppercase tracking-[0.2em]">
                    Press Esc to cancel
                  </p>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
