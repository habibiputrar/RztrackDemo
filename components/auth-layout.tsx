import { BarChart3, LockKeyhole, ShieldCheck, WalletCards } from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return <main className="auth-shell auth-v2">
    <section className="auth-stage">
      <div className="auth-shape auth-shape-ring" aria-hidden="true" />
      <div className="auth-shape auth-shape-pill" aria-hidden="true" />
      <div className="auth-shape auth-shape-wave" aria-hidden="true"><i/><i/><i/></div>

      <header className="auth-stage-head">
        <Logo />
        <span className="auth-stage-status"><ShieldCheck size={15} /> Area akun terlindungi</span>
      </header>

      <div className="auth-stage-body">
        <aside className="auth-stage-copy">
          <span className="auth-eyebrow">PERSONAL FINANCE TRACKER</span>
          <h1>Satu tempat untuk seluruh keuangan Anda.</h1>
          <p>Cash, rekening bank, dan e-wallet tersusun rapi dalam laporan bulanan yang selalu terbarui.</p>
          <div className="auth-feature-list">
            <span><WalletCards size={17} /> Semua dompet</span>
            <span><BarChart3 size={17} /> Analitik real-time</span>
            <span><LockKeyhole size={17} /> Akses pribadi</span>
          </div>
        </aside>

        <section className="auth-panel">
          <div className="auth-box">
            <div className="auth-form-card">{children}</div>
            <div className="auth-security-note"><ShieldCheck size={15} /><span>Koneksi aman · Akses data dibatasi untuk setiap akun</span></div>
          </div>
        </section>
      </div>

      <footer className="auth-stage-footer">
        <span>© {new Date().getFullYear()} RZTrack. All rights reserved.</span>
        <nav aria-label="Quick links"><Link href="/guide">Panduan</Link><Link href="/credits">Kredit</Link></nav>
      </footer>
    </section>
  </main>;
}
