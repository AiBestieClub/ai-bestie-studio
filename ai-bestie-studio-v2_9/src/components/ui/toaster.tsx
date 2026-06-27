"use client";
import * as React from "react";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "default" | "success" | "error" | "warning";
type ToastData = { id: string; title: string; description?: string; variant?: ToastVariant; onDismiss: (id: string) => void; };

const variantConfig = {
  default: { icon: <Info className="h-4 w-4 text-primary" />, border: "border-primary/30" },
  success: { icon: <CheckCircle2 className="h-4 w-4 text-emerald-400" />, border: "border-emerald-500/30" },
  error: { icon: <AlertCircle className="h-4 w-4 text-destructive" />, border: "border-destructive/30" },
  warning: { icon: <AlertCircle className="h-4 w-4 text-amber-400" />, border: "border-amber-500/30" },
};

function Toast({ id, title, description, variant = "default", onDismiss }: ToastData) {
  const config = variantConfig[variant];
  return (
    <div className={cn("flex items-start gap-3 rounded-xl border p-4 shadow-card min-w-[280px] max-w-[380px] bg-card animate-slide-up", config.border)}>
      <div className="mt-0.5 shrink-0">{config.icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary">{title}</p>
        {description && <p className="text-xs text-text-muted mt-0.5">{description}</p>}
      </div>
      <button onClick={() => onDismiss(id)} className="shrink-0 text-text-faint hover:text-text-primary transition-colors">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

let _addToast: ((toast: Omit<ToastData, "id" | "onDismiss">) => void) | null = null;
export function toast(props: Omit<ToastData, "id" | "onDismiss">) { _addToast?.(props); }

export function Toaster() {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);
  React.useEffect(() => {
    _addToast = (props) => {
      const id = Math.random().toString(36).slice(2);
      const t: ToastData = { ...props, id, onDismiss: (id) => setToasts((prev) => prev.filter((t) => t.id !== id)) };
      setToasts((prev) => [...prev, t]);
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
    };
    return () => { _addToast = null; };
  }, []);
  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto"><Toast {...t} /></div>
      ))}
    </div>
  );
}
