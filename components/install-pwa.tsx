"use client";

import { Download } from "lucide-react";
import { useEffect, useState } from "react";

interface InstallPrompt extends Event { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> }

export function InstallPwa() {
  const [prompt, setPrompt] = useState<InstallPrompt | null>(null);
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js");
    const handler = (event: Event) => { event.preventDefault(); setPrompt(event as InstallPrompt); };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);
  if (!prompt) return null;
  return <button className="sidebar-install" onClick={async () => { await prompt.prompt(); await prompt.userChoice; setPrompt(null); }}><Download size={18} /> Instal aplikasi</button>;
}
