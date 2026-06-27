"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Library, ArrowRight, TrendingUp, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PRESET_PACKS } from "@/data/presets";

const CATEGORIES = ["All", "Business", "Fashion", "Lifestyle", "Fitness", "Travel", "Beauty", "Editorial"];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = PRESET_PACKS.filter((p) => {
    const matchCat = activeCategory === "All" || p.tags.some((t) => t.toLowerCase() === activeCategory.toLowerCase());
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.tagline.toLowerCase().includes(search.toLowerCase()) || p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const featured = PRESET_PACKS.filter((p) => p.isTrending).slice(0, 3);

  return (
    <div className="px-4 lg:px-6 py-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-text-primary">Templates</h1>
        <p className="text-sm text-text-faint mt-0.5">Curated starter packs — one tap loads everything.</p>
      </div>

      {/* Featured */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3"><TrendingUp className="h-3.5 w-3.5 text-amber-400" /><p className="section-label">Featured Templates</p></div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {featured.map((pack, i) => (
            <motion.div key={pack.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Link href={`/create?preset=${pack.id}`}>
                <div className={`relative overflow-hidden rounded-2xl border border-border/50 p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-primary/40 bg-gradient-to-br ${pack.gradient}`}>
                  <span className="text-4xl block mb-3">{pack.emoji}</span>
                  <h3 className="text-base font-bold text-text-primary mb-1">{pack.name}</h3>
                  <p className="text-sm text-text-muted mb-3">{pack.tagline}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5">
                      {pack.isTrending && <Badge variant="trending">🔥 Hot</Badge>}
                      <Badge variant="secondary" className="text-[10px]">{pack.tags[0]}</Badge>
                    </div>
                    <ArrowRight className="h-4 w-4 text-text-muted" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Search + filters */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-faint" />
        <Input placeholder="Search templates..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-6">
        {CATEGORIES.map((cat) => (
          <button key={cat} type="button" onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 ${activeCategory === cat ? "bg-gradient-luxury text-white border-transparent" : "border-border/50 text-text-muted hover:text-text-primary hover:border-border-bright"}`}>
            {cat}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filtered.map((pack, i) => (
            <motion.div key={pack.id} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}>
              <Link href={`/create?preset=${pack.id}`}>
                <div className={`relative overflow-hidden rounded-2xl border border-border/50 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-primary/30 bg-gradient-to-br ${pack.gradient}`}>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl">{pack.emoji}</span>
                      {pack.isTrending && <Badge variant="trending" className="text-[9px] px-1.5 py-0">🔥</Badge>}
                    </div>
                    <h3 className="text-xs font-bold text-text-primary mb-0.5">{pack.name}</h3>
                    <p className="text-[10px] text-text-muted mb-2 line-clamp-2">{pack.tagline}</p>
                    <div className="flex flex-wrap gap-1">
                      {pack.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-full bg-background/40 text-text-faint border border-border/30">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="px-4 pb-3 flex items-center justify-end">
                    <ArrowRight className="h-3 w-3 text-text-faint" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Library className="h-10 w-10 text-text-faint mx-auto mb-3" />
          <p className="text-text-faint">No templates match your search</p>
        </div>
      )}
    </div>
  );
}
