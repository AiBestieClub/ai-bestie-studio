"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wand2, Users, BookMarked, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const MOBILE_NAV = [
  { id: "dashboard",  label: "Home",       href: "/dashboard",    icon: LayoutDashboard },
  { id: "create",     label: "Create",     href: "/create",       icon: Wand2 },
  { id: "characters", label: "Characters", href: "/characters",   icon: Users },
  { id: "vault",      label: "Vault",      href: "/prompt-vault", icon: BookMarked },
  { id: "settings",   label: "Settings",   href: "/settings",     icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border/50 bg-background/96 backdrop-blur-xl safe-area-pb" role="navigation" aria-label="Mobile navigation">
      <div className="flex items-center px-2 pt-2 pb-1">
        {MOBILE_NAV.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link key={item.id} href={item.href} className={cn("mobile-nav-item no-tap-highlight", isActive && "active")} aria-label={item.label} aria-current={isActive ? "page" : undefined}>
              <div className={cn("flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200", isActive && "bg-primary/15 shadow-glow-soft")}>
                <Icon className={cn("h-5 w-5 transition-colors", isActive ? "text-primary" : "text-text-faint")} />
              </div>
              <span className={cn("text-[10px] font-medium transition-colors", isActive ? "text-primary" : "text-text-faint")}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
