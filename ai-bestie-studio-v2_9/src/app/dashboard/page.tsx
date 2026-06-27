"use client";
import { motion } from "framer-motion";
import { WelcomeHero } from "@/components/dashboard/WelcomeHero";
import { QuickStart } from "@/components/dashboard/QuickStart";
import { StatsBar } from "@/components/dashboard/StatsBar";
import { PresetPackGrid, TrendingPresets } from "@/components/dashboard/PresetPackGrid";
import { RecentCharacters } from "@/components/dashboard/RecentCharacters";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } };

export default function DashboardPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="px-4 lg:px-6 py-6 space-y-8 max-w-7xl mx-auto">
      <motion.div variants={item}><WelcomeHero /></motion.div>
      <motion.div variants={item}><StatsBar /></motion.div>
      <motion.div variants={item}><QuickStart /></motion.div>
      <motion.div variants={item}><TrendingPresets /></motion.div>
      <motion.div variants={item}><RecentCharacters /></motion.div>
      <motion.div variants={item}><PresetPackGrid /></motion.div>
    </motion.div>
  );
}
