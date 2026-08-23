import Link from "next/link";
import { Home, Search, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-8">
        <h1 className="text-[8rem] md:text-[12rem] font-black font-heading leading-none text-transparent bg-clip-text bg-gradient-to-b mt-8 from-foreground to-foreground/20">
          404
        </h1>

        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Lost in the digital void
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
          <Link href="/">
            <Button size="lg" className="rounded-full px-8">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/projects">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 bg-background/50 backdrop-blur-md"
            >
              <Search className="h-4 w-4 mr-2" />
              Browse Projects
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="ghost" className="rounded-full px-8">
              <Mail className="h-4 w-4 mr-2" />
              Contact Me
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
