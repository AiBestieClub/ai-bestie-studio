"use client";
import { motion } from "framer-motion";
import { Megaphone, Sparkles, BarChart2, Calendar, Target } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const COMING_SOON = [
  { icon: Target, label: "Campaign Goals", desc: "Set objectives, platforms, and KPIs for every campaign." },
  { icon: Calendar, label: "Content Calendar", desc: "Plan posts with a visual calendar and auto-scheduling." },
  { icon: BarChart2, label: "Performance Tracking", desc: "Track reach, engagement, and revenue per campaign." },
  { icon: Sparkles, label: "AI Asset Generation", desc: "Generate all captions, hashtags, and prompts in one click." },
];

export default function CampaignsPage() {
  return (
    <div className="px-4 lg:px-6 py-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-text-primary">Campaigns</h1>
        <p className="text-sm text-text-faint mt-0.5">AI-powered content campaign management</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-pink-accent/5 p-8 text-center mb-8">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-glow-purple opacity-40 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-luxury mx-auto mb-4 shadow-glow-soft">
            <Megaphone className="h-7 w-7 text-white" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 mb-4">
            <Sparkles className="h-3 w-3 text-primary" />
            <span className="text-xs font-semibold text-primary">Coming Soon</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-text-primary mb-3">Campaign Builder</h2>
          <p className="text-text-muted text-sm max-w-sm mx-auto mb-6 leading-relaxed">
            Plan, schedule, and launch full content campaigns with AI-generated prompts, captions, and posting schedules — all from one dashboard.
          </p>
          <Link href="/create"><Button className="gap-2"><Sparkles className="h-4 w-4" />Create Content Now</Button></Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {COMING_SOON.map(({ icon: Icon, label, desc }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }}
            className="rounded-xl border border-border/50 bg-card p-5 flex gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 shrink-0">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary mb-1">{label}</p>
              <p className="text-xs text-text-faint leading-relaxed">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
