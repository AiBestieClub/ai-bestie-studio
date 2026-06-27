"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookMarked, Search, Star, Trash2, Copy, Plus, FolderPlus, Grid3X3, List, Wand2, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { usePromptVault } from "@/hooks/usePromptVault";
import { toast } from "@/components/ui/toaster";
import { formatDate, truncate } from "@/lib/utils";
import type { SavedPrompt } from "@/types";

function PromptCard({ prompt, onCopy, onDelete, onFavorite, onDuplicate, viewMode }: {
  prompt: SavedPrompt; onCopy: (p: string) => void; onDelete: (id: string, title: string) => void;
  onFavorite: (id: string) => void; onDuplicate: (id: string) => void; viewMode: "list" | "grid";
}) {
  if (viewMode === "grid") {
    return (
      <div className="rounded-2xl border border-border/50 bg-card p-4 hover:border-primary/30 hover:bg-card-hover transition-all duration-200 group relative">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary/10 shrink-0"><Wand2 className="h-3.5 w-3.5 text-primary" /></div>
          <button onClick={() => onFavorite(prompt.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Star className={`h-3.5 w-3.5 ${prompt.isFavorite ? "fill-amber-400 text-amber-400" : "text-text-faint hover:text-amber-400"}`} />
          </button>
        </div>
        <h3 className="text-xs font-bold text-text-primary mb-1.5 line-clamp-2">{prompt.title}</h3>
        <p className="text-[11px] text-text-muted line-clamp-3 mb-3">{truncate(prompt.prompt, 150)}</p>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-text-faint">{formatDate(prompt.createdAt)}</span>
          <Button size="icon-sm" variant="ghost" onClick={() => onCopy(prompt.prompt)} className="opacity-0 group-hover:opacity-100"><Copy className="h-3 w-3" /></Button>
        </div>
      </div>
    );
  }
  return (
    <motion.div layout className="rounded-xl border border-border/50 bg-card p-4 hover:border-primary/25 hover:bg-card-hover transition-all duration-200 group">
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary/10 shrink-0 mt-0.5"><Wand2 className="h-3.5 w-3.5 text-primary" /></div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-text-primary truncate flex-1">{prompt.title}</h3>
            {prompt.isFavorite && <Star className="h-3 w-3 text-amber-400 fill-amber-400 shrink-0" />}
          </div>
          <p className="text-xs text-text-muted leading-relaxed line-clamp-2 mb-2">{truncate(prompt.prompt, 200)}</p>
          <div className="flex items-center gap-2 flex-wrap">
            {prompt.tags.slice(0, 3).map((tag) => <Badge key={tag} variant="secondary" className="text-[10px] py-0">{tag}</Badge>)}
            <span className="text-[10px] text-text-faint ml-auto">{formatDate(prompt.createdAt)}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <Button variant="ghost" size="icon-sm" onClick={() => onFavorite(prompt.id)}><Star className={`h-3.5 w-3.5 ${prompt.isFavorite ? "fill-amber-400 text-amber-400" : ""}`} /></Button>
          <Button variant="ghost" size="icon-sm" onClick={() => onCopy(prompt.prompt)}><Copy className="h-3.5 w-3.5" /></Button>
          <Button variant="ghost" size="icon-sm" onClick={() => onDuplicate(prompt.id)}><BookMarked className="h-3.5 w-3.5" /></Button>
          <Button variant="ghost" size="icon-sm" onClick={() => onDelete(prompt.id, prompt.title)} className="hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function PromptVaultPage() {
  const { savedPrompts, collections, createCollection, deletePrompt, toggleFavorite, duplicatePrompt, searchPrompts, getFavorites, stats } = usePromptVault();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "favorites" | string>("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [showNewCol, setShowNewCol] = useState(false);
  const [newColName, setNewColName] = useState("");

  const displayed = search ? searchPrompts(search) : filter === "favorites" ? getFavorites() : savedPrompts;

  const handleCopy = (p: string) => { navigator.clipboard.writeText(p); toast({ title: "Copied!", variant: "success" }); };
  const handleDelete = (id: string, title: string) => { deletePrompt(id); toast({ title: `"${title}" deleted` }); };
  const handleDuplicate = (id: string) => { duplicatePrompt(id); toast({ title: "Duplicated!", variant: "success" }); };
  const handleCreateCol = () => {
    if (!newColName.trim()) return;
    createCollection(newColName, "📁");
    toast({ title: `"${newColName}" created`, variant: "success" });
    setNewColName(""); setShowNewCol(false);
  };

  return (
    <div className="px-4 lg:px-6 py-6 max-w-6xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Prompt Vault</h1>
          <p className="text-sm text-text-faint mt-0.5">{stats.total} prompts · {stats.favorites} favorites · {stats.collections} collections</p>
        </div>
        <Link href="/create"><Button size="sm" className="gap-2 shrink-0"><Plus className="h-3.5 w-3.5" />New Prompt</Button></Link>
      </div>

      {stats.total > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[{ label: "Total", value: stats.total, color: "text-primary" }, { label: "Favorites", value: stats.favorites, color: "text-amber-400" }, { label: "Collections", value: stats.collections, color: "text-emerald-400" }].map((s) => (
            <div key={s.label} className="rounded-xl border border-border/40 bg-card p-3 text-center">
              <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[11px] text-text-faint">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {collections.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <p className="section-label">Collections</p>
            <Button variant="ghost" size="sm" className="gap-1 text-xs" onClick={() => setShowNewCol(true)}><FolderPlus className="h-3.5 w-3.5" />New</Button>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {collections.map((col) => (
              <button key={col.id} type="button" onClick={() => setFilter(filter === col.id ? "all" : col.id)}
                className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${filter === col.id ? "bg-primary/15 border-primary/50 text-text-primary" : "bg-card border-border/40 text-text-muted hover:border-border-bright"}`}>
                <span>{col.emoji ?? "📁"}</span><span>{col.name}</span><span className="text-[10px] text-text-faint">({col.promptIds.length})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {showNewCol && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mb-4 overflow-hidden">
            <div className="flex gap-2 p-4 rounded-xl border border-border/50 bg-card">
              <Input autoFocus placeholder="Collection name..." value={newColName} onChange={(e) => setNewColName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleCreateCol(); if (e.key === "Escape") setShowNewCol(false); }} />
              <Button size="sm" onClick={handleCreateCol}>Create</Button>
              <Button size="sm" variant="ghost" onClick={() => setShowNewCol(false)}><X className="h-4 w-4" /></Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {savedPrompts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/50 p-12 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mx-auto mb-4"><BookMarked className="h-7 w-7 text-primary" /></div>
          <h2 className="text-lg font-semibold text-text-primary mb-2">Your vault is empty</h2>
          <p className="text-sm text-text-faint mb-6 max-w-xs mx-auto">Save prompts from the builder — they live here forever. Never lose a great prompt again.</p>
          <Link href="/create"><Button className="gap-2"><Wand2 className="h-4 w-4" />Build a Prompt</Button></Link>
        </div>
      ) : (
        <>
          <div className="flex gap-3 mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-faint" />
              <Input placeholder="Search prompts..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
            <div className="flex gap-1">
              <Button variant={filter === "all" ? "secondary" : "ghost"} size="sm" onClick={() => setFilter("all")} className="text-xs">All</Button>
              <Button variant={filter === "favorites" ? "secondary" : "ghost"} size="sm" onClick={() => setFilter("favorites")} className="gap-1.5 text-xs"><Star className="h-3 w-3" />Favs</Button>
            </div>
            <div className="flex gap-1 border border-border/40 rounded-lg p-1">
              <Button variant={viewMode === "list" ? "secondary" : "ghost"} size="icon-sm" onClick={() => setViewMode("list")}><List className="h-3.5 w-3.5" /></Button>
              <Button variant={viewMode === "grid" ? "secondary" : "ghost"} size="icon-sm" onClick={() => setViewMode("grid")}><Grid3X3 className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
          {displayed.length > 0 ? (
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" : "space-y-3"}>
              {displayed.map((prompt, i) => (
                <motion.div key={prompt.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}>
                  <PromptCard prompt={prompt} onCopy={handleCopy} onDelete={handleDelete} onFavorite={toggleFavorite} onDuplicate={handleDuplicate} viewMode={viewMode} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-faint">No prompts match your search</p>
              <button onClick={() => { setSearch(""); setFilter("all"); }} className="text-primary text-sm mt-2 hover:underline">Clear filters</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
