import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Code2, Palette, UserRound } from "lucide-react";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Kredit",
  description: "Informasi pembuat dan perancang RZTrack."
};

export default function CreditsPage() {
  return <main className="credits-page">
    <header className="credits-top"><Logo /><Link href="/login" className="button secondary"><ArrowLeft size={17} />Kembali ke login</Link></header>
    <section className="credits-card">
      <span className="credits-label"><UserRound size={16} />Kredit proyek</span>
      <h1>Dibuat dengan fokus pada pencatatan keuangan yang sederhana.</h1>
      <p>RZTrack dirancang dan dikembangkan sebagai aplikasi pengelolaan keuangan pribadi untuk cash, rekening bank, dan e-wallet.</p>
      <div className="credits-grid">
        <article><span><Code2 size={20} /></span><small>PENGEMBANG</small><h2>Habibi Putra Rizqullah</h2><p>Perancangan sistem dan pengembangan aplikasi.</p></article>
        <article><span><Palette size={20} /></span><small>UI/UX DESIGN</small><h2>Habibi Putra Rizqullah</h2><p>Identitas visual dan pengalaman pengguna.</p></article>
      </div>
      <footer>© {new Date().getFullYear()} RZTrack. All rights reserved.</footer>
    </section>
  </main>;
}
