"use client";
import { usePathname } from "next/navigation";
import { Bell, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  "/dashboard":    { title: "Dashboard",    subtitle: "Your creator command center" },
  "/create":       { title: "Create",       subtitle: "Build your AI character & prompts" },
  "/characters":   { title: "Characters",   subtitle: "Your saved AI identities" },
  "/campaigns":    { title: "Campaigns",    subtitle: "Content campaigns & assets" },
  "/prompt-vault": { title: "Prompt Vault", subtitle: "Your saved prompts library" },
  "/templates":    { title: "Templates",    subtitle: "Quick-start templates" },
  "/history":      { title: "History",      subtitle: "Your recent creations" },
  "/settings":     { title: "Settings",     subtitle: "App preferences & account" },
};

export function TopNav() {
  const pathname = usePathname();
  const pageInfo = PAGE_TITLES[pathname] ?? { title: "AI Bestie Studio™", subtitle: "The Complete AI Creator OS™" };
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 lg:px-6 border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="flex items-center gap-3 lg:hidden">
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-luxury shadow-glow-soft shrink-0">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <p className="text-sm font-bold text-text-primary leading-none">AI Bestie Studio™</p>
      </div>
      <div className="hidden lg:block">
        <h1 className="text-base font-semibold text-text-primary leading-none">{pageInfo.title}</h1>
        <p className="text-xs text-text-faint mt-0.5">{pageInfo.subtitle}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon-sm" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-pink-accent rounded-full" />
        </Button>
        <Link href="/create">
          <Button size="sm" className="hidden sm:flex gap-1.5 text-xs"><Sparkles className="h-3.5 w-3.5" />Create</Button>
        </Link>
      </div>
    </header>
  );
}
