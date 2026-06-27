"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { History, Wand2, Trash2, Copy, Search, RotateCcw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHistory } from "@/hooks/useHistory";
import { toast } from "@/components/ui/toaster";
import { formatDate, formatDateFull, truncate } from "@/lib/utils";

export default function HistoryPage() {
  const { history, deleteEntry, clearHistory } = useHistory();
  const [search, setSearch] = useState("");

  const displayed = search
    ? history.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()) || (e.preview ?? "").toLowerCase().includes(search.toLowerCase()))
    : history;

  const grouped = displayed.reduce<Record<string, typeof history>>((acc, entry) => {
    const date = new Date(entry.createdAt).toDateString();
    acc[date] = acc[date] ? [...acc[date], entry] : [entry];
    return acc;
  }, {});

  const handleCopy = (text: string) => { navigator.clipboard.writeText(text); toast({ title: "Copied!", variant: "success" }); };
  const handleClear = () => {
    if (confirm("Clear all history? This cannot be undone.")) { clearHistory(); toast({ title: "History cleared" }); }
  };

  return (
    <div className="px-4 lg:px-6 py-6 max-w-3xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-text-primary">History</h1>
          <p className="text-sm text-text-faint mt-0.5">{history.length} entries · last 100 saved</p>
        </div>
        {history.length > 0 && (
          <Button variant="outline" size="sm" onClick={handleClear} className="gap-2 text-text-muted shrink-0">
            <RotateCcw className="h-3.5 w-3.5" />Clear All
          </Button>
        )}
      </div>

      {history.length > 0 && (
        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-faint" />
          <Input placeholder="Search history..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      )}

      {history.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/50 p-12 text-center">
          <History className="h-10 w-10 text-text-faint mx-auto mb-3" />
          <h2 className="text-base font-semibold text-text-primary mb-2">No history yet</h2>
          <p className="text-sm text-text-faint mb-5">Prompts you create automatically appear here.</p>
          <Link href="/create"><Button className="gap-2"><Wand2 className="h-4 w-4" />Start Creating</Button></Link>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([date, entries]) => {
            const today = new Date().toDateString();
            const yesterday = new Date(Date.now() - 86400000).toDateString();
            const label = date === today ? "Today" : date === yesterday ? "Yesterday" : formatDateFull(entries[0].createdAt);
            return (
              <div key={date}>
                <p className="text-xs font-semibold text-text-faint uppercase tracking-wider mb-3">{label}</p>
                <div className="space-y-2">
                  {entries.map((entry, i) => (
                    <motion.div key={entry.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                      className="flex items-start gap-3 rounded-xl border border-border/40 bg-card p-4 hover:border-primary/25 transition-colors group">
                      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 shrink-0 mt-0.5">
                        <Wand2 className="h-3 w-3 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-text-primary truncate flex-1">{entry.title}</p>
                          <span className="text-[10px] text-text-faint shrink-0">{formatDate(entry.createdAt)}</span>
                        </div>
                        {entry.preview && <p className="text-xs text-text-faint mt-0.5 line-clamp-2">{truncate(entry.preview, 120)}</p>}
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        {entry.prompt && (
                          <Button variant="ghost" size="icon-sm" onClick={() => handleCopy(entry.prompt!)} title="Copy prompt"><Copy className="h-3 w-3" /></Button>
                        )}
                        <Button variant="ghost" size="icon-sm" onClick={() => deleteEntry(entry.id)} className="hover:text-destructive"><Trash2 className="h-3 w-3" /></Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
