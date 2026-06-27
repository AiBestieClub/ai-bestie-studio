"use client";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const TAGLINES = ["Ready to create magic?", "Let's build something luxurious.", "Your next viral moment starts here.", "She's the muse and the artist."];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning, bestie ✨";
  if (h < 17) return "Good afternoon, bestie ✨";
  return "Good evening, bestie ✨";
}

export function WelcomeHero() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 lg:p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-pink-accent/5 pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-glow-purple opacity-60 pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-luxury"><Sparkles className="h-3.5 w-3.5 text-white" /></div>
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">AI Bestie Studio™</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-display font-semibold text-text-primary mb-1">{getGreeting()}</h2>
            <p className="text-text-muted text-sm lg:text-base">{TAGLINES[new Date().getDay() % TAGLINES.length]}</p>
          </div>
          <div className="hidden sm:flex gap-4 shrink-0">
            <div className="text-right"><p className="text-lg font-bold gradient-text">∞</p><p className="text-[10px] text-text-faint uppercase tracking-wider">Characters</p></div>
            <div className="text-right"><p className="text-lg font-bold gradient-text">10</p><p className="text-[10px] text-text-faint uppercase tracking-wider">Presets</p></div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link href="/create"><Button size="sm" className="gap-2"><Sparkles className="h-3.5 w-3.5" />Start Creating<ArrowRight className="h-3.5 w-3.5" /></Button></Link>
          <Link href="/characters"><Button variant="outline" size="sm">My Characters</Button></Link>
          <Link href="/templates"><Button variant="ghost" size="sm" className="text-text-muted">Browse Templates</Button></Link>
        </div>
      </div>
    </motion.div>
  );
}
