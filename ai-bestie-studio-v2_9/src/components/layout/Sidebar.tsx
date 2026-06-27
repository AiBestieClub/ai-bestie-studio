"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wand2, Users, Megaphone, BookMarked, Library, History, Settings, Sparkles, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const NAV_ITEMS = [
  { id: "dashboard",    label: "Dashboard",    href: "/dashboard",    icon: LayoutDashboard },
  { id: "create",       label: "Create",       href: "/create",       icon: Wand2, badge: "✨" },
  { id: "characters",   label: "Characters",   href: "/characters",   icon: Users },
  { id: "campaigns",    label: "Campaigns",    href: "/campaigns",    icon: Megaphone, badge: "Soon" },
  { id: "prompt-vault", label: "Prompt Vault", href: "/prompt-vault", icon: BookMarked },
  { id: "templates",    label: "Templates",    href: "/templates",    icon: Library },
  { id: "history",      label: "History",      href: "/history",      icon: History },
  { id: "settings",     label: "Settings",     href: "/settings",     icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex flex-col w-60 min-h-screen border-r border-border/50 bg-background/96 backdrop-blur-sm fixed left-0 top-0 z-40" role="navigation" aria-label="Main navigation">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-border/40">
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-luxury shadow-glow-soft shrink-0">
          <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-text-primary leading-none truncate">AI Bestie Studio™</p>
          <p className="text-[10px] text-text-faint mt-0.5 truncate">AI Creator Operating System™</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-hide">
        <p className="section-label px-3 mb-3">Menu</p>
        {NAV_ITEMS.slice(0, 6).map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link key={item.id} href={item.href} className={cn("nav-item group", isActive && "active")} aria-current={isActive ? "page" : undefined}>
              <Icon className={cn("h-4 w-4 shrink-0 transition-colors", isActive ? "text-primary" : "text-text-faint group-hover:text-text-muted")} aria-hidden="true" />
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge && <Badge variant={item.badge === "Soon" ? "secondary" : "new"} className="text-[10px] px-1.5 py-0">{item.badge}</Badge>}
            </Link>
          );
        })}
        <div className="luxury-divider" />
        <p className="section-label px-3 mb-3">Account</p>
        {NAV_ITEMS.slice(6).map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.id} href={item.href} className={cn("nav-item group", isActive && "active")} aria-current={isActive ? "page" : undefined}>
              <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary" : "text-text-faint")} aria-hidden="true" />
              <span className="flex-1 truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-border/40">
        <div className="rounded-xl p-3 bg-gradient-to-br from-primary/15 to-pink-accent/10 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <p className="text-xs font-semibold text-text-primary">Pro Creator</p>
          </div>
          <p className="text-[11px] text-text-muted mb-2 leading-relaxed">Unlock unlimited characters & AI-powered features</p>
          <button className="w-full text-[11px] font-semibold py-1.5 px-3 rounded-lg bg-gradient-luxury text-white flex items-center justify-center gap-1 hover:opacity-90 transition-opacity">
            Upgrade <ChevronRight className="h-3 w-3" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
}
