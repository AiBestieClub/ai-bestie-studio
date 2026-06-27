"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Search, Trash2, Copy, Wand2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCharacters } from "@/hooks/useCharacters";
import { toast } from "@/components/ui/toaster";
import { formatDate } from "@/lib/utils";

export default function CharactersPage() {
  const { characters, deleteCharacter, duplicateCharacter } = useCharacters();
  const [search, setSearch] = useState("");

  const filtered = characters.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.ethnicity?.toLowerCase().includes(search.toLowerCase()) ||
    c.niche?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    deleteCharacter(id);
    toast({ title: `${name} deleted`, variant: "default" });
  };

  const handleDuplicate = (id: string) => {
    const copy = duplicateCharacter(id);
    if (copy) toast({ title: `${copy.name} created`, variant: "success" });
  };

  return (
    <div className="px-4 lg:px-6 py-6 max-w-7xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-text-primary">My Characters</h1>
          <p className="text-sm text-text-faint mt-0.5">{characters.length} saved {characters.length === 1 ? "identity" : "identities"}</p>
        </div>
        <Link href="/create#character"><Button size="sm" className="gap-2 shrink-0"><UserPlus className="h-3.5 w-3.5" />New Character</Button></Link>
      </div>

      {characters.length > 0 && (
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-faint" />
          <Input placeholder="Search characters..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      )}

      {characters.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-dashed border-border/50 p-12 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mx-auto mb-4">
            <UserPlus className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-text-primary mb-2">No characters yet</h2>
          <p className="text-sm text-text-faint mb-6 max-w-xs mx-auto">Build your first AI identity — save it here and use it across all your prompts.</p>
          <Link href="/create#character"><Button className="gap-2"><UserPlus className="h-4 w-4" />Build First Character</Button></Link>
        </motion.div>
      )}

      {filtered.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          <AnimatePresence>
            {filtered.map((char, i) => (
              <motion.div key={char.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.04 }} layout>
                <div className="rounded-2xl border border-border/50 bg-card p-4 hover:border-primary/30 hover:bg-card-hover transition-all duration-200 group">
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-pink-accent/10 mx-auto mb-3 border border-border/40 text-2xl">
                    {char.avatarEmoji ?? "✨"}
                  </div>
                  <div className="text-center mb-3">
                    <h3 className="font-bold text-text-primary text-sm mb-0.5 truncate">{char.name}</h3>
                    {char.ethnicity && <p className="text-xs text-text-secondary truncate">{char.ethnicity}</p>}
                    {char.niche && <Badge variant="secondary" className="text-[10px] mt-1">{char.niche}</Badge>}
                  </div>
                  {char.personality && char.personality.length > 0 && (
                    <div className="flex flex-wrap gap-1 justify-center mb-3">
                      {char.personality.slice(0, 2).map((t) => (
                        <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary/80 border border-primary/20">{t}</span>
                      ))}
                    </div>
                  )}
                  <div className="border-t border-border/30 pt-2.5 flex items-center justify-between">
                    <span className="text-[10px] text-text-faint">{formatDate(char.updatedAt)}</span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/create?character=${char.id}`}>
                        <Button variant="ghost" size="icon-sm" title="Use in prompt"><Wand2 className="h-3 w-3" /></Button>
                      </Link>
                      <Button variant="ghost" size="icon-sm" onClick={() => handleDuplicate(char.id)} title="Duplicate"><Copy className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => handleDelete(char.id, char.name)} title="Delete" className="hover:text-destructive"><Trash2 className="h-3 w-3" /></Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <Link href="/create#character">
            <div className="rounded-2xl border border-dashed border-border/40 p-4 cursor-pointer hover:border-primary/40 hover:bg-card transition-all duration-200 group flex flex-col items-center justify-center min-h-[160px]">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors mb-2">
                <UserPlus className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xs font-medium text-text-muted group-hover:text-text-primary transition-colors">New Character</p>
            </div>
          </Link>
        </div>
      )}

      {characters.length > 0 && filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-faint text-sm">No characters match &quot;{search}&quot;</p>
          <button onClick={() => setSearch("")} className="text-primary text-sm mt-2 hover:underline">Clear search</button>
        </div>
      )}
    </div>
  );
}
