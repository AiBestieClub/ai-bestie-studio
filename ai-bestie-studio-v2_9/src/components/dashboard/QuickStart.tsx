"use client";
import { motion } from "framer-motion";
import { Wand2, UserPlus, Zap, BookMarked, Library, Sparkles } from "lucide-react";
import Link from "next/link";

const ACTIONS = [
  { id: "new-character", label: "New Character", description: "Build an AI identity", href: "/create#character", icon: UserPlus, gradient: "from-violet-500/20 to-purple-600/10", iconColor: "text-violet-400", border: "hover:border-violet-500/40" },
  { id: "build-prompt",  label: "Build Prompt",  description: "Craft a cinematic prompt", href: "/create#prompt", icon: Wand2, gradient: "from-pink-500/20 to-rose-600/10", iconColor: "text-pink-400", border: "hover:border-pink-500/40" },
  { id: "quick-preset",  label: "Quick Preset",  description: "One-click starter packs", href: "/create#presets", icon: Zap, gradient: "from-amber-500/20 to-orange-600/10", iconColor: "text-amber-400", border: "hover:border-amber-500/40" },
  { id: "vault",         label: "Prompt Vault",  description: "View saved prompts", href: "/prompt-vault", icon: BookMarked, gradient: "from-emerald-500/20 to-teal-600/10", iconColor: "text-emerald-400", border: "hover:border-emerald-500/40" },
  { id: "templates",     label: "Templates",     description: "Browse all templates", href: "/templates", icon: Library, gradient: "from-sky-500/20 to-blue-600/10", iconColor: "text-sky-400", border: "hover:border-sky-500/40" },
  { id: "enhance",       label: "AI Enhance",    description: "Level up any prompt", href: "/create#enhance", icon: Sparkles, gradient: "from-fuchsia-500/20 to-purple-600/10", iconColor: "text-fuchsia-400", border: "hover:border-fuchsia-500/40" },
];

export function QuickStart() {
  return (
    <section>
      <p className="section-label mb-3">Quick Start</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {ACTIONS.map((action, i) => {
          const Icon = action.icon;
          return (
            <motion.div key={action.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
              <Link href={action.href}>
                <div className={`relative overflow-hidden rounded-xl border border-border/50 p-4 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover bg-gradient-to-br ${action.gradient} ${action.border}`}>
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-background/60 backdrop-blur-sm mb-3">
                    <Icon className={`h-4 w-4 ${action.iconColor}`} />
                  </div>
                  <p className="text-sm font-semibold text-text-primary leading-none mb-1">{action.label}</p>
                  <p className="text-[11px] text-text-faint leading-tight">{action.description}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
