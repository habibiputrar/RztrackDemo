"use client";

import { CheckCircle2, XCircle } from "lucide-react";

export function Message({ text, error = false }: { text?: string; error?: boolean }) {
  if (!text) return null;
  return <div className={`message ${error ? "error" : "success"}`}>{error ? <XCircle size={18} /> : <CheckCircle2 size={18} />}{text}</div>;
}
