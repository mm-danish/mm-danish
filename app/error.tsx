"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("[Global Error Boundary]", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 text-red-500">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
        Something went wrong!
      </h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        An unexpected error occurred. This issue has been logged and will be
        looked into.
      </p>
      <Button onClick={() => reset()} size="lg" className="rounded-full px-8">
        <RefreshCcw className="w-4 h-4 mr-2" />
        Try again
      </Button>
    </div>
  );
}
