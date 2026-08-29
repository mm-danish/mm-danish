"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          onClick={scrollToTop}
          className="group fixed bottom-6 right-6 z-50 cursor-pointer p-2.5"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />

          <span
            className="
              pointer-events-none absolute right-full top-1/2 mr-2
              -translate-y-1/2 whitespace-nowrap
              rounded-md bg-black px-2 py-1
              text-xs text-white
              opacity-0 transition-opacity duration-200
              group-hover:opacity-100
            "
          >
            Back to top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
