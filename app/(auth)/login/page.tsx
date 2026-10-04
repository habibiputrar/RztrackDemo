"use client";

import { BookOpen, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Message } from "@/components/toast";

export default function LoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setLoading(true); setMessage(null);
    localStorage.setItem("rztrack-demo-session", "active");
    router.push("/dashboard"); router.refresh();
  };
  return <><h2>Selamat datang kembali</h2><p>Masuk untuk melanjutkan pengelolaan keuangan Anda.</p>
    {message && <Message text={message.text} error={message.error} />}
    <form className="auth-form" onSubmit={submit}>
      <div className="field"><label htmlFor="email">Email</label><div className="password-wrap"><input id="email" name="email" type="email" placeholder="nama@email.com" required autoComplete="email" /><span className="input-prefix"><Mail size={18} /></span></div></div>
      <div className="field"><label htmlFor="password">Password</label><div className="password-wrap"><input id="password" name="password" type={show ? "text" : "password"} placeholder="Masukkan password" required autoComplete="current-password" /><button type="button" className="icon-button" onClick={() => setShow(!show)} aria-label="Tampilkan password">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></div>
      <div className="form-meta"><label className="check"><input type="checkbox" name="remember" /> Ingat saya</label><Link href="/forgot-password" className="text-link">Lupa password?</Link></div>
      <button className="button primary" disabled={loading}><LockKeyhole size={18} />{loading ? "Memproses..." : "Masuk"}</button>
    </form>
    <Link href="/guide" className="button secondary guide-login-button"><BookOpen size={18} />Buku panduan penggunaan</Link>
    <div className="auth-foot">Belum punya akun? <Link href="/register" className="text-link">Daftar sekarang</Link></div>
  </>;
}
