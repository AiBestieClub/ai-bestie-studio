"use client";
import { motion } from "framer-motion";
import { UserPlus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCharacters } from "@/hooks/useCharacters";
import { formatDate } from "@/lib/utils";

export function RecentCharacters() {
  const { characters } = useCharacters();
  const recent = characters.slice(0, 4);
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <p className="section-label">Recent Characters</p>
        <Link href="/characters" className="text-xs text-text-muted hover:text-primary transition-colors flex items-center gap-1">
          View all<ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      {recent.length === 0 ? (
        <Link href="/create#character">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="rounded-2xl border border-dashed border-border/50 p-8 text-center cursor-pointer hover:border-primary/40 transition-colors group">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
              <UserPlus className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-semibold text-text-primary mb-1">No characters yet</p>
            <p className="text-xs text-text-faint">Build your first AI identity to get started</p>
          </motion.div>
        </Link>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {recent.map((char, i) => (
            <motion.div key={char.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
              <Link href={`/create?character=${char.id}`}>
                <div className="rounded-xl border border-border/50 bg-card p-4 cursor-pointer hover:border-primary/40 hover:bg-card-hover transition-all duration-200">
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-pink-accent/10 mx-auto mb-3 border border-border/40 text-2xl">
                    {char.avatarEmoji ?? "✨"}
                  </div>
                  <p className="text-sm font-semibold text-text-primary text-center truncate mb-0.5">{char.name}</p>
                  {char.niche && <p className="text-[11px] text-text-faint text-center truncate mb-0.5">{char.niche}</p>}
                  <p className="text-[10px] text-text-faint text-center">{formatDate(char.updatedAt)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
          <Link href="/create#character">
            <div className="rounded-xl border border-dashed border-border/40 p-4 cursor-pointer hover:border-primary/40 hover:bg-card transition-all duration-200 group flex flex-col items-center justify-center min-h-[120px]">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors mb-2">
                <UserPlus className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xs font-medium text-text-muted group-hover:text-text-primary transition-colors">New Character</p>
            </div>
          </Link>
        </div>
      )}
    </section>
  );
}
