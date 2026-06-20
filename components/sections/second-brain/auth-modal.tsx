'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight, X } from 'lucide-react';
import { cn } from '@/lib/cn';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [passkey, setPasskey] = React.useState('');
  const [error, setError] = React.useState(false);
  const [isChecking, setIsChecking] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkey) return;
    
    setIsChecking(true);
    setError(false);
    
    try {
      const res = await fetch('/api/notes/verify', {
        method: 'POST',
        headers: { 'x-admin-passkey': passkey }
      });

      if (res.ok) {
        localStorage.setItem('brain_key', passkey);
        onSuccess();
        setPasskey('');
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setIsChecking(false);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      setPasskey('');
      setError(false);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Deep Ambient Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/90 backdrop-blur-2xl"
          />
          
          {/* Glowing Orbs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none overflow-hidden"
          >
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-1000" />
          </motion.div>

          {/* Glassmorphic Lock Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-sm overflow-hidden rounded-[2rem] border border-border/50 bg-background/40 p-8 shadow-2xl backdrop-blur-xl flex flex-col items-center text-center"
          >
            {/* Top Glow Edge */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <button 
              onClick={onClose}
              className="absolute top-5 right-5 text-muted-foreground/60 hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <motion.div 
              animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="relative mb-6"
            >
              <div className={cn(
                "absolute inset-0 rounded-2xl blur-xl animate-pulse transition-colors duration-300",
                error ? "bg-red-500/20" : "bg-primary/20"
              )} />
              <div className={cn(
                "relative flex h-16 w-16 items-center justify-center rounded-2xl border bg-background/50 shadow-inner transition-colors duration-300",
                error ? "border-red-500/30" : "border-primary/30"
              )}>
                <Lock className={cn(
                  "h-7 w-7 transition-colors duration-300",
                  error ? "text-red-500" : "text-primary"
                )} />
              </div>
            </motion.div>

            <h2 className="text-xl font-bold tracking-tight font-heading mb-2">Neural Passkey</h2>
            <p className="text-[11px] text-muted-foreground mb-8 max-w-[200px]">
              Establish a secure neural link to modify the Second Brain.
            </p>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="relative w-full group">
                <input
                  type="password"
                  placeholder="Enter passkey..."
                  value={passkey}
                  onChange={e => setPasskey(e.target.value)}
                  autoFocus
                  className={cn(
                    "w-full rounded-xl border bg-muted/30 px-4 py-3 text-center text-sm font-medium tracking-[0.2em] transition-all placeholder:tracking-normal focus:outline-none focus:ring-2 backdrop-blur-md shadow-inner",
                    error 
                      ? "border-red-500/50 focus:ring-red-500/20 text-red-500" 
                      : "border-border/50 focus:border-primary/50 focus:ring-primary/20 text-foreground"
                  )}
                />
                <button
                  type="submit"
                  disabled={!passkey || isChecking}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isChecking ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
