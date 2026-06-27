import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] px-4">
      <div className="text-center">
        <div className="text-6xl font-display font-bold gradient-text mb-4">404</div>
        <h2 className="text-xl font-semibold text-text-primary mb-2">Page not found</h2>
        <p className="text-text-muted text-sm mb-6 max-w-xs mx-auto">This page doesn&apos;t exist — but you can create something amazing.</p>
        <Link href="/dashboard"><Button className="gap-2"><Sparkles className="h-4 w-4" />Back to Studio</Button></Link>
      </div>
    </div>
  );
}
