import React from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { MobileNav } from "./MobileNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-60">
        <TopNav />
        <main className="min-h-[calc(100vh-3.5rem)] pb-20 lg:pb-6">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
