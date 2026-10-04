import Link from "next/link";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return <main className="center-page"><Logo /><div className="empty-illustration">404</div><h1>Halaman tidak ditemukan</h1><p>Alamat yang Anda buka tidak tersedia atau telah dipindahkan.</p><Link className="button primary" href="/dashboard">Kembali ke dashboard</Link></main>;
}
