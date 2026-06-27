"use client";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { PRESET_PACKS } from "@/data/presets";
import type { PresetPack } from "@/types";

function PresetPackCard({ pack, index }: { pack: PresetPack; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.06 }}>
      <Link href={`/create?preset=${pack.id}`}>
        <div className={`relative overflow-hidden rounded-2xl border border-border/50 p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover bg-gradient-to-br ${pack.gradient} hover:border-primary/30`} style={{ minHeight: "140px" }}>
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300" style={{ background: `radial-gradient(ellipse at top right, ${pack.accentColor}15 0%, transparent 60%)` }} />
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-2 mb-3">
              <span className="text-3xl" role="img" aria-label={pack.name}>{pack.emoji}</span>
              <div className="flex gap-1">
                {pack.isTrending && <Badge variant="trending" className="gap-1"><TrendingUp className="h-2.5 w-2.5" />Hot</Badge>}
                {pack.isNew && <Badge variant="new">New</Badge>}
              </div>
            </div>
            <h3 className="text-sm font-bold text-text-primary mb-0.5">{pack.name}</h3>
            <p className="text-[11px] text-text-muted mb-3 line-clamp-2">{pack.tagline}</p>
            <div className="flex flex-wrap gap-1">
              {pack.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-background/40 text-text-faint border border-border/30">{tag}</span>
              ))}
            </div>
          </div>
          <div className="absolute bottom-4 right-4">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-background/40 backdrop-blur-sm border border-border/40">
              <ArrowRight className="h-3 w-3 text-text-muted" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function PresetPackGrid() {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <p className="section-label">All Preset Packs</p>
        <Link href="/templates" className="text-xs text-text-muted hover:text-primary transition-colors flex items-center gap-1">View all<ArrowRight className="h-3 w-3" /></Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {PRESET_PACKS.map((pack, i) => <PresetPackCard key={pack.id} pack={pack} index={i} />)}
      </div>
    </section>
  );
}

export function TrendingPresets() {
  const trending = PRESET_PACKS.filter((p) => p.isTrending);
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-3.5 w-3.5 text-amber-400" />
        <p className="section-label">Trending This Week</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {trending.map((pack, i) => <PresetPackCard key={pack.id} pack={pack} index={i} />)}
      </div>
    </section>
  );
}
